<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html class="ui-page-login">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<title>login</title>
		<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/app/mui.min.css?a=1">
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/mui.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/common.js?a=17"></script>
		<style>
			.area {
				margin: 20px auto 0px auto;
			}
			.mui-input-group {
				margin-top: 10px;
			}
			.mui-input-group:first-child {
				margin-top: 20px;
			}
			.mui-input-group label {
				width: 32%;
			}
			.mui-input-row label~input,
			.mui-input-row label~select,
			.mui-input-row label~textarea {
				width: 68%;
			}
			.mui-checkbox input[type=checkbox],
			.mui-radio input[type=radio] {
				top: 6px;
			}
			.mui-content-padded {
				margin-top: 25px;
			}
			.mui-btn {
				padding: 10px;
			}
			.link-area {
				display: block;
				margin-top: 25px;
				text-align: center;
			}
			.spliter {
				color: #bbb;
				padding: 0px 8px;
			}
			.oauth-area {
				position: absolute;
				bottom: 20px;
				left: 0px;
				text-align: center;
				width: 100%;
				padding: 0px;
				margin: 0px;
			}
			.oauth-area .oauth-btn {
				display: inline-block;
				width: 50px;
				height: 50px;
				background-size: 30px 30px;
				background-position: center center;
				background-repeat: no-repeat;
				margin: 0px 20px;
				/*-webkit-filter: grayscale(100%); */
				
				border: solid 1px #ddd;
				border-radius: 25px;
			}
			.oauth-area .oauth-btn:active {
				border: solid 1px #aaa;
			}
		</style>

	</head>

	<body>
		<header class="mui-bar mui-bar-nav">
			<span class="mui-action-back mui-icon mui-icon-back"></span>
			<h1 class="mui-title">Login</h1>
		</header>
		<div class="mui-content">
			<form id='login-form' class="mui-input-group" action="/app/dologin">
				<div class="mui-input-row">
					<label>Email&nbsp;&nbsp;</label>
					<input id='Email' type="text" class="mui-input-clear mui-input" placeholder="&nbsp;&nbsp;input your Email">
				</div>
				<div class="mui-input-row">
					<label>Password</label>
					<input id="password" type="password" class="mui-input" placeholder="input your password">
				</div>
			</form>
			<form class="mui-input-group">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell">
						Auto Login
						<div id="autoLogin" class="mui-switch">
							<div class="mui-switch-handle"></div>
						</div>
					</li>
				</ul>
			</form>
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary">Login</button>
				<div class="link-area"><a id='reg'>Regedit</a> <span class="spliter">|</span> <a id='forgetPassword'>Forget Password</a>
				</div>
			</div>
			<div class="mui-content-padded oauth-area">

			</div>
		</div>
		<script>
			(function($, doc) {
				$.init({
					statusBarBackground: '#f7f7f7'
				});
				$.plusReady(function() {
					plus.screen.lockOrientation("portrait-primary");
					
					var login = document.getElementById("login");
					//监听点击事件
					login.addEventListener("tap",function () {
						mui.post('http://www.sino-sources.com/app/dologin',{
							log_user_mail:document.getElementById("Email").value,
							log_password:document.getElementById("password").value
						},function(data){
							//服务器返回响应，根据响应结果，分析是否登录成功；
							//mui.toast(data);
							if(data.loginflag==1)
							{
								mui.openWindow({
									url: 'http://www.sino-sources.com/app/userinfo',
									id: 'userinfo',
					    			createNew:true
								});
							}else{
								plus.nativeUI.toast(data.error);
							}
						},'json');
					});
					
					
					
				});
			}(mui, document));
		</script>
	</body>

</html>