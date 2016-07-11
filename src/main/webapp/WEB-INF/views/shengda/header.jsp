<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<!--BEGIN:header-->
<!--BEGIN:top_nav-->
<div class="top_nav_main">
	<div class="top_nav">
	    <p class="top_nav_l">Welcome to sino-sources.com!</p>
	    <ul class="top_nav_r">
        <div class="signOut" id="spLogout" style="display:none;">
	        <span class="pr5" id="spUserName"></span>, <a href="/signOut" id="btnLogout" rel="nofollow">Sign Out</a>
	       	<span class="t_line">|</span>
        </div>
        <span id="spLogin" style="">
	        <li><a href="/custregister" class="fb" rel="nofollow">Sign In</a><span class="t_line">|</span></li>
	        <li><a href="/custregister" class="fb" rel="nofollow">Join Now FREE!</a><span class="t_line">|</span></li>
        </span>
        <li><a href="http://www.sinoeaststeel.com" target="_blank">com info</a><span class="t_line">|</span></li>
		<li><a href="#" rel="nofollow">App</a><span class="t_line">|</span></li>
        <li><a href="/custCentor/1" rel="nofollow">My Order</a><span class="t_line">|</span></li>
<!--         <li id="barMyFav" class="none" style="display: none;"><a href="#" rel="nofollow">My Favorites<em id="spFavNum"></em></a><span class="t_line">|</span></li>
 -->        <li><a href="#" rel="nofollow">Help Center</a></li>
        <li class="top_nav_last none" id="barSupplyJoin" style="display: list-item;"><span class="t_line">|</span><a href="/inquire/contact_us">contact us</a></li>
        </ul>
        
	</div>
</div>
<!--END:top_nav-->
<!--BEGIN:search-->
<div class="header_main">
	<div class="logo">
    <a href="http://www.sino-sources.com/frame">
<img src="${pageContext.request.contextPath}/business/bimages/header.png" width="247" height="127" alt=" OKorder:Materials &amp; Equipment Supplier &amp; Manufacturer." title="Materials &amp; Equipment Supplier &amp; Manufacturer."><span style="display:none">sino-sources.com</span></a>
</div>
    

        <div class="buyingRequest"><a href="mailto:info@sino-sources.com" name="BtnBuyRequest" rel="nofollow"><span style="color:red;"><b>info@sino-sources.com</b></span></a><br>
<a href="#app" rel="nofollow" class="downapp">Get the Mobile App</a></div>
    
    <div class="search">
    	<form name="topSearchForm" id="topSearchForm" method="GET" action="/getSearchProduct">
		<input id="topSearchProdClassId" name="ok_prod_class_id" type="hidden" value="0">
    	<div class="search_bar">
        	<div class="search_bar_type" id="search_bar_type">
            	<p class="search_bar_type_value">
                	<span id="topSearchProdClassName">All Categories</span>
                    <b class="search_bar_type_icon ui_icon down"></b>
                </p>
                <ul class="search_bar_type_options" id="topSearchProdClassList">
                	<li><a href="javascript:void(0);" rel="nofollow" classid="All-Categories">All Categories</a></li>
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="3">Automotive &amp; Motorcycle</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="1057">Chemical</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="1378">Construction &amp; Real Estate</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="3268">Consumer Electronics</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="4180">Electrical Equipment &amp; Supplies</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="4630">Electronic Components &amp; Supplies</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="4866">Energy Products</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="18400">Furniture &amp; Décor</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="5948">Hardware</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="6079">Healthcare</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="6339">Home &amp; Garden</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="7719">Home Appliances</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="8627">Hydraulic &amp; Pneumatic</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="8752">Lights &amp; Lighting</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="9656">Machinery &amp; Equipment</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="12128">Measurement &amp; Analysis Instruments</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="12570">Mechanical Parts &amp; Fabrication Services</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="13385">Minerals &amp; Metallurgy</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="14676">Packaging &amp; Printing</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="14968">Rubber &amp; Plastics</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="15120">Security &amp; Protection</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="15589">Service Equipment</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="15791">Sports &amp; Entertainment</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="16763">Telecommunications</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="16896">Textiles &amp; Leather Products</a></li> -->
<!-- 										<li><a href="javascript:void(0);" rel="nofollow" classid="17178">Tools &amp; Accessories</a></li> -->
										
										<c:forEach var="item" items="${custMenuList}"  varStatus="flag">
											<li><a href="javascript:void(0);" rel="nofollow" classid="${item.catalog_id}">${item.catalog_name}</a></li>
										</c:forEach>
										
					                </ul>
            </div>
            <div class="search_bar_main" id="search_bar_main" style="margin-left: 121px;">
            	<input id="topSearchInput" type="text" name="keyword" value="Steel Pipe" class="text_search" autocomplete="off" x-webkit-speech="x-webkit-speech" x-webkit-grammar="builtin:translate" lang="en" onfocus="if(this.value==&#39;Steel Pipe&#39;){this.value=&#39;&#39;}" onblur="if(this.value==&#39;&#39;){this.value=&#39;Steel Pipe&#39;}" style="width: 482px;">
                <ul class="search_bar_main_list none" id="search_bar_main_list" style="width: 500px;"></ul>
            </div>
        </div>
        <input type="button" value="Search" class="search_bar_btn" id="topSearchInput" onclick="javascript:submitTopSearch();">
        <p class="search_bar_popuplar">Popular Searches:
        <a href="/shengda/showcatagory/Galvanized-Steel-Pipe">Galvanized Steel Pipe</a>,
        <a href="/shengda/showcatagory/Steel-Angle-Bar">Steel Angle Bar</a>,
        <a href="/shengda/showcatagory/Steel-Coil">Steel Coil</a>,
        <a href="/shengda/showcatagory/Deformed-Steel-Bar">Deformed Steel Bar</a>,
        <a href="/shengda/showcatagory/Scaffolding">Scaffolding</a></p>
        </form>
    </div>
</div>
<!--END:search--><!--END:header-->
