<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"
	session="false"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<ehang:Main>
	<form
		action="${pageContext.request.contextPath}/create/docreateSDproduct"
		method="POST" class="form-horizontal">
		<div class="form-group">
			<label for="product_name" class="col-sm-2 control-label">产品名称</label>
			<div class="col-sm-9">
				<input type="text" id="product_name" name="product_name"
					class="form-control" placeholder="产品简介">
			</div>
		</div>
		<div class="form-group">
			<label for="product_describe" class="col-sm-2 control-label">产品简介</label>
			<div class="col-sm-9">
				<input type="text" id="product_describe" name="product_describe"
					class="form-control" placeholder="产品简介">
			</div>
		</div>
		<div class="form-group">
			<label for="product_price" class="col-sm-2 control-label">产品价格</label>
			<div class="col-sm-9">
				<input type="text" id="product_price" name="product_price"
					class="form-control" placeholder="产品价格">
			</div>
		</div>
		<div class="form-group">
			<label for="mon_supply_capability" class="col-sm-2 control-label">月供货量</label>
			<div class="col-sm-9">
				<input type="text" id="mon_supply_capability" name="mon_supply_capability"
					class="form-control" placeholder="月供货量">
			</div>
		</div>
		
		<div class="form-group">
			<label for="show_img" class="col-sm-2 control-label">产品图像</label>
			<div class="col-sm-9">
				<cc:fileupload uploadpath="/articleshowimg" actionurl="/upload/uploadfile"
				id="showimg" name="show_img" srcname="article_attachshowname">附件上传</cc:fileupload>
			</div>
		</div>
		<div class="form-group">
			<label for="addtype" class="col-sm-2 control-label">产品目录</label>
			<div class="col-sm-2">
				<ehang:TableSelect valuename="moduleid" showname="modulename" resultname="result" id="typeid"></ehang:TableSelect>
			</div>
			
			<div class="col-sm-5">
				<input type="submit" value="提交文章" class="btn btn-primary">
		    </div>
		</div>
		<div class="form-group">
			<div class="col-sm-12">
				<div class="container-fluid">
					<script id="editor" type="text/plain"
						style="width: 100%; height: 500px;"></script>
				</div>
			</div>
		</div>
		<script type="text/javascript" charset="utf-8"
			src="${pageContext.request.contextPath}/ueditor/ueditor.config.js"></script>
		<script type="text/javascript" charset="utf-8"
			src="${pageContext.request.contextPath}/ueditor/ueditor.all.js"></script>
		<script type="text/javascript" charset="utf-8"
			src="${pageContext.request.contextPath}/ueditor/lang/zh-cn/zh-cn.js"></script>
		<script type="text/javascript">
			//实例化编辑器
			//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
			var ue = UE.getEditor('editor');
		</script>
	</form>


<cc:ScriptEnd></cc:ScriptEnd>
</ehang:Main>
