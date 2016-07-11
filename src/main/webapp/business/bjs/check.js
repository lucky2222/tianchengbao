function validateEmail(id){
	//testing regular expression
	var a = $("#"+id).val();
	//var filter = /^\w+@\w+.[a-z]{2,4}$/;
	var myreg = /^([a-zA-Z0-9]+[_|\_|-|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|-|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	//if it's valid email
	if(myreg.test(a))
	{
				$("#"+id).removeClass("tab_error");
			$("#"+id+'Info').removeClass("error");
			$("#"+id+'Info').text("√");
			$("#is_show_br").hide();
			$("input[type=submit]").attr('disabled',false);
			return true;
		
	}
	//if it's NOT valid
	else
	{
		$("#"+id).addClass("tab_error");
		$("#"+id+'Info').text("Type a valid e-mail please");
		$("#"+id+'Info').addClass("error");
		$("#is_show_br").show();
					$("input[type=submit]").attr('disabled','disabled');
		return false;
	}
}
function validateNum(id){
	//testing regular expression
	var a = $("#"+id).val();
	//var filter = /^\w+@\w+.[a-z]{2,4}$/;
	var myreg = /^[0-9]+$/;
	//if it's valid email
	if(myreg.test(a))
	{
				$("#"+id).removeClass("tab_error");
			$("#"+id+'Info').removeClass("error");
			$("#"+id+'Info').text("√");
			$("#is_show_br").hide();
			$("input[type=submit]").attr('disabled',false);
			return true;
		
	}
	else
	{
		$("#"+id).addClass("tab_error");
		$("#"+id+'Info').text("Type a number please");
		$("#"+id+'Info').addClass("error");
		$("#is_show_br").show();
		$("input[type=submit]").attr('disabled','disabled');
		return false;
	}
}
function validateStr(id,errmsg){
	var a = $("#"+id).val();
	if(a!='')
	{
		$("#"+id).removeClass("tab_error");
		$("#"+id+'Info').removeClass("error");
		$("#"+id+'Info').hide();
		$("input[type=submit]").attr('disabled',false);
		return true;		
	}
	else
	{
		$("#"+id).addClass("tab_error");
		$("#"+id+'Info').text(errmsg);
		$("#"+id+'Info').addClass("error");
		$("#"+id+'Info').show();
		$("input[type=submit]").attr('disabled','disabled');
		return false;
	}
}
function counter(object){ 
	
	var limit = $(object).attr('maxlength'); 
	if($(".csfs").html()==''){ 
	   $('.csfs').text('Up to '+limit+" characters"); 
	}
	else
	{
		$("input[type=submit]").attr('disabled',false);
		var num=limit-$(object).val().length;
	   
		$('.csfs').html(num); 
		if(num==0)
			{
			   $(object).blur();
			}
	}
}
$(function(){
   $("#message").submit(function(){            
	  var content=$("#content").val();
	  var status=true;             
	  if(!validateEmail('simpleInquireFormEmail'))
	 {
		  status=false;                                
	  }        
	 if(content.length==0)
	 {
		 status=false;
		 $("input[type=submit]").attr('disabled','disabled');
	  }          
	  return status;
   });  
   
 });
