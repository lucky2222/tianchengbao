package com.tcb.dao.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.sd4324530.fastweixin.handle.MessageHandle;
import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.req.BaseReqMsg;

public class WeixinMsgHandleService implements MessageHandle{
	private static final Logger log = LoggerFactory.getLogger(WeixinEventHandleService.class);
	
	//@Override
	public BaseMsg handle(BaseReqMsg message) {
		log.debug("消息发送人"+message.getFromUserName());
		return null;
	}

	//@Override
	public boolean beforeHandle(BaseReqMsg message) {
		log.debug("before消息类型"+message.getMsgType());
		return false;
	}

}
