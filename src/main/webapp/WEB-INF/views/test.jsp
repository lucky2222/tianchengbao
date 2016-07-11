<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<!DOCTYPE HTML>
<html>
<head>
<title>测试页</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 新 Bootstrap 核心 CSS 文件 -->

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.min.css" id="css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/uploadfile.min.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/jquery/jquery-ui.min.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/mainlayout.css">

<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="${pageContext.request.contextPath}/resources/js/common/jquery-1.11.2.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/jquery.SuperSlide.2.1.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery.uploadfile.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery.form.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.min.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/sysmanage/bootstrap-datetimepicker.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/jquery/jquery-ui.min.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/summary/echarts-all.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/ajaxpage.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/util.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery.json.js"></script>
</head>
<body>
<div class="container">
<form action="/test" method="post">
		<div class="form-group">
		<div class="row">
			<div class="col-md-3">
				<div id="myDropdown" class="dropdown">
					<cc:autocomelete id="testrole" name ="qishigang" showid="PortNameEN1" showname="PortNameEN1"
					showfieldid="NameEN"  urlref="${pageContext.request.contextPath}/sysmanage/portautocomplete"  clazz="form-control"
					valuefieldid="PortID" placeholder="装货港" minchars="3" />
				  </div>
			</div>
			<div class="col-md-3">
				<cc:ehangselect groupname="test" name="state" classname="form-control"  initvalue="1"/>
			</div>
			<div class="col-md-3">
				<cc:modalpage id="editname" name="修改名称" title="客户名称修改"  pagename="test" pageservice="testService" callback="testsubmit" backdrop="static"/>
			</div>
			<div class="col-md-3"><input type="button" id="dosubmit" value="提交" onclick="testcall();" ></div>
			</div>
		</div>		
		<div class="form-group">
			<div class="row">
				<div class="col-md-3">
					<cc:multipleselect id="duoxuan" name="duoxuan" style="form-control"  showname="codepath" valuename="codepath" 
					initvalue="td_appprocess,td_carrier" urlref="${pageContext.request.contextPath}/test/multipleselect"
					param="table_name=td"/>
				</div>
				<div class="col-md-3">
					<cc:modalpage id="task" name="创建任务" title="创建任务"  submitcheck="checkbeforecreatetask"  param="orderid=D1505161604150048&initpage=true"
						pagename="createtask" pageservice="createtaskService" callback="createTask" backdrop="static" modalstyle="modal-lg"/>
				</div>
				<div class="col-md-3">
					<ehang:AutoComplete minChars="2" showid="PortNameEN2"
					showfieldid="NameEN"
					urlref="${pageContext.request.contextPath}/sysmanage/portautocomplete"
					valuefieldid="PortID" id="polid" placeholder="装货港"></ehang:AutoComplete>
				</div>
			</div>
		</div>
		
		<div class="form-group">
			<div class="row">
				<div class="col-md-12">
					<cc:orderstatus id="W1507161738140220"></cc:orderstatus>
				</div>
			</div>
		</div>
		
		<div class="form-group">
			<div class="row">
				<div class="col-md-12">
					<cc:syncdiv urlref="/monitor/getsummarydetail/W1507161738140220" id="W1507161738140220"  parainit="" param="" callback="teststatus"></cc:syncdiv>
				</div>
			</div>
		</div>
	</form>
	</div>
		<cc:ScriptEnd></cc:ScriptEnd>
		<script>
			function testsubmit(data)
			{
				alert(data);
			}
			
			function teststatus(id,data)
			{
				$("#sync_"+id).html("<ul class=\"didlc\" id=\"status_"+id+"\">"+data+"</ul>");
			}
		</script>
	</body>
	</html>