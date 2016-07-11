<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<div id="toolbar" class="btn-group">
    <a class="btn btn-primary" href="/jxsite/jxcreatearticle" role="button"><i class="glyphicon glyphicon-plus">新建文章</i></a>
    <a class="btn btn-success" href="/jxsite/" role="button"><i class="glyphicon glyphicon-home">首页预览</i></a>
</div>
<ehang:AjaxGridTable id="articlelist" resultname="articlelist" expname="操作">
	<c:forEach var="item" items="${articlelist.resultlist}"  varStatus="flag">
      		<tr>
      			<td>${flag.count}</td>
      			<td><nobr><a href="/jxsite/articletype/${item.moduleid}.html" target="_blank">${item.modulename}</a></nobr></td>
      			<td><nobr>${item.articlename}</nobr></td>
      			<td><nobr>${item.updatestaff}</nobr></td>
      			<td><nobr>${item.updatetime}</nobr></td>
      			<td><nobr>${item.statename}</nobr></td>
      			<td>
      				<a class="btn btn-primary" href="/jxsite/article/${item.articleid}.html" role="button" target="_blank"><i class="glyphicon glyphicon-eye-open">预览</i></a>
      				<c:if test="${item.state==0}">
      					<a class="btn btn-success" href="#" role="button" onclick="publisharticle('${item.modartid}',this)"><i class="glyphicon glyphicon-ok">发布</i></a>
      					<a class="btn btn-warning" href="/jxsite/updatearticle/${item.articleid}.html" role="button" ><i class="glyphicon glyphicon-pencil">修改</i></a>
      					<a class="btn btn-danger" href="#" role="button" onclick="articledelete('${item.modartid}',this)"><i class="glyphicon glyphicon-remove">删除</i></a>
      				</c:if>
      				<c:if test="${item.state==1}">
      					<a class="btn btn-danger" href="#" role="button" onclick="delpublisharticle('${item.modartid}',this)"><i class="glyphicon glyphicon-remove">撤销发布</i></a>
      					<a class="btn btn-warning" href="/jxsite/updatearticle/${item.articleid}.html" role="button" ><i class="glyphicon glyphicon-pencil">修改</i></a>
      				</c:if>
      				<c:if test="${item.state==2}">
      					<a class="btn btn-success" href="#" role="button" onclick="publisharticle('${item.modartid}',this)"><i class="glyphicon glyphicon-ok">重新发布</i></a>
      					<a class="btn btn-warning" href="/jxsite/updatearticle/${item.articleid}.html" role="button" ><i class="glyphicon glyphicon-pencil">修改</i></a>
      					<a class="btn btn-danger" href="#" role="button" onclick="articledelete('${item.modartid}',this)"><i class="glyphicon glyphicon-remove">删除</i></a>
      				</c:if>
      				
      			</td>
      		</tr>
      	</c:forEach>
</ehang:AjaxGridTable>
<script type="text/javascript">
<!--
	function publisharticle(id,btn)
	{
		$.get("/jxsite/articlepublish/"+id+".html", 
				{"id": id},
				function(data){
					  if(data=='ok')
					  {
						  $(btn).hide();
						  $(btn).closest("tr").children("td").eq(5).text("已发布");  
					  }
				});
	}
	
	function delpublisharticle(id,btn)
	{
		$.get("/jxsite/articledelpublish/"+id+".html", 
				{"id": id},
				function(data){
					  if(data=='ok')
					  {
						  $(btn).hide();
						  $(btn).closest("tr").children("td").eq(5).text("未发布");  
					  }
				});
	}
	
	function articledelete(id,btn)
	{
		$.get("/jxsite/articledelete/"+id+".html", 
				{"id": id},
				function(data){
					  if(data=='ok')
					  {
						  //$(btn).hide();
						  $(btn).closest("tr").children("td").eq(5).text("已删除");  
					  }
				});
	}

-->
</script>
