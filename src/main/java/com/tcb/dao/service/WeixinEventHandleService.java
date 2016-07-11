package com.tcb.dao.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.sd4324530.fastweixin.handle.EventHandle;
import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.req.BaseEvent;

public class WeixinEventHandleService implements EventHandle {
	private static final Logger log = LoggerFactory.getLogger(WeixinEventHandleService.class);
	/*
	@Override
	public BaseMsg handle(BaseEvent event) {
		// TODO Auto-generated method stub
		log.debug("事件："+event.getEvent());
		return null;
	}

	@Override
	public boolean beforeHandle(BaseEvent event) {
		// TODO Auto-generated method stub
		log.debug("before事件："+event.getEvent());
		return false;
	}
*/

	public boolean beforeHandle(BaseEvent arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	public BaseMsg handle(BaseEvent arg0) {
		// TODO Auto-generated method stub
		return null;
	}
}
