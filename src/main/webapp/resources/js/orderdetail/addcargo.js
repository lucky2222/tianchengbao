$(function() {
	var WXP = "109103";// 危险品
	var LCWXP = "109105";// 冷藏危险品
	var TZXH = "109106";// 特种箱货
	var LH = "109104";// 冷货

	$("[name='lb_CargoTypeID']").click(function() {
		var cargocategory = $(this).find("input").val();
		$.RemoveValidationMessage($("#group_Cargo_CargoTypeID").parent(),
				"label", "必填");
		if (cargocategory == WXP) {
			$.clearForm($("[role='reeferinfo']"));
			$.clearForm($("[role='specialinfo']"));
			$("[role='dangerinfo']").show();
			$("[role='reeferinfo']").hide();
			$("[role='specialinfo']").hide();

		} else if (cargocategory == LCWXP) {
			$.clearForm($("[role='specialinfo']"));
			$("[role='dangerinfo']").show();
			$("[role='reeferinfo']").show();
			$("[role='specialinfo']").hide();

		} else if (cargocategory == LH) {
			$.clearForm($("[role='dangerinfo']"));
			$.clearForm($("[role='specialinfo']"));
			$("[role='dangerinfo']").hide();
			$("[role='reeferinfo']").show();
			$("[role='specialinfo']").hide();

		} else if (cargocategory == TZXH) {
			$.clearForm($("[role='dangerinfo']"));
			$.clearForm($("[role='reeferinfo']"));
			$("[role='dangerinfo']").hide();
			$("[role='reeferinfo']").hide();
			$("[role='specialinfo']").show();

		} else {
			$.clearForm($("[role='dangerinfo']"));
			$.clearForm($("[role='reeferinfo']"));
			$.clearForm($("[role='specialinfo']"));
			$("[role='dangerinfo']").hide();
			$("[role='reeferinfo']").hide();
			$("[role='specialinfo']").hide();

		}
			// $.ajax({
			// url : "./loadcarriercargodesc",
			// data : {
			// CargoCategoryID : cargocategory
			// },
			// type : "post",
			// success : function(data) {

			// TODO 加载船公司港口货物说明
			// });
	});

	$("#addCargoform").validate({
		onkeyup : false,
		onclick : false,
		onfocusout : false,
		rules : {

			HSCode : {
				required : true,
				remote : $.getContextPath() + "/entryorder/checkhscode"
			},
			HSCode_HSCode : "required",
			Cargo_NameEN : "required",
			PackageNameEN : {
				required : true,

				remote : $.getContextPath() + "/entryorder/checkpackage"
			},
			Cargo_PkgTypeID : "required",
			Cargo_NameCN : "required",
			Cargo_Number : {
				required : true,
				digits : true
			},
			Cargo_Weight : {
				required : true,
				weight : true
			},
			Cargo_Volume : {
				required : true,
				volume : true
			},
			Cargo_Marks : {
				required : true,
				charEN : true
			},
			Cargo_CargoDes:{
				charEN : true
			},
			
			Cargo_UNNo : "required",
			Cargo_ClassNo : "required",
			Cargo_SetTemperature : "required",
			Cargo_MaxTemperature : "required",
			Cargo_MinTemperature : "required",
			Cargo_VentilateType : "required",
			Cargo_Ventilate : {
				required : true,
				floatnum : true
			},
			Cargo_Humidity : {
				required : true,
				floatnum : true
			},
			Cargo_SetLength : "required",
			Cargo_SetWidth : "required",
			Cargo_SetHeight : "required"

		},
		messages : {

			HSCode : {
				required : "必填",
				remote : "HSCode不存在"
			},
			HSCode_HSCode : "必填",
			Cargo_NameEN : "必填",
			PackageNameEN : {
				required : "必填",
				remote : "包装不存在"
			},
			Cargo_PkgTypeID : "必填",
			Cargo_NameCN : "必填",
			Cargo_Number : {
				required : "必填",
				digits : "必须是整数"
			},
			Cargo_Weight : {
				required : "必填",
				weight : "必须是大于0的整数或小数"
			},
			Cargo_Volume : {
				required : "必填",
				volume : "必须是大于0的整数或小数"
			},
			Cargo_Marks : {
				required : "必填",
				charEN : "必须是字母、数字、符号"
			},
			Cargo_CargoDes:{
				charEN : "必须是字母、数字、符号"
			},
			
			Cargo_UNNo : "必填",
			Cargo_ClassNo : "必填",
			Cargo_SetTemperature : "必填",
			Cargo_MaxTemperature : "必填",
			Cargo_MinTemperature : "必填",
			Cargo_VentilateType : "必填",
			Cargo_Ventilate : {
				required : "必填",
				floatnum : "必须是整数或一位小数"
			},
			Cargo_Humidity :{
				required : "必填",
				floatnum : "必须是整数或一位小数"
			},
			Cargo_SetLength : "必填",
			Cargo_SetWidth : "必填",
			Cargo_SetHeight : "必填"

		},
		submitHandler : function(form) {
			var flag = true;
			if ($('input[name="Cargo_CargoTypeID"]:checked').val() == undefined) {
				flag = false;
				if ($("#group_Cargo_CargoTypeID").parent()
						.find("label:contains('必填')").length == 0) {
					$("#group_Cargo_CargoTypeID").parent()
							.append("<label>必填</label>");
				}
			}

			if (!flag)
				return;
			$.ajax({
						type : "POST",
						url : $.getContextPath()
								+ "/orderdetail/checkordercargoexist",
						async : false,
						data : {
							content : JSON.stringify($("#addCargoform")
									.serializeJson()),
							orderid : $("#orderid").text()

						},
						success : function(result) {
							if (result.substr(0, 1) == '0') {
								$.ajax({
											type : "POST",
											url : $.getContextPath()
													+ "/orderdetail/addordercargo",
											async : false,
											data : {
												content : JSON
														.stringify($("#addCargoform")
																.serializeJson()),
												orderid : $("#orderid").text()
											},
											success : function(data) {
												$("#closeaddCargoModal")
														.click();
												$("#cargo").html(data);
											}

										});
							} else {
								alert(result.substr(1, result.length));
							}
						}

					});
		}
	});

	$('#addCargo').on('hide.bs.modal', function(event) {
				$("#addCargo-body").empty();
			});

	$('#deleteCargo').on('hide.bs.modal', function(event) {
				$("#deleteCargo-body").empty();
			});

	$("#deleteCargoform").validate({

		submitHandler : function(form) {
			$.ajax({
						type : "POST",
						url : $.getContextPath()
								+ "/orderdetail/deleteordercargo",
						async : false,
						data : {
							content : JSON.stringify($("#deleteCargoform")
									.serializeJson()),
							orderid : $("#orderid").text()
						},
						success : function(data) {
							$("#closeaddCargoModal").click();
							$("#cargo").html(data);
						}

					});
		}
	});

	$("#editCargoform").validate({
		onkeyup : false,
		onclick : false,
		onfocusout : false,
		rules : {

			HSCode : {
				required : true,
				remote : $.getContextPath() + "/entryorder/checkhscode"
			},
			HSCode_HSCode : "required",
			Cargo_NameEN : "required",
			PackageNameEN : {
				required : true,

				remote : $.getContextPath() + "/entryorder/checkpackage"
			},
			Cargo_PkgTypeID : "required",
			Cargo_NameCN : "required",
			Cargo_Number : {
				required : true,
				digits : true
			},
			Cargo_Weight : {
				required : true,
				weight : true
			},
			Cargo_Volume : {
				required : true,
				volume : true
			},
			Cargo_Marks : "required",
			Cargo_CargoDes : "required",
			Cargo_UNNo : "required",
			Cargo_ClassNo : "required",
			Cargo_SetTemperature : "required",
			Cargo_MaxTemperature : "required",
			Cargo_MinTemperature : "required",
			Cargo_VentilateType : "required",
			Cargo_Ventilate : "required",
			Cargo_Humidity : "required",
			Cargo_SetLength : "required",
			Cargo_SetWidth : "required",
			Cargo_SetHeight : "required"

		},
		messages : {

			HSCode : {
				required : "必填",
				remote : "HSCode不存在"
			},
			HSCode_HSCode : "必填",
			Cargo_NameEN : "必填",
			PackageNameEN : {
				required : "必填",
				remote : "包装不存在"
			},
			Cargo_PkgTypeID : "必填",
			Cargo_NameCN : "必填",
			Cargo_Number : {
				required : "必填",
				digits : "必须是整数"
			},
			Cargo_Weight : {
				required : "必填",
				weight : "必须是大于0的整数或小数"
			},
			Cargo_Volume : {
				required : "必填",
				volume : "必须是大于0的整数或小数"
			},
			Cargo_Marks : "必填",
			Cargo_CargoDes : "必填",
			Cargo_UNNo : "必填",
			Cargo_ClassNo : "必填",
			Cargo_SetTemperature : "必填",
			Cargo_MaxTemperature : "必填",
			Cargo_MinTemperature : "必填",
			Cargo_VentilateType : "必填",
			Cargo_Ventilate : "必填",
			Cargo_Humidity : "必填",
			Cargo_SetLength : "必填",
			Cargo_SetWidth : "必填",
			Cargo_SetHeight : "必填"

		},
		submitHandler : function(form) {
			var flag = true;
			if ($('input[name="Cargo_CargoTypeID"]:checked').val() == undefined) {
				flag = false;
				if ($("#group_Cargo_CargoTypeID").parent()
						.find("label:contains('必填')").length == 0) {
					$("#group_Cargo_CargoTypeID").parent()
							.append("<label>必填</label>");
				}
			}

			if (!flag)
				return;

			$.ajax({
						type : "POST",
						url : $.getContextPath() + "/orderdetail/editordercargo",
						async : false,
						data : {
							content : JSON.stringify($("#editCargoform")
									.serializeJson()),
							orderid : $("#orderid").text()
						},
						success : function(data) {
							$("#closeaddCargoModal").click();
							$("#cargo").html(data);
						}

					});

		}
	});
});