package com.tcb.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tcb.dao.base.DataRow;
import com.tcb.dao.service.MonitorService;
import com.tcb.util.ResultByPageService;

@Controller
@RequestMapping(value = "/monitor")
public class MonitorController {
	private static final Logger logger = LoggerFactory.getLogger(MonitorController.class);
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	private MonitorService monitor;
	
	@RequestMapping(value = "/getsummarydetail/{orderid}", method = RequestMethod.GET)
	@ResponseBody
	public Object getsummarydetail(@PathVariable String orderid,HttpServletRequest request) throws Exception {
		StringBuffer sb = new StringBuffer();
		List<DataRow> summarydetail = monitor.getsummarydetail(orderid);
		int complete=1;//默认其实为完成状态
		for(DataRow info : summarydetail)
		{
			String classname = "";
			if(info.getInt("isComplete")==0&&complete==1)
			{
				complete=0;//此节点为正在执行中 overcenter
				if(info.getInt("isTimeout")==1)//超时
				{
					classname ="overchaos";
				}else{
					classname ="overcenter";
				}
			}else{
				if(info.getInt("isComplete")==0)//未完成
				{
					if(info.getInt("isTimeout")==1)//超时
					{
						classname ="overchaos";
					}
				}else{//已完成 over
					classname ="over";
				}
			}
			if(classname.equals(""))
			{
				sb.append("<li><p class=\"jiedian\">");
			}else{
				sb.append("<li class=\"").append(classname).append("\"><p class=\"jiedian\">");
			}
			sb.append(info.getString("nodename")).append("</p><div class=\"plast\"><div class=\"biaozy\"><div class=\"xialazix\"><s></s>");
			sb.append("<ul>");
			sb.append("<li><span class=\"bt\">负责人：").append(info.getString("staffname")).append("</span></li>");
			sb.append("</ul>");
			sb.append("<p><span>开始时间：</span>").append(info.getDateTimeStr("sdate")).append("</p>");
			sb.append("<p><span>完成时间：</span>").append(info.getDateTimeStr("edate")).append("</p>");
			sb.append("<p><span>考核时间：</span>").append(info.getDateTimeStr("companyplandate")).append("</p>");
			sb.append("<p><span>超时时间：</span>").append(info.getDateTimeStr("carrierplandate")).append("</p>");
			sb.append("<p><span>是否超时：</span>").append(info.getInt("isTimeout")==0?"未超时":"超时").append("</p>");
			sb.append("<p><span>是否完成：</span>").append(info.getInt("isComplete")==0?"未完成":"完成").append("</p>");
			sb.append("</div></div></div></li>");
		}
		return sb.toString();
	}
}
