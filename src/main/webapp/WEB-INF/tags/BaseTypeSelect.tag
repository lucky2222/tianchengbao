<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="categoryid"  required="true" rtexprvalue="true" %>
<%@ attribute name="placeholder"  rtexprvalue="true" %>
<%@ attribute name="classstyle"  rtexprvalue="true" %>
<%@ attribute name="initvalue"  rtexprvalue="true" %>
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
<select id="${id}"  name="${id}"  placeholder="${placeholder}" class="${classstyle}" >
</select>

<script>
$(function(){
	$.initBaseTypeSelect("${id}","${categoryid}","${initvalue}","${placeholder}");
});
</script>