<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="tcb"%>
<title>我的账户</title>
<tcb:tcbmain>
	<div class="panel panel-success">
		<div class="panel-heading">
			<h5>
				<b>我的账户</b>
			</h5>
		</div>

		<div>
			<div class="list-group">
				<c:forEach var="accountitem" items="${accountlist}" varStatus="flag">
					<a href="#"
						class="list-group-item">
						<div>
							<h4 class="list-group-item-heading">${accountitem.accounttype}:${accountitem.acctvalue}元</h4>
						</div>
					</a>
				</c:forEach>
				<div class="row">
					<div class="col-md-6 blockquote-reverse"><a href="/tcb/payin" role="button" class="btn btn-primary active">充值</a></div>
					<div class="col-md-6"><a  href="/tcb/payout" role="button" class="btn btn-warning active">提现</a></div>					
				</div>
			</div>
		</div>
	</div>
</tcb:tcbmain>