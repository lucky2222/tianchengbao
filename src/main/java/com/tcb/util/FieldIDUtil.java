package com.tcb.util;

import java.util.ArrayList;
import java.util.List;

import com.tcb.dao.base.DataRow;

public class FieldIDUtil {
	public static List<DataRow> GeneratorToList(String fieldstr)
	{
		ArrayList<DataRow> fieldlist = new ArrayList();
		String[] fields = fieldstr.split(",");
		for(String fielditem : fields)
		{
			String[] field = fielditem.split(":");
			if(field.length==2)
			{
				DataRow<String, String> item = new DataRow();
				item.put("fieldid", field[0]);
				item.put("fieldname", field[1]);
				fieldlist.add(item);
			}
		}
		return fieldlist;
	}
}
