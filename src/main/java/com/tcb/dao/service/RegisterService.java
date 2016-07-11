package com.tcb.dao.service;

import java.util.Random;

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

@Service(value="RegisterService")
@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
public class RegisterService {
	private static final Logger logger = LoggerFactory.getLogger(RegisterService.class);
	@Autowired
	private DBService dbservice;
	
	public void saveIdentifyingcode(DataRow param) throws Exception
	{
	        param.put("msgid",GeneratorIDUtil.generatorId());
	        param.put("templateid",1);
	        param.put("sendflag",0);
	        param.put("createtime",DateTimeUtil.getNowDateStr());
	        param.put("createstaff","admin");
	        Random rand = new Random();
	        int randint =0;
	        while(randint<100000)
	        {
	        	randint = (int) (rand.nextFloat()*1000000);
	        	param.put("msginfo",randint+",10");
	        	param.put("randint", randint);
	        	logger.debug("randint:"+randint);
	        }
	        dbservice.Insert("tf_sendmsg", param);
	}
	
	public void doRegister(DataRow param) throws Exception
	{
		String accountid = GeneratorIDUtil.generatorId();
		param.transTo("openid", "userid");
		param.put("accountid", accountid);
		param.put("createtime",DateTimeUtil.getNowDateStr());
	    param.put("createstaff","admin");
	    dbservice.Insert("tf_f_user", param);
	    
	    
	    
	}
}
