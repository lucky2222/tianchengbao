<%@ tag pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 转换结果集访问名称 -->
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
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

	
	<!--图片轮播代码 开始-->
			<div id="showImg" class="carousel slide" data-ride="carousel" >
			  <!-- Indicators -->
			  <ol class="carousel-indicators">
				<li data-target="#showImg" data-slide-to="0"></li>
				<li data-target="#showImg" data-slide-to="1"></li>
				<li data-target="#showImg" data-slide-to="2"></li>
				<li data-target="#showImg" data-slide-to="3"></li>
				<li data-target="#showImg" data-slide-to="4"></li>
			  </ol>
			
			  <!-- Wrapper for slides -->
			  <div class="carousel-inner" role="listbox">
				<div class="item active">
				  <img src="${pageContext.request.contextPath}/resources/images/1.jpg" alt="..."  class="img-style">
				</div>
				<div class="item">
				  <img src="${pageContext.request.contextPath}/resources/images/2.jpg" alt="..."  class="img-style">
				</div>
				<div class="item">
				  <img src="${pageContext.request.contextPath}/resources/images/3.jpg" alt="..."  class="img-style">
				</div>
				<div class="item">
				  <img src="${pageContext.request.contextPath}/resources/images/4.jpg" alt="..."  class="img-style">
				</div>
				<div class="item">
				  <img src="${pageContext.request.contextPath}/resources/images/5.jpg" alt="..."  class="img-style">
				</div>
			  </div>
			  </div>
			
<!--			</div>-->

		<!--图片轮播代码结束-->
		
		<!-- 活动分享按钮开始  -->
		  <div class="container-fluid">
			  <div class="row masonry-container" >


						<div class="col-xs-3  col-sm-3 col-md-3 item">
						   <a href="#"   role="button"  id="${total.PRODUCT_ID}">
							<div class="thumbnail">
									<img src="${pageContext.request.contextPath}/resources/images/indexIcon1.png"  class="img-responsive" alt="Responsive image" >
			
						      <div class="caption"  align="center">
						         <span align="center">新手礼物</span>
						      </div>
							</div>
							</a>	
				  		</div>
						<div class="col-xs-3  col-sm-3 col-md-3 item">
						   <a href="#"   role="button"  id="${total.PRODUCT_ID}">
							<div class="thumbnail"  align="center">
									<img src="${pageContext.request.contextPath}/resources/images/indexIcon2.png"  class="img-responsive" alt="Responsive image" >
			
						      <div class="caption">
						         <span align="center">红包分享</span>
						      </div>
							</div>
							</a>	
				  		</div>
						<div class="col-xs-3  col-sm-3 col-md-3 item">
						   <a href="#"   role="button"  id="${total.PRODUCT_ID}">
							<div class="thumbnail"  align="center">
									<img src="${pageContext.request.contextPath}/resources/images/indexIcon3.png"  class="img-responsive" alt="Responsive image" >
			
						      <div class="caption"  align="center">
						         <span align="center">邀请好友</span>
						      </div>
							</div>
							</a>	
				  		</div>
						<div class="col-xs-3  col-sm-3 col-md-3 item">
						   <a href="#"   role="button"  id="${total.PRODUCT_ID}">
							<div class="thumbnail">
									<img src="${pageContext.request.contextPath}/resources/images/indexIcon4.png"  class="img-responsive" alt="Responsive image" >
			
						      <div class="caption">
						         <span align="center">活动专区</span>
						      </div>
							</div>
							</a>	
				  		</div>			
				</div>
		</div>		
		
		<!-- 活动分享按钮结束  -->
		<!-- 产品展示开始-->
		<!-- 内容 -->
		<jsp:doBody />
		<!-- 内容 end-->
		<!-- 产品展示结束-->
		
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

</body>
</html>
<script type="text/javascript">
$(document).ready(function() {
    $('.carousel').carousel({
     interval: 2000
    })
	});
</script>