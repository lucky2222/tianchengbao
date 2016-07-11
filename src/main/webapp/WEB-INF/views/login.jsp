<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<!DOCTYPE HTML>
<html>
<head>
	<title>用户登录</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<!-- 新 Bootstrap 核心 CSS 文件 -->
	<!--<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css">-->
    <link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.min.css" id="css">
    <!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="${pageContext.request.contextPath}/resources/js/common/jquery-1.11.2.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery.json.js"></script>
</head>
<body>
<div id="header"><div class="header-inner"><div class="logo"><h1>系统名称</h1></div><p class="welcome"></p><div class="clearfix"></div></div></div>
<div id="banner">
<div class="banner-inner">
<div class="bannerwz"></div>
<div class="denglu">
      <form id="loginform" class="form-signin" role="form" method="post" action="index" autocomplete="off">
        <h2 class="form-signin-heading"><spring:message code="login.login_title"/></h2>
       
        <div class="jingshi">公共场所不建议自动登录，以防账号丢失</div>
        <input type='text' id="staffid" name="staffid" class="form-control yonghu" placeholder="<spring:message code="login.username"/>" >
        <input id="password"  type="password" name="password" class="form-control mima" placeholder="<spring:message code="login.password"/>" />
        <div class="checkbox">
          <input id="rememe" type="checkbox" />  <label><spring:message code="login.rememe"/> </label>
           <c:if test="${login.state!=0}">
        	<h6><font color="red">${login.login_remark}</font></h6>
        </c:if>
        </div>
        <button class="btn btn-lg btn-primary btn-block btn-denglu" type="submit"></button>
      </form>
    </div></div>
</div>

<div class="copyright header-inner">津ICP备05003336号  Copyright © 1998-2024 天津东方胜大有限公司</div>
</body>
</html>