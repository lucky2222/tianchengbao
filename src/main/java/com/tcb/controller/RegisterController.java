package com.tcb.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.service.RegisterService;
import com.tcb.util.ResultByPageService;
import com.tcb.yeepay.util.SignUtil;

@Controller
@RequestMapping(value = "/register")
public class RegisterController {
	private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	private RegisterService registerservice;
	@Autowired
	ResultByPageService rbpservice;

	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String shiplocation(Model model) throws Exception {
		return "tcb/register/register";
	}
	/**
	 * 验证码发送
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/identifyingcode", method = RequestMethod.GET)
	@ResponseBody
	public String identifyingCode(HttpServletRequest request,Model model) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		logger.debug("identifyingcode :"+param);
		if(param.containsKey("telno"))
		{
			registerservice.saveIdentifyingcode(param);
			param.put("identifyingcode", true);
			request.getSession().setAttribute("randint",param.getString("randint"));
		}else{
			param.put("identifyingcode", false);
		}
		logger.debug("identifyingcode :"+param);
		return JSON.toJSONString(param);
	}
	
	/**
	 * 注册成功
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/doregister", method = RequestMethod.GET)
	public String doRegister(HttpServletRequest request,Model model) throws Exception {
		String randint = request.getSession().getAttribute("randint").toString();
		DataRow param = rbpservice.getParamByRequest(request);
		if(param.containsKey("randint")&&param.getString("randint").equals(randint))
		{
			param.put("openid", request.getSession().getAttribute("openid"));
			registerservice.doRegister(param);
		}else{
			return "tcb/register/register";
		}
		String req = "<request platformNo=\"10040011568\"><platformUserNo>"+param.getString("accountid")
				+"</platformUserNo><nickName>"+param.getString("username")+"</nickName><realName>"
				+param.getString("username")+
				"</realName><idCardType>G2_IDCARD</idCardType><idCardNo>430503198010100432</idCardNo><mobile>"+param.getString("telno")
				+"</mobile><email>test@hotmail.com</email><notifyUrl>http://www.baidu.com</notifyUrl>"
				+ "<callbackUrl>http://www.sino-sources.com/register/registercallback</callbackUrl></request>";
		String sign = SignUtil.sign(req, "hk1001001@test.com.p12.pfx", "123qwe");
		
		//String sign = "MIIFKQYJKoZIhvcNAQcCoIIFGjCCBRYCAQExCzAJBgUrDgMCGgUAMC8GCSqGSIb3DQEHAaAiBCA2ZDYyYmM0NzQwNGMxYTVkODE5MzY4YTcxZDUzMjFiYqCCA+swggPnMIIDUKADAgECAhBqe6nrCt+fci3xZjQH7hHsMA0GCSqGSIb3DQEBBQUAMCoxCzAJBgNVBAYTAkNOMRswGQYDVQQKExJDRkNBIE9wZXJhdGlvbiBDQTIwHhcNMTAxMjA2MDQ0ODE1WhcNMTExMjA2MDQ0ODE1WjCBgTELMAkGA1UEBhMCQ04xGzAZBgNVBAoTEkNGQ0EgT3BlcmF0aW9uIENBMjEWMBQGA1UECxMNcmEueWVlcGF5LmNvbTESMBAGA1UECxMJQ3VzdG9tZXJzMSkwJwYDVQQDFCAwNDFAWjEwMDAwMzY1NjQyQGxpYmluZ0AwMDAwMDAwMTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAuDInQe7L04o8f0pVUrAF52yEWFZiVpqzZXr7BpFll0qVaRNHVwycO2z/kpWMYGy2YXi2I16Wtn+9SVwjcVOqUBXQMGvuiDApJ7mJNN0VkLNppRCpJpAZWRbSh2Sn7zxn768dsu2Et+saIOGpSYCjBJBlmn7KS7t84E4tU3EFCPkCAwEAAaOCAbQwggGwMB8GA1UdIwQYMBaAFPCN7bNBu/vvCB5VAsMxN+88FE7NMB0GA1UdDgQWBBRWmAkcFN/mHizNprNca0Rdge/6YDALBgNVHQ8EBAMCBeAwDAYDVR0TBAUwAwEBADAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwQwgf0GA1UdHwSB9TCB8jBWoFSgUqRQME4xCzAJBgNVBAYTAkNOMRswGQYDVQQKExJDRkNBIE9wZXJhdGlvbiBDQTIxDDAKBgNVBAsTA0NSTDEUMBIGA1UEAxMLY3JsMTAxXzcwNDAwgZeggZSggZGGgY5sZGFwOi8vY2VydDg2My5jZmNhLmNvbS5jbjozODkvQ049Y3JsMTAxXzcwNDAsT1U9Q1JMLE89Q0ZDQSBPcGVyYXRpb24gQ0EyLEM9Q04/Y2VydGlmaWNhdGVSZXZvY2F0aW9uTGlzdD9iYXNlP29iamVjdGNsYXNzPWNSTERpc3RyaWJ1dGlvblBvaW50MDQGAypWAQQtEytDVVNUT01FUl9UWFA7MTAwMDAzNjU2NDI7aGsxMDAxMDAxQHRlc3QuY29tMA0GCSqGSIb3DQEBBQUAA4GBAAEe1lD6k0PCl8vTwOTGupqfTVhPtjlZyycWZmYkdlQhFlyFMd7TLH7d7BGbCPjqlyTq58dCy+OT9+ZSZm+fq/PnRF+Wu5yKmAup2dakSiXq/HJlPgYg2X2DmtkfAcg34LTmbNeJafpwfAwqHWrlu1E8vBzZs0b7oH8Xca5yoQEcMYHjMIHgAgEBMD4wKjELMAkGA1UEBhMCQ04xGzAZBgNVBAoTEkNGQ0EgT3BlcmF0aW9uIENBMgIQanup6wrfn3It8WY0B+4R7DAJBgUrDgMCGgUAMA0GCSqGSIb3DQEBAQUABIGAjL2cUHXgsGSNcRxiFvD1dZxAdv/ka1xu6ONR7TVVqPfqDptq5SqhR7JHwJnfDtSEQezRw80skuo+Or8nqoQ5sxJaQGpN6DVumdfQnf4fxqy2grvPAki5cKFeBUr7ROVdopkogNwZT9ZIfhWZNyYyrKdeS32cyf/SdkneT/Lw8wU=";
		request.setAttribute("req", req);
		request.setAttribute("sign", sign);
		return "tcb/register/platregister";
	}
	
	@RequestMapping(value = "/registercallback")
	public String registerCallback(HttpServletRequest request,Model model) throws Exception {
		logger.debug("registerCallback....");
		
		return "tcb/register/registerok";
	}
	
	
	
}
