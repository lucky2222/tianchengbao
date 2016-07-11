<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<ehang:Main>
	<ehang:AjaxGridTable id="detaillist" resultname="detaillist">
	<c:forEach var="item" items="${detaillist.resultlist}"  varStatus="flag">
      		<tr>
      			<td>${flag.count}</td>
      			<td><a href="#" data-toggle="modal" data-target="#roleModal" data-type="update"
      						data-articleid="${item.get('articleid')}"
      			 			>${item.get('username')}</a></td>
      			<td>${item.get('visitname')}</td>
      			<td>${item.get('updatetime')}</td>
      		</tr>
      	</c:forEach>
</ehang:AjaxGridTable>
</ehang:Main>
