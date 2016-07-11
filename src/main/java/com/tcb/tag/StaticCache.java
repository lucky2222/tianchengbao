package com.tcb.tag;

import java.util.ArrayList;
import java.util.List;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tcb.dao.base.DataRow;

public class StaticCache {
	private static final Logger logger = LoggerFactory
			.getLogger(StaticCache.class);
	// 定义缓存
	private static CacheManager cacheManager = CacheManager.create();
	//根据groupname获取静态参数列表
	public static ArrayList<DataRow> getListByGroupName(String groupname)
	{
		Cache tdstatic = cacheManager.getCache("td_s_static");
		if(tdstatic.getKeys().contains(groupname))
		{
			ArrayList<DataRow> list = (ArrayList<DataRow>) tdstatic.get(groupname).getValue();
			return list;
		}else{
			return null;
		}
	}
	//根据groupname设置静态参数列表
	public static void setCacheByGroupName(String groupname,ArrayList<DataRow> list)
	{
		Cache tdstatic = cacheManager.getCache("td_s_static");
		Element element = new Element(groupname, list);
		tdstatic.put(element);
	}
	//获取缓存列表
	public static DataRow<String,DataRow> getCacheList()
	{
		DataRow cache = new DataRow();
		String[] cachenames=cacheManager.getCacheNames();
		for(String cachename : cachenames)
		{
			Cache item =cacheManager.getCache(cachename);
			DataRow dataitem = new DataRow();
			List<String> keys  = item.getKeys();
			for(String key : keys)
			{
				dataitem.put(key, item.get(key).toString());
			}
			cache.put(cachename, dataitem);
		}
		return cache;
	}
	
}
