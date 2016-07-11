package com.tcb.tag;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

public class SyncDiv  extends TagSupport{
	//接受属性名称
	private String parainit;
	//初始化参数
	private String param;
	//调用地址
	private String urlref;
	//回调函数
	private String callback;
	
	public String getparainit() {
		return parainit;
	}
	public void setparainit(String parainit) {
		this.parainit = parainit;
	}
	public String getParam() {
		return param;
	}
	public void setParam(String param) {
		this.param = param;
	}
	public String getUrlref() {
		return urlref;
	}
	public void setUrlref(String urlref) {
		this.urlref = urlref;
	}
	public String getCallback() {
		return callback;
	}
	public void setCallback(String callback) {
		this.callback = callback;
	}

	@Override
	public int doStartTag() throws JspException {
		JspWriter out = this.pageContext.getOut();
    	try {
    		ScriptEnd.addScriptFile(pageContext.getRequest(), "/resources/js/ehanglib/syncdiv.js");
    		if(parainit==null) parainit="";
    		if(urlref==null) urlref="";
    		if(param==null) param="";
    		if(callback==null) callback="";
    		
			out.println("<div  id=\"sync_"+id+"\">");
			out.println("</div>");
			ScriptEnd.addScript(pageContext.getRequest(),"initSyncDiv(\""+id+"\",\""+parainit+"\",\""+urlref+"\",\""+param+"\",\""+callback+"\");");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return TagSupport.SKIP_BODY; 
	}
}
