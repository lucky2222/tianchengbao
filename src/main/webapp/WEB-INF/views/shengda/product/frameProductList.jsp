<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<!DOCTYPE HTML>
<html>
<head>
	<title>${catalog_name}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="keywords" content="${catalog_name}">
	<meta name="description" content="${catalog_name}">
	

	<script type="text/javascript" async="" src="${pageContext.request.contextPath}/business/bjs/index_files/ekrhsbwe.js">
	</script><script type="text/javascript" async="" src="${pageContext.request.contextPath}/business/bjs/index_files/sgtracker.js">
	</script><script async="" src="${pageContext.request.contextPath}/business/bjs/index_files/analytics.js">
	</script><script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery-1.9.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery-migrate-1.0.0.js"></script> <!--jquery-1.9 使toggle控件无效，须加此js-->
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery.jBox-2.2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/loginbar.js"></script>
	<script async="" src="${pageContext.request.contextPath}/business/bjs/index_files/analytics.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/phpserializer.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery.tree.js"></script>
		
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/base.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/common.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/page.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/jbox.css">
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/business/bcss/treeMenu.css">
	
<style>
#category_tree{display:block;}
.categories_list_dl dd a {
    color: #333;
    padding: 1px 0;
}
</style>


</head>
<body class="bodyBgF3" style="zoom: 1;">

<div class="autosize">
	<%@ include file="../header2.jsp"%>

	<!--BEGIN:main_content-->


<!--BEGIN:crumbs-->
<div class="crumbs">
<a href="http://www.sino-sources.com/frame" rel="nofollow">Home</a> &nbsp;&gt;&nbsp; <a href="/shengda/showcatagory/All-Categories" target="_blank">All Categories</a>
     	 
     		&nbsp;&gt;&nbsp; <strong>${catalog_name}</strong>
        </div>
<!--END:crumbs-->

<div class="shopM_autosize">
	<div class="shopM_autosizeM" style=" margin-left: 203px;">
    	<script type="text/javascript">
			$(function(){
				$("#gallery3").click(function(){
					$(this).addClass("fs_check");
					$("#listshow3").removeClass("fl_check");
					$("#goods_list2").removeClass("goods_list4");
					$("#goods_list2").addClass("goods_list2");
				});
				$("#listshow3").click(function(){
					$(this).addClass("fl_check");
					$("#gallery3").removeClass("fs_check");
					$("#goods_list2").removeClass("goods_list2");
					$("#goods_list2").addClass("goods_list4");
				});
			});
		</script>
<div class="shop_filter autowidth">
	<div class="shop_filterT">
		<div class="shop_filterTL fl">
					Total <span>${allcount}</span> products in category of <h1>${catalog_name}</h1>
		
						</div>

		<div class="shop_filter_page fr">
			<span class="pr10 fl">Page: ${result.pagenum}/${result.allpage}</span>
			<a href="#" onclick="goPageNum(${prePagenum})" class="shop_filter_page_prevno" rel="nofollow">&nbsp;</a>
			<a href="#" onclick="goPageNum(${nextPagenum})" class="shop_filter_page_after" rel="nofollow">&nbsp;</a>
		</div>
	</div>	
		
	</div>
	<div class="shop_pro_list autowidth">
		<ul class="goods_list2 clearfix" id="goods_list2">
		
		<c:forEach var="item" items="${result.resultlist}"  varStatus="flag">
							<li class="clearfix" style="z-index: 36;">
				<div class="oImgbox">
					<div class="img_box_150">
						<div>
							<a href="/showproductDetail/${item.product_id}" target="_blank">
									<img src="/uploads/${item.show_img}" alt="${item.product_name}"  title="${item.product_name}">
							</a>							
						</div>
					</div>
					<div class="hiddenImg" style="display: none;">
						<b class="hiddenImg_dot"></b>
						<div class="img_box_300">
							<div>
								<a href="/showproductDetail/${item.product_id}" target="_blank" title="${item.product_name}">
																<img src="/uploads/${item.show_img}" alt="${item.product_name}"  title="${item.product_name}">
								</a>
							</div>
						</div>
					</div>
				</div>
				<div class="grp04">
					<h4 class="shop_pro_list_tit">
						<a href="/showproductDetail/${item.product_id}" target="_blank" title="${item.product_name}">${item.product_name}</a>
											</h4>
					<p class="pefPrice">
						<strong>Ref Price:</strong>  <strong class="pro_price">${item.product_price}</strong> &nbsp;&nbsp;
													<a href="javascript:void(0);" rel="nofollow"><img src="${pageContext.request.contextPath}/business/bimages/btn_quote01.gif" alt="Get Latest Price" onclick="javascript:showLatestPriceDialog(${item.product_id});"></a>
											</p>
					<p>
						<strong>Supply Capability:</strong>${item.mon_supply_capability}&nbsp;unit/month					</p>
				</div>
				<div class="grp05">
					<p class="grp02_btn clearfix">
						<a href="javascript:void(0);" name="btnProdInquire3" site_id="bnRpc1NxdmQ4bjhHS0E=" web_prod_id="eTk3OEhhL1E4WGdDS0tMcXZhRQ==" web_prod_id_orig="${item.product_id}" prod_class_id="ejluK1NLcmJwQ3dF" rel="nofollow" class="btn_inquiry btn_contact2" title="Click to send an inquiry">Inquire Now</a>

<!-- 						<a href="javascript:void(0);" rel="nofollow" name="btnAddProdFavo2" site_id="bnRpc1NxdmQ4bjhHS0E=" src_type="eU4yc0hQaUo4eXdI" src_id="eTk3OEhhL1E4WGdDS0tMcXZhRQ==" class="btn_addFav" title="Add to My Favorites" style="margin-top:10px">Add to My Favorites</a>
						
												<a href="javascript:void(0);" rel="nofollow" class="btn_chatonline2" title="Click online conversation" name="btnOpenDoyooWebCall" livechat_group_code="100" web_prod_id="683218" site_id="bnRpc1NxdmQ4bjhHS0E=" status="online" style="margin-top:10px"><em class="btn_chatonline_dot"></em>Chat Online</a>
 -->											</p>
				</div>
			</li>
      	</c:forEach>
			

						
		</ul>
	</div>
<!--BEGIN:page-->
	<div class="page">
		<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/cnbmui.js"></script>

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

	    <div class="notFind">
    Find best suppliers, manufacturers, exporters from China and around the world. Sino-sources.com is a leading purchase platform in the world.
    </div>
    
	<!--BEGIN:not find-->
	<div class="notFind">
		Not find your Product yet? you also try follow way.
		<span class="boldTitle mt20">
			<a href="javascript:void(0);" name="BtnBuyRequest" title="Buying Request" rel="nofollow">Post Buying Request Now &gt;&gt;</a>
		</span>
	</div><!--END:not find-->
	<div class="pro_info_service2 clearfix">
		<span class="pro_info_service_dot ptl16"></span>
		<p class="pro_info_serviceT">Sino-sources Service Pledge<!--<a href="#" target="_blank">Learn more<span></span></a>--></p>
		<div class="pro_info_serviceF mt10">
			<p class="mr45"><span></span>Quality Product and Good Price</p>
			<p class="mr45"><span></span>Order On-line Tracking</p>
			<p class="mr45"><span></span>Timely Delivery</p>
		</div>
	</div>

    </div>
</div>
<!--BEGIN:left-->
<div class="shopL_autosize" style=" width: 203px;"> 
	<div class="shop_brands mb15">
        <h2 class="shop_cate_tit shop_cate_tit2" id="shop_cate_tit">All Categories</h2>
        <cc:custMemu memulist="${custMenuList}"></cc:custMemu>
    </div>

	
	<div class="mt10"></div>

	
	<div class="shop_related_pro">
	<h2 class="shop_related_tit">New Products</h2>
	<ul class="shop_tab_list">
 
	 		<c:forEach var="item" items="${newProduct}"  varStatus="flag">
      		 	        	 <li>
	                <div class="img_box_140">
	                    <div><a href="/showproductDetail/${item.product_id}" target="_blank" title="${item.product_name}">
												<img src="${pageContext.request.contextPath}/uploads/${item.show_img}" alt="${item.product_name}" title="${item.product_name}"></a></div>
	                </div>
	                <a href="/showproductDetail/${item.product_id}" target="_blank" title="${item.product_name}">${item.product_name}</a>
					
						            </li>
	      	</c:forEach>  
	      	
    </ul>
</div>
</div>
<!--END:left-->
<!--BEGIN:right-->
<div class="shopR_autosize">
	<div class="shop_related_pro">
	<h2 class="shop_related_tit">Popular Products</h2>
	<ul class="shop_tab_list">
	 		<c:forEach var="item" items="${popuProduct}"  varStatus="flag">
      		 	        	 <li>
	                <div class="img_box_140">
	                    <div><a href="/showproductDetail/${item.product_id}" target="_blank" title="${item.product_name}">
												<img src="${pageContext.request.contextPath}/uploads/${item.show_img}" alt="${item.product_name}" title="${item.product_name}"></a></div>
	                </div>
	                <a href="/showproductDetail/${item.product_id}" target="_blank" title="${item.product_name}">${item.product_name}</a>
					
						            </li>
	      	</c:forEach>  
           		</ul>
</div></div>
<!--END:right-->
<!-- BEGIN:totop -->
<a id="gotop" href="javascript:void(0)" style="display: block;"></a>
<!-- END:totop -->
	<!--END:main_content-->

	<!--BEGIN:footer_search-->
	<div class="clr">&nbsp;</div>

<%@ include file="../foot_search.jsp"%>
	<!--END:footer_search-->
</div>
	<%@ include file="../footer2.jsp"%>


<script type="text/javascript">
function goPageNum(num)
{
	if(num==0){
		alert("this is first page!");
	}else{
		location.href = encodeURI(encodeURI("/shengda/showcatagory/${catalogId}?topagenum="+num+"&sqllist_hidden_condition="+$('#product_hidden_condition').val()+"&perpagenum=10"));
	}
}
</script>
<!-- End of SkyGlue Code -->
</div>
</body></html>