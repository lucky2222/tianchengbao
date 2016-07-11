$(function() {
	var WXP = "109103";// 危险品
	var LCWXP = "109105";// 冷藏危险品
	var TZXH = "109106";// 特种箱货
	var LH = "109104";// 冷货

	$("[name='lb_Container_CargoTypeID']").click(function() {

		var cargocategory = $(this).find("input").val();
		if ($("#Container_DangerLvl").parent().find("label").length > 0)
			$("#Container_DangerLvl").parent().find("label").remove();
		if ($("#Container_Amount").parent().find("label").length > 0)
			$("#Container_Amount").parent().find("label").remove();

		if (cargocategory == WXP || cargocategory == LCWXP) {
			$("#div_Container_DangerLvl").show();
			$("#Container_DangerLvl").attr("disabled", false);
		} else {
			$("#div_Container_DangerLvl").hide();
			$("#Container_DangerLvl").get(0).selectedIndex = 0;
			$("#Container_DangerLvl").attr("disabled", "disabled");
		}
		$.ajax({
			url : $.getContextPath() + "/entryorder/loadcontainertype",
			data : {
				CargoCategoryID : cargocategory
			},
			type : "post",
			success : function(data) {
				$("#Container_ContainerTypeID").empty();
				if (data != null && data.length > 0) {
					var result = JSON.parse(data);
					$.each(result, function(i, item) {
						$("#Container_ContainerTypeID")
								.append("<option value=\""
										+ item.ContainerTypeID + "\">"
										+ item.ContainerTypeName + "</option>");
					});

					$("#Container_ContainerTypeID").attr("disabled", false);

				}
			}
		});
	});

	$("#addContainerform").validate({
		onkeyup : false,
		onclick : false,
		onfocusout : false,
		rules : {

			Container_ContainerTypeID : "required",
			Container_DangerLvl : "required",
			Container_Amount : {
				required : true,
				digits : true
			},
			Container_IsSoc : "required",
			Container_ContainerPkgTypeID : "required",
			Container_EditReason : "required"

		},
		messages : {

			Container_ContainerTypeID : "必填",
			Container_DangerLvl : "必填",
			Container_Amount : {
				required : "必填",
				digits : "必须输入一个正整数"
			},
			Container_IsSoc : "必填",
			Container_ContainerPkgTypeID : "必填",
			Container_EditReason : "必填"

		},
		submitHandler : function(form) {
			var flag = true;
			if ($('input[name="Container_CargoTypeID"]:checked').val() == undefined) {
				flag = false;
				if ($("#group_Container_CargoTypeID").parent()
						.find("label:contains('必填')").length == 0) {
					$("#group_Container_CargoTypeID").parent()
							.append("<label>必填</label>");
				}
			}
			if (!flag)
				return;
			$.ajax({
				type : "POST",
				url : $.getContextPath()
						+ "/orderdetail/checkordercontainerexist",
				async : false,
				data : {
					content : JSON.stringify($("#addContainerform")
							.serializeJson()),
					orderid : $("#orderid").text()

				},
				success : function(result) {
					if (result.substr(0, 1) == '0') {
						$.ajax({
									type : "POST",
									url : $.getContextPath()
											+ "/orderdetail/addordercontainer",
									async : false,
									data : {
										content : JSON
												.stringify($("#addContainerform")
														.serializeJson()),
										orderid : $("#orderid").text()
									},
									success : function(data) {
										$("#closeaddCargoModal").click();
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

	$('#addContainer').on('hide.bs.modal', function(event) {
				$("#addContainer-body").empty();
			});

});