<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>

<div class="form-group">
	<div class="col-sm-6">
		<div class="panel panel-primary">
			<div class="panel-heading">已有角色</div>
			<div class="panel-body">
				<!-- 已有角色 -->
				<div id="hasrolelist">
					<ehang:GridTableNoPage id="hasrolelist" resultname="hasrolelist" expname="操作">
						<c:forEach var="item" items="${hasrolelist.resultlist}"  varStatus="flag">
					      		<tr>
					      			<td>${flag.count}</td>
					      			<td>${item.get('staffid')}</td>
					      			<td>${item.get('rolename')}</td>
					      			<td>${item.get('roletypename')}</td>
					      			<td><a href="#" data-toggle="modal" data-target="#userRoleModal" data-type="delete"
					      						data-addnum="${flag.count}"
					      						data-staffid = "${item.get('staffid')}"
					      						data-userroleid="${item.get('userroleid')}"
					      			 			data-rolename="${item.get('rolename')}"
					      			 			data-roletype="${item.get('roletype')}"
					      			 			>删除角色</a></td>
					      		</tr>
					      	</c:forEach>
					</ehang:GridTableNoPage>
				</div>
			</div>
		</div>
	</div>
	<div class="col-sm-6">
		<div class="panel panel-primary">
			<div class="panel-heading">未分配角色</div>
			<div class="panel-body">
				<!-- 未分配角色 -->
				<div id="norolelist">
					<ehang:GridTableNoPage id="norolelist" resultname="norolelist" expname="操作">
						<c:forEach var="item" items="${norolelist.resultlist}"  varStatus="flag">
					      		<tr>
					      			<td>${flag.count}</td>
					      			<td>${item.get('rolename')}</td>
					      			<td>${item.get('roletypename')}</td>
					      			<td><a href="#" data-toggle="modal" data-target="#userRoleModal" data-type="addRoleToUser"
					      						data-addnum="${flag.count}"
					      						data-staffid="${staffid}"
					      						data-staffname="${staffname}"
					      						data-rolename="${item.get('rolename')}"
					      			 			data-roletype="${item.get('roletype')}"
					      			 			data-roleid="${item.get('roleid')}"
					      			 			data-roletypename="${item.get('roletypename')}"
					      			 			>分配角色</a></td>
					      		</tr>
					      	</c:forEach>
					</ehang:GridTableNoPage>
				</div>
			</div>
		</div>
	</div>
</div>


