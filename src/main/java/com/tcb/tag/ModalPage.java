package com.tcb.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ModalPage extends TagSupport{
	private static final Logger logger = LoggerFactory.getLogger(ModalPage.class);
	//接受属性名称
	private String name;
	//初始化参数
	private String param;
	//样式属性
	private String style;
	//样式属性
	private String modalstyle;
	//初始化值
	private String initvalue;
	//回调函数
	private String callback;
	//模态框标题
	private String title;
	//模态框jsp名称
	private String pagename;
	//处理服务名称
	private String pageservice;
	//点击框外是否自动关闭
	private String backdrop;
	//是否进行页面初始化
	private String initpage;
	//提交前检查
	private String submitcheck;
	//同步标识
	private boolean sync=false;
	
	public boolean isSync() {
		return sync;
	}
	public void setSync(boolean sync) {
		this.sync = sync;
	}
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
	public static Logger getLogger() {
		return logger;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPagename() {
		return pagename;
	}
	public void setPagename(String pagename) {
		this.pagename = pagename;
	}
	public String getPageservice() {
		return pageservice;
	}
	public void setPageservice(String pageservice) {
		this.pageservice = pageservice;
	}
	public String getBackdrop() {
		return backdrop;
	}
	public void setBackdrop(String backdrop) {
		this.backdrop = backdrop;
	}
	public String getParam() {
		return param;
	}
	public void setParam(String param) {
		this.param = param;
	}
	public String getModalstyle() {
		return modalstyle;
	}
	public void setModalstyle(String modalstyle) {
		this.modalstyle = modalstyle;
	}
	public String getInitpage() {
		return initpage;
	}
	public void setInitpage(String initpage) {
		this.initpage = initpage;
	}
	public String getSubmitcheck() {
		return submitcheck;
	}
	public void setSubmitcheck(String submitcheck) {
		this.submitcheck = submitcheck;
	}
	
	@Override
	public int doStartTag() throws JspException {
    	ScriptEnd.addScriptFile(pageContext.getRequest(), "/resources/js/ehanglib/modalpage.js");
    	if(backdrop==null) backdrop="true";
    	if(style==null) style="";
    	if(modalstyle==null) modalstyle="";
    	if(param==null) param="";
    	if(initpage==null) initpage="";
    	if(submitcheck==null) submitcheck="";
    	
    	JspWriter out = this.pageContext.getOut();
    	try {
			out.println("<button type=\"button\" class=\"btn btn-primary "+style+"\" data-toggle=\"modal\" data-target=\"#"+id+"\" data-backdrop=\""+backdrop+"\">"+name+"</button>");
			out.println("<div class=\"modal fade\" id=\""+id+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\""+id+"Label\">");
			out.println("<div class=\"modal-dialog "+modalstyle+"\" role=\"document\">");
			out.println("<div class=\"modal-content\">");
			out.println("<div class=\"modal-header\">");
			out.println("<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>");
			out.println("<h4 class=\"modal-title\" id=\""+id+"Label\">"+title+"</h4>");
			out.println("</div>");
			out.println("<div class=\"modal-body\" id=\""+id+"_body\">");
			out.println("</div>");
			out.println("<div class=\"modal-footer\">");
			out.println("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>");
			out.println("<button id=\""+id+"_submit\" type=\"button\" class=\"btn btn-primary\">提交</button>");
			out.println("</div>");
			out.println("</div>");
			out.println("</div>");
			out.println("</div>");
		} catch (IOException e) {
			e.printStackTrace();
		}
    	ScriptEnd.addScript(pageContext.getRequest(),"initModalPage('"+id+"','"+title+"','"+initvalue+"','"+pagename+"','"+pageservice+"','"+callback+"','"+initpage+"','"+param+"','"+submitcheck+"',"+sync+");");
		return TagSupport.EVAL_BODY_INCLUDE; 
	}
}
