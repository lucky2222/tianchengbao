<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<div id="toolbar" class="btn-group">
	    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#roleModal" data-type="addrole">
	        <i class="glyphicon glyphicon-plus">新增角色</i>
	    </button>
	    <button type="button" class="btn btn-link" >
	        <i class="glyphicon glyphicon-pencil"><a href="./functionaddrole" class="navbar-link">权限管理</a></i>
	    </button>
	    <button type="button" class="btn btn-link" >
	        <i class="glyphicon glyphicon-log-in"><a href="./functionmanage" class="navbar-link">权限定义</a></i>
	    </button>
	    <button type="button" class="btn btn-link" >
	        <i class="glyphicon glyphicon-random"><a href="./addroletouser" class="navbar-link">员工角色分配</a></i>
	    </button>
	</div>
<ehang:AjaxGridTable id="rolelist" resultname="rolelist" expname="操作">
	<c:forEach var="item" items="${rolelist.resultlist}"  varStatus="flag">
      		<tr>
      			<td>${flag.count}</td>
      			<td><a href="#" data-toggle="modal" data-target="#roleModal" data-type="update"
      						data-roleid="${item.get('roleid')}"
      			 			data-rolename="${item.get('rolename')}"
      			 			data-roletype="${item.get('roletype')}"
      			 			data-remark="${item.get('remark')}"
      			 			>${item.get('rolename')}</a></td>
      			<td>${item.get('roletypename')}</td>
      			<td>${item.get('updatestaff')}</td>
      			<td>${item.get('updatetime')}</td>
      			<td>${item.get('remark')}</td>
      			<td><a href="#" data-toggle="modal" data-target="#roleModal" data-type="delete"
      						data-roleid="${item.get('roleid')}"
      			 			data-rolename="${item.get('rolename')}"
      			 			data-roletype="${item.get('roletype')}"
      			 			data-remark="${item.get('remark')}"
      			 			>删除</a></td>
      		</tr>
      	</c:forEach>
</ehang:AjaxGridTable>