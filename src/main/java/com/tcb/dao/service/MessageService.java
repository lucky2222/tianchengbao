package com.tcb.dao.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.GeneratorIDUtil;
import com.tcb.util.StringUtil;

@Service(value = "MessageService")
@Transactional
public class MessageService
{
	private static final Logger logger = LoggerFactory.getLogger(MessageService.class);
	@Autowired
	private DBService dbservice;
	//@Autowired
	//private TradeService tradeservice;

	/**
	 * 根据模板创建
	 * 
	 * @author nge
	 * @date 2015年6月16日
	 * @param tradeinfo
	 *            主工单
	 * @param template
	 * @throws Exception
	 */
	public void CreateMsgByTemplate(DataRow tradeinfo, DataRow template) throws Exception
	{
		logger.debug("CreateMsgByTemplate--begin");
		String orderid = tradeinfo.getString("OrderID");
		String datetime = tradeinfo.getString("CreateTime");
		DataRow orderinfo = dbservice.querySimpleRowByKey("te_orders", orderid);

		DataRow query = new DataRow();
		query.put("OrderID", orderid);
		query.put("Flag", 1);
		query.put("IsMain", 1);
		DataRow ladingbillinfo = dbservice.querySimpleRowByParam("te_ladingbill", query, null);

		String msgcontext = template.getString("MsgContext");
		if (msgcontext.contains("<OrderNo>"))
		{
			msgcontext = msgcontext.replace("<OrderNo>", orderid);
		}
		if (msgcontext.contains("<DateTime>"))
		{
			msgcontext = msgcontext.replace("<DateTime>", datetime);
		}
		if (msgcontext.contains("<Delivery>"))
		{
			msgcontext = msgcontext.replace("<Delivery>", orderinfo.getString("DeliveryPlace"));
		}
		if (msgcontext.contains("<EndPort>"))
		{
			msgcontext = msgcontext.replace("<EndPort>", orderinfo.getString("DischargePortName"));
		}
		if (msgcontext.contains("<ETD>"))
		{
			msgcontext = msgcontext.replace("<ETD>", orderinfo.getString("ETD"));
		}
		if (msgcontext.contains("<LadingBillNo>"))
		{
			msgcontext = msgcontext.replace("<LadingBillNo>", ladingbillinfo.getString("LadingBillNo"));
		}
		if (msgcontext.contains("<NewLadingBillNo>"))
		{
			msgcontext = msgcontext.replace("<NewLadingBillNo>", ladingbillinfo.getString("LadingBillNo"));
		}
		if (msgcontext.contains("<Operator>"))
		{
			String staffid = tradeinfo.getString("CreateStaffID");
			msgcontext = msgcontext.replace("<Operator>", staffid);
		}
		if (msgcontext.contains("<ShotCustName>"))
		{
			query.clear();
			query.put("StaffID", tradeinfo.getString("CreateStaffID"));
			DataRow userinfo = dbservice.querySimpleRowByName("td_userinfo.selectUserInfo", query);
			msgcontext = msgcontext.replace("<ShotCustName>", userinfo.getString("ShortName"));
		}
		if (msgcontext.contains("<TransPort>"))
		{
			msgcontext = msgcontext.replace("<TransPort>", orderinfo.getString("TransPortName"));
		}
		if (msgcontext.contains("<Vessel>"))
		{
			msgcontext = msgcontext.replace("<Vessel>", orderinfo.getString("VesselEN"));
		}
		if (msgcontext.contains("<VoyNo>"))
		{
			msgcontext = msgcontext.replace("<VoyNo>", orderinfo.getString("Voyage"));
		}

		String nowDateString = DateTimeUtil.getNowDateStr();

		// Insert te_msgsend
		DataRow msgparam = new DataRow();
		String sysstaffid = "SYSTEM_HX";
		String msgSendID = GeneratorIDUtil.generatorId();

		msgparam.put("MsgSendID", msgSendID);
		msgparam.put("MsgTitle", template.getString("MsgName"));
		msgparam.put("MsgContent", msgcontext);
		msgparam.put("OrderID", orderid);
		msgparam.put("LadingbillID", ladingbillinfo.getString("Ladingbillid"));
		msgparam.put("SendStaffID", sysstaffid);
		msgparam.put("CreateTime", nowDateString);
		msgparam.put("CreateStaffID", sysstaffid);
		msgparam.put("HostID", tradeinfo.getString("HostID"));
		msgparam.put("Flag", 1);
		msgparam.put("MsgType", 0);// 发送
		msgparam.put("MsgLevl", template.getInt("MsgLevel"));
		msgparam.put("Remark", "");

		dbservice.Insert("te_msgsend", msgparam);

		// query td_messagereceiver
		query.put("MsgId", template.getString("MsgId"));
		List<DataRow> msgreceiverrole = dbservice.queryListByParam("td_messagereceiver", query, null, null);
		// Insert te_msgtaskto
		if (msgreceiverrole != null && !msgreceiverrole.isEmpty())
		{
			for (DataRow item : msgreceiverrole)
			{
				DataRow msgto = new DataRow();

				msgto.put("MsgTaskToID", GeneratorIDUtil.generatorId());
				msgto.put("ToType", "1");// 部门
				msgto.put("ToObjID", item.getString("MsgRecvRol"));
				msgto.put("MsgTaskSendID", msgSendID);
				msgto.put("ToStatus", "0");// 未发送
				msgto.put("HostID", tradeinfo.getString("HostID"));
				msgto.put("Flag", 1);
				msgto.put("CreateTime", nowDateString);
				msgto.put("CreateStaffID", sysstaffid);
				msgto.put("MsgTaskType", 0);//消息

				dbservice.Insert("te_msgtaskto", msgto);
			}
		}
	}

	/**
	 * 手动发送消息
	 * 
	 * @author nge
	 * @date 2015年7月18日
	 * @param param
	 *            任务参数：
	 *            orderid:可选，与委托相关消息提供orderid
	 *            staffid:必选，消息发送人StaffID
	 *            receivestaffid：必选，消息接收人StaffID，多个接收人，以英文逗号“,”隔开
	 *            msgtitle：必选，消息标题
	 *            msgcontent：可选，消息内容或描述
	 *            attachshowname：可选，消息相关附件名称
	 *            attachid：可选，消息相关附件ID，当附件名称不为空时，附件ID也不可为空
	 *            hostid:必选
	 *            prior：可选，消息等级，默认值0
	 * @throws Exception
	 */
	public void CreateMsg(DataRow param) throws Exception
	{
		logger.debug("CreateMsg:---手动发送消息begin");
		if (param == null || param.isEmpty())
		{
			throw new Exception("Invalid Param!");
		}

		String msgsendid = GeneratorIDUtil.generatorId();
		String msgtitle = param.getString("msgtitle");// 消息标题
		if (StringUtil.isNullOrEmpty(msgtitle))
		{
			throw new Exception("消息标题：msgtitle，不能为空！");
		}
		String msgcontent = param.getString("msgcontent");// 消息内容
		if (msgcontent == null)
		{
			msgcontent = "";
		}
		String orderid = param.getString("orderid");
		if (orderid == null)
		{
			orderid = "";
		}
		String sendstaffid = param.getString("staffid");
		if (StringUtil.isNullOrEmpty(sendstaffid))
		{
			throw new Exception("消息发送人ID：staffid，不能为空！");
		}
		String receivestaffid = param.getString("receivestaffid");
		if (StringUtil.isNullOrEmpty(receivestaffid))
		{
			throw new Exception("消息接收人ID：receivestaffid，不能为空！");
		}
		String hostid = param.getString("hostid");
		if (StringUtil.isNullOrEmpty(hostid))
		{
			throw new Exception("hostid，不能为空！");
		}

		int prior = param.getInt("prior");// 消息等级，默认值0

		String attachmentname = param.getString("attachshowname");// 附件显示的name
		String attachid = param.getString("attachid");// 附件ID

		if (!StringUtil.isNullOrEmpty(attachmentname) && StringUtil.isNullOrEmpty(attachid))
		{
			throw new Exception("当有附件上传时，附件ID：attachid，不能为空！");
		}

		String url = "";
		if (!StringUtil.isNullOrEmpty(orderid))
		{
			url = "/orderdetail/index/" + orderid;
		}

		String nowDateString = DateTimeUtil.getNowDateStr();
		// Insert te_msgsend
		DataRow msg = new DataRow();

		msg.put("MsgSendID", msgsendid);
		msg.put("MsgTitle", msgtitle);
		msg.put("MsgContent", msgcontent);
		msg.put("OrderID", orderid);
		msg.put("SendStaffID", sendstaffid);
		msg.put("CreateTime", nowDateString);
		msg.put("CreateStaffID", sendstaffid);
		msg.put("HostID", hostid);
		msg.put("Flag", 1);
		msg.put("MsgType", 0);
		msg.put("MsgLevl", prior);
		msg.put("Url", url);
		msg.put("AttachmentName", attachmentname);
		msg.put("AttachmentID", attachid);

		dbservice.Insert("te_msgsend", msg);

		// Insert te_msgtaskto
		DataRow msgto = new DataRow();
		msgto.put("MsgTaskToID", GeneratorIDUtil.generatorId());
		msgto.put("ToType", 0);//个人
		msgto.put("ToObjID", receivestaffid);
		msgto.put("MsgTaskSendID", msgsendid);
		msgto.put("ToStatus", 0);//发送状态
		msgto.put("HostID", hostid);
		msgto.put("Flag", 1);
		msgto.put("CreateTime", nowDateString);
		msgto.put("CreateStaffID", sendstaffid);
		msgto.put("MsgTaskType", 0);//消息
		
		dbservice.Insert("te_msgtaskto", msgto);

	}
}
