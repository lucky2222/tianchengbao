<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<!DOCTYPE HTML>
<html>
<head>
	<title>Shipment Detail</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="keywords" content="Shipment Detail">
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
</style>


</head>
<body class="bodyBgF3" style="zoom: 1;">

<div class="body_page">
	<%@ include file="../header2.jsp"%>

<!--BEGIN:crumbs-->
<div class="crumbs">
<a href="http://www.sino-sources.com/frame" rel="nofollow">Home</a> &nbsp;&gt;&nbsp; <a href="/custCentor/1" target="_blank">My Order</a>
     		&nbsp;&gt;&nbsp; <strong>Shipment Detail</strong>
        </div>
<!--END:crumbs-->
<div id="leftmenu">
     	<!-- trans菜单 -->
    <div class="bo">
     <h2><a href="/Summary">Summary</a></h2></div>
     
     <div class="bo">
     <h2><a href="/custCentor">Order Center</a></h2>
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
     <h2 style="background-color:#DCDCDC;">Shipment Detail</h2>
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
     <tbody>
	     <tr>
	          <th scope="col">InvoiceNO</th>
	          <th scope="col">ContainerNo</th> 
	          <th scope="col">SealNO</th>
	          <th scope="col">CGS</th>
	     </tr>

	     <c:forEach var="item" items="${shipmentsList}"  varStatus="flag">
	     
	          	 <td>${item.InvoiceNO}</td>
	          	  <td>${item.ContainerNo}</td>
	          	   <td>${item.SealNO}</td>
	          	    <td>${item.CGS}</td>
	     </c:forEach>

     
     </tbody></table>



     </div>


<div>

     <div class="table">
     <h2 style="background-color:#DCDCDC;">Shipment Query entrance</h2>
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
     <tbody>
	     <tr>
	          <th scope="col">MSC</th><td><a href="https://www.msc.com/chn"  target="_blank">Query entrance</a></td>

	     </tr>
	     <tr>
	          <th scope="col">MSK</th><td><a href="http://my.maerskline.com/?_nfpb=true&_pageLabel=pag" target="_blank">Query entrance</a></td>

	     </tr>
	     	     <tr>
	          <th scope="col">HANJIN</th><td><a href="http://www.hanjin.com/hanjin/CUP_HOM_3301.do" target="_blank">Query entrance</a></td>

	     </tr>
	     	     <tr>
	          <th scope="col">CMA</th><td><a href="http://www.cma-cgm.com/" target="_blank">Query entrance</a></td>

	     </tr>
	     	     <tr>
	          <th scope="col">CSCL</th><td><a href="http://www.cscl.com.cn/" target="_blank">Query entrance</a></td>

	     </tr>
	     	     <tr>
	          <th scope="col">APL</th><td><a href="http://www.apl.com/wps/portal/apl" target="_blank">Query entrance</a></td>

	     </tr>
	     <tr>
	          <th scope="col">BULK</th><td><a href="http://www.shipxy.com/" target="_blank">Query entrance</a></td>

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