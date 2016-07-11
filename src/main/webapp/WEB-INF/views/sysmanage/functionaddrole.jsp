<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<ehang:Main>
	<form action="${pageContext.request.contextPath}/sysmanage/functionaddrole" method="POST" class="form-horizontal">
	<div class="form-group">
	    <label for="role" class="col-smjsxz control-label">角色选择：</label>
	    <div class="col-sm-3">
			<ehang:TableSelect valuename="roleid" showname="rolename" resultname="roleselectlist" id="role"></ehang:TableSelect>
	    </div>
	    
	    <div class="col-sm-1">
			<input type="submit" value="查询" class="btn btn-default btn-seach">
	    </div>
	    
	</div>
	</form>
	
	<div id="functionlist">
		<div id ="panel_ajax_page">
			<div class="col-sm-6">
				<div class="panel panel-primary">
				  <div class="panel-heading">已有权限</div>
				  <div class="panel-body">
				  </div>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="panel panel-primary">
				  <div class="panel-heading">未分配权限</div>
				  <div class="panel-body">
				  </div>
				</div>
			</div>
            <div class="clearfix"></div>
		</div>
	</div>
	
	<div class="modal fade" id="funcRoleModal" tabindex="-1" role="dialog" aria-labelledby="funcRoleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="funcRoleModalLabel">权限分配</h4>
	      </div>
	      <div class="modal-body">
	      	<form class="form-horizontal">
	      		<div class="form-group">
		            <label for="addfunctionname" class="col-sm-2 control-label"><font color="red">&lowast;</font>权限名称:</label>
		            <div class="col-sm-4">
		            	<input type="text" class="form-control" id="addfunctionname" name="addfunctionname">
		            </div>
		         
		            <label for="addfunctiontype" class="col-sm-2 control-label"><font color="red">&lowast;</font>权限类型:</label>
		            <div class="col-sm-4">
		            	<select id="addfunctiontype" name="addfunctiontype" class="form-control" >
						  <option value="0">菜单权限</option>
						  <option value="1">功能权限</option>
						  <option value="2">数据权限</option>
						</select>
		            </div>
		        </div>
		        <div class="form-group">    
		            <label for="addremark" class="col-sm-2 control-label">备注:</label>
		            <div class="col-sm-9">
		            	<textarea id="addremark" class="form-control" rows="3"></textarea>
		            </div>
		        </div>
		        <input id="addnum" name="addnum" type="hidden" value="">
		        <input id="addroleid" name="addroleid" type="hidden" value="">
		        <input id="addrolename" name="addrolename" type="hidden" value="">
		        <input id="addfunctionid" name="addfunctionid" type="hidden" value="">
		        <input id="addfuncroleid" name="addfuncroleid" type="hidden" value="">
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">放弃</button>
	        <button id = "addfunctionrole" type="button" class="btn btn-primary" operatetype="">权限分配</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/sysmanage/functionmanage.js"></script>
	<script>
		$('form').submit(function(){ 
			ajax_page_init($("#functionlist"),"${pageContext.request.contextPath}/sysmanage/functionaddroleview",$(this).serialize());
			return false; 
		});
	</script>
</ehang:Main>
