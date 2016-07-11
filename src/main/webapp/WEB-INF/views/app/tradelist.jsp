<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<title>Order Center</title>
		<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/app/mui.min.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/mui.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/app/common.js?a=20"></script>
	</head>

	<body>
		<div class="title">
				 <span class="mui-action-back mui-icon mui-icon-back"></span>
			</div>
	<div class="mui-content">
		<ul id="detaillist" class="mui-table-view">
		<li class="mui-table-view-cell mui-collapse mui-active">
				<a class="mui-navigate-right" href="##">Current order</a>
				<div class="mui-collapse-content">
					<c:forEach var="item" items="${result.resultlist}"  varStatus="flag">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell" href="http://www.sino-sources.com/app/orderdetail/${item.SalesOrderNo}?orderdetail">Contract No:<span class="mui-badge mui-badge-primary">${item.SalesOrderNo}</span></li>
				            <li class="mui-table-view-cell">Payment type: <span class="mui-badge">${item.Payment}</span></li>
				            <li class="mui-table-view-cell">Totale Amount:<span class="mui-badge">${item.TotalPurchaseAmount}</span></li>
				            <c:if test="${item.PaidAmount>0}">
				            	<li class="mui-table-view-cell" href="http://www.sino-sources.com/app/showIncomedetail/${item.SalesOrderNo}?showIncomedetail">Paid Amount:<span class="mui-badge mui-badge-primary">${item.PaidAmount}</span></li>
				            </c:if>
				            <c:if test="${item.PaidAmount==0}">
				            	<li class="mui-table-view-cell">Paid Amount:<span class="mui-badge mui-badge-primary">${item.PaidAmount}</span></li>
				            </c:if>
				            <li class="mui-table-view-cell">BALANCE:<span class="mui-badge">${item.TotalPurchaseAmount - item.PaidAmount}</span></li>
				            <li class="mui-table-view-cell">DUE DATE:<span class="mui-badge">${item.collectiondate}</span></li>
				            <li class="mui-table-view-cell"  href="http://www.sino-sources.com/app/showShipmentsdetail/${item.SalesOrderNo}?showShipmentsdetail">B/L:<span class="mui-badge mui-badge-primary">view</span></li>	            
						</ul>
					</c:forEach>
					
				</div>
			</li>
			<li class="mui-table-view-cell mui-collapse">
				<a class="mui-navigate-right" href="##">Historical order</a>
				<div class="mui-collapse-content">
					<c:forEach var="item" items="${result1.resultlist}"  varStatus="flag">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell" href="http://www.sino-sources.com/app/orderdetail/${item.SalesOrderNo}?orderdetailh">Contract No:<span class="mui-badge mui-badge-primary">${item.SalesOrderNo}</span></li>
				            <li class="mui-table-view-cell">Payment type: <span class="mui-badge">${item.Payment}</span></li>
				            <li class="mui-table-view-cell">Totale Amount:<span class="mui-badge">${item.TotalPurchaseAmount}</span></li>
				            <c:if test="${item.PaidAmount>0}">
				            	<li class="mui-table-view-cell" href="http://www.sino-sources.com/app/showIncomedetail/${item.SalesOrderNo}?showIncomedetail2">Paid Amount:<span class="mui-badge mui-badge-primary">${item.PaidAmount}</span></li>
				            </c:if>
				            <c:if test="${item.PaidAmount==0}">
				            	<li class="mui-table-view-cell">Paid Amount:<span class="mui-badge mui-badge-primary">${item.PaidAmount}</span></li>
				            </c:if>
							<li class="mui-table-view-cell">BALANCE:<span class="mui-badge">${item.TotalPurchaseAmount - item.PaidAmount}</span></li>
				            <li class="mui-table-view-cell">DUE DATE:<span class="mui-badge">${item.collectiondate}</span></li>
				            <li class="mui-table-view-cell" href="http://www.sino-sources.com/app/showShipmentsdetail/${item.SalesOrderNo}?showShipmentsdetail2">B/L:<span class="mui-badge mui-badge-primary">view</span></li>	            
						</ul>
					</c:forEach>
				</div>
			</li>
		</ul>
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
		monitor_link("#detaillist");
		monitor_li_link("#detaillist");
	</script>
</html>