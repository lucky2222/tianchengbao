package com.tcb.util;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Joiner;
import com.tcb.dao.base.DataRow;

public class UserRoleUtil {
private static final Logger logger = LoggerFactory.getLogger(UserRoleUtil.class);
	
	/**
	 * 判断用户是否有此岗位ID
	 * @param request
	 * @param roleid
	 * @return 返回是否
	 */
	public static boolean hasRole(HttpServletRequest request,String roleid)
	{
		logger.debug("hasRole  ------------------------->"+roleid);
		if(request.getSession().getAttribute("OnlineStaff")!=null)
		{
			DataRow OnlineStaff = (DataRow)request.getSession().getAttribute("OnlineStaff");
			if(OnlineStaff.containsKey("role"))
			{
				DataRow userole =(DataRow)OnlineStaff.get("role");
				if(userole.containsKey(roleid))
				{
					return true;
				}
			}
		}else{
			return false;
		}
		return false;
	}
	
	/**
	 * 判断用户是否有此岗位名称
	 * @param request
	 * @param roleid
	 * @return 返回是否
	 */
	public static boolean hasRoleName(HttpServletRequest request,String rolename)
	{
		logger.debug("hasRoleName  ------------------------->"+rolename);
		if(request.getSession().getAttribute("OnlineStaff")!=null)
		{
			DataRow OnlineStaff = (DataRow)request.getSession().getAttribute("OnlineStaff");
			if(OnlineStaff.containsKey("role"))
			{
				DataRow userole =(DataRow)OnlineStaff.get("role");
				if(userole.containsValue(rolename))
				{
					return true;
				}
			}
		}else{
			return false;
		}
		return false;
	}
	/**
	 * 获取用户所有的岗位ID
	 * @param request
	 * @return 所有岗位的DataRow
	 */
	public static String getRoleIDStr(HttpServletRequest request)
	{
		if(request.getSession().getAttribute("OnlineStaff")!=null)
		{
			DataRow OnlineStaff = (DataRow)request.getSession().getAttribute("OnlineStaff");
			if(OnlineStaff.containsKey("role"))
			{
				DataRow rolemap =(DataRow)OnlineStaff.get("role");
				Joiner joiner = Joiner.on(",").skipNulls();
				return joiner.join(rolemap.keySet().iterator());
			}
		}
		return null;
	}
	/**
	 * 获取用户所有的岗位
	 * @param request
	 * @return 所有岗位的DataRow
	 */
	public static DataRow getRole(HttpServletRequest request)
	{
		if(request.getSession().getAttribute("OnlineStaff")!=null)
		{
			DataRow OnlineStaff = (DataRow)request.getSession().getAttribute("OnlineStaff");
			if(OnlineStaff.containsKey("role"))
			{
				DataRow rolemap =(DataRow)OnlineStaff.get("role");
				return rolemap;
			}
		}
		return null;
	}
}
