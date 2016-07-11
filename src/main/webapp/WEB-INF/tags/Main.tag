<%@ tag pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 转换结果集访问名称 -->
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<!DOCTYPE HTML>
<html>
<head>
<%
	jspContext.setAttribute("BreadCrumbList",
			request.getAttribute("BreadCrumbList"));
	jspContext.setAttribute("PageTitle",
			request.getAttribute("PageTitle"));
%>
<title>${PageTitle}</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 新 Bootstrap 核心 CSS 文件 -->

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.min.css" id="css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/uploadfile.min.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/jquery/jquery-ui.min.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/mainlayout.css">

<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="${pageContext.request.contextPath}/resources/js/common/jquery-1.11.2.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/jquery.SuperSlide.2.1.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery.uploadfile.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery.form.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.min.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/sysmanage/bootstrap-datetimepicker.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/jquery/jquery-ui.min.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/summary/echarts-all.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/ajaxpage.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/util.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery.json.js"></script>
</head>
<body>
	<div class="container">
		<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
			<div class="container-fluid">
				<!--f-->
				<div class="navbar-header" style=" float:left; width:150px;">
					<a class="navbar-brand" href="${pageContext.request.contextPath}/" title="海运管理平台" alt="海运管理平台"></a>
				</div>
				<ehang:MainMenu></ehang:MainMenu>
				<!--f END-->
			</div>
		</nav>
	</div>

	<div id="leftnav" class="Noprn">
<div class="contenttitle">
<div class="shousnav">
<ul>
<li class="shenpi"><a href="${pageContext.request.contextPath}/message/companyContact" target="_blank" title="联系信息"><em id="msgnums">2</em></a>
</li>
<!--  
<li ><a href="#" title="审批"><em>12</em></a>
-->
</li>

<li><a href="https://www.paypal.com/signin/?country.x=C2&locale.x=en_C2" target="_blank"><img src="${pageContext.request.contextPath}/resources/image/li4_02.png" width="50" height="50" title="开具帐单" alt="开具帐单" /></a>
</li>
<%-- <li><a href="#" target="_self"><img src="${pageContext.request.contextPath}/resources/image/li5_02.png" width="50" height="50" title="审核" alt="审核" /></a>
</li>
<li><a href="${pageContext.request.contextPath}/common/danger" target="_self"><img src="${pageContext.request.contextPath}/resources/image/danger_02.png" width="50" height="50" title="危险品标志" alt="危险品标志" /></a>
</li>
<li><a href="${pageContext.request.contextPath}/common/shipping" target="_self"><img src="${pageContext.request.contextPath}/resources/image/chuan_07.png" width="50" height="50" title="船公司要求" alt="船公司要求" /></a>
</li>
<li><a href="${pageContext.request.contextPath}/common/sjsz" target="_self"><img src="${pageContext.request.contextPath}/resources/image/shizhong_06.png" width="50" height="50" title="世界时钟" alt="世界时钟" /></a>
</li>
<li><a href="${pageContext.request.contextPath}/common/sjwz" target="_self"><img src="${pageContext.request.contextPath}/resources/image/iphone.png" width="50" height="50" title="手机端" alt="手机端" /></a>
</li>
<li><a href="#" target="_self"><img src="${pageContext.request.contextPath}/resources/image/beizhuxx.png" width="50" height="50" title="备注信息" alt="备注信息" /></a>
</li> --%>

</ul>
</div>
</div>
</div>

	<div id="contex">
		<div class="container-fluid">
			<div class="row">
				<div class="panel col-sm-12">
					<div class="panel panel-default contextpanel">
						<ol class="breadcrumb">
							<li><a href="${pageContext.request.contextPath}/index">首页</a></li>
							<c:if test="${empty BreadCrumbList}"><li class="active">${PageTitle}</li></c:if>
							<c:forEach var="breadcrumb" items="${BreadCrumbList}"
								varStatus="subflag">
								<c:if test="${breadcrumb.getInt('vistflag')==0}">
									<li><a
										href="${pageContext.request.contextPath}/${breadcrumb.getString('menufile')}"
										target="_self">${breadcrumb.getString('menuname')}</a></li>
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
	<script src="${pageContext.request.contextPath}/resources/js/basedata/autoquery.js"></script>
</body>
</html>

