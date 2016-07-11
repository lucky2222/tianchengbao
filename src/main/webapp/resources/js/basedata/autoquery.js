$(function() {
		//自动查询未读消息数
		function autoquery()
		{
			$.get($.getContextPath()+ "/getMsgNumByStaffid",'',
					function(data){
						var obj = jQuery.parseJSON(data);
						if(obj.login)
						{
							$("#msgnums").text(obj.nums);
						}else{
							clearInterval(autoqueryinterval);
							location.href = "/login";
						}
			});
		}
		autoquery();
		//自动查询时间间隔 毫秒
		var autoqueryinterval = setInterval(autoquery,30000);
	});