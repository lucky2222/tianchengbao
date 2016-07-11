<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="placeholder"  rtexprvalue="true" %>
<%@ attribute name="classstyle"  rtexprvalue="true" %>
<!-- 结果集名称 -->
<%@ attribute name="resultname" required="true" rtexprvalue="true" %>
<!-- 展示名称 -->
<%@ attribute name="showname" required="true" rtexprvalue="true" %>
<!-- 返回变量名称 -->
<%@ attribute name="valuename" required="true" rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->
<%
	if(classstyle==null||classstyle.isEmpty())
	{
		classstyle = "form-control";
		jspContext.setAttribute("classstyle",classstyle);
	}
	jspContext.setAttribute("result",request.getAttribute(resultname));
	jspContext.setAttribute("initvalue",request.getAttribute(id));
%>
<div class="row-fluid">
<div class="dropdown">
<input id="${id}"  name="${id}" type="text"  value="${initvalue}" class="${classstyle}" placeholder="${placeholder}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<input id="${id}_hidden_value"  name="${id}_hidden_value" type="hidden"  value="${initvalue}">
	<table id="${id}_hidden_list" class="table table-striped table-bordered table-hover datatable dropdown-menu listboxlimitheight" role="menu" aria-labelledby="${id}">
		<thead>
        <tr>
        	<c:forEach var="item" items="${result.fieldlist}"  varStatus="flag">
        		<th>${item.get('fieldname')}</th>
        	</c:forEach>
        </tr>
      	</thead>
      	<tbody>
      	<c:set var="showname" value="${showname}"/>
      	<c:set var="valuename" value="${valuename}"/>
      	<c:forEach var="rowitem" items="${result.resultlist}"  varStatus="flag">
      		<tr rowname="${rowitem.get(showname)}" rowvalue="${rowitem.get(valuename)}">
      			<c:forEach var="colitem" items="${result.fieldlist}" >
      				<td>
      					<c:if test="${rowitem.containsKey(colitem.get('fieldid'))}">
      						${rowitem.get(colitem.get('fieldid'))}
      					</c:if>
      				</td>
      			</c:forEach>
      		</tr>
      	</c:forEach>
      	</tbody>
	</table>
	</div>
</div>
<script>
<!--初始化执行-->
	$(function(){
		$('#${id}').focus(function() {
			//$('#${id}_hidden_list').show();
			$('#${id}_hidden_list').dropdown();
		});
		
		$('#${id}_hidden_list tr').click(function() {
			var cols='';
			var rowname = $(this).attr('rowname');
			var rowvalue = $(this).attr('rowvalue');
			$('#${id}').val(rowname);
			$('#${id}_hidden_value').val(rowvalue);
			//$('#${id}_hidden_list').hide();
		});
		
		//$('#${id}_hidden_list').hide();
	});
</script>