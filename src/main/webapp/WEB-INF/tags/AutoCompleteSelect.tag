<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<!-- 要调用的sqlref -->
<%@ attribute name="sqlref" required="true" rtexprvalue="true" %>
<!-- 展示名称 -->
<%@ attribute name="showname" required="true" rtexprvalue="true" %>
<!-- 返回变量名称 -->
<%@ attribute name="valuename" required="true" rtexprvalue="true" %>
<!-- 最小触发字符数 -->
<%@ attribute name="minChars" required="true" rtexprvalue="true" %>
<!-- 后台参数名称 -->
<%@ attribute name="paraname" required="true" rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->

<div class="row-fluid">
<input id="${id}"  name="${id}" type="text"  value=""  minChars="${minChars}" class="form-control">
<img id="${id}_load_img"  name="${id}_load_img" src="${pageContext.request.contextPath}/resources/image/icoLoading.gif" style="display:none;">
<input id="${id}_hidden_value"  name="${id}_hidden_value" type="hidden"  value="${initvalue}">
<div id="${id}_autoList">
	
</div>
</div>
<script>
<!--初始化执行-->
	$(function(){
		$("#${id}").autocomplete({
		      source: function( request, response ) {
		    	  var params = {};
		    	  params['${id}_input'] = encodeURIComponent(request.term);
		        $.ajax({
		          url: '${pageContext.request.contextPath}/autocompleteselect/ajax',
		          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		          dataType: "html",
		          beforeSend:function(xhr){
		        	  $("#${id}_load_img").show();
		          },
		          data: {
		        	  "${paraname}_input" : encodeURIComponent(request.term),
		        	  "sqlref":"${sqlref}",
		        	  "showname":"${showname}",
		        	  "valuename":"${valuename}"
		          },
		          success: function( data ) {
		        	$("#${id}_autoList").html(data);
		        	$("#${id}_autoList table").addClass("table table-striped table-bordered table-hover table-condensed dropdown-menu");
		        	$("#${id}_autoList table tr").on('click', function (e) {
		        		var cols='';
		        		var text = $(this).attr('rowname');
		        		var value = $(this).attr('rowvalue');
		        		$('#${id}').val(text);
		        		$('#${id}_hidden_value').val(value);
		        		$("#${id}_autoList table").hide();
		        	});
		        	$("#${id}_load_img").hide();
		        	$("#${id}_autoList table").show();
		          }
		        });
		      },
		      minLength: '${minChars}'
		    });
			
			//绑定选中下拉
			$("#${id}").focus(function() {
				if($("#${id}_autoList table"))
				{
					$("#${id}_autoList table").show();
				}
			});
	});
</script>