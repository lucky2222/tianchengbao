/**
 * 应收应付
 */
$(document).ready(function() {
	findInvoiceType();
})
//查询发票类型、种类
function findInvoiceType(){
	var path=$.getContextPath() + "/complex/findInvoiceList";
	callAjax(path, null, findInvoiceType_callback)
}
function findInvoiceType_callback(data){
	var result=JSON.parse(data);
	var InvoiceType=result.InvoiceType;
	var InvoiceCategory=result.InvoiceCategory;
	$("#InvoiceTypeID").empty();
	$("#InvoiceTypeID_select").empty();
	$("#InvoiceCategoryID").empty();
	$("#InvoiceCategoryID_select").empty();
	if(InvoiceType!=null&&InvoiceType!=""){
		var html="<option value =''>全部</option>";
		var html1="";
		for(var i=0;i<InvoiceType.length;i++){
		html+="<option value ='"+InvoiceType[i]['BaseTypeID']+"'>"+InvoiceType[i]['TypeName']+"</option>";
		html1+="<option value ='"+InvoiceType[i]['BaseTypeID']+"'>"+InvoiceType[i]['TypeName']+"</option>";
		}
		$("#InvoiceTypeID").append(html);
		$("#InvoiceTypeID_select").append(html1);
	}
	if(InvoiceCategory!=null&&InvoiceCategory!=""){
		var html="<option value =''>全部</option>";
		var html1="";
		for(var i=0;i<InvoiceCategory.length;i++){
			html+="<option value ='"+InvoiceCategory[i]['BaseTypeID']+"'>"+InvoiceCategory[i]['TypeName']+"</option>";
			html1+="<option value ='"+InvoiceCategory[i]['BaseTypeID']+"'>"+InvoiceCategory[i]['TypeName']+"</option>";
		}
		$("#InvoiceCategoryID").append(html);
		$("#InvoiceCategoryID_select").append(html1);
	}
}
//展示添加发票抬头的弹出层
function show_addInvoice(){
	findInvoiceType();
	$("#invoice_div").modal("show");
	
}
function addInvoice(){
	var CompanyID=$.trim($("#CompanyId_select").val());
	var InvoiceTypeID=$.trim($("#InvoiceTypeID_select").val());
	var InvoiceCategoryID=$.trim($("#InvoiceCategoryID_select").val());
	var InvoiceName=$.trim($("#InvoiceName_select").val());
	if(CompanyID==""||CompanyID==null){
		alert("请选择公司名称");
		return;
	}else if(InvoiceName==""||InvoiceName==null){
		alert("请输入发票抬头");
		return;
	}
	var param={
			"CompanyID":CompanyID,
			"InvoiceTypeID":InvoiceTypeID,
			"InvoiceCategoryID":InvoiceCategoryID,
			"InvoiceName":InvoiceName
	}
	
	var path=$.getContextPath() + "/complex/addInvoice";
	callAjax(path, param, addInvoice_callback)
}
function addInvoice_callback(data){
	var list=JSON.parse(data);
	if(list.result!=null&&list.result!=""){
		if(list.result=="1"){
			alert("添加成功");
			$("#invoice_div").modal("hide");
			$("#findList").click();
		}else{
			alert("添加失败");
		}
	}
}

//展示添加付费单位弹出层
function show_addPay(){
	$("#payDw_div").modal("show");
	
}


//添加付费单位
function addPayDw(){
	var CompanyID=$.trim($("#CompanyId_select").val());
	var AccountName=$.trim($("#AccountName_select").val());
	var AssistCode=$.trim($("#AssistCode_select").val());
	var IsDefault=$.trim($("#IsDefault_select").val());
	if(CompanyID==""||CompanyID==null){
		alert("请选择公司名称");
		return;
	}else if(AccountName==""||AccountName==null){
		alert("请输入付费单位");
		return;
	}
	var param={
			"CompanyID":CompanyID,
			"AccountName":AccountName,
			"AssistCode":AssistCode,
			"IsDefault":IsDefault
	}
	
	var path=$.getContextPath() + "/complex/addPayDw";
	callAjax(path, param, addPayDw_callback)
}
function addPayDw_callback(data){
	var list=JSON.parse(data);
	if(list.result!=null&&list.result!=""){
		if(list.result=="1"){
			alert("添加成功");
			$("#payDw_div").modal("hide");
			$("#findList").click();
		}else{
			alert("添加失败");
		}
	}
}
//查询公司分类
function findCompanyType(){
	var path=$.getContextPath() + "/complex/findCompanyTypeList";
	callAjax(path, null, findCompanyType_callback)
}
function findCompanyType_callback(data){
	$("#companyType_select").empty();
	var result=JSON.parse(data);
	var list=result.list;
	if(list!=null&&list!=""){
		var html="";
		for(var i=0;i<list.length;i++){
			html+="<option value='"+list[i]['TypeName']+"信息'>"+list[i]['TypeName']+"</option>";
		}
		$("#companyType_select").append(html);
	}
}
//展示添加联系人
function show_addContacts(){
	findCompanyType()
	$("#Contacts_div").modal("show");
}
//添加公司联系人
function addContact(){
	var contacts=$("#contacts_select").val();
	var Telno=$("#Telno_select").val();
	var email=$("#email_select").val();
	var mobileno=$("#mobileno_select").val();
	var Remark=$("#companyType_select").val();
	var CompanyId=$("#CompanyId_select").val();
	var param={
			"contacts":contacts,
			"Telno":Telno,
			"email":email,
			"mobileno":mobileno,
			"Remark":Remark,
			"CompanyId":CompanyId
	}
	var path=$.getContextPath() + "/complex/addCompanyContacts";
	callAjax(path, param, addContact_callback)
}
function addContact_callback(data){
	var list=JSON.parse(data);
	if(list.result!=null&&list.result!=""){
		if(list.result=="1"){
			alert("添加成功");
			$("#Contacts_div").modal("hide");
			$("#findList").click();
		}else{
			alert("添加失败");
		}
	}
}
//修改联系人
function upcontact(uptype,ContactsID){
	var contacts=$("#contacts_select").val();
	var Telno=$("#Telno_select").val();
	var email=$("#email_select").val();
	var mobileno=$("#mobileno_select").val();
	var Remark=$("#companyType_select").val();
	var CompanyId=$("#CompanyId_select").val();
	var param={
			"ContactsID":ContactsID,
			"maketype":uptype,
			"contacts":contacts,
			"Telno":Telno,
			"email":email,
			"mobileno":mobileno,
			"Remark":Remark,
			"CompanyId":CompanyId
	}
	var path=$.getContextPath() + "/complex/updateContact";
	callAjax(path, param, upcontact_callback)
}
function upcontact_callback(data){
	var list=JSON.parse(data);
	if(list.result!=null&&list.result!=""){
		if(list.result=="1"){
			alert("操作成功");
			$("#Contacts_div").modal("hide");
			$("#findList").click();
		}else{
			alert("操作失败");
		}
	}
}
//根据ContactsID查询单条联系人信息
function showupdateContact(uptype,ContactsID){
	$("#Contacts_div").modal("show");
	$("#maketype").val(uptype);
	var param={
			"ContactsID":ContactsID
	}
	var path=$.getContextPath() + "/complex/findCompanyTypeList";
	callAjax(path, param, showupdateContact_callback)
}
