<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<div id="toolbar" class="btn-group">
	    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-type="addfunction">
	        <i class="glyphicon glyphicon-plus">新增权限</i>
	    </button>
	    <button type="button" class="btn btn-link" >
	        <i class="glyphicon glyphicon-pencil"><a href="./functionaddrole" class="navbar-link">权限管理</a></i>
	    </button>
	    <button type="button" class="btn btn-link" >
	        <i class="glyphicon glyphicon-log-in"><a href="./rolemanage" class="navbar-link">角色定义</a></i>
	    </button>
	    <button type="button" class="btn btn-link" >
	        <i class="glyphicon glyphicon-random"><a href="./addroletouser" class="navbar-link">员工角色分配</a></i>
	    </button>
	</div>
<ehang:AjaxGridTable id="functionlist" resultname="functionlist" expname="操作">
	<c:forEach var="item" items="${functionlist.resultlist}"  varStatus="flag">
      		<tr>
      			<td>${flag.count}</td>
      			<td><a href="#" data-toggle="modal" data-target="#myModal" data-type="update"
      						data-functionid="${item.get('functionid')}"
      						data-functionname="${item.get('functionname')}"
      			 			data-functionright="${item.get('functionright')}"
      			 			data-functiontype="${item.get('functiontype')}"
      			 			data-remark="${item.get('remark')}"
      			 			>${item.get('functionname')}</a></td>
      			<td>${item.get('functionright')}</td>
      			<td>${item.get('functiontypename')}</td>
      			<td>${item.get('updatestaff')}</td>
      			<td>${item.get('updatetime')}</td>
      			<td>${item.get('remark')}</td>
      			<td><a href="#" data-toggle="modal" data-target="#myModal" data-type="delete"
      						data-functionid="${item.get('functionid')}"
      						data-functionname="${item.get('functionname')}"
      			 			data-functionright="${item.get('functionright')}"
      			 			data-functiontype="${item.get('functiontype')}"
      			 			data-remark="${item.get('remark')}"
      			 			>删除</a></td>
      		</tr>
      	</c:forEach>
</ehang:AjaxGridTable>