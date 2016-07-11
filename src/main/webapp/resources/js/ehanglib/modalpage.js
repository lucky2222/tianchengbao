function initModalPage(id,title,initvalue,pagename,pageservice,callback,initpage,param,submitcheck,sync)
{
	/**
	 * 同步
	 */
	if(sync)
	{
		/**
		 * 请求模态框页面
		 */
		$.ajax({
			  url: '/modalpage/page/'+pagename,
			  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			  data: encodeURI(encodeURI(param))+'&initpage='+initpage,
			  success:  function( data ) {
				$('#'+id+'_body').html('<form id="'+id+'_form" action="#" method="POST">'+data+'</form>');
				/*
				 * 绑定提交事件
				 */
				$('#'+id+'_submit').click(function(){
					$.ajax({
						url:'/modalpage/submit/'+pageservice,
						 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						 beforeSend: function(){
							  /*
							   * 提交前的form检查
							   */
							  if(submitcheck!=null&&submitcheck!="")
							  {
								  return eval(submitcheck)();
							  }
							},
						  data: encodeURI($('#'+id+"_form").serialize()),
						  dataType: 'html',
						  success:  function( subdata ) {
							  if(callback!=null&&callback!="")
							  {
								  eval(callback)(subdata);
							  }
							  $('#'+id).modal('hide');
						  }
					});
				});
			  },
			  dataType: 'html'
			});
	}else{
		/**
		 * 异步 模态框弹出时请求
		 */
		$('#'+id).on('shown.bs.modal', function () {
			/**
			 * 请求模态框页面
			 */
			$.ajax({
				  url: '/modalpage/page/'+pagename,
				  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				  data: encodeURI(encodeURI(param))+'&initpage='+initpage,
				  success:  function( data ) {
					$('#'+id+'_body').html('<form id="'+id+'_form" action="#" method="POST">'+data+'</form>');
					/*
					 * 绑定提交事件
					 */
					$('#'+id+'_submit').click(function(){
						$.ajax({
							url:'/modalpage/submit/'+pageservice,
							 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							 beforeSend: function(){
								  /*
								   * 提交前的form检查
								   */
								  if(submitcheck!=null&&submitcheck!="")
								  {
									  return eval(submitcheck)();
								  }
								},
							  data: encodeURI($('#'+id+"_form").serialize()),
							  dataType: 'html',
							  success:  function( subdata ) {
								  if(callback!=null&&callback!="")
								  {
									  eval(callback)(subdata);
								  }
								  $('#'+id).modal('hide');
							  }
						});
					});
				  },
				  dataType: 'html'
				});
		});
	}
	
}
