$(document).ready(function(){
	//提单样本列表
	lbybList();
	//格式单
	gsdList();
})
//提单样本列表
function lbybList(){
	var OrderID=$("#orderid").text();
	var UploadCategoryID="1504291631310004";
	var param={
			"OrderID":OrderID,
			"UploadCategoryID":UploadCategoryID
	}
	var path=$.getContextPath()+"/OrderLbfileInfoController/findLadyb";
	callAjax(path,param,lbybList_callback)
}
function lbybList_callback(data){
	var result=JSON.parse(data)
	if(result.list!=""&&result.list!=null){
		var list=result.list
		var html="";
		for(var i=0;i<list.length;i++){
			var CreateTime=list[i]['CreateTime'];
			var StaffName=list[i]['StaffName'];
			var FileName=list[i]['FileName'];
			html+='<tr>'
			html+='<td>'+CreateTime+'</td>';
			html+='<td>'+StaffName+'</td>';
			html+='<td><a href="/OrderLbfileInfoController/downloadLadyb/'+list[i]["SubTradeId"]+'">'+FileName+'</a></td>';
			html+='</tr>'
		}
		$("#tdyb_tr").after(html);
		
	}
}
//查询格式单列表
function gsdList(){
	var OrderID=$("#orderid").text();
	var UploadCategoryID="1504291632030005";
	var param={
			"OrderID":OrderID,
			"UploadCategoryID":UploadCategoryID
	}
	var path=$.getContextPath()+"/OrderLbfileInfoController/findLadyb";
	callAjax(path,param,gsdList_callback)
}
function gsdList_callback(data){
	var result=JSON.parse(data)
	if(result.list!=""&&result.list!=null){
		var list=result.list
		var html="";
		for(var i=0;i<list.length;i++){
			var CreateTime=list[i]['CreateTime'];
			var StaffName=list[i]['StaffName'];
			var FileName=list[i]['FileName'];
			html+='<tr>'
			html+='<td>'+CreateTime+'</td>';
			html+='<td>'+StaffName+'</td>';
			html+='<td><a href="/OrderLbfileInfoController/downloadLadyb/'+list[i]["SubTradeId"]+'">'+FileName+'</a></td>';
			html+='</tr>'
		}
		$("#gsd_tr").after(html);
		
	}
}

