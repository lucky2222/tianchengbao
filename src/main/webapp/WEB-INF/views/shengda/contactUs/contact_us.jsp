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
	</script><script async="" src="${pageContext.request.contextPath}/business/bjs/index_files/analytics.js">
	</script><script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery-1.9.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery-migrate-1.0.0.js"></script> <!--jquery-1.9 使toggle控件无效，须加此js-->
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery.jBox-2.2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/loginbar.js"></script>
	<script async="" src="${pageContext.request.contextPath}/business/bjs/index_files/analytics.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/phpserializer.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/index_files/jquery.tree.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/check.js"></script>
	
		
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

<div class="body_page">
	<%@ include file="../header2.jsp"%>

<div class="inquiry_main">

    <div class="inReq_step">
        <span class="check">Inquiry</span>
        <span>Provide Quotation</span>
        <span class="last">Generate Order</span>
    </div>
    <form action="/inquire/doContactUs" method="post" name="contactusform33" id="contactusform" enctype="multipart/form-data">
	<div class="inquiry_tabA">


    	<table border="0" cellspacing="0" cellpadding="0" width="100%">
          <tbody>
          
          <tr>
          
            <th width="18%"><span class="red">*</span>Title:</th>
            <td>              

                
                					<input type="text"   name="subject" id="subject" size="50" class="inquiry_tabA_text"  />
                            
                <span id="is_show_br"><br></span><span id="textfieldInfo"></span></td>
          </tr>
          <tr>
            <th width="18%"><span class="red">*</span>Email:</th>
            <td>              

                
                					<input type="text"   name="email" id="textfield" size="50" class="inquiry_tabA_text"  value="${email}"  onblur="validateEmail('textfield')">
                            
                <span id="is_show_br"><br></span><span id="textfieldInfo"></span></td>
          </tr>
          
          <c:if test="${product.tag ==1}">
	          <tr>
	            <th valign="middle">Product:</th>
				                                 
	                                       
	               <td>
	                    <a target="_blank" href="/showproductDetail/${product.product_id}">${product.product_name}</a>
						<img src="${pageContext.request.contextPath}../uploads/${product.show_img}" alt="${product.product_name}" title="${product.product_name}" width="50" height="50">			
	                    <br>
	                    <input type="hidden" name="title" id="title" value="${product.product_name}">					
	                                    </td>                        
	                
				   <input type="hidden" name="spec" id="spec" value="">
	           </tr>
	          <tr>
	            <th><span class="red">*</span>Qty Required:</th>
	            <td><input type="text" size="20" id="quantity" name="quantity" class="inquiry_tabA_text" value="Please enter a number" onfocus="if(this.value=='Please enter a number'){this.value=''}" onblur="validateNum('quantity')">
	                <span class="hs">&nbsp;(Quantity information is important for accurate quotes)</span><span id="quantityInfo"></span></td>
	          </tr>
          </c:if>
          <tr>
            <th valign="top">Message:</th>
            <td><div class="fl"><textarea class="inquiry_tabA_area" onkeyup="counter(this);" maxlength="4000" name="remark" id="remark" onfocus="javascript:if(this.value=='Purchase detail information'){this.value='';}" onblur="javascript:if(this.value==''){this.value='Purchase detail information';}">Purchase detail information</textarea>
                    <br>Remaining: <span class="red_num csfs">4000</span> characters
                </div>
                <div class="inquiry_tabA_tips none">- Self introduction&nbsp;<br>
                   - Required specifications&nbsp;<br>
                   - Inquire about price/MOQ </div>
            </td>
          </tr>
<!--           <tr> -->
<!--             <th valign="top">Attach Files:</th> -->
<!--             <td>                                                                           -->
<!--                 <div id="uploadify" class="uploadify" style="height: 22px; width: 68px;"><object id="SWFUpload_0" type="application/x-shockwave-flash" data="/js/uploadify/uploadify.swf?preventswfcaching=1455670353458" width="68" height="22" class="swfupload" style="position: absolute; z-index: 1;"><param name="wmode" value="transparent"><param name="movie" value="/js/uploadify/uploadify.swf?preventswfcaching=1455670353458"><param name="quality" value="high"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="flashvars" value="movieName=SWFUpload_0&amp;uploadURL=%2Finquire%2Fcontact_us.php%3Fact%3Duploadfile&amp;useQueryString=false&amp;requeueOnError=false&amp;httpSuccess=&amp;assumeSuccessTimeout=30&amp;params=timestamp%3D1455670288%26amp%3Btoken%3D9114c0e594e318bcaf69d2a8b0dde23a&amp;filePostName=Filedata&amp;fileTypes=*.jpg%3B*.jpeg%3B*.gif%3B*.bmp%3B*.png%3B*.pdf%3B*.xls%3B*.xlsx%3B*.doc%3B*.docx%3B*.txt&amp;fileTypesDescription=All%20Files&amp;fileSizeLimit=0&amp;fileUploadLimit=0&amp;fileQueueLimit=3&amp;debugEnabled=false&amp;buttonImageURL=%2Finquire%2F&amp;buttonWidth=68&amp;buttonHeight=22&amp;buttonText=&amp;buttonTextTopPadding=0&amp;buttonTextLeftPadding=0&amp;buttonTextStyle=color%3A%20%23000000%3B%20font-size%3A%2016pt%3B&amp;buttonAction=-110&amp;buttonDisabled=false&amp;buttonCursor=-2"></object><div id="uploadify-button" class="uploadify-button " style="text-indent: -9999px; height: 22px; line-height: 22px; width: 68px; background-image: url(http://www.Sino-Sources/images/upload.gif);"><span class="uploadify-button-text">Upload</span></div></div> -->
                
<!--                 <ul class="files_list" style="display:none;height:auto;" id="queue1"></ul> -->
<!-- 				<ul class="files_list" style="display:none;" id="queue"></ul> -->
<!--             </td> -->
<!--           </tr> -->

		  <tr name="compInfo">
            <th><span class="red">*</span>Company Name :</th>
            <td><input type="text" name="companyID" id="companyID" class="inquiry_tabA_text" value="" size="50"><span id="inquire_companyInfo" style="display:block"></span></td>
		  </tr>

		  <tr name="compInfo">
            <th><span class="red">*</span>Telephone :</th>
            <td><input type="text" name="staffID" id="staffID" class="inquiry_tabA_text" value="" size="50"><span id="inquire_phoneInfo" style="display:block"></span></td>
		  </tr>

          <tr>
            <th>&nbsp;</th>
            <td><input type="submit" value="Send" class="suggest_btn send_btn" onclick="inquiredSend();"></td>
          </tr>
	</div>
          </tr>
        </tbody></table>
    </div>
    <hr>	
	<div class="inquiry_tabA">
		<table  cellspacing="0" cellpadding="0"  width="100%">
		  <tr>
          	<th><b>Service Number:</b></th>
          	<td><span style="color: red">${com_tel}</span></td>
          	<th><b>Service Email:</b></th>
          	<td><span style="color: red">${com_mail}</span></td>
          </tr>
          <tr>
          	<th><b>Skype:</b></th>
          	<td><span style="color: red">${Skype}</span></td>
          	<th><b>Whatsapp:</b></th>
          	<td><span style="color: red">${Whatsapp}</span></td>
		  </tr>
		</table></div>
    </form>
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
// 	    try{
// 		ga('send', 'event', 'contact us', 'contact us:submit', 'contact us:submit:normal');
// 		}catch(e){}

// 		var upload_file='';	
// 		for(var i in uploadAttachArr){		
// 			var tmpStr = '';
// 			if(uploadAttachArr[i]){
// 				tmpStr = '{"content_name":"'+uploadAttachArr[i].content_name+'","content_file_name":"'+uploadAttachArr[i].content_file_name+'"}';
// 				if(upload_file!=''){ tmpStr='|||'+tmpStr; }
// 			}		
// 			upload_file += tmpStr;
// 		}	
		
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