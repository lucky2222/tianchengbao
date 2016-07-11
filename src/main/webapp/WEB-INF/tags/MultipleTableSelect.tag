<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<!-- 结果集名称 -->
<%@ attribute name="resultname" required="true" rtexprvalue="true" %>
<!-- 展示名称 -->
<%@ attribute name="showname" required="true" rtexprvalue="true" %>
<!-- 返回变量名称 -->
<%@ attribute name="valuename" required="true" rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->
<%
	jspContext.setAttribute("result",request.getAttribute(resultname));
	jspContext.setAttribute("initvalue",request.getAttribute(id));
%>
<div class="row-fluid">
<input id="${id}"  name="${id}" type="text"  value="${initvalue}" class="form-control">
<input id="${id}_hidden_value"  name="${id}_hidden_value" type="hidden"  value="${initvalue}">

	<table id="${id}_hidden_list" class="table table-striped table-bordered table-hover datatable dropdown-menu">
		<thead>
        <tr title="单击表头确认选择">
        	<td><input type="checkbox"  id="${id}_checkall" name="${id}_checkall"></td>
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
      			<td><input type="checkbox"  id="${id}_checksimple_${flag.index}" name="${id}_checksimple_${flag.index}"></td>
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
<script>
<!--初始化执行-->
	$(function(){
		$('#${id}').focus(function() {
			$('#${id}_hidden_list').show();
		});
		$('#${id}_hidden_list').hide();
		
		//下拉框取值
		$("#${id}_hidden_list thead tr th").on('click', function (e) {
			var rowname = "";
			var rowvalue = "";
			$.each($("#${id}_hidden_list tbody tr td input:checked"),function(idx,item){
				if($(this).parent().parent().attr("rowname")==undefined)
				{
					return true;
				}
				rowname = rowname +$(this).parent().parent().attr("rowname")+",";
				rowvalue = rowvalue + $(this).parent().parent().attr("rowvalue")+",";
	    	});
			if(rowname.length>0&&(rowname.lastIndexOf(',')==rowname.length-1))
			{
				rowname = rowname.substring(0,rowname.length-1);
			}
			if(rowvalue.length>0&&(rowvalue.lastIndexOf(',')==rowvalue.length-1))
			{
				rowvalue = rowvalue.substring(0,rowvalue.length-1);
			}
			$('#${id}').val(rowname);
			$('#${id}_hidden_value').val(rowvalue);
			$('#${id}_hidden_list').hide();
		});
		
		//下拉框单选框选择
		$("#${id}_hidden_list tbody tr").on('click', function (e) {
			var obj = $(this).find('td input:checkbox');
			if(obj.prop("checked")==true)
			{
				obj.prop("checked",false);
			}else{
				obj.prop("checked",true);
			}
			var allcheck=true;
			$.each($("#${id}_hidden_list tbody tr td input:checkbox"),function(idx,item){
				if($(this).prop("checked")==false)
				{
					allcheck = false;
				}
			});
			$("#${id}_hidden_list thead tr td input:checkbox").prop("checked",allcheck);
			
		});
		//全选，全取消
		$("#${id}_hidden_list thead tr td input:checkbox").on('click', function (e) {
			if($(this).prop("checked")==true)
			{
				$("#${id}_hidden_list tbody tr td input:checkbox").prop("checked",true);
			}else{
				$("#${id}_hidden_list tbody tr td input:checkbox").prop("checked",false);
			}
		});
		//提示关闭
		//$("#${id}_hidden_list thead tr").tooltip();
	});
</script>