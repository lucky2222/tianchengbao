$(function() {

			$("#submitletterrefusereason").click(function() {

				if ($("#ApprovalRemark").val().trim().length == 0) {
					alert("请必须录入拒绝原因");
					return false;
				}
				$.ajax({
							type : "POST",
							url : $.getContextPath()
									+ "/orderletter/certrefuse",
							data : {
								ordercertdetailid : $("#hidden_ordercertdetailid")
										.val(),
								approvalremark : $("#ApprovalRemark").val()
										.trim()
							},
							async : false,
							success : function(data) {
								
								$("#closeletterrefusereason").click();
								findList();
							}
							
						});
				
			});

		});

function letterConfirm(obj, ordercertdetailid) {

	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderletter/certconfirm",
				data : {
					ordercertdetailid : ordercertdetailid
				},
				async : false,
				success : function(data) {
					findList();
				}

			});

}

function letterRefuse(obj, ordercertdetailid) {
	$("#letterrefusereason").modal("show");
	$("#hidden_ordercertdetailid").val(ordercertdetailid);
	$("#ApprovalRemark").val("");
}

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

function findList(){
	var orderid=$("#orderid").text();
	$.ajax({
		type : "GET",
		url : $.getContextPath() + "/orderdetail/letter/"+orderid,
		async : false,
		success : function(data) {
			$("#letter").html(data);
		}

	});
}	
//展示添加保函
function show_certDiv(){
	$("#show_cert").modal("show")
}
//添加保函
function add_cert(){
	var OrderID=$("#orderid").text();
	var addCertName=$("#addCertName").val();
	var param={"OrderID":OrderID,
			"addCertName":addCertName
	}
	var path=$.getContextPath() + "/orderletter/addCert"
	callAjax(path,param,add_cert_callback);
}
function add_cert_callback(data){
	var orderid=$("#orderid").text();
	var list=JSON.parse(data);
	var result=list.result;
	if(result=="1"){
		alert("添加保函成功")
		$("#show_cert").modal("hide")
		$.ajax({
			url :$.getContextPath() + "/orderdetail/letter/" + orderid,
			async : false,
			success : function(data) {
				$("#letter").html(data);
			}
		});
	}else{
		alert("添加保函失败")
	}
}


