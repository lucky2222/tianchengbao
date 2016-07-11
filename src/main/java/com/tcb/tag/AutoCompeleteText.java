package com.tcb.tag;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.TagSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tcb.annotation.CheckLoginInterceptor;

/**
 * 自动完成输入框
 * @author jiayl
 *
 */
public class AutoCompeleteText extends TagSupport{
	private static final Logger logger = LoggerFactory.getLogger(AutoCompeleteText.class);
	//接受属性名称
	private String name;
	private String value;
	//样式属性
	private String clazz;
	private String style;
	//默认显示值
	private String placeholder;
	//默认控件的属性值
	private String placeholdervalue;
	//表单展示字段ID
	private String showid;
	//表单展示字段名称
	private String showname;
	//数据源调用链接
	private String urlref;
	//最小触发字符数
	private String minchars;
	//结果集展示字段名
	private String showfieldid;
	//结果集后台使用字段名
	private String valuefieldid;
	//From内联动参数  参数名+逗号分开
	private String params;
	//初始化后台值
	private String initvalue;
	//初始化标识
	private String initflag;
	private String callback;
	
	
	public String getPlaceholder() {
		return placeholder;
	}

	public void setPlaceholder(String placeholder) {
		this.placeholder = placeholder;
	}

	public String getPlaceholdervalue() {
		return placeholdervalue;
	}

	public void setPlaceholdervalue(String placeholdervalue) {
		this.placeholdervalue = placeholdervalue;
	}

	public String getName() {  
        return name;  
    }
  
    public void setName(String name) {  
        this.name = name;  
    }
    
    public String getShowid() {
		return showid;
	}

	public void setShowid(String showid) {
		this.showid = showid;
	}

	public String getShowname() {
		return showname;
	}

	public void setShowname(String showname) {
		this.showname = showname;
	}

	public String getUrlref() {
		return urlref;
	}

	public void setUrlref(String urlref) {
		this.urlref = urlref;
	}

	public String getMinchars() {
		return minchars;
	}

	public void setMinchars(String minchars) {
		this.minchars = minchars;
	}

	public String getShowfieldid() {
		return showfieldid;
	}

	public void setShowfieldid(String showfieldid) {
		this.showfieldid = showfieldid;
	}

	public String getValuefieldid() {
		return valuefieldid;
	}

	public void setValuefieldid(String valuefieldid) {
		this.valuefieldid = valuefieldid;
	}

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	public String getInitvalue() {
		return initvalue;
	}

	public void setInitvalue(String initvalue) {
		this.initvalue = initvalue;
	}

	public String getInitflag() {
		return initflag;
	}

	public void setInitflag(String initflag) {
		this.initflag = initflag;
	}
	
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	public String getClazz() {
		 return clazz;
	}

	public void setClazz(String clazz) {
		this.clazz = clazz;
	}
	
	public String getStyle() {
		 return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}
	
	public String getCallback() {
		 return callback;
	}

	public void setCallback(String callback) {
		this.callback = callback;
	}
	
	
	@Override
	public int doStartTag() throws JspException {
    	ScriptEnd.addScriptFile(pageContext.getRequest(), "/resources/js/ehanglib/autocomplete.js");
    	if(value==null) value="";
    	if(clazz==null) clazz="";
    	if(style==null) style="";
    	if(initvalue==null) initvalue="";
    	if(params==null) params="";
    	if(callback==null) callback="";
    	if(initflag==null) initflag="";
    	
    	JspWriter out = pageContext.getOut();
    	try {
			out.println("<input id=\""+showid+"\" name=\""+showname+"\" type=\"text\" class=\""+clazz+"\" style=\""+style+"\" value=\""+value+"\"  data-target=\""+id+"_autoList\"  placeholder=\""+placeholder+"\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\" >");
			//out.println("<img id=\""+id+"_load_img\"  name=\""+id+"_load_img\" src=\""+pageContext.getServletContext().getContextPath()+"/resources/image/icoLoading.gif\" style=\"display:none;\">");
			out.println("<input id=\""+id+"\"  name=\""+name+"\" type=\"hidden\"  value=\""+initvalue+"\" minChars=\""+minchars+"\" params=\""+params+"\">");
			out.println("<div  id=\""+id+"_autoList\" class=\"dropdown-menu\"></div>");
            
		} catch (IOException e) {
			e.printStackTrace();
		}
    	ScriptEnd.addScript(pageContext.getRequest(),"initAutoCompeleteText('"+showid+"','"+id+"','"+showfieldid+"','"+valuefieldid+"','"+urlref+"','"+callback+"','"+minchars+"');");
    	if(initflag.equals("true"))
    	{
    		ScriptEnd.addScript(pageContext.getRequest(),"auto_page_init($(\"#"+id+"_autoList\"),\""+urlref+"\",\""+showid+"\",\""+id+"\",\""+showfieldid+"\",\""+valuefieldid+"\",\""+callback+"\");");
    	}
		return TagSupport.EVAL_BODY_INCLUDE; 
	}
   
}
