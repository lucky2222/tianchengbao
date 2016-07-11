package com.tcb.dao.service;

import java.net.URLDecoder;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.TableHead;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;

/*
 * 系统管理数据库服务类
 * 
 */
@Service(value="SysManageService")
@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
public class SysManageService {
	private static final Logger logger = LoggerFactory.getLogger(SysManageService.class);
	@Autowired
	private DBService dbservice;
	
	/*
	 * 新增菜单
	 */
	public DataRow addMenu(DataRow param) throws Exception
	{
		param.put("menuid", GeneratorIDUtil.generatorId());
		param.put("syscode", "SEA");
		param.put("state", "1");
		param.put("menutype", "0");
		param.put("remark", param.getString("menuname"));
		param.put("updatetime",DateTimeUtil.getNowDateStr() );
		dbservice.Insert("sys_menu", param);//录菜单表
		param.put("functionid", GeneratorIDUtil.generatorId());
		param.put("functionname",param.getString("menuname") );
		param.put("functiontype",0 );
		dbservice.Insert("td_s_function", param);//录权限表
		DataRow queryrole = new DataRow();
		queryrole.put("staffid", param.getString("updatestaff"));
		queryrole.put("state", "1");
		DataRow userrole = dbservice.querySimpleRowByParam("tf_s_userrole", queryrole, null);
		param.put("funcroleid", GeneratorIDUtil.generatorId());
		param.put("roleid", userrole.getString("roleid"));
		dbservice.Insert("td_s_functionrole", param);//录角色权限表
		return param;
	}
	/*
	 * 更新菜单
	 */
	public DataRow updateMenu(DataRow param) throws Exception
	{
		DataRow menu = dbservice.querySimpleRowByKey("sys_menu", param.getString("menuid"));
		param.put("syscode", "SEA");
		param.put("state", "1");
		param.put("menutype", "0");
		param.put("remark", param.getString("menuname"));
		param.put("updatetime",DateTimeUtil.getNowDateStr() );
		
		if(!param.getString("functionright").equals(menu.getString("functionright")))//更新权限表
		{
			DataRow queryfunc = new DataRow();
			queryfunc.put("functionright", menu.getString("functionright"));
			queryfunc.put("state", "1");
			DataRow function = dbservice.querySimpleRowByParam("td_s_function", queryfunc,null);
			queryfunc.put("functionright", param.getString("functionright"));
			queryfunc.put("functionid",function.getString("functionid"));
			queryfunc.put("functiontype",0 );
			dbservice.UpdateByKey("td_s_function", queryfunc);
		}
		
		dbservice.UpdateByKey("sys_menu", param);
		return param;
	}
	
	/*
	 *  删除菜单
	 */
	public DataRow delMenu(DataRow param) throws Exception
	{
		DataRow menu = dbservice.querySimpleRowByKey("sys_menu", param.getString("menuid"));
		
		param.put("state", "0");
		param.put("updatetime",DateTimeUtil.getNowDateStr() );
		param.put("remark", "删除");
		dbservice.UpdateByKey("sys_menu", param);
		
		
		DataRow queryfunc = new DataRow();
		queryfunc.put("functionright", menu.getString("functionright"));
		queryfunc.put("state", "1");
		DataRow function = dbservice.querySimpleRowByParam("td_s_function", queryfunc,null);
		DataRow delfunc = new DataRow();
		delfunc.put("functionid", function.getString("functionid"));
		dbservice.DelByKey("td_s_function", delfunc);
		dbservice.DelByParam("td_s_functionrole", delfunc);
		return param;
	}
	
	/*
	 * 查询CODE_CODE
	 */
	public DataRow getCodeCodeByKey(DataRow param) throws Exception
	{
		return dbservice.querySimpleRowByParam("sys_code_code", param,null);
	}
	/*
	 * 查询TableHead
	 */
	public DataRow getTableHeadByKey(DataRow param) throws Exception
	{
		return dbservice.querySimpleRowByName("tableheadMpper.selectHeadByCodekey", param);
	}
	/*
	 * 通过tablename+columnname查询字段备注
	 */
	public DataRow getCloumnComment(DataRow param) throws Exception
	{
		String sql = "select * from information_schema.columns where table_name='"+param.getString("tablename")+"'  and column_name='"+param.getString("fieldid")+"'";
		return dbservice.querySimpleRowBySql(sql);
	}
	
	/*
	 * 配置表头
	 */
	
	public String congfigTableHead(DataRow param) throws Exception
	{
		List<TableHead>  items = JSON.parseArray(param.getString("items"),TableHead.class);
			DataRow delparam = new DataRow();
			delparam.put("codepath",param.getString("codepath"));
			delparam.put("codeid",param.getString("codeid"));
			dbservice.DelByParam("sys_tablehead", delparam);
			for(int i=0;i<items.size();i++)
			{
				param.put("id", GeneratorIDUtil.generatorId());
				param.put("fieldname",URLDecoder.decode(items.get(i).getFieldname(), "UTF-8"));
				param.put("fieldid",items.get(i).getFieldid());
				param.put("ordernum",items.get(i).getSortnum());
				param.put("displaytag","0");
				param.put("sortflag",1);
				param.put("state",1);
				dbservice.Insert("sys_tablehead", param);
			}
			dbservice.removeTableHeadByCodeKey(param.getString("codepath")+"."+param.getString("codeid"));
		return "0配置SQL表头："+param.getString("codepath")+"."+param.getString("codeid")+"成功！";
	}
	
	/*
	 * 新增权限项
	 */
	public DataRow addFunctionItem(DataRow param) throws Exception
	{
		param.put("functionid", GeneratorIDUtil.generatorId());
		param.put("state",1);
		param.put("updatetime",DateTimeUtil.getNowDateStr());
		dbservice.Insert("td_s_function", param);//录权限表
		
		DataRow queryrole = new DataRow();
		queryrole.put("staffid", param.getString("updatestaff"));
		queryrole.put("state", "1");
		DataRow userrole = dbservice.querySimpleRowByParam("tf_s_userrole", queryrole, null);
		param.put("funcroleid", GeneratorIDUtil.generatorId());
		param.put("roleid", userrole.getString("roleid"));
		dbservice.Insert("td_s_functionrole", param);//录角色权限表
		return param;
	}
	
	/*
	 * 更新权限项
	 */
	public DataRow updFunctionItem(DataRow param) throws Exception
	{
		param.put("state",1);
		param.put("updatetime",DateTimeUtil.getNowDateStr());
		dbservice.UpdateByKey("td_s_function", param);//更新权限表
		return param;
	}
	/*
	 * 删除权限项
	 */
	public DataRow delFunctionItem(DataRow param) throws Exception
	{
		param.put("state",0);
		param.put("updatetime",DateTimeUtil.getNowDateStr());
		dbservice.UpdateByKey("td_s_function", param);//更新权限表
		DataRow delfunc = new DataRow();
		delfunc.put("state",1);
		delfunc.put("functionid",param.getString("functionid"));
		dbservice.DelByParam("td_s_functionrole", delfunc);
		return param;
	}
	
	/*
	 * 新增角色项
	 */
	public DataRow addRoleItem(DataRow param) throws Exception
	{
		param.put("roleid", GeneratorIDUtil.generatorId());
		param.put("state",1);
		param.put("updatetime",DateTimeUtil.getNowDateStr());
		dbservice.Insert("td_s_role", param);//录角色表
		return param;
	}
	
	/*
	 * 更新角色项
	 */
	public DataRow updRoleItem(DataRow param) throws Exception
	{
		param.put("state",1);
		param.put("updatetime",DateTimeUtil.getNowDateStr());
		dbservice.UpdateByKey("td_s_role", param);//更新角色表
		return param;
	}
	/*
	 * 删除角色项
	 */
	public DataRow delRoleItem(DataRow param) throws Exception
	{
		param.put("state",0);
		param.put("updatetime",DateTimeUtil.getNowDateStr());
		dbservice.UpdateByKey("td_s_role", param);//更新角色表
		
		DataRow updparam = new DataRow();//表更新项
		updparam.put("state",0);
		updparam.put("updatetime",DateTimeUtil.getNowDateStr());
		updparam.put("updatestaff",param.getString("updatestaff"));
		DataRow delfunc = new DataRow();//表更新条件
		delfunc.put("state",1);
		delfunc.put("roleid",param.getString("roleid"));
		dbservice.UpdateByParam("td_s_functionrole", updparam, delfunc);
		dbservice.UpdateByParam("tf_s_userrole", updparam, delfunc);
		return param;
	}
	/*
	 * 权限分配明细
	 */
	public DataRow addFunctionRoleItem(DataRow param) throws Exception
	{
		param.put("funcroleid", GeneratorIDUtil.generatorId());
		param.put("state",1);
		param.put("updatetime",DateTimeUtil.getNowDateStr());
		dbservice.Insert("td_s_functionrole", param);//录角色表
		return param;
	}
	
	/*
	 *  权限分配删除明细权限项
	 */
	public DataRow delFunctionRoleItem(DataRow param) throws Exception
	{
		param.put("state",0);
		param.put("updatetime",DateTimeUtil.getNowDateStr());
		dbservice.UpdateByKey("td_s_functionrole", param);//更新角色权限表
		return param;
	}
	
	/*
	 * 角色分配明细
	 */
	public DataRow addRoleToUserItem(DataRow param) throws Exception
	{
		param.put("userroleid", GeneratorIDUtil.generatorId());
		param.put("state",1);
		param.put("updatetime",DateTimeUtil.getNowDateStr());
		dbservice.Insert("tf_s_userrole", param);//录用户角色表
		return param;
	}
	
	/*
	 *  角色分配删除明细权限项
	 */
	public DataRow delRoleToUserItem(DataRow param) throws Exception
	{
		param.put("state",0);
		param.put("updatetime",DateTimeUtil.getNowDateStr());
		dbservice.UpdateByKey("tf_s_userrole", param);//更新用户角色表
		return param;
	}
	
	
	
}

