<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<!DOCTYPE HTML>
<html>
<head>
	<title>materials(steel pipe,steel sheet) leading supplier and manufacturer in china</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="keywords" content="register">
	<meta name="description" content="register - Sino East Steel Enterprise Co., Ltd.">
	

	<script type="text/javascript" async="" src="${pageContext.request.contextPath}/business/bjs/index_files/ekrhsbwe.js">
	</script><script type="text/javascript" async="" src="${pageContext.request.contextPath}/business/bjs/index_files/sgtracker.js">
	</script><script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery-1.9.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery-migrate-1.0.0.js"></script> <!--jquery-1.9 使toggle控件无效，须加此js-->
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/loginbar.js"></script>
		
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/base.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/common.css">


<style>
#category_tree{display:block;}
.categories_list_dl dd a {
    color: #333;
    padding: 1px 0;
}



li {
    display: list-item;
    text-align: -webkit-match-parent;
}

#leftmenu .bo .border ul li.oneclass {
    height: 25px;
    line-height: 25px;
}
</style>

</head>
<body class="bodyBgF3" style="zoom: 1;">

<div class="body_page">
	<%@ include file="../header2.jsp"%>

<!--BEGIN:crumbs-->
<div class="crumbs">
<a href="http://www.sino-sources.com/frame" rel="nofollow">Home</a> &nbsp;&gt;&nbsp; <a href="/custCentor/1" target="_blank">My Order</a>
     		&nbsp;&gt;&nbsp; <strong>Summary</strong>
        </div>
<!--END:crumbs-->
<div id="leftmenu">
     	<!-- trans菜单 -->
    <div class="bo">
     <h2><a href="/Summary">Summary</a></h2></div>
     
     <div class="bo">
     <h2>Order Center</h2>
	     <div class="border">
	         <ul style="margin: 0;padding: 0; list-style: none; -webkit-padding-start: 40px;">
	         <li class="oneclass"><a href="/custCentor/1">Current order</a></li>
	         <li class="oneclass"><a href="/custCentor/2">Historical order</a></li>
	         </ul>
	     </div>
     </div>
     
     <div class="bo">
     <h2 class="current"><a href="/inquiry/inquirylist?isqry=1">Inquiry/Quotation Center</a></h2>
	 </div>
     
<!--      <div class="bo">
     <h2><a href="/quotation/quotationlist">Quotation Center</a></h2>
     </div> -->
     
     <div class="bo">
     <h2><a href="/financialInit">Financial Service</a></h2>
     </div>     
     
    
</div>
<div id="rightframe">
     <div class="table">
     <h2 style="background-color:#DCDCDC;">Summary Detail</h2>
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
     <form action="/sehengda/modifySummer" method="get">
     <tbody>
	     <tr>
	          <th scope="col">user_mail</th> <td>${user_info.user_mail}</td>
	           <th scope="col">first_name</th> <td><input type="text" name="first_name" value="${user_info.first_name}"/></td>
	     </tr>
	     <tr>
	          <th scope="col">company</th> <td><input type="text" name="company" value="${user_info.company}"/></td>
	           <th scope="col">tel</th> <td><input type="text" name="tel" value="${user_info.tel}"/></td>
	     </tr>
	     <tr>
	          <th scope="col">director</th> <td><input type="text" name="director" value="${user_info.director}"/></td>
	           <th scope="col">street_Address</th> <td><input type="text" name="street_Address" value="${user_info.street_Address}"/></td>
	     </tr>
	     <tr>
	          <td colspan="4"><input type="hidden" name="user_id" value="${user_info.user_id}" /> 
	          <input type="submit" class="btn_inquiry btn_subscribe"  value="modify my summary" /></td>

	     </tr>
     
     </tbody>
     </form>
     </table>



     </div>

     <div  class="table" style="margin-top: 15px">
	     <h2 style="background-color:#DCDCDC;"><a onclick="modify()">Change password </a></h2>
	     <table width="100%" border="0" cellspacing="0" cellpadding="0" id="passwdTab">
	     <tbody>
		     <tr>
		          <th  >New Password:</th> <td><input type="password" name="NewPasswd"  id="NewPasswd"/></td>
		     </tr>
		     <tr>
		          <th  >Confirm Password:</th> <td><input type="password" name="ConfirmPasswd" id="ConfirmPasswd" /></td>
		     </tr>
		     <tr>
		         <td colspan="2"><input type="button" class="btn_inquiry btn_subscribe" onclick="submitPasswd();" value="submit" /></td>
		     </tr>	
	     
	     </tbody></table>



     </div>

</div>

      
     
     </div>
<div class="clr">&nbsp;</div>



</div>
	<%@ include file="../footer2.jsp"%>
<script>
  function modify(){
	  $("#passwdTab").show();
  }
  
  function submitPasswd(){
	var newpass=  $("#NewPasswd").val();
	var comPasswd=  $("#ConfirmPasswd").val();
	if(newpass=="" || newpass==null ){alert("Please enter the new password. "); return fasle;}
	if(newpass!=comPasswd){alert("The code you enter twice must be the same. "); return fasle;}
	$.ajax({
		  type: 'POST',
		  url: '/passChange?rnd='+Math.random(),
		  dataType: "json",
		  data: {password:newpass},
		  success:function(data){
			  
			  if(data.result=="ok")
			  {		
				  //已登录
				alert("Your password has been revised successfully");
				$("#NewPasswd").val("")
				 $("#ConfirmPasswd").val("");
			  }

		  },
		  complete: function(){
		  }
		});
  }
</script>


</body></html>