package com.tcb.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.tcb.annotation.CheckLogin;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.dao.base.TreeItem;
import com.tcb.dao.service.ArticleService;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;
import com.tcb.util.MenuUntil;
import com.tcb.util.ResultByPageService;

@Controller
//@RequestMapping(value = "/jxsite")
public class SDProductController {
	private static final Logger logger = LoggerFactory
			.getLogger(SDProductController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	ArticleService articleservice;

	
	
	/**
	 * 创建产品初始化
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin
	@RequestMapping(value = "/create/createSDproduct")
	public String createArticle(Model model) throws Exception {
		ResultByPage rbp = new ResultByPage();
		rbp.setPerpage(100);
		dbservice.selectListByPage("td_b_catalog.showCatalogClass", rbp);
		model.addAttribute("result", rbp);
		return "shengda/product/createproduct";
	}
	

	/**
	 * 创建产品
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin
	@RequestMapping(value = "/create/docreateSDproduct")
	public String doCreateWeiArticle(HttpServletRequest request,Model model) throws Exception {
		Object onlinestaff = request.getSession().getAttribute("OnlineStaff");
		//String product_id = GeneratorIDUtil.generatorId();
		DataRow param = rbpservice.getParamByRequest(request);
		String product_name=param.getString("product_name");
		String product_id = product_name.replace(" ", "-").replace("/", "_");
		param.put("product_id",product_id);
		//param.transTo("editorValue","product_detail");
		param.put("product_detail", param.getString("editorValue", "").replace("../uploads/image", "/uploads/image"));
		param.transTo("typeid_hidden_value", "product_catalog");
		param.put("id",product_id);
		param.put("state",0);
		param.put("update_time", DateTimeUtil.getNowDateStr());
		if(onlinestaff!=null)
		{
			param.put("updatestaff",
				((DataRow) onlinestaff).getString("staffid"));
		}
		dbservice.Insert("td_b_product", param);

		return "forward:/shengda/productlist";
	}
	

	/**
	 * 删除产品
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin
	@RequestMapping(value = "/create/dodelSDproduct/{productId}")
	public String dodelSDproduct(@PathVariable String productId,HttpServletRequest request,Model model) throws Exception {
		Object onlinestaff = request.getSession().getAttribute("OnlineStaff");
		DataRow param = rbpservice.getParamByRequest(request);
		
		param.put("product_id",productId);

		if(onlinestaff!=null)
		{
			param.put("updatestaff",
				((DataRow) onlinestaff).getString("staffid"));
		}
		dbservice.DelByKey("td_b_product", param);

		return "forward:/shengda/productlist";
	}
	
	
	/**
	 * 保存修改
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin
	@RequestMapping(value = "/create/domodifySDproduct")
	public String domodifySDproduct(HttpServletRequest request,Model model) throws Exception {
		Object onlinestaff = request.getSession().getAttribute("OnlineStaff");
		DataRow param = rbpservice.getParamByRequest(request);
		
		param.put("update_time", DateTimeUtil.getNowDateStr());
		if("".equals(param.getString("show_img","")))
				param.put("show_img", param.getString("show_img_init"));
		
		param.put("product_detail", param.getString("editorValue", "").replace("../uploads/image", "/uploads/image"));
		
		param.transTo("typeid_hidden_value", "product_catalog");
		
		if(onlinestaff!=null)
		{
			param.put("updatestaff",
				((DataRow) onlinestaff).getString("staffid"));
		}
		dbservice.UpdateByKey("td_b_product", param);

		
		return "redirect:/shengda/productlist";
	}

	
	
	/**
	 * 修改产品 初始化页面
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@CheckLogin
	@RequestMapping(value = "/domodifySDproductAll/{productId}")
	public String domodifySDproductALL(@PathVariable String productId,HttpServletRequest request,Model model) throws Exception {
		DataRow product = dbservice.querySimpleRowByKey("td_b_product", productId);
		
		model.addAttribute("product", product);
		model.addAttribute("typeid", product.getString("product_catalog"));
		model.addAttribute("typeid", product.getString("product_catalog"));
		
		ResultByPage rbp = new ResultByPage();
		rbp.setPerpage(100);
		dbservice.selectListByPage("td_b_catalog.showCatalogClass", rbp);
		model.addAttribute("result", rbp);
		
		return "shengda/product/modifyproduct";
	}
	

	
	/**
	 * 后台查询出产品列表
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/shengda/productlist")
	public String articleList(HttpServletRequest request, Model model)
			throws Exception {
//		DataRow param = new DataRow();
//		List<DataRow> articlelist = dbservice.queryListByParam("td_b_product", param, " order by start_time desc "," limit 30");
		
		ResultByPage articlelist = rbpservice.getByRequest(request);
		dbservice.selectListByPage("td_b_product.seleteByOrder",articlelist);
		logger.debug("---------articlelist----------"+articlelist);
		request.setAttribute("sdProductlist", articlelist.getResultlist());
		request.setAttribute("result", articlelist);
		return "shengda/product/productList";
	}
	
	/**
	 * 根据产品类型查询产品
	 * @param request
	 * @param model
	 * @return
	 * @throws Throwable 
	 */
	@RequestMapping(value = "/shengda/showcatagory/{catalogId}")
	public String frameproductList(@PathVariable String catalogId,HttpServletRequest request, Model model)
			throws Throwable {

		
		
		TreeItem menuitem = (TreeItem) request.getSession().getAttribute("menuTree");
		
		ResultByPage pageparam = rbpservice.getByRequest(request);
		if(menuitem==null){
			//初始化菜单放进内存
			dbservice.selectList("td_b_catalog.selectAllCatalog", pageparam);
			menuitem =  MenuUntil.genMenuTree(pageparam.getResultlist(), "");
		}
		
		
		model.addAttribute("catalog_name", menuitem.getItemOfTree(catalogId).getMenuTitle());
		model.addAttribute("catalogId", catalogId);
		
		String belongCatalogs = getSubMen(request,catalogId);
		
		ResultByPage detaillist = rbpservice.getByRequest(request);
		detaillist.getCondition().put("catalogIds", belongCatalogs);
		
		dbservice.selectListByPageOfBlob("td_b_product.showProductByCata",detaillist);
		model.addAttribute("result", detaillist);
		
		if(request.getSession().getAttribute("custMenuList")!=null)
		model.addAttribute("custMenuList", JSON.toJSON(request.getSession().getAttribute("custMenuList")));
		logger.debug("----detaillist.getResultlist()------------------"+JSON.toJSON(detaillist));
		
		
		
		//初始化展示的产品
		dbservice.selectList("td_b_product.selectProductShowFrame",pageparam);
		List<DataRow> showProduct = pageparam.getResultlist();
		
		logger.debug("---showProduct---------->>>-------"+showProduct);
		
		List<DataRow> popuProduct = new ArrayList<DataRow>();
		List<DataRow> newProduct = new ArrayList<DataRow>();;
		for(DataRow temp:showProduct){
			if("1".equals(temp.getString("show_type"))){//推荐商品
				popuProduct.add(temp);
			}else{//新品
				newProduct.add(temp);
			}
		}
		request.setAttribute("popuProduct", popuProduct);
		request.setAttribute("newProduct", newProduct);
		
		return "shengda/product/frameProductList";
	}

	
	/**
	 * 根据产品类型查询产品
	 * @param request
	 * @param model
	 * @return
	 * @throws Throwable 
	 */
	@RequestMapping(value = "/getSearchProduct")
	public String searchProduct(HttpServletRequest request, Model model)
			throws Throwable {

		
		
		TreeItem menuitem = (TreeItem) request.getSession().getAttribute("menuTree");
		
		ResultByPage pageparam = rbpservice.getByRequest(request);
		logger.debug("---pageparam---pageparam----pageparam--------------pageparam-------------"+pageparam);
		
		if(menuitem==null){
			//初始化菜单放进内存
			dbservice.selectList("td_b_catalog.selectAllCatalog", pageparam);
			menuitem =  MenuUntil.genMenuTree(pageparam.getResultlist(), "");
		}
		
		model.addAttribute("catalog_name", "search products");

		

		DataRow param = rbpservice.getParamByRequest(request);
		String catalogId =  param.getString("ok_prod_class_id");
		if(catalogId==null)catalogId=param.getString("prod_class_id");
		
		
		model.addAttribute("catalogId", catalogId);	
		String belongCatalogs = getSubMen(request,catalogId);
		
		String keyword = param.getString("keyword");
		

		
		ResultByPage detaillist = rbpservice.getByRequest(request);
		detaillist.getCondition().put("catalogIds", belongCatalogs);
		detaillist.getCondition().put("keyword", keyword);
		
		dbservice.selectListByPageOfBlob("td_b_product.showProductByCataAndKey",detaillist);
		
		model.addAttribute("result", detaillist);
		
		
		
		if(request.getSession().getAttribute("custMenuList")!=null)
		model.addAttribute("custMenuList", JSON.toJSON(request.getSession().getAttribute("custMenuList")));
		logger.debug("----detaillist.getResultlist()------------------"+JSON.toJSON(detaillist));
		
		
		
		//初始化展示的产品
		dbservice.selectList("td_b_product.selectProductShowFrame",pageparam);
		List<DataRow> showProduct = pageparam.getResultlist();
		
		logger.debug("---showProduct---------->>>-------"+showProduct);
		
		List<DataRow> popuProduct = new ArrayList<DataRow>();
		List<DataRow> newProduct = new ArrayList<DataRow>();;
		for(DataRow temp:showProduct){
			if("1".equals(temp.getString("show_type"))){//推荐商品
				popuProduct.add(temp);
			}else{//新品
				newProduct.add(temp);
			}
		}
		request.setAttribute("popuProduct", popuProduct);
		request.setAttribute("newProduct", newProduct);
		
		return "shengda/product/frameProductList";
	}
	

	/**
	 * 根据产品ID查询产品详情
	 * @param request
	 * @param model
	 * @return
	 * @throws Throwable 
	 */
	@RequestMapping(value = "/showproductDetail/{productId}")
	public String showproductDetail(@PathVariable String productId,HttpServletRequest request, Model model)
			throws Throwable {
		
		
		DataRow product = dbservice.querySimpleRowByKey("td_b_product", productId);
		
		
		DataRow catalog = dbservice.querySimpleRowByKey("td_b_catalog", product.getString("product_catalog"));

		model.addAttribute("product", product);
		model.addAttribute("catalog", catalog);
		if(request.getSession().getAttribute("custMenuList")!=null)
			model.addAttribute("custMenuList", JSON.toJSON(request.getSession().getAttribute("custMenuList")));
		return "shengda/product/frameProductDetail";
	}
	
	/**
	 *根据产品类型找到分类下面的所有产品
	 * @return
	 * @throws Throwable 
	 */
	public String getSubMen(HttpServletRequest request,String catalog_id) throws Throwable{
		
		TreeItem menuitem = (TreeItem) request.getSession().getAttribute("menuTree");
		if(menuitem==null){
			//初始化菜单放进内存
			ResultByPage pageparam = rbpservice.getByRequest(request);
			dbservice.selectList("td_b_catalog.selectAllCatalog", pageparam);
			menuitem =  MenuUntil.genMenuTree(pageparam.getResultlist(), "");
		}
		logger.debug("-----menuitem--list----"+JSONObject.toJSON(menuitem.getItems()));
		logger.debug("-----catalog_id-----------"+catalog_id);
		logger.debug("-----menuitem------"+JSONObject.toJSON(menuitem.getItemOfTree(catalog_id)));
		TreeItem Mymenuitem = menuitem.getItemOfTree(catalog_id);
		
		logger.debug("-----menuitem------"+Mymenuitem);
//		logger.debug("------menuitem.getItems()-------"+Mymenuitem.getItems());
		String inCon=null;
		if(Mymenuitem!=null){
		List<TreeItem> a = Mymenuitem.getItems();
		inCon="'"+catalog_id+"'";

			for(TreeItem s:a){
				inCon = inCon + ","+addInCon(s);
			}
		logger.debug("----inConinCon-------"+inCon);
		}else{
			inCon="''";
		}
		
		return inCon;
	}
	
	public String addInCon(TreeItem is){
		String inCon= "'"+is.getMenuId()+"'";
		List<TreeItem> a = is.getItems();

			for(TreeItem s:a){
				inCon = inCon + ","+addInCon(s);
			}
		
		return inCon;
	}
}
