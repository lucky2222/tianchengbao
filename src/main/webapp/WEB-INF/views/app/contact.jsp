<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<title>Inquiry Center</title>
		<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/app/mui.min.css?a=1">
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/mui.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/common.js?a=17"></script>
	</head>

	<body>
		
		<header class="mui-bar mui-bar-nav">
			<span class="mui-action-back mui-icon mui-icon-back"></span>
			<h1 class="mui-title">Inquiry</h1>
		</header>
		<div class="mui-content">
			<form class="mui-input-group">
					<div class="mui-input-row">
						<label>Title:</label>
						<input name="subject" id="subject" type="text" placeholder="">
					</div>
					<div class="mui-input-row">
						<label>Email:</label>
						<input  name="email" id="email" type="text" placeholder="">
					</div>
					<div>
						<label>Message:</label>
						<textarea  maxlength="4000" name="remark" id="remark" rows=4></textarea>
					</div>
					<div class="mui-input-row">
						<label>Company:</label>
						<input name="companyID" id="companyID" type="text" placeholder="">
					</div>
					<div class="mui-input-row">
						<label>Telephone:</label>
						<input name="staffID" id="staffID" type="text" placeholder="">
					</div>
					<div class="mui-button-row">
						<button id="send" type="button" class="mui-btn mui-btn-primary" onclick="return false;">Send</button>
					</div>
				</form>
		</div>
		<!-- 主菜单 -->
		<nav id="menulist" class="mui-bar mui-bar-tab">
			<a class="mui-tab-item" href="http://www.sino-sources.com/app/index">
				<span class="mui-icon mui-icon-home mui-active"></span>
				<span class="mui-tab-label">Index</span>
			</a>
			<a class="mui-tab-item" href="http://www.sino-sources.com/app/userinfo">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">Summary</span>
			</a>
			<a class="mui-tab-item" href="http://www.sino-sources.com/app/tradelist">
				<span class="mui-icon mui-icon-list"></span>
				<span class="mui-tab-label">Order Center</span>
			</a>
			<a class="mui-tab-item" href="http://www.sino-sources.com/app/contact">
				<span class="mui-icon mui-icon-chatbubble"></span>
				<span class="mui-tab-label">Inquiry</span>
			</a>
		</nav>
	</body>
	<script>
		monitor_link("#menulist");
		var send = document.getElementById("send");
		//监听点击事件
		send.addEventListener("tap",function () {
			if(document.getElementById("email").value==null||document.getElementById("email").value=='')
			{
				plus.nativeUI.toast("Email is necessary");
				return false;
			}
			mui.post('http://www.sino-sources.com/app/doContactUs',{
				email:document.getElementById("email").value,
				remark:document.getElementById("remark").value,
				companyID:document.getElementById("companyID").value,
				staffID:document.getElementById("staffID").value,
				subject:document.getElementById("subject").value
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				plus.nativeUI.toast("submit ok");
				plus.webview.currentWebview().close();
			},'json');
		});
	</script>
</html>