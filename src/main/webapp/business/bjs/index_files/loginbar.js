$(function(){
	
	$.ajax({
	  type: 'GET',
	  url: '/loginCheck?rnd='+Math.random(),
	  dataType: "json",
	  data: {},
	  success:function(data){
		  
		  if(data.result=="ok")
		  {		
			  //已登录

				$("#spLogin").hide();
				$("#spLogout").show();	
				$("#spUserName").html(data.user_name);
				$("#barMyFav").show();
				$("#barSupplyJoin").hide();
				

		  }
		  else
		  {
				$("#spLogin").show();
				$("#spLogout").hide();	
				$("#spUserName").html('');	
				$("#spFavNum").html('');
				$("#barMyFav").hide();
				$("#barSupplyJoin").show();
		  }
	  },
	  complete: function(){
	  }
	});
});
