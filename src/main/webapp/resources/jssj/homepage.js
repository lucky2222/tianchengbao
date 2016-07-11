var current_wn = "#whats-new-all";
var bld_timeout = "";
var facebook_timeout = "";
var slider_timeout = "";

$(document).ready(function(){
        
        try {
		if(isTouchDevice()) {
			if($(window).width() >= 768) {			
				touchScroll('#whats-new-content');
			}
		} else {
			$('#whats-new-content').slimScroll({
				height: '450px'
			});
		}
		/*
		$('#whats-new-content').slimScroll({
				height: '450px'
			});*/
	}
        catch(e) {
		//alert(e);
	}
        	
	
	$.ajax({
		url: "feeds.php",
		cache: false,
		dataType: "html",
		success: function(data) {
			$("#whats-new-all-panel").html(data).fadeIn("fast");			
			$('#whats-new-all').addClass("active").bind('click', function() {
				changePanel("all");
				return false;
			});
		}
	});
	
	$.ajax({
		url: "feeds.php?type=blogs",
		cache: false,
		dataType: "html",
		success: function(data) {
			$("#whats-new-blogs-panel").html(data);
			$('#whats-new-blogs').bind('click', function() {
				changePanel("blogs");
				return false;
			});
		}
	});
	
	$.ajax({
		url: "feeds.php?type=videos",
		cache: false,
		dataType: "html",
		success: function(data) {
			$("#whats-new-videos-panel").html(data);
			$('#whats-new-videos').bind('click', function() {
				changePanel("videos");
				return false;
			});
		}
	});
	
	$.ajax({
		url: "feeds.php?type=podcasts",
		cache: false,
		dataType: "html",
		success: function(data) {
			$("#whats-new-podcasts-panel").html(data);
			$('#whats-new-podcasts').bind('click', function() {
				changePanel("podcasts");
				return false;
			});
		}
	});
	
	$.ajax({
		url: "feeds.php?type=news",
		cache: false,
		dataType: "html",
		success: function(data) {
			$("#whats-new-news-panel").html(data);
			$('#whats-new-news').bind('click', function() {			
				changePanel("news");
				return false;
			});
		}
	});
	
	$.ajax({
		url: "latest_tweet.php",
		cache: false,
		dataType: "html",
		success: function(data) {
			$("#latest_tweet_content").html(data);
			$("#latest_tweet_content div.entry").fadeIn("fast");
		}
	});
	
	$("#locator-search, #locator-services, #locator-share, #locator-help, #locator-embed, #gtfs-share-close").bind("click", function() {
		changeLocator($(this).attr("id"));
		return false;
	});																							
	
	$("#locator-search").addClass("active");
		
	var elem = document.getElementById('homepageSlider');
		
	window.homepageSlider = new Swipe(elem, {
		startSlide: 0,
		speed: 400,
		auto: 5000,
		continuous: true,
		disableScroll: false,
		callback: function(index, elem) {
			sliderThumbFocus("", "auto", index);
		},
		transitionEnd: function(index, elem) {},
		slidesLoaded: function(isloaded) {
			$("#homepageSlider > .slider-wrap").css("height","auto");			
		}
	});
		
	$("#homepageSlider > .slider-thumbnails > .thumbnails-wrap > a").bind('touchstart click mouseover', function(event) {
		var url = this;
		event.preventDefault();		
		window.clearInterval(slider_timeout);
		
		slider_timeout = window.setTimeout(function(){
			sliderThumbFocus(url, event.type);
		}, 300, url);
	});
	
	$("#homepageSlider > .slider-thumbnails > .thumbnails-wrap > a").bind('mouseout', function(event) {
		window.clearInterval(slider_timeout);
	});
	
	if($(window).width() >= 768) {
		$("#bld > div > div > a").bind('touchstart click', function(event) {
			event.preventDefault();
			window.clearTimeout(bld_timeout);
			bld_timeout = 999;
			changeBLD($(this).parent().parent().index());
		});
		
		changeBLD(2);	
	}
		
	$("#homepageSlider img").one('load', function() {
		sliderThumbFocus("", "auto", 0);
		sliderArrows();
	}).each(function() {
		if (this.complete) $(this).load();
	});	
		
	$('#homepageSlider > .slider-wrap > div').click(function() { _gaq.push(['_trackEvent', 'Slider', 'Click']); });
	$('#homepageSlider > .slider-thumbnails > .thumbnails-wrap > a').click(function() { _gaq.push(['_trackEvent', 'Slider', 'Click']); });
});

$(window).bind("orientationchange resize", function(event){
	sliderThumbFocus("", "auto", homepageSlider.getPos());
	sliderArrows();
	
	if($(window).width() >= 768) {
		$("#bld > div > div > a").unbind().bind('touchstart click', function(event) {
			event.preventDefault();
			window.clearTimeout(bld_timeout);
			bld_timeout = 999;
			changeBLD($(this).parent().parent().index());
		});
		
		changeBLD(2);
	} else {
		$("#bld > div > div > a").unbind();
		window.clearTimeout(bld_timeout);
		$("#bld div").removeAttr("style");
	}
});

function sliderArrows() {
	
	if ($(window).width() <= 768)
	{
		if($("#slider-arrow-left").length < 1) {			
			$("#homepageSlider").prepend("<div id='slider-arrow-left'><img src='../images/arrow-left.png' alt='向左' /></div><div id='slider-arrow-right'><img src=../'images/arrow-right.png' alt='向右' /></div>");
			$("#slider-arrow-left").bind("click touchstart", function() { homepageSlider.prev(); });		
			$("#slider-arrow-right").bind("click touchstart", function() { homepageSlider.next(); });	
		}
		var height = $("#homepageSlider > .slider-wrap > div img:first-child").height();
		$("#slider-arrow-left, #slider-arrow-right").css("top",  Math.round(height*.25) + "px");
	}
	else {
		$("#slider-arrow-left, #slider-arrow-right").unbind().remove();
	}
	/*
	if(isTouchDevice() == false && $(window).width() <=768) {
		var height = $("#homepageSlider > .slider-wrap > div img:first-child").height();
		
		if($("#slider-arrow-left").length < 1) {			
			$("#homepageSlider").prepend("<div id='slider-arrow-left'><img src='i/arrow-left.png' alt='向左' /></div><div id='slider-arrow-right'><img src='i/arrow-right.png' alt='向右' /></div>");
			$("#slider-arrow-left").bind("click touchstart", function() { homepageSlider.prev(); });		
			$("#slider-arrow-right").bind("click touchstart", function() { homepageSlider.next(); });	
		}
	} else {
		$("#slider-arrow-left, #slider-arrow-right").unbind().remove();
	}
	$("#slider-arrow-left, #slider-arrow-right").css("top",  Math.round(height*.25) + "px");*/
}

function sliderThumbFocus(obj, type, index) {
	var center_pos = 0;
	var $thumbs = $('#homepageSlider > .slider-thumbnails > .thumbnails-wrap > a');
	var current_elem = $thumbs.get(index);
	
	if(obj != "") {
		center_pos = $(obj).position().left + 5;
	} else {
		center_pos = $(current_elem).position().left + 5;
	}
	
	switch(type) {
		case "mouseover":
			$thumbs.removeClass("selected");
			$(obj).addClass("selected");
			homepageSlider.jump($(obj).index());
			break;
		case "click":
			if(!isTouchDevice()) {
				window.location.href = $(obj).attr("href");
			}
			break;
		case "touchstart":
			$thumbs.removeClass("selected");
			$(obj).addClass("selected");
			homepageSlider.jump($(obj).index());
			break;
		case "auto":
			$thumbs.removeClass("selected");
			$(current_elem).addClass("selected");
			break;
	}
	
	$(".slider-arrow").css("left", center_pos + "px").show();
	
	return false;
}

function changeBLD(index, speed) {
	var width = $("#bld").width();
	var items = new Array("#b","#l","#d");
	
	window.clearTimeout(bld_timeout);
	
	$("#bld > div > div > a").css("opacity","");
		
	switch(index) {
		case 0:
			$("#l").animate({
			   left: Math.ceil(width-160) + "px"
			}, { duration: 400, queue: false });
			$("#d").animate({
			   left: Math.ceil(width-88) + "px"
			}, { duration: 400, queue: false });
			break;
		case 1:
			$("#l").animate({
			   left: "72px"
			}, { duration: 400, queue: false });
			$("#d").animate({
			   left: Math.ceil(width-88) + "px"
			}, { duration: 400, queue: false });
			break;
		case 2:
			$("#l").animate({
			   left: "72px"
			}, { duration: 400, queue: false });
			$("#d").animate({
			   left: "145px"
			}, { duration: 400, queue: false });
			break;
	}
	
	$("#bld > " + items[index] + " > div > a").css("opacity","1.0");	
	
	if(index < 2) {
		index++;
	} else {
		index = 0;
	}
	
	if(bld_timeout != 999) {
		bld_timeout = window.setTimeout(function(){changeBLD(index)}, 7000);
	}
}

function changePanel(type) {
	$(current_wn).removeClass("active");
	$(current_wn+"-panel").fadeOut('fast', function() {													
		current_wn = "#whats-new-" + type;
		$("#whats-new-" + type).addClass("active");
		$("#whats-new-" + type + "-panel").fadeIn("fast");
	});
}

function changeLocator(view) {
	$("#gtfs a").removeClass("active");
	
	switch(view) {
		case "locator-search":
			$("#gtfs-search").show();
			$("#gtfs-services, #gtfs-share, #gtfs-help, #gtfs-embed").hide();
			$("#locator-search").addClass("active");
			break;
		case "locator-services":
			$("#gtfs-search, #gtfs-services").show();
			$("#gtfs-share, #gtfs-help, #gtfs-embed").hide();
			$("#locator-services").addClass("active");
			break;
		case "locator-share":
			$("#gtfs-share").show();
			$("#gtfs-search, #gtfs-services, #gtfs-help, #gtfs-embed").hide();
			$("#locator-share").addClass("active");
			break;
		case "locator-help":
			$("#gtfs-help").show();
			$("#gtfs-search, #gtfs-services, #gtfs-share, #gtfs-embed").hide();
			$("#locator-help").addClass("active");
			break;
		case "locator-embed":
			$("#gtfs-embed").show();
			$("#gtfs-search, #gtfs-services, #gtfs-share, #gtfs-help").hide();
			$("#locator-share").addClass("active");
			break;
		case "gtfs-share-close":
			$("#gtfs-share").show();
			$("#gtfs-search, #gtfs-services, #gtfs-help, #gtfs-embed").hide();
			$("#locator-share").addClass("active");
			break;
		default:
			$("#gtfs-search").show();
			$("#gtfs-services, #gtfs-share ,#gtfs-help, #gtfs-embed").hide();
			$("#locator-search").addClass("active");
			break;
	}
}
