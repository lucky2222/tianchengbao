<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"
	session="false"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<ehang:Main>
	<form action="/shengda/userstat" method="POST" class="form-horizontal">
		<div class="form-group">
		    <label for="usertname" class="col-sm-1 control-label">用户账号</label>
		    <div class="col-sm-3">
				<input type="text" id="usertname" name="usertname" class="form-control" placeholder="用户账号" value="">
		    </div>
		    
		    <div class="col-sm-1">
				<input type="submit" value="查询" class="btn btn-default">
		    </div>
		    
		</div>
	</form>

	<table class="table">
	<thead>
        <tr>
        	<th>登录用户</th>
        	<th>公司</th>
        	<th>联系电话</th>
        	<th>最后登录时间</th>
        	<th>总登录次数</th>
        	<th>操作</th>
        </tr>
    </thead>
	<c:forEach var="item" items="${sdProductlist}"  varStatus="flag">
      		<tr>
      			<td><nobr>${item.Staffid}</nobr></td>
      			<td><nobr>${item.company}</nobr></td>
      			<td><nobr>${item.tel}</nobr></td>
      			<td><nobr>${item.lastTime}</nobr></td>
      			<td><nobr>${item.count}</nobr></td>
      			<td><nobr>
      				<a href="javascript:void(0);" onclick="showmodify('${item.Staffid}')">密码修改</a>
      			</nobr></td>
      			
      		</tr>
      	</c:forEach>
      	</table>
<!--BEGIN:page-->
	<div class="page">

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
<div class="modal fade" id="xiugaiplan">
  <div class="modal-dialog">
  <form action="/create/domodifyPassword" method="post">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">密码修改</h4>
      </div>
      <div class="modal-body">
      		<input type="hidden" name="Staffid" id="Staffid"/>			
			 <div class="form-group">
			    <label for="product_price">User Password</label>
			    <input type="text" class="form-control" id="Password" name="Password" placeholder="Password" value=""/>
			  </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="submit" class="btn btn-primary" onclick="checknull()">修改</button>
      </div>
    </div><!-- /.modal-content --></form>
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<script>
	function showmodify(a){
		$('#xiugaiplan').modal('show');
		$('#Staffid').val(a);
	}
	
	function checknull(){
		if($('#Password').val()==""){
			alert("please input Password value;")	
			return false;
		}
			
	}
</script>

<script type="text/javascript">
function goPageNum(num)
{
	if(num==0){
		alert("this is first page!");
	}else{
		location.href = encodeURI(encodeURI("/shengda/userstat?topagenum="+num+"&sqllist_hidden_condition="+$('#product_hidden_condition').val()+"&perpagenum=10"));
	}
}
</script>
<cc:ScriptEnd></cc:ScriptEnd>
</ehang:Main>