<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang" %>
<ehang:Main>
<form action="${pageContext.request.contextPath}/sysmanage/menumanage.htm" method="POST" class="form-horizontal">
	<div class="form-group">
	    <label for="menuname" class="col-sm-2 control-label">菜单名称</label>
	    <div class="col-sm-3">
			<input type="text" id="menuname" name="menuname" class="form-control" placeholder="菜单名称"  value="${menuname}">
	    </div>
	    
	    <label for="menufile" class="col-sm-2 control-label">菜单路径</label>
	    <div class="col-sm-3">
			<input type="text" id="menufile" name="menufile" class="form-control" placeholder="菜单路径"  value="${menufile}">
	    </div>
	    
	    <div class="col-sm-2">
			<input type="submit" value="查询" class="btn btn-default btn-seach">
	    </div>
	    
	</div>
	</form>
	<div id="toolbar" class="btn-group">
	    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-type="add">
	        <i class="glyphicon glyphicon-plus">新增菜单</i>
	    </button>
	</div>
	<ehang:GridTable id="menulist" resultname="result" actionurl="sysmanage/menumanage" expname="操作">
		<c:forEach var="item" items="${result.resultlist}"  varStatus="flag">
      		<tr>
      			<td>${flag.count}</td>
      			<td>
      				<a href="#" data-toggle="modal" data-target="#updateModal" data-menuname="${item.get('menuname')}"
      				data-pid="${item.get('parentid')}" data-pname="${item.get('parentmenu')}" data-menufile="${item.get('menufile')}"
      				 data-func="${item.get('functionright')}" data-sortnum="${item.get('sortnum')}" data-menuid="${item.get('menuid')}"
      				>${item.get('menuname')}</a>
      			</td>
      			<td>${item.get('parentmenu')}</td>
      			<td>${item.get('menufile')}</td>
      			<td>${item.get('functionright')}</td>
      			<td>${item.get('sortnum')}</td>
      			<td>${item.get('updatestaff')}</td>
      			<td>${item.get('updatetime')}</td>
      			<td><a href="#" data-toggle="modal" data-target="#deleteModal"  data-menuname="${item.get('menuname')}"
      			 data-menuid="${item.get('menuid')}">删除</a></td>
      		</tr>
      	</c:forEach>
	</ehang:GridTable>
	
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">新建菜单</h4>
	      </div>
	      <div class="modal-body">
	      	<form class="form-horizontal">
	      	   <div class="form-group">
	            <label for="parentmenu" class="col-sm-2 control-label">上级菜单:</label>
	            <div class="col-sm-9">
	            	<ehang:TableSelect id="parentmenu" resultname="parentmenuresult"  valuename="menuid" showname="menuname" ></ehang:TableSelect>
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="menuname" class="col-sm-2 control-label"><font color="red">&lowast;</font>菜单名称:</label>
	            <div class="col-sm-9">
	            	<input type="text" class="form-control" id="addmenuname">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="menufile" class="col-sm-2 control-label">菜单路径:</label>
	            <div class="col-sm-9">
	            	<input class="form-control" id="addmenufile">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="functionright" class="col-sm-2 control-label">权限编码:</label>
	            <div class="col-sm-9">
	            	<input type="text" class="form-control" id="addfunctionright">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="sortnum" class="col-sm-2 control-label">排列顺序:</label>
	            <div class="col-sm-9">
	            	<input type="number" class="form-control" id="addsortnum" min="0" max="100">
	            </div>
	          </div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-fanqi" data-dismiss="modal">放弃</button>
	        <button id = "addMenu" type="button" class="btn btn-primary">保存菜单</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
		<div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="updateModal">菜单更新</h4>
	      </div>
	      <div class="modal-body">
	      	<form class="form-horizontal">
	      	   <div class="form-group">
	            <label for="parentmenu" class="col-sm-2 control-label">上级菜单:</label>
	            <div class="col-sm-10">
	            	<ehang:TableSelect id="upparentmenu" resultname="parentmenuresult"  valuename="menuid" showname="menuname" ></ehang:TableSelect>
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="menuname" class="col-sm-2 control-label"><font color="red">&lowast;</font>菜单名称:</label>
	            <div class="col-sm-10">
	            	<input type="text" class="form-control" id="upmenuname">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="menufile" class="col-sm-2 control-label">菜单路径:</label>
	            <div class="col-sm-10">
	            	<input class="form-control" id="upmenufile">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="functionright" class="col-sm-2 control-label">权限编码:</label>
	            <div class="col-sm-10">
	            	<input type="text" class="form-control" id="upfunctionright">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="sortnum" class="col-sm-2 control-label">排列顺序:</label>
	            <div class="col-sm-10">
	            	<input type="number" class="form-control" id="upsortnum" min="0" max="100">
	            	<input type="hidden" class="form-control" id="upmenuid">
	            </div>
	          </div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-fanqi" data-dismiss="modal">放弃</button>
	        <button id = "upMenu" type="button" class="btn btn-primary">更新菜单</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
		<div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="deleteModal">确认删除菜单</h4>
	      </div>
	      <div class="modal-body">
	      	<form class="form-horizontal">
	      	   
	          <div class="form-group">
	            <label for="menuname" class="col-sm-2 control-label">菜单名称:</label>
	            <div class="col-sm-10">
	            	<input type="text" class="form-control " id="delmenuname"  disabled>
	            	<input type="hidden" class="form-control" id="delmenuid">
	            </div>
	          </div>
	          
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-fanqi" data-dismiss="modal">放弃</button>
	        <button id = "delMenu" type="button" class="btn btn-primary">确认删除菜单</button>
	      </div>
	    </div>
	  </div>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/sysmanage/menu.js"></script>
</ehang:Main>