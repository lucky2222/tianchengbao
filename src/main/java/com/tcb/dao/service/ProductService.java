package com.tcb.dao.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;

@Service(value="ProductService")
@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
public class ProductService {
	private static final Logger logger = LoggerFactory.getLogger(ProductService.class);
	@Autowired
	private DBService dbservice;
	/**
	 * 保存产品配置
	 * @param param
	 * @throws Exception
	 */
	public void saveProduct(DataRow param) throws Exception
	{
	        param.put("id",GeneratorIDUtil.generatorId());
	        param.put("productid",param.getString("id"));
	        param.put("updatetime",DateTimeUtil.getNowDateStr());
	        param.put("state",1);
	        dbservice.Insert("td_s_product", param);
	        dbservice.Insert("td_s_productdesc", param);
	}
	
	public DataRow getProductDetail(String productid) throws Exception
	{
		DataRow param = new DataRow();
		param.put("productid",productid);
		return dbservice.queryForMapByCodeKey("td_s_productdesc.selectProductDescByProductID", param);
	}
	
	public List<DataRow> getProductList() throws Exception
	{
		ResultByPage rbp = new ResultByPage();
		rbp.setPerpage(5);
		dbservice.selectListByPageOfBlob("td_s_productdesc.selectProductDescByProductID", rbp);
		for(DataRow param:rbp.getResultlist())
		{
			param.put("finishpercent", param.getDouble("salenums")*100/param.getDouble("salelimit"));//目前完成
			param.put("allsale",param.getInt("salelimit")*param.getInt("price") );//总量
		}
		return rbp.getResultlist();
	}
	
}
