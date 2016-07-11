<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<ehang:Main>
	<form action="${pageContext.request.contextPath}/sysmanage/rolemanage" method="POST" class="form-horizontal">
	<div class="form-group">
	    <label for="rolename" class="col-sm-1 control-label">角色名称</label>
	    <div class="col-sm-3">
			<input type="text" id="rolename" name="rolename" class="form-control" placeholder="权限名称"  value="${functionname}">
	    </div>
	    
	    <label for="roletype" class="col-sm-1 control-label">角色类型</label>
	    <div class="col-sm-3">
			<select id="roletype" name="roletype" class="form-control" >
			  <option value="0">管理员</option>
			  <option value="1">操作员</option>
			  <option value="2">部门管理员</option>
			  <option value="9">超级管理员</option>
			</select>
	    </div>
	    
	    <div class="col-sm-1">
			<input type="submit" value="查询" class="btn btn-default">
	    </div>
	    
	</div>
	</form>
	
	<ehang:Ajax_Page  id="rolelist" actionurl="${pageContext.request.contextPath}/sysmanage/rolemanageview">
	</ehang:Ajax_Page>
	
	<div class="modal fade" id="roleModal" tabindex="-1" role="dialog" aria-labelledby="roleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="roleModalLabel">新增角色</h4>
	      </div>
	      <div class="modal-body">
	      	<form class="form-horizontal">
	      		<div class="form-group">
		           <label for="addrolename" class="col-sm-2 control-label">角色名称</label>
				    <div class="col-sm-4">
						<input type="text" id="addrolename" name="addrolename" class="form-control" placeholder="权限名称"  value="">
				    </div>
				    
		            <label for="addroletype" class="col-sm-2 control-label"><font color="red">&lowast;</font>权限类型:</label>
		            <div class="col-sm-4">
		            	<select id="addroletype" name="addroletype" class="form-control" >
						  <option value="0">管理员</option>
						  <option value="1">操作员</option>
						  <option value="2">部门管理员</option>
						  <option value="9">超级管理员</option>
						</select>
		            </div>
		            </div>
		            <div class="form-group">
		            <label for="addremark" class="col-sm-2 control-label">备注:</label>
		            <div class="col-sm-10">
		            	<textarea id="addremark" class="form-control" rows="3"></textarea>
		            </div>
		        </div>
		        <input id="addroleid" name="addfunctionid" type="hidden" value="">
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">放弃</button>
	        <button id = "addrole" type="button" class="btn btn-primary" operatetype="">新增角色</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/sysmanage/functionmanage.js"></script>
	<script>
		$('form').submit(function(){ 
			ajax_page_init($("#rolelist"),"",$(this).serialize());
			return false; 
		});
	</script>
</ehang:Main>
