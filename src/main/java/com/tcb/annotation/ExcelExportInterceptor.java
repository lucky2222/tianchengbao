package com.tcb.annotation;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.tcb.view.ListViewExcel;
import com.tcb.view.ViewExcel;

public class ExcelExportInterceptor  extends HandlerInterceptorAdapter{
	private static final Logger logger = LoggerFactory.getLogger(ExcelExportInterceptor.class);
	
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		//logger.debug("ExcelExport 拦截器 start .....");
		if(request.getParameterMap().containsKey("auto_export_excel"))
		{
			logger.debug("分页信息自动导出为EXCEL");
			//if(request.getParameterMap().containsKey("export_excel_result"))
			//{
			//	logger.debug("导出EXCEL结果集："+request.getParameter("export_excel_result"));
			//}
			//modelAndView.getModelMap().get(request.getParameter("export_excel_result"));
			ViewExcel viewExcel = new ViewExcel();
			logger.debug("modelAndView.getModelMap()："+modelAndView.getModelMap());
			logger.debug("viewExcel："+viewExcel);
			modelAndView.setView(viewExcel);
			//logger.debug("自动导出为EXCEL设置完毕");
		}else if(request.getParameterMap().containsKey("auto_export_excel_by_list"))
		{
			//导出列表结果
			ListViewExcel listviewExcel = new ListViewExcel();
			
			if(request.getParameterMap().containsKey("export_excel_result"))
			{
				String resultname = request.getParameter("export_excel_result");//导出结果集名称
				modelAndView.getModel().put("resultname","resultname");
			}
			if(request.getParameterMap().containsKey("export_excel_result_field"))
			{
				String resultfield = request.getParameter("export_excel_result_field");//导出结果集表头
				modelAndView.getModel().put("resultfield","resultfield");
			}
			logger.debug("modelAndView.getModelMap()："+modelAndView.getModelMap());
			logger.debug("ListViewExcel："+listviewExcel);
			modelAndView.setView(listviewExcel);
		}
		
		//logger.debug("ExcelExport 拦截器 end .....");
		/*
		 if(handler.getClass().isAssignableFrom(HandlerMethod.class)){
	        	ExcelExport excelexport = ((HandlerMethod) handler).getMethodAnnotation(ExcelExport.class);
	        	if(excelexport!=null)
	        	{
	        		logger.debug("excelexport ....");
	        		logger.debug("param:"+request.getParameterMap());
	        		if(modelAndView.getModel().containsKey("result"))
	        		{
	        			logger.debug(modelAndView.getViewName());
	        		}
	        		
	        		
	        	}else{
	        		logger.debug(" no  excelexport .....");
	        	}
		 }
		 */
	}
}
