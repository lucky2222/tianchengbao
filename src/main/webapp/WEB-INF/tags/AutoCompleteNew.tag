<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="initflag"  rtexprvalue="true" %>
<%@ attribute name="showid"  rtexprvalue="true" %>
<%@ attribute name="placeholder"  rtexprvalue="true" %>
<%@ attribute name="classstyle"  rtexprvalue="true" %>
<%@ attribute name="value"  rtexprvalue="true" %>
<%@ attribute name="initvalue"  rtexprvalue="true" %>
<!-- 要调用的url -->
<%@ attribute name="urlref" required="true" rtexprvalue="true" %>
<!-- 展示名称 -->
<%@ attribute name="showfieldid" required="true" rtexprvalue="true" %>
<!-- 返回变量名称 -->
<%@ attribute name="valuefieldid" required="true" rtexprvalue="true" %>
<!-- 最小触发字符数 -->
<%@ attribute name="minChars" required="true" rtexprvalue="true" %>
<!-- JS回调函数 -->
<%@ attribute name="callback"  rtexprvalue="true" %>
<%@ attribute name="params"  rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->
<%
	if(classstyle==null||classstyle.isEmpty())
	{
		classstyle = "form-control";
		jspContext.setAttribute("classstyle",classstyle);
	}
	if(showid==null||showid.isEmpty())
	{
		showid=id+"_show";
		jspContext.setAttribute("showid",showid);
	}else{
		if(showid.equals(id))
		{
			id = id+"_"+id;
			jspContext.setAttribute("id",id);
		}
	}
	
%>
<div class="row-fluid">
<input id="${showid}"  name="${showid}" type="text"  value="${value}"  placeholder="${placeholder}"  class="${classstyle}">
<img id="${id}_load_img"  name="${id}_load_img" src="${pageContext.request.contextPath}/resources/image/icoLoading.gif" style="display:none;">
<input id="${id}"  name="${id}" type="hidden"  value="${initvalue}" minChars="${minChars}" params="${params}">
<div id="${id}_autoList" style="z-index:9999;">
	
</div>
</div>
<script>
<!--初始化执行-->
	$(function(){
		$("#${showid}").autocomplete({
		      source: function( request, response ) {
		    	var params = {};
		    	params['${showid}_input'] = encodeURIComponent(request.term);
		    	params['showname_input'] = "${showfieldid}";
		    	params['valuename_input'] = "${valuefieldid}";
		    	var paramnames = $('#${id}').attr("params").split(",");
		        for(i=0;i<paramnames.length;i++)
		        {
		        	params[paramnames[i]] =$("#"+paramnames[i]).val();
				}
		        $.ajax({
		          url: '${urlref}',
		          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		          dataType: "html",
		          beforeSend:function(xhr){
		        	$("#${id}_load_img").show();
		          },
		          data: params,
		          success: function( data ) {
		        	$("#${id}_autoList").html(data);
		        	$("#${id}_autoList table").addClass("table table-striped table-bordered table-hover table-condensed dropdown-menu");
		        	$("#${id}_autoList table tr").on('click', function (e) {
		        		var cols='';
		        		var text = $(this).attr('rowname');
		        		var value = $(this).attr('rowvalue');
		        		$('#${showid}').val(text);
		        		$('#${id}').val(value);
		        		$("#${id}_autoList table").hide();
		        		<%
		        			if(callback!=null)
		        			{
		        				out.println(callback+"();");
		        			}
		        		%>
		        		
		        	});
		        	$("#${id}_load_img").hide();
		        	$("#${id}_autoList table").show();
		          }
		        });
		      },
		      minLength: '${minChars}'
		    });
			//绑定选中下拉
			$("#${showid}").focus(function() {
				if($("#${id}_autoList table"))
				{
					$("#${id}_autoList table").show();
				}
			});
			if('${initflag}'=='true')
			{
				auto_page_init($("#${id}_autoList"),"${urlref}","${showid}","${id}","${showfieldid}","${valuefieldid}");
			}
			
	});
	
</script>