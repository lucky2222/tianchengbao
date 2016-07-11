function ajax_page_init(el,url,param)
{

	if(url==null||url=="")
	{
		url = $(el).closest("#panel_ajax_page").attr('actionurl');
	}
	$.get(url,encodeURI(param),
			  function(data){
				el.html(data);
	});
	
	$("#icoLoading").hide();
}

function auto_page_init(el,url,showobj,valueobj,showid,valueid)
{
	var params = "showname_input="+showid+"&valuename_input="+valueid;
	$.get(url,encodeURI(params),
			  function(data){
				el.html(data);
				//el.find("table").addClass("table table-striped table-bordered table-hover table-condensed dropdown-menu");
				el.find("table tr").on('click', function (e) {
	        		var cols='';
	        		var text = $(this).attr('rowname');
	        		var value = $(this).attr('rowvalue');
	        		$("#"+showobj).val(text);
	        		$("#"+valueobj).val(value);
	        		//el.find("table").hide();
	        	});
	});
	
	$("#icoLoading").hide();
}

function auto_page_init(el,url,showobj,valueobj,showid,valueid,callback)
{
	var params = "showname_input="+showid+"&valuename_input="+valueid;
	$.get(url,encodeURI(params),
			  function(data){
				el.html(data);
				//el.find("table").addClass("table table-striped table-bordered table-hover table-condensed dropdown-menu");
				el.find("table tr").on('click', function (e) {
	        		var cols='';
	        		var text = $(this).attr('rowname');
	        		var value = $(this).attr('rowvalue');
	        		$("#"+showobj).val(text);
	        		$("#"+valueobj).val(value);
	        		if(callback&&callback!='')
	        		{
	        			eval(callback+'(text,value,$(this))');
	        		} 
	        	});
	});
	
	$("#icoLoading").hide();
}

function ExportExcel(url){
	 //如果页面中没有用于下载iframe，增加iframe到页面中
	 if($('#downloadcsv').length<=0)
	{
		 $('body').append("<iframe id=\"downloadcsv\" style=\"display:none\"></iframe>");
	}
	$('#downloadcsv').attr('src',url);
}

$(document).ajaxStart(function(){
	$("#icoLoading").show();
}).ajaxStop(function(){
	$("#icoLoading").hide();
});