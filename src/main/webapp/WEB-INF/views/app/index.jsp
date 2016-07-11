<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<title>index</title>
		<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/app/mui.min.css?a=2">
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/mui.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/common.js?a=17"></script>
	</head>

	<body>
		<!--
        	描述：搜索
        -->
        <div class="mui-input-row mui-search">
			<input id="searchbox" type="search" class="mui-input-clear" placeholder="input keyword ...">
			<button id="searchbutton" type="button" class="mui-btn mui-btn-warning mui-right">
		        search
		    </button>
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
        	描述：分类
        -->
        
		<div id="typelist" class="mui-content" style="background-color:#fff">
			 <h5 style="background-color:#fff">Classification</h5>
			 <div style="background-color:#F5F5F5;padding: 10px;">
			    <ul class="mui-table-view mui-grid-view">
			        <li class="mui-table-view-cell mui-media mui-col-xs-4">
			            <a href="http://www.sino-sources.com/app/typelist/1">
			                <img class="mui-media-object" src="${pageContext.request.contextPath}/resources/app/image/steel.jpg">
			                <div class="mui-media-body">Steel</div></a></li>
			        <li class="mui-table-view-cell mui-media mui-col-xs-4">
			            <a href="http://www.sino-sources.com/app/typelist/4">
			                <img class="mui-media-object" src="${pageContext.request.contextPath}/resources/app/image/Aluminum.jpg">
			                <div class="mui-media-body">Aluminum</div></a></li>
			        <li class="mui-table-view-cell mui-media mui-col-xs-4">
			            <a href="http://www.sino-sources.com/app/typelist/15"><img class="mui-media-object" src="${pageContext.request.contextPath}/resources/app/image/Formwork.jpg">
			                <div class="mui-media-body">Formwork & Scaffolding</div></a></li>
			        <li class="mui-table-view-cell mui-media mui-col-xs-4">
			            <a href="http://www.sino-sources.com/app/typelist/16">
			                <img class="mui-media-object" src="${pageContext.request.contextPath}/resources/app/image/Plastic.jpg">
			                <div class="mui-media-body">Plastic</div></a></li>
			        <li class="mui-table-view-cell mui-media mui-col-xs-4">
			            <a href="http://www.sino-sources.com/app/typelist/17"><img class="mui-media-object" src="${pageContext.request.contextPath}/resources/app/image/Building.jpg">
			                <div class="mui-media-body">Building Matrials</div></a></li>
			        <li class="mui-table-view-cell mui-media mui-col-xs-4">
			            <a href="http://www.sino-sources.com/app/typelist/63">
			                <img class="mui-media-object" src="${pageContext.request.contextPath}/resources/app/image/Daily.jpg">
			                <div class="mui-media-body">Daily Supplies</div></a></li>
			    </ul>
			</div>
		</div>
		<!--
        	描述：新品展示
        -->
		<div class="title">
			New Products
		</div>
		<ul id="newproducts" class="mui-table-view mui-table-view-chevron">
			<c:forEach var="item" items="${newProduct}"  varStatus="flag">
                 <li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right" href="http://www.sino-sources.com/app/productinfo/${item.product_id}">
					<img class="mui-media-object mui-pull-left" src="${pageContext.request.contextPath}../uploads/${item.show_img}">
					<div class="mui-media-body">
						${item.product_name}
						<p class='mui-ellipsis'>US $${item.product_price}</p>
					</div>
				</a>
			</li>
	      	</c:forEach> 
		</ul>
		<!--
        	描述：受欢迎产品展示
        -->
		<div class="title">
			Popular Categories
		</div>
		<ul id="popularpuducts" class="mui-table-view">
			<c:forEach var="item" items="${popuProduct}"  varStatus="flag">
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right" href="http://www.sino-sources.com/app/productinfo/${item.product_id}">
					<img class="mui-media-object mui-pull-left" src="${pageContext.request.contextPath}../uploads/${item.show_img}">
					<div class="mui-media-body">
						${item.product_name}
						<p class='mui-ellipsis'>US $${item.product_price}</p>
					</div>
				</a>
			</li>
			</c:forEach>
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
		
		document.querySelector("#searchbox").addEventListener('keydown', function(){
		    if(event.keyCode == 13){
		        // 收回弹出的软键盘
		        document.activeElement.blur();
		        search();
		    }
		}, false);
		
		document.getElementById("searchbutton").addEventListener('tap', function(){
		        search();
		}, false);
		
		function search(){
		   // 收回弹出的软键盘
		   document.activeElement.blur();
		   var urlpath = "http://www.sino-sources.com/app/search/"+encodeURI(document.getElementById('searchbox').value);
		   //搜索
		   mui.openWindow({
				url:urlpath,
				id: 'searchlist',
    			createNew:true
			});
		}
	</script>
</html>