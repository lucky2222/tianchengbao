<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="tcb"%>
<title>提现</title>
<tcb:tcbmain>
	<div class="panel panel-success">
		<div class="panel-heading">
			<h5>
				<b>账户充值</b>
			</h5>
		</div>

		<div>
			<form action="/tcb/account/dopayin">
			  <div class="form-group">
			    <label for="count">提现金额：</label>
			    <input type="number" class="form-control" id="count" placeholder="提现金额">
			  </div>
			  <button type="submit" class="btn btn-default">提现</button>
			</form>
		</div>
	</div>
</tcb:tcbmain>