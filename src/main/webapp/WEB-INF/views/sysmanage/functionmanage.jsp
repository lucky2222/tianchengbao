<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<ehang:Main>
	<form action="${pageContext.request.contextPath}/sysmanage/menubytags" method="POST" class="form-horizontal">
	<div class="form-group">
	    <label for="menuname" class="col-sm-1 control-label">权限名称</label>
	    <div class="col-sm-3">
			<input type="text" id="functionname" name="functionname" class="form-control" placeholder="权限名称"  value="${functionname}">
	    </div>
	    
	    <label for="menufile" class="col-sm-1 control-label">权限编码</label>
	    <div class="col-sm-3">
			<input type="text" id="functionright" name="functionright" class="form-control" placeholder="权限编码"  value="${functionright}">
	    </div>
	    
	    <label for="functiontype" class="col-sm-1 control-label">权限类型</label>
	    <div class="col-sm-2">
			<select id="functiontype" name="functiontype" class="form-control" >
			  <option value="0">菜单权限</option>
			  <option value="1">功能权限</option>
			  <option value="2">数据权限</option>
			</select>
	    </div>
	    
	    <div class="col-sm-1">
			<input type="submit" value="查询" class="btn btn-default btn-seach">
	    </div>
	    
	</div>
	</form>
	
	<ehang:Ajax_Page  id="functionlist" actionurl="${pageContext.request.contextPath}/sysmanage/functionview">
	</ehang:Ajax_Page>
	
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">新增权限</h4>
	      </div>
	      <div class="modal-body">
	      	<form class="form-horizontal">
	      		<div class="form-group">
		            <label for="addfunctionname" class="col-sm-2 control-label"><font color="red">&lowast;</font>权限名称:</label>
		            <div class="col-sm-3">
		            	<input type="text" class="form-control" id="addfunctionname" name="addfunctionname">
		            </div>
		            <label for="addfunctionright" class="col-sm-2 control-label"><font color="red">&lowast;</font>权限编码:</label>
		            <div class="col-sm-3">
		            	<input type="text" class="form-control" id="addfunctionright" name="addfunctionright">
		            </div>
		        </div>
		        <div class="form-group">
		            <label for="addfunctiontype" class="col-sm-2 control-label"><font color="red">&lowast;</font>权限类型:</label>
		            <div class="col-sm-3">
		            	<select id="addfunctiontype" name="addfunctiontype" class="form-control" >
						  <option value="0">菜单权限</option>
						  <option value="1">功能权限</option>
						  <option value="2">数据权限</option>
						</select>
		            </div>
		            
		            <label for="addremark" class="col-sm-2 control-label">备注:</label>
		            <div class="col-sm-3">
		            	<textarea id="addremark" class="form-control" rows="3"></textarea>
		            </div>
		        </div>
		        <input id="addfunctionid" name="addfunctionid" type="hidden" value="">
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-fanqi" data-dismiss="modal">放弃</button>
	        <button id = "addfunction" type="button" class="btn btn-primary" operatetype="">新增权限</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/sysmanage/functionmanage.js"></script>
	<script>
		$('form').submit(function(){ 
			ajax_page_init($("#functionlist"),"",$(this).serialize());
			return false; 
		});
	</script>
</ehang:Main>
