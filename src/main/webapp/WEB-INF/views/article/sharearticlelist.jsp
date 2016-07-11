<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<ehang:Main>
	<form action="${pageContext.request.contextPath}/article/sharearticlelist" method="POST" class="form-horizontal">
	<div class="form-group">
	    <label for="articlename" class="col-sm-1 control-label">文章名称</label>
	    <div class="col-sm-3">
			<input type="text" id="articlename" name="articlename" class="form-control" placeholder="文章名称"  value="${articlename}">
	    </div>
	    
	    <div class="col-sm-1">
			<input type="submit" value="查询" class="btn btn-default">
	    </div>
	    
	</div>
	</form>
	
	<ehang:Ajax_Page  id="articlelist" actionurl="${pageContext.request.contextPath}/sharearticlelistview">
	</ehang:Ajax_Page>
	
	<script>
		$('form').submit(function(){ 
			ajax_page_init($("#articlelist"),"",$(this).serialize());
			return false; 
		});
	</script>
</ehang:Main>
