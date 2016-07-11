<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<ehang:Main>
<form action="${pageContext.request.contextPath}/sysmanage/sqlmanage" method="POST" class="form-horizontal">
	<div class="form-group">
	    <label for="codepath" class="col-sm-2 control-label">表名称</label>
	    <div class="col-sm-3">
			<input type="text" id="codepath" name="codepath" class="form-control" placeholder="表名称"  value="${codepath}">
	    </div>
	    
	    <label for="codeid" class="col-sm-2 control-label">SQL名称</label>
	    <div class="col-sm-3">
			<input type="text" id="codeid" name="codeid" class="form-control" placeholder="SQL名称"  value="${codeid}">
	    </div>
	    
	    <div class="col-sm-2">
			<input type="submit" value="查询" class="btn btn-default btn-seach">
	    </div>
	    
	</div>
	<div class="form-group">
		<label for="sqlcode" class="col-sm-2 control-label">SQL关键字</label>
	    <div class="col-sm-8">
			<input type="text" id="sqlcode" name="sqlcode" class="form-control" placeholder="SQL名称"  value="${sqlcode}">
	    </div>
	</div>
	</form>
	<div id="toolbar" class="btn-group">
	    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-type="add">
	        <i class="glyphicon glyphicon-plus">新增SQL</i>
	    </button>
	</div>
	<ehang:GridTable id="sqllist" resultname="result" actionurl="sysmanage/sqlmanage" expname="操作">
		<c:forEach var="item" items="${result.resultlist}"  varStatus="flag">
      		<tr>
      			<td>${flag.count}</td>
      			<td>
      				<a href="#" data-toggle="modal" data-target="#myModal" data-type="update"
      						data-codepath="${item.get('codepath')}" data-count="${flag.count}"
      			 			data-codeid="${item.get('codeid')}">${item.get('codepath')}</a>
      			</td>
      			<td>${item.get('codeid')}</td>
      			<td>
      				<c:if test="${item.get('codetype')=='select'}">
      					<a href="#" data-toggle="modal" data-target="#fieldModal"
      						data-codepath="${item.get('codepath')}"
      			 			data-codeid="${item.get('codeid')}">
      						${item.get('codetype')}
      					</a>
      				</c:if>
      				<c:if test="${item.get('codetype')!='select'}">
      					${item.get('codetype')}
      				</c:if>
      			</td>
      			<td title="${item.get('codepath')}.${item.get('codeid')}" data-content="${item.get('sqlcode')}" data-toggle="popover" data-placement="top">
      				<c:if test="${item.get('sqlcode').length()>=20}">
      					${item.get('sqlcode').substring(0,20)}
      				</c:if>
      				<c:if test="${item.get('sqlcode').length()<20}">
      					${item.get('sqlcode')}
      				</c:if>
      			</td>
      			<td>${item.get('updatestaff')}</td>
      			<td>${item.getDateTimeStr('updatetime')}</td>
      			<td>${item.get('remark')}</td>
      			<td><a href="#" data-toggle="modal" data-target="#myModal" data-type="del"  
      							data-codepath="${item.get('codepath')}"  data-count="${flag.count}"
      			 				data-codeid="${item.get('codeid')}">删除</a></td>
      		</tr>
      	</c:forEach>
	</ehang:GridTable>
	
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog modal-lg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">新建SQL对象</h4>
	      </div>
	      <div class="modal-body">
	      	<form class="form-horizontal">
	      	<div class="form-group">
	      		<div class="col-sm-10">
	      			<div class="form-group">
		            <label for="addcodepath" class="col-sm-2 control-label">表名称:</label>
		            <div class="col-sm-4">
		            	
		            	<ehang:AutoComplete id="addcodepath" showid="codepathauto" 
				 minChars="2" showfieldid="codepath" valuefieldid="codepath"
				urlref="${pageContext.request.contextPath}/sysmanage/sqlmanagecodepathautocomplete" placeholder="选择表" 
				classstyle="form-control "  initflag="true"></ehang:AutoComplete>
		            </div>
		            <label for="addcodeid" class="col-sm-2 control-label"><font color="red">&lowast;</font>SQL名称:</label>
		            <div class="col-sm-4">
		            	<input type="text" class="form-control" id="addcodeid">
		            </div>
		          </div>
		          <div class="form-group">
		            <label for="addcodetype" class="col-sm-2 control-label">SQL类型:</label>
		            <div class="col-sm-4">
		            	<input class="form-control" id="addcodetype">
		            </div>
		          </div>
		          <div class="form-group">
		            <label for="addsqlcode" class="col-sm-2 control-label">SQL内容:</label>
		            <div class="col-sm-10">
		            	<textarea id="addsqlcode" class="form-control" rows="4"></textarea>
		            </div>
		          </div>
		          <div class="form-group">
		            <label for="addremark" class="col-sm-2 control-label">备注:</label>
		            <div class="col-sm-10">
		            	<textarea id="addremark" class="form-control" rows="3"></textarea>
		            </div>
		          </div>
	      		</div>
                <div class="col-sm-10">
	      		<div class="col-sm-4 ParamInfoc" id="ParamInfo">
	      			
	      		</div></div>
	      	</div>
	        </form>
	        <div class="row table-responsiveauto" id="testresult" >
		       
	        </div>
	      </div>
	      <div class="modal-footer">
	      	<input id="addcount" name="addcount" type="hidden" value="">
	        <button type="button" class="btn btn-default btn-fanqi" data-dismiss="modal">放弃</button>
	        <button id = "testSQL" type="button" class="btn btn-primary">测试SQL</button>
	        <button id = "addSQL" type="button" class="btn btn-primary" operatetype="">保存SQL</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	<div class="modal fade" id="fieldModal" tabindex="-1" role="dialog" aria-labelledby="fieldModalLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog modal-lg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="fieldModalLabel">配置查询SQL的表头</h4>
	      </div>
	      <div class="modal-body">
	      	<form class="form-horizontal">
	      	<div class="form-group">
	      		<div class="col-sm-12" id="HeadInfo">
	      			
	      		</div>
	      	</div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">放弃</button>
	        <button id = "addSQLHead" type="button" class="btn btn-primary" operatetype="">保存表头</button>
	      </div>
	    </div>
	  </div>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/sysmanage/sqlcode.js"></script>
</ehang:Main>