$('#editVVE').on('shown.bs.modal', function(event) {
	var button = $(event.relatedTarget);
	var type = button.data('type');
	var modal = $(this);
	$("[name*='etd']").datepicker({
		dateFormat : "yy-mm-dd"
	// 在这里进行插件的属性设置

	});

	$('#etc').datetimepicker({
		format : 'yyyy-mm-dd hh:ii',
		autoclose : true,
		//startDate : new Date(),
		initialDate : new Date()
	});
	// $('#carrierid').val(button.data('carrierid'));
	$('#carriernameen').text(button.data('carriernameen'));
	$('#Vessel_cs').val(button.data('vessel'));
	$('#voyage').val(button.data('voyage'));
	$('#vesselcn').val(button.data('vesselcn'));
	$('#etd').val(button.data('etd'));
	$('#dock').val(button.data('dock'));
	$('#seid').val(button.data('seaexpressloadid'));
	$('#etc').val(button.data('etc'));
	if (type == "shipgrid") {
		$('#operate').attr("operatetype", "shipgrid");
	}
	if (type == "fastquery") {
		$('#operate').attr("operatetype", "fastquery");
	}
});
$('#refusemodal').on('hide.bs.modal', function(event) {
	$("#hidden_orderid").val("");
	$("#hidden_tradetype").val("");
	$("#hidden_ori_tradeid").val("");
	$("#ApproveRemark").val("");
});
$("#editvveform").validate({
	rules : {
		vessel : "required",
		voyage : "required",
		vesselcn : "required",
		etd : "required"
	},
	messages : {
		vessel : "必填",
		voyage : "必填",
		vesselcn : "必填",
		etd : "必填"
	},
	submitHandler : function(form) {

		$.ajax({
			url : "./editvve",
			data : $("#editvveform").serialize(),
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$('#editVVE').modal('hide');
					// window.location.reload();
					$("#btnSubmit").submit();
					// if ($('#operate').attr("operatetype") == 'shipgrid') {
					// $("#formshipgrid").submit();
					// }
					// if ($('#operate').attr("operatetype") == 'fastquery') {
					// $("#formorderlistfastquery").submit();
					// }
				}
			}
		});

	}
});

$('#changeShip').on(
		'show.bs.modal',
		function(event) {
			var button = $(event.relatedTarget);
			var modal = $(this);
			var type = button.data('type');
			$("#etdcs").datepicker({
				dateFormat : "yy-mm-dd"
			// 在这里进行插件的属性设置

			});

			if (type == "book") {
				$('#polnamecs').text(button.data('polname'));
				$('#podnamecs').text(button.data('podname'));
				$('#podidcs').val(button.data('podid'));
				$('#etdcs').val(button.data('etd'));
				modal.find('.modal-title').text(
						"换船订舱" + button.data('polname') + " 到 "
								+ button.data('podname'));
				$('#polidcs').val(button.data('polid'));
			}
			if (type == "newvoy") {
				$('#polrpidcs').val(button.data('polrpid'));
				$('#podrpidcs').val(button.data('podrpid'));
				$('#routelineidcs').val(button.data('routelineid'));
				$('#etdcs').val(button.data('etd'));
				$('#changeshiptype').val("newvoy");
				modal.find('.modal-title').text("转航次");
				$("#PortNameEN2div").hide();
				$("#PortNameEN2Lbl").hide();
				$("#etdcslbl").show();
				$("#etdcsdiv").show();
			}
			if (type == "detail") {
				$('#polseidcs').val(button.data('polseid'));
				$('#changeshiptype').val("detail");
				modal.find('.modal-title').text("改港");
				$("#PortNameEN2div").show();
				$("#PortNameEN2Lbl").show();
				$("#etdcslbl").hide();
				$("#etdcsdiv").hide();
			}
			$('#carrieridcs').val(button.data('carrierid'));
			$('#orderidcs').val(button.data('orderid'));
			$('#formchangeshipgrid').submit(
					function() {
						ajax_page_init($("#changeshipgridlist"), "", $(this)
								.serialize());
						return false;
					});
		});

function changeshipsubmit(carrierid, polseid, podseid, transferrpid,
		deliveryrpid, routelineid) {
	if (!confirm("确定换船吗？")) {
		return false;
	}
	var orderid = $("#orderidcs").val();
	var changeshiptype = $("#changeshiptype").val();
	$.ajax({
		type : 'POST',
		url : "/orderbook/changeshipsubmit",
		traditional : true,
		data : {
			orderid : orderid,
			carrierid : carrierid,
			polseid : polseid,
			podseid : podseid,
			transferrpid : transferrpid,
			deliveryrpid : deliveryrpid,
			routelineid : routelineid,
			changeshiptype : changeshiptype
		},
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success) {
				$('#changeShip').modal('hide');
				if (changeshiptype == "detail" || changeshiptype == "newvoy") {

					location.reload();
				} else {
					$("#btnSubmit").submit();
				}
			}

		}
	});
}

$('#sendMsgToSales').on('show.bs.modal', function(event) {
	var orderIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			orderIDList.push(this.value);
		}
	});
	$("input[name='cb_orderid']").each(function() {
		if (this.checked) {
			orderIDList.push(this.value);
		}
	});

	if (orderIDList.length == 0) {
		alert("请选择委托");
		return event.preventDefault();
	}
});

$("#sendmsgtosalesform").validate({
	rules : {
		msgcontent : "required"
	},
	messages : {
		msgcontent : "必填"
	},
	submitHandler : function(form) {
		var orderIDList = new Array();

		$("input[name='select']").each(function() {
			if (this.checked) {
				orderIDList.push(this.value);
			}
		});
		$("input[name='cb_orderid']").each(function() {
			if (this.checked) {
				orderIDList.push(this.value);
			}
		});
		if (orderIDList.length == 0) {
			alert("请选择委托");
			return false;
		}
		$.ajax({
			url : "./sendmsgtosalessubmit",
			traditional : true,
			data : {
				formData : JSON.stringify($(form).serializeJson()),
				orderIDList : orderIDList
			},
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#sendmsgtosalesform"));
					$('#sendMsgToSales').modal('hide');
					// $("#formorderlistgrid").submit();
					// window.location.reload();
					$("#btnSubmit").submit();
				}
			}
		});
		return false;

	}
});

$('#changeTempShip').on('show.bs.modal', function(event) {
	$("#etdcst").datepicker({
		dateFormat : "yy-mm-dd"
	// 在这里进行插件的属性设置
	});
	var orderIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			orderIDList.push(this.value);
		}
	});
	$("input[name='cb_orderid']").each(function() {
		if (this.checked) {
			orderIDList.push(this.value);
		}
	});
	if (orderIDList.length == 0) {
		alert("请选择委托");
		return event.preventDefault();
	}
	$('#formchangetempshipgrid').submit(function() {
		ajax_page_init($("#changetempshipgridlist"), "", $(this).serialize());
		return false;
	});
});

function createTempShip() {
	var orderIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			orderIDList.push(this.value);
		}
	});
	$("input[name='cb_orderid']").each(function() {
		if (this.checked) {
			orderIDList.push(this.value);
		}
	});
	if (orderIDList.length == 0) {
		alert("请选择委托");
		return false;
	}

	var vessel = $("#vesselcst").val();
	var vesselcn = $("#vesselcncst").val();
	var voyage = $("#voyagecst").val();
	var etd = $("#etdcst").val();

	if (vessel == null || vessel == '') {
		alert("请录入船名");
		return false;
	}
	if (vesselcn == null || vesselcn == '') {
		alert("请录入中文船名");
		return false;
	}
	if (voyage == null || voyage == '') {
		alert("请录入航次");
		return false;
	}
	if (etd == null || etd == '') {
		alert("请录入开航日");
		return false;
	}

	$.ajax({
		url : "./createTempShip",
		traditional : true,
		data : {
			vessel : vessel,
			vesselcn : vesselcn,
			voyage : voyage,
			etd : etd,
			orderIDList : orderIDList
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null && result.msg != "") {
				alert(result.msg);
			}
			if (result.success) {
				$("#formchangetempshipgrid").submit();
			}
		}
	});
	return false;

}

function changetempshipsubmit(routelineid) {
	var orderIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			orderIDList.push(this.value);
		}
	});
	$("input[name='cb_orderid']").each(function() {
		if (this.checked) {
			orderIDList.push(this.value);
		}
	});
	if (orderIDList.length == 0) {
		alert("请选择委托");
		return false;
	}

	$.ajax({
		url : "./changetempshipsubmit",
		traditional : true,
		data : {
			routelineid : routelineid,
			orderIDList : orderIDList
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null && result.msg != "") {
				alert(result.msg);
			}
			if (result.success) {
				$.clearForm($("#formchangetempshipgrid"));
				$('#changeTempShip').modal('hide');
				// $("#formorderlistgrid").submit();
				// window.location.reload();
				$("#btnSubmit").submit();
			}
		}
	});
	return false;
}

function ApproveTradeType(orderid, tradetype, ori_tradeid) {

	$.ajax({
		type : "POST",
		url : $.getContextPath() + "/orderapprove/approvetradetype",
		data : {
			orderid : orderid,
			tradetype : tradetype,
			ori_tradeid : ori_tradeid
		},
		async : false,
		success : function(result) {
			var data = JSON.parse(result);
			if (data.success == true) {
				$('form').submit();
			} else {
				alert(data.msg);
			}
		}

	});

}

function RefuseTradeType(orderid, tradetype, ori_tradeid) {
	$("#hidden_orderid").val(orderid);
	$("#hidden_tradetype").val(tradetype);
	$("#hidden_ori_tradeid").val(ori_tradeid);
	$("#refusemodal").modal('show');
}

function submitrefusetradetype() {

	if ($("#ApproveRemark").val().trim().length == 0) {
		alert("请必须输入拒绝原因");
		return false;
	}

	$.ajax({
		type : "POST",
		url : $.getContextPath() + "/orderapprove/refusetradetype",
		data : {
			orderid : $("#hidden_orderid").val(),
			tradetype : $("#hidden_tradetype").val(),
			ori_tradeid : $("#hidden_ori_tradeid").val(),
			approveremark : $("#ApproveRemark").val().trim()
		},
		async : false,
		success : function(result) {

			var data = JSON.parse(result);
			if (data.success == true) {
				$("#refusemodal").modal('hide');
				$('form').submit();
			} else {
				alert(data.msg);
			}
		}

	});
}