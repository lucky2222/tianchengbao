function initAutoCompeleteText(showid,id,showfieldid,valuefieldid,urlref,callback,minchars)
{
	function getParent($this) {
	    var selector = $this.attr('data-target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    var $parent = selector && $(selector)

	    return $parent && $parent.length ? $parent : $this.parent()
	  }
	/*
	 * 上下选择
	 */
	$('#'+showid).keydown(function (e) {
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
	    
	    if( (/(37|38|39|40)/.test(e.which)) &&!getParent($("#"+showid)).hasClass('open'))
	    {
	    	getParent($("#"+showid)).addClass('open');
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
	});
	
	/**
	 * 默认选择第一个
	 */
	$("#"+showid).blur(function(event){
		setTimeout(function(){
			if($('#'+showid).val()=='')
			{
				$('#'+id).val("");
			}else if($('#'+id).val()=='')
			{
				var $items = $('#'+id+'_autoList table tr');
				$items.eq(1).trigger('click');
			}
		  }, 200);
	})
	
	/*
	* ajax调用
	*/
	$("#"+showid).keyup(function(e){
		if (/(27|37|38|39|40|13)/.test(e.which)) return;
	    if($("#"+showid).val().length>=minchars)
	    {
	    	var params = {};
	    	params[showid+"_input"] = encodeURIComponent($("#"+showid).val());
	    	params['showname_input'] = showfieldid;
	    	params['valuename_input'] = valuefieldid;
	    	var paramnames = $("#"+id).attr("params").split(",");
	        for(i=0;i<paramnames.length;i++)
	        {
	        	params[paramnames[i]] =$("#"+paramnames[i]).val();
			}
	    	$.ajax({
		          url: urlref,
		          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		          dataType: "html",
		          beforeSend:function(xhr){
		        	//$("#"+id+"_load_img").show();
		        	$("#"+id).val("");
		          },
		          data: params,
		          success: function( data ) {
		        	//$("#"+id+"_load_img").hide();
		        	$("#"+id+"_autoList").html(data);
		        	$("#"+id+"_autoList table tr").on('click', function (e) {
		        		var cols='';
		        		var text = $(this).attr('rowname');
		        		var value = $(this).attr('rowvalue');
		        		$("#"+showid).val(text);
		        		$("#"+id).val(value);
		        		$("#"+id+"_autoList").dropdown();
		        		
		        		var callstr =callback+'';
		        		if(callstr!='')
		        		{
		        			eval(callstr)(text,value,$(this));
		        		} 
		        		
		        	});
		        	$("#"+id+"_autoList").attr("index",0);
		        	if(!getParent($("#"+showid)).hasClass('open'))
		        	{
		        		getParent($("#"+showid)).addClass('open');
		        	}
		        	
	    		}
	  		});
	    }
	});
}