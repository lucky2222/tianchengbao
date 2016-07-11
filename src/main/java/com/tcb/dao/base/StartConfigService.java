package com.tcb.dao.base;

import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/*
 * Web容器启动运行
 */
@Service(value = "StartConfigService")
public class StartConfigService {
	private static final Logger logger = LoggerFactory.getLogger(StartConfigService.class);
	
	private DBService dbservice;
	
	public void setDbservice(DBService dbservice)
	{
		this.dbservice = dbservice;
	}
	//初始化缓存
	public void init() throws Exception
	{
		logger.debug("容器启动....");
		DataRow<String,ArrayList<DataRow>> cachemap = new DataRow();
		
		DataRow param = new DataRow();
		param.put("flag", 1);
		List<DataRow> datalist = dbservice.queryListByParam("td_s_static", param, "order by groupname,sortnum ", null);
		for(DataRow item : datalist)
		{
			if(cachemap.containsKey(item.getString("groupname")))
			{
				ArrayList<DataRow> list = (ArrayList<DataRow>) cachemap.get(item.getString("groupname"));
				list.add(item);
			}else{
				ArrayList<DataRow> list = new ArrayList();
				list.add(item);
				cachemap.put(item.getString("groupname"), list);
			}
		}
		logger.debug(cachemap.toString());
		for(Entry<String, ArrayList<DataRow>> item : cachemap.entrySet())
		{
			StaticCache.setCacheByGroupName(item.getKey(), item.getValue());
		}
		logger.debug("td_s_static缓存加载完毕....");
		
		
		List<DataRow> configlist = dbservice.queryListByParam("td_s_config", param, null, null);
		for(DataRow item : configlist)
		{
			StaticCache.initConfig(item.getString("id"), item.getString("confvalue"));
		}
		logger.debug("td_s_config缓存加载完毕....");
	}
	

}