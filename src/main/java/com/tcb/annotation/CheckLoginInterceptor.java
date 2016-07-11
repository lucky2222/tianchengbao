package com.tcb.annotation;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.PageContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.tcb.dao.base.DataRow;
import com.tcb.dao.service.UserManageService;


public class CheckLoginInterceptor extends HandlerInterceptorAdapter{
	private static final Logger logger = LoggerFactory.getLogger(CheckLoginInterceptor.class);
	@Autowired
	UserManageService userservice;
	
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		//logger.debug("请求路径:"+request.getRequestURL());
		//logger.debug("QueryString-->"+request.getQueryString());
		//logger.debug("getRequestURI-->"+request.getRequestURI());
        if(handler.getClass().isAssignableFrom(HandlerMethod.class)){
        	CheckLogin checklogin = ((HandlerMethod) handler).getMethodAnnotation(CheckLogin.class);
        	int start = request.getRequestURI().indexOf(request.getContextPath())+request.getContextPath().length()+1;
        	List<DataRow> breadlist = userservice.getBreadCrumb(request.getRequestURI().substring(start));
    		request.setAttribute("BreadCrumbList", breadlist);
    		
            //没有声明需要权限,或者声明不验证权限
        	if(checklogin == null)
        	{
        		logger.debug("无须登录校验");
        		if(breadlist!=null)
        		{
	        		for(DataRow bread : breadlist)
	        		{
	        			if(bread.getInt("vistflag")==1)
	        			{
	        				request.setAttribute("PageTitle",bread.getString("menuname"));
	        			}
	        		}
        		}
        		return true;
        	}else{
        		if(!checklogin.title().isEmpty())
            	{
            		request.setAttribute("PageTitle",checklogin.title());
            	}else{
            		if(breadlist!=null)
            		{
    	        		for(DataRow bread : breadlist)
    	        		{
    	        			if(bread.getInt("vistflag")==1)
    	        			{
    	        				request.setAttribute("PageTitle",bread.getString("menuname"));
    	        			}
    	        		}
            		}
            	}
                //在这里实现自己的权限验证逻辑
        		if(checklogin.mustLogin()&&checklogin.menucode().equals("")&&checklogin.functioncode().equals("")&&checklogin.datacode().equals(""))
        		{
        			// 仅检验是否登录
        			if(request.getSession().getAttribute("OnlineStaff")!=null)
        			{
        				logger.debug("已经登录，可以继续访问");
        				return true;
        			}else{
        				logger.debug("登录校验失败，未登录->"+request.getContextPath()+"/login");
        				
        				response.sendRedirect(request.getContextPath()+"/login");
        				return false;
        			}
        		}else{
        			//检查权限是否存在，后续实现
        			if(!checklogin.mustLogin())
        			{
        				logger.debug("无需登录，可以继续访问");
    					return true;
        			}
        		}
        		//返回到登录界面
        		response.sendRedirect("/login");
                return false;
            }
        }
        else
            return true;   
     }
	
}
