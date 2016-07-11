/**
 * 用户岗位管理
 */
//分配用户岗位
function useJob(){
	
	var path=$.getContextPath() + "/complex/findUseJob";
	callAjax(path, null, useJob_callback)
}
function useJob_callback(data){
	var result=JSON.parse(data);
	if(result.list!=null && result.list!=""){
		
		var list=result.list;
		var html="";
		for(var i=0;i<list.length;i++){
			
			html+="<option value='"+list[i]['BaseTypeID']+"'>"+list[i]['TypeName']+"</option>"
		}
		$("#use_Gw").append(html);
		$("#add_user").modal("show");
	}
}
//提交用户岗位
function sub_useJob(){
	var Staffid=$("#use_No").val();
	var RoleId =$("#use_Gw").val();
	var Eff_date=$("#Eff_date_select").val();
	var Exp_date=$("#Exp_date_select").val();
	var param={
			"Staffid":Staffid,
			"RoleId":RoleId,
			"Eff_date":Eff_date,
			"Exp_date":Exp_date
	}
	var path=$.getContextPath() + "/complex/addUseJob";
	callAjax(path, param, sub_useJob_callback)
}
function sub_useJob_callback(data){
	var list=JSON.parse(data);
	if(list.result!=null&&list.result!=""){
		var result=list.result;
		if(result=="2"){
			alert("该用户已有此岗位");
		}else if(result=="1"){
			alert("添加成功");
			$("#add_user").modal("hide");
		}else{
			alert("添加失败");
		}
	}
}
//删除员工岗位
function delJob(id){
	var param={"id":id}
	var path=$.getContextPath() + "/complex/delUseJob";
	callAjax(path, param, delJob_callback)
}
function delJob_callback(data){
	var list=JSON.parse(data);
	if(list.result!=null&&list.result!=""){
		if(list.result=="1"){
			alert("删除成功");
		}else{
			alert("删除失败");
		}
	}
}


//显示添加员工关系
function show_addRelation(){
	$("#add_relation").modal("show");
}
//查询请假员工的岗位
function findQjUseJob(StaffidB){
	var param={
			"StaffidB":StaffidB
	}
	var path=$.getContextPath() + "/complex/findQjUseJob";
	callAjax(path, param, findQjUseJob_callback)
}
function findQjUseJob_callback(data){
	$("#useB_Gw").empty();
	var result=JSON.parse(data);
	var list=result.list;
	if(list!=null&&list!=""){
		var html="";
		for(var i=0;i<list.length;i++){
			html+="<option value='"+list[i]['RoleId']+"'>"+list[i]['TypeName']+"</option>"
		}
		$("#useB_Gw").append(html);
	}
	
}
//添加员工关系
function sub_useRelation(){
	var StaffidB=$("#StaffidB_select").val();
	var StaffidB_Roleid=$("#useB_Gw").val();
	var Eff_date=$("#Eff_date_select").val();
	var Exp_date=$("#Exp_date_select").val();
	var StaffidA=$("#StaffidA").val();
	var param={
			"StaffidB":StaffidB,
			"StaffidB_Roleid":StaffidB_Roleid,
			"Eff_date":Eff_date,
			"Exp_date":Exp_date,
			"StaffidA":StaffidA
	}
	var path=$.getContextPath() + "/complex/addQjUseJob";
	callAjax(path, param, sub_useRelation_callback)
}
function sub_useRelation_callback(data){
	var list=JSON.parse(data);
	var result=list.result
	if(result!=null&&result!=""){
		if(result=="3"){
			alert("已经有员工给该请假员工代工了");
		}else if(result=="2"){
			alert("代工员工的日期不在请假员工的有效期之内")
		}else if(result=="1"){
			alert("添加成功")
			$("#add_relation").modal("hide");
			$("#findList").click();
		}else{
			alert("添加失败")
		}
	}
}
//删除员工关系
function delrelation(RelationID){
	if(confirm("确认要删除?")==false){
		return false;
	}
	var param={
			"RelationID":RelationID
	}
	var path=$.getContextPath() + "/complex/delRelation";
	callAjax(path, param, delrelation_callback)
}
function delrelation_callback(data){
	var list=JSON.parse(data);
	var result=list.result
	if(result!=""&&result!=null){
		if(result=="1"){
			alert("删除成功")
			$("#findList").click();
		}else{
			alert("删除失败")
		}
		
	}
}
//展示添加div
function show_addshipDock(){
	$("#add_shipdock").modal("show");
}
//添加船名和集港码头
function sub_shipDock(){
	var Vessel=$("#Vessel_select").val();
	var Vesselcn=$("#Vesselcn_select").val();
	var Dock=$("#Dock_select").val();
	var param={
			"Vessel":Vessel,
			"Vesselcn":Vesselcn,
			"Dock":Dock
	}
	var path=$.getContextPath() + "/complex/addShipDock";
	callAjax(path, param,sub_shipDock_callback);
}
function sub_shipDock_callback(data){
	var list=JSON.parse(data);
	var result=list.result
	if(result!=""&&result!=null){
		if(result=="1"){
			alert("添加成功")
			$("#add_shipdock").modal("hide");
			$("#findList").click();
		}else{
			alert("添加失败")
		}
		
	}
}
//删除船名和对应的集港码头
function delshipdock(VesselID){
	if(confirm("确认要删除?")==false){
		return false;
	}
	var param={"VesselID":VesselID}
	var path=$.getContextPath() + "/complex/delShipDock";
	callAjax(path, param,delshipdock_callback);
}
function delshipdock_callback(data){
	var list=JSON.parse(data);
	var result=list.result
	if(result!=""&&result!=null){
		if(result=="1"){
			alert("删除成功")
			$("#findList").click();
		}else{
			alert("删除失败")
		}
		
	}
}
//显示添加销售对应的公司
function show_addSale(){
	$("#add_saleCom").modal("show");
}
//提交销售和公司对应关系
function sub_saleCom(){
	var SalesID=$("#staffid").val();
	var CompanyID=$("#companyid").val();
	var param={
			"SalesID":SalesID,
			"CompanyID":CompanyID
	} 
	var path=$.getContextPath() + "/complex/addSaleCom";
	callAjax(path, param,sub_saleCom_callback);
}
function sub_saleCom_callback(data){
	var list=JSON.parse(data);
	var result=list.result;
	if(result=='1'){
		alert("添加成功")
		$("#add_saleCom").modal("hide");
		$("#findList").click();
	}else{
		alert("添加失败")
	}
}
//删除销售和公司对应的关系
function delSaleCom(CompanySalesID){
	if(confirm("确认要删除?")==false){
		return false;
	}
	var param={
			"CompanySalesID":CompanySalesID
	}
	var path=$.getContextPath() + "/complex/delsalcom";
	callAjax(path, param,delSaleCom_callback);
}
function delSaleCom_callback(data){
	var list=JSON.parse(data);
	var result=list.result;
	if(result=='1'){
		alert("删除成功")
		$("#findList").click();
	}else{
		alert("删除失败")
	}
}