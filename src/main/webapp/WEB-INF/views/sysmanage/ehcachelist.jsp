<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<ehang:Main>
	
<div class="container-fluid">
<div class="row">
<table data-toggle="table" data-show-columns="true" data-search="true" data-show-toggle="true" data-toolbar="#toolbar"  id="cachelist" >
		<thead>
        <tr class="info">
        	<th data-field="缓存名称" >缓存名称</th>
        	<th data-field="行名称" >行名称</th>
        	<th data-field="操作" >操作</th>
        </tr>
      	</thead>
		<tbody>
			<c:forEach var="item" items="${cachelist}"  varStatus="flag">
				<td rowspan="${item.value.size()}">${item.key}</td>
				<c:forEach var="dataitem" items="${item.value}" varStatus="itemflag">
					<td>${dataitem.key}</td>
				</c:forEach>
				<td rowspan="${item.value.size()}"><a class="btn btn-warning" href="${pageContext.request.contextPath}/sysmanage/reflashcache/${item.key}" role="button">重新载入</a></td>
			</c:forEach>
		</tbody>
	</table>
</div>
</div>	
<!-- 表尾 end -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/bootstrap-table.min.css">
<!-- Latest compiled and minified Locales -->
<script src="${pageContext.request.contextPath}/resources/js/sysmanage/bootstrap-table.min.js"></script>
<!-- Latest compiled and minified Locales -->
<script src="${pageContext.request.contextPath}/resources/js/sysmanage/bootstrap-table-zh-CN.min.js"></script>
</ehang:Main>