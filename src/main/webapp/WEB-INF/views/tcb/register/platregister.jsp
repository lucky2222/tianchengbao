<%@page pageEncoding="UTF-8" language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>托管用户注册</title>
</head>
<body>
  <form name="form" action="http://220.181.25.233:8081/member/bha/toRegister"
    method="post">
    <input name="req" type="hidden" value="<c:out value="${req}"/>"></input>
    <input name="sign" type="hidden" value="<c:out value="${sign}"/>"></input>
    <input type="submit" value="提交"></input>
  </form>
  <script type="text/javascript">
  	form.submit();
  </script>
</body>
</html>