<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>

<div class="form-group">
	<div class="col-sm-6">
		<div class="panel panel-primary">
			<div class="panel-heading">已有权限</div>
			<div class="panel-body">
					<!-- 已有权限 -->
					<div id="hasfunctionlist">
						<ehang:GridTableNoPage id="hasfunction" resultname="hasfunctionlist" expname="操作">
							<c:forEach var="item" items="${hasfunctionlist.resultlist}"  varStatus="flag">
						      		<tr>
						      			<td>${flag.count}</td>
						      			<td>${item.get('rolename')}</td>
						      			<td>${item.get('functionname')}</td>
						      			<td>${item.get('functiontypename')}</td>
						      			<td><a href="#" data-toggle="modal" data-target="#funcRoleModal" data-type="delete"
						      						data-addnum="${flag.count}"
						      						data-funcroleid = "${item.get('funcroleid')}"
						      			 			data-functiontype="${item.get('functiontype')}"
						      			 			data-functionname="${item.get('functionname')}"
						      			 			data-remark="${item.get('remark')}"
						      			 			>删除权限</a></td>
						      		</tr>
						      	</c:forEach>
						</ehang:GridTableNoPage>
					</div>
			</div>
			</div>
	</div>
	<div class="col-sm-6">
		<div class="panel panel-primary">
			<div class="panel-heading">未分配权限</div>
			<div class="panel-body">
		<!-- 未分配权限 -->
				<div id="nofunctionlist">
					<ehang:GridTableNoPage id="nofunction" resultname="nofunctionlist" expname="操作">
						<c:forEach var="item" items="${nofunctionlist.resultlist}"  varStatus="flag">
					      		<tr>
					      			<td>${flag.count}</td>
					      			<td>${item.get('functionname')}</td>
					      			<td>${item.get('functiontypename')}</td>
					      			<td>${item.get('remark')}</td>
					      			<td><a href="#" data-toggle="modal" data-target="#funcRoleModal" data-type="addFunc"
					      						data-addnum="${flag.count}"
					      						data-roleid="${roleid}"
					      						data-rolename="${rolename}"
					      						data-functionid="${item.get('functionid')}"
					      			 			data-functiontype="${item.get('functiontype')}"
					      			 			data-functionname="${item.get('functionname')}"
					      			 			data-remark="${item.get('remark')}"
					      			 			>分配权限</a></td>
					      		</tr>
					      	</c:forEach>
					</ehang:GridTableNoPage>
				</div>
			</div>
		</div>
	</div>
</div>


