package com.tcb.tag;

import java.util.ArrayList;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

public class OrderStatus extends TagSupport{
		@Override
		public int doStartTag() throws JspException {
			JspWriter out = this.pageContext.getOut();
	    	try {
	    		ScriptEnd.addScriptFile(pageContext.getRequest(), "/resources/js/ehanglib/orderstatus.js");
				out.println("<ul class=\"didlc\" id=\"status_"+id+"\">");
				out.println("</ul>");
				ScriptEnd.addScript(pageContext.getRequest(),"initOrderStatus(\""+id+"\");");
			} catch (Exception e) {
				e.printStackTrace();
			}
			return TagSupport.SKIP_BODY; 
		}
}
