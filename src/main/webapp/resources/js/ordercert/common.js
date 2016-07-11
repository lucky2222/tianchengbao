/*
 * author: yaoqi
 */

function openNewModalWindow(id) {
	// alert(id);
	$('#' + id).modal('show');
}

function closeOldModalWindow(id) {
	$('#' + id).modal('hide');
}

function closeAndOpenModalWindow(closeID, openID, flag) {
	// alert(closeID);
	closeOldModalWindow(closeID);
	// $('#'+closeID).hidden.bs.modal(openNewModalWindow(openID));

	// setTimeout("函数名("+参数+")",毫秒数)
	// $('#'+closeID).on('hidden.bs.modal',setTimeout(
	// openNewModalWindow(openID),1000
	// ));
	// $('#'+closeID).on('hidden.bs.modal',a(openID));

	// openNewModalWindow(openID);

	// a(openID);
	//	
	$('#' + closeID).on('hidden.bs.modal', function(event) {
		// alert("hidden");
		if (flag == '1') {
			openNewModalWindow(openID);
			flag = '0';
		}

		// $('#'+openID).modal('show');

	});
}

function sleepa(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}

function a(openID) {

	sleepa(3000);
	openNewModalWindow(openID);
}
$('#editcargomodal').on('hide.bs.modal', function(event) {
	$.clearForm($("#addCargoform"));
});
$('#editcargomodal').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget);
	var type = button.data('type');
	var modal = $(this);
	if (type == "add") {
		$('#addCargoLabel').text("新增货物信息");
		$('#op_Cargo').attr("operatetype", "add");
		var arrSon = document.getElementsByName("CargoCategoryID");
		for (i = 0; i < arrSon.length; i++) {
			if (arrSon[i].value == "109101") {
				arrSon[i].checked = true;
				arrSon[i].click();
			}
		}
	}
	if (type == "update") {
		$('#addCargoLabel').text("编辑货物信息");
		$('#op_Cargo').attr("operatetype", "update");
		$('#OrderIDForCargo').val(button.data('orderidforcargo'));
		$('#OrderContainerCargoID').val(button.data('ordercontainercargoid'));
		// $('[name="CargoCategoryID"]').val(button.data('cargocategoryid'));
		var arrSon = document.getElementsByName("CargoCategoryID");
		for (i = 0; i < arrSon.length; i++) {
			if (arrSon[i].value == button.data('cargocategoryid')) {
				arrSon[i].checked = true;
				arrSon[i].click();
			}
		}
		// $('#CargoCategoryID').val(button.data('cargocategoryid'));
		$('#HSCode').val(button.data('hscode'));
		$('#CargoNameEN').val(button.data('cargonameen'));
		$('#CargoNameCN').val(button.data('cargonamecn'));
		$('#PkgTypeID').val(button.data('pkgtypeid'));
		$('#PackageNameEN').val(button.data('packagenameen'));
		$('#Number').val(button.data('number'));
		$('#Weight').val(button.data('weight'));
		$('#Volume').val(button.data('volume'));
		$('#Marks').val(button.data('marks'));
		$('#CargoDes').val(button.data('cargodes'));
	}
});

$("#addCargoform").validate({
	rules : {
		CargoCategoryID : "required",
		CargoNameEN : "required"
	// Number : "required",
	// Weight : "required",
	// Volume : "required"
	},
	messages : {
		CargoCategoryID : "必填",
		CargoNameEN : "必填"
	// Number : "必填",
	// Weight : "必填",
	// Volume : "必填"
	},
	submitHandler : function(form) {
		if ($('#op_Cargo').attr("operatetype") == 'add') {
			$.ajax({
				url : "./addcontainercargo",
				data : $("#addCargoform").serialize(),
				type : "post",
				async : false,
				success : function(data) {
					var result = JSON.parse(data);
					alert(result.msg);
					if (result.success) {
						$.clearForm($("#addCargoform"));
						$('#editcargomodal').modal('hide');
						getContainerCargoGrid(result.id);
					}
				}
			});
		}
		if ($('#op_Cargo').attr("operatetype") == 'update') {
			$.ajax({
				url : "./updatecontainercargo",
				data : $("#addCargoform").serialize(),
				type : "post",
				async : false,
				success : function(data) {
					var result = JSON.parse(data);
					alert(result.msg);
					if (result.success) {
						$.clearForm($("#addCargoform"));
						$('#editcargomodal').modal('hide');
						getContainerCargoGrid(result.id);
					}
				}
			});
		}
		return false;
	}

});

function deleteContainerCargo(ordercontainercargoid, orderid) {
	if (!confirm("确认删除吗？")) {
		return false;
	}
	$.ajax({
		url : "./deletecontainercargo",
		data : {
			ordercontainercargoid : ordercontainercargoid,
			orderid : orderid
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success) {
				getContainerCargoGrid(result.id);
			}
		}
	});
}

function getContainerCargoGrid(orderid) {
	$.ajax({
		url : "./partial_cargoinfo/" + orderid,
		async : false,
		success : function(data) {
			$("#containerCargoGrid").html(data);
		}
	});
}

function getCargoIntoContainerGrid(orderid, orderContainerCargoID) {
	$.ajax({
		url : "./partial_cargointocontainer",
		data : {
			orderid : orderid,
			orderContainerCargoID : orderContainerCargoID
		},
		async : false,
		success : function(data) {
			$("#cargointocontainergrid").html(data);
		}
	});
}

$('#editNWV').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget);
	var modal = $(this);

	var orderid = button.data('orderid');
	var ordercontainercargoid = button.data('ordercontainercargoid');

	$('#OrderIDCargoIntoContainer').val(orderid);
	$('#OrderContainerCargoIDCargoIntoContainer').val(ordercontainercargoid);
	$('#HSCode').val(button.data('hscode'));
	$('#CargoNameCargoIntoContainer').text(button.data('cargonameen'));
	// $('#CargoNameCN').val(button.data('cargonamecn'));
	$('#NumberCargoIntoContainer').val(button.data('number'));
	$('#WeightCargoIntoContainer').val(button.data('weight'));
	$('#VolumeCargoIntoContainer').val(button.data('volume'));
	getCargoIntoContainerGrid(orderid, ordercontainercargoid);

});

function cbContainerForCargoClick() {
	var arrSon = document.getElementsByName("selectContainerForCargo");
	var cbAll = document.getElementById("selectAllContainerForCargo");
	var tempState = cbAll.checked;
	for (i = 0; i < arrSon.length; i++) {
		if (arrSon[i].checked != tempState)
			arrSon[i].click();
	}
}

$("#cargoIntoContainerform").validate(
		{
			rules : {
				Number : "required",
				Weight : "required",
				Volume : "required"
			},
			messages : {
				Number : "必填",
				Weight : "必填",
				Volume : "必填"
			},
			submitHandler : function(form) {
				var orderid = $("#OrderIDCargoIntoContainer").val();
				var ordercontainercargoid = $(
						"#OrderContainerCargoIDCargoIntoContainer").val();

				var idArray = new Array();

				$("input[name='selectContainerForCargo']").each(function() {
					if (this.checked) {
						idArray.push(this.value);
					}
				});
				if (idArray.length == 0) {
					alert("请选择箱子");
					return false;
				}

				$.ajax({
					url : "./putcargointocontainer",
					traditional : true,
					data : {
						formData : JSON.stringify($(form).serializeJson()),
						idArray : idArray
					},
					type : "post",
					async : false,
					success : function(data) {
						var result = JSON.parse(data);
						alert(result.msg);
						if (result.success) {
//							$.clearForm($("#cargoIntoContainerform"));
							getCargoIntoContainerGrid(orderid,
									ordercontainercargoid);
						}
					}
				});
				return false;
			}

		});
$('#editNWV').on('hide.bs.modal', function(event) {
	window.location.reload();
});

function deleteCargoIntoContainer(orderContainerDetailID, orderID) {
	if (!confirm("确认删除吗？")) {
		return false;
	}
	var orderContainerCargoID = $("#OrderContainerCargoIDCargoIntoContainer")
			.val();
	$.ajax({
		url : "./deletecargointocontainer",
		data : {
			orderContainerDetailID : orderContainerDetailID
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null) {
				alert(result.msg);
			}
			if (result.success) {
				getCargoIntoContainerGrid(orderID, orderContainerCargoID);
			}
		}
	});
}

function generateSingleManifest(orderID) {
	if (!confirm("确认生成舱单（不分舱）吗？")) {
		return false;
	}
	$.ajax({
		url : "./generatesinglemanifest",
		data : {
			orderID : orderID
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null) {
				alert(result.msg);
			}
			if (result.success) {
				getManifestTotalGrid(orderID);
				getManifestDetailGrid(orderID);
			}
		}
	});
}

function reSplitManifest(orderID) {
	if (!confirm("确认重新分舱吗？")) {
		return false;
	}
	$.ajax({
		url : "./resplitmanifest",
		data : {
			orderID : orderID
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null) {
				alert(result.msg);
			}
			if (result.success) {
				getManifestTotalGrid(orderID);
				getManifestDetailGrid(orderID);
			}
		}
	});
}

function getManifestTotalGrid(orderid) {
	$.ajax({
		url : "./partial_manifesttotalinfo/" + orderid,
		async : false,
		success : function(data) {
			$("#manifestTotalGrid").html(data);
		}
	});
}

function getManifestDetailGrid(orderid) {
	$.ajax({
		url : "./partial_manifestdetailinfo/" + orderid,
		async : false,
		success : function(data) {
			$("#manifestDetailGrid").html(data);
		}
	});
}

function isInt(obj) {
	var regex = /^[1-9]\d*$/;
	if (!regex.test(obj.value)) {
		obj.value = "";
	}
}

function importManifestExcel(orderid) {
	var excelUrl = $('#manifestExcelUrl').val();
	if (excelUrl == '' || excelUrl == null) {
		alert("请上传舱单表");
		return false;
	}
	$.ajax({
		url : "./importmanifestexcel",
		async : false,
		type : "post",
		data : {
			orderID : orderid,
			excelUrl : excelUrl
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success) {
				window.location.reload();
			}
		}
	});

}

function submitManifest(orderid) {
	$.ajax({
		url : "./submitmanifest",
		async : false,
		type : "post",
		data : {
			orderid : orderid
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success) {
				window.location.reload();
			}
		}
	});
}

function saveDeclarediIdentifier(orderid) {
	$.ajax({
		url : "./savedeclarediidentifier",
		async : false,
		type : "post",
		data : {
			orderid : orderid,
			declarediidentifier : $("#DeclarediIdentifier").val()
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);

		}
	});
}

$('#editmanifesttotalinfo').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget);
	var type = button.data('type');
	var modal = $(this);

	$('#ManifestNoForEdit').val(button.data('manifestno'));
	$('#CargoNameENForEdit').val(button.data('cargonameen'));
	$('#CargoNameCNForEdit').val(button.data('cargonamecn'));
	$('#DeclareNoForEdit').val(button.data('declareno'));
	$('#OrderManifestIDForEdit').val(button.data('ordermanifestid'));
});

$("#editmanifesttotalinfoform").validate({
	rules : {
		manifestno : "required",
		cargonameen : "required"

	},
	messages : {
		manifestno : "必填",
		cargonameen : "必填"
	},
	submitHandler : function(form) {

		$.ajax({
			url : "./editmanifesttotalinfosubmit",
			data : $("#editmanifesttotalinfoform").serialize(),
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$('#editmanifesttotalinfo').modal('hide');
					$.clearForm($("#editmanifesttotalinfoform"));
					window.location.reload();
				}
			}
		});

	}
});