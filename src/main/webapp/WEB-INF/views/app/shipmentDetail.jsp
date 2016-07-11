<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<title>Shipment Detail</title>
		<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/app/mui.min.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/mui.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/common.js?a=17"></script>
	</head>

	<body>
		<!--
        	描述：搜索
        -->
        <div class="mui-input-row mui-search">
			<input type="search" class="mui-input-clear" placeholder="input keyword ...">
		</div>
		<!--
        	描述：滚动图片展示
        -->
		<div class="mui-slider">
			<div class="mui-slider-group">
				<div class="mui-slider-item">
					<a href="#"><img src="${pageContext.request.contextPath}/resources/app/image/banner1.jpg" width="100%" /></a>
				</div>
				<div class="mui-slider-item">
					<a href="#"><img src="${pageContext.request.contextPath}/resources/app/image/banner2.jpg" width="100%" /></a>
				</div>
				<div class="mui-slider-item">
					<a href="#"><img src="${pageContext.request.contextPath}/resources/app/image/banner3.jpg" width="100%" /></a>
				</div>
			</div>
			<div class="mui-slider-indicator">
				<div class="mui-indicator mui-active"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
			</div>
		</div>
		<!--
        	描述：个人信息展示
        -->
        
        <ul class="mui-table-view">
			<li class="mui-table-view-cell mui-collapse mui-active">
				<a class="mui-navigate-right" href="#">Shipment Detail</a>
				<div class="mui-collapse-content">
					<c:forEach var="item" items="${shipmentsList}"  varStatus="flag">
						<ul class="mui-table-view">
							<li class="mui-table-view-divider">InvoiceNO:${item.InvoiceNO}</li>
				            <li class="mui-table-view-divider">ContainerNo:${item.ContainerNo}</li>
				            <li class="mui-table-view-divider">SealNO:${item.SealNO}</li>
				            <li class="mui-table-view-divider">CGS:${item.CGS}</li>
						</ul>
					</c:forEach>
				</div>
			</li>
		</ul>

		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<div class="mui-media-body">
						<p class='mui-ellipsis'>&nbsp;</p>
					</div>
				</a>
			</li>
		</ul>
		<!--
        	描述：工具栏
        -->
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
		monitor_link("#downlist");
	</script>
</html>