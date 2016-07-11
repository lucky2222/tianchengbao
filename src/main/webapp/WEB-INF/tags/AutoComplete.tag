<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="initflag"  rtexprvalue="true" %>
<%@ attribute name="showid"  rtexprvalue="true" %>
<%@ attribute name="placeholder"  rtexprvalue="true" %>
<%@ attribute name="classstyle"  rtexprvalue="true" %>
<%@ attribute name="value"  rtexprvalue="true" %>
<%@ attribute name="initvalue"  rtexprvalue="true" %>
<!-- 要调用的url -->
<%@ attribute name="urlref" required="true" rtexprvalue="true" %>
<!-- 展示名称 -->
<%@ attribute name="showfieldid" required="true" rtexprvalue="true" %>
<!-- 返回变量名称 -->
<%@ attribute name="valuefieldid" required="true" rtexprvalue="true" %>
<!-- 最小触发字符数 -->
<%@ attribute name="minChars" required="true" rtexprvalue="true" %>
<!-- JS回调函数 -->
<%@ attribute name="callback"  rtexprvalue="true" %>
<%@ attribute name="params"  rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->
<%
	if(classstyle==null||classstyle.isEmpty())
	{
		classstyle = "form-control";
		jspContext.setAttribute("classstyle",classstyle);
	}
	if(showid==null||showid.isEmpty())
	{
		showid=id+"_show";
		jspContext.setAttribute("showid",showid);
	}else{
		if(showid.equals(id))
		{
			id = id+"_"+id;
			jspContext.setAttribute("id",id);
		}
	}
	
%>
<div id="myDropdown" class="dropdown">
	<input id="${showid}"  name="${showid}" type="text"  value="${value}"  placeholder="${placeholder}"  
	class="${classstyle}" data-target="${id}_autoList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
	<!-- <img id="${id}_load_img"  name="${id}_load_img" src="${pageContext.request.contextPath}/resources/image/icoLoading.gif" style="display:none;"> -->
	<input id="${id}"  name="${id}" type="hidden"  value="${initvalue}" minChars="${minChars}" params="${params}">
	<div id="${id}_autoList" class="dropdown-menu" style="max-height:300px;overflow:auto;width:100%;"></div>
</div>
<script src="${pageContext.request.contextPath}/resources/js/ehanglib/autocomplete.js"></script>
<script>
	$(function(){
			initAutoCompeleteText('${showid}','${id}','${showfieldid}','${valuefieldid}','${urlref}','${callback}','${minChars}');
			/*
			* 是否初始化
			*/
			if('${initflag}'=='true')
			{
				auto_page_init($("#${id}_autoList"),"${urlref}","${showid}","${id}","${showfieldid}","${valuefieldid}","${callback}");
			}
			
	});
	
</script>