package com.tcb.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyContent;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FileUpload extends BodyTagSupport{
	private static final Logger logger = LoggerFactory.getLogger(FileUpload.class);
	//接受属性名称
	private String name;
	//初始化参数
	private String uploadpath;
	//样式属性
	private String style;
	//样式属性
	private String actionurl;
	//初始化值
	private String allowedTypes;
	//回调函数
	private String callback;
	//参数值
	private String param;
	//源文件名
	private String srcname;	
	
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUploadpath() {
		return uploadpath;
	}

	public void setUploadpath(String uploadpath) {
		this.uploadpath = uploadpath;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public String getActionurl() {
		return actionurl;
	}

	public void setActionurl(String actionurl) {
		this.actionurl = actionurl;
	}

	public String getAllowedTypes() {
		return allowedTypes;
	}

	public void setAllowedTypes(String allowedTypes) {
		this.allowedTypes = allowedTypes;
	}

	public String getCallback() {
		return callback;
	}

	public void setCallback(String callback) {
		this.callback = callback;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}
	
	public String getSrcname() {
		return srcname;
	}

	public void setSrcname(String srcname) {
		this.srcname = srcname;
	}

	@Override
	public int doStartTag() throws JspException {
    	ScriptEnd.addScriptFile(pageContext.getRequest(), "/resources/js/ehanglib/fileupload.js");
    	JspWriter out = this.pageContext.getOut();
    	try {
			out.println("<div><div id=\""+id+"_uploader\" >");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_BODY_INCLUDE; 
	}
	
	public int doAfterBody() throws JspException {
		JspWriter out = this.pageContext.getOut();
		try {  
	         BodyContent bodycontent = getBodyContent();
	         if(bodycontent!=null){
	        	 String body = bodycontent.getString(); 
	        	 out.println(body);
	         }
	      }catch (IOException e) {
				e.printStackTrace();
		}
		return SKIP_BODY;
	}
	
	@Override
    public int doEndTag() throws JspException {
		JspWriter out = this.pageContext.getOut();
		if(name==null) name=id;
    	if(style==null) style="";
    	if(uploadpath==null) uploadpath="";
    	if(actionurl==null) actionurl="";
    	if(allowedTypes==null) allowedTypes="*";
    	if(callback==null) callback="";
    	if(param==null) param="";
		if(srcname==null) srcname="src_"+id;
    	try {
			out.println("</div>");
			out.println("<input type=\"hidden\" id=\""+id+"\" name=\""+name+"\">");
			out.println("<input type=\"hidden\" id=\""+srcname+"\" name=\""+srcname+"\">");
			out.println("<div id=\""+id+"_err\" class=\"ajax-file-upload-error\"></div>");
			out.println("</div>");
		} catch (IOException e) {
			e.printStackTrace();
		}
    	ScriptEnd.addScript(pageContext.getRequest(),"initFileUpload('"+id+"','"+actionurl+"','"+uploadpath+"','"+allowedTypes+"','"+callback+"','"+param+"','"+srcname+"');");
        return EVAL_PAGE;
    }

    @Override
    public void release() {
        super.release();
    }
	
}
