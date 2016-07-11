$(document).ready(function(){
	//查询服务列表
	findServiceList();
		//查询已选服务
	findCheckService();
	
	//查看常用服务
	findCyServiceType()
	
});



/**
 * 查询服务列表
 */
function findServiceList(){
	var path=$.getContextPath() +"/orderservicelistcontroller/findServiceList"
	callAjax(path,null,findServiceList_callback)
}
function findServiceList_callback(data){
	var list=JSON.parse(data);
	if(list!=""&&list!=null){
		var cyservice=list.cyservice;
		var qtservice=list.qtservice;
		var cyhtml="";
		var qthtml="";
		
		for(var i=0;i<cyservice.length;i++){
			cyhtml+="<p><input type='checkbox' name='checkService' value='"+cyservice[i]['BaseTypeID']+"' id='"+cyservice[i]['BaseTypeID']+"'/>";
			cyhtml+="<label>"+cyservice[i]['TypeName']+"</label></p>";
		}
		$("#cyservice").after(cyhtml);
		
		for(var i=0;i<qtservice.length;i++){
			if(qtservice[i]['TypeName']=="其他"){
				
			}else{
			qthtml+="<p><input type='checkbox' name='checkService' value='"+qtservice[i]['BaseTypeID']+"' id='"+qtservice[i]['BaseTypeID']+"' />";
			qthtml+="<label>"+qtservice[i]['TypeName']+"</label></p>";
			}
		}
		$("#qtservice").after(qthtml);
	}
}
//查询已经选择的服务

function findCheckService(){
	var OrderId=$("#orderid").text();
	var param={
			"OrderId":OrderId
	}
	var path=$.getContextPath()+"/orderservicelistcontroller/findCheckService";
	callAjax(path,param,findCheckService_callback)
}
function findCheckService_callback(data){
	var list=JSON.parse(data);
	if(list!=""&&list!=null){
		var result=list.result
		if(result!=""&&result!=null){
		for(var i=0;i<result.length;i++){
			var ServiceID=result[i]['ServiceID'];
			$("#"+ServiceID+"").attr("checked",true);
		}
		}
	}
}
//保存常用服务
function addCyService(){
	var OrderId=$("#orderid").text();
	var CustomsClearance=$("#service_CustomsClearance").val();			//报关
	var CustomsInspection=$("#service_CustomsInspection").val();			//报检
	var StorageInspection=$("#service_StorageInspection").val();			//检装
	var Suffocating=$("#service_Suffocating").val();					//熏蒸
	var Reinforcement=$("#service_Reinforcement").val();					//加固
	var Photograph=$("#service_Photograph").val();						//是否拍照
	var Shrinkwrap=$("#service_Shrinkwrap").val();						//是否打托缠膜
	var Unloadingcharges=$("#service_Unloadingcharges").val();			//代垫卸车费
	
	var path=$.getContextPath()+"/orderservicelistcontroller/addCyService";
	var param={
			"OrderId":OrderId,
			"CustomsClearance":CustomsClearance,
			"CustomsInspection":CustomsInspection,
			"StorageInspection":StorageInspection,
			"Suffocating":Suffocating,
			"Reinforcement":Reinforcement,
			"Photograph":Photograph,
			"Shrinkwrap":Shrinkwrap,
			"Unloadingcharges":Unloadingcharges
	}
	callAjax(path,param,addCyService_callback)
}
function addCyService_callback(data){
	var list=JSON.parse(data);
	if(list!=""&&list!=null){
	var count=list.count
	if(count>0){
		alert("保存成功");
	}else{
		alert("保存失败");
	}
	}
}


//选择服务
function addService(){
	if (!confirm("确认保存已选服务吗？")) {
		return false;
	}
	var ServiceID = new Array();
	var OrderId=$("#orderid").text();
	$("input[name='checkService']:checked").each(function(){
		ServiceID.push($(this).val());
	}); 

	
	
	
	
	
	var path=$.getContextPath()+"/orderservicelistcontroller/addServicecheck";
	var param={
			
			
			"ServiceID":ServiceID,
			"OrderId":OrderId
	}
	callAjax(path,param,addService_callback)
}
function addService_callback(data){
	var list=JSON.parse(data);
	if(list!=""&&list!=null){
	var count=list.count
	if(count>0){
		alert("保存成功");
	}else{
		alert("保存失败");
	}
	}
}

//查询常用服务是否使用
function findCyServiceType(){
	var OrderID=$("#orderid").text();
	var path=$.getContextPath()+"/orderservicelistcontroller/findCyServiceType";
	var param={"OrderID":OrderID};
	callAjax(path,param,findCyServiceType_callback)
}
function findCyServiceType_callback(data){
	var list=JSON.parse(data);
	var result=list.result;
	if(result!=null&&result!=""){
		var CustomsClearance=result.CustomsClearance				//报关
		var CustomsInspection=result.CustomsInspection				//报检
		var StorageInspection=result.StorageInspection				//检装
		var Suffocating=result.Suffocating						//熏蒸
		var Reinforcement=result.Reinforcement					//加固
		var Photograph=result.Photograph						//是否拍照
		var Shrinkwrap=result.Shrinkwrap						//是否打托缠膜
		var Unloadingcharges=result.Unloadingcharges				//代垫卸车费
		if(CustomsClearance=="1"){
			$("#service_CustomsClearance").val("1")				
		}else{
			$("#service_CustomsClearance").val("0")
		}
		if(CustomsInspection=="1"){
			$("#service_CustomsInspection").val("1")				
		}else{
			$("#service_CustomsInspection").val("0")
		}
		if(StorageInspection=="1"){
			$("#service_StorageInspection").val("1")				
		}else{
			$("#service_StorageInspection").val("0")
		}
		if(Suffocating=="1"){
			$("#service_Suffocating").val("1")				
		}else{
			$("#service_Suffocating").val("0")
		}
		if(Reinforcement=="1"){
			$("#service_Reinforcement").val("1")				
		}else{
			$("#service_Reinforcement").val("0")
		}
		if(Photograph=="1"){
			$("#service_Photograph").val("1")				
		}else{
			$("#service_Photograph").val("0")
		}
		if(Shrinkwrap=="1"){
			$("#service_Shrinkwrap").val("1")				
		}else{
			$("#service_Shrinkwrap").val("0")
		}
		if(Unloadingcharges=="1"){
			$("#service_Unloadingcharges").val("1")				
		}else{
			$("#service_Unloadingcharges").val("0")
		}
		
	}
}
