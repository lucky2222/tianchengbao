package com.tcb.dao.service;

import java.lang.reflect.Method;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;

@Service(value="ModalPageService")
@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
public class ModalPageService {
	private static final Logger logger = LoggerFactory.getLogger(ModalPageService.class);
	@Autowired
	private DBService dbservice;
	@Autowired
	private MessageService msgservice;
	
	/**
	 * 模态框初始化调用
	 * @param servicename
	 * @param param
	 * @return
	 */
	public DataRow callInitService(String pagename,DataRow param)
	{
		Class clazz = this.getClass(); 
		try {
			Method servicemd = clazz.getDeclaredMethod(pagename,DataRow.class);
			DataRow result = (DataRow)servicemd.invoke(this,param);
			return result;
		}  catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 提交服务
	 * @param servicename
	 * @param param
	 * @return
	 */
	public DataRow callService(String servicename,DataRow param)
	{
		Class clazz = this.getClass(); 
		try {
			Method servicemd = clazz.getDeclaredMethod(servicename,DataRow.class);
			DataRow result = (DataRow)servicemd.invoke(this,param);
			return result;
		}  catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	/*
	 * 初始化测试
	 */
	public DataRow test(DataRow param) throws Exception
	{
		param.putAll(dbservice.querySimpleRowByKey("td_userinfo","admin"));
		param.put("test","ok");
		return param;
	}
	/*
	 * 提交测试
	 */
	public DataRow testService(DataRow param) throws Exception
	{
		param.putAll(dbservice.querySimpleRowByKey("td_userinfo","admin"));
		param.put("test","ok");
		return param;
	}
	
	/**
	 * 创建任务初始化
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public DataRow createtask(DataRow param) throws Exception
	{
		return param;
	}
	
	/**
	 * 创建任务
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public DataRow createtaskService(DataRow param) throws Exception
	{
		param.putAll(dbservice.querySimpleRowByKey("td_userinfo","admin"));
		param.put("test","ok");
		logger.debug(param.toString());
		msgservice.CreateMsg(param);
		return param;
	}
	
}
