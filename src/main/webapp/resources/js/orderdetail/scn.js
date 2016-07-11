/**
 * 根据orderID查询收发通详细信息
 */
function showScn(SCNID){
	$("#SCNID").val(SCNID);
	$("#editshipper").modal("show");
	var path=$.getContextPath()+"/OrderScnController/findScnInfo";
	var param={};
	var OrderID=$("#orderid").text();
	param={
			"SCNID":SCNID,
			"OrderID":OrderID
	}
	callAjax(path,param,showScn_callback);
}
function showScn_callback(data){
	var list=JSON.parse(data);
	var result=list.result;
	if(result!=null&&result!=""){
		for(var i=0;i<result.length;i++){
			var SCNTypeID=result[i]['SCNTypeID'];
			var Content=result[i]['Content'];
			var Seqno=result[i]['Seqno'];
			if(SCNTypeID=="500301"){	//公司名称
				if(Seqno==1){
					$("#companyName_Scn").val(Content);
				}
				if(Seqno==2){
					var htmlName="<p class='addInput' id='companyName_Scn_p"+Seqno+"'><label></label><input type='text' onkeyup='onkeyUp_text(this.id)' name='ShipperCompanyName_Scn' placeholder='请输入公司名称' maxlength='35' size='40' id='companyName_Scn"+Seqno+"' value='"+Content+"' style=''/><a id='companyName_Scn_p_del"+Seqno+"' onclick='delete_Scninput(this.id)'>删除</a><t id='companyName_Scn"+Seqno+"text'></t></p>";
					$("#companyName_Scn_seqno").after(htmlName);
				}
			}
			if(SCNTypeID=="500302"){	//公司地址
				if(Seqno==1){
					$("#companyAddress_Scn").val(Content);
				}
				
				if(Seqno>1){
					var htmlAddress="";
				
				if(Seqno==2){
					htmlAddress="<p class='addInput' id='companyAddress_Scn_addr"+Seqno+"'><label></label><input onkeyup='onkeyUp_text(this.id)' type='text' name='ShipperAddress_Scn' placeholder='请输入公司地址' maxlength='35' size='40' id='companyAddress_Scn"+Seqno+"' value='"+Content+"' /><a id='companyAddress_Scn_addr_del"+Seqno+"' onclick='delete_Scninput(this.id)'>删除</a><t id='companyAddress_Scn"+Seqno+"text'></t></p>";
				}
				if(Seqno==3){
					htmlAddress="<p class='addInput' id='companyAddress_Scn_addr"+Seqno+"'><label class='addInput' id='companyAddress_Scn_addr"+Seqno+"'></label><input onkeyup='onkeyUp_text(this.id)' type='text' name='ShipperAddress_Scn' placeholder='请输入公司地址' maxlength='35' size='40' id='companyAddress_Scn"+Seqno+"' value='"+Content+"' /><a id='companyAddress_Scn_addr_del"+Seqno+"' onclick='delete_Scninput(this.id)'>删除</a><t id='companyAddress_Scn"+Seqno+"text'></t></p>";
				}
				}
				$("#companyAddress_Scn_seqno").after(htmlAddress);
			}
			if(SCNTypeID=="500303"){		//电话
				$("#companyPhone_Scn").val(Content);
			}
			if(SCNTypeID=="500304"){		// 邮箱
				$("#companyEmail_Scn").val(Content);
			}
			if(SCNTypeID=="500305"){		//传真
				$("#companyFax_Scn").val(Content);
			}
			if(SCNTypeID=="500306"){		//邮编
				$("#companyPost_Scn").val(Content);
			}
		}
	}
}

//增加一行
function addInputScn(id){
	
	var inputId=id;
	//用于判断个数
	var count=0;
	var ScnName=inputId.substr(0,15);
	//判断是否是公司名称
	if("companyName_Scn"==ScnName){
		count=$("input[name='ShipperCompanyName_Scn']").length 
		if(count>=2){
			alert("公司名称最多只能添加一个!");
			return false;
		}
		var htmlName="<p class='addInput' id='companyName_Scn_p"+(count+1)+"'><label></label><input onkeyup='onkeyUp_text(this.id)' type='text' name='ShipperCompanyName_Scn' placeholder='请输入公司名称' maxlength='35' size='40' id='companyName_Scn"+(count+1)+"' value='' style=''/><a id='companyName_Scn_p_del"+(count+1)+"' onclick='delete_Scninput(this.id)'>删除</a></p>";
		var htmlName2="<t id='companyName_Scn"+(count+1)+"text'></t>"
		if(count>1){
			$("#companyName_Scn_p"+count+"").after(htmlName);
		}else{
		$("#companyName_Scn_seqno").after(htmlName);
		$("#companyName_Scntext").after(htmlName2);
		}
		
	}
	//判断是否是公司地址
	var countAddr=0;
	if(ScnName=="companyAddr_Scn"){
		countAddr=$("input[name='ShipperAddress_Scn']").length;
		if(countAddr>=3){
			alert("公司地址最多只能添加两个");
			return false;
		}
		var htmlAddress="<p class='addInput' id='companyAddress_Scn_addr"+(countAddr+1)+"'><label></label><input onkeyup='onkeyUp_text(this.id)' type='text' name='ShipperAddress_Scn' placeholder='请输入公司地址' maxlength='35' size='40' id='companyAddress_Scn"+(countAddr+1)+"' value='' style=''/><a id='companyAddress_Scn_addr_del"+(countAddr+1)+"' onclick='delete_Scninput(this.id)'>删除</a></p>";
		var hrmlAddress2="<t id='companyAddress_Scn"+(countAddr+1)+"text'></t>";
		if(countAddr>1){
			$("#companyAddress_Scn_addr"+countAddr+"").after(htmlAddress);
			$("#companyAddress_Scntext").after(hrmlAddress2)
		}else{
			$("#companyAddress_Scn_seqno").after(htmlAddress);
		}
	}
	
}
function closeScn_div(){
	$(".addInput").remove();
	$("#SCNID").val("");
	$("#editshipper").modal("hide");
	
}

//删除输入框
function delete_Scninput(id){
	var deleteId=id;
	var check_deleteId=deleteId.substr(0,11);
	if(check_deleteId=="companyName"){
		var deleteName=deleteId.substr(0,17)+deleteId.substr((deleteId.indexOf("l")+1),deleteId.length);
		$("#"+deleteName+"").remove();
		$("#showtextcompanyName_Scn2").remove();
	}
	if(check_deleteId=="companyAddr"){
		var deleteAddr=deleteId.substr(0,23)+deleteId.substr((deleteId.indexOf("l")+1),deleteId.length);
		$("#"+deleteAddr+"").remove();
		$("#"+("showtextcompanyAddress_Scn"+deleteAddr.substr(23,deleteAddr.length))+"").remove();
		
	}
}
//onkeyup预览
function onkeyUp_text(id){
	
	var html="<i id='showtext"+id+"' class='showtext"+id+"' style='right-align:0'>"+$("#"+id+"").val()+"</i>";
	if(id=="companyName_Scn2"){
		$(".showtext"+id+"").remove();
		$("#showtextcompanyName_Scn").after(html)
	}
	
	else if(id=="companyAddress_Scn"){
		$(".showtext"+id+"").remove();
		$("#companyAddress_Scntext").after(html)
	}
	else if(id=="companyAddress_Scn2"){
		$(".showtext"+id+"").remove();
		$("#showtextcompanyAddress_Scn").after(html)
		
	}else if(id=="companyAddress_Scn3"){
		$(".showtext"+id+"").remove();
		$("#showtextcompanyAddress_Scn2").after(html)
		
	}else{
		
	$(".showtext"+id+"").remove();
	$("#"+id+"text").after(html)
	}
}
//保存更改Scn信息

function save_Update_Scn(){
	var countName=$("input[name='ShipperCompanyName_Scn']").length;
	var companyName_Scn=$("#companyName_Scn").val();
	if(companyName_Scn==""||companyName_Scn==null){
		alert("请填写公司名称");
		return false;
	}
	var companyName_Scn2="";
	var companyAddress_Scn="";
	var companyAddress_Scn2="";
	var companyAddress_Scn3="";
	
	if(countName>1){
		companyName_Scn2=$("#companyName_Scn2").val();
	}
	var countAddr=$("input[name='ShipperAddress_Scn']").length;
	if(countAddr>1){
		companyAddress_Scn2=$("#companyAddress_Scn2").val();
		if(countAddr>2){
			companyAddress_Scn3=$("#companyAddress_Scn3").val();
		}
	}
	
	companyAddress_Scn=$("#companyAddress_Scn").val();
	var companyPhone_Scn=$("#companyPhone_Scn").val();
	var companyEmail_Scn=$("#companyEmail_Scn").val();
	var companyFax_Scn=$("#companyFax_Scn").val();
	var companyPost_Scn=$("#companyPost_Scn").val();
	var SCNID=$("#SCNID").val();
	
	var OrderID=$("#orderid").text();
	
	
	
	if(checkText(companyName_Scn)==false){
		alert("公司名称只能是英文或者半角字符")
		return false;
	}
	if(companyName_Scn2!=null&&companyName_Scn2!=""){
		if(checkText(companyName_Scn2)==false){
			alert("公司名称只能是英文或者半角字符")
			return false;
		}
	}
	if(companyAddress_Scn!=null&&companyAddress_Scn!=""){
		if(checkText(companyAddress_Scn)==false){
			alert("公司地址1只能是英文或者半角字符")
			return false;
		}
	}
	if(companyAddress_Scn2!=null&&companyAddress_Scn2!=""){
		if(checkText(companyName_Scn2)==false){
			alert("公司地址2只能是英文或者半角字符")
			return false;
		}
	}
	if(companyAddress_Scn3!=null&&companyAddress_Scn3!=""){
		if(checkText(companyAddress_Scn3)==false){
			alert("公司地址3只能是英文或者半角字符")
			return false;
		}
	}
	if(companyPhone_Scn!=null&&companyPhone_Scn!=""){
		if(checkText(companyPhone_Scn)==false){
			alert("公司电话只能是英文或者半角字符")
			return false;
		}
	}
	if(companyEmail_Scn!=null&&companyEmail_Scn!=""){
		if(checkText(companyEmail_Scn)==false){
			alert("公司邮箱只能是英文或者半角字符")
			return false;
		}
	}
	if(companyPost_Scn!=null&&companyPost_Scn!=""){
		if(checkText(companyPost_Scn)==false){
			alert("公司邮编只能是英文或者半角字符")
			return false;
		}
	}
	
	var param={		"countName":countName,
					"countAddr":countAddr,
					"SCNID":SCNID,
					"OrderID":OrderID,
					"companyName_Scn":companyName_Scn,
					"companyName_Scn2":companyName_Scn2,
					"companyAddress_Scn":companyAddress_Scn,
					"companyAddress_Scn2":companyAddress_Scn2,
					"companyAddress_Scn3":companyAddress_Scn3,
					"companyPhone_Scn":companyPhone_Scn,
					"companyEmail_Scn":companyEmail_Scn,
					"companyFax_Scn":companyFax_Scn,
					"companyPost_Scn":companyPost_Scn
				
	};
	
	var path=$.getContextPath()+"/OrderScnController/updateScnInfo";
	callAjax(path,param,save_UpdateScn_callback);
	
}
function save_UpdateScn_callback(data){
	var orderid=$("#orderid").text();
	var list=JSON.parse(data);
	var result=list.result;
	if(result>0){
		alert("保存成功");
		closeScn_div();
		
		
		
		$.ajax({
			type : "GET",
			url : $.getContextPath() + "/orderdetail/scninfo/"+orderid,
			async : false,
			success : function(data) {
				$("#scn").html(data);
			}

		});
		
		
	}else{
		alert("保存失败")
	}
}
//校验只能英文和半角字符
function checkText(value){
	var reg=/^[0-9a-zA-Z\u0000-\u00FF-\u0000-\u00FF]+$/;
	if(reg.test(value)){
		return true;
	}else{
		return false;
	}
}

