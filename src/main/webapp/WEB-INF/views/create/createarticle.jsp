<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"
	session="false"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<ehang:Main>
	<form
		action="${pageContext.request.contextPath}/create/docreateweiarticle"
		method="POST" class="form-horizontal">
		<div class="form-group">
			<label for="title" class="col-sm-2 control-label">文章名称</label>
			<div class="col-sm-9">
				<input type="text" id="title" name="title"
					class="form-control" placeholder="文章名称">
			</div>
		</div>
		<div class="form-group">
			<label for="addtitle" class="col-sm-2 control-label">文章关键字</label>
			<div class="col-sm-9">
				<input type="text" id="keywords" name="keywords"
					class="form-control" placeholder="文章关键字">
			</div>
		</div>
		<div class="form-group">
			<label for="showimg" class="col-sm-2 control-label">文章图像</label>
			<div class="col-sm-9">
				<cc:fileupload uploadpath="articleshowimg" actionurl="/upload/uploadfile"
				id="showimg" name="showimg" srcname="article_attachshowname">附件上传</cc:fileupload>
			</div>
		</div>
		<div class="form-group">
			<label for="addtype" class="col-sm-2 control-label">文章类型</label>
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
