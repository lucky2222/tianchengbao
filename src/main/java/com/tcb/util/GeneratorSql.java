package com.tcb.util;
/*
 * 根据表结构整理SQL
 */
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;

public class GeneratorSql {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Autowired
	private DBService dbservice;
	
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate)
	{
		this.jdbcTemplate = jdbcTemplate;
	}
	
	public void test() throws Exception
	{
		DataRow staff = dbservice.querySimpleRowByKey("td_m_staff", "admin");
		System.out.println(staff.toString());
		
		DataRow param= new DataRow();
		param.put("state",1);
		//param.put("staffid","hangxing");
		List<DataRow> stafflist = dbservice.queryListByParam("td_m_staff", param,null,null);
		System.out.println(stafflist.size());
		for(Map staffitem :stafflist)
		{
			System.out.println(staffitem);
		}
		param.put("updatestaff","hangxing");
		
		DataRow condition= new DataRow();
		condition.put("staffid","dz");
		System.out.println("更新条数："+dbservice.UpdateByParam("td_m_staff", param, condition));
		
		param.put("staffid","aaa");
		//dbservice.Insert("td_m_staff", param);
		
		condition.put("staffid","aaa");
		System.out.println("更新条数："+dbservice.DelByParam("td_m_staff", condition));
		/*
		
		
		*/
	}
	
	public String testDo(DataRow tradeinfo)
	{
		return tradeinfo.getString("tradereturn");
	}
}
