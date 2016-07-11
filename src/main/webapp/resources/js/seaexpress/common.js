$(function() {
	$('#routeLineForm').submit(function() {
		createSeSubmit();
		return false;
	});
	$('#formNewRouteLinePort').submit(function() {
		createNewRouteLinePort();
		return false;
	});

});

function createSeSubmit() {
	var routelinename = $("#routelinename").val();
	if (routelinename == '' || routelinename == null) {
		alert("航线名不能为空");
		return false;
	}
	var carrierID = $("#carrierID").val();
	if (carrierID == '' || carrierID == null) {
		alert("承运人不能为空");
		return false;
	}

	var copyinterval = $("#copyinterval").val();
	if (copyinterval == '' || copyinterval == null || copyinterval <= 0) {
		alert("复制周期必须为正整数");
		return false;
	}

	$.ajax({
		type : 'POST',
		url : 'createsesubmit',
		traditional : true,
		data : $("#routeLineForm").serialize(),// 你的formid
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success) {
				if (result.routelineid != null && result.roulelineid != '') {
					$("#routelineid").val(result.routelineid);
					$("#routelineidForPort").val(result.routelineid);
					$("#formNewRouteLinePort").show();
					if ($("#isfirstrp").val() == 'true') {
						$("#newPortETDDiv").show()
						$("#newPortforcastdaysDiv").hide();
					} else {
						$("#newPortETDDiv").hide()
						$("#newPortforcastdaysDiv").show();
					}
					// newPortETDDiv
					// newPortforcastdaysDiv
				}

			}

		}
	});
}

function createNewRouteLinePort() {
	if ($("#PortNameEN1").val() == null || $("#PortNameEN1").val() == ''
			|| $("#PortID").val() == null || $("#PortID").val() == '') {
		alert("请录入港口");
		return false;
	}
	if ($("#newPortETDDiv").css("display") != "none") {
		if ($("#newPortETD").val() == null || $("#newPortETD").val() == '') {
			alert("请录入开航日");
			return false;
		}
	}

	$.ajax({
		type : 'POST',
		url : 'createnewroutelineportsubmit',
		traditional : true,
		data : $("#formNewRouteLinePort").serialize(),// 你的formid
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success) {
				$("#newPortETD").val("");
				$("#PortNameEN1").val("");
				$("#PortID").val("");
				$("#isPriceStart").val("0");
				$("#isTransfer").val("0");
				$("#isDelivery").val("0");
				$("#newPortforcastdays").val("");
				if ($("#newPortETDDiv").css("display") != "none") {
					$("#newPortETDDiv").hide();
					$("#newPortforcastdaysDiv").show();
				}
				// newPortETDDiv
				// newPortforcastdaysDiv
				getRpInfoGrid();

				$("[name*='etd']").datepicker({
					dateFormat : "yy-mm-dd"
				// 在这里进行插件的属性设置
				});

				// if (result.routelineid != null && result.roulelineid != '') {
				// $("#routelineid").val(result.routelineid);
				// // $("#formNewRouteLinePort").show();
				// }

			}

		}
	});
}

function saveNewRpInfo(formid) {

	$.ajax({
		type : 'POST',
		url : 'savenewrpinfo',
		traditional : true,
		data : $("#" + formid).serialize(),// 你的formid
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success) {
				getTransInfoGrid(result.id);
			}

		}
	});
	return false;
}

function getRpInfoGrid() {
	$.ajax({
		type : 'POST',
		url : 'partial_rpinfogrid',
		traditional : true,
		data : {
			routelineID : $("#routelineid").val()
		},
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			$("#rpInfoGrid").html(data);
		}
	});
}

function submitAllSeInfo() {
	if (!confirm("确认提交吗？")) {
		return false;
	}

	// var SeIDArr = new Array();
	//
	// $("input[name='SeID']").each(function() {
	// SeIDArr.push(this.value);
	// });
	$.ajax({
		type : 'POST',
		url : 'submitallseinfo',
		traditional : true,
		data : {
			routelineID : $("#routelineid").val()
		// seidArr : SeIDArr
		},
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success) {
				location.href = result.redirect;
			}
		}
	});
}

function getRpNotSubmitGrid() {
	$.ajax({
		type : 'POST',
		url : 'partial_rpnotsubmitgrid',
		traditional : true,
		data : $("#formnotsubmit").serialize(),
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			$("#gridnotsubmit").html(data);
		}
	});
}

function getTransInfoGrid(routelineportid) {

	$.ajax({
		type : 'POST',
		url : 'partial_transferinfo',
		traditional : true,
		data : {
			routelineportid : routelineportid
		},
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			$("#hide_tr" + routelineportid).html(data);
			$("[name*='etd']").datepicker({
				dateFormat : "yy-mm-dd"
			// 在这里进行插件的属性设置

			});
		}
	});
}

function saveRoutelineInfo(rpid, seid, type, parentRpId, seqno, routelineID) {

	var portID = $("#PortID" + rpid).val();
	if (portID == null || portID == "") {
		alert("请输入港口");
		return false;
	}
	var etd = $("#etd" + rpid).val();
	if (seqno == 1 && (etd == null || etd == "")) {
		alert("请输入开航日");
		return false;
	}
	var forcastdays = $("#forcastdays" + rpid).val();
	if (seqno > 1 && forcastdays <= 0) {
		alert("航程必须为正整数");
		return false;
	}
	var isPriceStart = $("#isPriceStart" + rpid).val();
	var isTransfer = $("#isTransfer" + rpid).val();
	var isDelivery = $("#isDelivery" + rpid).val();
	var transRemark = $("#transRemark" + rpid).val();
	$.ajax({
		type : 'POST',
		url : 'saveroutelineinfo',
		traditional : true,
		data : {
			rpid : rpid,
			seid : seid,
			portID : portID,
			etd : etd,
			isPriceStart : isPriceStart,
			isTransfer : isTransfer,
			isDelivery : isDelivery,
			forcastdays : forcastdays,
			seqno : seqno,
			routelineID : routelineID,
			transRemark : transRemark
		},
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success) {
				if (type == 1) {
					getTransInfoGrid(parentRpId);
				} else {
					getRpInfoGrid();
				}
				$("[name*='etd']").datepicker({
					dateFormat : "yy-mm-dd"
				// 在这里进行插件的属性设置
				});
			}

		}
	});
}

function delRoutelineInfo(rpid, seid, type, parentRpId) {
	if (!confirm("确认删除吗？")) {
		return false;
	}

	$.ajax({
		type : 'POST',
		url : 'delroutelineinfo',
		traditional : true,
		data : {
			rpid : rpid,
			seid : seid
		},
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success) {
				if (type == 1) {
					getTransInfoGrid(parentRpId);
				} else {
					getRpInfoGrid();
				}
				$("[name*='etd']").datepicker({
					dateFormat : "yy-mm-dd"
				// 在这里进行插件的属性设置
				});
			}

		}
	});
}

function isInt(obj) {
	var regex = /^[1-9]\d*$/;
	if (!regex.test(obj.value)) {
		obj.value = "";
	}
}

function delAllRoutelineInfo(routelineid) {
	if (!confirm("确认删除吗？")) {
		return false;
	}

	$.ajax({
		type : 'POST',
		url : 'delallroutelineinfo',
		traditional : true,
		data : {
			routelineid : routelineid
		},
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success) {
				// location.href=result.redirect;
				$('#formroutelinegrid').submit();
			}

		}
	});
}

// 文件上传
function uploadRouteLinePic(routelineid) {
	// 上传文件
	var fileElementId = "fileToUpload" + routelineid;
	if ($("#" + fileElementId + "").val() == ""
			|| $("#" + fileElementId + "").val() == null) {
		alert("请选择文件")
		return;
	}
	$.ajaxFileUpload({

		url : "./uploadroutelinepic",// 处理图片脚本
		secureuri : false,
		fileElementId : fileElementId,// file控件id
		data : {
			"fileElementId" : fileElementId,
			"routelineid" : routelineid
		},
		dataType : String,
		success : function(data) {
			$("#formroutelinegrid").submit();
		},
		error : function(data, status, e) {
			alert(e);
		}
	});
}

$('#editETD').on('show.bs.modal', function(event) {

	var button = $(event.relatedTarget);
	$('#seideditetd').val(button.data('seid'));
	// var seIDList = new Array();
	// $("input[name='select']").each(function() {
	// if (this.checked) {
	// seIDList.push(this.value);
	// }
	// });
	// if (seIDList.length == 0) {
	// alert("请选择要修改的船期");
	// return event.preventDefault();
	// }
	//	
	$("#etdedit").datepicker({
		dateFormat : "yy-mm-dd"
	// 在这里进行插件的属性设置
	});
});
$("#formeditetd").validate({
	rules : {
		etd : "required"
	},
	messages : {
		etd : "必填"
	},
	submitHandler : function(form) {
		// var seIDList = new Array();
		//
		// $("input[name='select']").each(function() {
		// if (this.checked) {
		// seIDList.push(this.value);
		// }
		// });
		// if (seIDList.length == 0) {
		// alert("请选择要修改的船期");
		// return false;
		// }
		$.ajax({
			url : "./editetdsubmit",
			traditional : true,
			data : {
				etd : $("#etdedit").val(),
				seID : $("#seideditetd").val()
			// seIDList : seIDList
			},
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#formeditetd"));
					$('#editETD').modal('hide');
					$("#formsegrid").submit();
				}
			}
		});
		return false;

	}
});

function cutoff(type) {
	var seIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			seIDList.push(this.value);
		}
	});
	if (seIDList.length == 0) {
		alert("请选择要修改的船期");
		return false;
	}
	$.ajax({
		url : "./cutoffsubmit",
		traditional : true,
		data : {
			seIDList : seIDList,
			type : type
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null) {
				alert(result.msg);
			}
			if (result.success) {
				$("#formsegrid").submit();
			}
		}
	});
	return false;
}

function generateSeByBatch() {
	$("#btnGenerateSeByBatch").attr("disabled", true);
	$.ajax({
		url : "./generateSeByBatch",
		traditional : true,
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null) {
				alert(result.msg);
			}
			if (result.success) {
				$("#btnGenerateSeByBatch").attr("disabled", false);
				$("#formsegrid").submit();
			}
		}
	});
	return false;
}

$('#copyRouteline').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget);
	var type = button.data('type');
	var modal = $(this);
	$('#routelineid_cr').val(button.data('routelineid'));

});

$("#copyroutelineform").validate({
	rules : {
		routelinename : "required",
		NameEN_cr : "required",
		copyinterval : "required"
	},
	messages : {
		routelinename : "必填",
		NameEN_cr : "必填",
		copyinterval : "必填"
	},
	submitHandler : function(form) {
		$.ajax({
			url : "./copyrouteline",
			traditional : true,
			data : $("#copyroutelineform").serialize(),
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#copyroutelineform"));
					$('#copyRouteline').modal('hide');
					$("#formroutelinegrid").submit();
				}
			}
		});
		return false;

	}
});


$('#freecontainer').on('show.bs.modal', function(event) {
	var RoutelineIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			RoutelineIDList.push(this.value);
		}
	});
	if (RoutelineIDList.length == 0) {
		alert("请选择要修改的数据");
		return event.preventDefault();
	}

});

$("#freecontainerform").validate({

	submitHandler : function(form) {
		var RoutelineIDList = new Array();

		$("input[name='select']").each(function() {
			if (this.checked) {
				RoutelineIDList.push(this.value);
			}
		});
		if (RoutelineIDList.length == 0) {
			alert("请选择要修改的数据");
			return false;
		}
		$.ajax({
			url : "./freecontainersubmit",
			traditional : true,
			data : {
				formData : JSON.stringify($(form).serializeJson()),
				RoutelineIDList : RoutelineIDList
			},
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#freecontainerform"));
					$('#freecontainer').modal('hide');
					$("#formroutelinegrid").submit();
				}
			}
		});
		return false;

	}
});