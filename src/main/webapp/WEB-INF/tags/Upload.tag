<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="uploadpath" required="true" rtexprvalue="true" %>
<%@ attribute name="actionurl" rtexprvalue="true" %>
<%@ attribute name= "allowedTypes" rtexprvalue="true" %>
<%
	if(actionurl!=null&&actionurl.length()>0&&actionurl.substring(0,1).equals("/"))
	{
		//jspContext.setAttribute("actionurl",actionurl.substring(1));
	}else{
		jspContext.setAttribute("actionurl","/upload/uploadfile");
	}
	if(allowedTypes==null||allowedTypes.isEmpty())
	{
		allowedTypes = "*";
		jspContext.setAttribute("allowedTypes",allowedTypes);
	}
%>
<div>
	<div id="${id}_uploader" >
		<jsp:doBody/>
	</div>
	<input type="hidden" id="${id}" name="${id}">
	<div id="${id}_err" class="ajax-file-upload-error"></div>
</div>
<script>
	<!--
	$(function(){
		$("#${id}_uploader").uploadFile({
			url:"${actionurl}",
			multiple:false,
			allowedTypes:"${allowedTypes}",
			returnType:'json',
			formData: {"uploadpath":"${uploadpath}"},
			fileName:"myfile",
			showDelete:true,
			showStatusAfterSuccess:true,
			showAbort:true,
			showDone:false,
			maxFileCount:1,
			deleteCallback:function(data, pd){
				if(data.url==$("#${id}").val())
				{
					$("#${id}").val("");
				}
			},
			onSuccess:function(files, data, xhr, pd){
				$("#${id}").val(data.url);
			},
		});
		
	});
	-->	
</script>