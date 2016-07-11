package com.tcb.controller;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Strings;
import com.tcb.annotation.CheckLogin;
import com.tcb.annotation.ExcelExport;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.dao.base.StartConfigService;
import com.tcb.dao.base.StaticCache;
import com.tcb.dao.base.TableHead;
import com.tcb.dao.service.SysManageService;
import com.tcb.util.AutoCompleteUtil;
import com.tcb.util.ConstantMap;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;
import com.tcb.util.MapUtil;
import com.tcb.util.ResultByPageService;
import com.tcb.util.UserRoleUtil;

@Controller
@RequestMapping(value = "/sysmanage")
public class SysManagerController {
	private static final Logger logger = LoggerFactory
			.getLogger(SysManagerController.class);
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	private DBService dbservice;
	@Autowired
	private SysManageService sysservice;
	@Autowired
	private StartConfigService scservice;

	/**
	 * 菜单管理首页
	 */
	@CheckLogin
	@ExcelExport
	@RequestMapping(value = "/menumanage")
	public String MenuManage(HttpServletRequest request, Model model)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequest(request);
		ResultByPage parentmenu = new ResultByPage();
		dbservice.selectListByPage("menuMapper.selectMenuList", rbp);
		parentmenu.getCondition().put(
				"staffid",
				((DataRow) request.getSession().getAttribute("OnlineStaff"))
						.getString("staffid"));
		try {
			parentmenu.setPerpage(50);
			dbservice.selectListByPage("sys_menu.selectAllParentMenu",
					parentmenu);
			model.addAttribute("parentmenuresult", parentmenu);
		} catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("result", rbp);
		model.addAttribute("menuname", rbp.getCondition().getString("menuname"));
		model.addAttribute("menufile", rbp.getCondition().getString("menufile"));
		return "sysmanage/menumanage";
	}

	/**
	 * 异步新增菜单
	 */
	@RequestMapping(value = "/savemenu", method = RequestMethod.POST)
	@ResponseBody
	public Object savemenu(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		param = sysservice.addMenu(param);
		if (param != null) {
			return "ok";
		} else {
			return "error";
		}
	}

	/**
	 * 异步更新菜单
	 */
	@RequestMapping(value = "/updatemenu", method = RequestMethod.POST)
	@ResponseBody
	public Object updatemenu(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		param = sysservice.updateMenu(param);
		if (param != null) {
			return "ok";
		} else {
			return "error";
		}
	}

	/**
	 * 异步删除菜单
	 */
	@RequestMapping(value = "/delmenu", method = RequestMethod.POST)
	@ResponseBody
	public Object delmenu(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		param = sysservice.delMenu(param);
		if (param != null) {
			return "ok";
		} else {
			return "error";
		}
	}

	/**
	 * SQL管理的首页
	 * 
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@CheckLogin
	@RequestMapping(value = "/sqlmanage")
	public String sqlManageIndex(HttpServletRequest request, Model model)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequest(request);
		dbservice.selectListByPageOfBlob("sys_code_code.selectByCondition", rbp);

		model.addAttribute("result", rbp);
		model.addAttribute("codepath", rbp.getCondition().getString("codepath"));
		model.addAttribute("codeid", rbp.getCondition().getString("codeid"));
		model.addAttribute("sqlcode", rbp.getCondition().getString("sqlcode"));
		return "sysmanage/sqlmanage";
	}

	/**
	 * sql配置表名自动完成查询
	 */
	@RequestMapping(value = "/sqlmanagecodepathautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object sqlManageCodepathAutoComplete(HttpServletRequest request)
			throws Exception {
		ResultByPage tableselect = rbpservice.getByRequestByAuto(request);
		tableselect.getCondition().put(
				"staffid",
				((DataRow) request.getSession().getAttribute("OnlineStaff"))
						.getString("staffid"));
		tableselect.setPerpage(500);
		tableselect.getCondition().transTo("CODEPATHAUTO", "table_name");
		dbservice.selectListByPage("sys_code_code.selectAllCodePath", tableselect);
		return AutoCompleteUtil.generatorTable(tableselect);
	}

	/**
	 * 根据sqlpath和sqlid查询code_code
	 */
	@RequestMapping(value = "/getsqlbykey", method = RequestMethod.GET)
	@ResponseBody
	public Object getSqlByKey(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		param = sysservice.getCodeCodeByKey(param);
		Iterator paramnames = param.keySet().iterator();
		while (paramnames.hasNext()) {
			String paramname = (String) paramnames.next();
			if (param.containsKey(paramname) && param.get(paramname) != null) {
				param.put(paramname,
						URLEncoder.encode(param.getString(paramname), "UTF-8"));
			}
		}

		return JSON.toJSONString(param);
	}

	/**
	 * 根据sqlcode和变量参数测试SQL语句
	 */
	@RequestMapping(value = "/testsqlbysqlcode", method = RequestMethod.GET)
	public String testSqlBySqlCode(HttpServletRequest request, Model model)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequest(request);
		dbservice.selectListByTestSql(rbp);
		model.addAttribute("testsqlresult", rbp);
		return "sysmanage/testsqlresult";
	}

	/**
	 * 根据SQLREF查询SELECT语句的表头配置
	 */

	@RequestMapping(value = "/getsqlheadbykey", method = RequestMethod.GET)
	@ResponseBody
	public Object getSqlHeadByKey(HttpServletRequest request) {
		ResultByPage rbp = rbpservice.getByRequest(request);
		rbp.getCondition().put(
				"codekey",
				rbp.getCondition().getString("codepath") + "."
						+ rbp.getCondition().getString("codeid"));
		try {
			List<DataRow> headlist = dbservice.queryForListByCodeKey(
					"tableheadMpper.selectHeadByCodekey", rbp.getCondition());
			DataRow checkedhead = new DataRow();
			DataRow head_fieldname = new DataRow();
			if (headlist.size() > 0) {
				for (DataRow head : headlist) {
					checkedhead.put(head.get("fieldid").toString(),
							head.get("ordernum").toString());
					head_fieldname.put(head.get("fieldid").toString(),
							URLEncoder.encode(head.get("fieldname").toString(),
									"UTF-8"));
					head.put("FIELDNAME", URLEncoder.encode(
							head.get("fieldname").toString(), "UTF-8"));
					head.put("FIELDID", URLEncoder.encode(head.get("fieldid")
							.toString(), "UTF-8"));
				}
			}
			dbservice.selectListByTestSqlKey(
					rbp.getCondition().getString("codekey"), rbp);
			for (DataRow head : rbp.getFieldlist()) {
				DataRow headmap = sysservice.getCloumnComment(head);
				if (headmap != null && !headmap.isEmpty()) {
					if (headmap.containsKey("column_comment")
							&& !headmap.getString("column_comment").isEmpty()) {
						head.put("fieldname", URLEncoder.encode(
								headmap.getString("column_comment"), "UTF-8"));
					} else {
						head.put("fieldname", URLEncoder.encode(
								headmap.getString("column_name"), "UTF-8"));
					}
				} else {
					head.put("fieldname", head.getString("fieldid"));
					head.put("fieldid", head.getString("fieldid"));
				}
				if (checkedhead.containsKey(head.getString("fieldid"))) {
					head.put("ischeck", "checked");
					head.put("fieldname",
							head_fieldname.getString(head.getString("fieldid")));
					head.put("ordernum",
							checkedhead.get(head.getString("fieldid")));
				} else {
					head.put("ischeck", "");
				}
			}
			return JSON.toJSONString(rbp.getFieldlist()).getBytes();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 往code_code表中增加SQL语句
	 */
	@CheckLogin
	@RequestMapping(value = "/addcodecode", method = RequestMethod.POST)
	@ResponseBody
	public Object addCodeCode(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		param.put("sqlcode",
				URLDecoder.decode(param.getString("sqlcode"), "utf-8")
						.replaceAll("``", "#{"));
		logger.debug("sqlcode-->" + param.getString("sqlcode"));
		param.put("state", 1);
		param.put("updatetime", DateTimeUtil.getNowDateStr());
		logger.debug(param.toString());
		try {
			dbservice.Insert("sys_code_code", param);
		} catch (Exception e) {
			e.printStackTrace();
			return "1添加SQL失败，原因：" + e.getMessage();
		}
		return "0添加SQL：" + param.getString("codepath") + "."
				+ param.getString("codeid") + "成功！";
	}

	/**
	 * 从code_code表中更新SQL语句
	 */
	@CheckLogin
	@RequestMapping(value = "/updatecodecode", method = RequestMethod.POST)
	@ResponseBody
	public Object updateCodeCode(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		param.put("sqlcode",
				URLDecoder.decode(param.getString("sqlcode"), "utf-8")
						.replaceAll("``", "#{"));
		logger.debug("sqlcode-->" + param.getString("sqlcode"));
		param.put("state", 1);
		param.put("updatetime", DateTimeUtil.getNowDateStr());
		logger.debug(param.toString());
		try {
			dbservice.UpdateByKey("sys_code_code", param);
			dbservice.removeSqlByCodeKey(param.getString("codepath") + "."
					+ param.getString("codeid"));
		} catch (Exception e) {
			e.printStackTrace();
			return "1更新SQL失败，原因：" + e.getMessage();
		}
		return "0更新SQL：" + param.getString("codepath") + "."
				+ param.getString("codeid") + "成功！";
	}

	/**
	 * 从code_code表中删除SQL语句
	 */
	@CheckLogin
	@RequestMapping(value = "/delcodecode", method = RequestMethod.POST)
	@ResponseBody
	public Object delCodeCode(HttpServletRequest request) {
		DataRow param = rbpservice.getParamByRequest(request);
		param.remove("sqlcode");
		param.put("state", 0);
		param.put("updatetime", DateTimeUtil.getNowDateStr());
		logger.debug(param.toString());
		try {
			dbservice.UpdateByKey("sys_code_code", param);
			dbservice.removeSqlByCodeKey(param.getString("codepath") + "."
					+ param.getString("codeid"));
		} catch (Exception e) {
			e.printStackTrace();
			return "1删除SQL失败，原因：" + e.getMessage();
		}
		return "0删除SQL：" + param.getString("codepath") + "."
				+ param.getString("codeid") + "成功！";
	}

	/**
	 * 表头的设置
	 */
	@RequestMapping(value = "/configtablehead", method = RequestMethod.POST)
	@ResponseBody
	public Object configTableHead(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		String[] codekey = param.getString("sqlref").split("\\.");
		if (codekey.length == 2) {
			param.put("codepath", codekey[0]);
			param.put("codeid", codekey[1]);
		}
		param.put("updatetime", DateTimeUtil.getNowDateStr());
		String resultstr = "";
		try {
			resultstr = sysservice.congfigTableHead(param);
		} catch (Exception e) {
			resultstr = "1配置SQL表头失败，原因：" + e.getMessage();
		}
		return resultstr;
	}

	/**
	 * 权限定义
	 */
	@CheckLogin(title = "权限定义")
	@RequestMapping(value = "/functionmanage", method = RequestMethod.GET)
	public String functionManage(HttpServletRequest request, Model model) {
		return "sysmanage/functionmanage";
	}

	/**
	 * 权限定义列表
	 */
	@RequestMapping(value = "/functionview", method = RequestMethod.GET)
	public String functionView(HttpServletRequest request, Model model)
			throws Exception {
		ResultByPage functionlist = rbpservice.getByRequest(request);
		dbservice.selectListByPage("td_s_function.selecFunctionList",
				functionlist);
		model.addAttribute("functionlist", functionlist);
		return "sysmanage/functionview";
	}

	/**
	 * 权限定义增加权限
	 */
	@RequestMapping(value = "/addfunctionitem", method = RequestMethod.POST)
	@ResponseBody
	public Object addFunctionItem(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		logger.debug(param.toString());
		try {
			sysservice.addFunctionItem(param);
		} catch (Exception e) {
			e.printStackTrace();
			return "1增加权限失败，原因：" + e.getMessage();
		}
		return "0增加权限：" + param.getString("functionname") + ",权限编码："
				+ param.getString("functionright") + "成功！";
	}

	/**
	 * 权限定义更新权限
	 */
	@RequestMapping(value = "/updfunctionitem", method = RequestMethod.POST)
	@ResponseBody
	public Object updfunctionitem(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		logger.debug(param.toString());
		try {
			sysservice.updFunctionItem(param);
		} catch (Exception e) {
			e.printStackTrace();
			return "1更新权限失败，原因：" + e.getMessage();
		}
		return "0更新权限：" + param.getString("functionname") + ",权限编码："
				+ param.getString("functionright") + "成功！";
	}

	/**
	 * 权限定义删除权限
	 */
	@RequestMapping(value = "/delfunctionitem", method = RequestMethod.POST)
	@ResponseBody
	public Object delfunctionitem(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		logger.debug(param.toString());
		try {
			sysservice.delFunctionItem(param);
		} catch (Exception e) {
			e.printStackTrace();
			return "1删除权限失败，原因：" + e.getMessage();
		}
		return "0删除权限ID：" + param.getString("functionid") + "成功！";
	}

	/**
	 * 角色定义
	 */
	@CheckLogin(title = "角色定义")
	@RequestMapping(value = "/rolemanage", method = RequestMethod.GET)
	public String roleManage(HttpServletRequest request, Model model) {
		return "sysmanage/rolemanage";
	}

	/**
	 * 角色定义列表
	 */
	@RequestMapping(value = "/rolemanageview", method = RequestMethod.GET)
	public String roleManageView(HttpServletRequest request, Model model)
			throws Exception {
		ResultByPage rolelist = rbpservice.getByRequest(request);
		dbservice.selectListByPage("td_s_role.selecRoleList", rolelist);
		model.addAttribute("rolelist", rolelist);
		return "sysmanage/rolemanageview";
	}

	/**
	 * 角色定义增加角色
	 */
	@RequestMapping(value = "/addroleitem", method = RequestMethod.POST)
	@ResponseBody
	public Object addRoleItem(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		param.put("companyid",
				((DataRow) request.getSession().getAttribute("OnlineStaff"))
						.getString("companyid"));
		logger.debug(param.toString());
		try {
			sysservice.addRoleItem(param);
		} catch (Exception e) {
			e.printStackTrace();
			return "1增加角色失败，原因：" + e.getMessage();
		}
		return "0增加角色：" + param.getString("rolename") + "成功！";
	}

	/**
	 * 角色定义更新角色
	 */
	@RequestMapping(value = "/updroleitem", method = RequestMethod.POST)
	@ResponseBody
	public Object updroleitem(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		logger.debug(param.toString());
		try {
			sysservice.updRoleItem(param);
		} catch (Exception e) {
			e.printStackTrace();
			return "1更新角色失败，原因：" + e.getMessage();
		}
		return "0更新角色：" + param.getString("rolename") + "成功！";
	}

	/**
	 * 角色定义删除角色
	 */
	@RequestMapping(value = "/delroleitem", method = RequestMethod.POST)
	@ResponseBody
	public Object delroleitem(HttpServletRequest request) throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		logger.debug(param.toString());
		try {
			sysservice.delRoleItem(param);
		} catch (Exception e) {
			e.printStackTrace();
			return "1删除角色失败，原因：" + e.getMessage();
		}
		return "0删除角色ID：" + param.getString("roleid") + "成功！";
	}

	/**
	 * 权限管理
	 */
	@CheckLogin(title = "权限管理")
	@RequestMapping(value = "/functionaddrole", method = RequestMethod.GET)
	public String functionAddRole(HttpServletRequest request, Model model)
			throws Exception {
		ResultByPage roleselectlist = rbpservice.getByRequest(request);
		roleselectlist.getCondition().put("state", 1);
		DataRow OnlineStaff = (DataRow) request.getSession().getAttribute(
				"OnlineStaff");
		if (OnlineStaff != null && OnlineStaff.containsKey("COMPANYID")
				&& !OnlineStaff.getString("companyid").isEmpty()) {
			roleselectlist.getCondition().put("companyid",
					OnlineStaff.getString("companyid"));
		}
		dbservice.selectList("td_s_role.selectRoleForSelect", roleselectlist);
		model.addAttribute("roleselectlist", roleselectlist);
		return "sysmanage/functionaddrole";
	}

	/**
	 * 权限管理列表
	 */
	@CheckLogin
	@RequestMapping(value = "/functionaddroleview", method = RequestMethod.GET)
	public String functionAddRoleView(HttpServletRequest request, Model model)
			throws Exception {
		ResultByPage funcrolelist = rbpservice.getByRequest(request);
		funcrolelist.getCondition().put("roleid",
				funcrolelist.getCondition().getString("role_hidden_value"));
		dbservice.selectList("td_s_functionrole.selectFunctionRoleByRoleid",
				funcrolelist);
		model.addAttribute("hasfunctionlist", funcrolelist);

		ResultByPage nofunctionlist = rbpservice.getByRequest(request);
		nofunctionlist.getCondition().put("roleid",
				nofunctionlist.getCondition().getString("role_hidden_value"));
		nofunctionlist.getCondition().put(
				"staffid",
				((DataRow) request.getSession().getAttribute("OnlineStaff"))
						.getString("staffid"));
		dbservice.selectList("td_s_function.selectNoConfigFunction",
				nofunctionlist);
		model.addAttribute("nofunctionlist", nofunctionlist);
		model.addAttribute("roleid",
				nofunctionlist.getCondition().getString("roleid"));
		model.addAttribute("rolename",
				nofunctionlist.getCondition().getString("role"));
		return "sysmanage/functionaddroleview";
	}

	/**
	 * 权限分配明细
	 */
	@CheckLogin
	@RequestMapping(value = "/addfunctionroleitem", method = RequestMethod.POST)
	@ResponseBody
	public Object addFunctionRoleItem(HttpServletRequest request)
			throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		logger.debug(param.toString());
		try {
			sysservice.addFunctionRoleItem(param);
		} catch (Exception e) {
			e.printStackTrace();
			return "1权限分配失败，原因：" + e.getMessage();
		}
		return "0分配权限：" + param.getString("functionname") + "成功！";
	}

	/**
	 * 权限分配删除权限
	 */
	@RequestMapping(value = "/delfunctionroleitem", method = RequestMethod.POST)
	@ResponseBody
	public Object delFunctionRoleItem(HttpServletRequest request)
			throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		logger.debug(param.toString());
		try {
			sysservice.delFunctionRoleItem(param);
		} catch (Exception e) {
			e.printStackTrace();
			return "1删除权限失败，原因：" + e.getMessage();
		}
		return "0删除权限：(" + param.getString("functionname") + ")成功！";
	}

	/**
	 * 员工角色分配
	 */
	@CheckLogin(title = "员工角色分配")
	@RequestMapping(value = "/addroletouser", method = RequestMethod.GET)
	public String addRoletoUser(HttpServletRequest request, Model model)
			throws Exception {
		return "sysmanage/addroletouser";
	}

	/**
	 * 员工角色分配列表
	 */
	@CheckLogin
	@RequestMapping(value = "/addroletouserview", method = RequestMethod.GET)
	public String addRoleToUserView(HttpServletRequest request, Model model)
			throws Exception {
		// 已有的角色
		ResultByPage hasroleparam = rbpservice.getByRequest(request);
		// hasroleparam.getCondition().put("staffid",hasroleparam.getCondition().getString("staffid_role"));
		dbservice.selectList("tf_s_userrole.selectHasRoleByStaffid",
				hasroleparam);
		model.addAttribute("hasrolelist", hasroleparam);
		// 未分配角色
		ResultByPage norolelist = rbpservice.getByRequest(request);
		norolelist.getCondition().put(
				"onlinestaffid",
				((DataRow) request.getSession().getAttribute("OnlineStaff"))
						.getString("staffid"));
		// norolelist.getCondition().put("staffid",hasroleparam.getCondition().getString("staffid_role"));
		dbservice.selectList("tf_s_userrole.selectNoRoleByStaffid", norolelist);
		model.addAttribute("norolelist", norolelist);
		model.addAttribute("staffid",
				norolelist.getCondition().getString("staffid"));
		model.addAttribute("staffname",
				norolelist.getCondition().getString("staffname"));
		return "sysmanage/addroletouserview";
	}

	/**
	 * 角色分配明细
	 */
	@CheckLogin
	@RequestMapping(value = "/addroletouseritem", method = RequestMethod.POST)
	@ResponseBody
	public Object addRoleToUserItem(HttpServletRequest request)
			throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		param.put("staffid", param.getString("addstaffid"));
		logger.debug(param.toString());
		try {
			sysservice.addRoleToUserItem(param);
		} catch (Exception e) {
			e.printStackTrace();
			return "1角色分配失败，原因：" + e.getMessage();
		}
		return "0分配角色：" + param.getString("rolename") + "成功！";
	}

	/*
	 * 角色分配删除权限
	 */
	@RequestMapping(value = "/delroletouseritem", method = RequestMethod.POST)
	@ResponseBody
	public Object delRoleToUserItem(HttpServletRequest request)
			throws Exception {
		DataRow param = rbpservice.getParamByRequest(request);
		logger.debug(param.toString());
		try {
			sysservice.delRoleToUserItem(param);
		} catch (Exception e) {
			e.printStackTrace();
			return "1删除角色失败，原因：" + e.getMessage();
		}
		return "0删除角色：(" + param.getString("rolename") + ")成功！";
	}

	/*
	 * base/sysmanage/addroleautocomplete
	 */
	@RequestMapping(value = "/addroleautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object addRoleAutoComplete(HttpServletRequest request)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		rbp.setPerpage(20);
		DataRow OnlineStaff = (DataRow) request.getSession().getAttribute(
				"OnlineStaff");
		if (OnlineStaff != null && OnlineStaff.containsKey("COMPANYID")
				&& !OnlineStaff.getString("companyid").isEmpty()) {
			rbp.getCondition().put("companyid",
					OnlineStaff.getString("companyid"));
		}
		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_userinfo.selectUserForSelect", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/portautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object portAutoComplete(HttpServletRequest request) throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAutoForRepeat(request,
				"PortNameEN", "PortNameEN1");

		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_port.ACT_td_port_portName", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/companypaytypeautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object companyPayTypeAutoComplete(HttpServletRequest request) throws Exception
	{
		ResultByPage rbp = rbpservice.getByRequestByAutoForRepeat(request,
				"PayTypeName", "PayTypeName");

		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try
		{
			dbservice.selectListByPage("td_companypaytype.ACT_td_companypaytype", rbp);
		} catch (Exception e)
		{
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}
	
	@RequestMapping(value = "/companynameautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object companyNameAutoComplete(HttpServletRequest request)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAutoForRepeat(request,
				"CompanyName", "CompanyName");

		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_company.ACT_td_companyname", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/portautocompletenew", method = RequestMethod.GET)
	@ResponseBody
	public Object portAutoCompleteNew(HttpServletRequest request)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);

		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_port.selectPortMutiCondition", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/companyautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object companyAutoComplete(HttpServletRequest request)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);

		rbp.setPerpage(10);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_company.SelectCompanyAutoComplete",
					rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/expressaddressautocomplete/{companyid}", method = RequestMethod.GET)
	@ResponseBody
	public Object expressAddressAutoComplete(@PathVariable String companyid,
			HttpServletRequest request) throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		if (!rbp.getCondition().containsKey("companyid")) {
			rbp.getCondition().put("companyid", companyid);
		}
		rbp.setPerpage(10);

		logger.debug(rbp.toString());
		try {
			dbservice
					.selectListByPage(
							"td_customerexpressaddress.ExpressAddressAutoComplete",
							rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/carrierautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object carrierAutoComplete(HttpServletRequest request)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAutoForRepeat(request,
				"NameEN", "NameEN");
//		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
//		if (rbp.getCondition().containsKey("carrierID")) {
//			rbp.getCondition().put("NameEN",
//					rbp.getCondition().getString("carrierID"));
//		}
		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_carrier.ACT_td_carriername", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/carrierautocompletenew", method = RequestMethod.GET)
	@ResponseBody
	public Object carrierAutoCompleteNew(HttpServletRequest request)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage(
					"td_carrier.selectCarrierIDByAutoComplete", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	/*
	 * country表自动联想
	 */
	@RequestMapping(value = "/countryautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object countryAutoComplete(HttpServletRequest request)
			throws Exception {
		// ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		ResultByPage rbp = rbpservice.getByRequestByAutoForRepeat(request,
				"CountryNameEN", "CountryNameEN");
		rbp.setPerpage(20);
		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_country.ACT_td_country_name", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	/*
	 * 区域表自动联想
	 */
	@RequestMapping(value = "/routelineareaautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object routelineareaAutoComplete(HttpServletRequest request)
			throws Exception {
		// ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		ResultByPage rbp = rbpservice.getByRequestByAutoForRepeat(request,
				"routelineareanamecn", "routelineareanamecn");
		rbp.setPerpage(20);
		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage(
					"td_routelinearea.ACT_td_routelinearea_name", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/basetypeautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object basetypeAutoComplete(HttpServletRequest request)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAutoForRepeat(request,
				"categoryname1", "categoryname");

		rbp.setPerpage(20);
		logger.debug(rbp.toString());
		dbservice.selectListByPage(
				"td_basecategory.ATC_td_basecategory_categoryname", rbp);
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/waipeicompanyautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object waiPeiCompanyAutoComplete(HttpServletRequest request)
			throws Exception {
		Object onlinestaff = request.getSession().getAttribute("OnlineStaff");
		if (onlinestaff != null) {
			ResultByPage rbp = rbpservice.getByRequestByAutoForRepeat(request,
					"CompanyName", "CompanyName");

			rbp.getCondition().put("HostID",
					((DataRow) onlinestaff).getString("HostID"));
			rbp.getCondition().put("CategoryID", ConstantMap.COMPANY_WAIPEI);
			rbp.setPerpage(10);
			logger.debug(rbp.toString());
			try {
				dbservice.selectListByPage(
						"tr_companycategory.selectCompanyByCategory", rbp);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return AutoCompleteUtil.generatorTable(rbp);
		} else {
			return AutoCompleteUtil.generatorTable(null);
		}

	}

	@RequestMapping(value = "/sessioncheck", method = RequestMethod.GET)
	@ResponseBody
	public Object sessionCheck(HttpServletRequest request) throws Exception {
		String staffid = "";
		if (request.getSession().getAttribute("OnlineStaff") != null) {
			staffid = ((DataRow) request.getSession().getAttribute(
					"OnlineStaff")).getString("staffid");

		}
		return staffid;
	}

	/*
	 * 测试自定义表头
	 */
	@CheckLogin(title = "测试页面", mustLogin = false)
	@RequestMapping(value = "/testtable", method = RequestMethod.GET)
	public String testTable(HttpServletRequest request, Model model)
			throws Exception {
		ResultByPage hasroleparam = rbpservice.getByRequest(request);
		dbservice.selectListByPage("menuMapper.selectMenuList", hasroleparam);
		model.addAttribute("result", hasroleparam);
		model.addAttribute("rolemap", UserRoleUtil.getRole(request));
		return "sysmanage/testtable";
	}
	
	@CheckLogin(title = "测试页面", mustLogin = false)
	@RequestMapping(value = "/tests", method = RequestMethod.GET)
	public String tests(HttpServletRequest request, Model model)
			throws Exception {
//		ResultByPage hasroleparam = rbpservice.getByRequest(request);
//		dbservice.selectListByPage("menuMapper.selectMenuList", hasroleparam);
//		model.addAttribute("result", hasroleparam);
//		model.addAttribute("rolemap", UserRoleUtil.getRole(request));
		return "sysmanage/tests";
	}

	/*
	 * 测试ajax分页
	 */
	@CheckLogin(title = "测试Ajax分页", mustLogin = false)
	@RequestMapping(value = "/testajaxpage", method = RequestMethod.GET)
	public String testAjaxPage(HttpServletRequest request, Model model) {
		return "sysmanage/menumanagebypage";
	}

	@CheckLogin(title = "测试Ajax分页", mustLogin = false)
	@RequestMapping(value = "/menubytags", method = RequestMethod.GET)
	public String testAjaxPageGrid(HttpServletRequest request, Model model)
			throws Exception {
//		ResultByPage test = rbpservice.getByRequest(request);
//		dbservice.selectListByPage("menuMapper.selectMenuList", test);
//		model.addAttribute("testresult", test);
		return "sysmanage/menubytags";
	}

	/**
	 * AutoComplete--公司类别信息（可按类别查询），在配置ehang:AutoComplete时，
	 * showid务必以SH_CompanyName结尾 author gening date 2015年4月7日
	 * 
	 * @param categoryid
	 *            公司类别ID
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/companyautocomplete/{categoryid}", method = RequestMethod.GET)
	@ResponseBody
	public Object companyAutoComplete(@PathVariable String categoryid,
			HttpServletRequest request) throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		if (!rbp.getCondition().containsKey("categoryid")) {
			rbp.getCondition().put("categoryid", categoryid);
		}
		if (rbp.getCondition() != null && rbp.getCondition().size() > 0) {
			for (Object obj : rbp.getCondition().keySet()) {
				if (String.valueOf(obj).endsWith("SH_CompanyName")) {
					rbp.getCondition().transTo((String) obj, "CompanyName");
				}
			}
		}

		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_company.selectCompanyByType", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	/**
	 * AutoComplete--公司联系人查询
	 * 按公司ID查询，在配置ehang:AutoComplete时，showid务必以SH_CompanyID结尾 author gening date
	 * 2015年4月7日
	 * 
	 * @param companyid
	 *            公司ID
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/contactautocomplete/{companyid}", method = RequestMethod.GET)
	@ResponseBody
	public Object contactAutoComplete(@PathVariable String companyid,
			HttpServletRequest request) throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		if (!rbp.getCondition().containsKey("companyid")) {
			rbp.getCondition().put("companyid", companyid);
		}
		if (rbp.getCondition() != null && rbp.getCondition().size() > 0) {
			for (Object obj : rbp.getCondition().keySet()) {
				if (String.valueOf(obj).endsWith("SH_CompanyID")) {
					rbp.getCondition().transTo((String) obj, "CompanyID");
				}
			}
		}

		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage(
					"tr_companycontacts.selectContactsByCompanyID", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/departmentautocomplete/{companyid}", method = RequestMethod.GET)
	@ResponseBody
	public Object departmentAutoComplete(@PathVariable String companyid,
			HttpServletRequest request) throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		if (!rbp.getCondition().containsKey("companyid")) {
			rbp.getCondition().put("companyid", companyid);
		}
		if (rbp.getCondition() != null && rbp.getCondition().size() > 0) {
			for (Object obj : rbp.getCondition().keySet()) {
				if (String.valueOf(obj).endsWith("SH_CompanyID")) {
					rbp.getCondition().transTo((String) obj, "CompanyID");
				}
			}
		}

		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage(
					"td_companydepartment.selectDepartmentByCompanyID", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/portenautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object portenAutoComplete(HttpServletRequest request)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);

		if (rbp.getCondition() != null && rbp.getCondition().size() > 0) {
			for (Object obj : rbp.getCondition().keySet()) {
				if (String.valueOf(obj).endsWith("SH_PortEn")) {
					rbp.getCondition().transTo((String) obj, "PortENName");
				}
			}
		}

		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_port.ACT_td_port_portenname", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/operatorautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object operatorAutoComplete(HttpServletRequest request)
			throws Exception {
		DataRow onlineStaff = (DataRow) request.getSession().getAttribute(
				"OnlineStaff");
		String hostId = onlineStaff.getString("HostID");

		ResultByPage rbp = rbpservice.getByRequestByAuto(request);

		if (rbp.getCondition() != null && rbp.getCondition().size() > 0) {
			for (Object obj : rbp.getCondition().keySet()) {
				if (String.valueOf(obj).endsWith("SH_Staff")) {
					rbp.getCondition().transTo((String) obj, "staffid");
				}
			}
		}
		rbp.getCondition().put("hostid", hostId);
		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_userinfo.ACT_td_userinfo_staffname",
					rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	/**
	 * AutoComplete--公司联系人查询
	 * 按公司ID查询，在配置ehang:AutoComplete时，showid务必以SH_CompanyID结尾 author gening date
	 * 2015年4月7日
	 * 
	 * @param companyid
	 *            公司ID
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/userinfoautocomplete/{CategoryID}", method = RequestMethod.GET)
	@ResponseBody
	public Object userInfoAutoComplete(@PathVariable String CategoryID,
			HttpServletRequest request) throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		if (!rbp.getCondition().containsKey("CategoryID")) {
			rbp.getCondition().put("CategoryID", CategoryID);
		}
		if (rbp.getCondition() != null && rbp.getCondition().size() > 0) {
			for (Object obj : rbp.getCondition().keySet()) {
				if (String.valueOf(obj).endsWith("SH_UserInfo")) {
					rbp.getCondition().transTo((String) obj, "StaffName");
				}
			}
		}

		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage(
					"td_userinfo.ACT_td_userinfo_CategoryID", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	/**
	 * 根据英文船名查询中文船名和集港码头
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/findvesselen", method = RequestMethod.GET)
	@ResponseBody
	public Object findVesselEN(HttpServletRequest request) throws Exception {
//		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
//		if (!rbp.getCondition().containsKey("Vessel")) {
//			rbp.getCondition().put("Vessel",
//					rbp.getCondition().getString("Vessel"));
//		}
		ResultByPage rbp = rbpservice.getByRequestByAutoForRepeat(request,
				"Vessel", "Vessel");
		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage(
					"td_vesselinfo.findVesselcnDockByVessel", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	/**
	 * 查询人员列表
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/findsalelist", method = RequestMethod.GET)
	@ResponseBody
	public Object findSaleList(HttpServletRequest request) throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		if (rbp.getCondition().containsKey("staffname")) {
			rbp.getCondition().put("staffname",
					rbp.getCondition().getString("staffname"));
		}
		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_userinfo.findUserNameList", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	/**
	 * 查询人员列表
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/findcompanylist", method = RequestMethod.GET)
	@ResponseBody
	public Object findCompanyList(HttpServletRequest request) throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		if (rbp.getCondition().containsKey("companyname")) {
			rbp.getCondition().put("companyname",
					rbp.getCondition().getString("companyname"));
		}
		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_userinfo.findCompanyNameList", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	@RequestMapping(value = "/scnautocomplete/{scnid}", method = RequestMethod.GET)
	@ResponseBody
	public Object SCNAutoComplete(@PathVariable String scnid,
			HttpServletRequest request) throws Exception {

		String hostId = null;
		String staffid = null;
		Object onlinestaff = request.getSession().getAttribute("OnlineStaff");
		DataRow onlinestaff_dr = null;
		if (onlinestaff != null) {
			onlinestaff_dr = (DataRow) onlinestaff;
		}
		if (!MapUtil.isEmpty(onlinestaff_dr)) {
			DataRow rolemap = (DataRow) (onlinestaff_dr.get("role"));
			if (rolemap.containsKey(ConstantMap.ROLE_CUSTOMER))
				staffid = onlinestaff_dr.getString("staffid");
			else
				hostId = onlinestaff_dr.getString("hostId");
		}

		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		if (rbp.getCondition().containsKey("search_shipper")) {
		rbp=rbpservice.getByRequestByAutoForRepeat(request,
				"search_shipper", "Content");
		}
		if (rbp.getCondition().containsKey("search_consignee")) {
			rbp=rbpservice.getByRequestByAutoForRepeat(request,
					"search_consignee", "Content");
			}
		if (rbp.getCondition().containsKey("search_notify")) {
			rbp=rbpservice.getByRequestByAutoForRepeat(request,
					"search_notify", "Content");
			}
		if (rbp.getCondition().containsKey("search_secondnotify")) {
			rbp=rbpservice.getByRequestByAutoForRepeat(request,
					"search_secondnotify", "Content");
			}
		
		rbp.getCondition().put("SCNID", scnid);
		if (!Strings.isNullOrEmpty(staffid))
			rbp.getCondition().put("Staffid", staffid);
		if (!Strings.isNullOrEmpty(hostId))
			rbp.getCondition().put("HostID", hostId);
		rbp.setPerpage(5);
		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage(
					"td_customerscnaddress.SelectCustomerSCN", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	
	@RequestMapping(value = "/overseacompanyautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object overseaCompanyAutoComplete(
			HttpServletRequest request) throws Exception {

		String hostId = null;
		Object onlinestaff = request.getSession().getAttribute("OnlineStaff");
		DataRow onlinestaff_dr = null;
		if (onlinestaff != null) {
			onlinestaff_dr = (DataRow) onlinestaff;
		}
		if (!MapUtil.isEmpty(onlinestaff_dr)) {
				hostId = onlinestaff_dr.getString("hostId");
		}

		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		
		if (!Strings.isNullOrEmpty(hostId))
			rbp.getCondition().put("HostID", hostId);
		rbp.setPerpage(5);
		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage(
					"td_overseacompany.OverseaCompanyAutoComplete", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}

	/**
	 * 查询付费收费公司
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/findFeeCompanylist", method = RequestMethod.GET)
	@ResponseBody
	public Object findFeeCompanylist(HttpServletRequest request) throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
		if (rbp.getCondition().containsKey("PRAccountsID")) {
			rbp.getCondition().put("PRAccountsID",
					rbp.getCondition().getString("PRAccountsID"));
		}
		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("te_orderfee.findFeeCompanylist", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}
	
	/**
	 * 查询根据公司分类查询公司名称
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/findCompanycategoryBycateID", method = RequestMethod.GET)
	@ResponseBody
	public Object findCompanycategoryBycateID(HttpServletRequest request) throws Exception {
//		ResultByPage rbp = rbpservice.getByRequestByAuto(request);
//		if (rbp.getCondition().containsKey("companyname")) {
//			rbp.getCondition().put("companyname",
//					rbp.getCondition().getString("companyname"));
//		}
		ResultByPage rbp = rbpservice.getByRequestByAutoForRepeat(request, "CompanyName", "CompanyName");
		rbp.setPerpage(20);
		DataRow param = rbp.getCondition();
		//param.put("categoryid", categoryid);
		rbp.setCondition(param);
		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("tr_companycategory.findCompanycategoryBycateID", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}
	
	@RequestMapping(value = "/accpayableautocomplete", method = RequestMethod.GET)
	@ResponseBody
	public Object accpayableAutoComplete(HttpServletRequest request)
			throws Exception {
		ResultByPage rbp = rbpservice.getByRequestByAuto(request);

		if (rbp.getCondition() != null && rbp.getCondition().size() > 0) {
			for (Object obj : rbp.getCondition().keySet()) {
				if (String.valueOf(obj).endsWith("ACPSH_ComCN")) {
					rbp.getCondition().transTo((String) obj, "accountname");
				}
			}
		}

		rbp.setPerpage(20);

		logger.debug(rbp.toString());
		try {
			dbservice.selectListByPage("td_accounts_payable.ACT_td_accounts_payable", rbp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AutoCompleteUtil.generatorTable(rbp);
	}
	/**
	 * 缓存列表展示
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/ehcachelist", method = RequestMethod.GET)
	public String ehCacheList(HttpServletRequest request,Model model) throws Exception {
		model.addAttribute("cachelist", StaticCache.getCacheList());
		return "sysmanage/ehcachelist";
	}
	
	@RequestMapping(value = "/reflashcache/{cachename}", method = RequestMethod.GET)
	public String ehCacheList(@PathVariable String cachename, HttpServletRequest request,Model model) throws Exception {
		if(cachename!=null&&cachename.equals("td_s_static"))
		{
			scservice.init();
		}
		model.addAttribute("cachelist", StaticCache.getCacheList());
		return "sysmanage/ehcachelist";
	}
	
	@RequestMapping(value = "/getStaffListByRoleId", method = RequestMethod.GET)
	@ResponseBody
	public String getStaffListByRoleId(HttpServletRequest request,Model model) throws Exception {
		ResultByPage param = rbpservice.getByRequest(request);
		param.getCondition().put("hostid",((DataRow) request.getSession().getAttribute("OnlineStaff")).getString("hostid"));
		 param.setPerpage(500);
		dbservice.selectListByPage("tr_usermaprole.selectStaffListByRoleID", param);
		return AutoCompleteUtil.generatorMultipleSelectTable(param);
	}
	
	@RequestMapping(value = "/getStaffIdByOrderIDAndRoleID", method = RequestMethod.GET)
	@ResponseBody
	public String getStaffIdByOrderIDAndRoleID(HttpServletRequest request,Model model) throws Exception {
		ResultByPage param = rbpservice.getByRequest(request);
		param.getCondition().transTo("roleid","roles");
		dbservice.selectList("te_orderoperators.selectStaffIDByRoles", param);
		String staffs = "";
		List<DataRow> stafflist = param.getResultlist();
		for(DataRow staffinfo : stafflist)
		{
			staffs =  staffs +staffinfo.getString("Staffid")+",";
		}
		if(staffs.endsWith(","))
		{
			staffs = staffs.substring(0,staffs.length()-1);
		}
		return staffs;
	}
}
