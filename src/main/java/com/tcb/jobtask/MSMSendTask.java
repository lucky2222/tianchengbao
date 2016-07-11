package com.tcb.jobtask;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cloopen.rest.sdk.CCPRestSDK;
import com.github.sd4324530.fastweixin.api.CustomAPI;
import com.github.sd4324530.fastweixin.api.TemplateMsgAPI;
import com.github.sd4324530.fastweixin.api.config.ApiConfig;
import com.github.sd4324530.fastweixin.api.enums.ResultType;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.util.DateTimeUtil;
/**
 * 短信自动发送程序
 * @author jyl
 *
 */
public class MSMSendTask {
	private static final Logger logger = LoggerFactory.getLogger(MSMSendTask.class);
	//数据库操作类
	private DBService dbservice;
	
	public void setDbservice(DBService dbservice)
	{
		this.dbservice = dbservice;
	}
	/**
	 * 待发短信列表
	 * @return
	 */
	public List<DataRow> getMessageList()
	{
		String sql = "select * from tf_sendmsg where sendflag=0 and (now()-createtime)<400";
		List<DataRow> messagelist = dbservice.queryForList(sql);
		return messagelist;
	}
	
	/**
	 * 发送短信
	 * @param restAPI
	 * @return
	 * @throws Exception
	 */
	public boolean sendMessage(CCPRestSDK restAPI) throws Exception
	{
		List<DataRow> list =  getMessageList();
		for(DataRow item : list)
		{
			HashMap<String, Object> result = restAPI.sendTemplateSMS(item.getString("telno"),item.getString("templateid") ,item.getString("msginfo").split(","));
			System.out.println("SDKTestSendTemplateSMS result=" + result);
			if("000000".equals(result.get("statusCode"))){
				//正常返回输出data包体信息（map）
				HashMap<String,Object> data = (HashMap<String, Object>) result.get("data");
				Set<String> keySet = data.keySet();
				for(String key:keySet){
					Object object = data.get(key);
					System.out.println(key +" = "+object);
				}
				DataRow msgret = new DataRow();
				msgret.put("sendtime", DateTimeUtil.getNowDateStr());
				msgret.put("sendflag", 1);
				msgret.put("msgid", item.getString("msgid"));
				dbservice.UpdateByKey("tf_sendmsg",msgret);
			}else{
				//异常返回输出错误码和错误信息
				System.out.println("错误码=" + result.get("statusCode") +" 错误信息= "+result.get("statusMsg"));
				DataRow msgret = new DataRow();
				msgret.put("sendtime", DateTimeUtil.getNowDateStr());
				msgret.put("sendflag", 2);
				msgret.put("remark", result.get("statusMsg"));
				msgret.put("msgid", item.getString("msgid"));
				dbservice.UpdateByKey("tf_sendmsg",msgret);
			}
		}
		return list.size()>0?false:true;
	}
	
	//执行入口
	public void doExecute() throws InterruptedException {
		logger.debug("短信后台发送类执行...");
		CCPRestSDK restAPI = new CCPRestSDK();
		int errtimes = 0;
		restAPI.init("sandboxapp.cloopen.com", "8883");// 初始化服务器地址和端口，格式如下，服务器地址不需要写https://
		restAPI.setAccount("aaf98f894fd44d15014fef829b6d17db", "b67c1f492875424b9f21a9cfc4d7f4c2");// 初始化主帐号和主帐号TOKEN
		restAPI.setAppId("8a48b5514fd49643014fef832dcd43ae");// 初始化应用ID
        while(true)
        {
	        try {
				sendMessage(restAPI);
				Thread.sleep(500);
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
        logger.debug("短信后台发送类退出.");
	}
}
