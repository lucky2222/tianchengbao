/**
 * ajax方法
 */
function callAPI(purl,param,callback,async){
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
 * 放提箱单
 */
function ftxd() {
	if (!confirm("确认放箱提单吗？")) {
		return false;
	}

	var OrderID = $("#orderid").text();
	var path = $.getContextPath() + "/OrderFtxdController/Ftxd"
	var param = {};
	param = {
		"OrderID" : OrderID
	}
	callAPI(path, param, ftxd_callback)
}
function ftxd_callback(data) {
	list = JSON.parse(data)
	if (data != "" && data != null) {
		var result = list.result
		if (result == "该票已放过提单箱") {
			$("#ftxd_hide").attr("class", "sucssezd")

		}else if(result == "放提箱单成功"){
			$("#ftxd_hide").attr("class", "sucssezd")
			
			findDcSuccess();
		}
		alert(result);
	}

}


//订舱受理中
function dcAccept(){
	if(confirm("确定订舱受理中吗？")==false){
		return false;
	}
	var path=$.getContextPath() +"/OrderFtxdController/dcAccept";
	var OrderID=$("#orderid").text();
	var param={};
	param={"OrderID":OrderID}
	callAjax(path,param,dcAccept_callback);
}
function dcAccept_callback(data){
	var list=JSON.parse(data);
	if(list.result!=null&&list.result!=""){
		alert(list.result)
		findDcSuccess();
		document.location.reload();
	}
}
//订舱成功
function dcSuccess(){
	if(confirm("确定订舱成功吗？")==false){
		return false;
	}
	var path=$.getContextPath() +"/OrderFtxdController/dcSuccess";
	var OrderID=$("#orderid").text();
	var param={};
	param={"OrderID":OrderID}
	callAjax(path,param,dcSuccess_callback);
}
function dcSuccess_callback(data){
	var list=JSON.parse(data);
	if(list.result!=null&&list.result!=""){
		alert(list.result)
		if(list.result=="订舱成功操作成功"){
			$("#dcSuccessNo").attr("class","sucssezd");
		}
		findDcSuccess()
	}
}
//能否使用订舱成功
function findDcSuccess(){
	var path=$.getContextPath() +"/OrderFtxdController/findDcSuccess";
	var OrderID=$("#orderid").text();
	var param={};
	param={"OrderID":OrderID}
	callAjax(path,param,findDcSuccess_callback);
}
function findDcSuccess_callback(data){
	var list=JSON.parse(data);
		//暂时占用方法  查询舱单信息是否ManifestOK
	if(list.ManifestOK!="1"){
		$("#sum_list").text("舱单未OK！");
		$("#cdinfo_list").hide();
	}
	if(list.LadingContainer=="1"){
		$("#look_cd").show();
	}else{
		$("#look_cd").hide();
	}
	//查询是否可用订舱成功
	if(list.result!=null&&list.result!=""){
		var result=list.result
		if(result=="canSuccess"){
			$("#dcSuccessCan").show();
			$("#dcSuccessNo").hide();
		}else if(result=="noSuccess"){
			if(list.BookSuccess=="1"){
				$("#dcSuccessNo").attr("class","sucssezd");
			}
			$("#dcSuccessCan").hide();
			$("#dcSuccessNo").show();
		}
	}
}

//查询是否放过提箱单
function checkFtxd(){
	var path=$.getContextPath() +"/OrderFtxdController/findFtxdEd";
	var OrderID=$("#orderid").text();
	var param={};
	param={"OrderID":OrderID}
	callAjax(path,param,checkFtxd_callback);
}
function checkFtxd_callback(data){
	
	
	list = JSON.parse(data)
	if (data != "" && data != null) {
		var result = list.result
		if (result == "1") {
			$("#ftxd_hide").attr("class", "sucssezd")
		}
		
	}

	
	
}





$(document).ready(function(){
	checkFtxd()
	setTimeout(function(){
		findDcSuccess();
	},0)
	
})