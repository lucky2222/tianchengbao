package com.tcb.dao.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.MainMenuNode;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.MD5Util;

@Service(value="UserManageService")
public class UserManageService {
	private static final Logger logger = LoggerFactory.getLogger(UserManageService.class);
	private static DataRow MenuUrl = new DataRow();//面包屑菜单路径map
	@Autowired
	private DBService dbservice;
	
	/*
	 * 通过员工编码获取员工菜单
	 */
	public ArrayList<MainMenuNode> getUserMenu(String staffid)
	{
		//员工菜单返回列表
		ArrayList<MainMenuNode> staffmenulist = new ArrayList<MainMenuNode>();
		DataRow param = new DataRow();
		param.put("staffid",staffid);
		try {
			HashMap<String,MainMenuNode> pmenumap = new HashMap<String,MainMenuNode>();
			//查询用户拥有权限的父菜单
			List<DataRow> parentmenulist = dbservice.queryForListByCodeKey("sys_staff.selectParentMenuByStaffid", param);
			for(Map pmenu : parentmenulist )
			{
				MainMenuNode mmn = new MainMenuNode();
				mmn.setMenuName(pmenu.get("menuname").toString());
				mmn.setSortNum(Integer.valueOf(pmenu.get("sortnum").toString()));
				pmenumap.put(pmenu.get("menuid").toString(),mmn);
				staffmenulist.add(mmn);
			}
			//查询用户拥有权限的菜单
			List<DataRow> staffmenulists = dbservice.queryForListByCodeKey("sys_staff.selectMenuByStaffid", param);
			for(DataRow menu : staffmenulists )
			{
				MainMenuNode subitem = new MainMenuNode();
				if(pmenumap.containsKey(menu.get("parentid").toString()))
				{
					MainMenuNode mmn = pmenumap.get(menu.get("parentid").toString());
					subitem.setMenuName(menu.get("menuname").toString());
					subitem.setMenuHref(menu.get("menufile").toString());
					subitem.setRightCode(menu.get("functionright").toString());
					subitem.setMenuName(menu.get("menuname").toString());
					subitem.setSortNum(Integer.valueOf(menu.get("sortnum").toString()));
					mmn.getLeafNode().add(subitem);
				}
			}
			pmenumap =null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return staffmenulist ;
	}
	
	/*
	 * 用户登录
	 */
	public DataRow doLogin(DataRow param)
	{
		param.put("state",2);
		param.put("DatabaseID", 1);
		try {
			DataRow staff = dbservice.querySimpleRowByKey("sys_staff", param.getString("staffid"));
			logger.debug(staff.toString());
			if(staff!=null&&!staff.isEmpty())
			{
				if(MD5Util.makeMD5(param.getString("staffid").toUpperCase()+param.getString("password")).equals(staff.getString("password")))
				{
					//登录成功
					param.putAll(staff);
					param.put("state",0);
				}else{
					param.put("state",1);
					param.put("login_remark","密码输入错误");
				}
			}else{
				param.put("login_remark","无此用户");
			}
			param.put("logintime", DateTimeUtil.getNowDateStr());
			dbservice.Insert("tl_loginlog", param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return param;
	}
	
	/**
	 * 获取面包屑菜单
	 * @param 菜单访问路径
	 * @throws Exception 
	 */
	public List<DataRow> getBreadCrumb(String requesturi) throws Exception
	{
		logger.debug("getBreadCrumb ->"+requesturi);
		if(MenuUrl.containsKey(requesturi))
		{
			return (List<DataRow>) MenuUrl.get(requesturi);
		}else{
			DataRow param = new DataRow();
			param.put("menufile", requesturi);
			param.put("state",1);
			DataRow menu = dbservice.querySimpleRowByParam("sys_menu", param,null);
			if(menu!=null&&!menu.isEmpty())
			{
				Object parentid = menu.get("parentid");
				ArrayList breadlist = new ArrayList();
				menu.put("vistflag",1);
				breadlist.add(menu);
				while(parentid!=null
						&&!parentid.toString().isEmpty())
				{
					param.clear();
					param.put("menuid", parentid);
					param.put("state",1);
					DataRow pmenu = dbservice.querySimpleRowByParam("sys_menu", param,null);
					if(pmenu!=null&&!pmenu.isEmpty())
					{
						pmenu.put("vistflag",0);
						breadlist.add(0, pmenu);
						if(pmenu.containsKey("parentid")&&pmenu.get("parentid")!=null
								&&!pmenu.getString("parentid").equals(pmenu.getString("menuid"))
								&&!pmenu.getString("parentid").isEmpty()
								)
						{
							parentid = pmenu.get("parentid");
						}else{
							break;
						}
					}else{
						break;
					}
				}
				MenuUrl.put(requesturi, breadlist);
				return breadlist;
			}
		}
		return null;
	}
	/*
	 * 获取用户权限编码
	 */
	public DataRow getFunctionrightByStaffid(DataRow param) throws Exception
	{
		DataRow userfunction = new DataRow();
		List<DataRow> functionids = dbservice.queryForListByCodeKey("sys_userrole.selectFunctionidByStaffid", param);
		for(DataRow item : functionids)
		{
			logger.debug(item.toString());
			if(item.containsKey("functionright")&&item.get("functionright")!=null&&!item.get("functionright").toString().isEmpty())
			{
				String functionid = item.get("functionright").toString();
				userfunction.put(functionid, functionid);
			}
		}
		return userfunction;
	}
	

}
