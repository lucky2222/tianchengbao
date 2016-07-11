<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<div>
	<form id="editing-form" data-editable-form="true">
		<div class="form-group">
		    <label for="rolemap">自动完成</label>
		    <cc:autocomelete id="testrole" name ="rolemap" placeholder="测试auto"/>
		 </div>
	</form>
</div>