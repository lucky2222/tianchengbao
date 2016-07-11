<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>

<ehang:AjaxGridTable id="articlelist" resultname="articlelist" expname="操作">
	<c:forEach var="item" items="${articlelist.resultlist}"  varStatus="flag">
      		<tr>
      			<td>${item.get('id')}</td>
      			<td>${item.get('title')}</td>
      			<td>${item.get('articledesc')}</td>
      			<td>${item.get('updatetime')}</td>
      			<td>${item.get('remark')}</td>
      			<td>
      				<a href="/showProductArticle/${item.get('id')}" target="_blank" title="ArticleDetail">查看</a>
      				<a href="/delProductArticle/${item.get('id')}"   title="ArticleDetail">删除</a>
      			</td>
      		</tr>
      	</c:forEach>
</ehang:AjaxGridTable>