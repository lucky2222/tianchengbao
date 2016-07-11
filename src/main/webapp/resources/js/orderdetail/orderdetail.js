$(function() {

	$('#shutoutreason').on('show.bs.modal', function(event) {
				$("#ShutOutReason").val("");
			});
	$("#submitshutoutreason").click(function() {

		var shutoutreason = $("#ShutOutReason").val().trim();
		if (shutoutreason.length == 0) {
			alert("请填写退关原因");
			return false;
		} else {

			$.ajax({
						type : "POST",
						url : $.getContextPath() + "/orderdetail/shutout",
						data : {
							orderid : $("#orderid").text(),
							ShutOutReason : $("#ShutOutReason").val().trim()
						},
						async : false,
						success : function(data) {
							if (data.substr(0, 1) == '0') {
								location.href = $.getContextPath()
										+ data.substr(1, data.length);
							} else {
								alert(data.substr(1, data.length));
							}
						}

					});
		}
	});

	$('#templateremark').on('show.bs.modal', function(event) {
				$("#template_remark").val("");
			});

	$("#submittemplateremark").click(function() {

		var remark = $("#template_remark").val().trim();
		if (remark.length == 0) {
			alert("请填写模板名称及备注");
			return false;
		} else {

			$.ajax({
						type : "POST",
						url : $.getContextPath()
								+ "/orderdetail/copytotemplate",
						data : {
							orderid : $("#orderid").text(),
							remark : remark
						},
						async : false,
						success : function(data) {
							if (data.substr(0, 1) == '0') {
								location.href = $.getContextPath()
										+ data.substr(1, data.length);
							} else {
								alert(data.substr(1, data.length));
							}
						}

					});
		}
	});

	$('#suspendedreason').on('show.bs.modal', function(event) {
				$("#SuspendedRemark").val("");
			});
	$("#submitsuspendedreason").click(function() {

		var suspendedremark = $("#SuspendedRemark").val().trim();
		if (suspendedremark.length == 0) {
			alert("请填写挂起备注");
		} else {

			$.ajax({
						type : "POST",
						url : $.getContextPath() + "/orderdetail/suspended",
						data : {
							orderid : $("#orderid").text(),
							SuspendedRemark : $("#SuspendedRemark").val()
									.trim()
						},
						async : false,
						success : function(data) {
							if (data.substr(0, 1) == '0') {
								location.href = $.getContextPath()
										+ data.substr(1, data.length);
							} else {
								alert(data.substr(1, data.length));
							}
						}

					});
		}
	});

	$("#fastredirect").click(function() {

		var orderid = $("#fastorderid").val().trim();
		if (orderid.length == 0) {
			alert("请输入委托编号");
		} else {
			$.ajax({
						type : "POST",
						url : $.getContextPath() + "/orderdetail/checkorderid",
						data : {
							orderid : orderid
						},
						async : false,
						success : function(data) {
							if (data == '1') {
								location.href = $.getContextPath()
										+ "/orderdetail/index/" + orderid;
							} else {
								alert("请输入正确的委托编号");
							}
						}

					});
		}
	});

	$("#editwaipeicompany").click(function() {
				var waipeicompanyid = $(this).data("id") + "";
				if (waipeicompanyid.length > 0)
					$("#WaiPeiCompanyID").val(waipeicompanyid);
				else
					$("#WaiPeiCompanyID").val("");
				if ($("#lb_waipeicompanyname").text().trim() != "暂无")
					$("#CompanyName").val($("#lb_waipeicompanyname").text()
							.trim());
				else
					$("#CompanyName").val("");
				$("#editwaipeicompanymodal").modal("show");
			});

	$("#submiteditwaipeicompanymodal").click(function() {
		var waipeicompanyid = $("#WaiPeiCompanyID").val().trim();
		var waipeicompanyname = $("#CompanyName").val().trim();
		var orderid = $("#orderid").text();
		$.ajax({
					type : "POST",
					url : $.getContextPath() + "/orderdetail/editwaipeicompany",
					data : {
						orderid : orderid,
						waipeicompanyid : waipeicompanyid
					},
					async : false,
					success : function(data) {
						if (data.substr(0, 1) == '0') {
							if (waipeicompanyname.length > 0) {
								$("#lb_waipeicompanyname")
										.text(waipeicompanyname);
								$("#editwaipeicompany").attr("data-id",
										waipeicompanyid);
							}

							else {
								$("#lb_waipeicompanyname").text("暂无");
								$("#editwaipeicompany").attr("data-id", "");
							}
							$("#closeeditwaipeicompanymodal").click();
						} else {
							alert(data.substr(1, data.length));
						}
					}

				});
	})

	$("#btn_updatepackinginfo").click(function() {
		var orderid = $("#orderid").text();
		$.ajax({
					type : "GET",
					url : $.getContextPath() + "/orderdetail/updatepackinginfo",
					data : {
						orderid : orderid
					},
					async : false,
					success : function(data) {
						$("#packinginfo").html(data);
						$("#updatepackinginfo").modal('show');
					}
				});
	});

	$('#updatepackinginfo').on('hide.bs.modal', function(event) {
				$("#packinginfo").empty();
			});

	$('#expressapprovalmodal').on('show.bs.modal', function(event) {
				$.ajax({
							type : "POST",
							url : $.getContextPath()
									+ "/orderdetail/expressapproval",
							data : {
								orderid : $("#orderid").text()
							},
							async : false,
							success : function(data) {
								$("#expressapproval-body").html(data);
							}

						});
			});

	$('#carriertipsmodal').on('show.bs.modal', function(event) {
				$.ajax({
							type : "GET",
							url : $.getContextPath()
									+ "/orderdetail/carriertips",
							data : {
								orderid : $("#orderid").text()
							},
							async : false,
							success : function(data) {
								$("#carriertips-body").html(data);
							}

						});
			});

	$('#carriertipsmodal').on('hide.bs.modal', function(event) {
				$("#carriertips-body").empty();
			});

	$('#uploadfeeconfirmmodal').on('show.bs.modal', function(event) {
		var orderid = $("#orderid").text();
		$.ajax({
					type : "GET",
					url : $.getContextPath() + "/orderdetail/uploadfeeconfirm/"
							+ orderid,

					async : false,
					success : function(data) {
						$("#uploadfeeconfirm-body").html(data);
					}

				});
	});

	$('#uploadfeeconfirmmodal').on('hide.bs.modal', function(event) {
				$("#uploadfeeconfirm-body").empty();
			});
});

function loadaddcontainermodal() {
	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderdetail/checkorderapproved",
				async : false,
				data : {
					orderid : $("#orderid").text(),
					tradetype : "8211_8213_8214"
				},
				success : function(result) {
					var jsondata = JSON.parse(result);
					if (jsondata.success == true) {
						$.ajax({
									type : "POST",
									url : $.getContextPath()
											+ "/orderdetail/loadaddcontainermodal",
									data : {
										orderid : $("#orderid").text()
									},
									success : function(data) {
										$("#addContainer-body").html(data);
										$("#addContainer").modal('show');
									}

								});
					} else {
						alert(jsondata.msg);
					}
				}
			});

}

function loadeditcontainermodal(obj) {

	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderdetail/checkorderapproved",
				async : false,
				data : {
					orderid : $("#orderid").text(),
					tradetype : "8211_8213_8214"
				},
				success : function(result) {
					var jsondata = JSON.parse(result);
					if (jsondata.success == true) {
						$.ajax({
									type : "POST",
									url : $.getContextPath()
											+ "/orderdetail/loadeditcontainermodal",
									async : false,
									data : {
										orderid : $("#orderid").text(),
										ordercontainerid : $(obj).data('id')
									},
									success : function(data) {
										$("#editContainer-body").html(data);
										$("#editContainer").modal('show');
									}

								});
					} else {
						alert(jsondata.msg);
					}
				}
			});

}

function deletecontainermodal(obj) {

	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderdetail/checkorderapproved",
				async : false,
				data : {
					orderid : $("#orderid").text(),
					tradetype : "8211_8213_8214"
				},
				success : function(result) {
					var jsondata = JSON.parse(result);
					if (jsondata.success == true) {
						$.ajax({
									type : "POST",
									url : $.getContextPath()
											+ "/orderdetail/loaddelcontainermodal",
									data : {
										ordercontainerid : $(obj).data('id')
									},
									success : function(data) {
										$("#deleteContainer-body").html(data);
										$("#deleteContainer").modal('show');
									}

								});
					} else {
						alert(jsondata.msg);
					}
				}
			});

}

function loadaddcargomodal() {
	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderdetail/loadaddcargomodal",
				data : {
					orderid : $("#orderid").text()
				},
				success : function(data) {
					$("#addCargo-body").html(data);
					$("#addCargoLabel").text("新增货物信息");
					$("#submitaddcargo").attr("form", "addCargoform");
					$("#submitaddcargo").attr("type", "submit");
					$("#submitaddcargo").text("新增");
					$("#addCargo").modal('show');
				}

			});
}

function deletecargomodal(obj) {

	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderdetail/loaddelcargomodal",
				data : {
					ordercargoid : $(obj).data('id')
				},
				success : function(data) {
					$("#addCargo-body").html(data);
					$("#addCargoLabel").text("删除货物信息");
					$("#submitaddcargo").attr("form", "deleteCargoform");
					$("#submitaddcargo").attr("type", "submit");
					$("#submitaddcargo").text("删除");
					$("#addCargo").modal('show');
				}

			});
}

function editcargomodal(obj) {
	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderdetail/loadeditcargomodal",
				data : {
					ordercargoid : $(obj).data('id'),
					orderid : $("#orderid").text()
				},
				success : function(data) {
					$("#addCargo-body").html(data);
					$("#addCargoLabel").text("修改货物信息");
					$("#submitaddcargo").attr("form", "editCargoform");
					$("#submitaddcargo").attr("type", "submit");
					$("#submitaddcargo").text("修改");
					$("#addCargo").modal('show');

				}

			});
}

function checkepressaddress(type) {
	var content = null;
	if (type == "ladingbill")
		content = JSON.stringify($("#LbExpressform").serializeJson());
	else
		content = JSON.stringify($("#IvExpressform").serializeJson());

	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderdetail/checkexpressaddress",
				data : {
					content : content,
					orderid : $("#orderid").text()
				},
				async : false,
				success : function(data) {
					$("#expressapproval-body").html(data);
				}

			});
}
