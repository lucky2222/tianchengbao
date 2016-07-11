package com.tcb.dao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;

@Service(value="MonitorService")
@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
public class MonitorService {
	@Autowired
	private DBService dbservice;
	
	public List<DataRow> getsummarydetail(String orderid) throws Exception
	{
		DataRow param = new DataRow();
		param.put("orderid",orderid);
		 List<DataRow> list = dbservice.queryForListByCodeKey("te_monitor_summarydetail.selectDetailByOrderid", param);
		return list;
	}
}
