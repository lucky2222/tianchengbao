/**
 * 套打JS
 */
$(document).ready(function() {
	sftd();
	//查询公司名称
	findHostCompany()
})
//顺风
function sftd(){
	var orderid=$("#orderid").val();
	var Type=$("#Basetype").val();
	var param={"OrderID":orderid,
				"Type":Type
			
	}
	var path="/orderexport/sftdinfoselect";
	callAjax(path,param,sftd_callback);
}
function sftd_callback(data){
	var res=JSON.parse(data);
	var result=res.result;
	if(result!=null&&result!=""){
		var Contactor=result.Contactor;
		var Address=result.Address;
		var Tel=result.Tel;
		var CompanyName=result.CompanyName;
		var Country=result.Country;	
		var Mobile=result.Mobile;
		
		
		var kfName=result.kfName;
		var kfTel=result.kfTel;
		var hostName=result.hostName;
		var hostAddress=result.hostAddress;
		$("#kfName").val(kfName);
		$("#kfTel").val(kfTel);
		$("#hostName").val(hostName);
		$("#hostAddress").val(hostAddress);
		$("#Mobile").val(Mobile);
		$("#Contactor").val(Contactor);
		$("#Address").val(Address);
		$("#Tel").val(Tel);
		$("#CompanyName").val(CompanyName);
		$("#Country").val(Country)
	}
	
}

//未付账单
function findPayList(){
	
	var PRAccountsID=$("#PRAccountsID").val();
	var startETD=$("#startETD").val();
	var endETD=$("#endETD").val();
	var LadingbillNo=$("#LadingbillNo").val();
	var path="/orderexport/findFeeInfoPayBill";
	var param={
			"PRAccountsID":PRAccountsID,
			"startETD":startETD,
			"endETD":endETD,
			"LadingbillNo":LadingbillNo
	}
	callAjax(path,param,findPayList_callback);
}
function findPayList_callback(data){
	var result=JSON.parse(data);
	var list=result.list;
	var com=result.com;
	var usInfo=result.usInfo;
	var host=result.host;
	$(".tr_class").remove();
	
		var htmlTit="";
		if(com!=null&&com!=""){
			htmlTit+="<tr class='tr_class title' id='tr_title1'>"
				htmlTit+="<td>TO:</td>";
				htmlTit+="<td>"+getStr(com['Contacts'])+"</td>";
				htmlTit+="<td>FAX:"+getStr(com['fax'])+"</td>";
				htmlTit+="<td>PH:"+getStr(com['Tel'])+"</td>";
				htmlTit+="</tr>";
		}
		
		$("#tr_title").after(htmlTit);
		var htmlTit2="";
		htmlTit2+="<tr class='tr_class'>"
		htmlTit2+="<td>FM:"+getStr(host['HostName'])+"</td>";
		htmlTit2+="<td>"+getStr(usInfo['Contacts'])+"</td>";
		
		htmlTit2+="<td>FAX:"+getStr(usInfo['Fax'])+"</td>";
		htmlTit2+="<td>PH:"+getStr(usInfo['Tel'])+"</td>";
		htmlTit2+="</tr>";
		$("#tr_title2").after(htmlTit2);
		
	if(list!=null&&list!=""){
		var html=""
		var totalRMB=0;
		var totalUSD=0;
		for(var i=0;i<list.length;i++){
			html+="<tr class='tr_class'>"
			html+="<td>"+getStr(list[i]['PRAccountsID'])+"</td>";
			html+="<td>"+getStr(list[i]['ETD']).substring(0,10)+"</td>";
			html+="<td>"+getStr(list[i]['VesselEN'])+getStr(list[i]['VesselCN'])+getStr(list[i]['Voyage'])+"</td>";
			html+="<td>"+getStr(list[i]['LadingbillNo'])+"</td>";
			html+="<td>"+getStr(list[i]['DischargePortName'])+"</td>";
			html+="<td>付</td>";
			if(list[i]['CNY']!=null&&list[i]['CNY']!=""){
				html+="<td>"+list[i]['CNY']+"</td>";
				totalRMB=(parseFloat(totalRMB)+parseFloat(list[i]['CNY'])).toFixed(2);
			}else{
				html+="<td></td>";
			}
			if(list[i]['USD']!=null&&list[i]['USD']!=""){
				html+="<td>"+list[i]['USD']+"</td>";
				totalUSD=(parseFloat(totalUSD)+parseFloat(list[i]['USD'])).toFixed(2);
			}else{
				html+="<td></td>";
			}
			
			html+="</tr>"
		}
		html+="<tr><td>Total:</td><td></td>" +
				"<td></td><td></td><td></td><td></td><td>"+totalRMB+"</td><td>"+totalUSD+"</td></tr>"
		$("#tr_1").after(html);
	}
}
//应收账单

function findReceiveList(){
	var PRAccountsID=$("#PRAccountsID").val();
	var startETD=$("#startETD").val();
	var endETD=$("#endETD").val();
	var LadingbillNo=$("#LadingbillNo").val();
	var path="/orderexport/findFeeInfoReceiveBill";
	var param={
			"PRAccountsID":PRAccountsID,
			"startETD":startETD,
			"endETD":endETD,
			"LadingbillNo":LadingbillNo
	}
	callAjax(path,param,findReceiveList_callback);
}
function findReceiveList_callback(data){
	var result=JSON.parse(data);
	var list=result.list;
	$(".tr_class").remove();
	var com=result.com;
	var usInfo=result.usInfo;
	var host=result.host;
	$(".tr_class").remove();
	var htmlTit="";
	
	if(com!=null&&com!=""){
		var totalRMB=0;
		var totalUSD=0;
		htmlTit+="<tr class='tr_class title' >"
			htmlTit+="<td>TO:</td>";
			htmlTit+="<td>"+getStr(com['Contacts'])+"</td>";
			htmlTit+="<td>FAX:"+getStr(com['fax'])+"</td>";
			htmlTit+="<td>PH:"+getStr(com['Tel'])+"</td>";
			htmlTit+="</tr>";
	}
	
	$("#tr_title").after(htmlTit);
	var htmlTit2="";
	htmlTit2+="<tr class='tr_class'>"
		htmlTit2+="<td>FM:"+getStr(host['HostName'])+"</td>";
	htmlTit2+="<td>"+getStr(usInfo['Contacts'])+"</td>";
	
	htmlTit2+="<td>FAX:"+getStr(usInfo['Fax'])+"</td>";
	htmlTit2+="<td>PH:"+getStr(usInfo['Tel'])+"</td>";
	htmlTit2+="</tr>";
	$("#tr_title2").after(htmlTit2);
	
	if(list!=null&&list!=""){
		var html=""
		for(var i=0;i<list.length;i++){
			html+="<tr class='tr_class'>"
			html+="<td>"+list[i]['PRAccountsID']+"</td>";
			if(list[i]['ETD']!=null&&list[i]['ETD']!=""){
				html+="<td>"+list[i]['ETD'].substring(0,10)+"</td>";
			}else{
				html+="<td></td>";
			}
			html+="<td>"+getStr(list[i]['Vessel'])+getStr(list[i]['Voyage'])+"</td>";
			html+="<td>"+getStr(list[i]['LadingbillNo'])+"</td>";
			html+="<td>"+getStr(list[i]['DischargePortName'])+"</td>";
			html+="<td>收</td>";
			if(list[i]['CNY']!=null&&list[i]['CNY']!=""){
				html+="<td>"+list[i]['CNY']+"</td>";
				totalRMB=(parseFloat(totalRMB)+parseFloat(list[i]['CNY'])).toFixed(2);
			}else{
				html+="<td></td>";
			}
			if(list[i]['USD']!=null&&list[i]['USD']!=""){
				html+="<td>"+list[i]['USD']+"</td>";
				totalUSD=(parseFloat(totalUSD)+parseFloat(list[i]['USD'])).toFixed(2);
			}else{
				html+="<td></td>";
			}
			
			html+="</tr>"
		}
		html+="<tr><td>Total:</td><td></td><td></td>" +
		"<td></td><td></td><td></td><td>"+totalRMB+"</td><td>"+totalUSD+"</td></tr>"
		$("#tr_1").after(html);
	}
}

//查询登陆人所在的公司名称
function findHostCompany(){
	var path="/orderexport/findHostCompanyName";
	callAjax(path,null,findHostCompany_callback);
}
function findHostCompany_callback(data){
	var result=JSON.parse(data);
	var host=result.host;
	var html="";
	html+=getStr(host['HostName'])+"对账单";
	$("#companyTitle").append(html)
}

//生成PDF
function printpage()
{
	$("#select").hide();
window.print()
}
//指定打印div内容
function printdiv(){
var headstr = "<html><head><title></title></head><body>";
var footstr = "</body>";
var newstr = document.getElementById("noauthorizedlist").innerHTML; //获得 div 里的所有 html 数据
var oldstr = document.body.innerHTML;
document.body.innerHTML = headstr+newstr+footstr;
window.print();
document.body.innerHTML = oldstr;
return false;

}