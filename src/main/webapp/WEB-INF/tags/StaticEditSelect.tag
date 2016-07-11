<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="initurl"  required="true" rtexprvalue="true" %>
<%@ attribute name="placeholder"  rtexprvalue="true" %>
<%@ attribute name="classstyle"  rtexprvalue="true" %>
<%@ attribute name="initvalue"  rtexprvalue="true" %>
<%@ attribute name="params"  rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->
<%
	if(classstyle==null||classstyle.isEmpty())
	{
		classstyle = "form-control";
		jspContext.setAttribute("classstyle",classstyle);
	}
	if(initvalue==null)
	{
		jspContext.setAttribute("initvalue","");
	}
%>
<div>
<input id="${id}"  name="${id}" type="text"  value="${initvalue}"  placeholder="${placeholder}"  class="${classstyle}"  data-target="${id}_selectList" data-toggle="dropdown" aria-expanded="false" >
<ul id="${id}_selectList" class="dropdown-menu" role="menu" aria-labelledby="${id}" style="max-height:300px;overflow:auto;width:100%;">
</ul>
</div>
<script>
$(function(){
	$.initStaticEditSelect("${id}","${id}_selectList","${initurl}","${params}");
});
</script>