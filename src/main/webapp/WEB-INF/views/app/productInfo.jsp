<%@ page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<title>${product.product_name}</title>
		<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/app/mui.min.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/mui.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/common.js?a=17"></script>
	</head>
<body>
		<div class="title">
				 <span class="mui-action-back mui-icon mui-icon-back"></span>${product.product_name}
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
		<div class="mui-content">
			<div class="title">
				 ${product.product_name}
			</div>
			<ul class="mui-table-view">
				 <li class="mui-table-view-cell">Ref Price :   ${product.product_price}</li>
		         <li class="mui-table-view-cell">Loading Port :   Tianjin</li>
		         <li class="mui-table-view-cell">Payment Terms :   TT or LC</li>
		         <li class="mui-table-view-cell">Min Order Qty :   ${product.min_order_qty} pc</li>
		         <li class="mui-table-view-cell">Supply Capability :    ${product.mon_supply_capability}/month</li>
			</ul>
			<div class="title">
				 Sino-Sources Service Pledge
			</div>
			<ul class="mui-table-view">
				 <li class="mui-table-view-cell">Quality Product</li>
		         <li class="mui-table-view-cell">Order On-line Tracking</li>
		         <li class="mui-table-view-cell">Timely Delivery</li>
		         <li class="mui-table-view-cell">Credit Rating</li>
		         <li class="mui-table-view-cell">Credit Services</li>
		         <li class="mui-table-view-cell">Credit Purchasing</li>
			</ul>
			<div class="mui-content-padded">
				${product.product_detail}
			</div>
		</div>

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
		monitor_link("#popularpuducts");
		monitor_link("#newproducts");
		monitor_link("#typelist");
	</script>
</html>