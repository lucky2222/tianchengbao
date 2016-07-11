<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="tcb"%>
<title>首页</title>
<tcb:tcbmain>
		
		<!-- 活动分享按钮结束  -->
		<!-- 产品展示开始-->
			<div class="panel panel-success">
				  <div class="panel-heading">
					<h5><b>热销产品</b></h5>
				  </div>
				  
				  <div>
				  	<div class="list-group">
				  		<c:forEach var="productinfo" items="${productlist}"  varStatus="flag">
							<a href="/tcb/productdetail/${productinfo.id}" class="list-group-item">
							  	<div class="rate"><h4>${productinfo.preprofityear}%</h4>
								 <p class="shouyi">年化收益</p></div>
								 <div>
									<h4 class="list-group-item-heading">${productinfo.productname}</h4>
									<p class="list-group-item-text"><span style="color:#999999">起投金额</span><span style="color:#FF0000">${productinfo.baseprice}</span>
									<span style="color:#999999">元</span><i>|</i>
									<span style="color:#999999">锁定期</span><span style="color:#FF0000">${productinfo.lockday}</span>
									<span style="color:#999999">天</span></p>
									<p class="list-group-item-text"><span style="color:#999999">目前完成</span><span style="color:#FF0000">${productinfo.finishpercent}</span>
									<span style="color:#999999">%</span><i>|</i>
									<span style="color:#999999">总量</span><span style="color:#FF0000">${productinfo.allsale}</span>
									<span style="color:#999999">万元</span></p>
								</div>
							  </a>
						</c:forEach>
					</div>
					
				  <!--注册按钮---登陆后不可见 -->
				  <c:if test="${empty onlineuser}">
				  	<a href="/register/register">
				  		<button type="button" class="btn btn-danger  btn-block">注册立即领取1000元大礼包</button>
				  	</a>
				  </c:if>
				  </div>
				  
				

			</div>
		<!-- 产品展示结束-->
	</tcb:tcbmain>