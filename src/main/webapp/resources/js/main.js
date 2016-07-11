
$(function(){
	var _jsNavBtn = $("#menu"),
		_jsComNav = $(".jsComNav");
	_jsNavBtn.click(function(){
		var _this = $(this);
		if(_this.hasClass("openNav")){
			allOverClose();
			_jsComNav.removeClass("com_navShow");
			_jsNavBtn.removeClass("openNav");
			$(".com_head").removeClass("com_headAdd");
			}else{
				$(".com_head").addClass("com_headAdd");
				_this.addClass("openNav");
				allOvering();
				_jsComNav.addClass("com_navShow");
				}
		})
	$(".jsCom_over").click(function(){
		allOverClose();
		_jsComNav.removeClass("com_navShow");
		_jsNavBtn.removeClass("openNav");
		$(".com_head").removeClass("com_headAdd");
		})
	})
//公用蒙层
var _jsComOver = "<div class='com_over jsCom_over'></div>"
function allOvering(){
    $("body").append(""+_jsComOver+"");
	$("html").css({
		"overflow-y":"hidden",
		"height":"100%",
		});
	$("body").css({
		"overflow-y":"hidden",
		"height":"100%",
		});
}
function allOverClose(){
    $(".jsCom_over").remove();
	$("html").css({
		"overflow-y":"auto",
		"height":"auto",
		});
	$("body").css({
		"overflow-y":"auto",
		"height":"auto",
		});
}
//
/*function meuScorll(){
	var _jsComeu = $(".jsComeu"),
		_iswinHe = $(window).height(),
		_jsElsHe =_iswinHe-_jsComeu.prev("dl").height()-88,
		_jsComeuHe = _jsComeu.children("li").length* _jsComeu.children("li").height();
		if(_jsElsHe<_jsComeuHe){
			_jsComeu.css({
				"height":_jsElsHe+"px",
				"overflow-y":"auto"
				})
			}else{
				_jsComeu.css({
				"height":_jsComeuHe+"px",
				"overflow-y":"hidden"
				})
				}
	}*/

	function redirectUrl(path) {
			document.location.href = path;
	}

/*if($(".jsComeu").length>0){
	meuScorll();
	}
$(window).resize(function(){
	meuScorll();
	});*/
// $(window).scroll(function(){
// 	var scorlNum = $(window).scrollTop();
// 	if(scorlNum>0){
// 		$(".jsCom_head").addClass("com_headFix");
// 		}else{
// 			$(".jsCom_head").removeClass("com_headFix");
// 			}
// 	})
