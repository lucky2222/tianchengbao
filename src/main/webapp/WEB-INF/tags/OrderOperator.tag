<%@ tag pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 标签参数 -->

<%
	jspContext.setAttribute("operatorslist",
			request.getAttribute("orderoperlist"));
%>

<div class="reyfp">
	<ul>
		<c:if
			test="${(!empty operatorslist.堆装)||(!empty operatorslist.产装)||(!empty operatorslist.报关)}">
			<li class="zhyw"><span class="zhywspan">综合业务</span>
				<ol>
					<c:if test="${!empty operatorslist.堆装}">
						<li><span>堆装：</span>${operatorslist.堆装}</li>
					</c:if>
					<c:if test="${!empty operatorslist.产装}">
						<li><span>产装：</span>${operatorslist.产装}</li>
					</c:if>
					<c:if test="${!empty operatorslist.报关}">
						<li><span>报关：</span>${operatorslist.报关}</li>
					</c:if>
				</ol></li>
		</c:if>
	</ul>
	<ul>
		<c:if test="${!empty operatorslist.揽货员}">
			<li><span>揽货：</span>${operatorslist.揽货员}</li>
		</c:if>
		<c:if test="${!empty operatorslist.客服}">
			<li><span>客服：</span>${operatorslist.客服}</li>
		</c:if>
		<c:if test="${!empty operatorslist.运价}">
			<li><span>运价：</span>${operatorslist.运价}</li>
		</c:if>
		<c:if test="${!empty operatorslist.订舱}">
			<li><span>订舱：</span>${operatorslist.订舱}</li>
		</c:if>
		<c:if test="${!empty operatorslist.单证}">
			<li><span>单证：</span>${operatorslist.单证}</li>
		</c:if>
	</ul>
</div>