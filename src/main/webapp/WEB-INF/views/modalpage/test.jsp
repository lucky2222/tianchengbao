<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>

		<div class="row">
			<div class="col-md-3">
				<div id="myDropdown" class="dropdown">
					<cc:autocomelete id="testrolea" name ="qishigang" showid="PortNameEN1a" showname="PortNameEN2"
					showfieldid="NameEN"  urlref="${pageContext.request.contextPath}/sysmanage/portautocomplete"  clazz="form-control"
					valuefieldid="PortID" placeholder="装货港" minchars="3" />
				  </div>
			</div>
			<div class="col-md-3">
				<cc:ehangselect groupname="test" name="teststate" classname="form-control"  initvalue="1"/>
			</div>
		</div>

	<cc:ScriptEnd></cc:ScriptEnd>