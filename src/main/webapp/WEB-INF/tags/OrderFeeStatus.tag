<%@ tag pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 标签参数 -->
<%@ attribute name="orderid" required="true" rtexprvalue="true"%>
<div class="container-fluid">
	<div class="row">
		<div id="fee_status_${orderid}"></div>
	</div>
</div>
<script>
$(function(){
	$.orderFeeStatusInit("${orderid}");
});
</script>