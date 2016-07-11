<%@ tag pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true"%>
<%@ attribute name="resultname" required="true" rtexprvalue="true"%>
<!-- 扩展字段 -->
<%@ attribute name="fieldname" required="false" rtexprvalue="true"%>
<%@ attribute name="expname" required="false" rtexprvalue="true"%>
<!-- 转换结果集访问名称 -->
<%
	if (fieldname != null && fieldname.length() > 0)
	{
		String[] fields = fieldname.split("\\,");
		jspContext.setAttribute("fields", fields);
	}
	jspContext.setAttribute("result", request.getAttribute(resultname));
%>
<div class="container-fluid">
	<div class="row">
		<div class="table-responsive">
			<jsp:doBody />
		</div>
	</div>
</div>
<!-- 表尾 end -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/bootstrap-table.min.css">
<!-- Latest compiled and minified Locales -->
<script
	src="${pageContext.request.contextPath}/resources/js/sysmanage/bootstrap-table.min.js"></script>

