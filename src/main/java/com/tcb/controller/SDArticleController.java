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
import com.alibaba.fastjson.JSON;
import com.github.sd4324530.fastweixin.api.JsAPI;
import com.github.sd4324530.fastweixin.api.OauthAPI;
import com.github.sd4324530.fastweixin.api.config.ApiConfig;
import com.github.sd4324530.fastweixin.api.response.OauthGetTokenResponse;
import com.mysql.fabric.xmlrpc.base.Data;

@Controller
//@RequestMapping(value = "/jxsite")
public class SDArticleController {
	private static final Logger logger = LoggerFactory
			.getLogger(SDArticleController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	ArticleService articleservice;
	
	


	@RequestMapping(value = "/showProductArticle/{articleid}")
	public String showArticleById(@PathVariable String articleid,HttpServletRequest request, Model model)
			throws Exception {
		//文章内容和模块内容
		DataRow articlemap = dbservice.querySimpleRowByKey("tf_f_article",
				articleid);
		model.addAttribute("article", articlemap);
		
		if(request.getSession().getAttribute("custMenuList")!=null)
		model.addAttribute("custMenuList", JSON.toJSON(request.getSession().getAttribute("custMenuList")));
		
		
		
		return "/shengda/sinoArticle/sino-information";
	}
	

}
