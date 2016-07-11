<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<title>${catalog_name}</title>
		<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/app/mui.min.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/mui.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/common.js?a=17"></script>
	</head>
<body>
		
		<div class="title">
			<span class="mui-action-back mui-icon mui-icon-back"></span>${catalog_name}
		</div>
		<ul id="prouctdetails" class="mui-table-view">
		<c:forEach var="item" items="${result.resultlist}"  varStatus="flag">
			<li class="mui-table-view-cell mui-media">
				<a href="http://www.sino-sources.com/app/productinfo/${item.product_id}">
					<img class="mui-media-object mui-pull-right" src="/uploads/appimg/${item.show_img}" alt="${item.product_name}"  title="${item.product_name}">
					<div class="mui-media-body">
						${item.product_name}
						<p class="mui-ellipsis">${item.product_price}</p>
					</div>
				</a>
			</li>
			
		</c:forEach>
			<li class="mui-table-view-cell mui-media">
				<c:if test="${result.pagenum>1}">
					<a href="http://www.sino-sources.com/app/typelist/${catalogId}?topagenum=${result.prePagenum}"  class="mui-media-body mui-pull-left">上一页</a>
				</c:if>
				<c:if test="${result.pagenum<result.allpage}">
					<a href="http://www.sino-sources.com/app/typelist/${catalogId}?topagenum=${result.nextPagenum}" class="mui-media-body mui-pull-right">下一页</a>
				</c:if>
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
		monitor_link("#prouctdetails");
	</script>
</html>