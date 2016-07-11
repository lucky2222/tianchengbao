package com.tcb.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.dao.base.TreeItem;
import com.tcb.dao.service.RegisterService;
import com.tcb.util.MenuUntil;
import com.tcb.util.ResultByPageService;


@Controller
public class FrameController {
	
	private static final Logger logger = LoggerFactory.getLogger(FrameController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	private RegisterService registerservice;
	@Autowired
	ResultByPageService rbpservice;

	
	/**
	 * 首页
	 * @throws Exception 
	 */
	@RequestMapping(value = "/")
	public String home(Locale locale, Model model) throws Exception {
		return "forward:/frame";
	}
	
	@RequestMapping(value = "/frame")
	public String shiplocation(HttpServletRequest request,Model model) throws Throwable {
		
		//初始化菜单放进内存
		ResultByPage pageparam = rbpservice.getByRequest(request);
		dbservice.selectList("td_b_catalog.selectAllCatalog",
				pageparam);
		
		model.addAttribute("custMenuList", JSON.toJSON(pageparam.getResultlist())); 
		
		//在session中保存全部客户菜单
		TreeItem itemTree = MenuUntil.genMenuTree(pageparam.getResultlist(), "");
		logger.debug("--------------itemTree-------------"+JSONObject.toJSON(itemTree));
		request.getSession().setAttribute("custMenuList", pageparam.getResultlist());
		request.getSession().setAttribute("menuTree", itemTree);
		
		//初始化展示的产品
		dbservice.selectListByPage("td_b_product.selectProductShowFrame",pageparam);
		List<DataRow> showProduct = pageparam.getResultlist();
		List<DataRow> popuProduct = new ArrayList<DataRow>();
		List<DataRow> newProduct = new ArrayList<DataRow>();
		for(DataRow temp:showProduct){
			if("1".equals(temp.getString("show_type"))){//推荐商品
				popuProduct.add(temp);
			}else if("2".equals(temp.getString("show_type"))){//新品
				newProduct.add(temp);
			}
		}
		

		//List<DataRow> stockshowActicle = new ArrayList<DataRow>();
		dbservice.selectListByPage("product_show.selectProductShow",pageparam);
		for(DataRow temp1:pageparam.getResultlist()){
			if("3".equals(temp1.getString("show_type"))){//优惠活动
				request.setAttribute("promoteid", temp1.getString("object_id"));
			}
			//else if("4".equals(temp1.getString("show_type"))){//库存展示
				//stockshowActicle.add(temp1);				
			//}
		}
		
		
		request.setAttribute("popuProduct", popuProduct);
		request.setAttribute("newProduct", newProduct);
		
		return "shengda/frame";
	}
	
	
	/**
	 * 首页
	 * @throws Exception 
	 */
	@RequestMapping(value = "/stockshow")
	public String stockshow(HttpServletRequest request,Model model) throws Exception {
		ResultByPage pageparam = rbpservice.getByRequest(request);
		List<DataRow> stockshowActicle = new ArrayList<DataRow>();
		pageparam.setPerpage(20);
		dbservice.selectListByPage("product_show.selectProductShow",pageparam);
		for(DataRow temp1:pageparam.getResultlist()){
			if("3".equals(temp1.getString("show_type"))){//优惠活动
				request.setAttribute("promoteid", temp1.getString("object_id"));
			}else if("4".equals(temp1.getString("show_type"))){//库存展示
				if(temp1.getString("object_id")!=null &&  !"".equals(temp1.getString("object_id")))
					stockshowActicle.add(temp1);				
			}
		}
		request.setAttribute("stockList", stockshowActicle);
		return "shengda/stock/stockshow";
	}
	
	/**
	 * 首页
	 * @throws Exception 
	 */
	@RequestMapping(value = "/stockPayshow")
	public String stockPayshow(HttpServletRequest request,Model model) throws Exception {
//		ResultByPage pageparam = rbpservice.getByRequest(request);
//		List<DataRow> stockshowActicle = new ArrayList<DataRow>();
//		pageparam.setPerpage(20);
//		dbservice.selectListByPage("product_show.selectProductShow",pageparam);
//		for(DataRow temp1:pageparam.getResultlist()){
//			if("3".equals(temp1.getString("show_type"))){//优惠活动
//				request.setAttribute("promoteid", temp1.getString("object_id"));
//			}else if("4".equals(temp1.getString("show_type"))){//库存展示
//				if(temp1.getString("object_id")!=null &&  !"".equals(temp1.getString("object_id")))
//					stockshowActicle.add(temp1);				
//			}
//		}
//		request.setAttribute("stockList", stockshowActicle);
		return "shengda/pay/pay";
	}
}
