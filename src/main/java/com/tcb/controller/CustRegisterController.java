package com.tcb.controller;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.dao.service.RegisterService;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;
import com.tcb.util.MD5Util;
import com.tcb.util.ResultByPageService;


@Controller
public class CustRegisterController {
	private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	private RegisterService registerservice;
	@Autowired
	ResultByPageService rbpservice;

	@RequestMapping(value = "/custregister", method = RequestMethod.GET)
	public String custlocation(Model model) throws Exception {
		return "shengda/custregister/custRegister";
	}
	
	@RequestMapping(value = "/custCentor/{ordertype}", method = RequestMethod.GET)
	public String showCustCentor(@PathVariable String ordertype,HttpServletRequest request,Model model) throws Exception {
		DataRow result1 = new DataRow();//user_mail
		DataRow param = rbpservice.getParamByRequest(request);
		String log_user_mail= (String) request.getSession().getAttribute("log_user_mail");
		if(log_user_mail==null || "".equals(log_user_mail))return "shengda/custregister/custRegister";
		
		param.put("user_mail",log_user_mail);
		result1 = dbservice.querySimpleRowByParam("tf_f_user", param,null);
		logger.debug("--------result1--------"+result1+"-============="+ordertype);
		model.addAttribute("user_info",result1);
		
		
		ResultByPage detaillist = rbpservice.getByRequest(request);
		detaillist.getCondition().put("user_mail", log_user_mail);
		detaillist.getCondition().put("orderstate", "已归档");	
		if("1".equals(ordertype))
			dbservice.selectListByPageOfBlob("erp_order.sel_my_order",detaillist);
		else{
			dbservice.selectListByPageOfBlob("erp_order.sel_myhis_order",detaillist);
		}
		model.addAttribute("result", detaillist);
		
		model.addAttribute("ordertype", ordertype);
		
		if(result1.size()>0)
			return "shengda/custCentor/custCentor";
		else
			return "shengda/custregister/custRegister";
	}
	
	@RequestMapping(value = "/orders/showdetail/{saleOrderNo}", method = RequestMethod.GET)
	public String showorderDetail(@PathVariable String saleOrderNo,HttpServletRequest request,Model model) throws Exception {
		DataRow result1 = new DataRow();//user_mail
		DataRow param = rbpservice.getParamByRequest(request);
		String log_user_mail= (String) request.getSession().getAttribute("log_user_mail");
		if(log_user_mail==null || "".equals(log_user_mail))return "shengda/custregister/custRegister";
		
		param.put("user_mail", log_user_mail);
		param.put("SalesOrderNo", saleOrderNo);
		List<DataRow>  order_detail = dbservice.queryForListByCodeKey("erp_order.sel_order_by_key", param);
		model.addAttribute("order", order_detail);
		
		int confirm_flag=0;
		for(DataRow temp:order_detail){
			if("待确认".equals(temp.getString("SalesOrderStatus"))){
				confirm_flag=1;
			}
				
		}
		
		model.addAttribute("confirm_flag", confirm_flag);
		model.addAttribute("saleOrderNo", saleOrderNo);
		
		
		List<DataRow> fileList = new ArrayList<>();
		if(order_detail!=null){
			fileList = dbservice.queryBlobFILEForList("select  t.RecordID,t.Name from erp_attach t where t.SalesOrderNo= '"+saleOrderNo+"'");
			model.addAttribute("all_menoy", order_detail.get(0).getString("TotalPurchaseAmount"));
		}
		
		List<DataRow> BLfileList = new ArrayList<>();
		List<DataRow> PLfileList = new ArrayList<>();//-
		List<DataRow> CIfileList = new ArrayList<>();
		List<DataRow> INSUREfileList = new ArrayList<>();
		List<DataRow> LDfileList = new ArrayList<>();
		List<DataRow> otherileList = new ArrayList<>();
		for(DataRow temp:fileList){
			String filename=temp.getString("Name");
			if(filename!=null && filename.startsWith("BL-"))
				BLfileList.add(temp);
			else if(filename!=null && filename.startsWith("PL-"))
				PLfileList.add(temp);
			else if(filename!=null && filename.startsWith("CI-"))
				CIfileList.add(temp);
			else if(filename!=null && filename.startsWith("INSURE-"))
				INSUREfileList.add(temp);
			else if(filename!=null && filename.startsWith("LD-"))
				LDfileList.add(temp);
			else
				otherileList.add(temp);
		}
		
		model.addAttribute("BLfileList", BLfileList);
		model.addAttribute("PLfileList", PLfileList);
		model.addAttribute("CIfileList", CIfileList);
		model.addAttribute("LDfileList", LDfileList);
		model.addAttribute("INSUREfileList", INSUREfileList);
		model.addAttribute("otherileList", otherileList);
		return "shengda/custCentor/orderdetail";
	}	

	
	@RequestMapping(value = "/orderconfirm", method = RequestMethod.POST)
	@ResponseBody
	public DataRow orderconfirm(HttpServletRequest request,Model model) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		DataRow result1 = new DataRow();

		
		param.put("saleOrderNo", param.getString("saleOrderNo"));
		dbservice.execute("erp_order_info.updateStatusByOrder", param);
		
		result1.put("result", "ok");
		return result1;
	}
	
	@RequestMapping(value = "/orders/showIncomedetail/{saleOrderNo}", method = RequestMethod.GET)
	public String showIncomedetail(@PathVariable String saleOrderNo,HttpServletRequest request,Model model) throws Exception {
		DataRow result1 = new DataRow();//user_mail

		result1.put("ID", saleOrderNo);
		List<DataRow> fileList = dbservice.queryForListByCodeKey("erp_incomes.selectIncomesByID", result1);

		model.addAttribute("incomeList", fileList);
		return "shengda/custCentor/incomeDetail";
	}	

	
	@RequestMapping(value = "/orders/showShipmentsdetail/{saleOrderNo}", method = RequestMethod.GET)
	public String showShipmentsdetail(@PathVariable String saleOrderNo,HttpServletRequest request,Model model) throws Exception {
		DataRow result1 = new DataRow();//user_mail

		result1.put("SalesOrderNo", saleOrderNo);
		List<DataRow> fileList = dbservice.queryForListByCodeKey("erp_shipments.selectShipmentsByNo", result1);

		model.addAttribute("shipmentsList", fileList);
		return "shengda/custCentor/shipmentDetail";
	}	
	
	
	   @RequestMapping("/download/{attachId}")
	    public ResponseEntity<byte[]> download(@PathVariable String attachId) throws Exception {
	    	

	    	
	    	List<DataRow> fileList  = dbservice.queryBlobFILEForList("select * from erp_attach t where t.RecordID= '"+attachId+"'");
	    	DataRow temp = new DataRow<>();
	    	if(fileList.size()>0)
	    		temp=fileList.get(0);
	    	
	    	 ByteArrayOutputStream output = new ByteArrayOutputStream();
	    	    byte[] buffer = new byte[4096];
	    	    int n = 0;
	    	    while (-1 != (n = ((InputStream)temp.get("Data")).read(buffer))) {
	    	        output.write(buffer, 0, n);
	    	    }
	        HttpHeaders headers = new HttpHeaders();    
	        headers.setContentDispositionFormData("attachment", temp.getString("Name"));   
	        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);   
	        return new ResponseEntity<byte[]>(output.toByteArray(),    
	                                          headers, HttpStatus.CREATED);    
	    }
	    
	
	@RequestMapping(value = "/custregisterSub", method = RequestMethod.POST)
	public String custInfoRed(HttpServletRequest request,Model model) throws Exception {
		try{
			DataRow param = rbpservice.getParamByRequest(request);
			String passwd= MD5Util.makeMD5(param.getString("user_mail").toUpperCase()+param.getString("password"));
			param.put("password", passwd);   //密码秘闻存储
			param.put("user_id", GeneratorIDUtil.generatorId());
			dbservice.Insert("tf_f_user", param);
			
			//记录登录日志
			param.put("DatabaseID", 1);
			param.put("Staffid", param.getString("user_mail"));
			param.put("state",0);
			param.put("logintime", DateTimeUtil.getNowDateStr());
			param.put("loginip", request.getRemoteHost());
			dbservice.Insert("tl_loginlog", param);
			request.getSession().setAttribute("log_user_mail", param.getString("user_mail"));
			return "forward:/frame";
		}catch(Exception e){
				model.addAttribute("error", " Email has been registered!Please login in!");
				return "shengda/custregister/custRegister";

		}
	}
	
	@RequestMapping(value = "/custloginSub", method = RequestMethod.POST)
	public String custLoginSub(HttpServletRequest request,Model model) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		DataRow result1 = new DataRow();//user_mail
		
		String passwd= MD5Util.makeMD5(param.getString("log_user_mail").toUpperCase()+param.getString("log_password"));
		
		param.put("user_mail", param.getString("log_user_mail"));
		param.put("password", passwd);
		result1 = dbservice.querySimpleRowByParam("tf_f_user", param,null);
		logger.debug("--------result1--------"+result1);
		model.addAllAttributes(result1);
		if(passwd.equals(result1.get("password"))){
			//记录登录日志
			param.put("DatabaseID", 1);
			param.put("Staffid", param.getString("log_user_mail"));
			param.put("state",0);
			param.put("logintime", DateTimeUtil.getNowDateStr());
			param.put("loginip", request.getRemoteHost());
			dbservice.Insert("tl_loginlog", param);
			//用户设置session
			request.getSession().setAttribute("log_user_mail", param.getString("log_user_mail"));
			return "forward:/frame";
		}else{
			model.addAttribute("error", "The user password is not correct !");
			return "shengda/custregister/custRegister";
		}
	}
	
	
	@RequestMapping(value = "/loginCheck", method = RequestMethod.GET)
	@ResponseBody
	public DataRow loginCheck(HttpServletRequest request,Model model) throws Exception {

		String user_mail = (String) request.getSession().getAttribute("log_user_mail");
		logger.debug("--------user_mail--------"+user_mail);
		
		DataRow result1 = new DataRow();
		
		if(user_mail !=null){
			result1.put("result", "ok");
			result1.put("user_name", user_mail);
		}else{
			result1.put("result", "notOk");
		}
		return result1;
	}

	
	@RequestMapping(value = "/passChange", method = RequestMethod.POST)
	@ResponseBody
	public DataRow passChange(HttpServletRequest request,Model model) throws Exception {

		DataRow result1 = new DataRow();
		
		String log_user_mail = (String) request.getSession().getAttribute("log_user_mail");
		
		DataRow param2 = new DataRow();
		param2.put("user_mail",log_user_mail);
		result1 = dbservice.querySimpleRowByParam("tf_f_user", param2,null);
		DataRow param = rbpservice.getParamByRequest(request);
		String passwd= MD5Util.makeMD5(log_user_mail.toUpperCase()+param.getString("password"));
		param.put("user_id", result1.getString("user_id"));
		param.put("password", passwd);
		dbservice.UpdateByKey("tf_f_user", param);
		
		if(log_user_mail !=null){
			result1.put("result", "ok");
		}else{
			result1.put("result", "notOk");
		}
		return result1;
	}
	
	
	@RequestMapping(value = "/signOut", method = RequestMethod.GET)
	public String signOut(HttpServletRequest request,Model model) throws Exception {
		request.getSession().setAttribute("log_user_mail", null);
		return "forward:/frame";
	}
	
	@RequestMapping(value = "/Summary", method = RequestMethod.GET)
	public String Summary(HttpServletRequest request,Model model) throws Exception {
		DataRow result1 = new DataRow();//user_mail
		DataRow param = rbpservice.getParamByRequest(request);
		String log_user_mail= (String) request.getSession().getAttribute("log_user_mail");
		if(log_user_mail==null || "".equals(log_user_mail))return "shengda/custregister/custRegister";
		
		param.put("user_mail",log_user_mail);
		result1 = dbservice.querySimpleRowByParam("tf_f_user", param,null);
		logger.debug("--------result1--------"+result1);
		model.addAttribute("user_info",result1);
		return "shengda/custCentor/summer";
	}
	
	
	
	@RequestMapping(value = "/sehengda/modifySummer", method = RequestMethod.GET)
	public String modifySummary(HttpServletRequest request,Model model) throws Exception {
		DataRow result1 = new DataRow();//user_mail
		DataRow param = rbpservice.getParamByRequest(request);
		String log_user_mail= (String) request.getSession().getAttribute("log_user_mail");
		if(log_user_mail==null || "".equals(log_user_mail))return "shengda/custregister/custRegister";
		
		 dbservice.UpdateByKey("tf_f_user", param);
		return "forward:/Summary";
	}
	
	
	
	
	@RequestMapping(value = "/shengda/userstat")
	public String userstat(HttpServletRequest request,Model model) throws Exception {
		ResultByPage articlelist = rbpservice.getByRequest(request);
		dbservice.selectListByPage("tl_loginlog.selectUserStat",articlelist);
		logger.debug("---------articlelist----------"+articlelist);
		request.setAttribute("sdProductlist", articlelist.getResultlist());
		request.setAttribute("result", articlelist);
		return "shengda/userManager/userstat";
	}
	

	@RequestMapping(value = "/create/domodifyPassword")
	public String domodifyPassword(HttpServletRequest request,Model model) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);  
		String passwd= MD5Util.makeMD5(param.getString("Staffid").toUpperCase()+param.getString("password"));
		
		
		DataRow param2 = new DataRow();
		param2.put("user_mail",param.getString("Staffid"));
		DataRow result1 = dbservice.querySimpleRowByParam("tf_f_user", param2,null);
		
		param.put("user_id", result1.getString("user_id"));
		param.put("password", passwd);
		dbservice.UpdateByKey("tf_f_user", param);

		return "forward:/shengda/userstat";
	}
//	select  * from DFSD.dbo.CustomerContacts a ,DFSD.dbo.Customers b,DFSD.dbo.SalesOrders c
//	where a.ParentID = b.RecordID  and b.UserID = c.UserID
//	and a.Email='sinoeast7@163.com' and c.SalesOrderStatus='待确认'
	
//	create table  as 
//	select  d.ENGItemName,d.ENGSpecification,d.Unit,d.OrderQty,d.ExportRebatesRate, c.DownPayment, c.Currency, c.SalesOrderNo,c.RecordID salesRecordID,c.SalesOrderStatus,c.TotalQty,c.TotalPurchaseAmount,c.TotalExportRebates from DFSD.dbo.CustomerContacts a ,DFSD.dbo.Customers b,DFSD.dbo.SalesOrders c,DFSD.dbo.SalesOrdersline d 
//		
//	select  c.RecordID,c.SalesOrderStatus,c.TotalQty,c.TotalPurchaseAmount,c.TotalExportRebates from DFSD.dbo.CustomerContacts a ,DFSD.dbo.Customers b,DFSD.dbo.SalesOrders c  where a.ParentID = b.RecordID  and b.UserID = c.UserID and a.Email='sinoeast7@163.com' and c.SalesOrderStatus='待确认' ;
//
//	select * from Sys_Attachment t where t.ParentID='DBC50DFD-2522-4CA7-B737-22B0D11D5D61';
//
//	select * from Quotations 
	
//	select t.RecordID,t.UserID,t.HaveAttachment,t.Created,t.LastModified,t.QuotationNo,t.InquiryDate,t.QuotationDate,t.ExpiryDate,t.QuotationStatus,t.CustomerShortName,t.Currency,t.ExchangeRate,t.StandardRate,t.Payment,t.DestinationPort,t.UnitFreight,t.PlusInsurance,t.InsuranceRate,t.CommissionRate,t.Salesman from DFSD.dbo.Quotations t

	
	public static void main(String[] arg){
		
		System.out.println("--------begin--ERPSendTask-----------");
        // Create a variable for the connection string.  
	    
        String url = "jdbc:sqlserver://139.129.194.10:1433;databaseName=DFSD;user=sa;password=qwe123";//sa身份连接    
    
    
        // Declare the JDBC objects.    
        Connection con = null;  
        Statement stmt = null;    
        ResultSet rs = null;  
        try {
            // Establish the connection.    
            System.out.println("begin.");    
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");    
            con = DriverManager.getConnection(url);
            System.out.println("end.");    
    
            // Create and execute an SQL statement that returns some data.    
            String SQL = "	select  d.ENGItemName,d.ENGSpecification,d.Unit,d.OrderQty,d.ExportRebatesRate, c.DownPayment, c.Currency, c.SalesOrderNo,c.RecordID salesRecordID,c.SalesOrderStatus,c.TotalQty,c.TotalPurchaseAmount,c.TotalExportRebates,c.OrderDate,c.SalesOrderStatus,a.Email from DFSD.dbo.CustomerContacts a ,DFSD.dbo.Customers b,DFSD.dbo.SalesOrders c,DFSD.dbo.SalesOrdersline d"+ 
            			" where a.ParentID = b.RecordID  and b.UserID = c.UserID and d.ParentID=c.RecordID and a.Email is not null "
            			//	+" and  c.OrderDate > DATEADD(MINUTE,-30,GETDATE()) "
            		     ;    
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);    
          
            // Iterate through the data in the result set and display it.    
            while (rs.next()) {
            	DataRow data = new DataRow<>();
				ResultSetMetaData rsmd = rs.getMetaData();
				for (int column = 1; column <= rsmd.getColumnCount(); column++) {
					if (rsmd.getColumnType(column) == Types.BLOB
							|| rsmd.getColumnType(column) == Types.LONGVARBINARY) {
							Blob blob = rs.getBlob(column);
							try {
								
								if(blob==null)
									data.put(rsmd.getColumnLabel(column), null);
								else
									data.put(rsmd.getColumnLabel(column), (new String(
										blob.getBytes(1, (int) blob.length()),
										"GBK")));
							} catch (UnsupportedEncodingException e) {
								throw new SQLException("数据库查询错误:"+e.getMessage());
							}
							// logger.debug(rsmd.getColumnName(column)+"="+data.getString(rsmd.getColumnName(column)));
					} else if(rsmd.getColumnType(column) == Types.DATE||
							rsmd.getColumnType(column) == Types.TIME||
							rsmd.getColumnType(column) == Types.TIMESTAMP){
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}else if(rsmd.getColumnType(column) == Types.CHAR||
							rsmd.getColumnType(column) == Types.LONGVARCHAR||
							rsmd.getColumnType(column) == Types.NVARCHAR||
							rsmd.getColumnType(column) == Types.LONGNVARCHAR) {
						data.put(rsmd.getColumnLabel(column),
								rs.getString(column));
					}else{
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}
				}
               System.out.println("======1======data============="+data);
            }
            
            
            // Create and execute an SQL statement that returns some data.    
            String SQL1 = "select t.Module,t.ParentID,t.Name,t.Date,t.Data,t.Size,t.RecordID from DFSD.dbo.Sys_Attachment t "
            	//	+" where t.Date > DATEADD(MINUTE,-30,GETDATE()) "
            		;  
            stmt = null;    
            rs = null;  
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL1);
            
            // Iterate through the data in the result set and display it.    
            while (rs.next()) {
            	DataRow data = new DataRow<>();
				ResultSetMetaData rsmd = rs.getMetaData();
				for (int column = 1; column <= rsmd.getColumnCount(); column++) {
					if (rsmd.getColumnType(column) == Types.BLOB
							|| rsmd.getColumnType(column) == Types.LONGVARBINARY) {
							Blob blob = rs.getBlob(column);
							try {
								
								if(blob==null)
									data.put(rsmd.getColumnLabel(column), null);
								else
									data.put(rsmd.getColumnLabel(column), (new String(
										blob.getBytes(1, (int) blob.length()),
										"GBK")));
							} catch (UnsupportedEncodingException e) {
								throw new SQLException("数据库查询错误:"+e.getMessage());
							}
							// logger.debug(rsmd.getColumnName(column)+"="+data.getString(rsmd.getColumnName(column)));
					} else if(rsmd.getColumnType(column) == Types.DATE||
							rsmd.getColumnType(column) == Types.TIME||
							rsmd.getColumnType(column) == Types.TIMESTAMP){
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}else if(rsmd.getColumnType(column) == Types.CHAR||
							rsmd.getColumnType(column) == Types.LONGVARCHAR||
							rsmd.getColumnType(column) == Types.NVARCHAR||
							rsmd.getColumnType(column) == Types.LONGNVARCHAR) {
						data.put(rsmd.getColumnLabel(column),
								rs.getString(column));
					}else{
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}
				}
              // dbservice.Insert("erp_attach", data);
				 System.out.println("======2======data============="+data);
            }
            
           // houda3609 --liulaoshi

            // Create and execute an SQL statement that returns some data.    
            String SQL2 = "select t.RecordID,t.UserID,t.HaveAttachment,t.Created,t.LastModified,t.QuotationNo,t.InquiryDate,t.QuotationDate,t.ExpiryDate,t.QuotationStatus,t.CustomerShortName,t.Currency,t.ExchangeRate,t.StandardRate,t.Payment,t.DestinationPort,t.UnitFreight,t.PlusInsurance,t.InsuranceRate,t.CommissionRate,t.Salesman,a.Email from DFSD.dbo.Quotations t,DFSD.dbo.CustomerContacts a ,DFSD.dbo.Customers b "
            		+" where a.ParentID = b.RecordID  and  b.UserID = t.UserID and a.Email is not null "
            	//	+" where t.Date > DATEADD(MINUTE,-30,GETDATE()) "
            		;  
            stmt = null;    
            rs = null;  
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL2);
            
            // Iterate through the data in the result set and display it.    
            while (rs.next()) {
            	DataRow data = new DataRow<>();
				ResultSetMetaData rsmd = rs.getMetaData();
				for (int column = 1; column <= rsmd.getColumnCount(); column++) {
					if (rsmd.getColumnType(column) == Types.BLOB
							|| rsmd.getColumnType(column) == Types.LONGVARBINARY) {
							Blob blob = rs.getBlob(column);
							try {
								
								if(blob==null)
									data.put(rsmd.getColumnLabel(column), null);
								else
									data.put(rsmd.getColumnLabel(column), (new String(
										blob.getBytes(1, (int) blob.length()),
										"utf8")));
							} catch (UnsupportedEncodingException e) {
								throw new SQLException("数据库查询错误:"+e.getMessage());
							}
							// logger.debug(rsmd.getColumnName(column)+"="+data.getString(rsmd.getColumnName(column)));
					} else if(rsmd.getColumnType(column) == Types.DATE||
							rsmd.getColumnType(column) == Types.TIME||
							rsmd.getColumnType(column) == Types.TIMESTAMP){
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}else if(rsmd.getColumnType(column) == Types.CHAR||
							rsmd.getColumnType(column) == Types.LONGVARCHAR||
							rsmd.getColumnType(column) == Types.NVARCHAR||
							rsmd.getColumnType(column) == Types.LONGNVARCHAR) {
						data.put(rsmd.getColumnLabel(column),
								rs.getString(column));
					}else{
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}
				}
              // dbservice.Insert("erp_quotations", data);
				System.out.println("======3======data============="+data);
            }            
        }    
    
        // Handle any errors that may have occurred.    
        catch (Exception e) {    
            e.printStackTrace();    
        }    
    
        finally {    
            if (rs != null)    
                try {    
                    rs.close();    
                } catch (Exception e) {    
                }    
            if (stmt != null)    
                try {    
                    stmt.close();    
                } catch (Exception e) {    
                }    
            if (con != null)    
                try {    
                    con.close();    
                } catch (Exception e) {    
                }    
        } 
		
	}
	
}