/**
 * ajax封装方法
 */
function callAjax(purl,param,callback,async){
	if(undefined == async)
		async = false;
	var _url =  purl; 
	$.ajax({
		type: "post",
		url: _url,
		async : async,
		timeout : 3000 ,
		data:param,
		traditional : true,
		success: function(data){
			if(callback){
				callback(data);
			}
		},	
		
		error: function(){
		}
	});
}
/**
*字符串如果为空就什么都不显示
*/
function getStr(str){
	if(str==""||str==null){
		return "";
	}else{
		return str;
	}
}