package com.tcb.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tcb.annotation.CheckLogin;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.ResultByPageService;

@Controller
public class FirstPageManager {
	private static final Logger logger = LoggerFactory
			.getLogger(FirstPageManager.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	ResultByPageService rbpservice;
	
	/**
	 * 展示首页
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin
	@RequestMapping(value = "/shengda/firstpagemanager")
	public String showAllcofig(HttpServletRequest request, Model model) throws Exception {
		ResultByPage articlelist = rbpservice.getByRequest(request);
		articlelist.setPerpage(20);
		dbservice.selectListByPage("product_show.selectProductShow",articlelist);
		logger.debug("---------articlelist----------"+articlelist.getResultlist());
		request.setAttribute("resultList", articlelist.getResultlist());
		request.setAttribute("result", articlelist);
		return "shengda/pagefirst/firstpagemanager";
	}
	
	
	/**
	 * 创建产品
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin
	@RequestMapping(value = "/main/domodifySDproduct")
	public String domodifySDproduct(HttpServletRequest request,Model model) throws Exception {
		Object onlinestaff = request.getSession().getAttribute("OnlineStaff");
		DataRow param = rbpservice.getParamByRequest(request);
		
		param.put("update_time", DateTimeUtil.getNowDateStr());
		param.transTo("myid", "id");
		param.transTo("object_id", "product_id");
		if(onlinestaff!=null)
		{
			param.put("updatestaff",
				((DataRow) onlinestaff).getString("staffid"));
		}
		dbservice.UpdateByKey("product_show", param);

		return "forward:/shengda/firstpagemanager";
	}
	
	/**
	 * 展示首页
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin
	@RequestMapping(value = "/message/companyContact")
	public String showAllContact(HttpServletRequest request, Model model) throws Exception {
		ResultByPage articlelist = rbpservice.getByRequest(request);
		articlelist.setPerpage(20);
		dbservice.selectListByPage("product_show.selectCompanycontact",articlelist);
		logger.debug("---------articlelist----------"+articlelist.getResultlist());
		request.setAttribute("resultList", articlelist.getResultlist());
		request.setAttribute("result", articlelist);
		return "shengda/userManager/companyContactmanager";
	}
	
	
	/**
	 * 创建产品
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin
	@RequestMapping(value = "/main/domodifycompanyContact")
	public String domodifycompanyContact(HttpServletRequest request,Model model) throws Exception {
		Object onlinestaff = request.getSession().getAttribute("OnlineStaff");
		DataRow param = rbpservice.getParamByRequest(request);
		
		param.put("update_time", DateTimeUtil.getNowDateStr());
		param.transTo("myid", "id");
		param.transTo("object_id", "product_id");
		if(onlinestaff!=null)
		{
			param.put("updatestaff",
				((DataRow) onlinestaff).getString("staffid"));
		}
		dbservice.UpdateByKey("product_show", param);

		return "forward:/message/companyContact";
	}
}
