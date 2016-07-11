package com.tcb.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.github.sd4324530.fastweixin.api.OauthAPI;
import com.github.sd4324530.fastweixin.api.config.ApiConfig;
import com.github.sd4324530.fastweixin.api.response.OauthGetTokenResponse;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.util.GeneratorIDUtil;
import com.tcb.util.ResultByPageService;
import com.tcb.yeepay.util.SignUtil;
/**
 * 用户帐户
 * @author jiayl
 */
//@Controller
public class AccountController {
	private static final Logger logger = LoggerFactory
			.getLogger(AccountController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	ResultByPageService rbpservice;
	private static ApiConfig config = new ApiConfig("wx7139ab62847dfb68",
			"0cec2c88111430d81be6cff20abcc00e", true);
	
	@RequestMapping({"/tcb/myaccount"})
	public String myAccount(HttpServletRequest request,Model model)
			throws Exception {
		if (request.getParameterMap().containsKey("code")) {
			OauthAPI oauthAPI = new OauthAPI(config);
			OauthGetTokenResponse userinfo = oauthAPI.getToken(request
					.getParameter("code"));
			request.setAttribute("state", userinfo.getOpenid());
			//
			logger.debug("userinfo.getOpenid-->" + userinfo.getOpenid());
			if(userinfo.getOpenid() !=null)
			{
				request.getSession().setAttribute("openid", userinfo.getOpenid());
				DataRow user = dbservice.querySimpleRowByKey("tf_f_user",
					userinfo.getOpenid());
				if (user != null) {
					request.setAttribute("onlineuser", user);
					request.getSession().setAttribute("onlineuser", user);
				}
			}else{
				return "/tcb/main";
			}
		} else {
			if (request.getSession().getAttribute("onlineuser") != null) {
				request.setAttribute("onlineuser", request.getSession()
						.getAttribute("onlineuser"));
			}
		}
		logger.debug("myAccount .....");
		if (request.getSession().getAttribute("onlineuser") != null) {
		DataRow param = (DataRow)request.getSession().getAttribute("onlineuser");
			logger.debug(param.toString());
			List<DataRow> accountlist = dbservice.queryListByParam("tf_f_account", param, null, null);
			request.setAttribute("accountlist",accountlist);
			logger.debug(accountlist.toString());
		}
		
		return "/tcb/account/myaccount";
	}
	
	/**
	 * 准备账户充值
	 */
	@RequestMapping({"/tcb/payin"})
	public String payin(HttpServletRequest request,Model model)
			throws Exception {
		if (request.getSession().getAttribute("onlineuser") != null) {
			request.setAttribute("onlineuser", request.getSession()
					.getAttribute("onlineuser"));
		}
		logger.debug("payin .....");
		if (request.getSession().getAttribute("onlineuser") != null) {
		DataRow param = (DataRow)request.getSession().getAttribute("onlineuser");
			logger.debug(param.toString());
			List<DataRow> accountlist = dbservice.queryListByParam("tf_f_account", param, null, null);
			request.setAttribute("accountlist",accountlist);
			logger.debug(accountlist.toString());
		}
		
		return "/tcb/account/payin";
	}
	/**
	 * 账户充值
	 */
	@RequestMapping({"/tcb/dopayin"})
	public String dopayin(HttpServletRequest request,Model model)
			throws Exception {
		if (request.getSession().getAttribute("onlineuser") != null) {
			request.setAttribute("onlineuser", request.getSession()
					.getAttribute("onlineuser"));
		}
		logger.debug("payin .....");
		if (request.getSession().getAttribute("onlineuser") != null) {
		DataRow param = (DataRow)request.getSession().getAttribute("onlineuser");
			logger.debug(param.toString());
			List<DataRow> accountlist = dbservice.queryListByParam("tf_f_account", param, null, null);
			request.setAttribute("accountlist",accountlist);
			logger.debug(accountlist.toString());
		}
		StringBuffer reqbuf = new StringBuffer();
		DataRow payparam = rbpservice.getParamByRequest(request);
		reqbuf.append("<request platformNo=\"10040011568\">")
				.append("<platformUserNo>111222333</platformUserNo>")
				.append("<requestNo>").append(GeneratorIDUtil.generatorId()).append("</requestNo>")
				.append("<amount>").append(payparam.getString("count")).append("</amount>")
				.append("<feeMode>PLATFORM</feeMode>")
				.append("<notifyUrl>http://127.0.0.1:8080/tcb/myaccount</notifyUrl>")
				.append("<callbackUrl>http://127.0.0.1:8080/product/saleproductcallback</callbackUrl></request>");

		String sign = SignUtil.sign(reqbuf.toString(),
				"hk1001001@test.com.p12.pfx", "123qwe");
		request.setAttribute("req", reqbuf.toString());
		request.setAttribute("sign", sign);
		return "/tcb/account/dopayin";
	}
	
	/**
	 * 准备账户提现
	 */
	@RequestMapping({"/tcb/payout"})
	public String payout(HttpServletRequest request,Model model)
			throws Exception {
		if (request.getSession().getAttribute("onlineuser") != null) {
			request.setAttribute("onlineuser", request.getSession()
					.getAttribute("onlineuser"));
		}
		logger.debug("payin .....");
		if (request.getSession().getAttribute("onlineuser") != null) {
		DataRow param = (DataRow)request.getSession().getAttribute("onlineuser");
			logger.debug(param.toString());
			List<DataRow> accountlist = dbservice.queryListByParam("tf_f_account", param, null, null);
			request.setAttribute("accountlist",accountlist);
			logger.debug(accountlist.toString());
		}
		
		return "/tcb/account/payout";
	}
	/**
	 * 账户提现
	 */
	@RequestMapping({"/tcb/dopayout"})
	public String dopayout(HttpServletRequest request,Model model)
			throws Exception {
		if (request.getSession().getAttribute("onlineuser") != null) {
			request.setAttribute("onlineuser", request.getSession()
					.getAttribute("onlineuser"));
		}
		
		DataRow payparam = rbpservice.getParamByRequest(request);
		logger.debug("payout ....."+payparam);
		String count = payparam.getString("count");
		String staffid = payparam.getString("updatestaff");
		logger.debug("记录到工单表，并消除个人账户，等待统一提现");
		return "/tcb/myaccount";
	}
}
