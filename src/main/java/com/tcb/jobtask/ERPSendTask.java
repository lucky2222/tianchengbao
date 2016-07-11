package com.tcb.jobtask;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
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
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.util.JavaMail;
/**
 * 短信自动发送程序
 * @author jyl
 *
 */
public class ERPSendTask {
	private static final Logger logger = LoggerFactory.getLogger(ERPSendTask.class);
	//数据库操作类
	private DBService dbservice;
	
	public void setDbservice(DBService dbservice)
	{
		this.dbservice = dbservice;
	}

	 private Properties properties = new Properties();
	
	//执行入口
	public void doExecute() throws InterruptedException {
		
		System.out.println("--------begin--ERPSendTask-----------");
        // Create a variable for the connection string.  
	    
        InputStream in = ERPSendTask.class.getResourceAsStream("/erp.properties");
        String url="";
        try {
            properties.load(in);
            url = properties.getProperty("jdbc.url");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        //String url = "jdbc:sqlserver://139.129.194.10:1433;databaseName=DFSD;user=sa;password=qwe123";//sa身份连接    
    
    
        // Declare the JDBC objects.    
        Connection con = null;  
        Statement stmt = null;    
        ResultSet rs = null;  
        try {
            // Establish the connection.    
            System.out.println("begin-----------ERPSendTask--------.");    
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");    
            con = DriverManager.getConnection(url);
            con.setAutoCommit(false);
              
    
            // Create and execute an SQL statement that returns some data.    
            String SQL = "	select  c.DeliveryDate, c.Payment, d.ENGItemName,d.ENGSpecification,d.Unit,d.OrderQty,d.ExportRebatesRate,d.SalesAmount PurchaseAmount, c.DownPayment, c.Currency, c.SalesOrderNo,c.RecordID salesRecordID,d.RecordID subOrderRecordID,c.SalesOrderStatus,c.TotalQty,c.TotalSalesAmount TotalPurchaseAmount,c.TotalExportRebates,c.OrderDate,c.SalesOrderStatus,a.Email from DFSD.dbo.CustomerContacts a ,DFSD.dbo.Customers b,DFSD.dbo.SalesOrders c,DFSD.dbo.SalesOrdersline d  "+ 
        			" where a.ParentID = b.RecordID  and b.CustomerNo = c.CustomerNo  and d.ParentID=c.RecordID and a.Email is not null "
        				+" and  c.LastModified > DATEADD(MINUTE,-30,GETDATE()) "
        				//+" and  c.ZDRQ > DATEADD(DAY,-30,GETDATE()) "
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
				try{
					dbservice.Insert("erp_order_info", data);
				}catch(Exception e){
					dbservice.UpdateByKey("erp_order_info", data);
               }
            }
            
            

            
           // houda3609 --liulaoshi

            // Create and execute an SQL statement that returns some data.    
            String SQL2 = "select t.RecordID,t.UserID,t.HaveAttachment,t.Created,t.LastModified,t.QuotationNo,t.InquiryDate,t.QuotationDate,t.ExpiryDate,t.QuotationStatus,t.CustomerShortName,t.Currency,t.ExchangeRate,t.StandardRate,t.Payment,t.DestinationPort,t.UnitFreight,t.PlusInsurance,t.InsuranceRate,t.CommissionRate,t.Salesman,a.Email from DFSD.dbo.Quotations t,DFSD.dbo.CustomerContacts a ,DFSD.dbo.Customers b "
            		+" where a.ParentID = b.RecordID  and  b.UserID = t.UserID and a.Email is not null "
            		+" and t.LastModified > DATEADD(MINUTE,-30,GETDATE()) "
            		;  
            rs = null;  
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
               
				try{
					dbservice.Insert("erp_quotations", data);
				}catch(Exception e){
					dbservice.UpdateByKey("erp_quotations", data);
               }
/*				
	            String SQL3 = "SELECT * FROM DFSD.dbo.QuotationsLine t where t.ParentID='"+data.getString("RecordID")+"'";  
	            ResultSet rs3  = stmt.executeQuery(SQL3);
	            while (rs3.next()) {
	            	DataRow data1 = new DataRow<>();
					ResultSetMetaData rsmd1 = rs.getMetaData();
					for (int column = 1; column <= rsmd1.getColumnCount(); column++) {
						if (rsmd1.getColumnType(column) == Types.BLOB
								|| rsmd1.getColumnType(column) == Types.LONGVARBINARY) {
								Blob blob = rs3.getBlob(column);
								try {
									
									if(blob==null)
										data1.put(rsmd1.getColumnLabel(column), null);
									else
										data1.put(rsmd1.getColumnLabel(column), (new String(
											blob.getBytes(1, (int) blob.length()),
											"utf8")));
								} catch (UnsupportedEncodingException e) {
									throw new SQLException("数据库查询错误:"+e.getMessage());
								}
								// logger.debug(rsmd.getColumnName(column)+"="+data.getString(rsmd.getColumnName(column)));
						} else if(rsmd1.getColumnType(column) == Types.DATE||
								rsmd1.getColumnType(column) == Types.TIME||
								rsmd1.getColumnType(column) == Types.TIMESTAMP){
							data1.put(rsmd.getColumnLabel(column),
									rs3.getObject(column));
						}else if(rsmd1.getColumnType(column) == Types.CHAR||
								rsmd1.getColumnType(column) == Types.LONGVARCHAR||
								rsmd1.getColumnType(column) == Types.NVARCHAR||
								rsmd1.getColumnType(column) == Types.LONGNVARCHAR) {
							data1.put(rsmd1.getColumnLabel(column),
									rs3.getString(column));
						}else{
							data1.put(rsmd1.getColumnLabel(column),
									rs3.getObject(column));
						}
					}
					
					try{
						dbservice.Insert("erp_quotationsLine", data1);
					}catch(Exception e){
						dbservice.UpdateByKey("erp_quotationsLine", data1);
	               }
	            }*/
	            

            }
            
            
            
            
            
            
            // Create and execute an SQL statement that returns some data.    
            String SQL3 = "  select  a.RecordID,a.Created,a.LastModified,a.ID,a.ExchangeRate,a.AmountExpected,a.NetAmountExpected,a.UsedAmount from [DFSD].[dbo].Incomes a "
            		+" where a.LastModified > DATEADD(MINUTE,-30,GETDATE()) "
            		;  
  
            rs = null;  
            rs = stmt.executeQuery(SQL3);
            
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
				System.out.println("===========data========="+data);
				try{
					dbservice.Insert("erp_incomes", data);
				}catch(Exception e){
					dbservice.UpdateByKey("erp_incomes", data);
               }
            }

            
            // Create and execute an SQL statement that returns some data.    
            String SQL4 = " select t2.SealNO,t.BLNO InvoiceNO,t.Forwarder,t2.ContainerNo, t.RecordID,t.CGS,t.CollectionDate,t.SalesOrderNo,t.DestinationPort,t.DischargePorts ,t.Created  from DFSD.dbo.Shipments t,DFSD.dbo.jzxx t2  "
            		+" where   t.RecordID=t2.ParentID "
            		+ "and t.LastModified > DATEADD(MINUTE,-30,GETDATE()) "
            		;  
  
            rs = null;  
            rs = stmt.executeQuery(SQL4);
            
            // Iterate through the data in the result set and display it.    
            while (rs.next()) {
            	DataRow data4 = new DataRow<>();
				ResultSetMetaData rsmd = rs.getMetaData();
				for (int column = 1; column <= rsmd.getColumnCount(); column++) {
					if (rsmd.getColumnType(column) == Types.BLOB
							|| rsmd.getColumnType(column) == Types.LONGVARBINARY) {
							Blob blob = rs.getBlob(column);
							try {
								
								if(blob==null)
									data4.put(rsmd.getColumnLabel(column), null);
								else
									data4.put(rsmd.getColumnLabel(column), (new String(
										blob.getBytes(1, (int) blob.length()),
										"utf8")));
							} catch (UnsupportedEncodingException e) {
								throw new SQLException("数据库查询错误:"+e.getMessage());
							}
							// logger.debug(rsmd.getColumnName(column)+"="+data.getString(rsmd.getColumnName(column)));
					} else if(rsmd.getColumnType(column) == Types.DATE||
							rsmd.getColumnType(column) == Types.TIME||
							rsmd.getColumnType(column) == Types.TIMESTAMP){
						data4.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}else if(rsmd.getColumnType(column) == Types.CHAR||
							rsmd.getColumnType(column) == Types.LONGVARCHAR||
							rsmd.getColumnType(column) == Types.NVARCHAR||
							rsmd.getColumnType(column) == Types.LONGNVARCHAR) {
						data4.put(rsmd.getColumnLabel(column),
								rs.getString(column));
					}else{
						data4.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}
				}
				System.out.println("======erp_shipments=====data========="+data4);
				try{
					dbservice.Insert("erp_shipments", data4);
				}catch(Exception e){
					dbservice.UpdateByKey("erp_shipments", data4);
               }
            }
            
            
            
            
           // Create and execute an SQL statement that returns some data.    
            String SQL1 = "select a.SalesOrderNo SalesOrderNo,t.Module,t.ParentID,t.Name,t.Date,t.Data,t.Size,t.SerialID RecordID  from DFSD.dbo.Sys_Attachment  t,DFSD.dbo.Shipments a where t.ParentID=a.RecordID  "
            			 + " and t.Date > DATEADD(MINUTE,-30,GETDATE()) "
            		     + " union all select a.SalesOrderNo SalesOrderNo,t.Module,t.ParentID,t.Name,t.Date,t.Data,t.Size,t.SerialID RecordID  from DFSD.dbo.Sys_Attachment  t,DFSD.dbo.SalesOrders a where t.ParentID=a.RecordID  "
            			 +" and t.Date > DATEADD(MINUTE,-30,GETDATE()) "
            		     + " union all select a.SalesOrderNo SalesOrderNo,t.Module,t.ParentID,t.Name,t.Date,t.Data,t.Size,t.SerialID RecordID  from DFSD.dbo.Sys_Attachment  t,DFSD.dbo.SettlementDocuments a where t.ParentID=a.RecordID"
            			 +" and t.Date > DATEADD(MINUTE,-30,GETDATE()) "
            		     + " union all select a.RecordID SalesOrderNo, t.Module,t.ParentID,t.Name,t.Date,t.Data,t.Size,t.SerialID RecordID  from DFSD.dbo.Quotations a,DFSD.dbo.Sys_Attachment t where a.RecordID=t.ParentID "
            		      +" and t.Date > DATEADD(MINUTE,-30,GETDATE()) "
            		     ;  
  
            rs = null;  
            rs = stmt.executeQuery(SQL1);
            DataRow data5 = new DataRow<>();
            // Iterate through the data in the result set and display it.    
            while (rs.next()) {
            	data5 = new DataRow();
				ResultSetMetaData rsmd = rs.getMetaData();
				for (int column = 1; column <= rsmd.getColumnCount(); column++) {
					if (rsmd.getColumnType(column) == Types.BLOB
							|| rsmd.getColumnType(column) == Types.LONGVARBINARY) {
							Blob blob = rs.getBlob(column);
							try {
								
								if(blob==null)
									data5.put(rsmd.getColumnLabel(column), null);
								else
									data5.put(rsmd.getColumnLabel(column), (new String(
										blob.getBytes(1, (int) blob.length()),
										"utf8")));
							} catch (UnsupportedEncodingException e) {
								throw new SQLException("数据库查询错误:"+e.getMessage());
							}
							// logger.debug(rsmd.getColumnName(column)+"="+data.getString(rsmd.getColumnName(column)));
					} else if(rsmd.getColumnType(column) == Types.DATE||
							rsmd.getColumnType(column) == Types.TIME||
							rsmd.getColumnType(column) == Types.TIMESTAMP){
						data5.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}else if(rsmd.getColumnType(column) == Types.CHAR||
							rsmd.getColumnType(column) == Types.LONGVARCHAR||
							rsmd.getColumnType(column) == Types.NVARCHAR||
							rsmd.getColumnType(column) == Types.LONGNVARCHAR) {
						data5.put(rsmd.getColumnLabel(column),
								rs.getString(column));
					}else{
						data5.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}
					if(column==6)
						data5.put("Data", toByteArray(rs.getBinaryStream(6)));
				}
				try{
					dbservice.executBlobInsert("erp_attach", data5);
				}catch(Exception e){
					System.out.println("=======erp_attach====data========="+data5);
				}
            }
        }    
    
        // Handle any errors that may have occurred.    
        catch (Exception e) {    
            e.printStackTrace();
            try {
				con.rollback();
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
            
            
            System.out.println("end-------------ERPSendTask--------."); 
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
                	con.setAutoCommit(true);
                    con.close();    
                } catch (Exception e) {    
                }    
        } 
		
	}
	
	
	public static byte[] toByteArray(InputStream input) throws IOException {
	    ByteArrayOutputStream output = new ByteArrayOutputStream();
	    byte[] buffer = new byte[4096];
	    int n = 0;
	    while (-1 != (n = input.read(buffer))) {
	        output.write(buffer, 0, n);
	    }
	    return output.toByteArray();
	}
}
