<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="tcb"%>
<title>首页</title>
<tcb:tcbdetail>
		<!-- 产品展示开始-->
			<div class="panel panel-success">
				  <div class="panel-heading">
					<h5><b>产品详情</b></h5>
				  </div>
				  <form action="/tcb/saleproduct">
				  <div class="panel-body">
						 <div>
							<h4 class="list-group-item-heading">年化收益:${productinfo.preprofityear}%</h4>	
							<hr/>
							<dl>
							<span style="color:#999999">起投金额&nbsp;&nbsp;</span><span style="color:#FF0000">${productinfo.baseprice}</span>
							<span style="color:#999999">元</span><i>|</i>
							<span style="color:#999999">锁定期&nbsp;&nbsp;</span><span style="color:#FF0000">${productinfo.lockday}</span>
							<span style="color:#999999">天</span>
							</dl>
							<dl>
							<span style="color:#999999">目前完成&nbsp;&nbsp;</span><span style="color:#FF0000">${productinfo.finishpercent}</span>
							<span style="color:#999999">%</span><i>|</i>
							<span style="color:#999999">总量&nbsp;&nbsp;</span><span style="color:#FF0000">${productinfo.allsale}</span>
							<span style="color:#999999">万元</span>
							</dl>
							<dl>
								  <div class="form-group" >		
									<label  for="buyPrice"><span class="glyphicon glyphicon-phone-alt"></span>&nbsp;&nbsp;购买金额</label>
									<input class="form-control"   name="buyPrice" id="buyPrice" type="text" value="${productinfo.price}" placeholder="必填">
								  </div>
							</dl>
							<hr/>
						</div>
				
				  <!--注册按钮---登陆后不可见 -->
				  <button id="saleproduct" name="saleproduct" type="submit" class="btn btn-danger  btn-block">立即购买</button>
				  </form>
				  <div>
				  	<h5>项目介绍</h5>
					<p>
						${productinfo.productdesc}
					</p>
				  </div>
				  </div>
				  
				

		<!-- 产品展示结束-->
		</tcb:tcbdetail>