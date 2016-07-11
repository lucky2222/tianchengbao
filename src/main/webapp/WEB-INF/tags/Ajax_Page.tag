<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="actionurl" required="true" rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->
<div id="panel_ajax_page" actionurl="${actionurl}" ajax_part_id="${id}">
	<div id="${id}"></div>
</div>
<script>
$(function(){
	ajax_page_init($("#${id}"),"${actionurl}","");
});
</script>