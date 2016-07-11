var current_url=window.location.href;
var site_id="bnRpc1NxdmQ4bjhHS0E=";
var default_livechat_group_code=100;
var global_user_login_name = '';

// JavaScript Document
$(function(){
	//$.getScript('/js/userinitjs.php');	
	$("[name='btnAddProdFavo']").click(function()
	{
		if(site_is_login)
		{
			var site_id=jQuery(this).attr("site_id");
			var src_type=jQuery(this).attr("src_type");
			var src_id=jQuery(this).attr("src_id");

			$.getJSON("http://usercenter.Sino-Sources/ajax/okorderfavo.php?func=addFavo&site_id="+site_id+"&src_type="+src_type+"&src_id="+src_id+"&callback=?",
			  function(user)
			  {
				  if(user.errno==0)
				  {//成功
					  alert("Add favorites successfully!");
				  }
				  else if(user.errno==-1)
				  {//未登录
						alert("Please login first!");
				  }
				  else if(user.errno==-2)
				  {//异常错误
						alert("Add favorites failed,Please Contact US!");
				  }
				  else if(user.errno==-3)
				  {//重复添加
						alert("Has already add to favorites,Please don't repeat add!");
				  }
			  }
			);		
		}
		else
		{
			//window.location="http://usercenter.Sino-Sources/login/login.php?code="+current_url_encode;
			window.location="http://usercenter.Sino-Sources/login/login.php?homeurl="+encodeURIComponent(current_url);
		}
		return false;
	});
	$("[name='btnProdInquire']").click(function()
	{
		var site_id=jQuery(this).attr("site_id");
		var web_prod_id=jQuery(this).attr("web_prod_id");
		var prod_class_id=jQuery(this).attr("prod_class_id");
		var winUrl = "http://usercenter.Sino-Sources/inquiry/brigeaddinquire.php?siteids="+site_id+"&prodids="+web_prod_id+"&prodclassids="+prod_class_id;
		if(true)
		{
			var win=window.open(winUrl);
			win.focus();
		}
		else
		{
			//window.location="http://usercenter.Sino-Sources/login/login.php?homeurl="+encodeURIComponent(winUrl);
			var win=window.open("http://usercenter.Sino-Sources/login/login.php?homeurl="+encodeURIComponent(winUrl));
			win.focus();
		}
		try{ga('send', 'event', 'contact us', 'contact us:click', 'contact us:click:normal');}catch(e){}
		return false;
	});
    $("[name='btnProdInquire3']").click(function()
	{
		//var site_id=jQuery(this).attr("site_id");
		var web_prod_id=jQuery(this).attr("web_prod_id_orig");
		//var prod_class_id=jQuery(this).attr("prod_class_id");		
		var winUrl = "/inquire/contact_us?prodids="+web_prod_id;
		
		var specStr = $('#prod_spec_'+web_prod_id).val();
		if(specStr){		
			winUrl += '&spec='+specStr;
		}

		var win=window.open(winUrl);
		win.focus();		
		try{ga('send', 'event', 'contact us', 'contact us:click', 'contact us:click:normal');}catch(e){}
		return false;
	});

	$("[name='btnProdInquire2']").click(function()
	{
		DoBtnInquiry(this);
		return false;
	});

	$("[name='btnAddProdFavo2']").click(function()
	{
		DoBtnAddProdFavo(this);
		return false;
	});

	$("[name='BtnBuyRequest']").click(function()
	{
		var winUrl = '/inquire/contact_us';
		var win=window.open(winUrl);
		win.focus();			
				
		try{ga('send', 'event', 'buying request', 'buying request:click', 'buying request:click:normal');}catch(e){}
		
		//DoBtnBuyRequest(this);
		return false;
	});

	//显示顶部help隐藏下拉菜单
	$("#top_nav_help").mouseover(function(){
		$(this).addClass("top_nav_help");
		$("#top_nav_help_icon").addClass("top_nav_help_iconb");
		$("#top_nav_help_dl").css("display","block");
	}).mouseout(function(){
		$(this).removeClass("top_nav_help");
		$("#top_nav_help_icon").removeClass("top_nav_help_iconb");
		$("#top_nav_help_dl").css("display","none");
	});
	//详情页推荐产品切换
	$("#pro_similar_tit > li").click(function(){
		$(this).addClass("tit_check").siblings().removeClass("tit_check");
		var nIndex = $("#pro_similar_tit > li").index(this);
		$(".pro_similar"+nIndex).removeClass("none").siblings().addClass("none");
	});
	
	//index categories展开子菜单
	$(".categories_list_nav").css("display","block");
	$("#categories_list_col .categories_list_dl").each(function(){
			var n=$(this).height()-25;
			$(this).css("height",n);
		});
	$(".categories_list > li").mouseover(function(){
		$(this).addClass("check").siblings().removeClass("check");		
		$(this).children().eq(1).show();
		$(this).siblings().children().eq(1).hide();	
	}).mouseout(function(){
		$(this).removeClass("check");
		$(this).children().eq(1).hide();
	});
	
	
	/*$(".categories_list_nav").css("width","auto");
	$("#categories_list > li").each(function(){
		var m1 = $(this).children().children("dl").height();	
		var m2 = $(this).children().children("div").height();
		var w1 = $(this).children().children("dl").width();
		var w2 = $(this).children().children("div").width();
		var w3 = w1 + w2;
		$(this).children("div").width(w3+2);
		if(m1 > m2){
			$(this).children().children("div").height(m1);
			$(this).children().children("dl").addClass("borr");
		}else{
			$(this).children().children("dl").height(m2);
			$(this).children().children("div").addClass("borl");
		}
	});*/
	$(".categories_list_nav").css("display","none");
	
	//顶部搜索框选择分类
	$("#topSearchProdClassList > li > a").click(function(){
		var classId = $(this).attr('classId');
		var className = $(this).html();
		$('#topSearchProdClassId').val(classId);
		$('#topSearchProdClassName').html(className);
		
		//顶部search自适应
		var a = $("#search_bar_type").width();
		$("#search_bar_main").css("margin-left",a + 10);
		var b = $("#search_bar_main").width();
		$("#search_bar_main > input").css("width",b - 5);
		$("#search_bar_main_list").css("width",b + 13);
	
	});
	
	//顶部搜索框选择分类search自适应
	var a = $("#search_bar_type").width();
	$("#search_bar_main").css("margin-left",a + 10);
	var b = $("#search_bar_main").width();
	$("#search_bar_main > input").css("width",b - 5);
	$("#search_bar_main_list").css("width",b + 13);
	
	$("#search_bar_main > input").keyup(function(){	
		Search.getSearchHint();
		//$(this).css("color","#333");
	});
	
	//点击页面隐藏搜索提示下拉菜单
	$(document).click(function(e){
		try{			
			if(e.target && e.target.form && e.target.form.id){
				if(e.target.form.id!='topSearchForm'){
					$("#search_bar_main_list").hide();
				}
			}else{
				$("#search_bar_main_list").hide();
			}
		}catch(e){}		
	});

	$("#topSearchInput").keydown(function(e){
		e.stopPropagation();
		if($(this).val()!='' && $("#search_bar_main_list > li").length>1){
			$("#search_bar_main_list").show();
		}
		$("#topSearchProdClassList").hide();
	});

	$("#topSearchInput").keyup(function(e){
		if($(this).val()==''){
			ShowTopSearchKeywordCookie();
		}
		$("#topSearchProdClassList").hide();
	});

	$("#topSearchInput").click(function(e){
		if($(this).val()==''){
			ShowTopSearchKeywordCookie();
		}
		return true;
	});	
	
	//获取搜索提示下拉值
	$("#search_bar_main_list > li > a").click(function(){		
		var className = $(this).html();		
		$("#topSearchInput").val(className);
	});
	
	/*$("#search_bar_main").mouseover(function(){
		$(this).children(".search_bar_main_static").show();
	}).mouseout(function(){
		$(this).children(".search_bar_main_static").hide();
	});*/
	
	//显示顶部All Products下拉隐藏菜单
	$("#search_bar_type").toggle(function(e){
		$(this).children("ul").css("display","block");
		e.stopPropagation(); 
		$("#search_bar_main_list").hide();
	},function(){
		$(this).children("ul").css("display","");
		$("#search_bar_main_list").hide();
	});
	$(document).click(function(e){
		$("#search_bar_type").children("ul").css("display","none");
	});
	
	//首页hot products产品切换
	$("#hot_products_tit > li").click(function(){
		$(this).addClass("hot_products_check").siblings().removeClass("hot_products_check");
		var a = $("#hot_products_tit > li").index(this);
		$("#hot_products_cont > ul").each(function(e){
			if(e == a){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});
	
	//shop 展示切换
	$("#gallery").click(function(){
		$(this).addClass("fs_check");
		$("#listshow").removeClass("fl_check");
		$("#goods_list").removeClass("goods_list");
		$("#goods_list").addClass("goods_list2");
	});
	$("#listshow").click(function(){
		$(this).addClass("fl_check");
		$("#gallery").removeClass("fs_check");
		$("#goods_list").removeClass("goods_list2");
		$("#goods_list").addClass("goods_list");
	});
	
	//shop sizeauto 展示切换
	$("#gallery2").click(function(){
		$(this).addClass("fs_check");
		$("#listshow2").removeClass("fl_check");
		$("#goods_list2").removeClass("goods_list");
		$("#goods_list2").addClass("goods_list2");
	});
	$("#listshow2").click(function(){
		$(this).addClass("fl_check");
		$("#gallery2").removeClass("fs_check");
		$("#goods_list2").removeClass("goods_list2");
		$("#goods_list2").addClass("goods_list");
	});
	
	//searchResult Category 点击隐藏 展示切换
	$("#shop_cate_tit").toggle(function(){
		$(this).addClass("shop_cate_tit2");
		$(this).siblings().hide();
	},function(){
		$(this).removeClass("shop_cate_tit2");
		$(this).siblings().show();
	});
	
	//searchResult Related Searches 点击隐藏 展示切换
	$("#shop_cate_tit2").toggle(function(){
		$(this).addClass("shop_cate_tit2");
		$(this).siblings().hide();
	},function(){
		$(this).removeClass("shop_cate_tit2");
		$(this).siblings().show();
	});
	
	//productlist side点击隐藏 展示切换
	$(".shop_brands_filter_dl").find("dd[class!='shop_brands_filter_dd']:gt(2)").hide();
	$("#shop_brands_filter > div > dl > h4").toggle(function(){
		$(this).addClass("shop_filter_tit2");
		$(this).siblings().hide();
		$(this).parent().siblings().hide();
		$(this).parent().siblings().html("less");
		$(this).parent().siblings().removeClass("shop_cate_moreC");
		$(this).parent().siblings().addClass("shop_cate_less");
		$(this).parent().find("dd").hide();
	},function(){
		$(this).removeClass("shop_filter_tit2");
		$(this).siblings().show();
		$(this).parent().siblings().show();
		$(this).parent().siblings().html("more");
		$(this).parent().siblings().removeClass("shop_cate_less");
		$(this).parent().siblings().addClass("shop_cate_moreC");
		$(this).parent().find("dd:gt(2)").hide();
	});
	
	
	$("#shop_brands_filter > div > p").toggle(function(){
		$(this).parent().find("dd:gt(2)").show();
		$(this).html("less");
		$(this).removeClass("shop_cate_moreC");
		$(this).addClass("shop_cate_less");
	},function(){
		$(this).parent().find("dd:gt(2)").hide();
		$(this).html("more");
		$(this).removeClass("shop_cate_less");
		$(this).addClass("shop_cate_moreC");
	});
	
	//productinfo 产品描述切换
	$("#pro_details_tit > li").click(function(){
		$(this).addClass("tit_check").siblings().removeClass("tit_check");
		var b = $("#pro_details_tit > li").index(this);
		$("#pro_details_cont > div").each(function(e){
			if(b==e){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});
	
	//产品详情help移动显示
	$(".help_pro").click(function(e){
		e.stopPropagation();
		$(".help_pro em").css("display","inline-block");
		$(".help_pro b").css("display","inline-block");
	});
	$(document).click(function(e){
		$(".help_pro em").css("display","none");
		$(".help_pro b").css("display","none");
	});
	
	//productinfo 类似产品切换
	$("#pro_similar_tit > li").click(function(){
		$(this).addClass("tit_check").siblings().removeClass("tit_check");
		var b = $("#pro_similar_tit > li").index(this);
		$("#pro_similar_cont > ul").each(function(e){
			if(b==e){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});	
	//返回顶部
	$("#gotop").click(function(){
		$("body,html").animate({"scrollTop":0},500);
	});
	
	//inquiry页信息填写
	$("#inquiry_tabB_cont_check input").each(function(index){
		$(this).click(function(){
			$("#reg_tab div:eq("+index+")").show()
			.siblings().hide();
		});
	});
	//inquiry表格删除提示信息
	$("#tel_check01 input").each(function(index){
		$(this).keyup(function(){
			$(this).removeClass("inputtext_tip");
		});
	});
	$("#tel_check02 input").each(function(index){
		$(this).keyup(function(){
			$(this).removeClass("inputtext_tip");
		});
	});
	//返回顶部
	$("#gotop").click(function(){
		$("body,html").animate({"scrollTop":0},500);
	});
	
	$("#shop_catepc_list > li:gt(19)").hide();
	$("#shop_catepc_list2 > li:gt(19)").hide();
	//newproducts 左侧菜单隐藏显示
	$("#newpro_nav_icon > a").toggle(function(){
		$("#shop_catepc_list > li:gt(19)").show();
		$(this).addClass("hoverbg");
	},function(){
		$("#shop_catepc_list > li:gt(19)").hide();
		$(this).removeClass("hoverbg");
	});
	
	$("#newpro_nav_icon2 > a").toggle(function(){
		$("#shop_catepc_list2 > li:gt(19)").show();
		$(this).addClass("hoverbg");
	},function(){
		$("#shop_catepc_list2 > li:gt(19)").hide();
		$(this).removeClass("hoverbg");
	});
	//Our Advantages切换
	$("#advant_pics > li").click(function(){
		var nIndex = $("#advant_pics > li").index(this);
		$("#advant_tit > li").each(function(a){
			if(a==nIndex){
				$(this).addClass("check").siblings().removeClass("check");
			}
			else{
				$(this).removeClass("check");
			}
		});
		$("#advant_cont > div").each(function(e){
			if(e==nIndex){
				$(this).show();
			}
			else{
				$(this).hide();
			}
		});
	});
	$("#advant_tit > li").click(function(){
		var nIndex = $("#advant_tit > li").index(this);
		$(this).addClass("check").siblings().removeClass("check");
		$("#advant_cont > div").each(function(e){
			if(e==nIndex){
				$(this).show();
			}
			else{
				$(this).hide();
			}
		});
	});
	
	//产品详细页右侧弹窗
	var scrollTimer;
	var $global_contact = $("#sm_contact");	
	$(window).scroll(function () {
		if(scrollTimer) {
			clearTimeout(scrollTimer);
			scrollTimer = undefined;
		}
		scrollTimer = setTimeout(function(){
			var wh = $(window).height();
			var dh = $(document).scrollTop();
			if (dh > wh) {
			   $global_contact.stop(true,false).animate({
					right:'0'
				});
			}
			else{
				$global_contact.stop(true,false).animate({
					right:'-240px'
				});
			}
		},300);
	});

	$global_contact.find("h3").toggle(function(){
		if(scrollTimer) {
			clearTimeout(scrollTimer);
			scrollTimer = undefined;
		}
		scrollTimer = setTimeout(function(){
			$global_contact.stop().animate({
				width:'115px'
			},500,function(){
				$global_contact.find(".sm_contact_img").css("margin-left","15px");
			});
			$global_contact.find("h3").find("span").html("Sale Manager");
			$global_contact.find("h3").find("i").removeClass("sm_fold_open").addClass("sm_fold_close");
			$global_contact.find(".sm_contact_content").css("height","auto");
			$global_contact.find(".sm_contact_bottom_hide").css("margin-top","0px");
			$global_contact.find("h4").hide();
			$global_contact.find(".sm_contact_box").hide();
			$global_contact.find(".sm_contact_saying").hide();
			$global_contact.find(".sm_contact_bottom").hide();
			$global_contact.find(".sm_contact_bottom_hide").show();
		},300);
		
	},function(){
		if(scrollTimer) {
			clearTimeout(scrollTimer);
			scrollTimer = undefined;
		}
		scrollTimer = setTimeout(function(){
			$global_contact.stop(true,false).animate({
				right:'0',
				width:'240px'
			},500,function(){
				$global_contact.find("h3").find("span").html("Contact Sale Manager");
				$global_contact.find("h3").find("i").removeClass("sm_fold_close").addClass("sm_fold_open");
				$global_contact.find(".sm_contact_img").css("margin-left","0px");
				$global_contact.find(".sm_contact_content").css("height","");
				$global_contact.find(".sm_contact_bottom_hide").css("margin-top","");
				$global_contact.find("h4").fadeIn(300);
				$global_contact.find(".sm_contact_box").fadeIn(300);
				$global_contact.find(".sm_contact_saying").fadeIn(500);
				$global_contact.find(".sm_contact_bottom").fadeIn(500);
				$global_contact.find(".sm_contact_bottom_hide").hide();
		});
		},300);
	});
   
   //help center右侧问答列表显示隐藏
	$(".about_cont_dl > dd > a").click(function(){		
		if($(this).siblings().css("display") == "block"){
			$(this).siblings().css("display","none");
			$(this).parent().siblings().children("div").css("display","none");
			$(this).parent().parent().siblings().children().children("div").css("display","none");
		}else{
			$(this).siblings().css("display","block");
			$(this).parent().siblings().children("div").css("display","none");
			$(this).parent().parent().siblings().children().children("div").css("display","none");
		}
	});

	//help center左侧菜单
	$("#help_dl > dd > a").click(function(){
		$(this).addClass("check");
		$(this).parent().siblings().children().removeClass("check");
	});
	/********/
    	//询盘优化页
	$(".inquiry_tabA_area").focus(function(){
		$(".inquiry_tabA_tips").removeClass("none");
	});

	//乐语livechat
	$("[name='btnOpenDoyooWebCall']").click(function(){		
		var livechat_group_code=jQuery(this).attr("livechat_group_code");
		if(livechat_group_code==-1 || typeof(livechat_group_code) == "undefined")
		{
			livechat_group_code=default_livechat_group_code;
		}
		var web_prod_id=jQuery(this).attr("web_prod_id");          
		var site_id=jQuery(this).attr("site_id");
		
		var chat_user_id = 0;
		var chat_user_name = '';
		var chat_user_login_name = '';
		webcallApi.openChatGroup(livechat_group_code,chat_user_id,chat_user_name,chat_user_login_name,web_prod_id,site_id);

		return false;
	});

});



//返回顶部
$(window).scroll(function(e){
	var h = $(window).height();
	var t = $(document).scrollTop();
	if(t > h){
		$("#gotop").fadeIn();
	}else{
		$("#gotop").fadeOut();
	}
});

function submitTopSearch(){
	var keyword = $.trim($('#topSearchInput').val());	
	if(keyword=='' || keyword=='Please input a keyword'){
		alert('Please input a keyword.');
		return false;
	}
	SaveSearchKeywordCookie(keyword);
	$('#topSearchForm').submit();
}

function SaveSearchKeywordCookie(keyword){
	keyword = $.trim(keyword);
	keyword.replace(',','');
	if(keyword=='')	return false;
	
	var logArr = GetSearchKeywordCookie();
	var cookie_name = 'recent_search';	
	var delIndex = -1;
	for(var i in logArr){
		if(logArr[i]==keyword){
			var delIndex = i;
		}
	}
	if(delIndex != -1){
		logArr.splice(delIndex,1);
	}
	if(logArr.length >= 6){
		logArr.shift();
	}
	logArr.push(keyword);
	var logStr = logArr.join(',');
	Cookie.set(cookie_name, logStr, 30, null, '/', null);
	return logArr.length;
}

function ShowTopSearchKeywordCookie(){
	var recentSearchArr = GetSearchKeywordCookie();
	if(recentSearchArr.length>0){
		var html = '';
		for(var i=recentSearchArr.length-1;i>=0;i--){
			html += '<li><a href="javascript:void(0);">'+recentSearchArr[i]+'</a></li>';
		}
		if(html!=''){
			 $("#search_bar_main_list").html('');
			 $("#search_bar_main_list").append(html);
			 $("#search_bar_main_list").show();
			 $("#search_bar_main_list > li > a").click(function(){	
				var word = $(this).html();
				$("#topSearchInput").val(word);
				$("#search_bar_main_list").hide();
				submitTopSearch();
			});
		}		 
	}
}

function GetSearchKeywordCookie(){
	var cookie_name = 'recent_search';
	var logStr = Cookie.get(cookie_name);
	var logArr = [];
	if(logStr && logStr!=''){
		logArr = logStr.split(','); 
	}
	return logArr;
}

function submitTopSearchWord(word){
	var classId = $('#topSearchProdClassId').val();
	var url = '/products/searchresult.html?keyword='+encodeURIComponent(word);
	if(classId!='0'){
		url += '&ok_prod_class_id='+classId;
	}
	window.location = url;
	return false;
}

function submitFooterSearch(){
	var keyword = $.trim($('#footerSearchInput').val());
	if(keyword=='' || keyword=='Please input a keyword'){
		alert('Please input a keyword.');
		return false;
	}
	$('#footerSearchForm').submit();
}

var Validate = {
	isInt : function(val){
		val = $.trim(val);
		var reg = /^[0-9]+$/;
		if(reg.test(val)){
			return true;
		}
		return false;
	},
	isNumber : function(val){
		val = $.trim(val);
		var reg = /^[0-9]+(\.[0-9]+)*$/;
		if(reg.test(val)){
			return true;
		}
		return false;
	},
	isPhoneNum : function(val){
		val = $.trim(val);
		var reg = /^[0-9\+\-]+$/;
		if(reg.test(val)){
			return true;
		}
		return false;
	},
	isEmail : function(val){
		val = $.trim(val);
		var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if(reg.test(val)){
			return true;
		}
		return false;
	},
	isEmpty : function(val){
		val = $.trim(val);
		if(val==''){
			return true;
		}
		return false;
	},
	strLen : function(val,minL,maxL){
		val = $.trim(val);
		if(minL>0 && val.length<minL){
			return false;
		}
		if(maxL>0 && val.length>maxL){
			return false;
		}
		return true;
	}
}

var Search = {
	getSearchHint : function(){
		var keyword = $.trim($('#topSearchInput').val());
		if(keyword!=''){
			$.ajax({
			  type: 'GET',
			  url: '/ajax/search.php',
			  dataType: 'json',
			  data: {
				 func : 'getHint',
				 keyword : keyword
			  },
			  success:function(result){
				  if($.trim($('#topSearchInput').val())==''){
					return false;
				  }
				  if(result.errno==0){
					 var html = '';
					 $("#search_bar_main_list").html("");					 
					 for(var i in result.hintList){
						try{
							//var reg = new RegExp("^("+result.keyword+")(.*)","gi");
							//var word = result.hintList[i].replace(reg,"<b>$1</b>$2");
							var word = result.hintList[i].replace(result.keyword,"<b>"+result.keyword+"</b>");
							html += '<li><a href="javascript:void(0);">'+word+'</a></li>';
							//html += '<li><a href="#">'+result.hintList[i]+'</a></li>';
						}catch(e){
							html += '<li><a href="javascript:void(0);">'+result.hintList[i]+'</a></li>';
						}
					 }
					 if(html!=''){
						 $("#search_bar_main_list").append(html);
						 $("#search_bar_main_list").show();
						 $("#search_bar_main_list > li > a").click(function(){	
							var word = $(this).html().replace('<b>','').replace('</b>','');
							word = word.replace('<B>','').replace('</B>','');
							$("#topSearchInput").val(word);
							$("#search_bar_main_list").hide();

							submitTopSearch();
						});
					 }
				  }
			  },
			  error: function(result){				 
			  },
			  complete: function(result){	
			  }
			});
			
		}else{
			$("#search_bar_main_list").html("");
			$("#search_bar_main_list").hide();
		}
	}
};


var LoginDialog = {
	callbackList:{},	
	show: function(callback, srcObj, returnUrl, srcType) {
		if(typeof(srcObj)=='undefined'){srcObj=false;}
		if(typeof(returnUrl)=='undefined'){returnUrl='';}
		if(typeof(srcType)=='undefined'){srcType='';}
		var callbackObj = {'callback':callback,'srcObj':srcObj,'returnUrl':returnUrl};
		var callbackId = 'k'+Math.random();
		LoginDialog.callbackList[callbackId]=callbackObj;


		if(SignDialog && SignDialog.canUse()){
			SignDialog.show('','',srcType,"LoginDialog.signDialogCallback([resultObj],'"+callbackId+"');");
		}
	},
	callback: function(obj,callbackId){
		if(obj.errno==0){
			$.jBox.close(true);
			setPageLoginInfo(obj.userdata.user_login_name);
		}
		if(!callbackId || !LoginDialog.callbackList[callbackId]){
			return false;
		}
		var callbackObj = LoginDialog.callbackList[callbackId];
		eval(callbackObj.callback+'(obj,callbackObj.srcObj)');
	},
	signDialogCallback: function(resultObj, callbackId){	
		if(!callbackId || !LoginDialog.callbackList[callbackId]){
			return false;
		}
		var callbackObj = LoginDialog.callbackList[callbackId];
		if(callbackObj.returnUrl != ''){
			window.location = callbackObj.returnUrl;
		}else{
			eval(callbackObj.callback+'(resultObj,callbackObj.srcObj)');
		}		
	}
}

function setPageLoginInfo(user_login_name){
	global_user_login_name = user_login_name;

	$("#spLogin").hide();
	$("#spLogout").show();	
	$("#spUserName").html(global_user_login_name);
}

function LoginDialogCallbackInquiry(obj,srcObj) {
    if(obj.errno==0){
		DoBtnInquiry(srcObj);
	}
}
function DoBtnInquiry(srcObj){
	srcObj = $(srcObj);
	if(global_user_login_name==''){
		LoginDialog.show('LoginDialogCallbackInquiry',srcObj);
	}else{
		var site_id=srcObj.attr("site_id");
		var web_prod_id=srcObj.attr("web_prod_id");
		var prod_class_id=srcObj.attr("prod_class_id");
		var winUrl = "http://usercenter.Sino-Sources/inquiry/brigeaddinquire.php?siteids="+site_id+"&prodids="+web_prod_id+"&prodclassids="+prod_class_id;
		//var win=window.open(winUrl);
		//win.focus();
		/*
		try{
			openwin(winUrl);
		}catch(e){
			window.location=winUrl;
		}
		*/
		window.location=winUrl;
		return false;
	}
}

function LoginDialogCallbackAddProdFavo(obj,srcObj) {
    if(obj.errno==0){
		DoBtnAddProdFavo(srcObj);
	}
}
function DoBtnAddProdFavo(srcObj){	
	
	if(global_user_login_name==''){
		LoginDialog.show('LoginDialogCallbackAddProdFavo',srcObj);
	}else{
		srcObj = $(srcObj);
		var site_id=srcObj.attr("site_id");
		var src_type=srcObj.attr("src_type");
		var src_id=srcObj.attr("src_id");
		$.getJSON("http://usercenter.Sino-Sources/ajax/okorderfavo.php?func=addFavo&site_id="+site_id+"&src_type="+src_type+"&src_id="+src_id+"&callback=?",
		  function(user)
		  {
			  if(user.errno==0)
			  {//成功
				  //alert("Add favorites successfully!");
				  alertDialog("Add favorites successfully!", "Add to My Favorites");
			  }
			  else if(user.errno==-1)
			  {//未登录
					//alert("Please login first!");
					alertDialog("Please login first!", "Add to My Favorites");
			  }
			  else if(user.errno==-2)
			  {//异常错误
					//alert("Add favorites failed,Please Contact US!");
					alertDialog("Add favorites failed,Please Contact US!", "Add to My Favorites");
			  }
			  else if(user.errno==-3)
			  {//重复添加
					//alert("Has already add to favorites!");
					alertDialog("Has already add to favorites!", "Add to My Favorites");
			  }
		  }
		);	
	}
}

function LoginDialogCallbackBuyRequest(obj,srcObj) {
    if(obj.errno==0){
		DoBtnBuyRequest(srcObj);
	}
	return false;
}
function DoBtnBuyRequest(srcObj){	
	var url = '/products/buyrequest.php?returnUrl='+encodeURIComponent(current_url);
	if(global_user_login_name==''){
		LoginDialog.show('LoginDialogCallbackBuyRequest',srcObj,url,'buying_request');
	}else{
		var url = '/products/buyrequest.php?returnUrl='+encodeURIComponent(current_url);
		window.location.href=url;
	}
	return false;
}

function alertDialog(msg,title){
	if(!title){
		title='Message';
	}
	try{
		if($.jBox){
			$.jBox.info(msg, title,{buttons:{'close':'close'}} );
			return true;
		}else{
			alert(msg);
		}
	}catch(e){
		alert(msg);
	}
}

function subscribe(){
	var email=$('#subscribe_email').val();
	if(email=='' || !Validate.isEmail(email)){
		alertDialog('Please input a valid email address');
		return false;
	}
	$('#btnSubscribe').addClass('btn_send_end');
	$.ajax({
		  type: 'GET',
		  url: '/ajax/buy.php?rnd='+Math.random(),
		  dataType: 'json', 
		  async:false,
		  data: {
			 func : 'checkEmail',
			 email : email
		  },
		  success:function(result){
			  if(result.errno==0){	
				  var winUrl = '/subscribe.php?email='+encodeURIComponent(email);
				  var win=window.open(winUrl);
				  //win.focus();
				  //window.location = winUrl;
				  $('#subscribe_email').val('Your Email Address');
			  }else{
				  alertDialog('Your email address has already been in our subscription mail list.');
				  return false;
			  }
		  },
		  complete:function(){
			 $('#btnSubscribe').removeClass('btn_send_end');
		  }
	});	
	return false;
}

function footer_subscribe(){
	var email=$('#footer_subscribe_email').val();
	if(email=='' || !Validate.isEmail(email)){
		alertDialog('Please input a valid email address');
		return false;
	}

	var winUrl = '/inquire/contact_us?email='+encodeURIComponent(email);
	var win=window.open(winUrl);
	win.focus();
	$('#footer_subscribe_email').val('Your Email Address');

	/*
	$('#btnSubscribe').addClass('btn_send_end');
	$.ajax({
		  type: 'GET',
		  url: '/ajax/buy.php?rnd='+Math.random(),
		  dataType: 'json', 
		  async:false,
		  data: {
			 func : 'checkEmail',
			 email : email
		  },
		  success:function(result){
			  if(result.errno==0){	
				  var winUrl = '/subscribe.php?email='+encodeURIComponent(email);
				  var win=window.open(winUrl);
				  //win.focus();
				  //window.location = winUrl;
				  $('#footer_subscribe_email').val('Your Email Address');
			  }else{
				  alertDialog('Your email address has already been in our subscription mail list.');
				  return false;
			  }
		  },
		  complete:function(){
			 $('#btnSubscribe').removeClass('btn_send_end');
		  }
	});	
	*/
	return false;
}

var advSearch = {
	checkInput:function(){
		var keyword = $('#advKeyword').val();
		if(keyword==''||keyword=='Search Keywords'){
			return false;
		}
		return true;
	},
	submit:function(){
		if(this.checkInput()){
			var keyword = $('#advKeyword').val();
			var matchType = $('input[name="matchType"]:checked').val();
			var classId = $('#advSearchClass').val();
			window.location='/products/searchresult.html?keyword='+encodeURIComponent(keyword)+'&matchType='+encodeURIComponent(matchType)+'&ok_prod_class_id='+encodeURIComponent(classId);
		}
	}
}

function showLatestPriceDialog(web_prod_id){
	
	var url="/inquire/contact_us?prodids="+web_prod_id;
	var spec = $('#prod_spec_'+web_prod_id).val();
	if(spec!=''){
		url += '&spec='+spec;
	}
	var win=window.open(url);
	win.focus();	
	try{ga('send', 'event', 'get latest price', 'get latest price:click', 'get latest price:click:normal');}catch(e){}
	return false;
}

function closeLatestPriceDialog(){
	$.jBox.close(true);
}

var SignDialog = {
	sending: false,
	type: 'login', //login,reg
	src: '', 
	callback: '',
	isRegEmailExist: false,
	isRegCheckcodeWrong: false,
	defaultLoginEmail: '',

	canUse: function(){
		return ($('#sign_hidden').length>0);
	},
	init: function(type,email,src,callback){
		this.type = type;
		this.email = email;
		this.src = src;
		this.callback = callback;
		this.sending = false;
	},
	getTopNode:function(){
		return $('.jbox-content > div.sign_dialog');
	},
	getLoginNode:function(){
		return this.getTopNode().find('div[name="sign_login_cont"]');
	},
	getRegNode:function(){
		return this.getTopNode().find('div[name="sign_reg_cont"]');
	},
	switchTab: function(type){
		if(this.sending){return false;}
		var liIndex = 0;
		if(type=='reg'){liIndex=1;this.initCheckCode();}
		liObj = this.getTopNode().find('.pro_join_tit > li:eq('+liIndex+')');
		$(liObj).addClass("tit_check").siblings().removeClass("tit_check");
		$(liObj).parent().parent().find(".pro_join_cont div:eq("+liIndex+")").show()
			.siblings().hide();
		this.type=type;	
		
		if(this.type=='login'){
			if(this.email=='' && this.defaultLoginEmail==''){
				this.getLoginNode().find('input[name="user_login_name"]').focus();
			}else{
				this.getLoginNode().find('input[name="password"]').focus();
			}
		}else{
			if(this.email==''){
				this.getRegNode().find('input[name="user_login_name"]').focus();
			}else{
				this.getRegNode().find('input[name="passwd"]').focus();
			}
		}
	},
	initCheckCode: function(){
		var obj = this.getRegNode().find('[name="imgCheckCode"]');
		if(obj.attr('width') == "0"){
			obj.attr('width','80');
			obj.attr('height','40');
			this.refreshCheckCode();
		}		
	},
	refreshCheckCode: function(){
		var obj = this.getRegNode().find('[name="imgCheckCode"]');		
		obj.attr('src','http://usercenter.Sino-Sources/images/watchor.php?rnd='+Math.random());		
	},
	show: function(type,email,src,callback){
		if(!type){type='login';}
		if(!email){email='';}
		if(!src){src='';}
		if(!callback){callback='';}
		this.init(type,email,src,callback);

		$.jBox("id:sign_hidden",{
			title: "Welcome to Sino-Sources",
			width: 590,
			height: 'auto', 
			buttons:false,
			submit:function(){}	
		});
		this.defaultLoginEmail = this.getDefaultLoginEmail();
		this.switchTab(this.type);	
				
		if(email!=''){
			this.getTopNode().find('input[name="user_login_name"]').val(email);
			this.getTopNode().find('input[name="user_login_name"]').attr('readonly','readonly');
		}else if(this.defaultLoginEmail!=''){
			this.getLoginNode().find('input[name="user_login_name"]').val(this.defaultLoginEmail);
		}

		//Login对话框事件
		this.getLoginNode().find('input[name="user_login_name"]').keyup(function(){
			$(this).parent().parent().find('.tip').html('');			
		});
		this.getLoginNode().find('input[name="user_login_name"]').blur(function(){
			SignDialog.checkLogin('user_login_name');
		});
		this.getLoginNode().find('input[name="password"]').keyup(function(){
			$(this).parent().parent().find('.tip').html('');			
		});
		this.getLoginNode().find('input[name="password"]').blur(function(){
			SignDialog.checkLogin('password');
		});

		//Reg对话框事件
		this.getRegNode().find('input[name="user_login_name"]').keyup(function(){
			SignDialog.isRegEmailExist = false;
			$(this).parent().parent().find('.tip').html('');			
		});
		this.getRegNode().find('input[name="user_login_name"]').blur(function(){
			SignDialog.checkReg('user_login_name');
		});
		this.getRegNode().find('input[name="passwd"]').keyup(function(){
			$(this).parent().parent().find('.tip').html('');			
		});
		this.getRegNode().find('input[name="passwd"]').blur(function(){
			SignDialog.checkReg('passwd');
		});
		this.getRegNode().find('input[name="passwd2"]').keyup(function(){
			$(this).parent().parent().find('.tip').html('');			
		});
		this.getRegNode().find('input[name="passwd2"]').blur(function(){
			SignDialog.checkReg('passwd2');
		});
		this.getRegNode().find('input[name="checkcode"]').keyup(function(){
			$(this).parent().parent().find('.tip').html('');			
		});
		this.getRegNode().find('input[name="checkcode"]').blur(function(){
			SignDialog.checkReg('checkcode');
		});
		this.getRegNode().find('input[name="checkcode"]').keyup(function(){
			SignDialog.isRegCheckcodeWrong = false;
			$(this).parent().parent().find('.tip').html('');
			if($(this).val()!='' && $(this).val().length==4){
				SignDialog.checkRegCheckcode();
			}			
		});
		return;
	},
	submit:function(type){
		if(type=='login'){			
			if(this.src=="send_message"){
				try{ga('send', 'event', 'send message', 'send message:click', 'send message:click:login');}catch(e){}
			}else if(this.src=="get_latest_price"){
				try{ga('send', 'event', 'get latest price', 'get latest price:send', 'get latest price:send:login');}catch(e){}
			}else if(this.src=='buying_request'){
				try{ga('send', 'event', 'buying request', 'buying request:click', 'buying request:click:login');}catch(e){}
			}else if(this.src=='online_quote'){
				try{ga('send', 'event', 'online quote', 'online quote:click', 'online quote:click:login');}catch(e){}	
			}
			if(!this.checkLogin()){ return false; }		
			if(this.sending){ return false; }
			this.setSending(true);
			try{
				var is_rember_login_name = 0;
				if(this.getLoginNode().find('input[name="is_rember_login_name"]').attr('checked')){
					is_rember_login_name = 1;
				}
				$.ajax({
				  type: 'GET',
				  url: 'http://usercenter.Sino-Sources/ajax/okorderdologin.php?rnd='+Math.random(),
				  dataType: 'jsonp',
				  jsonp:'callback',  
				  data: {
					 UserName : this.getLoginNode().find('input[name="user_login_name"]').val(),					 
					 Password : this.getLoginNode().find('input[name="password"]').val(),
					 is_rember_login_name : is_rember_login_name
				  },
				  success:function(result){
					  if(result.errno==0){
						 $.jBox.close();
						 setPageLoginInfo(result.userdata.user_login_name);
						 SignDialog.runCallback(result);
					  }else{
						 if(result.errno==-1){
							SignDialog.getLoginNode().find('input[name="user_login_name"]').parent().find('.tip').html('Sorry! The email is not exist, please retry.');
						 }else if(result.errno==-2){
							SignDialog.getLoginNode().find('input[name="password"]').parent().find('.tip').html('Sorry！The password is incorrect, please retry.');
						 }else{
							SignDialog.getLoginNode().find('span[name="SubmitErrorInfo"]').html('Email or password is not correct.');
						 }
					  }
				  },
				  complete:function(result){
						SignDialog.setSending(false);
				  }
				});
			}catch(e){}
		}else if(type=='reg'){
			if(this.src=="send_message"){
				try{ga('send', 'event', 'send message', 'send message:click', 'send message:click:reg');}catch(e){}
			}else if(this.src=="get_latest_price"){
				try{ga('send', 'event', 'get latest price', 'get latest price:send', 'get latest price:send:reg');}catch(e){}
			}else if(this.src=='buying_request'){
				try{ga('send', 'event', 'buying request', 'buying request:click', 'buying request:click:reg');}catch(e){}
			}else if(this.src=='online_quote'){
				try{ga('send', 'event', 'online quote', 'online quote:click', 'online quote:click:reg');}catch(e){}
			}
			if(this.isRegEmailExist || this.isRegCheckcodeWrong){
				return false;
			}
			if(!this.checkReg()){ return false; }		
			if(this.sending){ return false; }
			this.setSending(true);			

			try{
				$.ajax({
				  type: 'GET',
				  url: 'http://usercenter.Sino-Sources/ajax/okorderdoreg.php?rnd='+Math.random(),
				  dataType: 'jsonp',
				  jsonp:'callback',  
				  data: {
					 user_login_name : this.getRegNode().find('input[name="user_login_name"]').val(),
					 password : this.getRegNode().find('input[name="passwd"]').val(),
					 password2 : this.getRegNode().find('input[name="passwd2"]').val(),
					 CheckCode : this.getRegNode().find('input[name="checkcode"]').val()
				  },
				  success:function(result){
					  if(result.errno==0){
						 $.jBox.close();
						 setPageLoginInfo(result.userdata.user_login_name);
						 SignDialog.runCallback(result);
					  }else{
						if(result.errmsg){
							SignDialog.getRegNode().find('span[name="SubmitErrorInfo"]').html(result.errmsg);
						}else{
							SignDialog.getRegNode().find('span[name="SubmitErrorInfo"]').html('Registration failed.');
						}
					  }
				  },
				  complete:function(result){
					SignDialog.setSending(false);
				  }
				});
			}catch(e){}
		}
		return;			
	},
	runCallback:function(result){
		if(this.callback!=''){
			
			if(result.errno==0){			
				var obj = {};
				obj.errno = 0;	
				obj.type = this.type;						
				obj.userdata = result.userdata;

				if(this.callback.indexOf('[resultObj]')!=-1){
					eval(this.callback.replace('[resultObj]','obj'));
				}else{
					eval(this.callback+'(obj);');
				}				
			}
		}
	},
	setSending:function(sending){
		if(sending){
			this.sending = true;
			this.getTopNode().find('[name="loadingImg"]').show();
			this.getTopNode().find('span[name="SubmitErrorInfo"]').html('');
			if(this.type=='login'){
				this.getLoginNode().find('a[name="loginSubmitBtn"]').removeClass('btn_send');
				this.getLoginNode().find('a[name="loginSubmitBtn"]').addClass('btn_send_end');
			}else{
				this.getRegNode().find('a[name="regSubmitBtn"]').removeClass('btn_send');
				this.getRegNode().find('a[name="regSubmitBtn"]').addClass('btn_send_end');
			}
		}else{
			this.sending = false;
			this.getTopNode().find('[name="loadingImg"]').hide();
			if(this.type=='login'){
				this.getLoginNode().find('a[name="loginSubmitBtn"]').removeClass('btn_send_end');
				this.getLoginNode().find('a[name="loginSubmitBtn"]').addClass('btn_send');
			}else{
				this.getRegNode().find('a[name="regSubmitBtn"]').removeClass('btn_send_end');
				this.getRegNode().find('a[name="regSubmitBtn"]').addClass('btn_send');
			}
		}
	},
	checkReg:function(field){
		var error = 0;
		if(!field || field=='user_login_name'){
			var obj = this.getRegNode().find('input[name="user_login_name"]');
			if(!Validate.isEmail(obj.val())){
				obj.parent().find('.tip').html('The Email address you entered is invalid');
				error = 1;
			}else{	
				if(field=='user_login_name'){
					this.checkRegEmailExist();
				}
				if(!this.isRegEmailExist){
					obj.parent().find('.tip').html('');
				}
			}
		}		
		if(!field || field=='passwd'){
			var obj = this.getRegNode().find('input[name="passwd"]');
			var reg = /^[0-9a-zA-Z]{6,20}$/;
			if(!reg.test(obj.val())){
				obj.parent().find('.tip').html('6-20 characters(A-Z,a-z,0-9 only)');
				error = 1;
			}else{
				obj.parent().find('.tip').html('');
			}
		}		
		if(!field || field=='passwd2'){	
			var obj = this.getRegNode().find('input[name="passwd2"]');
			var obj1 = this.getRegNode().find('input[name="passwd"]');
			if(obj.val()!=obj1.val()){
				obj.parent().find('.tip').html('Passwords do not match. Please try again.');
				error = 1;
			}else{
				obj.parent().find('.tip').html('');
			}
		}
		if(!field || field=='checkcode'){	
			var obj = this.getRegNode().find('input[name="checkcode"]');
			if(obj.val()=='' || obj.val().length<4){
				obj.parent().find('.tip').html('Sorry, you enter the code is not correct!');
				error = 1;
			}else{	
				if(!SignDialog.isRegCheckcodeWrong){
					obj.parent().find('.tip').html('');
				}
			}
		}
		if(!field || field=='isaccept'){	
			var obj = this.getRegNode().find('input[name="isaccept"]');
			if(!obj.attr('checked')){
				obj.parent().find('.tip').html('Please accept Register Agreement and Terms of Use.');
				error = 1;
			}else{
				obj.parent().find('.tip').html('');
			}
		}
		if(error>0){
			return false;
		}
		return true;
	},
	checkLogin:function(field){
		var error = 0;
		if(!field || field=='user_login_name'){
			var obj = this.getLoginNode().find('input[name="user_login_name"]');
			if(!Validate.isEmail(obj.val())){
				obj.parent().find('.tip').html('Please input your email account');
				error = 1;
			}else{
				obj.parent().find('.tip').html('');
			}
		}
		if(!field || field=='password'){
			var obj = this.getLoginNode().find('input[name="password"]');
			if(obj.val()==''){
				obj.parent().find('.tip').html('Please input your password');
				error = 1;
			}else{
				obj.parent().find('.tip').html('');
			}		
		}		
		if(error>0){
			return false;
		}
		return true;
	},
	checkRegEmailExist: function(){
		var email = this.getRegNode().find('input[name="user_login_name"]').val();
		$.get("/ajax/validation.php",
			{ 
				"func": "IsDupRegLoginName", 
				"user_login_name":email
			},
			function(data){
				var nowEmail = SignDialog.getRegNode().find('input[name="user_login_name"]').val();
				if(data == 'true' && nowEmail==email)
				{
					SignDialog.isRegEmailExist = true;
					SignDialog.getRegNode().find('input[name="user_login_name"]').parent().find('.tip').html("The email address already exists, please change it.");
				}else{
					SignDialog.isRegEmailExist = false;
					SignDialog.getRegNode().find('input[name="user_login_name"]').parent().find('.tip').html("");
				}
			}
		);
	},
	checkRegCheckcode: function(){
		var checkcode = this.getRegNode().find('input[name="checkcode"]').val();
		$.ajax({
			  type: 'GET',
			  url: 'http://usercenter.Sino-Sources/ajax/validation.php?rnd='+Math.random(),
			  dataType: 'jsonp',
			  jsonp:'callback',  
			  data: {
				 func : 'checkcode',					 
				 code : checkcode,
				 type : 'jsonp'
			  },
			  success:function(result){
				  var nowCheckcode = SignDialog.getRegNode().find('input[name="checkcode"]').val();
				  if(result.errno!=0 && nowCheckcode==checkcode)
					{
						SignDialog.isRegCheckcodeWrong = true;
						SignDialog.getRegNode().find('input[name="checkcode"]').parent().find('.tip').html("Sorry, you enter the code is not correct!");
					}else{
						SignDialog.isRegCheckcodeWrong = false;
						SignDialog.getRegNode().find('input[name="checkcode"]').parent().find('.tip').html("");
					}
			  }
		});
	},
	getDefaultLoginEmail:function(){
		return this.getTopNode().find('input[name="remember_user_login_name"]').val();
	}
};

var Cookie = {
	get:function(name){
		var arrStr = document.cookie.split("; "); 
		for(var i = 0;i < arrStr.length;i ++){ 
			var temp = arrStr[i].split("="); 
			if($.trim(temp[0]) == name) return unescape(temp[1]);
		}
    },
	del:function(name,domain,path,secure){
		var cookeStr = '';
		cookeStr += name+"=";
		
		var exp = new Date();
		exp.setTime(exp.getTime() - 100000);
		cookeStr += ";expires=" + exp.toGMTString();

		if(typeof(domain)!='undefined' && domain!==null){
			cookeStr += ";domain=" + escape(domain);
		}
		if(typeof(path)!='undefined' && path!==null){
			cookeStr += ";path=" + escape(path);
		}
		if(typeof(secure)!='undefined' && secure!==null){
			if(secure)	cookeStr += ";secure";
		}
		document.cookie = cookeStr;
	},
	set:function(name,value,expDays,domain,path,secure){ 
		var cookeStr = '';
		cookeStr += name+"="+escape(value);
		
		if(!expDays) expDays=30;
		var exp = new Date();
		exp.setTime(exp.getTime() + parseInt(expDays*24*60*60*1000)); 
		cookeStr += ";expires=" + exp.toGMTString();

		if(typeof(domain)!='undefined' && domain!==null){
			cookeStr += ";domain=" + escape(domain);
		}
		if(typeof(path)!='undefined' && path!==null){
			cookeStr += ";path=" + escape(path);
		}
		if(typeof(secure)!='undefined' && secure!==null){
			if(secure)	cookeStr += ";secure";
		}
		document.cookie = cookeStr;
	}
};

function AddHistoryProd(web_prod_id){
	var pArr = [];	
	var exist = false;
	try{
		var oldCookie = Cookie.get('CookProducts');
		if(oldCookie){
			var pArr = PHPSerializer.unserialize(oldCookie);				
		}		
		Cookie.del('CookProducts',null,'/');
	}catch(e){
		pArr = [];
	}	

	if(web_prod_id){
		if(pArr.length==0){		
			var pStr = Cookie.get('historyProds');
			if(pStr) pArr = pStr.split(',');
		}
		if(web_prod_id>0){
			for(var i in pArr){
				if(pArr[i] == web_prod_id){
					exist = true;
					break;
				}
			}
			if(!exist) pArr.unshift(web_prod_id);
			if(pArr.length>5) pArr.pop();
		}

		pStr = pArr.join(',');
		Cookie.set('historyProds',pStr,300,null,'/');
	}
}

function GetHistoryProd(web_prod_id){
	AddHistoryProd(0);
	$.ajax({
		  type: 'GET',
		  url: '/ajax/product.php?rnd='+Math.random(),
		  dataType: 'json',
		  data: {
			 func : 'getHistoryProd'
		  },
		  success:function(result){
			 if(result.html!=''){
				$('#historyProdDiv').html(result.html);
				$('#historyProdDiv').show();
			 }else{
				//$('#historyProdDiv').hide();
			 }
		  }
	});
}


/**
 * 提供在线客服调用接口函数
 */
var reseveKey = null;
var webcallApi = {
	/**
	 * 打开对话窗口,默认连接到嵌入代码配置的客服或者客服分组
	 * @groupId   客服分组标识  必须
	 * @userId    用户标识     必须
	 * @username  用户昵称     非必须
	 * @productId 产品标识     非必须
	 * @loginName 用户登录名   必须
	 * @siteId 	  站点标识     非必须
	 */	
	openChatGroup: function(groupId,userId,userName,loginName,productId,siteId){
		reseveKey = '#params:ydUserId,'+userId+',ydUserName,'+userName+',ydLoginName,'+loginName+',ydSiteId,'+siteId;
		if(productId) reseveKey += ',ydProductId,'+productId;
		
		if(typeof(doyoo)!='undefined'){
			doyoo.util.openChatGroup(groupId);
		}
		else
		{
			var chaturl = "http://chat.Sino-Sources/live/p.do?c=1&g=" + groupId + "&r=" + encodeURIComponent(reseveKey);
			window.open(chaturl,"livechat","height=470,width=692,directories=no,location=no,menubar=no,resizeable=no,status=no,toolbar=no,top=100,left=200,scrollbars=yes");
		}		
	}
}
