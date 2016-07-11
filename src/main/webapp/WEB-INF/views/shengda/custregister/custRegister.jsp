<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<!DOCTYPE HTML>
<html>
<head>
	<title>My Sino</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<!-- 新 Bootstrap 核心 CSS 文件 -->
	<!--<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css">-->

    <!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="${pageContext.request.contextPath}/resources/js/common/jquery-1.11.2.min.js"></script>

<script type="text/javascript"   src="${pageContext.request.contextPath}/business/bjs/validation.js"></script>

	
<link href="${pageContext.request.contextPath}/business/bcss/xz_base.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/business/bcss/xz_common.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/business/bcss/reg.css" rel="stylesheet" type="text/css">



</head>
<body>
<!--BEGIN:header-->
<div class="reg_top">
    <!--BEGIN:search-->
    <div class="reg_header">
        <h1 class="logo"><a href="http://www.sino-sources.com/frame" title="Manufactures Directory, Suppliers &amp; China Manufactures">sino-source.com</a></h1>
        <p class="buyReq_header">Register</p>
    </div>
    <!--END:search-->
</div>
<!--END:header-->
<div class="body_page">
<!--BEGIN:main_content-->
<div class="reg_main">
<div>
	<span style="color: red;font-size: xx-large;">${error}</span>
</div>
	<div class="reg_cont pt0 clearfix">
        <div class="reg_left" id="step1">
            <div class="inReq_step reg_step mb20">
                <span class="check">Account information</span>
                <span class="last">Finish Registration</span>
            </div>
            <h2 class="reg_left_tit">Please register for sino-sources.com!</h2>
            <div class="reg_tab">
                <form action="/custregisterSub" method="post" name="registerform" id="registerform" enctype="multipart/form-data">
                <table  align="center" cellspacing="0" cellpadding="0" border="0" class="inquiry_tabA">
                    <tbody><tr>
                        <th width="160" align="right"><span class="red">*</span>Email:</th>
                        <td><input type="text" value="" size="50" id="user_mail" name="user_mail" class="inquiry_tabA_text"><br><span id="nameInfo" class="tip"></span></td>
                    </tr>
                    <tr>
                        <th align="right"><span class="red">*</span>Password:</th>
                        <td><input type="password" value="" name="password" id="password" size="50" class="inquiry_tabA_text"><br><span id="passwdInfo" class="tip"></span></td>
                    </tr>
                    <tr>
                        <th align="right"><span class="red">*</span>Repeat Password:</th>
                        <td><input type="password" name="password2" id="password2" value="" size="50" class="inquiry_tabA_text"><br><span id="passwd2Info" class="tip"></span></td>
                    </tr>
                    <tr>
                        <th align="right">Company Name:</th>
                        <td><input type="text" name="company" id="company" value="" size="50" class="inquiry_tabA_text"><br><span id="company_nameInfo" class="tip"></span></td>
                    </tr>
                    <tr>
                        <th align="right"><span class="red">*</span>Mobile Number:</th>
                        <td><input type="text" value="" id="tel" name="tel" size="50" class="inquiry_tabA_text"><br><span id="mobileInfo" class="tip"></span></td>
                    </tr>

                    <tr>
                        <th></th>
                        <td><input type="checkbox" checked="checked" name="isaccept" id="isaccept" value="1">
                            <label for="reg_accept">I accept the  sino-sources Membership Agreement </label>
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td><input type="submit" value="Join Sino-Sources" class="suggest_btn send_btn"></td>
                    </tr>
                </tbody></table>
        </form>
            </div>
        </div>

        <div class="reg_right">
			<h2 class="reg_left_tit">Already have an account? Please Sign In!</h2>
           <div class="reg_tab">
                <form action="/custloginSub" method="post" name="signInform" id="signInform" enctype="multipart/form-data">
                <table align="center" cellspacing="0" cellpadding="0" border="0" class="inquiry_tabA">
                    <tbody><tr>
                        <th width="160" align="right"><span class="red">*</span>Email:</th>
                        <td><input type="text" value="" size="50" id="log_user_mail" name="log_user_mail" class="inquiry_tabA_text"></td>
                    </tr>
                    <tr>
                        <th align="right"><span class="red">*</span>Password:</th>
                        <td><input type="password" value="" name="log_password" id="log_password" size="50" class="inquiry_tabA_text"></td>
                    </tr>

                    <tr>
                        <th></th>
                        <td><input type="submit" value="Sign In" class="suggest_btn send_btn"></td>
                    </tr>
                </tbody></table>
        </form>
            </div>


    </div>
    <!--BEGIN:footer-->
    <div class="footer_reg">Copyright Notice © 2010-2014　www.Sin-Sources.com All rights reserved.</div>
    <!--END:footer-->
</div>
<!--END:main_content-->


</div></body>

</html>