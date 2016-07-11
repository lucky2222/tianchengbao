<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
	<title>${articleinfo.title}</title>
    <meta charset="utf-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keywords" content="${articleinfo.keywords}" />
	<meta name="description" content="${articleinfo.remark}" />
</head>
<body>
	<c:redirect url="http://yitongtianxia.duapp.com/showarticle/${articleinfo.id}?state=${state}"/>
</body>
</html>