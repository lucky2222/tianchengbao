package com.tcb.util;

import java.util.List;

import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;

public class AutoCompleteUtil {
	/**
	 * 通过页面结果组织自动完成控件的下拉列表
	 * @param rbp
	 * @return
	 */
	public static String generatorTable(ResultByPage rbp)
	{
		List<DataRow> headlist = rbp.getFieldlist();
		List<DataRow> bodylist = rbp.getResultlist();
		StringBuffer res =new StringBuffer();
		res.append("<table class=\"table table-striped table-bordered table-hover table-condensed\">").append("<head>");
		for(DataRow head : headlist)
		{
			String fieldname = head.getString("fieldname");
			res.append("<th>").append(fieldname).append("</th>");
		}
		res.append("</head><body>");
		for(DataRow body : bodylist)
		{
			
			res.append("<tr").append(" rowname='");
			if(body.containsKey(rbp.getCondition().getString("showname")))
			{
				res.append(body.getString(rbp.getCondition().getString("showname")));
			}
			res.append("' rowvalue='");
			if(body.containsKey(rbp.getCondition().getString("valuename")))
			{
				res.append(body.getString(rbp.getCondition().getString("valuename")));
			}
			res.append("'>");
			for(DataRow head : headlist)
			{
				String fieldid = head.getString("fieldid");
				res.append("<td>").append(body.getString(fieldid)).append("</td>");
			}
			res.append("</tr>");
		}
		//res.append("<tr><td colspan='").append(headlist.size()).append("'></td></tr>");
		res.append("</body></table>");
		return res.toString();
	}
	
	public static String generatorMultipleSelectTable(ResultByPage rbp)
	{
		String id=rbp.getCondition().getString("id");
		List<DataRow> headlist = rbp.getFieldlist();
		List<DataRow> bodylist = rbp.getResultlist();
		StringBuffer res =new StringBuffer();
		res.append("<table id=\"").append(id).append("_hidden_list\" class=\"table table-striped table-bordered table-hover datatable dropdown-menu\">").append("<thead>");
		res.append("<tr><th><input type=\"checkbox\"  id=\"").append(id).append("_checkall\" name=\"").append(id).append("_checkall\"></th>");
		for(DataRow head : headlist)
		{
			String fieldname = head.getString("fieldname");
			res.append("<th>").append(fieldname).append("</th>");
		}
		res.append("</tr></thead><body>");
		int rownum = 0;
		for(DataRow body : bodylist)
		{
			res.append("<tr").append(" rowname='");
			if(body.containsKey(rbp.getCondition().getString("showname")))
			{
				res.append(body.getString(rbp.getCondition().getString("showname")));
			}
			res.append("' rowvalue='");
			if(body.containsKey(rbp.getCondition().getString("valuename")))
			{
				res.append(body.getString(rbp.getCondition().getString("valuename")));
			}
			res.append("'>");
			res.append("<td><input type=\"checkbox\"  id=\"").append(id).append("_checksimple_").append(rownum).append("\" name=\"").append(id).append("_checksimple_").append(rownum).append("\"></td>");
			
			for(DataRow head : headlist)
			{
				String fieldid = head.getString("fieldid");
				res.append("<td>").append(body.getString(fieldid)).append("</td>");
			}
			res.append("</tr>");
		}
		//res.append("<tr><td colspan='").append(headlist.size()).append("'></td></tr>");
		res.append("</body></table>");
		return res.toString();
	}
}
