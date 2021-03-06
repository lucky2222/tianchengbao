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
     		&nbsp;&gt;&nbsp; <strong>Inquiry/Quotation Center</strong>
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
     
     <form id="frmSearch" name="frmSearch" method="post" action="/inquiry/inquirylist">
     <div class="search">
     Keyword: <input class="text" name="txtinquiresearchword" type="text" value="">
     <input name="dosearch" type="hidden" value="1">
     <input class="btnsearch" type="submit" name="button" id="button" value="Search">
     </div>
     </form>

     <div class="table">
     <h2 style="background-color:#DCDCDC;">Inquiry List</h2>
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
     <tbody><tr>
          <th scope="col">QuotationNo</th>
          <th align="center" scope="col">InquiryDate</th>
          <th align="center" scope="col">QuotationDate</th>
          <th align="center" scope="col">ExpiryDate</th>
     </tr>



	<c:forEach var="item" items="${result.resultlist}"  varStatus="flag">
      		<tr>
      			<td><nobr><a href="${pageContext.request.contextPath}/orders/inquiry/${item.QuotationNo}">
      			${item.QuotationNo}</a></nobr></td>
      			<td><nobr>${item.InquiryDate}</nobr></td>
      			<td><nobr>${item.QuotationDate}</nobr></td>
      			<td><nobr>${item.ExpiryDate}</nobr></td>
      			</nobr></td>
      		</tr>
      	</c:forEach>

     
     </tbody></table>
<!--BEGIN:page-->
<div class="page">
<ul class="pagination">    
     <li class="prev">
               <a title="Pre" href="#" onclick="goPageNum(${result.prePagenum})" rel="nofollow">prev</a>
             </li>
     
    <li class="first">
        <span class="former_no">First</span>
        </li>
            	<c:forEach var="item" items="${result.showpagenum}"  varStatus="flag">
            		<li><a  href="#" onclick="goPageNum(${item})">${item}</a></li>
            	</c:forEach>     

             
     <li class="last">
    	<a title="last" href="#" onclick="goPageNum(${result.allpage})"  rel="nofollow">Last</a>			
	  
     </li> 
     
     <li class="next">
    	<a title="Next" href="#" onclick="goPageNum(${result.nextPagenum})"  rel="nofollow">next</a>			
	  
     </li> 
     <li class="prev">
			${result.pagenum}/${result.allpage}
			<input id="product_hidden_condition" name="product_hidden_condition" type="hidden" value="${result.conditionStr}">
    </li>
     <li>
     <input name="turnPageInput" type="text" id="pagenum" name="pagenum" size="2" value="${result.pagenum}">
    <input style="width:40px;height:23px;" name="submit" type="submit" id="page_input" value="go" onclick="goPageNum(${result.pagenum})">
     </li>
</ul>
	</div><!--END:page-->



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


<script type="text/javascript">
function goPageNum(num)
{	
	if(num==0){
		alert("this is first page!");
	}
	else{
		location.href = encodeURI(encodeURI("/inquiry/inquirylist?topagenum="+num+"&sqllist_hidden_condition="+$('#product_hidden_condition').val()+"&perpagenum=10"));
	}
}
</script>
<!-- End of SkyGlue Code -->

</body></html>