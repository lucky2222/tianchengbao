package com.tcb.controller;

import java.util.List;

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

import com.github.sd4324530.fastweixin.api.OauthAPI;
import com.github.sd4324530.fastweixin.api.config.ApiConfig;
import com.github.sd4324530.fastweixin.api.response.OauthGetTokenResponse;
import com.tcb.annotation.CheckLogin;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.dao.service.ProductService;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;
import com.tcb.util.ResultByPageService;
import com.tcb.yeepay.util.SignUtil;

@Controller
public class ProductController {
	private static final Logger logger = LoggerFactory
			.getLogger(ProductController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	ProductService productservice;
	//private static ApiConfig config = new ApiConfig("wx7139ab62847dfb68","0cec2c88111430d81be6cff20abcc00e", true);

	/**
	 * 创建产品
	 * 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@CheckLogin
	@RequestMapping(value = "/tcb/createproduct")
	public String createArticle(Model model) throws Exception {
		return "tcb/product/createproduct";
	}

	/**
	 * 保存产品
	 * 
	 * @param model
	 * @return
	 * @throws Exception
	 */

	@CheckLogin
	@RequestMapping(value = "/tcb/saveproduct")
	public String saveProduct(HttpServletRequest request, Model model)
			throws Exception {
		Object onlinestaff = request.getSession().getAttribute("OnlineStaff");
		DataRow param = rbpservice.getParamByRequest(request);
		param.transTo("editorValue", "productdesc");
		logger.debug("-------------------------------产品参数-------------------------------");
		logger.debug(param.toString());
		logger.debug("-------------------------------产品参数 end-------------------------------");
		productservice.saveProduct(param);
		param.put("finishpercent",
				param.getDouble("salenums") / param.getDouble("salelimit"));// 目前完成
		param.put("allsale", param.getInt("salelimit") * param.getInt("price"));// 总量
		model.addAttribute("productinfo", param);
		return "tcb/product/productdetail";
	}

	@RequestMapping(value = "/tcb/productdetail/{productid}")
	public String productDtailByID(@PathVariable String productid, Model model)
			throws Exception {
		DataRow param = productservice.getProductDetail(productid);
		param.put(
				"finishpercent",
				param.getDouble("salenums") * 100
						/ param.getDouble("salelimit"));// 目前完成
		param.put("allsale", param.getInt("salelimit") * param.getInt("price"));// 总量
		model.addAttribute("productinfo", param);
		return "tcb/productdetail";
	}
	
	/**
	@RequestMapping(value = "/tcb")
	public String tcb(HttpServletRequest request, Model model) throws Exception {
		List<DataRow> param = productservice.getProductList();
		model.addAttribute("productlist", param);
		// 有分享者信息 需要记录分享路径
		if (request.getParameterMap().containsKey("code")) {
			OauthAPI oauthAPI = new OauthAPI(config);
			OauthGetTokenResponse userinfo = oauthAPI.getToken(request
					.getParameter("code"));
			request.setAttribute("state", userinfo.getOpenid());
			request.getSession().setAttribute("openid", userinfo.getOpenid());
			//
			logger.debug("userinfo.getOpenid-->" + userinfo.getOpenid());
			if(userinfo.getOpenid() !=null)
			{
				DataRow user = dbservice.querySimpleRowByKey("tf_f_user",
					userinfo.getOpenid());
				if (user != null) {
					request.setAttribute("onlineuser", user);
					request.getSession().setAttribute("onlineuser", user);
				}
			}
		} else {
			if (request.getSession().getAttribute("onlineuser") != null) {
				request.setAttribute("onlineuser", request.getSession()
						.getAttribute("onlineuser"));
			}
		}
		return "tcb/main";
	}
	*/
	/**
	 * 支付充值回调函数
	 * 
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/product/saleproductcallback")
	public String saleProductCallback(HttpServletRequest request, Model model)
			throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		request.setAttribute("saleinfo", param);
		System.out.println("saleinfo-->" + param.toString());
		return "tcb/product/saleproductcallback";
	}

	/**
	 * 支付通知函数
	 * 
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/product/notifypage")
	@ResponseBody
	public String notifyPage(HttpServletRequest request, Model model)
			throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		request.setAttribute("notify", param);
		System.out.println("notify-->" + param.toString());
		return "SUCCESS";
	}
	
	
	@RequestMapping(value = "/tcb/saleproduct")
	public String saleProduct(HttpServletRequest request, Model model)
			throws Exception {
		// String randint =
		// request.getSession().getAttribute("randint").toString();
		DataRow param = rbpservice.getParamByRequest(request);
		// if(param.containsKey("randint")&&param.getString("randint").equals(randint))
		{
			// String req =
			// "<nickName>土豪</nickName><realName>高富帅</realName><idCardType>G2_IDCARD</idCardType><idCardNo>430503198010100432</idCardNo><mobile>"+param.getString("telno")+"</mobile><email>test@hotmail.com</email><notifyUrl>http://www.baidu.com</notifyUrl><callbackUrl>http://127.0.0.1:8080/register/registercallback</callbackUrl></request>";
			StringBuffer reqbuf = new StringBuffer();
			reqbuf.append("<request platformNo=\"10040011568\">")
					.append("<platformUserNo>111222333</platformUserNo>")
					.append("<requestNo>").append(GeneratorIDUtil.generatorId()).append("</requestNo>")
					.append("<amount>1</amount>")
					.append("<feeMode>PLATFORM</feeMode>")
					.append("<notifyUrl>http://127.0.0.1:8080/product/notifypage</notifyUrl>")
					.append("<callbackUrl>http://127.0.0.1:8080/product/saleproductcallback</callbackUrl></request>");

			String sign = SignUtil.sign(reqbuf.toString(),
					"hk1001001@test.com.p12.pfx", "123qwe");
			request.setAttribute("req", reqbuf.toString());
			request.setAttribute("sign", sign);
			return "tcb/product/saleproductplat";
		}
		/*
		 * { DataRow params =
		 * productservice.getProductDetail(param.getString("productid"));
		 * params.put("finishpercent",
		 * params.getDouble("salenums")*100/params.getDouble
		 * ("salelimit"));//目前完成
		 * params.put("allsale",params.getInt("salelimit")*
		 * params.getInt("price") );//总量 model.addAttribute("productinfo",
		 * params); return "tcb/productdetail"; }
		 */

	}
	
	
}
