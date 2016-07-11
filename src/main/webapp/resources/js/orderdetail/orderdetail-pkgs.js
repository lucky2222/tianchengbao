$(function() {
	$('#Pkgs_Date').datetimepicker({
				format : 'yyyy-mm-dd hh:ii',
				autoclose: true,
				startDate : new Date(),
				initialDate : new Date()
			});

	// 装箱方式增删改
	$('#addContainerPkgs').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var type = button.data('type');
		var modal = $(this);

		if (type == "add") {

			modal.find('.modal-title').text("新增装箱方式");
			$("#op_Pkgs").text("新增");
			$("#op_Pkgs").attr("operatetype", "add");
			$("#OrderContainerPkgsID").val("");
			$("#hide_pkgsid").val("");
			$("#Pkgs_ContainerPkgTypeID").get(0).selectedIndex = 0;
			$("#Pkgs_Contact").val("");
			$("#Pkgs_Tel").val("");
			$("#Pkgs_TrailerAddress").val("");
			$("#Pkgs_PkgRemark").val("");
			$("#Pkgs_Date").val("");
			$("#Pkgs_URL").val("");
			$("#div_Pkgs_Contact").hide();
			$("#div_Pkgs_Tel").hide();
			$("#div_Pkgs_TrailerAddress").hide();
			$("#div_Pkgs_PkgRemark").hide();
			$("#div_Pkgs_Date").hide();
			$("#div_Pkgs_URL").hide();
			if ($("#Pkgs_Date").parent().find("label").length > 0)
				$("#Pkgs_Date").parent().find("label").remove();

		} else if (type == "update") {
			modal.find('.modal-title').text("修改装箱方式");
			$('#op_Pkgs').text("修改");
			$('#op_Pkgs').attr("operatetype", "update");
			$("#OrderContainerPkgsID").val("");
			$("#hide_pkgsid").val("");
			$("#Pkgs_ContainerPkgTypeID").get(0).selectedIndex = 0;
			$("#Pkgs_Contact").val("");
			$("#Pkgs_Tel").val("");
			$("#Pkgs_TrailerAddress").val("");
			$("#Pkgs_PkgRemark").val("");
			$("#Pkgs_Date").val("");
			$("#Pkgs_URL").val("");
			$("#div_Pkgs_Contact").hide();
			$("#div_Pkgs_Tel").hide();
			$("#div_Pkgs_TrailerAddress").hide();
			$("#div_Pkgs_PkgRemark").hide();
			$("#div_Pkgs_Date").hide();
			$("#div_Pkgs_URL").hide();
			if ($("#Pkgs_Date").parent().find("label").length > 0)
				$("#Pkgs_Date").parent().find("label").remove();
			$("#Pkgs_OrderContainerPkgsID").val(button.data('id'));
			if (button.data('containerpkgtypeid') == "116103") {
				$("#Pkgs_ContainerPkgTypeID").val("116103");
			} else {
				$.ajax({
							url : $.getContextPath()
									+ "/orderdetail/loadordercontainerpkgs",
							type : "post",
							data : {
								ordercontainerpkgsid : button.data('id')
							},
							async : false,
							error : function(request) {
								alert("出错了!");
							},
							success : function(data) {
								if (data != null && data.length > 0) {
									var updateitem = JSON.parse(data);
									$("#div_Pkgs_Contact").show();
									$("#div_Pkgs_Tel").show();
									$("#div_Pkgs_TrailerAddress").show();
									$("#div_Pkgs_PkgRemark").show();
									$("#div_Pkgs_Date").show();
									$("#div_Pkgs_URL").show();
									if (updateitem != null) {
										$.each(updateitem, function(k, v) {
													if ($("#Pkgs_" + k).length > 0) {

														if (k == "URLName") {
															$("#Pkgs_" + k)
																	.text(v);
															$("#Pkgs_" + k)
																	.attr(
																			"href",
																			updateitem["URLNameDownLoad"]);
														} else {

															$("#Pkgs_" + k)
																	.val(v);
														}
													}
												});
									}

								}
							}
						});
			}
			/*
			 * $("#Pkgs_ContainerPkgTypeID")
			 * .val(button.data('containerpkgtypeid'));
			 * $("#Pkgs_Contact").val(button.data('contact'));
			 * $("#Pkgs_Tel").val(button.data('tel'));
			 * $("#Pkgs_TrailerAddress").val(button.data('traileraddress'));
			 * $("#Pkgs_Date").val(button.data('date'));
			 * $("#Pkgs_PkgRemark").val(button.data('pkgremark')); if
			 * (button.data('url') != 'undefined')
			 * $("#Pkgs_URL").val(button.data('url')); if
			 * (button.data('urlname') != 'undefined')
			 * $("#Pkgs_URLName").text(button.data('urlname')); if
			 * (button.data('urlnamedownload') != 'undefined')
			 * $("#Pkgs_URLName").attr("href", button.data('urlnamedownload'));
			 */

		}
	});

	$("#Pkgs_ContainerPkgTypeID").change(function() {
		if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "自装自集港") {
			$("#div_Pkgs_Contact").hide();
			$("#div_Pkgs_Tel").hide();
			$("#div_Pkgs_TrailerAddress").hide();
			$("#div_Pkgs_Date").hide();
			$("#div_Pkgs_PkgRemark").hide();
			$("#div_Pkgs_URL").hide();
			$("#Pkgs_URL").val("");
			$("#Pkgs_URLName").text("");
			$("#Pkgs_URLName").attr("href", "javascript:void(0)");
			if ($("#Pkgs_Date").parent().find("label").length > 0)
				$("#Pkgs_Date").parent().find("label").remove();
		} else if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "堆场装箱") {
			$("#div_Pkgs_Contact").show();
			$("#div_Pkgs_Tel").show();
			$("#div_Pkgs_TrailerAddress").show();
			$("#div_Pkgs_PkgRemark").show();
			$("#div_Pkgs_Date").show();
			$("#div_Pkgs_URL").show();
			$("#lb_Pkgs_Date").text("堆装日期:");
			$("#lb_Pkgs_URL").text("堆装文件:");
			$("#lb_Pkgs_PkgRemark").text("堆装要求:");
			if ($("#Pkgs_Date").parent().find("label").length > 0)
				$("#Pkgs_Date").parent().find("label").remove();
			var html = document.getElementById('uploadPkgsSpan').innerHTML;
			document.getElementById('uploadPkgsSpan').innerHTML = html;
			$("#Pkgs_URL").val("");
			$("#Pkgs_URLName").text("");
			$("#Pkgs_URLName").attr("href", "javascript:void(0)");

		} else if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "产地装箱(自装代集港)") {
			$("#div_Pkgs_Contact").show();
			$("#div_Pkgs_Tel").show();
			$("#div_Pkgs_TrailerAddress").show();
			$("#div_Pkgs_PkgRemark").show();
			$("#div_Pkgs_Date").show();
			$("#div_Pkgs_URL").show();
			$("#lb_Pkgs_Date").text("产装日期:");
			$("#lb_Pkgs_URL").text("产装文件:");
			$("#lb_Pkgs_PkgRemark").text("产装要求:");
			if ($("#Pkgs_Date").parent().find("label").length > 0)
				$("#Pkgs_Date").parent().find("label").remove();
			var html = document.getElementById('uploadPkgsSpan').innerHTML;
			document.getElementById('uploadPkgsSpan').innerHTML = html;
			$("#Pkgs_URL").val("");
			$("#Pkgs_URLName").text("");
			$("#Pkgs_URLName").attr("href", "javascript:void(0)");
		}
	});

	$("#op_Pkgs").click(function() {

		var flag = true;
		if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "自装自集港") {
			if ($("#tb_containerpkgs").find("td:contains('自装自集港')").length>0) {
				alert("已存在自装自集港");
				flag = false;
				return false;
			}
		}

		if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "堆场装箱") {
			if ($("#Pkgs_Date").val().trim().length == 0) {
				$("#Pkgs_Date").focus();
				if ($("#Pkgs_Date").parent().find("label").length == 0) {
					$("#Pkgs_Date").parent().append("<label>必填</label>");
				}
				flag = false;
				return false;
			}
		}
		if (!flag)
			return;
		if ($('#op_Pkgs').attr("operatetype") == 'add') {

			$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderdetail/addordercontainerpkgs",
				data : {
					content : JSON.stringify($("#addContainerPkgsform")
							.serializeJson()),
					orderid : $("#orderid").text()
				},
				success : function(data) {
					$("#closeContainerPkgsModal").click();
					$("#containerpkgs").html(data);
				}

			});
		} else if ($('#op_Pkgs').attr("operatetype") == 'update') {

			$.ajax({
				type : "POST",
				url : $.getContextPath()
						+ "/orderdetail/checkladingcontainerurlexist",
				async : false,
				data : {
					orderid : $("#orderid").text()
				},
				success : function(result) {

					if (result == "1") {
						$.ajax({
									type : "POST",
									url : $.getContextPath()
											+ "/orderdetail/editordercontainerpkgs",
									async : false,
									data : {
										content : JSON
												.stringify($("#addContainerPkgsform")
														.serializeJson()),
										orderid : $("#orderid").text()
									},
									success : function(data) {
										$("#closeContainerPkgsModal").click();
										$("#containerpkgs").html(data);
									}

								});
					} else {
						alert("现阶段已不能修改装箱明细");
					}
				}
			});
		}
	});

});

function PkgsUpload() {
	var val = $("#PkgsFileUpload").val();
	if (val == null || val == "") {
		alert("请选择上传装箱文件");
		return;
	}

	$.ajaxFileUpload({

				url : $.getContextPath() + "/packingorder/uploadpkgsfile",
				secureuri : false,
				fileElementId : "PkgsFileUpload",// file控件id
				dataType : "json",
				success : function(data) {
					$("#Pkgs_URL").val(data.fileurl);
					$("#Pkgs_URLName").text(data.oldfilename);
					$("#Pkgs_URLName").attr(
							"href",
							"/packingorder/downloadLbFile/" + data.dirname
									+ "/" + encodeURI(encodeURI(data.filename))
									+ "/" + data.suffix);
					var html = document.getElementById('uploadPkgsSpan').innerHTML;
					document.getElementById('uploadPkgsSpan').innerHTML = html;
				},
				error : function(data, status, e) {
					alert(e);
				}
			});
}

function deletecontainerpkgs(ordercontainerpkgsid) {

	$.ajax({
				type : "POST",
				url : $.getContextPath()
						+ "/orderdetail/checkcontainerpkgsbeforedel",
				data : {
					ordercontainerpkgsid : ordercontainerpkgsid,
					orderid : $("#orderid").text()
				},
				success : function(data) {
					if (data == "1") {
						$("#hidden_deletecontainerpkgs").val(ordercontainerpkgsid);
						$("#deletecontainerpkgsmodal").modal('show');
					} else if (data == "2") {
						alert("现阶段已不能删除装箱明细");
					} else {
						alert("删除该装箱明细请先删除其箱型");
					}
				}

			});
}

function submitdeletecontainerpkgs(obj) {
	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderdetail/deletecontainerpkgs",
				data : {
					ordercontainerpkgsid : $("#hidden_deletecontainerpkgs")
							.val(),
					orderid : $("#orderid").text()
				},
				success : function(data) {
					$("#closesdeletecontainerpkgsmodal").click();
					$("#containerpkgs").html(data);
				}

			});
}
