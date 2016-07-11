<%@ tag pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true"%>
<%@ attribute name="initurl" required="true" rtexprvalue="true"%>
<%@ attribute name="placeholder" rtexprvalue="true"%>
<%@ attribute name="classstyle" rtexprvalue="true"%>
<%@ attribute name="initvalue" rtexprvalue="true"%>
<%@ attribute name="value" rtexprvalue="true"%>
<%@ attribute name="params" rtexprvalue="true"%>
<!-- JS回调函数 -->
<%@ attribute name="callback"  rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->
<%
	if (classstyle == null || classstyle.isEmpty()) {
		classstyle = "form-control";
		jspContext.setAttribute("classstyle", classstyle);
	}
	if (initvalue == null) {
		jspContext.setAttribute("initvalue", "");
	}
%>
<div>
	<input id="${id}_show" name="${id}_show" type="text"
		placeholder="${placeholder}" class="${classstyle}"
		data-target="${id}_selectList" data-toggle="dropdown"
		aria-expanded="false" value="${value}"> <input id="${id}" name="${id}"
		type="hidden" value="${initvalue}">
	<ul id="${id}_selectList" class="dropdown-menu" role="menu"
		aria-labelledby="${id}"
		style="max-height: 300px; overflow: auto; width: 100%;">
	</ul>
</div>
<script>
	$(function()
	{
		$.initStaticSelect("${id}","${id}_selectList","${initurl}","${params}","${callback}");
// 		$.get($.getContextPath() + url, param, function(data)
// 		{
// 			$('#${id}_selectList').html(data);
// 			$('#${id}_selectList').find("li").click(function()
// 			{
// 				var text = $(this).text();
// 				var value = $(this).find("a").attr("idvalue");
// 				$(this).closest("div").find("#${id}_show").val(text);
// 				$(this).closest("div").find("#${id}").val(value);
				
// 				var callstr =${callback}+'';
//         		if(callstr!='')
//         		{
//         			${callback}(text,value,$(this));
//         		} 
// 			});
// 		});

// 		var param = [];
// 		var paramvalue = [];
// 		var index = -1;
// 		$("#${id}_show").change(function(e)
// 		{
// 			if ($("#${id}_show").val() == "")
// 			{
// 				$("#${id}").val("");
// 			}
// 		});
// 		$("#${id}_show").keyup(
// 				function(e)
// 				{

// 					if (e.which == 38)
// 					{
// 						index--;
// 						if (index <= 0)
// 						{
// 							index = 0;
// 						}
// 						$('#${id}_selectList li a').eq(index).trigger('focus');
// 						return;
// 					}
// 					else if (e.which == 40)
// 					{
// 						index++;
// 						$('#${id}_selectList li a').eq(index).trigger('focus');
// 						return;
// 					}
// 					else if (e.which == 27)
// 					{
// 						$("#${id}_selectList").dropdown('toggle');
// 						return;
// 					}

// 					if (param.length == 0)
// 					{
// 						$.each($("#${id}_selectList").find("li"), function(p1, p2)
// 						{
// 							param[p1] = $(this).text();
// 							paramvalue[p1] = $(this).find("a").attr("idvalue")
// 						});
// 					}
// 					itemstr = "";
// 					$("#${id}_selectList").html("");
// 					for (var i = 0; i < param.length; i++)
// 					{
// 						if ($("#${id}_show").val() == ""
// 								|| param[i].toUpperCase().indexOf(
// 										$("#${id}_show").val().toUpperCase()) >= 0)
// 						{
// 							itemstr = itemstr + "<li><a href='#' idvalue='"+paramvalue[i]+"'>"
// 									+ param[i] + "</a></li>";
// 						}
// 					}
// 					$("#${id}_selectList").html(itemstr);
// 					$("#${id}_selectList").find("li").click(function()
// 					{
// 						$("#${id}_show").val($(this).text());
// 						$("#${id}").val($(this).find("a").attr("idvalue"));
// 					});
// 					index = -1;

// 				});
	});
</script>