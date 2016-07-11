<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<!DOCTYPE HTML>
<html>
<head>
	<title>stock</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="keywords" content="register">
	<meta name="description" content="register - Sino East Steel Enterprise Co., Ltd.">
	

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
     		&nbsp;&gt;&nbsp; <strong>stock</strong>
        </div>
<!--END:crumbs-->
<div align="left" style="margin-left: 30px;">	 
	 	<c:forEach var="item" items="${stockList}"  varStatus="flag">

      			<p><b> ${item.title}</b>&nbsp; <a href="${pageContext.request.contextPath}/showProductArticle/${item.object_id}">Show Detail</a></p>
      			
      		</tr>
      	</c:forEach>
</div>

<div class="clr">&nbsp;</div>



</div>
	<%@ include file="../footer2.jsp"%>

</body></html>