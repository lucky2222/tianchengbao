<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="resultname" required="true" rtexprvalue="true" %>
<%@ attribute name="actionurl" required="true" rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->
<%
	if(actionurl!=null&&actionurl.length()>0&&actionurl.substring(0,1).equals("/"))
	{
		jspContext.setAttribute("actionurl",actionurl.substring(1));
	}
	jspContext.setAttribute("result",request.getAttribute(resultname));
%>
<div class="container-fluid">
<div class="row">
<input id="${id}_hidden_ordercondition" name="${id}_hidden_ordercondition" type="hidden" value="${result.orderbyfieldStr}">
<jsp:doBody/>
	<div class="container-fluid">
	<div class="row">
		<div class="col-sm-6 perpage" >
			<c:if test="${result.resultlist.size()>0}" var="name">
				<h5>显示第${result.fstart}至${result.end}项记录，共${result.allcount}项，共${result.allpage}页,转到第<input id="${id}_topagenum"  name="${id}_topagenum" type="text" size="1" maxlength="4" value="${result.pagenum}">页，每页显示 <select  id="${id}_perpagenum" name="${id}_perpagenum" >
						  	<option value=10>10</option>
						  	<option value=20>20</option>
						  	<option value=50>50</option>
						  	<option value=100>100</option>
						  </select>项</h5>
			</c:if>
		</div>
		
		<div class="col-sm-6 pagenumline" >
			<c:if test="${result.resultlist.size()>0}" var="name">
				<nav class="text-right">
					<ul class="pagination pagination-sm">
						<li><a href="#" class="goPageNum" pagenum="1">第一页</a></li>
						<c:if test="${result.pagenum>1}">
							<li><a href="#" class="goPageNum" pagenum="${result.prePagenum}">上一页</a></li>
						</c:if>
						<c:if test= "${result.pagenum<=1}">
							<li class="disabled"><a href="#">上一页</a></li>
						</c:if>
						<c:forEach var="pagenum" items="${result.showpagenum}"  varStatus="flag">
							<c:if test="${pagenum==result.pagenum}">
								<li class="active"><a href="#" class="goPageNum" pagenum="${pagenum}">${pagenum}</a></li>
							</c:if>
							<c:if test="${pagenum!=result.pagenum}">
								<li><a href="#" class="goPageNum" pagenum="${pagenum}">${pagenum}</a></li>
							</c:if>
						</c:forEach>
			
						<c:if test="${result.pagenum<result.allpage}">
							<li><a href="#" class="goPageNum" pagenum="${result.nextPagenum}" >下一页</a></li>
						</c:if>
						<c:if test="${result.pagenum>=result.allpage}">
							<li class="disabled"><a href="#">下一页</a></li>
						</c:if>
						<li><a href="#" class="goPageNum" pagenum="${result.allpage}">最后一页</a></li>
						
					</ul>
				</nav>
				<input id="${id}_hidden_condition" name="${id}_hidden_condition" type="hidden" value="${result.conditionStr}">
			</c:if>
		</div>
	</div>
	</div>
</div>
</div>

<!-- 表尾 end -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/bootstrap-table.min.css">
<!-- Latest compiled and minified Locales -->
<script src="${pageContext.request.contextPath}/resources/js/sysmanage/bootstrap-table.min.js"></script>
<!-- Latest compiled and minified Locales -->
<script src="${pageContext.request.contextPath}/resources/js/sysmanage/bootstrap-table-zh-CN.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/grid.js"></script>
<script type="text/javascript">
<!--
$(function(){
	$.initGrid("${id}","${actionurl}","${result.perpage}","${result.pagenum}");
});
//-->
</script>
	