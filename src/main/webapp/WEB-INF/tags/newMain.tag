<%@ tag pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 转换结果集访问名称 -->
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<!DOCTYPE HTML>
<html>
<head>
<title>管理平台</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 新 Bootstrap 核心 CSS 文件 -->

<link rel="stylesheet"
	href="http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css">
<link rel="stylesheet"
	href="http://apps.bdimg.com/libs/jqueryui/1.10.4/css/jquery.ui.all.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/mainlayout.css">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.6.0/bootstrap-table.min.css">

<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<script src="http://libs.baidu.com/jqueryui/1.10.2/jquery-ui.min.js"></script>

<%
	jspContext.setAttribute("BreadCrumbList",request.getAttribute("BreadCrumbList"));
%>
<script src="${pageContext.request.contextPath}/resources/js/summary/echarts-all.js"></script>
</head>
<body>
	<div class="container">
		<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
			<div class="container-fluid">
				<!--f-->
				<div class="navbar-header">
					<a class="navbar-brand" href="${pageContext.request.contextPath}/">海运管理平台</a>
				</div>
				<ehang:MainMenu></ehang:MainMenu>
				<!--f END-->
			</div>
		</nav>
	</div>

	<div id="leftmenubox">
		<div class="panel panel-default">
  			<div class="panel-body">
				<div class="row">
					<button type="button" class="btn btn-default btn-block"><span id="show_info">待处理消息</span><span class="badge">0</span></button>
					<button type="button" class="btn btn-primary btn-block"><span id="show_info">待处理工单</span><span class="badge">35</span></button>
					<button type="button" class="btn btn-danger btn-block"><span id="show_info">待处理审批</span><span class="badge">999</span></button>
				</div>
			</div>
		</div>
	</div>
	
	<div id="contex" >
		<div class="container-fluid">
		<div class="row">
		<div class="col-sm-12">
			<div class="panel panel-default contextpanel">
				<ol class="breadcrumb">
				<li><a href="${pageContext.request.contextPath}/index">首页</a></li>
				<c:forEach var="breadcrumb" items="${BreadCrumbList}"  varStatus="subflag">
							<c:if test="${breadcrumb.getInt('vistflag')==0}">
								<li>
										<a href="${pageContext.request.contextPath}/${breadcrumb.getString('menufile')}"  target="_self">${breadcrumb.getString('menuname')}</a>
								</li>
							</c:if>
							<c:if test="${breadcrumb.getInt('vistflag')==1}">
								<li class="active">${breadcrumb.getString('menuname')}</li>
							</c:if>
						</c:forEach>
						
					</ol>
			<!-- 内容 -->
				<jsp:doBody />
			<!-- 内容 end-->
			</div>
			</div>
			</div>
		</div>
	</div>

<script>
	$(function(){		
		//初始化
		$("#leftmenubox button #show_info").hide();
		
		$("#leftmenubox").mouseenter(function(){
			$("#leftmenubox").animate({width:"129px"},300);
			$("#leftmenubox button #show_info").show();
		});
		$("#leftmenubox").mouseleave(function(){
			$("#leftmenubox").animate({width:"52px"},500);
			$("#leftmenubox button #show_info").hide();
		});
	});
</script>

</body>
</html>

