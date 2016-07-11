package com.tcb.controller;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.dao.service.ModalPageService;
import com.tcb.util.ResultByPageService;

@Controller
@RequestMapping("/modalpage")
public class ModalPageController {
	private static final Logger logger = LoggerFactory.getLogger(ModalPageController.class);
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	ModalPageService modalservice;
	/**
	 * 调用模态框页面
	 * @param pagename
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/page/{pagename}", method = RequestMethod.GET)
	public String pageRequest(@PathVariable String pagename, HttpServletRequest request,Model model)
	{
		DataRow param = rbpservice.getParamByRequest(request);
		if(param.containsKey("initpage")&&!param.getString("initpage").equals(""))
		{
			DataRow result = modalservice.callInitService(pagename, param);
			model.addAttribute("result", result);
		}
		return "modalpage/"+pagename;
	}
	
	/**
	 * 模态框内容提交
	 * @param servicename
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/submit/{servicename}", method = RequestMethod.GET)
	@ResponseBody
	public String submitPage(@PathVariable String servicename, HttpServletRequest request)
	{
		DataRow param = rbpservice.getParamByRequest(request);
		DataRow result = modalservice.callService(servicename, param);
		if(result!=null)
		{
			return JSON.toJSONString(result);
		}else{
			return "";
		}
	}
}
