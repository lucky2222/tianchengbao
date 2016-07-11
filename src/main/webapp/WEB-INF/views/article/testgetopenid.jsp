<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
<!DOCTYPE HTML>
<html>
<head>
<title>测试微信网页授权机制，获取OpenID</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 新 Bootstrap 核心 CSS 文件 -->

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.min.css" id="css">
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="${pageContext.request.contextPath}/resources/js/common/jquery-1.11.2.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
</head>
<body>
	<div class="container">
		<h1>测试微信网页授权机制，获取OpenID</h1>
		<h1>访问人unionid:${unionid}</h1>
		<h1>访问人openid:${openid}</h1>
		<h1>转发人state:${state}</h1>
		<div>
			<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9ccda44a643cd037&redirect_uri=http%3A%2F%2Fyitongtianxia.duapp.com%2Fweixin%2Fweixinarticle&response_type=code&scope=snsapi_base&state=AAABBBCCCDDDEEEFFFGGG#wechat_redirect"><h1>链接</h1></a>
		</div>
		<div>
			 <div class="row"><button class="btn btn_primary" id="onMenuShareAppMessage" onclick="onMenuShareAppMessage">分享到朋友圈</button></div>
			<div class="row col-md-12"><button class="btn btn_primary" id="onMenuShareTimeline" onclick="onMenuShareTimeline">onMenuShareTimeline</button></div>
		</div>
		<div class="row"><button class="btn btn_primary" id="checkapi" >测试</button></div>
	</div>
	<script type="text/javascript">
	 wx.config({
	      debug: true,
	      appId: 'wx9ccda44a643cd037',
	      timestamp: ${jsinfo.timestamp},
	      nonceStr: '${jsinfo.noncestr}',
	      signature: '${jsinfo.signature}',
	      jsApiList: [
	        'checkJsApi',
	        'onMenuShareTimeline',
	        'onMenuShareAppMessage'
	      ]
	  });
	 
	 wx.ready(function () {
		 $('#checkapi').click(function () {
			    wx.checkJsApi({
			      jsApiList: [
			        'onMenuShareTimeline',
			        'onMenuShareAppMessage'
			      ],
			      success: function (res) {
			        alert(JSON.stringify(res));
			      }
			    });
			  });
			  
		 wx.onMenuShareAppMessage({
		      title: '测试app分享${state}',
		      desc: '测试微信网页授权机制，获取OpenID',
		      link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9ccda44a643cd037&redirect_uri=http://yitongtianxia.duapp.com/weixin/weixinarticle&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect',
		      imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
		      trigger: function (res) {
		        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
		        alert('用户点击发送给朋友');
		      },
		      success: function (res) {
		        alert('已分享');
		      },
		      cancel: function (res) {
		        alert('已取消');
		      },
		      fail: function (res) {
		        alert(JSON.stringify(res));
		      }
		    });
		 
		 wx.onMenuShareTimeline({
		      title: '测试分享朋友圈${state}',
		      link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9ccda44a643cd037&redirect_uri=http://yitongtianxia.duapp.com/weixin/weixinarticle&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect',
		      imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
		      trigger: function (res) {
		        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
		        alert('用户点击分享到朋友圈');
		      },
		      success: function (res) {
		        alert('已分享');
		      },
		      cancel: function (res) {
		        alert('已取消');
		      },
		      fail: function (res) {
		        alert(JSON.stringify(res));
		      }
		    });
		
	 });
	 
	 wx.error(function(res){
		 alert("err:"+res)
	 });
	</script>
	</body>
	</html>