<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<!DOCTYPE HTML>
<html>
<head>
<title>文章列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.min.css" id="css">
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="${pageContext.request.contextPath}/resources/js/common/jquery-1.11.2.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
</head>
<body>
	<table class="table">
	<thead>
        <tr>
        	<th>编码</th>
        	<th>文章主题</th>
        	<th>创建时间</th>
        </tr>
    </thead>
	<c:forEach var="item" items="${articlelist}"  varStatus="flag">
      		<tr>
      			<td><nobr>${item.id}</nobr></td>
      			<td><nobr><a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7139ab62847dfb68&redirect_uri=http://www.sino-sources.com/article/${item.id}&response_type=code&scope=snsapi_base&state=System#wechat_redirect">${item.title}</a></nobr></td>
      			<td><nobr>${item.updatetime}</nobr></td>
      		</tr>
      	</c:forEach>
      	</table>
	</body>
	</html>