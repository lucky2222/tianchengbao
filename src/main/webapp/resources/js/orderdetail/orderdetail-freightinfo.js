$(function() {
	var tog = false;
	$("#allchecked").click(function() {

				if (!tog) {
					$('input[name="seafreightcheckbox"]').each(function() {
								if ($(this).attr("disabled") != "disabled")
									$(this).prop("checked", true);
							});
				} else {
					$('input[name="seafreightcheckbox"]').removeAttr("checked");
				}
				tog = !tog;
			});

	$('#addfreightremark').on('show.bs.modal', function(event) {
				$("#FreightRemark").val($("#orderfreightremark").text());
				$("#hidden_orderid").val($("#orderid").text());
			});

	$('#submitfreightremark').click(function() {

		if ($("#FreightRemark").val().length == 0) {
			return false;
		}
		$.ajax({
					type : "POST",
					url : $.getContextPath() + "/orderdetail/savefreightremark",
					data : $('#freightremarkform').serialize(),
					success : function(data) {
						$("#closeaddfreightremark").click();
						$("#freight").html(data);
					}

				});
	});

	$('#btnDiscuss').click(function() {

		var checkedarr = new Array();
		var discussarr = new Array();
		var flag = false;
		if ($('input[name="seafreightcheckbox"]:checked').length == 0) {
			alert("请必须选择一种箱型");
			return false;
		}

		$('input[name="seafreightcheckbox"]:checked').each(function() {
			checkedarr.push($(this).val());
			if ($(this).parent().parent().find("input[type=number]").val()
					.trim().length > 0)
				discussarr.push($(this).parent().parent()
						.find("input[type=number]").val().trim());
			else {
				var containertype = $(this).parent().next().text().replace(
						/\s+/g, "");
				alert("请必须填写" + containertype + "的议价价格");
				flag = true;
				return false;
			}
		});

		if (!flag) {
			$("#addfreightdiscuss").modal('show');
		} else {
			return false;
		}

	});

	$('#addfreightdiscuss').on('show.bs.modal', function(event) {

				$("#DiscussReason").val($("#orderdiscussreason").text());
			});

	$('#submitfreightdiscuss').click(function() {
		$('#submitfreightdiscuss').attr("disabled", true);
		var checkedarr = new Array();
		var discussarr = new Array();
		if ($("#DiscussReason").val().trim().length == 0) {
			alert("请填写议价理由");
			$("#DiscussReason").val("");
			$('#submitfreightdiscuss').attr("disabled", false);
			return false;
		}

		$('input[name="seafreightcheckbox"]:checked').each(function() {
			checkedarr.push($(this).val());

			discussarr.push($(this).parent().parent()
					.find("input[type=number]").val().trim());
		});

		$.ajax({
					type : "POST",
					url : $.getContextPath()
							+ "/orderdetail/savefreightdiscuss",
					data : {
						orderid : $("#orderid").text(),
						discussreason : $("#DiscussReason").val(),
						containerid : checkedarr,
						discussprice : discussarr
					},

					async : false,
					traditional : true,
					error : function(error) {
						alert("出错了");
						$('#submitfreightdiscuss').attr("disabled", false);
					},
					success : function(data) {
						if (data.length > 0) {
							$("#closeaddfreightdiscuss").click();
							$("#freight").html(data);
						} else {
							alert("出错了");
							$('#submitfreightdiscuss').attr("disabled", false);
						}
					}

				});

	});

	$('#btnConfirm').click(function() {
		$('#btnConfirm').attr("disabled", true);
		var checkedarr = new Array();
		if ($('input[name="seafreightcheckbox"]:checked').length == 0) {
			alert("请必须选择一种箱型");
			$('#btnConfirm').attr("disabled", false);
			return false;
		}

		$('input[name="seafreightcheckbox"]:checked').each(function() {
					checkedarr.push($(this).val());
				});

		$.ajax({
					type : "POST",
					url : $.getContextPath()
							+ "/orderdetail/checkseaexpressprice",
					data : {
						orderid : $("#orderid").text(),
						containerids : checkedarr
					},
					async : false,
					traditional : true,
					success : function(data) {
						if (data.length > 0) {
							if (data.substr(0, 1) == '0') {

								$.ajax({
											type : "POST",
											url : $.getContextPath()
													+ data.substr(1,
															data.length),
											data : {
												orderid : $("#orderid").text(),
												containerids : checkedarr
											},
											traditional : true,
											success : function(data) {
												if (data.length > 0)
													$("#freight").html(data);
												else
													alert("出错了");
												$('#btnConfirm').attr(
														"disabled", false);
											}

										});

							} else {
								alert(data.substr(1, data.length));
								$('#btnConfirm').attr("disabled", false);
							}

						} else {
							alert("出错了!");
							$('#btnConfirm').attr("disabled", false);
						}
					}

				});

	});

	$("[role='approvefeight']").click(function() {
				$.clearForm($("#div_orderseaprice"));
				$.clearForm($("#div_refusereason"));
				$("#hiddenorderseapriceid").val("");
				$("#div_orderseaprice").hide();
				$("#div_refusereason").hide();
				$("[name='freightapprovedstatus']").removeAttr("checked");
				$("[name='lb_freightapprovedstatus']").removeClass("active");
				$("#tbody").children().remove();
				var orderseapriceid = $(this).data('orderseapriceid') + "";
				$("#hiddenorderseapriceid").val(orderseapriceid);
				var trclone = $(this).parent().parent().clone();
				trclone.children().last().remove();
				$("#tbody").append(trclone);
				$("#freightapproval").modal('show');
			});

	$("#submitfreightapproval").click(function() {

		var approvetype = $('input[name="freightapprovedstatus"]:checked')
				.val();
		if (approvetype == undefined) {
			alert("请选择审批类型");
			return false;
		} else {
			if (approvetype == '127104') {
				if ($("#approvalpayableprice").val().trim().length == 0) {
					alert("请填写申请的应付价格");
					return false;
				}
			} else if (approvetype == '127103') {
				if ($("#refusereason").val().trim().length == 0) {
					alert("请填写拒绝原因");
					return false;
				}
			}

			$.ajax({
						type : "POST",
						url : $.getContextPath()
								+ "/orderdetail/freightapprove",
						data : {
							orderid : $("#orderid").text(),
							orderseapriceid : $("#hiddenorderseapriceid").val(),
							approvetypeid : approvetype,
							payableprice : $("#approvalpayableprice").val()
									.trim(),
							costprice : $("#approvalcostprice").val().trim(),
							agencyprice : $("#approvalagencyprice").val()
									.trim(),
							refusereason : $("#refusereason").val().trim()
						},
						async : false,
						success : function(data) {
							if (data.length > 0) {
								$("#closefreightapproval").click();
								$("#freight").html(data);
							} else {
								alert("出错了");
							}
						}

					});

		}

	});

	$("[name='lb_freightapprovedstatus']").click(function() {

				if ($(this).find("input").val() == "127106") {
					$("#div_orderseaprice").show();
					$("#div_refusereason").hide();
				} else if ($(this).find("input").val() == "127104") {
					$("#div_orderseaprice").show();
					$("#div_refusereason").hide();
				} else if ($(this).find("input").val() == "127103") {
					$("#div_orderseaprice").hide();
					$("#div_refusereason").show();
				}

			});

	$("#btnApprovedOrder").click(function() {
		$("#btnApprovedOrder").attr("disabled", "disabled");
		$.ajax({
					type : "POST",
					url : $.getContextPath()
							+ "/orderdetail/serviceapprovedorder",
					data : {
						orderid : $("#orderid").text()
					},
					error : function(error) {
						alert("出错了");
						$("#btnApprovedOrder").attr("disabled", false);
					},
					success : function(data) {
						if (data.length > 0) {
							if (data.substr(0, 1) == '0') {
								alert(data.substr(1, data.length));
								$.ajax({
											type : "GET",
											url : $.getContextPath()
													+ "/orderdetail/freightinfo/"
													+ $("#orderid").text(),
											async : false,
											success : function(data) {
												if (data.length > 0)
													$("#freight").html(data);
											}

										});
							} else {
								alert(data.substr(1, data.length));
								$("#btnApprovedOrder").attr("disabled", false);
							}
						}

					}

				});

	});

	$("[role='confirmappointprice']").click(function() {
		var id = $(this).data("id") + "";
		var price = $(this).parent().prev().prev().find("input[type=number]")
				.val().trim();
		if (price.length == 0) {
			alert("请输入自有约价格");
			return false;
		} else {
			$.ajax({
						type : "POST",
						url : $.getContextPath()
								+ "/orderdetail/confirmappointprice",
						data : {
							orderid : $("#orderid").text(),
							orderseapriceid : id,
							payableprice : price
						},
						async : false,
						success : function(data) {
							if (data.substr(0, 1) == '0') {
								$.ajax({
											type : "GET",
											url : $.getContextPath()
													+ "/orderdetail/freightinfo/"
													+ $("#orderid").text(),
											async : false,
											success : function(data) {
												if (data.length > 0)
													$("#freight").html(data);
											}

										});
							} else {
								alert(data.substr(1, data.length));
							}
						}

					});
		}
	});
});
