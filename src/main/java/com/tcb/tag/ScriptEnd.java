package com.tcb.tag;

import java.util.ArrayList;
import java.util.HashSet;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/**
 * 最终输出JavaScript的初始化信息
 * 以及对应js引用信息
 * @author jiayl
 */
public class ScriptEnd extends TagSupport{
	private static final Logger logger = LoggerFactory.getLogger(ScriptEnd.class);
	
	@Override
	public int doStartTag() throws JspException {
		try{
			HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
			JspWriter out = this.pageContext.getOut();
			//脚本文件引入
	    	HashSet<String> scriptfilelist = (HashSet<String>) request.getAttribute("ScriptFileList");
	    	if(scriptfilelist!=null)
	    	{
	    		for(String scriptfile : scriptfilelist )
	    		{
	    			out.println("<script src=\""+scriptfile+"\"></script>");
	    		}
	    	}
	    	//脚本初始化
			ArrayList<String> scriptlist = (ArrayList<String>) request.getAttribute("ScriptList");
	    	if(scriptlist!=null)
	    	{
	    		out.println("<script type=\"text/javascript\">");
	    		out.println("$(function(){");
	    		for(String script : scriptlist )
	    		{
	    			out.println(script);
	    		}
	    		out.println("})");
	    		out.println("</script>");
	            //out=pageContext.pushBody();
	    	}
		}catch(Exception e){
			e.printStackTrace();
		}
		return TagSupport.EVAL_BODY_INCLUDE;
	}
	
	 /**
     * 添加脚本语句
     * @param servletRequest
     * @param script
     */
    public static void addScript(ServletRequest servletRequest,String script)
    {
    	logger.debug("addScript ..."+script);
    	HttpServletRequest request = (HttpServletRequest) servletRequest;
    	ArrayList<String> scriptlist = (ArrayList<String>) request.getAttribute("ScriptList");
    	if(scriptlist!=null)
    	{
    		scriptlist.add(script);
    	}else{
    		scriptlist = new ArrayList<String>();
    		scriptlist.add(script);
    		request.setAttribute("ScriptList", scriptlist);
    	}
    	logger.debug("addScripted.");
    }
    /**
     *  添加脚本文件引入
     * @param servletRequest
     * @param scriptfile
     */
    public static void addScriptFile(ServletRequest servletRequest,String scriptfile)
    {
    	logger.debug("addScriptFile ..."+scriptfile);
    	HttpServletRequest request = (HttpServletRequest) servletRequest;
    	HashSet<String> scriptlist = (HashSet<String>) request.getAttribute("ScriptFileList");
    	if(scriptlist!=null)
    	{
    		scriptlist.add(scriptfile);
    	}else{
    		scriptlist = new HashSet<String>();
    		scriptlist.add(scriptfile);
    		request.setAttribute("ScriptFileList", scriptlist);
    	}
    	logger.debug("addScriptFiled.");
    }
}
