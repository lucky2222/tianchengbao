package com.tcb.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MultipleSelect extends TagSupport{
	private static final Logger logger = LoggerFactory.getLogger(MultipleSelect.class);
	//接受属性名称
	private String name;
	//样式属性
	private String style;
	//展示内容地址
	private String urlref;
	//展示字段
	private String showname;
	//提交字段
	private String valuename;
	//初始化值
	private String initvalue;
	//回调函数
	private String callback;
	//初始化参数
	private String param;
	
	
	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getStyle() {
		return style;
	}


	public void setStyle(String style) {
		this.style = style;
	}


	public String getUrlref() {
		return urlref;
	}


	public void setUrlref(String urlref) {
		this.urlref = urlref;
	}


	public String getShowname() {
		return showname;
	}


	public void setShowname(String showname) {
		this.showname = showname;
	}


	public String getValuename() {
		return valuename;
	}


	public void setValuename(String valuename) {
		this.valuename = valuename;
	}


	public String getInitvalue() {
		return initvalue;
	}


	public void setInitvalue(String initvalue) {
		this.initvalue = initvalue;
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


	@Override
	public int doStartTag() throws JspException {
    	ScriptEnd.addScriptFile(pageContext.getRequest(), "/resources/js/ehanglib/multipleselect.js");
    	if(style==null) style="";
    	if(name==null) name=id;
    	if(param==null) param="";
    	if(initvalue==null) initvalue="";
    	if(callback==null) callback="";
    	
    	JspWriter out = this.pageContext.getOut();
    	try {
			//out.println("<div class=\"row\">");
			out.println("<input id=\"show_"+id+"\"  name=\"show_"+name+"\" type=\"text\"  value=\"\" class=\""+style+"\">");
			out.println("<input id=\""+id+"\"  name=\""+name+"\" type=\"hidden\"  value=\""+initvalue+"\">");
			out.println("<div  id=\""+id+"_body\">");
			out.println("</div>");
			//out.println("</div>");
		} catch (IOException e) {
			e.printStackTrace();
		}
    	ScriptEnd.addScript(pageContext.getRequest(),"initMultipleSelect('"+id+"','"+urlref+"','"+showname+"','"+valuename+"','"+initvalue+"','"+callback+"','"+param+"');");
		return TagSupport.EVAL_BODY_INCLUDE; 
	}
}
