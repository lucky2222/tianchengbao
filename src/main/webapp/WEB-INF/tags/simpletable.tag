<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="resultname" required="true" rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->
<%
	jspContext.setAttribute("result",request.getAttribute(resultname));
%>
<div class="container-fluid">
<div class="table-responsive">
<table class="table table-bordered  table-striped table-condensed table-hover datatable">
		<thead>
        <tr>
        	<th>序号<input id="${id}_hidden_ordercondition" name="${id}_hidden_ordercondition" type="hidden" value="${result.orderbyfieldStr}"></th>
        	<c:forEach var="item" items="${result.fieldlist}"  varStatus="flag">
        		<th>${item.get('fieldname')}</th>
        	</c:forEach>
        </tr>
      	</thead>
      	<tbody>
      	<c:forEach var="rowitem" items="${result.resultlist}"  varStatus="flag">
      		<tr>
      			<td>${flag.count}</td>
      			<c:forEach var="colitem" items="${result.fieldlist}" >
      				<td>
      					<c:if test="${rowitem.containsKey(colitem.get('fieldid'))}">
      						${rowitem.get(colitem.get('fieldid'))}
      					</c:if>
      				</td>
      			</c:forEach>
      		</tr>
      	</c:forEach>
      	</tbody>
	</table>
</div>
</div>