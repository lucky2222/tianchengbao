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

import com.github.sd4324530.fastweixin.message.Article;
import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.ImageMsg;
import com.github.sd4324530.fastweixin.message.MusicMsg;
import com.github.sd4324530.fastweixin.message.NewsMsg;
import com.github.sd4324530.fastweixin.message.TemplateMsg;
import com.github.sd4324530.fastweixin.message.TextMsg;
import com.github.sd4324530.fastweixin.message.VideoMsg;
import com.github.sd4324530.fastweixin.message.VoiceMsg;
import com.github.sd4324530.fastweixin.util.JSONUtil;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;

@Service(value="WeixinService")
@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
public class WeixinService {
	private static final Logger logger = LoggerFactory.getLogger(WeixinService.class);
	@Autowired
	private DBService dbservice;
	/**
	 * 获取微信用户列表
	 * @return
	 * @throws Exception
	 */
	public DataRow getWxUser() throws Exception
	{
		DataRow param = new DataRow();
		param.put("flag",1);
		List<DataRow> users = dbservice.queryListByParam("te_wx_user", param,null,null);
		DataRow usermap = new DataRow();
		for(DataRow user:users)
		{
			usermap.put(user.getString("openid"),user.getString("updatetime"));
		}
		return usermap;
	}
	/**
	 * 新增微信用户
	 * @param wxuser
	 * @param openid
	 * @throws Exception 
	 */
	public void addNewUser(DataRow wxuser ,String openid) throws Exception
	{
		DataRow param = new DataRow();
		param.put("openid", openid);
		param.put("flag",1);
		param.put("state",0);
		param.put("createtime",DateTimeUtil.getNowDateStr());
		param.put("updatetime",DateTimeUtil.getNowDateStr());
		wxuser.put(openid, param.getString("updatetime"));
		dbservice.Insert("te_wx_user", param);
	}
	/**
	 * 记录接收消息
	 * @param reqmap
	 * @throws Exception 
	 */
	public void addReceiveMsg(Map reqmap) throws Exception
	{
		DataRow param = new DataRow();
		param.putAll(reqmap);
		param.put("receivetime",DateTimeUtil.getNowDateStr());
		dbservice.Insert("te_wx_receivemsg", param);
	}
	/**
	 * 记录微信接收事件
	 * @param reqmap
	 * @throws Exception 
	 */
	public void addReceiveEvent(Map reqmap) throws Exception
	{
		DataRow param = new DataRow();
		param.putAll(reqmap);
		param.put("eventid",GeneratorIDUtil.generatorId());
		param.put("receivetime",DateTimeUtil.getNowDateStr());
		if(reqmap.containsKey("precision"))
		{
			param.put("jingdu",(String)reqmap.get("precision"));
		}
		dbservice.Insert("te_wx_event", param);
	}
	/**
	 * 录用户和委托对应关系
	 * @param openid
	 * @param orderid
	 * @throws Exception 
	 */
	public void addUserOrder(String openid,String qrcode) throws Exception
	{
		DataRow codition = new DataRow();
		codition.put("qrcode",qrcode);
		DataRow userorder = dbservice.querySimpleRowByParam("te_wx_userorder", codition, null);
		if(userorder!=null&&!userorder.isEmpty())
		{
			if(userorder.getString("openid")==null||userorder.getString("openid").isEmpty()||userorder.getString("openid").equals(openid))
			{
				//已有对应关系的用户，直接修改状态为关注
				DataRow param = new DataRow();
				param.put("openid",openid);
				param.put("updatetime",DateTimeUtil.getNowDateStr());
				param.put("updatestaff","weixin");
				param.put("flag",1);
				codition.clear();
				codition.put("userorderid", userorder.getString("userorderid"));
				dbservice.UpdateByParam("te_wx_userorder", param, codition);
				logger.debug("update te_wx_userorder-->OK");
			}else{
				//其他人关注此委托 新增
				DataRow param = new DataRow();
				param.put("userorderid",GeneratorIDUtil.generatorId());
				param.put("openid",openid);
				param.put("qrcode",qrcode);
				param.put("orderid",userorder.getString("orderid"));
				param.put("createtime",DateTimeUtil.getNowDateStr());
				param.put("createstaff","weixin");
				param.put("flag",1);
				dbservice.Insert("te_wx_userorder", param);
			}
		}else{
			//无此委托的报错
			logger.debug("no qrcode");
			throw new Exception("无此委托编号");
		}
	}
	/**
	 * 创建客服消息
	 * @param message
	 * @param createstaff
	 * @param tradetype
	 * @param orderid
	 * @throws Exception 
	 */
	public void addCustomMsg(BaseMsg message,String createstaff,String tradetype,String orderid) throws Exception
	{
		DataRow custommsg = new DataRow();
		 final Map<String, Object> params = new HashMap<String, Object>();
	        params.put("touser", message.getToUserName());
	        if (message instanceof TextMsg) {
	            TextMsg msg = (TextMsg) message;
	            params.put("msgtype", "text");
	            Map<String, String> text = new HashMap<String, String>();
	            text.put("content", msg.getContent());
	            params.put("text", text);
	        } else if (message instanceof ImageMsg) {
	            ImageMsg msg = (ImageMsg) message;
	            params.put("msgtype", "image");
	            Map<String, String> image = new HashMap<String, String>();
	            image.put("media_id", msg.getMediaId());
	            params.put("image", image);
	        } else if (message instanceof VoiceMsg) {
	            VoiceMsg msg = (VoiceMsg) message;
	            params.put("msgtype", "voice");
	            Map<String, String> voice = new HashMap<String, String>();
	            voice.put("media_id", msg.getMediaId());
	            params.put("voice", voice);
	        } else if (message instanceof VideoMsg) {
	            VideoMsg msg = (VideoMsg) message;
	            params.put("msgtype", "video");
	            Map<String, String> video = new HashMap<String, String>();
	            video.put("media_id", msg.getMediaId());
	            video.put("thumb_media_id", msg.getMediaId());
	            video.put("title", msg.getTitle());
	            video.put("description", msg.getDescription());
	            params.put("video", video);
	        } else if (message instanceof MusicMsg) {
	            MusicMsg msg = (MusicMsg) message;
	            params.put("msgtype", "music");
	            Map<String, String> music = new HashMap<String, String>();
	            music.put("thumb_media_id", msg.getThumbMediaId());
	            music.put("title", msg.getTitle());
	            music.put("description", msg.getDescription());
	            music.put("musicurl", msg.getMusicUrl());
	            music.put("hqmusicurl", msg.getHqMusicUrl());
	            params.put("music", music);
	        } else if (message instanceof NewsMsg) {
	            NewsMsg msg = (NewsMsg) message;
	            params.put("msgtype", "news");
	            Map<String, Object> news = new HashMap<String, Object>();
	            List<Object> articles = new ArrayList<Object>();
	            List<Article> list = msg.getArticles();
	            for (Article article : list) {
	                Map<String, String> map = new HashMap<String, String>();
	                map.put("title", article.getTitle());
	                map.put("description", article.getDescription());
	                map.put("url", article.getUrl());
	                map.put("picurl", article.getPicUrl());
	                articles.add(map);
	            }
	            news.put("articles", articles);
	            params.put("news", news);
	        }
	        String content = JSONUtil.toJson(params);
	        custommsg.put("msgid",GeneratorIDUtil.generatorId());
	        custommsg.put("sendflag",0);
	        custommsg.put("createtime",DateTimeUtil.getNowDateStr());
	        custommsg.put("msgtype","kfmsg");
	        custommsg.put("content",content);
	        custommsg.put("touser",message.getToUserName());
	        custommsg.put("fromuser",message.getFromUserName());
	        custommsg.put("createstaff",createstaff);
	        custommsg.put("tradetype",tradetype);
	        custommsg.put("orderid",orderid);
			dbservice.Insert("te_wx_sendmsg", custommsg);
	}
	
	/**
	 * 创建模板消息
	 * @param msg
	 * @param createstaff
	 * @param tradetype
	 * @param orderid
	 * @throws Exception 
	 */
	public void addTemplateMsg(TemplateMsg msg,String createstaff,String tradetype,String orderid) throws Exception
	{
		DataRow custommsg = new DataRow();
		String content = JSONUtil.toJson(msg.getParams());
        custommsg.put("msgid",GeneratorIDUtil.generatorId());
        custommsg.put("sendflag",0);
        custommsg.put("createtime",DateTimeUtil.getNowDateStr());
        custommsg.put("msgtype","template");
        custommsg.put("content",content);
        custommsg.put("touser",msg.getToUserName());
        custommsg.put("fromuser",msg.getFromUserName());
        custommsg.put("createstaff",createstaff);
        custommsg.put("tradetype",tradetype);
        custommsg.put("orderid",orderid);
		dbservice.Insert("te_wx_sendmsg", custommsg);
	}
}
