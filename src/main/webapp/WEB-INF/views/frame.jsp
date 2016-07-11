<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<!DOCTYPE HTML>
<html>
<head>
	<title>主页</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<title>Certificates - Sino East Steel Enterprise Co., Ltd.</title>
	<meta name="keywords" content="register">
	<meta name="description" content="register - Sino East Steel Enterprise Co., Ltd.">
	
<!-- 暂时保留老网站的css和js 开始-->
	<link rel="shortcut icon" href="favicon.ico" />
	<link rel="icon" href="animated_favicon.gif" type="image/gif" />
	<link href="${pageContext.request.contextPath}/business/bcss/style.css" rel="stylesheet" type="text/css" />
	<link href="${pageContext.request.contextPath}/htm/css/sumcss.css" type="text/css" rel="stylesheet">
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/business/bjs/jquery.SuperSlide.2.1.js"></script>
<!-- 暂时保留老网站的css和js 结束-->
<style>
#category_tree{display:block;}

</style>


</head>
<body>
<div class="page-header ">
<div class="top_menu clearfix">
      <div class="top_nav fl"> 
      	 <font id="ECS_MEMBERZONE" > 您好，欢迎光临优的钢平台 ！ <a href="login.htm">登录</a><span class="linetop"></span><a href="regist.htm">免费注册</a></font> 
      </div>
      <div class="top_nav fr">
        <a href="#" target="_blank" id="ECS_CARTINFO"><a href="#" title="查看购物车">购物车 0 件</a></a>
        <span class="linetop">|</span>
        <a href="pick_out.php" >客户中心</a>
        <span class="linetop">|</span>
        <a href="tag_cloud.php" >联系我们</a>
        <span class="linetop">|</span>
        <a href="quotation.php" >U的钢资讯</a>
        <span class="linetop">|</span>
        <a href="#" target="_blank">手机APP</a>
      </div>
    </div>
</div>
<div class="zt_header_box">
    <div style="height: 70px" class="zt_header_sign">
        <a class="zt_header_logo" href="/"><img src="${pageContext.request.contextPath}/business/bimages/footer_bottom.png" width="240"  /></a>
        <div style="z-index: 9999" class="zt_header_search">
            <div style="z-index: 1; position: relative; margin: -22px 0px 0px -37px; WIDTH: 540px; height: 70px"></div>
            <div style="z-index: 2; position: relative; margin: -48px 0px 0px" class="zt_header_search_bg">
                <form id="searchForm" name="searchForm" method="get" action="search.php" onSubmit="return checkSearchForm()">
                    <input name="keywords" type="text" class="zt_header_search_input" id="keyword" value="请输入关键词" onclick="javascript:this.value='';"> 
                    <input style="filter: alpha(opacity=100); background:#365eab; opacity:1" name="btsearch" type="submit" id="btsearch" value="搜索" class="zt_header_search_btn" > 
                </form>
                <div class="clear"></div>
            </div>
            <p style="z-index: 3; position: relative" class=zt_header_search_hot>
                <a href="#" target="_blank">产品信息</a><span class="linetop" style="color:#666;" >|</span>
                <a href="#" target="_blank">平台资讯</a><span class="linetop" style="color:#666;" >|</span>
                <a href="#" target="_blank">货物追踪</a><span class="linetop" style="color:#666;display:none;" >|</span>
            </p>
        </div>
        <div class="fav_dis">
            <a href="#" target="_blank" class="header_sudu"></a>
            <a href="#" target="_blank" class="header_sansong"></a>
        </div>
        <div class="clear"></div>
    </div>
    <!-- 
    <div class="zt_header_nav_bg">
        <div class="zt_header_nav">
            <ul>
                <li class="nav_active"><a href="index.php">首页</a></li>
                <li onMouseOver="this.className='nav_active'" onMouseOut="this.className=''"><a href="#" title="联系我们" >联系我们</a></li>
                <li onMouseOver="this.className='nav_active'" onMouseOut="this.className=''"><a href="#" title="新闻" >新闻</a></li>
                <li onMouseOver="this.className='nav_active'" onMouseOut="this.className=''"><a href="#" title="订购中心" >订购中心</a></li>
                <li onMouseOver="this.className='nav_active'" onMouseOut="this.className=''"><a href="#" title="FAQ" >FAQ</a></li>
            </ul>
            <ul class="clear"></ul>
        </div>
    </div> -->
</div>
<div class="blank" style="position:relative; width:1190px; margin:0 auto; z-index:99999;">

</div>   

<div class="blank"></div>    
<div class="block1 ">
<div class="fl" id="pageLeft">
	<div  class="mod1">
	<h1 class="mod1tit">产品中心</h1>
	    <div> 
			<h1 style="height:0" class="mod2tit"><a style="margin-top:3px;" class="more" href="article_cat.php?id=12">更多</a></h1>
			<cc:custMemu  memulist="${custMenuList}"/>
		</div>    
	</div>


    <div class="bg blank12">
      <div class="mod1">
        <h1 class="mod1tit">平台公告</h1>
        <div class="mod1con shop_notice"> 
			<h1 style="height:0" class="mod2tit"><a style="margin-top:3px;" class="more" href="article_cat.php?id=12">更多</a></h1>
			<div class="mod2con clearfix">
			    <ul>
			         <li class="fl" style="width:250px; margin-right:20px; display:inline; height:25px; line-height:25px;"><a class="txtdot" title="【炸鸡！】1个炸鸡腿赛60支香烟" href="article.php?id=33">【炸鸡！】1个炸鸡腿赛60支香烟</a></li>
			        <li class="fl" style="width:250px; margin-right:20px; display:inline; height:25px; line-height:25px;"><a class="txtdot" title="【毒豆芽】你吃的豆芽安全吗？" href="article.php?id=32">【毒豆芽】你吃的豆芽安全吗？</a></li>
			        <li class="fl" style="width:250px; margin-right:20px; display:inline; height:25px; line-height:25px;"><a class="txtdot" title="【健康】保住健康，远离垃圾食" href="article.php?id=34">【健康】保住健康，远离垃圾食</a></li>
			        <li class="fl" style="width:250px; margin-right:20px; display:inline; height:25px; line-height:25px;"><a class="txtdot" title="【开抢】素道有机彩棉袜8折开抢！" href="article.php?id=31">【开抢】素道有机彩棉袜8折开抢！</a></li>
			        <li class="fl" style="width:250px; margin-right:20px; display:inline; height:25px; line-height:25px;"><a class="txtdot" title="800万像素超强拍照机 LG Viewty Smart再曝光" href="article.php?id=27">800万像素超强拍照机 LG Viewt...</a></li>
			        <ul>
			</ul></ul></div>
			</div>
    </div>
    </div>
    
	<div class="ads">
	<table cellspacing="0" cellpadding="0">
	<tbody><tr><td><a target="_blank" href="affiche.php?ad_id=4&amp;uri="><img width="252" height="157" border="0" src="data/afficheimg/1407176001373592713.jpg"></a></td></tr>
	</tbody></table></div>
</div>
<div class="fr bg" id="pageRight">
<div class="blank1 " style="margin-bottom: 10px">
	<div  style="width:740px;display: block;float: left;">
								<div id="slideBox" class="slideBox">
									<div class="hd">
										<ul><li>1</li><li>2</li><li>3</li></ul>
									</div>
									<div class="bd">
										<ul>
											<li><img src="http://img1.cdn.tradew.com/Y201207M1502418T6G4306715/W501H501/pic.jpg" /></li>
											<li><img src="http://img1.cdn.tradew.com/Y201207M1502418T6G4306714/W501H501/pic.jpg" /></li>
											<li><img src="http://img1.cdn.tradew.com/Y201207M1502418T6G4306716/W501H501/pic.jpg" /></li>
										</ul>
									</div>
								</div>
	</div>
	<div style="width:200px;margin-left:3px;float: right;">
			<div class="di-Financial-main">
			                <div class="di-Financial-title">Financial Services</div>
			                <div class="di-Financial">
			                    <ul>
			                        <li class="note-1">Credit Rating</li>
			                        <li class="note-2">Credit Services</li>
			                        <li class="note-3">Credit Purchasing</li>
			                    </ul>
			                 </div>
			                 <a href="http://www.Sino-Sources/fina/service.html" class="view-details">View details</a>
			            </div>
			<div class="index_core_tel"></div>
	</div>
</div>
<div class="clear"></div>
<div class="blank"></div>
<div class="blank1 ">
	<div style="clearfix">
		<div class="more clearfix pro_title">
		<h1 class="tit">促销商品</h1>
		<h1 class="h1title">
		<div style="float:right;">
		<a style="font-weight:normal;" href="#">更多&gt;&gt;</a>
		</div>
		</h1>
		</div>
	</div>
	<div class="recommendContent entry-content clearfix">
		<c:forEach var="item" items="${popuProduct}"  varStatus="flag">
		<div class="goodsbox1">
						<div class="imgbox1"><a href="#"><img alt="商品" src="${pageContext.request.contextPath}../uploads/${item.show_img}" style="height: 221px;width: 212px"></a></div>
					 <a class="show68ecshop" title="" href="goods.php?id=8">${item.product_id}</a><br>
		              <p>本店售价：<b class="f1">${item.product_name}</b></p>
					
					
					</div>
      	</c:forEach>

		</div>
	</div>
 </div>
<div class="clear"></div>
</div>
<div class="block1 "> 
<div class="blank1">
<div style=" clearfix">
<div class="more clearfix best" id="itemNew" >
<h1 class="tit">新品上市</h1>
<h1 class="h1title">
<div style="float:right;">
<!-- 
<h2 class="h2bg">
<a href="category.php?id=3">坚果炒货</a> |
</h2>
<h2 class="h2bg">
<a href="category.php?id=5">营养保健</a> |
</h2>
<h2 class="h2bg">
<a href="category.php?id=12">时鲜水果</a> |
</h2>
<h2 class="h2bg">
<a href="category.php?id=14">新鲜蔬菜</a> |
</h2>
<h2 class="h2bg">
<a href="category.php?id=15">禽类蛋品</a> |
</h2> -->
<a href="search.php?intro=hot" style="font-weight:normal;" >更多>></a>
</div>
</h1>
</div>
</div>
<div class="recommendContenttong entry-content clearfix" >
		<c:forEach var="item" items="${newProduct}"  varStatus="flag">
		<div class="goodsbox1">
						<div class="imgbox1"><a href="#"><img alt="商品" src="${pageContext.request.contextPath}../uploads/${item.show_img}" style="height: 221px;width: 212px"></a></div>
					 <a class="show68ecshop" title="" href="goods.php?id=8">${item.product_id}</a><br>
		              <p>本店售价：<b class="f1">${item.product_name}</b></p>
					
					
					</div>
      	</c:forEach>
</div>
</div>
</div>
<div class="footer">
    <div class="helper">
        <div class="hl_inr">
            <div class="hl_inr_in">
                    <dl>
                        <dt class="footer_ico1"></dt>
                        <dd><p>全场正品</p><span>开具发票</span></dd>
                    </dl>
                    <dl>
                        <dt class="footer_ico2"></dt>
                        <dd><p>开箱验货</p><span>先验货再签收</span></dd>
                    </dl>
                    <dl>
                        <dt class="footer_ico3"></dt>
                        <dd><p>货到付款</p><span>除商家自送商品</span></dd>
                    </dl>
                    <dl>
                        <dt class="footer_ico4"></dt>
                        <dd><p>免运费</p><span>购满39元(自营)</span></dd>
                    </dl>
                    <dl>
                        <dt class="footer_ico5"></dt>
                        <dd><p>积分抵现金</p><span>100积分=￥1元</span></dd>
                    </dl>
                    <div class="clear"></div>
                </div>
        </div>
    <div class="hl_lnk">
        <div class="hll_lf">
            <ul>
                <li style="padding-left:60px;">
                     <p>购物指南</p>
                     <a href="#" target="_blank" title="购物流程">购物流程</a><br>
                     <a href="#" target="_blank" title="积分说明">积分说明</a><br>
                     <a href="#" target="_blank" title="淘心卡使用">淘心卡使用</a><br>
                     <a href="#" target="_blank" title="优惠券使用">优惠券使用</a><br>
                </li>
                <li>
                    <p>支付方式</p>
                    <a href="#" target="_blank" title="货到付款">货到付款</a><br>
                    <a href="#" target="_blank" title="在线支付">在线支付</a><br>
                    <a href="#" target="_blank" title="发票说明">发票说明</a><br>
                </li>
                <li>
                   <p>配送方式</p>
                   <a href="#" target="_blank" title="配送说明">配送说明</a><br>
                   <a href="#" target="_blank" title="上门自提">上门自提</a><br>
                   <a href="#" target="_blank" title="验货与签收">验货与签收</a><br>
                </li>
                <li>
                   <p>消费保障</p>
                   <a href="#" target="_blank" title="售后政策">售后政策</a><br>
                   <a href="#" target="_blank" title="发货赔付">发货赔付</a><br>
                   <a href="#" target="_blank" title="退款说明">退款说明</a><br>
                   <a href="#" target="_blank" title="手机售后">手机售后</a><br>
                </li>
                <li>
                    <p>商家服务</p>
                    <a href="#" target="_blank" title="商家服务说明">商家服务说明</a><br>
                    <a href="#" target="_blank" title="大宗采购">大宗采购</a><br>
                    <a href="#" target="_blank" title="商家后台">商家后台</a><br>
                </li>
                <li style="width:180px; border:0;">
                   <p>联系方式</p>
                   <a href="javascript:;" class="no_link">售前咨询</a> &nbsp;<strong style="color:#ccc;">400-078-5268&nbsp;转1</strong><br>
                   <a href="javascript:;" class="no_link">售后服务</a> &nbsp;<strong style="color:#ccc;">400-078-5268&nbsp;转2</strong><br>
                   <a href="#" target="_blank">客服QQ</a> &nbsp;&nbsp;<strong style="color:#ccc;">800007396</strong><br>
                   <a href="javascript:;" class="no_link">工作日</a> &nbsp;<strong>9：00-17：30</strong>
               </li>
            </ul>
        </div>
    </div>
    </div>
	<div class="clear"></div>
	<%@ include file="footer.jsp"%>
</div>
<%@ include file="tools.jsp"%>
<script type="text/javascript">jQuery(".slideBox").slide( { mainCell:".bd ul",effect:"left",autoPlay:true} );</script>
<script type="text/javascript">
          //初始化主菜单
            function sw_nav2(obj,tag)
            {
            var DisSub2 = document.getElementById("DisSub2_"+obj);
            var Handleli2= document.getElementById("Handleli2_"+obj);
                if(tag==1)
                {
                    DisSub2.style.display = "block";
                }
                else
                {
                    DisSub2.style.display = "none";
					
                }
            }
function showhide(show){
				document.getElementById("category_tree").style.display = show;
				}
</script>
<script language="javascript" src="http://api1.pop800.com/800.js?n=204615&t=2&l=en"></script><div style="display:none;"><a href="http://www.pop800.com">在线客服</a></div>
</body>
</html>