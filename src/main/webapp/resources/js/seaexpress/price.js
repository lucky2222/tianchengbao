$('#createSePrice').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget);
	var type = button.data('type');
	var modal = $(this);
	if (type == "update") {
		modal.find('.modal-title').text("更新运价");
		$('#operate').text("更新");
		$('#operate').attr("operatetype", "update");
		$('#sepriceid').val(button.data('sepriceid'));
		$('#routelinenamelbl').text(button.data('routelinename'));
		$('#polnameen').text(button.data('polnameen'));
		$('#podnameen').text(button.data('podnameen'));
		$('#podrareanamecn').text(button.data('podrareanamecn'));
		$('#podcountrynamecn').text(button.data('podcountrynamecn'));
		$('#fromdate').val(button.data('fromdate'));
		$('#todate').val(button.data('todate'));
		$('#isavl_20gp').val(button.data('isavl_20gp'));
		$('#costprice_20gp').val(button.data('costprice_20gp'));
		$('#minprice_20gp').val(button.data('minprice_20gp'));
		$('#refprice_20gp').val(button.data('refprice_20gp'));
		$('#maxprice_20gp').val(button.data('maxprice_20gp'));
		$('#isavl_40gp').val(button.data('isavl_40gp'));
		$('#costprice_40gp').val(button.data('costprice_40gp'));
		$('#minprice_40gp').val(button.data('minprice_40gp'));
		$('#refprice_40gp').val(button.data('refprice_40gp'));
		$('#maxprice_40gp').val(button.data('maxprice_40gp'));
		$('#isavl_40hc').val(button.data('isavl_40hc'));
		$('#costprice_40hc').val(button.data('costprice_40hc'));
		$('#minprice_40hc').val(button.data('minprice_40hc'));
		$('#refprice_40hc').val(button.data('refprice_40hc'));
		$('#maxprice_40hc').val(button.data('maxprice_40hc'));
		$('#roadprice_20gp').val(button.data('roadprice_20gp'));
		$('#roadprice_40gp').val(button.data('roadprice_40gp'));
		$('#roadprice_40hc').val(button.data('roadprice_40hc'));
		$('#overweightremark').val(button.data('overweightremark'));
		$('#additionalremark').val(button.data('additionalremark'));
		$('#specialremark').val(button.data('specialremark'));
		$('#transtypeid').val(button.data('transtypeid'));
		
		$('#20gplvl1').val(button.data('20gplvl1'));
		$('#20gplvl2').val(button.data('20gplvl2'));
		$('#20gplvl3').val(button.data('20gplvl3'));
		$('#20gplvl4').val(button.data('20gplvl4'));
		$('#20gplvl5').val(button.data('20gplvl5'));
		$('#20gplvl6').val(button.data('20gplvl6'));
		$('#20gplvl7').val(button.data('20gplvl7'));
		$('#20gplvl8').val(button.data('20gplvl8'));
		$('#20gplvl9').val(button.data('20gplvl9'));

		$('#40gplvl1').val(button.data('40gplvl1'));
		$('#40gplvl2').val(button.data('40gplvl2'));
		$('#40gplvl3').val(button.data('40gplvl3'));
		$('#40gplvl4').val(button.data('40gplvl4'));
		$('#40gplvl5').val(button.data('40gplvl5'));
		$('#40gplvl6').val(button.data('40gplvl6'));
		$('#40gplvl7').val(button.data('40gplvl7'));
		$('#40gplvl8').val(button.data('40gplvl8'));
		$('#40gplvl9').val(button.data('40gplvl9'));

		$('#40hclvl1').val(button.data('40hclvl1'));
		$('#40hclvl2').val(button.data('40hclvl2'));
		$('#40hclvl3').val(button.data('40hclvl3'));
		$('#40hclvl4').val(button.data('40hclvl4'));
		$('#40hclvl5').val(button.data('40hclvl5'));
		$('#40hclvl6').val(button.data('40hclvl6'));
		$('#40hclvl7').val(button.data('40hclvl7'));
		$('#40hclvl8').val(button.data('40hclvl8'));
		$('#40hclvl9').val(button.data('40hclvl9'));

		$('#weight1').val(button.data('weight1'));
		$('#weight2').val(button.data('weight2'));
		$('#weight3').val(button.data('weight3'));
		$('#price1to2').val(button.data('price1to2'));
		$('#price2to3').val(button.data('price2to3'));
		$('#price3plus').val(button.data('price3plus'));

		
	} else if (type == "del") {
		modal.find('.modal-title').text("删除运价");
		$('#operate').text("删除");
		$('#operate').attr("operatetype", "del");
		$('#sepriceid').val(button.data('sepriceid'));
		$('#param').hide();
	}
});

$("#createsepriceform").validate({
	rules : {
		fromdate : "required",
		todate : "required"
	},
	messages : {
		fromdate : "必填",
		todate : "必填"
	},
	submitHandler : function(form) {
		if ($('#operate').attr("operatetype") == 'add') {
			$.ajax({
				url : "./createbasecategory",
				data : $("#createbasecategoryform").serialize(),
				type : "post",
				async : false,
				success : function(data) {
					if (data.substr(0, 1) == '0') {
						alert(data.substr(1, data.length));
						$('#createBaseCategory').modal('hide');
						location.reload();
					} else {
						alert(data.substr(1, data.length));
					}
				}
			});
		} else if ($('#operate').attr("operatetype") == 'update') {
			$.ajax({
				url : "./updateseprice",
				data : $("#createsepriceform").serialize(),
				type : "post",
				async : false,
				success : function(data) {
					var result = JSON.parse(data);
					alert(result.msg);
					if (result.success) {
						$.clearForm($("#createsepriceform"));
						$('#createSePrice').modal('hide');
						$("#formsepricegrid").submit();
					}
				}
			});
		} else if ($('#operate').attr("operatetype") == 'del') {
			$.ajax({
				url : "./delseprice",
				data : {
					sepriceid : $("#sepriceid").val()
				},
				type : "post",
				async : false,
				success : function(data) {
					if (data.substr(0, 1) == '0') {
						alert(data.substr(1, data.length));
						$('#createSePrice').modal('hide');
						location.reload();
					} else {
						alert(data.substr(1, data.length));
					}
				}
			});
		}
	}
});

function saveSingleMinPrice(priceID) {
	var MinPrice_20GP = $("#20GPMin" + priceID).val();
	var MinPrice_40GP = $("#40GPMin" + priceID).val();
	var MinPrice_40HC = $("#40HCMin" + priceID).val();
	$.ajax({
		type : 'POST',
		url : 'savesingleminprice',
		traditional : true,
		data : {
			SePriceID : priceID,
			MinPrice_20GP : MinPrice_20GP,
			MinPrice_40GP : MinPrice_40GP,
			MinPrice_40HC : MinPrice_40HC
		},
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			var result = JSON.parse(data);
			alert(result.msg);
		}
	});
}

$('#editMinPrice').on('show.bs.modal', function(event) {
	var priceIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			priceIDList.push(this.value);
		}
	});
	if (priceIDList.length == 0) {
		alert("请选择要修改的运价");
		return event.preventDefault();
	}

});

$("#editminpriceform").validate({

	submitHandler : function(form) {
		var priceIDList = new Array();

		$("input[name='select']").each(function() {
			if (this.checked) {
				priceIDList.push(this.value);
			}
		});
		if (priceIDList.length == 0) {
			alert("请选择要修改的运价");
			return false;
		}
		$.ajax({
			url : "./editminpricesubmit",
			traditional : true,
			data : {
				formData : JSON.stringify($(form).serializeJson()),
				priceIDList : priceIDList
			},
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#editminpriceform"));
					$('#editMinPrice').modal('hide');
					$("#formsepricegrid").submit();
				}
			}
		});
		return false;

	}
});

$('#editRemarks').on('show.bs.modal', function(event) {
	var priceIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			priceIDList.push(this.value);
		}
	});
	if (priceIDList.length == 0) {
		alert("请选择要修改的运价");
		return event.preventDefault();
	}

});
$("#editremarksform").validate({

	submitHandler : function(form) {
		var priceIDList = new Array();

		$("input[name='select']").each(function() {
			if (this.checked) {
				priceIDList.push(this.value);
			}
		});
		if (priceIDList.length == 0) {
			alert("请选择要修改的运价");
			return false;
		}
		$.ajax({
			url : "./editremarkssubmit",
			traditional : true,
			data : {
				formData : JSON.stringify($(form).serializeJson()),
				priceIDList : priceIDList
			},
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#editremarksform"));
					$('#editRemarks').modal('hide');
					$("#formsepricegrid").submit();
				}
			}
		});
		return false;

	}
});

$('#editOtherPrice').on('show.bs.modal', function(event) {
	var priceIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			priceIDList.push(this.value);
		}
	});
	if (priceIDList.length == 0) {
		alert("请选择要修改的运价");
		return event.preventDefault();
	}

});
$("#editotherpriceform").validate({
	rules : {
		costprice_20gp : "required",
		refprice_20gp : "required",
		maxprice_20gp : "required",
		costprice_40gp : "required",
		refprice_40gp : "required",
		maxprice_40gp : "required",
		costprice_40hc : "required",
		refprice_40hc : "required",
		maxprice_40hc : "required"
	},
	messages : {
		costprice_20gp : "必填",
		refprice_20gp : "必填",
		maxprice_20gp : "必填",
		costprice_40gp : "必填",
		refprice_40gp : "必填",
		maxprice_40gp : "必填",
		costprice_40hc : "必填",
		refprice_40hc : "必填",
		maxprice_40hc : "必填"
	},
	submitHandler : function(form) {
		var priceIDList = new Array();

		$("input[name='select']").each(function() {
			if (this.checked) {
				priceIDList.push(this.value);
			}
		});
		if (priceIDList.length == 0) {
			alert("请选择要修改的运价");
			return false;
		}
		$.ajax({
			url : "./editotherpricesubmit",
			traditional : true,
			data : {
				formData : JSON.stringify($(form).serializeJson()),
				priceIDList : priceIDList
			},
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#editotherpriceform"));
					$('#editOtherPrice').modal('hide');
					$("#formsepricegrid").submit();
				}
			}
		});
		return false;

	}
});

$('#editDate').on('show.bs.modal', function(event) {
	var priceIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			priceIDList.push(this.value);
		}
	});
	if (priceIDList.length == 0) {
		alert("请选择要修改的运价");
		return event.preventDefault();
	}
	// 插件的调用
	$("#editdate_fromdate").datepicker({
		dateFormat : "yy-mm-dd"
	// 在这里进行插件的属性设置
	});
	// 插件的调用
	$("#editdate_todate").datepicker({
		dateFormat : "yy-mm-dd"
	// 在这里进行插件的属性设置
	});

});
$("#editdateform").validate({
	rules : {
		fromdate : "required",
		todate : "required"
	},
	messages : {
		fromdate : "必填",
		todate : "必填"
	},
	submitHandler : function(form) {
		var priceIDList = new Array();

		$("input[name='select']").each(function() {
			if (this.checked) {
				priceIDList.push(this.value);
			}
		});
		if (priceIDList.length == 0) {
			alert("请选择要修改的运价");
			return false;
		}
		$.ajax({
			url : "./editdatesubmit",
			traditional : true,
			data : {
				formData : JSON.stringify($(form).serializeJson()),
				priceIDList : priceIDList
			},
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#editdateform"));
					$('#editDate').modal('hide');
					$("#formsepricegrid").submit();
				}
			}
		});
		return false;

	}
});

$('#editDangerPrice').on('show.bs.modal', function(event) {
	var priceIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			priceIDList.push(this.value);
		}
	});
	if (priceIDList.length == 0) {
		alert("请选择要修改的运价");
		return event.preventDefault();
	}
});
$("#editdangerpriceform").validate({
	submitHandler : function(form) {
		var priceIDList = new Array();

		$("input[name='select']").each(function() {
			if (this.checked) {
				priceIDList.push(this.value);
			}
		});
		if (priceIDList.length == 0) {
			alert("请选择要修改的运价");
			return false;
		}
		if (!confirm("确认提交吗？为空的危品附加费记录将被删除。")) {
			return false;
		}
		$.ajax({
			url : "./editdangerpricesubmit",
			traditional : true,
			data : {
				formData : JSON.stringify($(form).serializeJson()),
				priceIDList : priceIDList
			},
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#editdangerpriceform"));
					$('#editDangerPrice').modal('hide');
					$("#formsepricegrid").submit();
				}
			}
		});
		return false;

	}
});

$('#copyPrice').on('show.bs.modal', function(event) {
	var priceIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			priceIDList.push(this.value);
		}
	});
	if (priceIDList.length == 0) {
		alert("请选择要修改的运价");
		return event.preventDefault();
	}
	// 插件的调用
	$("#copyprice_fromdate").datepicker({
		dateFormat : "yy-mm-dd"
	// 在这里进行插件的属性设置
	});
	// 插件的调用
	$("#copyprice_todate").datepicker({
		dateFormat : "yy-mm-dd"
	// 在这里进行插件的属性设置
	});

});
$("#copypriceform").validate({
	rules : {
		fromdate : "required",
		todate : "required"
	},
	messages : {
		fromdate : "必填",
		todate : "必填"
	},
	submitHandler : function(form) {
		var priceIDList = new Array();

		$("input[name='select']").each(function() {
			if (this.checked) {
				priceIDList.push(this.value);
			}
		});
		if (priceIDList.length == 0) {
			alert("请选择要修改的运价");
			return false;
		}
		$.ajax({
			url : "./copypricesubmit",
			traditional : true,
			data : {
				formData : JSON.stringify($(form).serializeJson()),
				priceIDList : priceIDList
			},
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#copypriceform"));
					$('#copyPrice').modal('hide');
					$("#formsepricegrid").submit();
				}
			}
		});
		return false;

	}
});

$('#editOWPrice').on('show.bs.modal', function(event) {
	var priceIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			priceIDList.push(this.value);
		}
	});
	if (priceIDList.length == 0) {
		alert("请选择要修改的运价");
		return event.preventDefault();
	}
});
$("#editowpriceform").validate({
	// rules : {
	// fromdate : "required",
	// todate : "required"
	// },
	// messages : {
	// fromdate : "必填",
	// todate : "必填"
	// },
	submitHandler : function(form) {
		var priceIDList = new Array();

		$("input[name='select']").each(function() {
			if (this.checked) {
				priceIDList.push(this.value);
			}
		});
		if (priceIDList.length == 0) {
			alert("请选择要修改的运价");
			return false;
		}
		if (!confirm("确认提交吗？为空的超重费记录将被删除。")) {
			return false;
		}
		$.ajax({
			url : "./editowpricesubmit",
			traditional : true,
			data : {
				formData : JSON.stringify($(form).serializeJson()),
				priceIDList : priceIDList
			},
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#editowpriceform"));
					$('#editOWPrice').modal('hide');
					$("#formsepricegrid").submit();
				}
			}
		});
		return false;

	}
});


$('#minPricePlus').on('show.bs.modal', function(event) {
	var priceIDList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			priceIDList.push(this.value);
		}
	});
	if (priceIDList.length == 0) {
		alert("请选择要修改的运价");
		return event.preventDefault();
	}

});

$("#minpriceplusform").validate({

	submitHandler : function(form) {
		var priceIDList = new Array();

		$("input[name='select']").each(function() {
			if (this.checked) {
				priceIDList.push(this.value);
			}
		});
		if (priceIDList.length == 0) {
			alert("请选择要修改的运价");
			return false;
		}
		$.ajax({
			url : "./minpriceplussubmit",
			traditional : true,
			data : {
				formData : JSON.stringify($(form).serializeJson()),
				priceIDList : priceIDList
			},
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#minpriceplusform"));
					$('#minPricePlus').modal('hide');
					$("#formsepricegrid").submit();
				}
			}
		});
		return false;

	}
});