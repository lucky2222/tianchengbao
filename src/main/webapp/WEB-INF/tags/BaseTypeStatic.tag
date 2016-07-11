<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="result"  required="true" rtexprvalue="true" %>
<%@ attribute name="placeholder"  rtexprvalue="true" %>
<%@ attribute name="classstyle"  rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->
<%
	if(classstyle==null||classstyle.isEmpty())
	{
		classstyle = "form-control";
		jspContext.setAttribute("classstyle",classstyle);
	}
	jspContext.setAttribute("basetyperesult",request.getAttribute(result));
%>
<select id="${id}"  name="${id}"  placeholder="${placeholder}" class="${classstyle}" >
${basetyperesult}
</select>
