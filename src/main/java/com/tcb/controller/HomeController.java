package com.tcb.controller;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;

import com.alibaba.fastjson.JSON;
import com.tcb.annotation.CheckLogin;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.MainMenuNode;
import com.tcb.dao.base.ResultByPage;
import com.tcb.dao.service.UserManageService;
import com.tcb.util.MD5Util;
import com.tcb.util.ResultByPageService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	UserManageService userservice;
	
	/**
	 * 首页
	 * @throws Exception 
	 */
	@RequestMapping(value = "/admin")
	public String home(Locale locale, Model model) throws Exception {
		return "/login";
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String user(Model model)
	{
		return "test";
	}
	
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login()
	{
		return "login";
	}
	
	@CheckLogin
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String goIndex(HttpServletRequest request,Model model)
	{
		if(request.getSession().getAttribute("OnlineStaff")!=null)
		{
			return "index";
		}
		return "login";
	}
	
	@RequestMapping(value = "/index", method = RequestMethod.POST)
	public String dologin(HttpServletRequest request,Model model)
	{
		logger.info("dologin user ....");
		try {
			DataRow param = rbpservice.getParamByRequest(request);
			param.put("loginip", request.getRemoteHost());
			DataRow staff = userservice.doLogin(param);
			if(staff==null||staff.isEmpty()||staff.getInt("state")!=0)
			{
				model.addAttribute("login", param);
				return "login";
			}
			staff.put("functionright", userservice.getFunctionrightByStaffid(param));
			
			request.getSession().setAttribute("OnlineStaff",staff);
			ArrayList<MainMenuNode> StaffMenuList=userservice.getUserMenu(param.getString("staffid"));
			request.getSession().setAttribute("StaffMenuList",StaffMenuList);
			
		} catch (Exception e) {
			logger.info("dologin user error.");
			e.printStackTrace();
		}
		return "index";
	}
	
	@RequestMapping(value = "/home",method = RequestMethod.GET)
	public String commonHead(HttpServletRequest request, Model model) throws Exception
	{
		logger.info("menubytags -->get");
		ResultByPage rbp = rbpservice.getByRequest(request);
		dbservice.selectListByPage("menuMapper.selectMenuList", rbp);
		model.addAttribute("tagtestresult", rbp);
		model.addAttribute("menuname", rbp.getCondition().get("menuname"));
		model.addAttribute("menufile", rbp.getCondition().get("menufile"));
		return "home";
	}
	
	/**
	 * 系统退出
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request)
	{
		request.getSession().setAttribute("OnlineStaff",null);
		return "login";
	}
	/**
	 * 根据用户ID查询未读消息数
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getMsgNumByStaffid", method = RequestMethod.GET)
	@ResponseBody
	public String getMsgNumByStaffid(HttpServletRequest request) throws Exception
	{
		DataRow param = rbpservice.getParamByRequest(request);
		DataRow result = new DataRow();
		result.put("login",false);
		if(param==null||param.getString("updatestaff")==null)
		{
			result.put("nums",0);
		}else{
			param.transTo("updatestaff", "staffid");
			result = dbservice.querySimpleRowByName("tf_ordermsg.countNoReadMsg", param);
			result.put("login",true);
		}
		return JSON.toJSONString(result);
	}
	
	/**
	 * 首页内容
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/indexcontext", method = RequestMethod.GET)
	public String indexcontext(HttpServletRequest request)
	{
		return "indexcontext";
	}
	
	/**
	 * 密码初始化，临时用
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/initpassword", method = RequestMethod.GET)
	@ResponseBody
	@CheckLogin
	public String initPassword(HttpServletRequest request) throws Exception
	{
		/*
		StringBuffer retstr = new StringBuffer("<html><head><title>密码初始化</title></head><body><table>");
		DataRow param = new DataRow();
		param.put("flag",1);
		param.put("staffid", "xxxxxx");
		List<DataRow> userlist  = dbservice.queryListByParam("td_userinfo", param, null, null);
		for(DataRow user : userlist)
		{
			String key = user.getString("staffid").toUpperCase()+"123";
			String newpass = MD5Util.makeMD5(key);
			DataRow passparam = new DataRow();
			passparam.put("staffid", user.getString("staffid"));
			passparam.put("password", newpass);
			dbservice.UpdateByKey("td_userinfo", passparam);
			logger.debug(user.getString("staffid")+"----更新密码为123。");
			retstr.append("<tr><td>").append(user.getString("staffid")).append("</td></tr>");
		}
		retstr.append("</table></body></html>");
		return retstr.toString();
		*/
		return "不开放";
	}
}
