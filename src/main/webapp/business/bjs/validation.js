/***************************/
//@Author: Adrian "yEnS" Mato Gondelle & Ivan Guardado Castro
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/
var code_return_state;
$(document).ready(function(){
	var form = $("#registerform");
	var user_login_repeat=false;	
	var user_login_name = $("#user_mail");
	var nameInfo = $("#nameInfo");
	var passwd = $("#password");
	var passwdInfo = $("#passwdInfo");	
	var passwd2 = $("#password2");
	var passwd2Info = $("#passwd2Info");	
	var company_name = $("#company");
	var company_nameInfo = $("#company_nameInfo");	
	var mobileCtl = $("#tel");
	var mobileCtlInfo = $("#mobileInfo");

//	user_login_name.blur(function(){
//			if(validateEmail())
//			{
//                $.ajaxSetup({
//                async: false
//                });
//				//用户注册名查重
//				$.post("/ajax/validation.php", { "func": "IsDupRegLoginName", "user_login_name": $(this).val()},
//				   function(data){
//					 if($.trim(data) == 'true')
//				     {
//						 user_login_repeat=true;
//                         $("#nameInfo").addClass("error");
//						 $("#nameInfo").show().html("The email address already exists, please change it");
//				     }
//					 else
//					{
//						 user_login_repeat=false;
//					}
//				});
//                 $.ajaxSetup({
//                    async: true
//                    }); 
//			}
//
//		});
//	user_login_name.keyup(function(){
//		user_login_repeat = false;
//		user_login_name.removeClass("error");
//		nameInfo.text("");
//		nameInfo.removeClass("error");	
//	});
	passwd.blur(validatepasswd);
	passwd2.blur(validatepasswd2);
	passwd.keyup(validatepasswd);
	//passwd2.keyup(validatepasswd2);
	//company_name.keyup(validatecompany_name);
//    $('#CheckCode').blur(validateCode);
	user_login_name.focus(function(){
		nameInfo.html('Email will be used to sign in.Please make sure it is valid');
	});
	passwd.focus(function(){
		passwdInfo.html('6 - 20 characters(A-Z,a-z,0-9 only)');
	});
	passwd2.focus(function(){
		passwd2Info.html('Please enter your password again');
	});
//	checkcode.focus(function(){
//		CheckCodeInfo.html('Enter the characters you see in the image');
//	});
	form.submit(function(){
		if(!validateEmail())
		{
			user_login_name.focus();
			return false;
		}
		else if(!validatepasswd())
		{
			passwd.focus();
			return false;
		}
		else if(!validatepasswd2())
		{
			passwd2.focus();
			return false;
		}
		else if(user_login_repeat)
		{
			user_login_name.focus();
			return false;
		}		
		//else if(!validateMobile())
		//{
		//	mobileCtl.focus();
		//	return false;
		//}
    //    else if(code_return_state==false)
    //    {
		//	checkcode.focus();
     //       return false;
     //   }
		else if(!validateAccept())
		{
			return false;
		}
		else
		{
			return true;
		}
	});
	function validateAccept()
	{
		var isaccept = $('#isaccept').is(':checked');
		if(isaccept==false)
		{
			alert('You must accept Register Agreement and Terms of Use');
			return false;
		}
		return true;
	}
	//validation functions
	function validateEmail(){
		//testing regular expression
		var a = $("#user_mail").val();
		//var filter = /^\w+@\w+.[a-z]{2,4}$/;
		var myreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		//if it's valid email
		if(myreg.test(a))
		{
			if(user_login_repeat)
			{
				user_login_name.addClass("error");
				nameInfo.text("The email address already exists, please change it");
				nameInfo.addClass("error");
				return false;
			}
			else
			{
				user_login_name.removeClass("error");
				//nameInfo.text("√");
				nameInfo.removeClass("error");
				return true;
			}
		}
		//if it's NOT valid
		else
		{
			user_login_name.addClass("error");
			nameInfo.text("The Email address you entered is incorrect.");
			nameInfo.addClass("error");
			return false;
		}
	}
	function validateName(){
		//if it's NOT valid
		if(user_login_name.val().length < 4){
			user_login_name.addClass("error");
			nameInfo.text("We want names with more than 3 letters!");
			nameInfo.addClass("error");
			user_login_name.focus();
			return false;
		}
		//if it's valid
		else{
			user_login_name.removeClass("error");
			nameInfo.text("What's your name?");
			nameInfo.removeClass("error");
			return true;
		}
	}
	function validatepasswd(){
		var a = $("#password");
		var b = $("#password2");
		var myreg = /^[a-zA-Z0-9]{6,20}$/;
		//it's NOT valid
		if(!myreg.test(passwd.val())){
			passwd.addClass("error");
			passwdInfo.text("Please enter 6 - 20 characters(A-Z,a-z,0-9 only)");
			passwdInfo.addClass("error");
			return false;
		}
		//it's valid
		else{
			passwd.removeClass("error");
			passwdInfo.text("");
			passwdInfo.removeClass("error");
			return true;
		}
	}
	function validatepasswd2(){
		//are NOT valid
		if( passwd.val() != passwd2.val() ){
			passwd2.addClass("error");
			passwd2Info.text("Passwords do not match. Please try again.");
			passwd2Info.addClass("error");
			return false;
		}
		//are valid
		else if(passwd.val().length==0)
		{
			return false;
		}
		else
		{
			passwd2.removeClass("error");
			passwd2Info.text("");
			passwd2Info.removeClass("error");
			return true;
		}
	}
	function validatecompany_name(){
		if(company_name.val().length < 1){
			company_name.addClass("error");
			company_nameInfo.text("Type your company name please");
			return false;
		}
		else{			
			company_name.removeClass("error");
			//company_nameInfo.text("√");
			company_nameInfo.removeClass("error");
			return true;
		}
	}
	function validateMobile(){
		mobileCtl.val(mobileCtl.val().replace(/\D/g,''));
		if(mobileCtl.val().length < 1){
			mobileCtl.addClass("error");
			mobileCtlInfo.text("Type your mobile please");
			return false;
		}
		else{			
			mobileCtl.removeClass("error");
			//mobileCtlInfo.text("√");
			mobileCtlInfo.removeClass("error");
			return true;
		}
	}
        function validateCode(){
        var a = checkcode.val();
		var myreg = /^\d{4}$/;
		//if it's valid email
		if(!myreg.test(a)){
			checkcode.addClass("error");
			CheckCodeInfo.addClass("error");
			CheckCodeInfo.text("The characters not correct,please refresh and try again!");
			return false;
		}
		else{}
	}
});