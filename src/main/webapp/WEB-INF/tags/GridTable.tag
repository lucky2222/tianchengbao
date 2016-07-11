<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 标签参数 -->
<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="resultname" required="true" rtexprvalue="true" %>
<%@ attribute name="actionurl" required="true" rtexprvalue="true" %>
<!-- 扩展字段 -->
<%@ attribute name="fieldname" required="false" rtexprvalue="true" %>
<%@ attribute name="expname" required="false" rtexprvalue="true" %>
<!-- 转换结果集访问名称 -->
<%
	if(actionurl!=null&&actionurl.length()>0&&actionurl.substring(0,1).equals("/"))
	{
		jspContext.setAttribute("actionurl",actionurl.substring(1));
	}
	if(fieldname!=null&&fieldname.length()>0)
	{
		String[] fields =fieldname.split("\\,");
		jspContext.setAttribute("fields",fields);
	}
	jspContext.setAttribute("result",request.getAttribute(resultname));
%>
<div class="container-fluid">
<div class="row">
<table data-toggle="table"
       data-show-columns="true"
       data-search="true"
       data-show-toggle="true"
       data-toolbar="#toolbar"
			 id="${id}" >
		<thead>
        <tr class="info">
        	<c:if test="${fields!=null}">
        		<c:forEach var="item" items="${fields}"  varStatus="flag">
        			<th data-field="${item}">${item}</th>
        		</c:forEach>
        	</c:if>
        	<c:if test="${fields==null}">
	        	<th>序号<input id="${id}_hidden_ordercondition" name="${id}_hidden_ordercondition" type="hidden" value="${result.orderbyfieldStr}"></th>
	        	<c:forEach var="item" items="${result.fieldlist}"  varStatus="flag">
	        		<c:if test="${item.get('sortflag')=='1'}"><th data-field="${item.get('fieldname')}" class="sorting_asc_disabled" data-ordervalue="${item.get('fieldid')}">${item.get('fieldname')}</th></c:if>
	        		<c:if test="${item.get('sortflag')=='2'}"><th data-field="${item.get('fieldname')}" class="sorting_desc_disabled" data-ordervalue="${item.get('fieldid')}">${item.get('fieldname')}</th></c:if>
	        		<c:if test="${item.get('sortflag')=='3'}"><th data-field="${item.get('fieldname')}" class="sorting_asc" data-ordervalue="${item.get('fieldid')}">${item.get('fieldname')}</th></c:if>
	        		<c:if test="${item.get('sortflag')=='4'}"><th data-field="${item.get('fieldname')}" class="sorting_desc" data-ordervalue="${item.get('fieldid')}">${item.get('fieldname')}</th></c:if>
	        		<c:if test="${item.get('sortflag')=='0'}"><th data-field="${item.get('fieldname')}">${item.get('fieldname')}</th></c:if>
	        	</c:forEach>
	        	<c:forEach var="exp" items="${expname}" varStatus="flag">
	        		<th data-field="${exp}">${exp}</th>
	        	</c:forEach>
        	</c:if>
        </tr>
      	</thead>
		<tbody>
			<jsp:doBody/>
		</tbody>
	</table>
		<!-- 表尾 -->
	<div class="container-fluid">
	<div class="row">
		<div class="col-sm-6 perpage" >
			<c:if test="${result.resultlist.size()>0}" var="name">
				<h5>显示第${result.fstart}至${result.end}项记录，共${result.allcount}项，共${result.allpage}页,转到第<input id="${id}_topagenum"  name="${id}_topagenum" type="text" size="1" maxlength="4" value="${result.pagenum}">页，每页显示 <select  id="${id}_perpagenum" name="${id}_perpagenum" >
						  	<option value=10>10</option>
						  	<option value=20>20</option>
						  	<option value=50>50</option>
						  	<option value=100>100</option>
						  </select>项</h5>
			</c:if>
		</div>
		
		<div class="col-sm-6 pagenumline" >
			<c:if test="${result.resultlist.size()>0}" var="name">
				<nav class="text-right">
					<ul class="pagination pagination-sm">
						<li><a href="#" onclick="goPageNum(1);">第一页</a></li>
						<c:if test="${result.pagenum>1}">
							<li><a href="#" onclick="goPageNum(${result.prePagenum});">上一页</a></li>
						</c:if>
						<c:if test= "${result.pagenum<=1}">
							<li class="disabled"><a href="#">上一页</a></li>
						</c:if>
						<c:forEach var="pagenum" items="${result.showpagenum}"  varStatus="flag">
							<c:if test="${pagenum==result.pagenum}">
								<li class="active"><a href="#" onclick="goPageNum(${pagenum});">${pagenum}</a></li>
							</c:if>
							<c:if test="${pagenum!=result.pagenum}">
								<li><a href="#" onclick="goPageNum(${pagenum});">${pagenum}</a></li>
							</c:if>
						</c:forEach>
			
						<c:if test="${result.pagenum<result.allpage}">
							<li><a href="#" onclick="goPageNum(${result.nextPagenum});">下一页</a></li>
						</c:if>
						<c:if test="${result.pagenum>=result.allpage}">
							<li class="disabled"><a href="#">下一页</a></li>
						</c:if>
						<li><a href="#" onclick="goPageNum(${result.allpage});">最后一页</a></li>
						
					</ul>
				</nav>
				<input id="${id}_hidden_condition" name="${id}_hidden_condition" type="hidden" value="${result.conditionStr}">
			</c:if>
		</div>
	</div>
	</div>
</div>
</div>

<!-- 表尾 end -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/bootstrap-table.min.css">
<!-- Latest compiled and minified Locales -->
<script src="${pageContext.request.contextPath}/resources/js/sysmanage/bootstrap-table.min.js"></script>
<!-- Latest compiled and minified Locales -->
<script src="${pageContext.request.contextPath}/resources/js/sysmanage/bootstrap-table-zh-CN.min.js"></script>
	
	<!-- 表尾 end -->
	<script>
	<!--初始化执行-->
	function goPageNum(num)
	{
		location.href = encodeURI(encodeURI("${pageContext.request.contextPath}/${actionurl}?topagenum="+num+"&${id}_hidden_condition="+$('#${id}_hidden_condition').val()+"&perpagenum="+$('#${id}_perpagenum').find("option:selected").text()+$('#${id}_hidden_ordercondition').val()));
	}
	function tableinit(){
		if(window.localStorage){
			var hidefield = localStorage.getItem("${id}.hidefield");//获取隐藏列的值
			if(hidefield!=null)
			{
				var fields = hidefield.split(",");
				for(var i=0;i<fields.length;i++)
				{
					$("#${id}").bootstrapTable("hideColumn",fields[i]);
				}
			}
		}
	}
	$(function(){
		$('th.sorting_asc_disabled').click(function(){
			$('#${id}_hidden_ordercondition').val("&${id}_orderby="+$(this).data('ordervalue')+"|asc");
			goPageNum('1');
		});
		$('th.sorting_desc_disabled').click(function(){
			$('#${id}_hidden_ordercondition').val("&${id}_orderby="+$(this).data('ordervalue')+"|desc");
			goPageNum('1');
		});
		$('th.sorting_asc').click(function(){
			$('#${id}_hidden_ordercondition').val("&${id}_orderby="+$(this).data('ordervalue')+"|desc");
			goPageNum('1');
		});
		$('th.sorting_desc').click(function(){
			$('#${id}_hidden_ordercondition').val("&${id}_orderby="+$(this).data('ordervalue')+"|asc");
			goPageNum('1');
		});
		//选中每页显示数
		$('#${id}_perpagenum').val('${result.perpage}');
		//注册每页显示数更改事件
		$('#${id}_perpagenum').change(function(){
			goPageNum('${result.pagenum}');
		});
		$('#${id}_topagenum').bind('keypress',function(event){
			if(event.keyCode == "13")    
            {
				goPageNum($('#${id}_topagenum').val());
				return false;
            }
		 });
		$('#${id}').on('column-switch.bs.table', function (e, field, checked) {
			var temphidefield = "";
			 if(checked)//从隐藏列中去掉此字段----------------------------------------此处有问题
		     {
				var hidefield = localStorage.getItem("${id}.hidefield");//获取隐藏列的值
				if(hidefield!=null)
				{
						var fields = hidefield.split(",");
						for(var i=0;i<fields.length;i++)
						{
							if(fields[i]=="")
							{
								continue;
							}
							if(fields[i]==field)
							{
								fields[i]="";
								continue;
							}
							temphidefield = temphidefield +","+fields[i];
						}
				}
		    }else{
		    	//新增隐藏列
		    	var hidefield = localStorage.getItem("${id}.hidefield");//获取隐藏列的值
				if(hidefield!=null)
				{
		    		temphidefield = hidefield+","+field;
				}else{
					temphidefield =field;
				}
		    }
			localStorage.setItem("${id}.hidefield",temphidefield);
	    });
		
		tableinit();
	});
	
	</script>
	