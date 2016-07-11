<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="tcb"%>
<!DOCTYPE HTML>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/mainpage.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/silder.css">
    <script src="${pageContext.request.contextPath}/resources/js/common/jquery-1.11.2.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/main.js"></script>
<title>主页面</title>
<body>
<!-- 左侧菜单栏 jsp的时候可以单独分离出去 做为公用处理 -->
	<ul class="list-group nav-stacked navMenu jsComNav">
		  <li><a href="/tcb" class="list-group-item" style="margin-bottom:-3px">
		  	<span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;&nbsp;首页</a></li>
		  <li><a href="#"  class="list-group-item" style="margin-bottom:-3px">
		  	<span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>&nbsp;&nbsp;我的理财</a></li>
		  <li><a href="#"  class="list-group-item" style="margin-bottom:-3px">
		  	<span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>&nbsp;&nbsp;邀请好友</a></li>
		  <li><a href="#"  class="list-group-item" style="margin-bottom:-3px">
		 	 <span class="glyphicon glyphicon-share" aria-hidden="true"></span>&nbsp;&nbsp;红包分享</a></li>
		  <li><a href="/tcb/myaccount"  class="list-group-item" style="margin-bottom:-3px">
		 	 <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;&nbsp;我的账户</a></li>
	</ul>
<!-- 左侧菜单栏 jsp的时候可以单独分离出去 做为公用处理   over -->
			<div class="page-header" style="margin-bottom:0px;border-bottom:0px;padding-bottom:0px;" class="com_head">
				<div class="input-group">
					<span class="input-group-addon" style="background-color:#FFFFFF" id="menu">
							<span  class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
					</span>
					<span align="center" class="form-control" style="background-color:#FFFFFF" ><img src="${pageContext.request.contextPath}/resources/images/logo.png" height="20px">天成宝</span>
				</div>
			</div>	
<!--	<div class="container-fluid" style="padding-left:0px;padding-right:0px">-->

	
		<!-- 产品展示结束-->
		<div class="panel-body">
		<form action="/register/doregister">
				  <div class="form-group">
					<label  for="userName"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;姓名</label>
					<input  class="form-control" name="userName"  id="userName" type="text" value="${userName}" placeholder="必填">
				  </div>
				  <div class="form-group">
					<label  for="userAddr"><span class="glyphicon glyphicon-phone"></span>&nbsp;&nbsp;手机号(本平台唯一凭证)</label>
					<input class="form-control"  name="telno" id="telno" type="text" value="${telno}" placeholder="必填" >
				  </div>
				  <div class="form-group" >		
					<label  for="userPhone"><span class="glyphicon glyphicon-lock"></span>&nbsp;&nbsp;密码</label>
					<input class="form-control"   name="userPhone" id="userPhone" type="text" value="${userPhone}" placeholder="必填">
				  </div>
				  <div class="form-group" >
					<label  for="userPhone"><span class="glyphicon glyphicon-lock"></span>&nbsp;&nbsp;确认密码</label>
					<input class="form-control"   name="userTwoPhone" id="userTwoPhone" type="text" value="${userTwoPhone}" placeholder="必填">
				  </div>
				  <div class="form-group" >
					<label  for="userPhone"><span class="glyphicon glyphicon-ok-circle"></span>&nbsp;&nbsp;短信验证码</label>
					<div class="input-group">
						<input type="text" class="form-control" placeholder="必填" name="randint" id="randint">
						<span class="input-group-btn">
							<button class="btn btn-default" type="button" id="resend" >再次发送</button>
						</span>
				  	</div>
				  </div>
				  <div class="form-group" >
					<label  for="userPhone"><span class="glyphicon glyphicon-phone"></span>&nbsp;&nbsp;邀请人手机号</label>
					<input class="form-control"   name="userPhone" id="userPhone" type="text" value="${userPhone}" placeholder="选填">
				  </div>
					<input type="submit" class="btn btn-danger btn-block"  onclick="return validate()"  value="礼包，我来啦">
				</form>
		</div>
		
			<div class="footer">
				<div>
					<i>|</i>  <a href="http://518220.m.weimob.com/weisite/detail?pid=518220&bid=1072802&wechatid=fromUsername&did=1956961&from=list&wxref=mp.weixin.qq.com"><span style="color:#999999">联系我们</span></a>  <i>|</i>  
					<a href="http://518220.m.weimob.com/weisite/detail?pid=518220&bid=1072802&wechatid=fromUsername&did=1952656&from=list&wxref=mp.weixin.qq.com"><span style="color:#999999">项目合作</span></a>
				</div>

			<!-- 活动分享按钮开始  -->
			  <div class="container-fluid">
				  <div class="row masonry-container" >
							<div class="col-xs-3  col-sm-3 col-md-3 item" >
									<div class="foot-100">
									 <span align="center">100%<br/>安全网站</span>
									 </div>
							</div>
							<div class="col-xs-3  col-sm-3 col-md-3 item" >
								<div class="foot-100">
									 <span align="center">100%<br/>资金安全</span>
								</div>
							</div>
							<div class="col-xs-3  col-sm-3 col-md-3 item" >
								<div class="foot-100">
									 <span align="center">100%<br/>诚信网站</span>
								</div>
							</div>
							<div class="col-xs-3  col-sm-3 col-md-3 item" >
								<div class="foot-100">
									 <span align="center">100%<br/>本金担保</span>
								</div>
							</div>	
					</div>
			</div>
			<!-- 活动分享按钮结束  -->				
			</div>
	<script type="text/javascript">
		function validate()
		{
			var tel = $("#telno").val(); //获取手机号
			var telReg = !!tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
			//如果手机号码不能通过验证
			if(telReg == false){
				alert("手机号码格式错误，请核对后重新输入！");
				return false;
			}
			if($("#randint").val().length!=6)
			{
				alert("验证码格式错误，请核对后重新输入！");
				return false;
			}
			return true;
		}
		function sendTelnoMsg()
		{
			var tel = $("#telno").val(); //获取手机号
			var telReg = !!tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
			//如果手机号码不能通过验证
			if(telReg == false){
				alert("手机号码格式错误，请核对后重新输入！");
			}else{
				$.getJSON("/register/identifyingcode",{"telno":tel},
					function(data){
						if(data.identifyingcode==true)
						{
							return true;
						}
					});
				return false;
			}
		}
		$().ready(function(){
			$("#resend").click(sendTelnoMsg);
			
			$("#telno").blur(function(){
			    if(sendTelnoMsg())
			    {
			    	var start_time = 15;
				    $("#resend").attr('disabled',"true");
				    var idInt = setInterval(function(){
					    	if(start_time<=0)
					    	{
					    		$("#resend").attr('disabled',false);
					    		$("#resend").text('再次发送');
					    		clearInterval(idInt);
					    	}else{
					    		$("#resend").text('等待'+start_time--+'S');
					    	}
					    },1000);
			    }
			});
		   
		});
	</script>
</body>
</html>