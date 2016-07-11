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
		 dataType:"json",
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



//根据货物ID查询货物主表详细信息
function showAddInfo(OrderContainerCargoID){
	var path=$.getContextPath() + "/orderdetail/modal_manifestcargodetail";
	var param={};
	param={"OrderContainerCargoID":OrderContainerCargoID};
	callAPI(path,param,showAddInfo_callback);
	
	$("#manifestCargoDetail").modal("show");
}
function showAddInfo_callback(data){
	var list=JSON.parse(data);
	if(list!=""&&list!=null){
		var result=list.result
		var TypeName=result.TypeName
		var CargoNameEN=result.CargoNameEN;
		var CargoNameCN=result.CargoNameCN;
		var CargoCategoryID=result.CargoCategoryID;
		var OrderContainerCargoID=result.OrderContainerCargoID;
		var orderid=result.orderid;
		$("#CargoCategoryID").val(CargoCategoryID);		//货物类型
		$("#OrderContainerCargoID").val(OrderContainerCargoID);		//货物类型
		$("#orderid").val(orderid);
		$("#add_TypeName").text(TypeName);
		$("#add_CargoNameEN").text(CargoNameEN);
		$("#add_CargoNameCN").text(CargoNameCN);
		if(TypeName=="冷(藏/冻)货"){
			$("#cold").show();
			$("#danager").hide();
			$("#teshu").hide();
		}
		else if(TypeName=="冷藏危险品"){
			$("#cold").show();
			$("#danager").show();
			$("#teshu").hide();
		}
		else if(TypeName=="危险品"){
			$("#danager").show();
			$("#cold").hide();
			$("#teshu").hide();
		}
		else if(TypeName=="特种箱货"){
			$("#teshu").show();
			$("#danager").hide();
			$("#cold").hide();
				
		}
		//查询详细信息
		findManifestInfo();
	}
}
//关闭弹出层
function close_div(){
	$(".text").val("");
	$("#option1Css").attr("class","btn btn-primary");
	$("#option2Css").attr("class","btn btn-primary");
	$("#manifestCargoDetail").modal("hide");
	$("#teshu").hide();
	$("#danager").hide();
	$("#cold").hide();
}

//提交详细信息
function subInfo(){
	var path=$.getContextPath() +"/OrderManifestinfoController/addManifestInfo"
	var param={};
	var OrderContainerCargoID=$("#OrderContainerCargoID").val(); //货物ID
	var CargoCategoryID=$("#CargoCategoryID").val();		//货物类型
	var orderid=$("#orderid").val();
	//特殊箱子信息
	var SetLength=$("#SetLength").val()
	var Width=$("#Width").val()
	var Height=$("#Height").val()
	var LeftOverLength=$("#LeftOverLength").val()
	var RightOverLength=$("#RightOverLength").val()
	var FrontOverLength=$("#FrontOverLength").val()
	var BackOverLength=$("#BackOverLength").val()
	var OverHeight=$("#OverHeight").val()
	if(CargoCategoryID=="109105"||CargoCategoryID=="109104"){
		//冷货箱子信息
		var val=$('input[name="options"]:checked').val();
		var TemperatureType="摄氏度C";							//温度单位
		/*
		if(val==1){
			TemperatureType="摄氏度C";
		}else if(val==2){
			TemperatureType="华氏度H";
		}else{
			alert("请选择温度单位");
			return false;
		}
		*/
	}
	
	var MinTemperature=$("#MinTemperature").val();
	var MaxTemperature=$("#MaxTemperature").val();
	var SetTemperature=$("#SetTemperature").val();	//设置温度
	var VentilateType=$("#VentilateType").val();	//通风单位
	var Ventilate=$("#Ventilate").val();			//通风小数点后四位 0~1
	var Humidity=$("#Humidity").val();				//湿度0~1小数点后三位
	//危险箱子
	var UNNoID=$("#UNNoID").val();					//国际编码4位
	var ClassNoID=$("#ClassNoID").val();			//1~9一位小数
	var DangerProperty=$("#DangerProperty").val();	//危险品属性
	var PageNo=$("#PageNo").val();					//页号
	var FlashPoint=$("#FlashPoint").val();			//闪点
	var EMSNo=$("#EMSNo").val();					//应急措施号
	var MedicalAID=$("#MedicalAID").val();			//医疗急救指南号
	var IsPollution=$("#IsPollution").val();		//是否海洋污染
	var Label1=$("#Label1").val();
	var Label2=$("#Label2").val();
	
	 if(CargoCategoryID=="109103"||CargoCategoryID=="109105"){
		 if(UNNoID==""||UNNoID==null){
			 alert("UN.NO不能为空");
			 return;
		 } if(ClassNoID==""||ClassNoID==null){
			 alert("CLASS.NO不能为空");
			 return;
		 }
		}
	
	param={
			//箱子类型ID
			"CargoCategoryID":CargoCategoryID,
			//货物ID
			"OrderContainerCargoID":OrderContainerCargoID,
			"orderid":orderid,
			//特殊箱子
			"SetLength":SetLength,
			"Width":Width,
			"Height":Height,
			"LeftOverLength":LeftOverLength,
			"RightOverLength":RightOverLength,
			"FrontOverLength":FrontOverLength,
			"BackOverLength":BackOverLength,
			"OverHeight":OverHeight,
			//冷货箱子
			"TemperatureType":TemperatureType,
			"MinTemperature":MinTemperature,
			"MaxTemperature":MaxTemperature,
			"SetTemperature":SetTemperature,
			"VentilateType":VentilateType,
			"Ventilate":Ventilate,
			"Humidity":Humidity,
			//危险箱子
			"UNNo":UNNoID,
			"ClassNo":ClassNoID,
			"DangerProperty":DangerProperty,
			"PageNo":PageNo,
			"FlashPoint":FlashPoint,
			"EMSNo":EMSNo,
			"MedicalAID":MedicalAID,
			"IsPollution":IsPollution,
			"Label1":Label1,
			"Label2":Label2
	}
	callAPI(path,param,subInfo_callback);
}
function subInfo_callback(data){
	var list=JSON.parse(data);
	if(list!=""&&list!=null){
		var count=list.count
		if(count==1){
			alert("提交成功");
			close_div();
			var orderid=$("#orderid").val();
			findList(orderid);
		}else{
			alert("提交失败");
		}
	}
}
//查询已经录入的货物的详细信息
function findManifestInfo(){
	var OrderContainerCargoID=$("#OrderContainerCargoID").val();
	var CargoCategoryID=$("#CargoCategoryID").val();		//货物类型
	var path=$.getContextPath() +"/OrderManifestinfoController/findManifestInfo";
	var param={
			"CargoCategoryID":CargoCategoryID,
			"OrderContainerCargoID":OrderContainerCargoID
	}
	callAPI(path,param,findManifestInfo_callback)
}
function findManifestInfo_callback(data){
	var list=JSON.parse(data);
	if(list!=""&&list!=null){
		var findInfo=list.findInfo;
		var findInfo2=list.findInfo2;	//危险冷货装的危险货表的信息
		var CargoCategoryID=list.CargoCategoryID;
		if(CargoCategoryID=="109106"){		//特殊货
			var SetLength=findInfo.SetLength
			var Width=findInfo.Width
			var Height=findInfo.Height
			var LeftOverLength=findInfo.LeftOverLength
			var RightOverLength=findInfo.RightOverLength
			var FrontOverLength=findInfo.FrontOverLength
			var BackOverLength=findInfo.BackOverLength
			var OverHeight=findInfo.OverHeight
			$("#SetLength").val(SetLength)
			$("#Width").val(Width)
			$("#Height").val(Height)
			$("#LeftOverLength").val(LeftOverLength)
			$("#RightOverLength").val(RightOverLength)
			$("#FrontOverLength").val(FrontOverLength)
			$("#BackOverLength").val(BackOverLength)
			$("#OverHeight").val(OverHeight)
		}
		if(CargoCategoryID=="109104"){		//冷货
			var TemperatureType=findInfo.TemperatureType;
			var MinTemperature=findInfo.MinTemperature;
			var MaxTemperature=findInfo.MaxTemperature;
			var SetTemperature=findInfo.SetTemperature;
			var VentilateType=findInfo.VentilateType;
			var Ventilate=findInfo.Ventilate;
			var Humidity=findInfo.Humidity;
			if(TemperatureType=="摄氏度C"){
				$("#option1Css").attr("class","btn btn-primary active");
				$("#option1").attr("checked","true");
			}else if(TemperatureType=="华氏度H"){
				$("#option2Css").attr("class","btn btn-primary active");
				$("#option2").attr("checked","checked");
			}
			$("#MinTemperature").val(MinTemperature);
			$("#MaxTemperature").val(MaxTemperature);
			$("#SetTemperature").val(SetTemperature);
			$("#VentilateType").val(VentilateType);
			$("#Ventilate").val(Ventilate);
			$("#Humidity").val(Humidity);
		}
		if(CargoCategoryID=="109103"){		//危险货
			var UNNoID=findInfo.UNNo;
			var ClassNoID=findInfo.ClassNo;
			var DangerProperty=findInfo.DangerProperty;
			var PageNo=findInfo.PageNo;
			var FlashPoint=findInfo.FlashPoint;
			var EMSNo=findInfo.EMSNo;
			var MedicalAID=findInfo.MedicalAID;
			var IsPollution=findInfo.IsPollution;
			var Label1=findInfo.Label1;
			var Label2=findInfo.Label2;
			
			$("#UNNoID").val(UNNoID);
			$("#ClassNoID").val(ClassNoID);
			$("#DangerProperty").val(DangerProperty);
			$("#PageNo").val(PageNo);
			$("#FlashPoint").val(FlashPoint);
			$("#EMSNo").val(EMSNo);
			$("#MedicalAID").val(MedicalAID);
			$("#IsPollution").val(IsPollution);
			$("#Label1").val(Label1);
			$("#Label2").val(Label2);
		}
		if(CargoCategoryID=="109105"){		//冷藏危险货
			//冷货表
			var TemperatureType=findInfo.TemperatureType;
			var MinTemperature=findInfo.MinTemperature;
			var MaxTemperature=findInfo.MaxTemperature;
			var SetTemperature=findInfo.SetTemperature;
			var VentilateType=findInfo.VentilateType;
			var Ventilate=findInfo.Ventilate;
			var Humidity=findInfo.Humidity;
			if(TemperatureType=="摄氏度C"){
				$("#option1Css").attr("class","btn btn-primary active");
				$("#option1").attr("checked","true");
			}else if(TemperatureType=="华氏度H"){
				$("#option2Css").attr("class","btn btn-primary active");
				$("#option2").attr("checked","checked");
			}
			$("#MinTemperature").val(MinTemperature);
			$("#MaxTemperature").val(MaxTemperature);
			$("#SetTemperature").val(SetTemperature);
			$("#VentilateType").val(VentilateType);
			$("#Ventilate").val(Ventilate);
			$("#Humidity").val(Humidity);
			//危险货表
			var UNNoID=findInfo2.UNNo;
			var ClassNoID=findInfo2.ClassNo;
			var DangerProperty=findInfo2.DangerProperty;
			var PageNo=findInfo2.PageNo;
			var FlashPoint=findInfo2.FlashPoint;
			var EMSNo=findInfo2.EMSNo;
			var MedicalAID=findInfo2.MedicalAID;
			var IsPollution=findInfo2.IsPollution;
			var Label1=findInfo2.Label1;
			var Label2=findInfo2.Label2;
			
			$("#UNNoID").val(UNNoID);
			$("#ClassNoID").val(ClassNoID);
			$("#DangerProperty").val(DangerProperty);
			$("#PageNo").val(PageNo);
			$("#FlashPoint").val(FlashPoint);
			$("#EMSNo").val(EMSNo);
			$("#MedicalAID").val(MedicalAID);
			$("#IsPollution").val(IsPollution);
			$("#Label1").val(Label1);
			$("#Label2").val(Label2);
		}

	}
}
function isTemperature(obj) {
    var patten1 = /^\-?[0-9]+(.[0-9]{1,3})?$/;
    //    var patten1 = /^\-?(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;

    if (!patten1.test(obj.value)) {
        obj.value = "";
    }

}
function isHumidity(obj) {
    var patten1 = /^[0-9]+(.[0-9]{1,3})?$/;


    if (!patten1.test(obj.value)) {
        obj.value = "";
    }

}
function findList(orderid) {
	$.ajax({
		url : "./orderdetail/manifestinfo/" + orderid,
		async : false,
		success : function(data) {
			$("#dropdown1").html(data);
		}
	});
}
function findOrderManifestSum(){
	var OrderId=$("#orderid").text();
	var param={};
	param={
			"OrderID":OrderId
	}
	var path=$.getContextPath() +"/OrderManifestinfoController/findOrderManifestSum"
	callAPI(path,param,findOrderManifestSum_callback)
}
function findOrderManifestSum_callback(data){
	$(".tr_list").remove();
	var sum=JSON.parse(data);
	if(sum!=""&&sum!=null){
		var list=sum.list
		var html="";
		var count_Number=0;
		var count_Weight=0;
		var count_Volume=0;
		for(var i=0;i<list.length;i++){
			var ManifestNo=list[i]['ManifestNo'];	//仓单号
			var ContainerAmount=list[i]['ContainerAmount'];	//箱型箱量
			if(ContainerAmount!=null&&ContainerAmount!=""){
				ContainerAmount=ContainerAmount.replace(/<br>/g,"&nbsp");
			}
			
			var CargoNameEN=list[i]['CargoNameEN'];	//英文品名
			if(list[i]['CargoNameCN']!=""&&list[i]['CargoNameCN']!=null){
				var CargoNameCN=list[i]['CargoNameCN'];	//中文品名
			}else{
				var CargoNameCN="";
			}
			
			
			
			var Number=list[i]['Number'];	//件数
			var Weight=list[i]['Weight'];	//重量
			var Volume=list[i]['Volume'];	//体积
			count_Number+=Number;
			count_Weight+=Weight;
			count_Volume+=Volume;
			html+="<p class='tr_list'>";
			html+="<span>舱单号:</span>"+ManifestNo+"<span>箱型箱量:</span>"+ContainerAmount+"<span>英文品名:</span>"+CargoNameEN+"<span>中文品名:</span>"+CargoNameCN+"<span>件数:</span>"+
			Number+"<span>重量:</span>"+Weight+"<span>体积:</span>"+Volume;
			html+="<br>";
		}
		html+="<p class='tr_list'><span>总计:</span>"+"<span>件数:</span>"+count_Number+"<span>重量:</span>"+count_Weight+"<span>体积:</span>"+count_Volume+"<br>";
		$("#sum_list").append(html);
	}
}
$(function(){   
	findOrderManifestSum()
	
	findUploadCdList()
})
	//上传舱单表
	function fileUploadCd() {
		var val = $("#fileToUploadcd").val();
		if (val == null || val == "") {
			alert("请选择上传文件");
			return;
		}
		var OrderId = $("#orderid").text();

		$.ajaxFileUpload({

			url : $.getContextPath()
					+ "/orderdetail/uploadCdFile",//处理图片脚本
			secureuri : false,
			
			fileElementId : "fileToUploadcd",//file控件id
			data : {
				"OrderId" : OrderId
			},
			dataType:'JSON',
			success : function(data) {
				var list=JSON.parse(data)
	        	alert(list.result)
				findUploadCdList();
			},
			error : function(data, status, e) {
				alert(e);
			}
		});
	}
function findUploadCdList(){
	var OrderId = $("#orderid").text();
	var path=$.getContextPath() +"/orderdetail/upmaniFestInfo"
	var param={
		"OrderId":OrderId
	}
	callAjax(path,param,findUploadCdList_callback)
}
function findUploadCdList_callback(data){
	var result=JSON.parse(data)
	if(result.list!=""&&result.list!=null){
		$(".tr_cd").remove();
		var list=result.list;
		var html="";
		for(var i=0;i<list.length;i++){
			var CreateTime=list[i]['CreateTime'];
			var StaffName=list[i]['StaffName'];
			var FileName=list[i]['FileName'];
			var SubTradeId=list[i]['SubTradeId'];
			html+="<tr class='tr_cd'>";
			html+="<td>"+CreateTime+"</td>";
			html+="<td>"+StaffName+"</td>";
			html+="<td><a href='/OrderLbfileInfoController/downloadLbFile/"+SubTradeId+"'>"+FileName+"</a></td>";
			html+="</tr>";
		}
		$("#up_cd").after(html);
	}
}