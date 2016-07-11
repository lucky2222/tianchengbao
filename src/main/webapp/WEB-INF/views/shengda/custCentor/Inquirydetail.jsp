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
     		&nbsp;&gt;&nbsp; <strong>Inquiry/Quotation Detail</strong>
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
     <h2 style="background-color:#DCDCDC;">Inquiry/Quotation Detail</h2>
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
     <tbody>
	     <tr>
	          <th scope="col">QuotationNo</th> <td>${quotation.QuotationNo}</td>
	           <th scope="col">InquiryDate</th> <td>${quotation.InquiryDate}</td>
	     </tr>
	     <tr>
	          <th scope="col">QuotationDate</th> <td>${quotation.QuotationDate}</td>
	           <th scope="col">ExpiryDate</th> <td>${quotation.ExpiryDate}</td>
	     </tr>


	     	     <tr>
	          <th scope="col">Payment</th> <td>${quotation.Payment}</td>
	           <th scope="col">DestinationPort</th> <td>${quotation.DestinationPort}</td>
	     </tr>
  	
     <tr>
	          <th scope="col">attach:</th> <td  colspan="3">
	          	<c:forEach var="item" items="${orderAttach}"  varStatus="flag">
	          		<a href="/download/${item.RecordID}">${item.Name}</a>
	          	</c:forEach>
			  </td>      
     </tr>
     
     </tbody></table>



     </div>


</div>

      
     
     </div>
<div class="clr">&nbsp;</div>



</div>
	<%@ include file="../footer2.jsp"%>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-42214798-1', 'Sino-Sources');
  ga('send', 'pageview');
</script>

<!-- Start of SkyGlue Code -->
<script type="text/javascript">
	var _sgq = _sgq || [];
	_sgq.push(['setSgAccount', 'ekrhsbwe']);

	setTimeout(function() {
	var sg = document.createElement('script'); sg.type = 'text/javascript'; sg.async = true;
	sg.src = ("https:" == document.location.protocol ? "https://dc" : "http://cdn0") + ".skyglue.com/sgtracker.js";
	var s = document.getElementsByTagName('script')[0]; 
	s.parentNode.insertBefore(sg, s);
	}, 1);
</script>
<!-- End of SkyGlue Code -->

</body></html>