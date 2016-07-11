<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<ehang:Main>
	<form action="${pageContext.request.contextPath}/sysmanage/menubytags" method="POST" class="form-horizontal">
	<div class="form-group">
	    <label for="menuname" class="col-sm-1 control-label">菜单名称</label>
	    <div class="col-sm-4">
			<input type="text" id="menuname" name="menuname" class="form-control" placeholder="菜单名称"  value="${menuname}">
	    </div>
	    
	    <label for="menufile" class="col-sm-1 control-label">菜单路径</label>
	    <div class="col-sm-4">
			<input type="text" id="menufile" name="menufile" class="form-control" placeholder="菜单路径"  value="${menufile}">
	    </div>
	    
	    <div class="col-sm-2">
			<input type="submit" value="查询" class="btn btn-default btn-seach">
	    </div>
	    
	</div>
	</form>
	
	
	
	
	<ehang:Ajax_Page  id="testpage" actionurl="${pageContext.request.contextPath}/sysmanage/menubytags" >
	
	</ehang:Ajax_Page>
	<script>
		$('form').submit(function(){ 
			ajax_page_init($("#testpage"),"",$(this).serialize());
			return false; 
		});
	</script>
</ehang:Main>
