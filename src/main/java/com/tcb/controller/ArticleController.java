package com.tcb.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.text.html.parser.Entity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.tcb.annotation.CheckLogin;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.dao.service.ArticleService;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;
import com.tcb.util.ResultByPageService;
import com.github.sd4324530.fastweixin.api.JsAPI;
import com.github.sd4324530.fastweixin.api.OauthAPI;
import com.github.sd4324530.fastweixin.api.config.ApiConfig;
import com.github.sd4324530.fastweixin.api.response.OauthGetTokenResponse;
import com.mysql.fabric.xmlrpc.base.Data;

@Controller
//@RequestMapping(value = "/jxsite")
public class ArticleController {
	private static final Logger logger = LoggerFactory
			.getLogger(ArticleController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	ArticleService articleservice;
	//private static ApiConfig config = new ApiConfig("wx7139ab62847dfb68","0cec2c88111430d81be6cff20abcc00e",true);
	
	
	/**
	 * 创建文章
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin
	@RequestMapping(value = "/create/createarticle")
	public String createArticle(Model model) throws Exception {
		ResultByPage rbp = new ResultByPage();
		rbp.setPerpage(100);
		dbservice.selectListByPage("td_s_module.selectAllModuleList", rbp);
		model.addAttribute("result", rbp);
		return "create/createarticle";
	}
	
	/**
	 * 网站创建文章
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin
	@RequestMapping(value = "/create/docreateweiarticle")
	public String doCreateWeiArticle(HttpServletRequest request,Model model) throws Exception {
		Object onlinestaff = request.getSession().getAttribute("OnlineStaff");
		String articleid = GeneratorIDUtil.generatorId();
		DataRow param = rbpservice.getParamByRequest(request);
		param.transTo("editorValue","body");
		param.transTo("typeid_hidden_value", "typeid");
		DataRow td_s_module =dbservice.querySimpleRowByKey("td_s_module", param.getString("typeid"));
		String modulename = td_s_module.getString("modulename");
		param.put("id",articleid);
		param.put("state",0);
		param.put("updatetime", DateTimeUtil.getNowDateStr());
		if(onlinestaff!=null)
		{
			param.put("updatestaff",
				((DataRow) onlinestaff).getString("staffid"));
		}
		dbservice.Insert("tf_f_article", param);
		param.put("articleid", articleid);
		param.put("state",0);
		param.put("modartid", GeneratorIDUtil.generatorId());
		param.put("moduleid", param.getString("typeid"));
		param.put("modulename", modulename);
		param.transTo("title","articlename");
		dbservice.Insert("tf_f_module_article", param);
		param.transTo("showimg","imgurl");
		param.transTo("keywords","desc");
		param.transTo("link","/article/"+articleid);
		dbservice.Insert("tl_share_article", param);
		return "create/managearticle";
	}
	
	/**
	 * 网站文章展示
	 * @param articleid
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	
	@RequestMapping(value = "/article/{articleid}")
	public String weiArticleById(@PathVariable String articleid,HttpServletRequest request, Model model)
			throws Exception {
		//有分享者信息 需要记录分享路径
		if(request.getParameterMap().containsKey("code"))
		{
			//OauthAPI oauthAPI = new OauthAPI(config);
			//OauthGetTokenResponse userinfo = oauthAPI.getToken(request.getParameter("code"));
			//request.setAttribute("state",userinfo.getOpenid());
			//查询文章题目
			DataRow artice = dbservice.querySimpleRowByKey("tf_f_article", articleid);
			request.setAttribute("articleinfo",artice);
			//记录访问关系
			//articleservice.shareVisit(request.getParameter("state"), userinfo.getOpenid(), articleid);
			return "/article/articleredirect";
		}else{
			request.setAttribute("exceptionMessage","文章分享错误。");
			return "errors/err";
		}
	}

	@RequestMapping(value = "/showarticle/{articleid}")
	public String showArticleById(@PathVariable String articleid,HttpServletRequest request, Model model)
			throws Exception {
		//文章内容和模块内容
		DataRow articlemap = dbservice.querySimpleRowByKey("tf_f_article",
				articleid);
		model.addAttribute("article", articlemap);
		DataRow param = new DataRow();
		param.put("articleid", articlemap.getString("id"));
		String sortstr = " order by updatetime desc";
		DataRow module1=dbservice.querySimpleRowByParam("tf_f_module_article", param, sortstr);
		model.addAttribute("module1", module1.getString("modulename"));
		//记录访问次数
		articleservice.visitReport(articleid);
		//转发用的jsAPI信息
		String url ="http://www.sino-sources.com/showarticle/"+articleid+"?state="+request.getParameter("state");
		System.out.println("url:"+url);
		//JsAPI jsapi = new JsAPI(config);
		//request.setAttribute("jsinfo",jsapi.getSignature(url));
		//request.setAttribute("state",request.getParameter("state").toString());
		return "/article/showarticle";
	}
	
	/**
	 * 共享监控
	 * @param articleid
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/sharereport/{articleid}")
	@ResponseBody
	public String shareReport(@PathVariable String articleid,HttpServletRequest request, Model model)
			throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		logger.debug(param.getString("shareid")+"-->shareReport-->"+articleid);
		articleservice.shareReport(param.getString("shareid"),param.getInt("sharetype"), articleid);
		return "ok";
	}
	/**
	 * 文章列表
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/articlelist")
	public String articleList(HttpServletRequest request, Model model)
			throws Exception {
		DataRow param = new DataRow();
		List<DataRow> articlelist = dbservice.queryListByParam("tf_f_article", param, " order by updatetime desc "," limit 30");
		request.setAttribute("articlelist", articlelist);
		return "/article/articlelist";
	}
	
	/**
	 * 共享文章列表
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin(title = "共享文章列表")
	@RequestMapping(value = "/sharearticlelist")
	public String shareArticleList(HttpServletRequest request, Model model) throws Exception {
		return "article/sharearticlelist";
	}

	
	/**
	 * 删除文章
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin(title = "删除文章")
	@RequestMapping(value = "/delProductArticle/{articleid}")
	public String shareArticleList(@PathVariable String articleid,HttpServletRequest request, Model model) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		param.put("id", articleid);
		dbservice.DelByKey("tf_f_article", param);
		return "forward:/sharearticlelist";
	}
	
	/**
	 * 共享文章列表
	 */
	@RequestMapping(value = "/sharearticlelistview")
	public String shareArticleListView(HttpServletRequest request, Model model)
			throws Exception {
		ResultByPage articlelist = rbpservice.getByRequest(request);
		dbservice.selectListByPage("tf_f_article.selectShareArticleList",articlelist);
		model.addAttribute("articlelist", articlelist);
		return "article/sharearticlelistview";
	}
	
	/**
	 * 共享文章列表
	 */
	@RequestMapping(value = "/sharedetailbyarticleid/{articleid}")
	public String shareDetailByArticleID(@PathVariable String articleid,HttpServletRequest request, Model model)
			throws Exception {
		ResultByPage detaillist = rbpservice.getByRequest(request);
		detaillist.getCondition().put("articleid", articleid);
		dbservice.selectListByPage("tl_share_path.selectShareDetail",detaillist);
		model.addAttribute("detaillist", detaillist);
		return "article/sharedetailbyarticleid";
	}
}
