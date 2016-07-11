package com.tcb.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.github.sd4324530.fastweixin.api.entity.TemplateMsgDetail;
import com.github.sd4324530.fastweixin.handle.EventHandle;
import com.github.sd4324530.fastweixin.handle.MessageHandle;
import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.NewsMsg;
import com.github.sd4324530.fastweixin.message.TemplateMsg;
import com.github.sd4324530.fastweixin.message.TextMsg;
import com.github.sd4324530.fastweixin.message.req.EventType;
import com.github.sd4324530.fastweixin.message.req.MenuEvent;
import com.github.sd4324530.fastweixin.message.req.TextReqMsg;
import com.github.sd4324530.fastweixin.servlet.WeixinControllerSupport;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.service.WeixinEventHandleService;
import com.tcb.dao.service.WeixinMsgHandleService;
import com.tcb.dao.service.WeixinService;

@RestController
@RequestMapping("/weixin")
public class WeixinController extends WeixinControllerSupport {
	private static final Logger log = LoggerFactory.getLogger(WeixinController.class);
	private static final String TOKEN = "payfeeyyt";
	private static DataRow wxuser = new DataRow();
	
	@Autowired
	private WeixinService wxservice;

	// 设置TOKEN，用于绑定微信服务器
	@Override
	protected String getToken() {
		return TOKEN;
	}

	// 使用安全模式时设置：APPID
	@Override
	protected String getAppId() {
		return "wx7139ab62847dfb68";
	}

	// 使用安全模式时设置：密钥
	@Override
	protected String getAESKey() {
		return null;
	}
	/**
	 * 消息处理
	 */
	@Override
	protected BaseMsg handleMsg(Map reqMap) {
		//微信用户缓存
		if(wxuser.isEmpty())
		{
			try {
				wxuser = wxservice.getWxUser();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		String fromUserName = (String) reqMap.get("FromUserName");
		//新用户处理方式
		if(!wxuser.containsKey(fromUserName))
		{
			//插入用户表
			try {
				wxservice.addNewUser(wxuser, fromUserName);
			} catch (Exception e) {
				log.debug("插入用户表失败.."+fromUserName);
			}
		}
		//插入接收消息表
		try {
			wxservice.addReceiveMsg(reqMap);
		} catch (Exception e) {
			log.debug("插入接收消息表失败.."+fromUserName);
		}
		return new TextMsg("信息已接收，稍后给您回复。");
	}
	/**
	 * 事件处理
	 */
	@Override
	protected BaseMsg handleEvent(Map reqMap) {
		log.debug("event info ->"+reqMap);
		//微信用户缓存
		if(wxuser.isEmpty())
		{
			try {
				wxuser = wxservice.getWxUser();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		String fromUserName = (String) reqMap.get("FromUserName");
		//新用户处理方式
		if(!wxuser.containsKey(fromUserName))
		{
			//插入用户表
			try {
				wxservice.addNewUser(wxuser, fromUserName);
			} catch (Exception e) {
				log.debug("插入用户表失败.."+fromUserName);
			}
		}
		//插入接收事件表
		try {
			wxservice.addReceiveEvent(reqMap);
		} catch (Exception e1) {
			log.debug("记录微信接收事件失败.."+fromUserName);
		}
		String eventType = (String) reqMap.get("Event");
		//关联委托编号
		if((EventType.SCAN.equals(eventType)||EventType.SUBSCRIBE.equals(eventType))&&reqMap.containsKey("EventKey"))
		{
			//插入关联委托编号表
			String eventkey = (String) reqMap.get("EventKey");
			if(eventkey.length()>1)
			{
				try {
					wxservice.addUserOrder(fromUserName, eventkey);
					log.debug("addUserOrder-->OK");
					return new TextMsg("委托编号关注成功，委托状态变更将随时通知您。");
				} catch (Exception e) {
					log.debug("关联委托编号表失败.."+fromUserName);
				}
			}
		}
		return null;
	}
	// 重写父类方法，处理对应的微信消息
	@Override
	protected BaseMsg handleTextMsg(TextReqMsg msg) {
		String content = msg.getContent();
		log.debug("用户发送到服务器的内容:{}", content);
		if(content.equals("图文"))
		{
			NewsMsg news = new NewsMsg();
			news.setFromUserName(msg.getToUserName());
			news.setToUserName(msg.getFromUserName());
			news.add("委托明细", "委托详细信息展示", "http://payfee.duapp.com/resources/images/weixin1.jpg", "http://192.168.2.45/");
			try {
				wxservice.addCustomMsg(news, null, null, null);
			} catch (Exception e) {
				log.debug("插入客服消息表失败.."+news.getFromUserName());
			}
		}else if(content.equals("状态")){
			//模板消息
			TemplateMsg tmsg = new TemplateMsg();
			tmsg.setToUserName(msg.getFromUserName());
			tmsg.setFromUserName(msg.getToUserName());
	        tmsg.setTemplate_id("MWAmW150hNottS-5w6zjLtkc3Ki82blmOgT8-vus5FI");
	        tmsg.setUrl("http://www.shippingnet.mobi/");
	        tmsg.addData("user", new TemplateMsgDetail("X先生","#FF0000"));
	        tmsg.addData("orderid", new TemplateMsgDetail("D1505121543440168","#FF0000"));
	        tmsg.addData("ladingbillid",new TemplateMsgDetail( "1504231738150002","#FF0000"));
	        tmsg.addData("etd", new TemplateMsgDetail("06月24日 19时24分","#FF0000"));
	        tmsg.addData("pol", new TemplateMsgDetail("XINGANG/新港","#FF0000"));
	        tmsg.addData("pod", new TemplateMsgDetail("LOS ANGELES,CA/洛杉矶","#FF0000"));
	        tmsg.addData("orderstatus", new TemplateMsgDetail("堆场装箱中...","#FF0000"));
			try {
				wxservice.addTemplateMsg(tmsg, null, null, null);
			} catch (Exception e) {
				log.debug("插入模板消息表失败.."+tmsg.getFromUserName());
			}
		}else{
			//客服消息，发送给相关客服   文本
			TextMsg tmsg = new TextMsg();
			tmsg.setContent(msg.getContent());
			tmsg.setFromUserName(msg.getToUserName());
			tmsg.setToUserName(msg.getFromUserName());
			try {
				wxservice.addCustomMsg(tmsg, null, null, null);
			} catch (Exception e) {
				log.debug("插入客服消息表失败.."+tmsg.getFromUserName());
			}
		}
		return null;
	}
	
	// 重写父类方法，处理对应的微信菜单点击
	@Override
	protected BaseMsg handleMenuClickEvent(MenuEvent event) {
		String content = event.getEvent();
		log.debug("用户点击菜单的内容:{}", event.getEventKey());
		return new TextMsg("回复用户消息!");
	}
	
	/**
	 * 测试微信入口
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/weixinInterface", method = RequestMethod.POST)
	@ResponseBody
	public String weixinInterface(HttpServletRequest request) throws Exception
	{
		String msg= "success";
		try{
			log.debug("request:"+ request.getParameterMap());
			msg = this.process(request);
			if(msg==null||msg.isEmpty())
			{
				msg="success";
			}
		}catch(Exception e){
			log.debug("process err -------->"+e.getMessage());
			msg="系统处理中...";
		}
		return msg;
	}
	
	/**
	 * 微信绑定
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/weixinInterface", method = RequestMethod.GET)
	@ResponseBody
	public String weixinInterfaceBind(HttpServletRequest request) throws Exception
	{
		log.debug("bind request:"+ request.getParameterMap());
		return this.bind(request);
	}
}
