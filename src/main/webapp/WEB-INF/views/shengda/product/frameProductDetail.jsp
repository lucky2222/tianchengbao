<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<!DOCTYPE HTML>
<html>
<head>
	<title>${product.product_name}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="keywords" content="${product.product_name}">
	<meta name="description" content="${product.product_describe}">
	<meta name="robots" content="all">

	<script type="text/javascript" async="" src="${pageContext.request.contextPath}/business/bjs/index_files/ekrhsbwe.js">
	</script><script type="text/javascript" async="" src="${pageContext.request.contextPath}/business/bjs/index_files/sgtracker.js">
	</script><script async="" src="${pageContext.request.contextPath}/business/bjs/index_files/analytics.js">
	</script><script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery-1.9.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery-migrate-1.0.0.js"></script> <!--jquery-1.9 使toggle控件无效，须加此js-->
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery.jBox-2.2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/loginbar.js"></script>

		
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/base.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/common.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/page.css">	
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/jbox.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/jqzoom.css">
<style>
#category_tree{display:block;}
.categories_list_dl dd a {
    color: #333;
    padding: 1px 0;
}
td{
    vertical-align: middle;
    text-align: -webkit-center;
}
.Picture220{height: 346px;
}
</style>


</head>
<body class="bodyBgF3" style="zoom: 1;">

<div class="body_page">
	<%@ include file="../header2.jsp"%>


<!-- BEGIN:totop -->
<a id="gotop" href="javascript:void(0)" style="display: block;"></a>
<!-- END:totop -->


<!--BEGIN:crumbs-->
<div class="crumbs">
<a href="http://www.sino-sources.com/frame" rel="nofollow">Home</a> &nbsp;&gt;&nbsp; <a href="/shengda/showcatagory/All-Categories" target="_blank">All Categories</a>
 &nbsp;&gt;&nbsp; <a href="/shengda/showcatagory/${catalog.catalog_id}" target="_blank">${catalog.catalog_name}</a>     	 
     		&nbsp;&gt;&nbsp; <strong>${product.product_name}</strong>
        </div>
<!--END:crumbs-->


<div class="pro_pic">
		<div class="introShow">
		    <div class="mainShow">
		    	<table cellspadding="0" cellspacing="0" width="346" height="346">
		            <tbody><tr>
		                <td valign="middle" align="center" style="position: relative;">
						    	<a id="bigImg" href="/uploads/${product.show_img}" class="jqzoom" style="outline-style: none; cursor: crosshair; display: block; position: relative; height: 346px;">
						    	<img id="midImg" src="/uploads/${product.show_img}" class="Picture220" alt="${product.product_name}" style="position: absolute; top: 0px; left: 0px;"></a>
		    			</td>
		            </tr>
		        </tbody></table> 
				<input type="hidden" id="defaultProdImg" value="${pageContext.request.contextPath}../uploads/${product.show_img}">
		    </div>
	</div>	
</div>	

<div class="pro_info">
	<h1 class="pro_info_tit">${product.product_name}</h1>
	    <ul class="pro_info_list">
    	<li><span>Ref Price : </span>&nbsp;
					<strong class="pro_price">${product.product_price}</strong>
					
<%-- 					<em class="pr20"></em><a href="javascript:void(0);" class="under" rel="nofollow" onclick="javascript:showLatestPriceDialog(${product.product_id});"><img src="${pageContext.request.contextPath}/business/bimages/btn_quote01.gif" alt=""></a><em class="help_pro"><img src="${pageContext.request.contextPath}/business/bimages/help.png" class="help_img"><b class="help_icon"></b><em>Click here to get a QUOTE TODAY by typing in the quantity and leave your specific requirements.</em></em> --%>
							</li>

        <li><span>Loading Port : </span>&nbsp;
						Tianjin
					</li>
        <li><span>Payment Terms : </span>&nbsp;
					TT or LC
					</li>
        <li><span>Min Order Qty : </span>&nbsp;
						 ${product.min_order_qty}&nbsp;pc
					</li>
        <li><span>Supply Capability : </span>&nbsp;
						 ${product.mon_supply_capability}&nbsp;/month
					</li>	
	</ul>

	<input type="hidden" id="web_prod_id" value="${product.product_id}">
	<input type="hidden" id="prod_spec_${product.product_id}" value="">
	
	<div class="di_right_pos">
		</div>

	<div class="di_pro_Inquire">
		<a href="javascript:void(0);" class="btn_inquiry" id="pro_info_btn_quote" title="Click to send an inquiry" name="btnProdInquire3" src_type="detailPage" web_prod_id_orig="${product.product_id}" site_id="bnRpc1NxdmQ4bjhHS0E=" web_prod_id="enR5a0hmL2U5aXdCSUtMb3VLcw==" prod_class_id="ek42dVRQK005SDBBSWFmc3RR" rel="nofollow">Inquire Now</a>
	</div>
    
<!--     <p class="pro_info_add"> -->
<!-- 		<a href="javascript:void(0);" rel="nofollow" name="btnAddProdFavo2" site_id="bnRpc1NxdmQ4bjhHS0E=" src_type="eU4yc0hQaUo4eXdI" src_id="enR5a0hmL2U5aXdCSUtMb3VLcw==" class="pl10">Add to My Favorites</a> -->
<!-- 	</p> -->

	<div class="pro_info_note">
    	<div class="pro_info_Service">
            <h3>Sino-Sources Service Pledge</h3>
            <p>Quality Product</p>
            <p>Order On-line Tracking</p>
            <p>Timely Delivery</p>
        </div>
        <div class="Financial_Service_not">
            <h3>Sino-Sources Service Pledge</h3>
            <p>Credit Rating</p>
            <p>Credit Services</p>
            <p>Credit Purchasing</p>
        </div>
    </div>
</div>

<div class="product_detail" id="product_detail">
	<div style="position:relative">
    <ul class="pro_details_tit" id="pro_details_tit" style="position: static; top: 0px; left: 179.5px;">
        <li class="tit_check"><a href="javascript:;" rel="nofollow"><h2>Product Details</h2></a></li>
       	   <a href="javascript:void(0);" class="di_Inquire" id="di_Inquire" style="position: static; top: 0px; left: 1055.5px;" title="Click to send an inquiry" name="btnProdInquire3" src_type="detailPage" web_prod_id_orig="503042" site_id="bnRpc1NxdmQ4bjhHS0E=" web_prod_id="enR5a0hmL2U5aXdCSUtMb3VLcw==" prod_class_id="ek42dVRQK005SDBBSWFmc3RR" rel="nofollow">Inquire Now</a>	  
		<div class="di_InquireNone"></div>
    </ul>
	</div>
    <div class="pro_details_cont" id="pro_details_cont">		
    	<!--BEGAIN:Product Details01-->    	
    	<div class="pro_details_cont_main">
			${product.product_detail}
       </div>
        <!--END:Product Details01-->
        <!--BEGAIN:Product Details02-->
    	<div class="pro_details_cont_main none">
								</div>        
    </div>
</div>

	
	<!--END:main_content-->

	<!--BEGIN:footer_search-->
	<div class="clr">&nbsp;</div>

<%@ include file="../foot_search.jsp"%>
	<!--END:footer_search-->
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
<script type="text/javascript">
function goPageNum(num)
{
	location.href = encodeURI(encodeURI("/shengda/showcatagory/${catalogId}?topagenum="+num+"&sqllist_hidden_condition="+$('#product_hidden_condition').val()+"&perpagenum=10"));
}
</script>
<!-- End of SkyGlue Code -->
</div>
<script language="javascript" src="http://api1.pop800.com/800.js?n=204615&t=2&l=en"></script><div style="display:none;"><a href="http://www.pop800.com">在线客服</a></div>
</body></html>