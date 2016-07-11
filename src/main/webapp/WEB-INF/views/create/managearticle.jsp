<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"
	session="false"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<ehang:Main>
	<form action="${pageContext.request.contextPath}/create/managearticleview" method="POST" class="form-horizontal">
		<div class="form-group">
		    <label for="title" class="col-sm-2 control-label">文章名称</label>
		    <div class="col-sm-8">
				<input type="text" id="title" name="title" class="form-control" placeholder="文章名称"  value="${codepath}">
		    </div>
		</div>
		<div class="form-group">
		    <label for="startdate" class="col-sm-2 control-label">开始时间</label>
		    <div class="col-sm-3">
				<input type="text" id="startdate" name="startdate" class="form-control input-sm" placeholder="开始时间"  value="${startdate}">
		    </div>
		    
		    <label for="enddate" class="col-sm-2 control-label">结束时间：</label>
		    <div class="col-sm-3">
				<input type="text" id="enddate" name="enddate" class="form-control input-sm" placeholder="结束时间"  value="${enddate}">
		    </div>
	    
		    <div class="col-sm-2">
				<input type="submit" value="查询" class="btn btn-default">
		    </div>
	    
		</div>
	</form>
	
	<ehang:Ajax_Page  id="articlelist" actionurl="${pageContext.request.contextPath}/create/managearticleview">
	</ehang:Ajax_Page>
	
	
</ehang:Main>
<script>
$(function() {
		$('form').submit(function(){
			ajax_page_init($("#articlelist"),"",$(this).serialize());
			return false; 
		});
		
		$("[name='startdate']").datepicker({
			dateFormat : "yy-mm-dd"
		//在这里进行插件的属性设置  
		});
		$("[name='enddate']").datepicker({
			dateFormat : "yy-mm-dd"
		//在这里进行插件的属性设置  
		});
	});
</script>