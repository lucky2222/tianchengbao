package com.tcb.jobtask;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.util.JavaMail;
import com.tcb.util.JavaMailWithAttachment;

/**
 * 邮件后台处理类
 *
 */
public class MailSendTask {
	private static final Logger logger = LoggerFactory
			.getLogger(MailSendTask.class);
	//数据库操作类
	private DBService dbservice;
	
	public void setDbservice(DBService dbservice)
	{
		this.dbservice = dbservice;
	}
	
	//执行入口
	public void doExecute() throws Exception {
		logger.debug("邮件后台处理类执行...");
		//Thread.sleep(1000*60*8);//停8秒
		
		HttpServletRequest request = null;
		List<DataRow> list = dbservice.queryForListByCodeKey(
				"te_mailcontent.findUnsendmail", null);
		for(int i=0;i<list.size();i++){
			DataRow dataRow = new DataRow();
			dataRow=list.get(i);
			String id=dataRow.getString("id");
			String email=dataRow.getString("email");
			String cc=dataRow.getString("cc");
			String bcc=dataRow.getString("bcc");
			String title=dataRow.getString("title","our products");
			String remark=dataRow.getString("remark");
			String url=dataRow.getString("url");
			String staffID=dataRow.getString("staffID");
			DataRow data=dbservice.querySimpleRowByKey("td_userinfo", "mail");
//			DataRow data=new DataRow();
//			data.put("Email", "");
//			data.put("emailpwd", value);
			int sendSuccess = 3;
			JavaMailWithAttachment se = new JavaMailWithAttachment(true);
			 try
		        {
			if(url!=null&&!"".equals(url)){
				String urlAll="d:"+java.io.File.separator+"emailFujian"+java.io.File.separator+url;
				//String urlAll=java.io.File.separator+"home"+java.io.File.separator+"seawork"+java.io.File.separator+java.io.File.separator+"webapp"+java.io.File.separator+url;
				//File affix = new File(urlAll);
				DataRow fileUrl=new DataRow();
				fileUrl.put("mailID", id);
				List<DataRow> listUrl = dbservice.queryForListByCodeKey(
						"te_mailfileurl.findMailFile", fileUrl);
				String fileurl="";
				for(int j=0;j<listUrl.size();j++){
					DataRow drurl=listUrl.get(j);
					fileurl+=drurl.getString("url")+";";
				}
				String[] urlStr=fileurl.split(";");
				if(remark==null)
				{
					remark = "";
				}
				sendSuccess = se.doSendHtmlEmail(title, remark, email, urlStr,cc,bcc,data);//
			}else{
				JavaMail seno = new JavaMail(false);
				
				//发送给客户
				
				String custtitle="thanks for you enquiry for "+title;
				
				String Context="welcome send enquiry to sino-sources.com ,we will give you best price and best service ,thanks for your enquiry ! Mobile:+8618622088833";
				sendSuccess = se.doSendHtmlEmail(custtitle, Context, cc, null,null,bcc,data);//
				
				//发送给系统提醒
				String systitle=" enquiry for "+title;
				
				String custcontext="Customer Contact:"+staffID +"\n" +"E-mail:"+cc +"\n" +remark;
				
				if(sendSuccess==1)
				sendSuccess = se.doSendHtmlEmail(systitle, custcontext, email, null,null,bcc,data);//
				//seno.doSendHtmlEmail(title, remark, email);
			}
			 DataRow query=new DataRow();
			 query.put("id", id);
			 query.put("sendSuccess", sendSuccess);
			 int count = 0;
				count = dbservice.UpdateByKey("te_mailcontent", query);
		        }  catch(Exception e)
		        {
		            //把捕获的一场转换成String存入数据库错误信息中
		            StringWriter sw = new StringWriter();  
		            PrintWriter pw = new PrintWriter(sw);  
		            e.printStackTrace(pw);  
		            DataRow fail=new DataRow();
		            fail.put("id", id);
		            fail.put("sendFailInfo",sw.toString());
					 int count = 0;
						count = dbservice.UpdateByKey("te_mailcontent", fail);
		            
		        }
			
			 
			
			
			
			
		}
		
	
		
		
	}
}
