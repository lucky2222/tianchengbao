package com.tcb.dao.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;


@Service(value="ArticleService")
@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
public class ArticleService {
	private static final Logger logger = LoggerFactory.getLogger(ArticleService.class);
	@Autowired
	private DBService dbservice;
	/**
	 * 记录文章的访问关系
	 * @param sendid
	 * @param visitid
	 * @param articleid
	 * @return
	 * @throws Exception
	 */
	public void shareVisit(String sendid,String visitid,String articleid) throws Exception
	{
		DataRow param = new DataRow();
		param.put("articleid", articleid);
		param.put("shareid", sendid);
		param.put("openid", visitid);
		List list = dbservice.queryListByParam("tl_share_path", param, null, null);
		if(list.size()<=0)
		{
			param.put("id", GeneratorIDUtil.generatorId());
			param.put("updatetime",DateTimeUtil.getNowDateStr());
			dbservice.Insert("tl_share_path", param);
		}
	}
	/**
	 * 共享记录
	 * @param shareid
	 * @param sharetype
	 * @param articleid
	 * @return
	 * @throws Exception
	 */
	public void shareReport(String shareid,int sharetype,String articleid) throws Exception
	{
		DataRow param = new DataRow();
		param.put("articleid", articleid);
		param.put("sharetype", sharetype);
		param.put("shareid", shareid);
		List list = dbservice.queryListByParam("tl_share_report", param, null, "limit 1");
		if(list.size()<=0)
		{
			param.put("id", GeneratorIDUtil.generatorId());
			param.put("updatetime",DateTimeUtil.getNowDateStr());
			dbservice.Insert("tl_share_report", param);
			if(sharetype==1)
			{
				dbservice.execute("tl_share_article.addshareapp", param);
			}else if(sharetype==2)
			{
				dbservice.execute("tl_share_article.addsharetimeline", param);
			}
		}
	}
	
	public void visitReport(String articleid) throws Exception
	{
		DataRow param = new DataRow();
		param.put("articleid", articleid);
		dbservice.execute("tl_share_article.addvisittime", param);
	}
	
}
