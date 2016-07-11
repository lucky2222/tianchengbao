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
.appletable-select {
    width: 130px;
    height: 26px;
    border: solid 1px #ccc;
    line-height: 26px;
    cursor: pointer;
    outline: none;
}
.appletable-textarea {
    width: 590px;
    height: 80px;
    padding: 5px;
    font-size: 12px;
    line-height: 20px;
    border: solid 1px #ccc;
    color: #777;
    font-family: Arial;
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
     		&nbsp;&gt;&nbsp; <strong>Financial Service</strong>
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
     <h2 style="background-color:#DCDCDC;">Customer Credit Assessment</h2>
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
     <form action="/financialsubmit" method="post" >
     <tbody>
	     <tr>
	          <td><span style="color: red;">*</span>Company Name (English):</td>
	           <td><input type="text" value="" size="50" id="company" name="company" class="inquiry_tabA_text"></td>
	     </tr>
    	 <tr>
	          <td><span style="color: red;">*</span>Company Type:</td>
	           <td><select class="appletable-select" name="company_type" id="company_type">
                      <option value="1">SOE</option>
                      <option value="2">Family-Owned</option>
                      <option value="3">Partnership</option>
                      <option value="4">Private Enterprise</option>
                      <option value="5">Other</option>
                    </select></td>
    	</tr>
	     <tr>
	          <td><span style="color: red;">*</span>Company Address:</td>
	           <td><input type="text" value="" size="50" id="street_Address" name="street_Address" class="inquiry_tabA_text"></td>
	     </tr>   	
    	 <tr>
	          <td><span style="color: red;">*</span>Company Phone:</td>
	           <td><input type="text" value="" size="50" id="tel" name="tel" class="inquiry_tabA_text"></td>
    	</tr>

    	 <tr>
	          <td><span style="color: red;">*</span>Number of Staff:</td>
	           <td><select class="appletable-select" name="number_of_staff" id="number_of_staff">
                      <option value="1">More than 1000</option>
                      <option value="2">101-1000</option>
                      <option value="3">51-100</option>
                      <option value="4">10-50</option>
                      <option value="5">1-10</option>
                    </select></td>
    	</tr>
    	    	 <tr>
	          <td><span style="color: red;">*</span>Registered Capital(US$):</td>
	           <td><input type="text" value="" size="50" id="registMoney" name="registMoney" class="inquiry_tabA_text"></td>
    	</tr>
    	<tr>
	          <td><span style="color: red;">*</span>Annual Profit(US$):</td>
	           <td><input type="text" value="" size="50" id="AnnualProfit" name="AnnualProfit" class="inquiry_tabA_text"></td>
    	</tr>
    	<tr><td colspan="2">
    	<textarea class="appletable-textarea" readonly="readonly">Financial Services Terms &amp; Declarations
Disclaimer
Access to and use of Sino-Sources.com (hereinafter referred to as the "Website") implies agreement to all of the following declarations. The site is fully entitled to modify, add to, delete or change any and all content without the prior consent of the user. All mentions of Sino-Sources.com relate to Sino Dragon International Trade Co.,Ltd

Website Use
Any product featured or displayed on this website is considered to be the lawful property of Sino Dragon International Trade Co., Ltd. Users may browse and view information on this site, but are required to understand and comply with all relevant restrictions and regulations.

Financial Terms of Service
Although this site provides financial services as detailed, the site does not guarantee any service, and does not assume any responsibility unless directly specified. Service Descriptionsare featured on the site, and only those meeting outlined criteria apply. Descriptions and criteria and content are subject to change without prior notice.

Restrictions Concerning Liability
Sino-Sources.com is not responsible for losses caused by sites or any other document linked to this website or webpage; this includes direct, indirect, material or legal losses. Additionally,any and all losses caused by the acts or omissions of any third party, Sino-Sources.com in not liable and will not assume any liability or responsibility.

Copyright Disclaimer
Any data provided on this site, may not be used on any medium and may not be copied, distributed or published for any purpose without the outlined written consent of Sino Dragon International Trade Co. Any copyright or other notices contained in the title or software downloaded or copied from the website maybe removed or obscured in any way.                
                </textarea>
    	</td>
    	</tr>

    	<tr>
            <td></td>
            <td><input type="submit" value="Send" class="suggest_btn send_btn" onclick="inquiredSend();"></td>
          </tr> 
     </tbody>
     </form>
     </table>



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
	
	function inquiredSend()
	{

		var tag =true;
	    if(!validateEmail('email'))
	    {
	        tag=false;
	    }
	    
	    if(document.getElementById("quantity")!=undefined){
		    if(!validateNum('quantity'))
		    {
		        tag=false;
		    }
		}
		if(!validateStr('companyID','Please input company name'))
	    {
	        tag=false;
	    }
		if(!validateStr('title','Please input title name'))
	    {
	        tag=false;
	    }
		if(!validateStr('staffID','Please input your telephone number'))
	    {
	        tag=false;
	    }
        return tag;
	}	
</script>
<!-- End of SkyGlue Code -->

</body></html>