package com.tcb.jobtask;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.sd4324530.fastweixin.api.CustomAPI;
import com.github.sd4324530.fastweixin.api.TemplateMsgAPI;
import com.github.sd4324530.fastweixin.api.config.ApiConfig;
import com.github.sd4324530.fastweixin.api.enums.ResultType;
import com.github.sd4324530.fastweixin.message.TextMsg;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.util.DateTimeUtil;

public class WeiXinMessageTask {
	private static final Logger logger = LoggerFactory
			.getLogger(WeiXinMessageTask.class);
	//数据库操作类
	private DBService dbservice;
	
	public void setDbservice(DBService dbservice)
	{
		this.dbservice = dbservice;
	}
	/**
	 * 获取待发微信列表
	 */
	public List<DataRow> getMessageList()
	{
		String sql = "SELECT m.* from tf_wx_sendmsg m,tf_wx_user u "
							+"where sendflag=0  "
							+"and m.touser = u.openid "
							+"and ((msgtype='kfmsg' and now()<DATE_ADD(u.updatetime,INTERVAL 2 DAY)) or (msgtype='template'))";
		List<DataRow> messagelist = dbservice.queryForList(sql);
		return messagelist;
	}
	/**
	 * 检查是否符合发送条件
	 * @return
	 */
	public boolean checkSendCondition(DataRow message)
	{
		if(message.getString("touser")==null){
			return false;
		}
		return true;
	}
	
	/**
	 * 消息发送
	 * @param config
	 * @throws Exception 
	 */
	public boolean sendMessage(ApiConfig config) throws Exception
	{
//		CustomAPI custAPI = new CustomAPI(config);
//		TemplateMsgAPI tempAPI = new TemplateMsgAPI(config);
//		
//		List<DataRow> messagelist = getMessageList();
//		for(DataRow message : messagelist)
//		{
//			if(checkSendCondition(message))
//			{
//				ResultType res = null;
//				if(message.getString("msgtype").equals("template"))
//				{
//					res = tempAPI.sendTemplateMessage(message.getString("content"));
//				}else if(message.getString("msgtype").equals("kfmsg"))
//				{
//					res = custAPI.sendCustomMessage(message.getString("content"));
//				}
//				//更新发送状态
//				DataRow result = new DataRow();
//				result.put("errinfo", res.getDescription());
//				result.put("msgid", message.getString("msgid"));
//				result.put("sendtime",DateTimeUtil.getNowDateStr());
//				if(res.getCode()==0)
//				{//发送成功
//					result.put("sendflag", 1);
//				}else{
//					//发送失败
//					result.put("sendflag", res.getCode());
//				}
//				dbservice.UpdateByKey("tf_wx_sendmsg", result);
//			}
//		}
//		return messagelist.size()>0?false:true;
		return true;
	}
	
	//执行入口
	public void doExecute() throws InterruptedException {
		logger.debug("微信后台发送类执行...");
		//Thread.sleep(1000*2);//停2秒
		String appid = "wx7139ab62847dfb68";
        String secret = "0cec2c88111430d81be6cff20abcc00e";
        int errtimes =0;
        ApiConfig config = new ApiConfig(appid, secret);
        while(true)
        {
	        try {
				sendMessage(config);
				Thread.sleep(1000*2);
				errtimes=0;
			} catch (Exception e) {
				errtimes++;
				if(errtimes>10)
				{
					break;
				}
				e.printStackTrace();
			}
	        
        }
	}
}
