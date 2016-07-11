package com.tcb.tag;

import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import com.tcb.dao.base.DataRow;

public class EhangSelect extends TagSupport{
	//接受属性名称
	private String name;
	//默认控件的属性值
	private String groupname;
	//默认控件的属性值
	private String classname;
	//默认控件的属性值
	private String initvalue;
	//默认控件的属性值
	private String placeholder;
	//回调函数
	private String callback;
	
	@Override
	public int doStartTag() throws JspException {
		JspWriter out = this.pageContext.getOut();
    	try {
    		if(classname==null||classname.isEmpty())
    		{
    			classname ="input-sm";
    		}
    		if(initvalue==null)
    		{
    			initvalue = "";
    		}
    		if(placeholder==null) placeholder="";
    		if(callback==null) callback="";
    		
    		List<DataRow> datalist = StaticCache.getListByGroupName(groupname);
			out.println("<select class=\""+classname+"\" id=\""+name+"\" name=\""+name+"\">");
			if(!placeholder.isEmpty())
			{
				if(initvalue.isEmpty())
				{
					out.println("<option value=\"\" selected = \"selected\">请选择</option>");
				}else{
					out.println("<option value=\"\">请选择</option>");
				}
			}
			for (DataRow item : datalist) {
				if (item.containsKey("name")
						&& item.containsKey("value")) {
					if(item.getString("value").equals(initvalue))
					{
						out.println("<option value='"+item.get("value")+"' selected = 'selected'>"+item.get("name")+"</option>");
					}else{
						out.println("<option value='"+item.get("value")+"'>"+item.get("name")+"</option>");
					}
				}
			}
			out.println("</select>");
            if(!callback.equals(""))
            {
            	ScriptEnd.addScript(pageContext.getRequest(),"$('#"+name+"').change(function(){"+callback+"($(this));});");
            }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return TagSupport.EVAL_BODY_INCLUDE; 
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
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
	
	
}
