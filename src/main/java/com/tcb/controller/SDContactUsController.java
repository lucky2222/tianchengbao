package com.tcb.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.dao.service.ArticleService;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;
import com.tcb.util.ResultByPageService;


@Controller
public class SDContactUsController {

	private static final Logger logger = LoggerFactory
			.getLogger(SDContactUsController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	ArticleService articleservice;

	
	
	@RequestMapping(value = "/inquire/contact_us", method = RequestMethod.GET)
	public String custlocation(HttpServletRequest request,Model model) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		
		DataRow product = new DataRow();
		if(param.getString("prodids")!=null && !"".equals(param.getString("prodids"))){
			product = dbservice.querySimpleRowByKey("td_b_product", param.getString("prodids"));		
			if(product!=null)product.put("tag", 1);
		}
		if(param.getString("email")!=null)
			model.addAttribute("email", param.getString("email"));
		model.addAttribute("product", product);
		
		ResultByPage pageparam = rbpservice.getByRequest(request);
		dbservice.selectListByPage("product_show.selectCompanycontact",pageparam);
		List<DataRow> showProduct = pageparam.getResultlist();
		for(DataRow temp:showProduct){
			if("5".equals(temp.getString("show_type"))){//推荐商品
				model.addAttribute("com_mail", temp.getString("product_id",""));
			}else if("6".equals(temp.getString("show_type"))){//新品
				model.addAttribute("com_tel", temp.getString("product_id",""));
			}
			else if("7".equals(temp.getString("show_type"))){//新品
				model.addAttribute("Skype", temp.getString("product_id",""));
			}
			else if("8".equals(temp.getString("show_type"))){//新品
				model.addAttribute("Whatsapp", temp.getString("product_id",""));
			}
		}
		return "shengda/contactUs/contact_us";
	}
	
	
	@RequestMapping(value = "/inquire/doContactUs")
	public String doCreateWeiArticle(HttpServletRequest request,Model model) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		String contactId = GeneratorIDUtil.generatorId();
		param.put("id", contactId);
		String cust_mail = param.getString("email");
		param.put("cc", cust_mail);
		param.put("email", "info@sino-sources.com");
		param.put("flag", 1);
		if(param.getString("title")!=null && !"".equals(param.getString("title")))
			param.put("title", param.getString("subject")+"<"+param.getString("title") +">");
		else 
			param.put("title", param.getString("subject"));
		
		String appendstr=param.getString("companyID") +"["+param.getString("staffID")+"]"+"\n";
		
		param.put("remark",appendstr.concat(param.getString("remark"))) ;
		
		dbservice.Insert("te_mailcontent", param);

		//dbservice.Insert("te_mailfileurl", param);
		
		return "shengda/common/success";
	}
	

}
