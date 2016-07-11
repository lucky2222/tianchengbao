package com.tcb.util;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tcb.dao.base.DataRow;

public class FunctionUtil {
	private static final Logger logger = LoggerFactory.getLogger(FunctionUtil.class);
	
	
	public static boolean hasFunctionRight(HttpServletRequest request,String functionright)
	{
		logger.debug("hasFunctionRight  ------------------------->"+functionright);
		if(request.getSession().getAttribute("OnlineStaff")!=null)
		{
			DataRow OnlineStaff = (DataRow)request.getSession().getAttribute("OnlineStaff");
			if(OnlineStaff.containsKey("functionright"))
			{
				DataRow functions =(DataRow)OnlineStaff.get("functionright");
				if(functions.containsKey(functionright))
				{
					return true;
				}
			}
		}else{
			return false;
		}
		return false;
	}
	
	public static DataRow getFunctionRight(HttpServletRequest request)
	{
		if(request.getSession().getAttribute("OnlineStaff")!=null)
		{
			DataRow OnlineStaff = (DataRow)request.getSession().getAttribute("OnlineStaff");
			if(OnlineStaff.containsKey("functionright"))
			{
				DataRow functions =(DataRow)OnlineStaff.get("functionright");
				return functions;
			}
		}
		return null;
	}
}
