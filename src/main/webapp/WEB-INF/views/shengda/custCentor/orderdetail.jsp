<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<!DOCTYPE HTML>
<html>
<head>
	<title>Order Detail</title>
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
     		&nbsp;&gt;&nbsp; <strong>Order Detail</strong>
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
     <h2 class="current"><a href="/inquiry/inquirylist">Inquiry/Quotation Center</a></h2>
	 </div>
     
<!--      <div class="bo">
     <h2><a href="/quotation/quotationlist">Quotation Center(0)</a></h2>
     </div>
      -->
     <div class="bo">
     <h2><a href="/financialInit">Financial Service</a></h2>
     </div>     
     
    
</div>
<div id="rightframe">
     <div class="table">
     <h2 style="background-color:#DCDCDC;">Order Detail</h2>
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
     <tbody>
<%-- 	     <tr>
	          <th scope="col">ENGItemName</th> <td>${order.ENGItemName}</td>
	           <th scope="col">ENGSpecification</th> <td>${order.ENGSpecification}</td>
	     </tr>
	     <tr>
	          <th scope="col">SalesOrderNo</th> <td>${order.SalesOrderNo}</td>
	           <th scope="col">Currency</th> <td>${order.Currency}</td>
	     </tr> --%>
	     <c:forEach var="item" items="${order}"  varStatus="flag">
			<tr>
	           <th scope="col">ENGItemName</th> <td>${item.ENGItemName}</td>
	           <th scope="col">ENGSpecification</th> <td>${item.ENGSpecification}</td>
	     	</tr>
	     <tr>
	          <th scope="col">PurchaseAmount</th> <td>${item.PurchaseAmount}</td>
	           <th scope="col">Currency</th> <td>${item.Currency}</td>
	     </tr>
	          	</c:forEach>
	          	
	     <tr>
	          <th scope="col">B/L</th> <td>
	          <c:forEach var="item" items="${BLfileList}"  varStatus="flag">
	          		<a href="/download/${item.RecordID}">${item.Name}</a><br/>
	          	</c:forEach>
	          </td>
	           <th scope="col">Packing List</th>
	           <td>
	          <c:forEach var="item" items="${PLfileList}"  varStatus="flag">
	          		<a href="/download/${item.RecordID}">${item.Name}</a>
	          	</c:forEach>
	          </td>
	     </tr>
	     <tr>
	          <th scope="col">Commercial Invoice</th> <td>
	          <c:forEach var="item" items="${CIfileList}"  varStatus="flag">
	          		<a href="/download/${item.RecordID}">${item.Name}</a>
	          	</c:forEach>
	          </td>
	           <th scope="col">Insurance</th>
	           <td>
	          <c:forEach var="item" items="${INSUREfileList}"  varStatus="flag">
	          		<a href="/download/${item.RecordID}">${item.Name}</a>
	          	</c:forEach>
	          </td>
	     </tr>  	
    	 <tr>
    	 	  <th scope="col">Loading Picture</th>
	           <td>
	          <c:forEach var="item" items="${LDfileList}"  varStatus="flag">
	          		<a href="/download/${item.RecordID}">${item.Name}</a><br/>
	          	</c:forEach>
	          </td>
	          <th scope="col">Other Documents:</th>
	          <td>
	          	<c:forEach var="item" items="${otherileList}"  varStatus="flag">
	          		<a href="/download/${item.RecordID}">${item.Name}</a><br/>
	          	</c:forEach>
			  </td>      
    	</tr>
    	<c:if test="${confirm_flag==1}">
    	<tr>
    		<input type="hidden" id="saleOrderNo" value="${saleOrderNo}" />
    		<td colspan="2" align="center">
			<input type="button" value="Order Confirm"  id="confirmButton" class="suggest_btn send_btn" />
			</td>
			<td colspan="2" align="center">
			<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
				<input type="hidden" name="cmd" value="_xclick">
				<input type="hidden" name="business"  value="1617461230@qq.com">
				<input type="hidden" name="item_name"  value="${saleOrderNo}">
				<input type="hidden" name="amount" value="${all_menoy}">
				<input type="submit"  value="paypal"   class="suggest_btn send_btn" >
			</form>
			</td>
    	</tr>
    	</c:if>
     </tbody></table>



     </div>


</div>

      
     
     </div>
<div class="clr">&nbsp;</div>



</div>
	<%@ include file="../footer2.jsp"%>

<script>
$(function(){
	$("#confirmButton").click(function(){
		var saleOrderNo=  $("#saleOrderNo").val();
		$.ajax({
			  type: 'POST',
			  url: '/orderconfirm?rnd='+Math.random(),
			  dataType: "json",
			  data: {saleOrderNo:saleOrderNo},
			  success:function(data){
				  
				  if(data.result=="ok")
				  {		
					  //已登录
					alert("Order Confirmed!");
					$("#confirmButton").attr('disabled',"true"); 
				  }

			  },
			  complete: function(){
			  }
			});
	});
});

</script>

</body></html>