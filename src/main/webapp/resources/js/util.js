/**
 * 常用工具类方法
 */
$(function() {
			/**
			 * 序列化表单转Json
			 */
			$.fn.serializeJson = function() {
				var serializeObj = {};
				var array = this.serializeArray();
				var str = this.serialize();
				$(array).each(function() {
					if (serializeObj[this.name]) {
						if ($.isArray(serializeObj[this.name])) {
							serializeObj[this.name].push(this.value);
						} else {
							serializeObj[this.name] = [serializeObj[this.name],
									this.value];
						}
					} else {
						serializeObj[this.name] = this.value;
					}
				});
				return serializeObj;
			};

			$.extend({
						/**
						 * 清空表单的输入控件
						 */
						clearForm : function(form) {

							$(':input', form).each(function() {
								var type = this.type;
								var tag = this.tagName.toLowerCase;
								if (type == 'text' || type == 'password'
										|| type == 'textarea'
										|| type == 'number' || type == 'tel'
										|| type == 'email' || type == 'hidden')
									this.value = "";
								else if (type = 'checkbox' || type == 'radio')
									this.checked = false;
								else if (tag == 'select')
									this.selectedindex = -1;
							});
						},
						/**
						 * 清空obj中内容为content的tag标签
						 */
						RemoveValidationMessage : function(obj, tag, content) {
							var delobj = $(obj).find(tag + ":contains('"
									+ content + "')");
							if (delobj.length > 0) {
								delobj.each(function() {
											$(this).remove();
										});
							}
						},
						getContextPath : function() {

							var curWwwPath = window.document.location.href;

							var pathName = window.document.location.pathname;
							var pos = curWwwPath.indexOf(pathName);

							var localhostPath = curWwwPath.substring(0, pos);

							var projectName = pathName.substring(0, pathName
											.substr(1).indexOf('/')
											+ 1);
							return localhostPath;
						},
						/**
						 * Session检测
						 */
						sessionCheck : function() {
							var result = "";
							$.ajax({
										type : "get",
										url : $.getContextPath()
												+ "/sysmanage/sessioncheck",
										async : false,
										success : function(data) {
											result = data;
										}
									});
							return result;
						},
						/**
						 * 初始化BaseType选择框内容
						 */
						initBaseTypeSelect : function(id, categoryid,
								initvalue, placeholder) {
							placeholder = encodeURIComponent(placeholder);
							$.get($.getContextPath() + "/basetypeselect/ajax",
									{
										'categoryid' : categoryid,
										'initvalue' : initvalue,
										'placeholder' : placeholder
									}, function(data) {
										$('#' + id).html(data);
									})
						},
						
						/**
						 * 初始化StaticEdit选择框内容
						 */
						initStaticEditSelect : function(id, listid, url, param) {
							$.get($.getContextPath() + url, param, function(
											data) {
										$('#' + listid).html(data);
										$('#' + listid).find("li").click(
												function() {
													$(this).closest("div").find("#" + id).val($(this)
															.text());
												});
									});

							var param = [];
							$("#" + id).keyup(function(e) {
								if (param.length == 0) {
									$.each($("#" + listid).find("li"),
											function(p1, p2) {
												param[p1] = $(this).text();
											});
								}
								itemstr = "";
								$("#" + listid).html("");
								for (var i = 0; i < param.length; i++) {
									if ($("#" + id).val() == ""
											|| param[i].toUpperCase()
													.indexOf($("#" + id).val()
															.toUpperCase()) >= 0) {
										itemstr = itemstr + "<li><a href='#'>"
												+ param[i] + "</a></li>";
									}
								}
								$("#" + listid).html(itemstr);
								$("#" + listid).find("li").click(function() {
											$("#" + id).val($(this).text());
										});
							});
						},
						/**
						 * 初始化StaticEdit选择框内容
						 */
						initStaticSelect : function(id, listid, url, param) {
							$.get($.getContextPath() + url, param, function(
											data) {
										$('#' + listid).html(data);
										$('#' + listid).find("li").click(
												function() {
													$(this).closest("div").find("#" + id+"_show").val($(this)
															.text());
													$(this).closest("div").find("#" + id).val($(this).find("a").attr("idvalue"));
												});
									});
							
							var param = [];
							var paramvalue = [];
							var index=-1;
							$("#" + id+"_show").change(function(e) {
								if($("#" + id+"_show").val()=="")
								{
									$("#"+id).val("");
								}
							});
							$("#" + id+"_show").keyup(function(e) {
								
								if (e.which==38)
								{
									index--;
									if(index<=0){
										index=0;
									}
									$('#'+listid+" li a").eq(index).trigger('focus');
									return;
								}else if (e.which==40){
									index++;
									$('#'+listid+" li a").eq(index).trigger('focus');
									return;
								}else if (e.which==27){
									$("#" + listid).dropdown('toggle');
									return;
								}
								
								if (param.length == 0) {
									$.each($("#" + listid).find("li"),
											function(p1, p2) {
												param[p1] = $(this).text();
												paramvalue[p1]=$(this).find("a").attr("idvalue")
											});
								}
								itemstr = "";
								$("#" + listid).html("");
								for (var i = 0; i < param.length; i++) {
									if ($("#" + id+"_show").val() == ""
											|| param[i].toUpperCase()
													.indexOf($("#" + id+"_show").val()
															.toUpperCase()) >= 0) {
										itemstr = itemstr + "<li><a href='#' idvalue='"+paramvalue[i]+"'>"
												+ param[i] + "</a></li>";
									}
								}
								$("#" + listid).html(itemstr);
								$("#" + listid).find("li").click(function() {
											$("#" + id+"_show").val($(this).text());
											$("#" + id).val($(this).find("a").attr("idvalue"));
										});
								index=-1;
								
							});
						},
						/**
						 * 初始化StaticEdit选择框内容 带callback
						 */
						initStaticSelect : function(id, listid, url, param,callback) {
							$.get($.getContextPath() + url, param, function(
											data) {
										$('#' + listid).html(data);
										$('#' + listid).find("li").click(
												function() {
													$(this).closest("div").find("#" + id+"_show").val($(this)
															.text());
													$(this).closest("div").find("#" + id).val($(this).find("a").attr("idvalue"));
													
													var text = $(this).text();
													var value = $(this).find('a').attr('idvalue');
													if(callback&&callback!='')
									        		{
									        			eval(callback+'(text,value,$(this))');
									        		} 
												});
									});
							
							var param = [];
							var paramvalue = [];
							var index=-1;
							$("#" + id+"_show").change(function(e) {
								if($("#" + id+"_show").val()=="")
								{
									$("#"+id).val("");
								}
							});
							$("#" + id+"_show").keyup(function(e) {
								
								if (e.which==38)
								{
									index--;
									if(index<=0){
										index=0;
									}
									$('#'+listid+" li a").eq(index).trigger('focus');
									return;
								}else if (e.which==40){
									index++;
									$('#'+listid+" li a").eq(index).trigger('focus');
									return;
								}else if (e.which==27){
									$("#" + listid).dropdown('toggle');
									return;
								}
								
								if (param.length == 0) {
									$.each($("#" + listid).find("li"),
											function(p1, p2) {
												param[p1] = $(this).text();
												paramvalue[p1]=$(this).find("a").attr("idvalue")
											});
								}
								itemstr = "";
								$("#" + listid).html("");
								for (var i = 0; i < param.length; i++) {
									if ($("#" + id+"_show").val() == ""
											|| param[i].toUpperCase()
													.indexOf($("#" + id+"_show").val()
															.toUpperCase()) >= 0) {
										itemstr = itemstr + "<li><a href='#' idvalue='"+paramvalue[i]+"'>"
												+ param[i] + "</a></li>";
									}
								}
								$("#" + listid).html(itemstr);
								$("#" + listid).find("li").click(function() {
											$("#" + id+"_show").val($(this).text());
											$("#" + id).val($(this).find("a").attr("idvalue"));
										});
								index=-1;
								
							});
						},
						/**
						 * 上下文选择
						 * gening
						 */
						showInputKeyDown : function(showid,id,e){
							if (!/(32|27|37|38|39|40|13)/.test(e.which)) return;
							
						    var $items = $('#'+id+'_autoList table tr');
						    var index = $('#'+id+'_autoList').attr("index");
						    if(index==null) 
						    {
						    	index=0;
						    }else{
						    	if(index>0&&$items.eq(index).hasClass("warning"))
						    	{
						    		$items.eq(index).toggleClass("warning");
						    	}
						    }
						    if ((e.which==13)){
						    	$items.eq(index).trigger('click');
						    	return false;
						    }
						    if ((e.which == 37||e.which == 38) && index > 1) index--;                        // up
						    if ((e.which == 39||e.which == 40) && index < $items.length - 1) index++;                        // down;
						    if (!~index) index = 0;
						    
						    if( (/(37|38|39|40)/.test(e.which)) &&!$('#'+showid).attr("aria-expanded"))
						    {
						    	$('#'+id+'_autoList').dropdown("toggle");
						    }
						    
						    $('#'+id+'_autoList').attr("index",index);
						    $items.eq(index).toggleClass("warning");
						    $items.eq(index).trigger('focus');
						    if((e.which == 39||e.which == 40)&&$items.eq(index).offset().top-$('#'+id+'_autoList').offset().top>100)
						    {
						    	$('#'+id+'_autoList').scrollTop($items.eq(index).offset().top-$('#'+id+'_autoList').offset().top-50);
						    }else if((e.which == 37||e.which == 38)&&$items.eq(index).offset().top-$('#'+id+'_autoList').offset().top<100)
						    {
						    	$('#'+id+'_autoList').scrollTop($items.eq(index).offset().top-$('#'+id+'_autoList').offset().top);
						    }
						    return;
						},
						
						/**
						 * auto ajax 调用
						 */
						showInputKeyUp : function(showid,id,showfieldid,valuefieldid,urlref,e,callback){
							if (/(27|37|38|39|40|13)/.test(e.which)) return;
						    if($("#"+showid).val().length>=1)
						    {
						    	var params = {};
						    	params[showid+'_input'] = encodeURIComponent($("#"+showid).val());
						    	params['showname_input'] = showfieldid;
						    	params['valuename_input'] = valuefieldid;
						    	var paramnames = $('#'+id).attr("params").split(",");
						        for(i=0;i<paramnames.length;i++)
						        {
						        	params[paramnames[i]] =$("#"+paramnames[i]).val();
								}
						    	$.ajax({
							          url: urlref,
							          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							          dataType: "html",
							          beforeSend:function(xhr){
							        	$("#"+id+"_load_img").show();
							        	$("#"+id).val("");
							          },
							          data: params,
							          success: function( data ) {
							        	$("#"+id+"_load_img").hide();
							        	$("#"+id+"_autoList").html(data);
							        	$("#"+id+"_autoList table tr").on('click', function (e) {
							        		var cols='';
							        		var text = $(this).attr('rowname');
							        		var value = $(this).attr('rowvalue');
							        		$('#'+showid).val(text);
							        		$('#'+id).val(value);
							        		$('#'+id+'_autoList').dropdown();
							        		
							        		if(callback&&callback!='')
							        		{
							        			eval(callback+'(text,value,$(this))');
							        		} 
//							        		var callstr =${callback}+'';
//							        		if(callstr!='')
//							        		{
//							        			${callback}(text,value,$(this));
//							        		} 
							        		
							        	});
							        	$('#'+id+'_autoList').attr("index",0);
							        	if(($('#'+showid).attr("aria-expanded")=="fasle"))
							        	{
							        		$('#'+id+'_autoList').dropdown("toggle");
							        	}
							        	
						    		}
						  		});
						    }
						},
						
						/**
						 * 初始化StaticEdit选择框内容
						 */
						orderFeeStatusInit : function(orderid) {
							$.get($.getContextPath() + "/orderfee/getorderfeestatus/"+orderid, function(
											data) {
										$("#fee_status_"+orderid).html(data);
									});
						},
						/**
						 * ajax调用过程中进行遮罩锁屏
						 */
						startLoading:function(){
							if($("#loading").length==0)
							{
								$("body").append('<div class="modal fade" id="loading" tabindex="-1" ><div id="cwloading"><img src="'+$.getContextPath()+'/resources/image/ql.gif"/></div></div>');
							}
							$("#loading").modal({keyboard: false,backdrop:'static'});
						},
						/**
						 * 解除锁屏
						 */
						endLoading:function(){
							if($("#loading").length>0)
							{
								$("#loading").modal('hide');
							}
						}
						/**
						 * 继续
						 */
						
					});
		});

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "H+" : this.getHours(),                   //24小时
	"h" : this.getHours()>12?this.getHours()-12:this.getHours(),//12小时
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

function strToDate(v)
{
	var datetime = v.split(' ');
	var year = '';
	var month = '';
	var day = '';
	var h = '';
	var m = '';
	var s = '';
	if (datetime.length == 0)
	{
		return null;
	}
	if (datetime.length == 1)
	{
		var date = datetime[0].split('-');
		if (date.length != 3)
		{
			return null;
		}
		year = date[0];
		month = date[1];
		day = date[2];
	}

	if (datetime.length == 2)
	{
		var date = datetime[0].split('-');
		if (date.length != 3)
		{
			return null;
		}
		year = date[0];
		month = date[1];
		day = date[2];

		var time = datetime[1].split(':');
		if (time.length == 1)
		{
			h = time[0];
		}
		else if (time.length == 2)
		{
			h = time[0];
			m = time[1];
		}
		else if (time.length > 2)
		{
			h = time[0];
			m = time[1];
			s = time[2];
		}
	}

	return new Date(year,month-1,day,h,m,s);
}
