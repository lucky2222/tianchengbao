function initSyncDiv(id,parainit,urlref,param,callback)
{
	var data = param;
	if(parainit!=null&&parainit!="")
	{
		data = eval(parainit)(id,param);
	}
	$.ajax({
		url:urlref,
		 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		 beforeSend: function(){},
		  data: encodeURI(data),
		  dataType: 'html',
		  success:  function( subdata ) {
			  $("#sync_"+id).html(data);
			  if(callback!=null&&callback!="")
			  {
				  eval(callback)(id,subdata);
			  }
		  }
	});
}