package com.tcb.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.dao.base.TreeItem;
import com.tcb.dao.service.ArticleService;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;
import com.tcb.util.MD5Util;
import com.tcb.util.MenuUntil;
import com.tcb.util.ResultByPageService;

@Controller
@RequestMapping(value = "/app")
public class AppController {
	private static final Logger logger = LoggerFactory.getLogger(AppController.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	ArticleService articleservice;
	
	/**
	 * app首页
	 * @param request
	 * @param model
	 * @return
	 * @throws Throwable
	 */
	@RequestMapping(value = "/index")
	public String index(HttpServletRequest request,Model model) throws Throwable {
		ResultByPage pageparam = rbpservice.getByRequest(request);
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
		request.setAttribute("popuProduct", popuProduct);
		request.setAttribute("newProduct", newProduct);
		return "app/index";
	}
	/**
	 * app的用户信息页面
	 * @param request
	 * @param model
	 * @return
	 * @throws Throwable
	 */
	@RequestMapping(value = "/userinfo")
	public String userInfo(HttpServletRequest request,Model model) throws Throwable {
		if(request.getSession().getAttribute("log_user_mail")!=null)
		{
			String log_user_mail = (String)request.getSession().getAttribute("log_user_mail");
			DataRow param = rbpservice.getParamByRequest(request);
			param.put("user_mail",log_user_mail);
			DataRow result = dbservice.querySimpleRowByParam("tf_f_user", param,null);
			logger.debug("--------result1--------"+result);
			model.addAttribute("user_info",result);
		}else{
			return "app/login";
		}
		return "app/userinfo";
	}
	
	
	/**
	 * 联系我们
	 * @param request
	 * @param model
	 * @return
	 * @throws Throwable
	 */
	@RequestMapping(value = "/contact")
	public String contact(HttpServletRequest request,Model model) throws Throwable {
		/**
		 * 提交联系方式
		 */
		return "app/contact";
	}
	/**
	 * 登录页
	 * @param request
	 * @param model
	 * @return
	 * @throws Throwable
	 */
	@RequestMapping(value = "/dologin")
	@ResponseBody
	public String doLogin(HttpServletRequest request,Model model) throws Throwable {
		DataRow param = rbpservice.getParamByRequest(request);
		String passwd= MD5Util.makeMD5(param.getString("log_user_mail").toUpperCase()+param.getString("log_password"));
		param.put("user_mail", param.getString("log_user_mail"));
		param.put("password", passwd);
		DataRow result = dbservice.querySimpleRowByParam("tf_f_user", param,null);
		logger.debug("--------result1--------"+result);
		model.addAllAttributes(result);
		if(passwd.equals(result.get("password"))){
			request.getSession().setAttribute("log_user_mail", param.getString("log_user_mail"));
			model.addAttribute("user_info",result);
			result.put("loginflag", 1);
		}else{
			result.put("loginflag", 0);
			result.put("error", "The user password is not correct !");
		}
		return JSON.toJSONString(result);
	}
	/**
	 * app的产品分类页
	 * @param catalogId
	 * @param request
	 * @param model
	 * @return
	 * @throws Throwable
	 */
	@RequestMapping(value = "/typelist/{catalogId}")
	public String typeList(@PathVariable String catalogId,HttpServletRequest request,Model model) throws Throwable {
		String belongCatalogs = getSubMen(request,catalogId);
		ResultByPage detaillist = rbpservice.getByRequest(request);
		detaillist.getCondition().put("catalogIds", belongCatalogs);
		
		dbservice.selectListByPageOfBlob("td_b_product.showProductByCata",detaillist);
		model.addAttribute("result", detaillist);
		
		TreeItem menuitem = (TreeItem) request.getSession().getAttribute("menuTree");
		ResultByPage pageparam = rbpservice.getByRequest(request);
		if(menuitem==null){
			//初始化菜单放进内存
			dbservice.selectList("td_b_catalog.selectAllCatalog", pageparam);
			menuitem =  MenuUntil.genMenuTree(pageparam.getResultlist(), "");
		}
		
		model.addAttribute("catalogId", catalogId);
		model.addAttribute("catalog_name", menuitem.getItemOfTree(catalogId).getMenuTitle());
		return "app/typelist";
	}
	/**
	 * app的产品明细页面
	 * @param productId
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/productinfo/{productId}")
	public String productInfo(@PathVariable String productId,HttpServletRequest request,Model model) throws Exception {
		DataRow product = dbservice.querySimpleRowByKey("td_b_product", productId);
		if(product.containsKey("product_detail"))
		{
			String detailtxt = product.getString("product_detail").replaceAll("src=\"../uploads","src=\"/uploads");
			StringBuffer sb = new StringBuffer();
			int start = detailtxt.indexOf("width=\"");
			int end = 0;
			while(start>=0)
			{
				sb.append(detailtxt.substring(0,start+7));
				end = detailtxt.indexOf("\"", start+7);
				if(end>start)
				{
					detailtxt = detailtxt.substring(end);
					start = detailtxt.indexOf("width=\"");
					sb.append("100%");
					end = 0;
					if(start<0)
					{
						sb.append(detailtxt);
					}
				}else{
					sb.append(detailtxt);
				}
			}
			if(sb.length()>0)
			{
				detailtxt = sb.toString();
			}
			product.put("product_detail",imgWidth(detailtxt));
		}
		
		DataRow catalog = dbservice.querySimpleRowByKey("td_b_catalog", product.getString("product_catalog"));
		model.addAttribute("product", product);
		model.addAttribute("catalog", catalog);
		if(request.getSession().getAttribute("custMenuList")!=null)
			model.addAttribute("custMenuList", JSON.toJSON(request.getSession().getAttribute("custMenuList")));
		return "app/productInfo";
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
		TreeItem Mymenuitem = menuitem.getItemOfTree(catalog_id);
		List<TreeItem> a = Mymenuitem.getItems();
		String inCon=catalog_id;

			for(TreeItem s:a){
				inCon = inCon + ","+addInCon(s);
			}
		
		
		return inCon;
	}
	
	public String addInCon(TreeItem is){
		String inCon= is.getMenuId();
		List<TreeItem> a = is.getItems();

			for(TreeItem s:a){
				inCon = inCon + ","+addInCon(s);
			}
		
		return inCon;
	}
	
	public String imgWidth(String html)
	{
		final Pattern imgpattern   =   Pattern.compile("<\\s*img\\s+([^>]*)\\s*>",   Pattern.CASE_INSENSITIVE|Pattern.MULTILINE);
		final Pattern srcpattern   =   Pattern.compile("src=\"([^\"]+)\"",   Pattern.CASE_INSENSITIVE|Pattern.MULTILINE);
		Matcher matcher =  imgpattern.matcher(html);
		while   (matcher.find()){
            String group=matcher.group();
            if(group==null){
            	continue;
            }
            
            Matcher srcmatcher = srcpattern.matcher(group);
            if(srcmatcher.find())
            {
            	String srcgroup = srcmatcher.group();
            	
            	if(srcgroup!=null)
            	{
            		srcgroup = srcgroup.replaceAll("\\.\\./", "/");
            		int start = html.indexOf(group);
            		int end = start+group.length();
            		html = html.substring(0,start)+"<img "+srcgroup+" width=\"100%\"/>"+html.substring(end);
            	}
            }
		}
		return html;
	}
	/**
	 * 提交联系方式
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/doContactUs")
	@ResponseBody
	public String doContactUs(HttpServletRequest request,Model model) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		String contactId = GeneratorIDUtil.generatorId();
		param.put("id", contactId);
		param.put("flag", 1);
		if(param.getString("title")!=null && !"".equals(param.getString("title")))
			param.put("title", param.getString("subject")+"<"+param.getString("title") +">");
		else 
			param.put("title", param.getString("subject"));
		param.put("cc", param.getString("email"));
		param.put("email","info@sino-sources.com");
		param.put("updatetime", DateTimeUtil.getNowDateStr());
		dbservice.Insert("te_mailcontent", param);
		param.put("flag", 1);
		return JSON.toJSONString(param);
	}
	@RequestMapping(value = "/search/{searchtxt}")
	public String scarchText(@PathVariable String searchtxt,HttpServletRequest request,Model model) throws Throwable {
		ResultByPage detaillist = rbpservice.getByRequest(request);
		detaillist.setPerpage(8);
		detaillist.getCondition().put("productname", searchtxt);
		dbservice.selectListByPageOfBlob("td_b_product.seleteByOrder",detaillist);
		model.addAttribute("result", detaillist);
		TreeItem menuitem = (TreeItem) request.getSession().getAttribute("menuTree");
		ResultByPage pageparam = rbpservice.getByRequest(request);
		model.addAttribute("catalog_name", searchtxt);
		return "app/searchtxt";
	}
	
	@RequestMapping(value = "/orderdetail/{saleOrderNo}")
	public String orderDetail(@PathVariable String saleOrderNo,HttpServletRequest request,Model model) throws Throwable {
		DataRow result1 = new DataRow();//user_mail
		DataRow param = rbpservice.getParamByRequest(request);
		String log_user_mail= (String) request.getSession().getAttribute("log_user_mail");
		if(log_user_mail==null || "".equals(log_user_mail))return "shengda/custregister/custRegister";
		
		param.put("user_mail", log_user_mail);
		param.put("SalesOrderNo", saleOrderNo);
		List<DataRow>  order_detail = dbservice.queryForListByCodeKey("erp_order.sel_order_by_key", param);
		model.addAttribute("order", order_detail);
		
		List<DataRow> fileList = new ArrayList<>();
		if(order_detail!=null){
			fileList = dbservice.queryBlobFILEForList("select  t.RecordID,t.Name from erp_attach t where t.SalesOrderNo= '"+saleOrderNo+"'");
		}
		
		List<DataRow> BLfileList = new ArrayList<>();
		List<DataRow> PLfileList = new ArrayList<>();//-
		List<DataRow> CIfileList = new ArrayList<>();
		List<DataRow> INSUREfileList = new ArrayList<>();
		List<DataRow> LDfileList = new ArrayList<>();
		List<DataRow> otherileList = new ArrayList<>();
		for(DataRow temp:fileList){
			String filename=temp.getString("Name");
			if(filename!=null && filename.startsWith("BL-"))
				BLfileList.add(temp);
			else if(filename!=null && filename.startsWith("PL-"))
				PLfileList.add(temp);
			else if(filename!=null && filename.startsWith("CI-"))
				CIfileList.add(temp);
			else if(filename!=null && filename.startsWith("INSURE-"))
				INSUREfileList.add(temp);
			else if(filename!=null && filename.startsWith("LD-"))
				LDfileList.add(temp);
			else
				otherileList.add(temp);
		}
		
		model.addAttribute("BLfileList", BLfileList);
		model.addAttribute("PLfileList", PLfileList);
		model.addAttribute("CIfileList", CIfileList);
		model.addAttribute("LDfileList", LDfileList);
		model.addAttribute("INSUREfileList", INSUREfileList);
		model.addAttribute("otherileList", otherileList);
		return "app/orderdetail";
	}
	/**
	 * 根据订单查询费用明细
	 * @param saleOrderNo
	 * @param request
	 * @param model
	 * @return
	 * @throws Throwable
	 */
	@RequestMapping(value = "/showIncomedetail/{saleOrderNo}")
	public String showIncomedetail(@PathVariable String saleOrderNo,HttpServletRequest request,Model model) throws Throwable {
		DataRow result1 = new DataRow();//user_mail
		result1.put("ID", saleOrderNo);
		List<DataRow> fileList = dbservice.queryForListByCodeKey("erp_incomes.selectIncomesByID", result1);
		model.addAttribute("incomeList", fileList);
		return "app/incomedetail";
	}
	
	/**
	 * 根据订单查询费用明细
	 * @param saleOrderNo
	 * @param request
	 * @param model
	 * @return
	 * @throws Throwable
	 */
	@RequestMapping(value = "/showShipmentsdetail/{saleOrderNo}")
	public String showShipmentsdetail(@PathVariable String saleOrderNo,HttpServletRequest request,Model model) throws Throwable {
		DataRow result1 = new DataRow();//user_mail
		result1.put("SalesOrderNo", saleOrderNo);
		List<DataRow> fileList = dbservice.queryForListByCodeKey("erp_shipments.selectShipmentsByNo", result1);
		model.addAttribute("shipmentsList", fileList);
		return "app/shipmentDetail";
	}
	
	
	/**
	 * 交易列表
	 * @param request
	 * @param model
	 * @return
	 * @throws Throwable
	 */
	@RequestMapping(value = "/tradelist")
	public String tradeList(HttpServletRequest request,Model model) throws Throwable {
		if(request.getSession().getAttribute("log_user_mail")!=null)
		{
			/**
			 * 查询交易列表
			 */
			DataRow result1 = new DataRow();//user_mail
			DataRow param = rbpservice.getParamByRequest(request);
			String log_user_mail= (String) request.getSession().getAttribute("log_user_mail");
			if(log_user_mail==null || "".equals(log_user_mail))return "shengda/custregister/custRegister";
			
			param.put("user_mail",log_user_mail);
			result1 = dbservice.querySimpleRowByParam("tf_f_user", param,null);
			model.addAttribute("user_info",result1);
			
			
			ResultByPage detaillist = rbpservice.getByRequest(request);
			detaillist.getCondition().put("user_mail", log_user_mail);
			detaillist.getCondition().put("orderstate", "已归档");	
			
			ResultByPage detaillist1 = rbpservice.getByRequest(request);
			detaillist1.getCondition().put("user_mail", log_user_mail);
			detaillist1.getCondition().put("orderstate", "已归档");	
			
			dbservice.selectListByPageOfBlob("erp_order.sel_my_order",detaillist);
			dbservice.selectListByPageOfBlob("erp_order.sel_myhis_order",detaillist1);
			model.addAttribute("result", detaillist);
			model.addAttribute("result1", detaillist1);
		}else{
			return "app/login";
		}
		return "app/tradelist";
	}
	
	@RequestMapping(value = "/logout")
	public String logOut(HttpServletRequest request,Model model) throws Throwable {
		if(request.getSession().getAttribute("log_user_mail")!=null)
		{
			request.getSession().removeAttribute("log_user_mail");
		}
		return "app/login";
	}
	
}
