package com.tcb.controller;

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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.dao.service.RegisterService;
import com.tcb.util.ResultByPageService;


@Controller
public class InquiryQuotationController {
	private static final Logger logger = LoggerFactory.getLogger(InquiryQuotationController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	private RegisterService registerservice;
	@Autowired
	ResultByPageService rbpservice;


	
	@RequestMapping(value = "/inquiry/inquirylist", method = RequestMethod.GET)
	public String showCustCentor(HttpServletRequest request,Model model) throws Exception {
		DataRow result1 = new DataRow();//user_mail
		DataRow param = rbpservice.getParamByRequest(request);
		String log_user_mail= (String) request.getSession().getAttribute("log_user_mail");
		if(log_user_mail==null || "".equals(log_user_mail))return "shengda/custregister/custRegister";
		param.put("user_mail",log_user_mail);
		result1 = dbservice.querySimpleRowByParam("tf_f_user", param,null);
		logger.debug("--------result1--------"+result1);
		model.addAttribute("user_info",result1);		

		
		ResultByPage detaillist = rbpservice.getByRequest(request);
		detaillist.getCondition().put("user_mail", log_user_mail);
		
		dbservice.selectListByPageOfBlob("erp_quotations.sel_quotations_by_mail",detaillist);
		model.addAttribute("result", detaillist);
		
		if(result1.size()>0)
			return "shengda/custCentor/InquiryCentor";
		else
			return "shengda/custregister/custRegister";


	}
	
	@RequestMapping(value = "/orders/inquiry/{QuotationNo}", method = RequestMethod.GET)
	public String showorderDetail(@PathVariable String QuotationNo,HttpServletRequest request,Model model) throws Exception {
		DataRow result1 = new DataRow();//user_mail
		DataRow param = rbpservice.getParamByRequest(request);
		String log_user_mail= (String) request.getSession().getAttribute("log_user_mail");
		if(log_user_mail==null || "".equals(log_user_mail))return "shengda/custregister/custRegister";
		
		param.put("user_mail", log_user_mail);
		param.put("QuotationNo", QuotationNo);
		DataRow quotation_detail = dbservice.querySimpleRowByName("erp_quotations.selectQuotations", param);
		model.addAttribute("quotation", quotation_detail);
		
		List<DataRow> fileList = new ArrayList<>();
		if(quotation_detail!=null){
			fileList = dbservice.queryBlobFILEForList("select * from erp_attach t where t.ParentID= '"+quotation_detail.getString("RecordID")+"'");
		}
		model.addAttribute("orderAttach", fileList);
		return "shengda/custCentor/Inquirydetail";
	}	

	
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
