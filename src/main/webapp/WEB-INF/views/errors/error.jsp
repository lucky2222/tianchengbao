<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isErrorPage="true"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<!DOCTYPE HTML>
<html>
<head>
<title>系统异常</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 新 Bootstrap 核心 CSS 文件 -->

<link rel="stylesheet"
	href="http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css">
<link rel="stylesheet"
	href="http://apps.bdimg.com/libs/jqueryui/1.10.4/css/jquery.ui.all.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/mainlayout.css">
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<script src="http://libs.baidu.com/jqueryui/1.10.2/jquery-ui.min.js"></script>
</head>
<body>
	<div class="container">
		<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
			<div class="container-fluid">
				<!--f-->
				<div class="navbar-header">
					<a class="navbar-brand" href="./">sino-sources平台</a>
				</div>
				<ehang:MainMenu></ehang:MainMenu>
				<!--f END-->
			</div>
		</nav>
	</div>
	
	
	<div class="container-fluid leftmenu">
		<div class="row">
			<div class="col-sm-9 col-md-10">
				<div class="panel panel-default contextpanel">
					<!-- 内容 -->
    
				    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
					  <div class="panel panel-danger ">
					    <div class="panel-heading" role="tab" id="headingOne">
					      <div class="panel-title">
					      	<strong>系统异常：</strong><%=exception.getMessage()%>
					        <h5><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">查看明细</a></h5>
					      </div>
					    </div>
					    <div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingOne">
					      <div class="panel-body">
					        <%
						    	for(int i=0;i<exception.getStackTrace().length;i++)
						    	{
						    		if(exception.getStackTrace()[i].getClassName().startsWith("com.ehang"))
						    		{
						    			out.print(exception.getStackTrace()[i].getClassName()+"."
									    		+exception.getStackTrace()[i].getMethodName()+"<font color='red'>("
									    		+exception.getStackTrace()[i].getFileName()+":"
									    		+exception.getStackTrace()[i].getLineNumber()+")</font><br>");
								    }else{
								    	out.print(exception.getStackTrace()[i].toString()+"<br>");
						    		}
						    	}
						    %>
					      </div>
					    </div>
					  </div>
				    </div>
    
    				<!-- 内容 end-->
				</div>
			</div>
		</div>
	</div>
    
</body>
</html>