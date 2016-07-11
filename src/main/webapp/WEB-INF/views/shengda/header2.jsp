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
    

    
    <div class="search">
    	<form name="topSearchForm" id="topSearchForm" method="GET" action="/getSearchProduct">
		<input id="topSearchProdClassId" name="ok_prod_class_id" type="hidden" value="0">
    	<div class="search_bar">
        	<div class="search_bar_type" id="search_bar_type">
            	<p class="search_bar_type_value">
                	<span id="topSearchProdClassName">All Categories</span>
                    <b class="search_bar_type_icon ui_icon down"></b>
                </p>
                <ul class="search_bar_type_options" id="topSearchProdClassList" style="display: none;">
                	<li><a href="javascript:void(0);" rel="nofollow" classid="All-Categories">All Categories</a></li>									
										<c:forEach var="item" items="${custMenuList}"  varStatus="flag">
											<li><a href="javascript:void(0);" rel="nofollow" classid="${item.catalog_id}">${item.catalog_name}</a></li>
										</c:forEach>
					                </ul>
            </div>
            <div class="search_bar_main" id="search_bar_main" style="margin-left: 121px;">
            	<input id="topSearchInput" type="text" name="keyword" value="Steel Pipe" class="text_search" autocomplete="off" x-webkit-speech="x-webkit-speech" x-webkit-grammar="builtin:translate" lang="en" onfocus="if(this.value=='Steel Pipe'){this.value=''}" onblur="if(this.value==''){this.value='Steel Pipe'}" style="width: 750px;">
                <ul class="search_bar_main_list none" id="search_bar_main_list" style="width: 768px; display: none;"></ul>
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
<!--END:search-->	<!--END:header-->