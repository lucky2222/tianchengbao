package com.tcb.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.google.common.base.Strings;

public class JavaMailWithAttachment {
	//数据库操作类
		private DBService dbservice;
		
		public void setDbservice(DBService dbservice)
		{
			this.dbservice = dbservice;
		}
	private MimeMessage message;
	private Session session;
	private static Transport transport;
	private String mailHost = "";
	private String sender_username = "";
	private String sender_password = "";

	private Properties properties = new Properties();

	/*
	 * 初始化方法
	 */
	public JavaMailWithAttachment(boolean debug) {
		InputStream in = JavaMailWithAttachment.class
				.getResourceAsStream("/mailserver.properties");
		try {
			properties.load(in);
			this.mailHost = properties.getProperty("mail.smtp.host");
			this.sender_username = properties
					.getProperty("mail.sender.username");
			this.sender_password = properties
					.getProperty("mail.sender.password");
		} catch (IOException e) {
			e.printStackTrace();
		}

		session = Session.getInstance(properties);
		session.setDebug(debug);// 开启后有调试信息
		message = new MimeMessage(session);
	}

	/**
	 * 发送邮件
	 * 
	 * @param subject
	 *            邮件主题
	 * @param sendHtml
	 *            邮件内容
	 * @param receiveUser
	 *            收件人地址
	 * @param attachment
	 *            附件
	 */
	public int doSendHtmlEmail(String subject, String sendHtml,
			String receiveUser, String[] filePath,String receiveUserCC,String receiveUserBCC,DataRow data) {
		try {
			// 发件人
			String Email=data.getString("Email");
			InternetAddress from = new InternetAddress(" <"+Email+">");
			message.setFrom(from);

			// 收件人
			//InternetAddress to = new InternetAddress(receiveUser);
			String[] to=receiveUser.split(";");
			InternetAddress[] sendTo = new InternetAddress[to.length];
			
			for (int i = 0; i < to.length; i++) {
				sendTo[i] = new InternetAddress(to[i]);
			}
			message.setRecipients(Message.RecipientType.TO, sendTo);		//CC抄送 	BCC密送
			//抄送
			if(!Strings.isNullOrEmpty(receiveUserCC)){
				String[] cc=receiveUserCC.split(";");
				InternetAddress[] ccTo = new InternetAddress[cc.length];
				
				for (int i = 0; i < cc.length; i++) {
					ccTo[i] = new InternetAddress(cc[i]);
				}
				
				
				message.setRecipients(Message.RecipientType.CC, ccTo);		//CC抄送 	BCC密送
			}
			//密送
			if(!Strings.isNullOrEmpty(receiveUserBCC)){
				String[] cc=receiveUserBCC.split(";");
				InternetAddress[] bccTo = new InternetAddress[cc.length];
				
				for (int i = 0; i < cc.length; i++) {
					bccTo[i] = new InternetAddress(cc[i]);
				}
				message.setRecipients(Message.RecipientType.BCC, bccTo);		//CC抄送 	BCC密送
			}
			// 邮件主题
			message.setSubject(subject);
			// 向multipart对象中添加邮件的各个部分内容，包括文本内容和附件
			Multipart multipart = new MimeMultipart();
			// 添加邮件正文
			BodyPart contentPart = new MimeBodyPart();
			contentPart.setContent(sendHtml, "text/html;charset=UTF-8");
			multipart.addBodyPart(contentPart);
			// 添加附件的内容
			/*
			if (attachment != null) {
				BodyPart attachmentBodyPart = new MimeBodyPart();
				DataSource source = new FileDataSource(attachment);
				attachmentBodyPart.setDataHandler(new DataHandler(source));

				// 网上流传的解决文件名乱码的方法，其实用MimeUtility.encodeWord就可以很方便的搞定
				// 这里很重要，通过下面的Base64编码的转换可以保证你的中文附件标题名在发送时不会变成乱码
				// sun.misc.BASE64Encoder enc = new sun.misc.BASE64Encoder();
				// messageBodyPart.setFileName("=?GBK?B?" +
				// enc.encode(attachment.getName().getBytes()) + "?=");

				// MimeUtility.encodeWord可以避免文件名乱码
				attachmentBodyPart.setFileName(MimeUtility
						.encodeWord(attachment.getName()));
				multipart.addBodyPart(attachmentBodyPart);
			}
			*/
			//String urlAll=java.io.File.separator+"home"+java.io.File.separator+"seawork"+java.io.File.separator+java.io.File.separator+"webapp"+java.io.File.separator;
			String urlAll=java.io.File.separator+"home"+java.io.File.separator+"seawork"+java.io.File.separator+java.io.File.separator+"webapp"+java.io.File.separator;
			//添加多个附件
			//String[] filePath=receiveUserCC.split(";");
			HttpServletRequest request = null;
			/*
			if (filePath != null) {
	            BodyPart mdp = new MimeBodyPart();// 新建一个存放信件内容的BodyPart对象  
	            //mdp.setContent(text, "textml;charset=UTF-8");// 给BodyPart对象设置内容和格式/编码方式  
	            Multipart mm = new MimeMultipart();// 新建一个MimeMultipart对象用来存放BodyPart对象  
	            mm.addBodyPart(mdp);// 将BodyPart加入到MimeMultipart对象中(可以加入多个BodyPart)  
	            // 把mm作为消息对象的内容  
	            MimeBodyPart filePart;  
	            FileDataSource filedatasource;  
	            // 逐个加入附件  
	            for (int j = 0; j < filePath.length; j++) {  
	                filePart = new MimeBodyPart();  
	                filedatasource = new FileDataSource(getAttachmentPath(request)+filePath[j]);  
	                filePart.setDataHandler(new DataHandler(filedatasource));  
	                try {  
	                    filePart.setFileName(MimeUtility.encodeText(filedatasource.getName()));  
	                } catch (Exception e) {  
	                    e.printStackTrace();  
	                }  
	                mm.addBodyPart(filePart);  
	            }  
	            message.setContent(mm);  
	        } 
*/
			// 附件操作  
            if (filePath != null && filePath.length > 0) {  
                for (int i=0;i<filePath.length;i++) {  
                	String filename = filePath[i];
                    MimeBodyPart mbp = new MimeBodyPart();  
                    // 得到数据源  
                    FileDataSource fds = new FileDataSource(getAttachmentPath(request)+filename);  
                    BodyPart attachmentBodyPart = new MimeBodyPart();
    				attachmentBodyPart.setDataHandler(new DataHandler(fds));
    				// 网上流传的解决文件名乱码的方法，其实用MimeUtility.encodeWord就可以很方便的搞定
    				// 这里很重要，通过下面的Base64编码的转换可以保证你的中文附件标题名在发送时不会变成乱码
    				 sun.misc.BASE64Encoder enc = new sun.misc.BASE64Encoder();
    				 attachmentBodyPart.setFileName("=?GBK?B?" +
    				 enc.encode(fds.getName().getBytes()) + "?=");
    				 String fjname=fds.getName();
    				 String title=subject.replaceAll(":", "_");
    				 title=title.replaceAll(",", "_");
    				 String filetype=fjname.substring(fjname.lastIndexOf("."));
    				// MimeUtility.encodeWord可以避免文件名乱码
    				attachmentBodyPart.setFileName(MimeUtility
    						.encodeWord(title+"."+filetype));
    				multipart.addBodyPart(attachmentBodyPart);
                    /*
                    // 得到附件本身并至入BodyPart  
                    mbp.setDataHandler(new DataHandler(fds));  
                    // 得到文件名同样至入BodyPart  
                    mbp.setFileName(fds.getName());  
                    multipart.addBodyPart(mbp);  
                    */
                }  
                MimeBodyPart mbp = new MimeBodyPart();  
                mbp.setText(sendHtml);  
                multipart.addBodyPart(mbp);  
                // Multipart加入到信件  
                message.setContent(multipart);  
            } else {  
                // 设置邮件正文  
            	message.setText(sendHtml);  
            }  
			// 保存邮件
			message.saveChanges();
			transport = session.getTransport("smtp");
			// smtp验证，就是你用来发邮件的邮箱用户名密码  根据staffid查询邮箱密码
			String emailpwd=data.getString("emailpwd");
			transport.connect(mailHost, Email, emailpwd);
			// 发送
			transport.sendMessage(message, message.getAllRecipients());
			System.out.println("send success!");
		} catch (Exception e) {
			e.printStackTrace();
			return 2;//发送失败
		} finally {
			if (transport != null) {
				try {
					transport.close();
				} catch (MessagingException e) {
					e.printStackTrace();
					return 3;//发送异常
				}
			}
		}
		return 1;
	}

public static String getAttachmentPath(HttpServletRequest request){
		
		Properties prop = System.getProperties();
		String os = prop.getProperty("os.name");
		if(os.startsWith("win") || os.startsWith("Win"))
		{
			return "d:\\seawork"+java.io.File.separator+"webapp"+java.io.File.separator;
		}else
		{
			return java.io.File.separator+"data"+java.io.File.separator+"upload"+java.io.File.separator;
		}
	}
	
	
	public static void main(String[] args) throws MessagingException {
		JavaMailWithAttachment se = new JavaMailWithAttachment(true);
		File affix = new File("d:\\TSL箱号表格.xls");
		//se.doSendHtmlEmail("邮件主题", "邮件内容", "469610780@qq.com", affix);//
		//transport = se.session.getTransport("smtp");
		se.session.getTransport("smtp").connect("smtp.mxhichina.com", "info@sino-sources.com", "Sino_135");
	}
}
