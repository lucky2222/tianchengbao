function initOrderStatus(orderid)
{
	$.get($.getContextPath() + "/monitor/getsummarydetail/"+orderid,"",
			  function(data){
				$("#status_"+orderid).html(data);
				
				$("#status_"+orderid).find(".biaozy").hover(function(){
					$(this).find('.xialazix').css('display','block')
				},function(){
					$(this).find('.xialazix').css('display','none')
				});
	});
	

}