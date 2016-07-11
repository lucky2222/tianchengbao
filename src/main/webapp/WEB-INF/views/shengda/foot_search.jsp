<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<!--BEGIN:footer_search-->
<div class="clr">&nbsp;</div>
<div class="footer_search">
	<div class="footer_search_main">
		<form name="footerSearchForm" id="footerSearchForm" method="GET" action="/getSearchProduct">
        <div class="footer_search_select_main fl">
        <select name="prod_class_id">
            <option value="0">All Categories</option>
			            
			            				<c:forEach var="item" items="${custMenuList}"  varStatus="flag">
											<option value="${item.catalog_id}">${item.catalog_name}</option>
										</c:forEach>
			        </select>
        </div>		
        <input type="text" value="Steel Pipe" onblur="if(this.value==&#39;&#39;){this.value=&#39;Steel Pip&#39;}" onfocus="if(this.value==&#39;Steel Pip&#39;){this.value=&#39;&#39;}" class="footer_search_text fl" name="keyword" id="footerSearchInput">
        <input type="button" value="Search" class="footer_search_btn fl" onclick="javascript:submitFooterSearch();">
        </form>
    </div>
</div>
<!--END:footer_search-->