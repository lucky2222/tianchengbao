<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<ehang:Main>
	<form action="${pageContext.request.contextPath}/sysmanage/addroletouser" method="POST" class="form-horizontal">
	<div class="form-group">
	    <label for="staffname" class="col-smjsxz control-label">员工选择：</label>
	    <div class="col-sm-3">
			<ehang:AutoComplete id="staffid" showid="staffname" callback="func"
			 minChars="2" showfieldid="staffname" valuefieldid="staffid"
			urlref="${pageContext.request.contextPath}/sysmanage/addroleautocomplete" ></ehang:AutoComplete>
	    </div>
	    
	    <div class="col-sm-1">
			<input type="submit" value="查询" class="btn btn-default btn-seach">
	    </div>
	    
	</div>
	</form>
	
	<div id="userrolelist">
		<div id ="panel_ajax_page">
			<div class="col-sm-6">
				<div class="panel panel-primary">
				  <div class="panel-heading">已有角色</div>
				  <div class="panel-body">
				  </div>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="panel panel-primary">
				  <div class="panel-heading">未分配角色</div>
				  <div class="panel-body">
				  </div>
				</div>
			</div>
             <div class="clearfix"></div>
		</div>
	</div>
	
	<div class="modal fade" id="userRoleModal" tabindex="-1" role="dialog" aria-labelledby="userRoleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="userRoleModalLabel">角色分配</h4>
	      </div>
	      <div class="modal-body">
	      	<form class="form-horizontal">
	      		<div class="form-group">
		            <label for="addrolename" class="col-sm-2 control-label"><font color="red">&lowast;</font>角色名称:</label>
		            <div class="col-sm-4">
		            	<input type="text" class="form-control" id="addrolename" name="addrolename">
		            </div>
		         
		            <label for="addroletype" class="col-sm-2 control-label"><font color="red">&lowast;</font>角色类型:</label>
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
		            <div class="col-sm-9">
		            	<textarea id="addremark" class="form-control" rows="3"></textarea>
		            </div>
		        </div>
		        <input id="addnum" name="addnum" type="hidden" value="">
		        <input id="addroleid" name="addroleid" type="hidden" value="">
		         <input id="addrolename" name="addrolename" type="hidden" value="">
		        <input id="addstaffid" name="addstaffid" type="hidden" value="">
		        <input id="adduserroleid" name="adduserroleid" type="hidden" value="">
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">放弃</button>
	        <button id = "addroletouser" type="button" class="btn btn-primary" operatetype="">权限分配</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/sysmanage/functionmanage.js"></script>
	<script>
		$('form').submit(function(){ 
			ajax_page_init($("#userrolelist"),"${pageContext.request.contextPath}/sysmanage/addroletouserview",$(this).serialize());
			return false; 
		});
		
	</script>
</ehang:Main>
