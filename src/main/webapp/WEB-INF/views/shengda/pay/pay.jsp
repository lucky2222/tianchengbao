<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<!DOCTYPE HTML>
<html>
<head>
	<title>Pay For Sample</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="keywords" content="Pay For Sample">
	<meta name="description" content="Pay For Sample">
	

	<script type="text/javascript" async="" src="${pageContext.request.contextPath}/business/bjs/index_files/ekrhsbwe.js">
	</script><script type="text/javascript" async="" src="${pageContext.request.contextPath}/business/bjs/index_files/sgtracker.js">
	</script><script async="" src="${pageContext.request.contextPath}/business/bjs/index_files/analytics.js">
	</script><script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery-1.9.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery-migrate-1.0.0.js"></script> <!--jquery-1.9 使toggle控件无效，须加此js-->
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery.jBox-2.2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/loginbar.js"></script>
	<script async="" src="${pageContext.request.contextPath}/business/bjs/index_files/analytics.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/phpserializer.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery.tree.js"></script>
		
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/base.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/common.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/page.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/jbox.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/treeMenu.css">
	
<style>
#category_tree{display:block;}
.categories_list_dl dd a {
    color: #333;
    padding: 1px 0;
}
</style>


</head>
<body class="bodyBgF3" style="zoom: 1;">

<div class="body_page">
	<%@ include file="../header2.jsp"%>

<!--BEGIN:crumbs-->
<div class="crumbs">
<a href="http://www.sino-sources.com/frame" rel="nofollow">Home</a>     	 
     		&nbsp;&gt;&nbsp; <strong>Pay For Sample</strong>
        </div>
<!--END:crumbs-->
<div align="left" style="margin-left: 130px;"> 
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="2CCW5W98AHSTY">
<table cellspacing="100px" cellpadding="100px">
<tr><td width="300px"><input type="hidden" name="on0" value="Choose Freight Cost"><span style="font-size:large;"><b>Choose Freight Cost:</b></span></td>
<td width="300px"><select name="os0" style="color: red;">
	<option value="Option 1">Option 1 $ 50.00 USD</option>
	<option value="Option 2">Option 2 $ 80.00 USD</option>
	<option value="Option 3">Option 3 $ 100.00 USD</option>
</select> </td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr>
<tr>
<td width="200px" colspan="2" align="center">
<input type="hidden" name="currency_code" value="USD">
<input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_paynowCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online.">
<img alt="" border="0" src="https://www.paypalobjects.com/zh_XC/i/scr/pixel.gif" width="1" height="1"></td>
</tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr>
</table>
</form>

</div>

<div class="clr">&nbsp;</div>



</div>
	<%@ include file="../footer2.jsp"%>

</body></html>