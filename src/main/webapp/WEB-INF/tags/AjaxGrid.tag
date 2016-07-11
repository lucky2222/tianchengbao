<%@ tag pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true"%>
<%@ attribute name="resultname" required="true" rtexprvalue="true"%>
<%
	jspContext.setAttribute("result", request.getAttribute(resultname));
%>
<div class="container-fluid">
	<div class="row">
		<input id="hidden_ordercondition" name="hidden_ordercondition" type="hidden" value="${result.orderbyfieldStr}">
		<jsp:doBody/>
		<!-- 表尾 -->
			<div class="container-fluid">
				<div class="row">
					<div class="col-sm-6 perpage">
						<c:if test="${result.resultlist.size()>0}" var="name">
							<h5>
								显示第${result.fstart}至${result.end}项记录，共${result.allcount}项，共${result.allpage}页,转到第<input
									id="topagenum" name="topagenum" type="text"
									size="1" maxlength="4" value="${result.pagenum}">页，每页显示
								<select id="perpagenum" name="perpagenum">
									<option value=10>10</option>
									<option value=20>20</option>
									<option value=50>50</option>
									<option value=100>100</option>
								</select>项
							</h5>
						</c:if>
					</div>
					<div id="icoLoading" class="col-sm-1 perpage" ><img alt="载入中...." src="${pageContext.request.contextPath}/resources/image/icoLoading.gif"></div>
					<div class="col-sm-5 pagenumline">
						<c:if test="${result.resultlist.size()>0}" var="name">
							<nav class="text-right">
								<ul class="pagination pagination-sm">
									<li><a href="#" onclick="goPageNum(this,1);">第一页</a></li>
									<c:if test="${result.pagenum>1}">
										<li><a href="#"
											onclick="goPageNum(this,${result.prePagenum});">上一页</a></li>
									</c:if>
									<c:if test="${result.pagenum<=1}">
										<li class="disabled"><a href="#">上一页</a></li>
									</c:if>
									<c:forEach var="pagenum" items="${result.showpagenum}"
										varStatus="flag">
										<c:if test="${pagenum==result.pagenum}">
											<li class="active"><a href="#"
												onclick="goPageNum(this,${pagenum});">${pagenum}</a></li>
										</c:if>
										<c:if test="${pagenum!=result.pagenum}">
											<li><a href="#" onclick="goPageNum(this,${pagenum});">${pagenum}</a></li>
										</c:if>
									</c:forEach>

									<c:if test="${result.pagenum<result.allpage}">
										<li><a href="#"
											onclick="goPageNum(this,${result.nextPagenum});">下一页</a></li>
									</c:if>
									<c:if test="${result.pagenum>=result.allpage}">
										<li class="disabled"><a href="#">下一页</a></li>
									</c:if>
									<li><a href="#" onclick="goPageNum(this,${result.allpage});">最后一页</a></li>

								</ul>
							</nav>
							<input id="hidden_condition" name="hidden_condition"
								type="hidden" value="${result.conditionStr}">
						</c:if>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/bootstrap-table.min.css">
<!-- Latest compiled and minified Locales -->
<script src="${pageContext.request.contextPath}/resources/js/sysmanage/bootstrap-table.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/gridtable.js"></script>
<script>
$(function(){
	tableinit($("#${id}"));
});
</script>