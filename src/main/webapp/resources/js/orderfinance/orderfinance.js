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

$(document).ready(function() {
	
})


//1：放单2： 待定0： 取消放单操作
function passPaper(LadingBillID,type){
	var path=$.getContextPath()+"/orderfinance/addmainorders"
		var param={}
	param={"LadingBillID":LadingBillID,"type":type};
	callAPI(path,param,passPaper_callback)
	/*
	$.ajax({
		type : "POST",
		url :path,
		data : param,
		async : false,
		traditional : true,
		error : function(request) {
			alert("出错了");
		},
		success : function(data) {
			alert(data)
		}

	});
	*/
}
function passPaper_callback(data){
	
	alert(data);
	$("#findList").click();
	
}
function plfd_noauth(type){
	var LadingBillID_array = new Array();
	$("input[name='checkOne_noauth']:checked").each(function(){
		 //由于复选框一般选中的是多个,所以可以循环输出 
		LadingBillID_array.push($(this).val()); 
		}); 
	var param={"LadingBillID_array":LadingBillID_array}
	param={"LadingBillID_array":LadingBillID_array,"type":type};
	var path=$.getContextPath()+"/orderfinance/addmainorders"
	callAPI(path,param,plfd_noauth_callback)
}
function plfd_noauth_callback(data){
	alert(data)
	$("#findList").click();
}
//交单显示div
function showSubBook(typeId){
	$("#sub_book_div").modal("show");
	var FetchLadingBillStatusID=typeId
	$("#FetchLadingBillStatusID").val(FetchLadingBillStatusID)
}

//批量交单
function sub_book(){
	var FetchLadingBillStatusID=$("#FetchLadingBillStatusID").val();
	
	var Remark=$("#sub_mark").val();
	if($.trim(Remark)==""||$.trim(Remark)==null){
		alert("备注不能为空");
		return false;
	}
	var ReceiveTime=$("#ReceiveTime").val();
	var LadingbillID_array = new Array();
	$("input[name='checkOne_noauth']:checked").each(function(){
		 //由于复选框一般选中的是多个,所以可以循环输出 
		LadingbillID_array.push($(this).val()); 
		}); 
	var param={}
	param={"LadingbillID_array":LadingbillID_array,"FetchLadingBillStatusID":FetchLadingBillStatusID,
			"Remark":Remark,"ReceiveTime":ReceiveTime};
	var path=$.getContextPath()+"/orderfinance/updateStatusID";
	callAPI(path,param,sub_book_callback)
}
function sub_book_callback(data){
	alert(data);
	$("#sub_book_div").modal("hide");
	$("#sub_mark").val("");
	$("#findList").click();
}
//展示修改快递号弹出层
function showkd_div(orderid){
	$("#orderidHide").val(orderid);
	setTimeout(function(){
		findkdNo();
	},100)
	findKdList();
	$("#updatekd_div").modal("show");
	
	
}
//查询快递公司列表
function findKdList(){
	var path=$.getContextPath()+"/orderfinance/findkdCompany";
	callAjax(path,null,findKdList_callback);
}
function findKdList_callback(data){
	var result = JSON.parse(data);
	var list=result.list;
	$("#kd_listTd").empty();
	$("#kd_listFp").empty();
	if(list!=null&&list!=""){
		var html="";
		for(var i=0;i<list.length;i++){
			var id=list[i]['BaseTypeID'];
			var typeName=list[i]['TypeName'];
			html+="<option value ='"+id+"'>"+typeName+"</option>";
		}
		$("#kd_listTd").append(html);
		$("#kd_listFp").append(html);
	}
}
//查询快递单号和快递公司
function findkdNo(){
	var OrderID=$("#orderidHide").val();
	var param={
			"OrderID":OrderID
	}
	var path=$.getContextPath()+"/orderfinance/findkdNoByOrderid";
	callAjax(path,param,findkdNo_callback);
}
function findkdNo_callback(data){
	var result = JSON.parse(data);
	var list=result.list;
	var listAddress=result.listAddress
	if(list!=null&&list!=""){
		for(var i=0;i<list.length;i++){
			var TrackingNo=list[i]['TrackingNo'];
			var ExpressID=list[i]['ExpressID'];
			var TypeID=list[i]['TypeID'];
			if(TypeID=="1505131029000002"){		//提单
				$("#LadingbillNoHead_updateTd").val(TrackingNo);
				
				
				
				
				
				$("#kd_listTd option[value='"+ExpressID+"']").attr("selected", true);
				//$("#kd_listTd").val(TypeID);
			}else if(TypeID=="1505131029210003"){	//发票
				$("#LadingbillNoHead_updateFp").val(TrackingNo);
				$("#kd_listFp option[value='"+ExpressID+"']").attr("selected", true);
				//$("#kd_listFp").val(TypeID);
			}
		}
	}
	
	
	
	if(listAddress!=null&&listAddress!=""){
		for(var i=0;i<listAddress.length;i++){
			var CompanyName=listAddress[i]['CompanyName'];
			var TypeID=listAddress[i]['TypeID'];
			var Address=listAddress[i]['Address'];
			var Contactor=listAddress[i]['Contactor'];
			var Mobile=listAddress[i]['Mobile'];
			var Tel=listAddress[i]['Tel'];
			
			

			if(TypeID=="1505131029000002"){		//提单
				$("#CompanyNameTd").val(CompanyName);
				$("#AddressTd").val(Address);
				$("#ContactorTd").val(Contactor);
				$("#MobileTd").val(Mobile);
				$("#TelTd").val(Tel);
			}else if(TypeID=="1505131029210003"){	//发票
				$("#CompanyNameFp").val(CompanyName);
				$("#AddressFp").val(Address);
				$("#ContactorFp").val(Contactor);
				$("#MobileFp").val(Mobile);
				$("#TelFp").val(Tel);
			}
		}
	}
	
}


//保存快递号，快递公司
function saveKdNO(type){
	var TrackingNo=""
	var ExpressID=""
	var TypeID=""
	var OrderID=$("#orderidHide").val();
	if(type=="1505131029000002"){		//提单
		 TrackingNo=$("#LadingbillNoHead_updateTd").val();
		 ExpressID=$("#kd_listTd").val();
		 TypeID=type;
	}else if(type=="1505131029210003"){		//发票
		TrackingNo=$("#LadingbillNoHead_updateFp").val();
		ExpressID=$("#kd_listFp").val();
		TypeID=type;
	}
	var param={
			"OrderID":OrderID,
			"TrackingNo":TrackingNo,
			"ExpressID":ExpressID,
			"TypeID":TypeID
	}
	var path=$.getContextPath()+"/orderfinance/addkdNo";
	callAjax(path,param,saveKdNO_callback);
}
function saveKdNO_callback(data){
	var res = JSON.parse(data);
	var result=res.result;
	if(result!=null&&result!=""){
		if(result=="1"){
			alert("保存成功")
		} else{
			alert("保存失败")
		}
	}
}

//连接快递单页
function chainTd(url){
	var OrderID=$("#orderidHide").val();
	window.open (url+OrderID, "newwindow", "height=100, width=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no") 
}
//关闭快递弹出层
function closeKd_div(){
	$("#updatekd_div").modal("hide");
	$("#orderidHide").val("");
	 $("#LadingbillNoHead_updateTd").val("");
	 $("#kd_listTd").val("");
	 $("#LadingbillNoHead_updateFp").val("");
	 
	 
	 $("#CompanyNameTd").val("");
		$("#AddressTd").val("");
		$("#CompanyNameFp").val("");
		$("#AddressFp").val("");
}