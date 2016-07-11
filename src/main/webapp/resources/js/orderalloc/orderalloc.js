function initFormatter(value, row, index)
{
	if (value == '1'){
		return{
			checked : true
		}
	}
	return value;
}

$(".datepicker").datepicker(
{
	dateFormat : "yy/mm/dd"
});

// -----客服订单分配-------////
$('#inputServiceRuleModal').on('show.bs.modal', function(event)
{
	$('#mdl_ipt_servicer').val('');
	$('#mdl_ipt_servicer_show').val('');
	$('#mdl_ipt_duliservicer').val('');
	$('#mdl_ipt_duliservicer_show').val('');
	$('#ETD_Start').val('2015/05/01');
	$('#ETD_End').val('2020/01/01');
	ajax_page_init($('#customerofnoconfiggrid'), '/orderalloc/partial_customerofnoservice', '');
});

$('.mdl_submit_iptservicerule').click(function()
{
	var serviceid = $('#mdl_ipt_servicer').val();
	var servicename = $('#mdl_ipt_servicer_show').val();
	if (serviceid == null || serviceid == '' || servicename == null || servicename == '')
	{
		alert('请选择客服！');
		return;
	}

	var dlserviceid = $('#mdl_ipt_duliservicer').val();
	var dlservicename = $('#mdl_ipt_duliservicer_show').val();
	if (dlserviceid == null || dlserviceid == '' || dlservicename == null || dlservicename == '')
	{
		alert('请选择三自客服！');
		return;
	}

	var effdate = $('#ETD_Start').val();
	var expdate = $('#ETD_End').val();
	if (effdate == null || effdate == '')
	{
		alert('请录入有效期起始日期！');
		return;
	}
	if (expdate == null || expdate == '')
	{
		alert('请录入有效期截止日期！');
		return;
	}

	var custid_arr = new Array();

	var cbk_selected = $('#customerofnoconfiggrid_table tbody tr input[type="checkbox"]:checked');
	if (cbk_selected.length < 1)
	{
		alert('请选择要分配的客户！');
		return;
	}
	var pass = true;
	cbk_selected.each(function()
	{
		var td = $(this).closest('tr').find('td').eq(2);
		var custid = td.data('custid');
		if (custid == null || custid == '')
		{
			alert('Invalid Param!');
			pass = false;
			return pass;
		}

		custid_arr.push(
		{
			custid : custid
		});
	});

	if (!pass)
	{
		return;
	}

	if (!confirm('确定提交吗？'))
	{
		window.event.returnValue = false;
		return;
	}

	$.ajax(
	{
		url : '/orderalloc/inputservicerule',
		data :
		{
			'serviceid' : serviceid,
			'dlserviceid' : dlserviceid,
			'effdate' : effdate,
			'expdate' : expdate,
			'custids' : JSON.stringify(custid_arr)
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO 关闭Modal,刷新数据
				$('#inputServiceRuleModal').modal('hide');
				ajax_page_init($('#servicerulegrid'), '', '');
			}
		}
	})
});

// ------------订舱员订单分配--------------////
$('#inputBookRuleModal').on('show.bs.modal', function(event)
{
	$('#mdlipt_book_booker').val('');
	$('#mdlipt_book_booker_show').val('');
	$('#mdlipt_book_carrier').val('');
	$('#mdlipt_book_carrier_show').val('');
	$('#ETD_Start').val('2015/05/01');
	$('#ETD_End').val('2020/01/01');
	$('#lineareaofbookergrid').empty();
});

$('#mdlipt_book_query').click(
		function()
		{
			var staffid = $('#mdlipt_book_booker').val();
			if (staffid == null || staffid == '')
			{
				alert('请选择订舱员！');
				return;
			}

			var carrierid = $('#mdlipt_book_carrier').val();
			if (carrierid == null || carrierid == '')
			{
				alert('请选择承运人！');
				return;
			}

			ajax_page_init($('#lineareaofbookergrid'), '/orderalloc/partial_lineareaofbooker',
					'staffid=' + staffid + '&carrierid=' + carrierid);
		});

$('.mdl_submit_iptbookrule').click(function()
{
	var bookerid = $('#mdlipt_book_booker').val();
	var bookername = $('#mdlipt_book_booker_show').val();
	if (bookerid == null || bookerid == '' || bookername == null || bookername == '')
	{
		alert('请选择订舱员！');
		return;
	}

	var carrierid = $('#mdlipt_book_carrier').val();
	var carriername = $('#mdlipt_book_carrier_show').val();
	if (carrierid == null || carrierid == '' || carriername == null || carriername == '')
	{
		alert('请选择承运人！');
		return;
	}

	var effdate = $('#ETD_Start').val();
	var expdate = $('#ETD_End').val();
	if (effdate == null || effdate == '')
	{
		alert('请录入有效期起始日期！');
		return;
	}
	if (expdate == null || expdate == '')
	{
		alert('请录入有效期截止日期！');
		return;
	}

	var ckb_selecteds = $('#lineareaofbookergrid table tbody tr input[type="checkbox"]:checked');
	if (ckb_selecteds.length < 1)
	{
		alert('请选择航线！');
		return;
	}

	var pass = true;
	var lineid_arr = new Array();
	ckb_selecteds.each(function()
	{
		var lineid = $(this).closest('tr').find('td').eq(2).data('lineid');
		if (lineid == null || lineid == '')
		{
			alert('Invalid Param!');
			pass = false;
			return false;
		}
		lineid_arr.push(
		{
			lineid : lineid
		});
	});

	if (!pass)
	{
		return;
	}

	if (!confirm('确定提交吗？'))
	{
		window.event.returnValue = false;
		return;
	}

	$.ajax(
	{
		url : '/orderalloc/inputbookrule',
		data :
		{
			'Staffid' : bookerid,
			'CarrierID' : carrierid,
			'lineids' : JSON.stringify(lineid_arr),
			'effdate' : effdate,
			'expdate' : expdate
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO hide modal refush data
				$('#inputBookRuleModal').modal('hide');
				ajax_page_init($("#bookrulegrid"), "", $(this).serialize());
			}
		}
	})
});

// /-----------单证员订单分配------------////
$('#inputCertiRuleModal').on('show.bs.modal', function(event)
{
	$('#mdlipt_certi_certier').val('');
	$('#mdlipt_certi_certier_show').val('');
	$('#mdlipt_certi_carrierid').val('');
	$('#mdlipt_certi_carrierid_show').val('');
	$('#ETD_Start').val('2015/05/01');
	$('#ETD_End').val('2020/01/01');
	$('#lineareaofcertiergrid').empty();
});

$('#mdlipt_certi_query').click(
		function()
		{
			var staffid = $('#mdlipt_certi_certier').val();
			if (staffid == null || staffid == '')
			{
				alert('请选择单证员！');
				return;
			}

			var carrierid = $('#mdlipt_certi_carrierid').val();
			if (carrierid == null || carrierid == '')
			{
				alert('请选择承运人！');
				return;
			}

			ajax_page_init($('#lineareaofcertiergrid'), '/orderalloc/partial_lineareaofcertier',
					'staffid=' + staffid + '&carrierid=' + carrierid);
		});

$('.mdl_submit_iptcertirule').click(function()
{
	var certierid = $('#mdlipt_certi_certier').val();
	var certiername = $('#mdlipt_certi_certier_show').val();
	if (certierid == null || certierid == '' || certiername == null || certiername == '')
	{
		alert('请选择单证员！');
		return;
	}

	var carrierid = $('#mdlipt_certi_carrierid').val();
	var carriername = $('#mdlipt_certi_carrierid_show').val();
	if (carrierid == null || carrierid == '' || carriername == null || carriername == '')
	{
		alert('请选择承运人！');
		return;
	}

	var effdate = $('#ETD_Start').val();
	var expdate = $('#ETD_End').val();
	if (effdate == null || effdate == '')
	{
		alert('请录入有效期起始日期！');
		return;
	}
	if (expdate == null || expdate == '')
	{
		alert('请录入有效期截止日期！');
		return;
	}

	var ckb_selecteds = $('#lineareaofcertiergrid table tbody tr input[type="checkbox"]:checked');
	if (ckb_selecteds.length < 1)
	{
		alert('请选择航线！');
		return;
	}

	var pass = true;
	var lineid_arr = new Array();
	ckb_selecteds.each(function()
	{
		var lineid = $(this).closest('tr').find('td').eq(2).data('lineid');
		if (lineid == null || lineid == '')
		{
			alert('Invalid Param!');
			pass = false;
			return false;
		}
		lineid_arr.push(
		{
			lineid : lineid
		});
	});

	if (!pass)
	{
		return;
	}

	if (!confirm('确定提交吗？'))
	{
		window.event.returnValue = false;
		return;
	}

	$.ajax(
	{
		url : '/orderalloc/inputcertirule',
		data :
		{
			'Staffid' : certierid,
			'CarrierID' : carrierid,
			'lineids' : JSON.stringify(lineid_arr),
			'effdate' : effdate,
			'expdate' : expdate
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO hide modal refush data
				$('#inputCertiRuleModal').modal('hide');
				ajax_page_init($("#certirulegrid"), "", $(this).serialize());
			}
		}
	})
});

// //-------------报关员订单分配-------------////
$('#inputDeclareRuleModal').on('show.bs.modal', function(event)
{
	$('#mdlipt_declare_declarer').val('');
	$('#mdlipt_declare_declarer_show').val('');
	$('#ETD_Start').val('2015/05/01');
	$('#ETD_End').val('2020/01/01');
	$('#servicerofdeclarergrid').empty();
});

$('#mdlipt_declare_query').click(
		function()
		{
			var staffid = $('#mdlipt_declare_declarer').val();
			if (staffid == null || staffid == '')
			{
				alert('请选择报关员！');
				return;
			}

			ajax_page_init($('#servicerofdeclarergrid'), '/orderalloc/partial_serviceofdeclarer',
					'staffid=' + staffid);
		});

$('.mdl_submit_iptdeclarerule').click(function()
{
	var declarerid = $('#mdlipt_declare_declarer').val();
	var declarername = $('#mdlipt_declare_declarer_show').val();
	if (declarerid == null || declarerid == '' || declarername == null || declarername == '')
	{
		alert('请选择报关员！');
		return;
	}

	var effdate = $('#ETD_Start').val();
	var expdate = $('#ETD_End').val();
	if (effdate == null || effdate == '')
	{
		alert('请录入有效期起始日期！');
		return;
	}
	if (expdate == null || expdate == '')
	{
		alert('请录入有效期截止日期！');
		return;
	}

	var ckb_selecteds = $('#servicerofdeclarergrid table tbody tr input[type="checkbox"]:checked');
	if (ckb_selecteds.length < 1)
	{
		alert('请选择客服！');
		return;
	}

	var pass = true;
	var servicerid_arr = new Array();
	ckb_selecteds.each(function()
	{
		var servicerid = $(this).closest('tr').find('td').eq(2).data('servicer');
		if (servicerid == null || servicerid == '')
		{
			alert('Invalid Param!');
			pass = false;
			return false;
		}
		servicerid_arr.push(
		{
			servicerid : servicerid
		});
	});

	if (!pass)
	{
		return;
	}

	if (!confirm('确定提交吗？'))
	{
		window.event.returnValue = false;
		return;
	}

	$.ajax(
	{
		url : '/orderalloc/inputdeclarerule',
		data :
		{
			'Staffid' : declarerid,
			'serviceids' : JSON.stringify(servicerid_arr),
			'effdate' : effdate,
			'expdate' : expdate
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO hide modal refush data
				$('#inputDeclareRuleModal').modal('hide');
				ajax_page_init($("#declarerulegrid"), "", $(this).serialize());
			}
		}
	})
});

// //------------运价员订单分配-------------/////
$('#inputSeaRuleModal').on('show.bs.modal', function(event)
{
	$('#mdlipt_sea_seaer').val('');
	$('#mdlipt_sea_seaer_show').val('');
	$('#mdlipt_sea_carrierid').val('');
	$('#mdlipt_sea_carrierid_show').val('');
	$('#ETD_Start').val('2015/05/01');
	$('#ETD_End').val('2020/01/01');
	$('#lineareaofseaergrid').empty();
});

$('#mdlipt_sea_query').click(
		function()
		{
			var staffid = $('#mdlipt_sea_seaer').val();
			var staffname = $('#mdlipt_sea_seaer_show').val();
			if (staffid == null || staffid == '' || staffname == null || staffname == '')
			{
				alert('请选择运价员！');
				return;
			}

			var carrierid = $('#mdlipt_sea_carrierid').val();
			var carriername = $('#mdlipt_sea_carrierid_show').val();
			if (carrierid == null || carrierid == '' || carriername == null || carriername == '')
			{
				alert('请选择承运人！');
				return;
			}

			ajax_page_init($('#lineareaofseaergrid'), '/orderalloc/partial_lineareaofseaer',
					'staffid=' + staffid + '&carrierid=' + carrierid);
		});

$('.mdl_submit_iptsearule').click(function()
{
	var seaerid = $('#mdlipt_sea_seaer').val();
	var seaername = $('#mdlipt_sea_seaer_show').val();
	if (seaerid == null || seaerid == '' || seaername == null || seaername == '')
	{
		alert('请选择运价员！');
		return;
	}

	var carrierid = $('#mdlipt_sea_carrierid').val();
	var carriername = $('#mdlipt_sea_carrierid_show').val();
	if (carrierid == null || carrierid == '' || carriername == null || carriername == '')
	{
		alert('请选择承运人！');
		return;
	}

	var effdate = $('#ETD_Start').val();
	var expdate = $('#ETD_End').val();
	if (effdate == null || effdate == '')
	{
		alert('请录入有效期起始日期！');
		return;
	}
	if (expdate == null || expdate == '')
	{
		alert('请录入有效期截止日期！');
		return;
	}

	var ckb_selecteds = $('#lineareaofseaergrid table tbody tr input[type="checkbox"]:checked');
	if (ckb_selecteds.length < 1)
	{
		alert('请选择航线！');
		return;
	}

	var pass = true;
	var lineid_arr = new Array();
	ckb_selecteds.each(function()
	{
		var lineid = $(this).closest('tr').find('td').eq(2).data('lineid');
		if (lineid == null || lineid == '')
		{
			alert('Invalid Param!');
			pass = false;
			return false;
		}
		lineid_arr.push(
		{
			lineid : lineid
		});
	});

	if (!pass)
	{
		return;
	}

	if (!confirm('确定提交吗？'))
	{
		window.event.returnValue = false;
		return;
	}

	$.ajax(
	{
		url : '/orderalloc/inputsearule',
		data :
		{
			'Staffid' : seaerid,
			'CarrierID' : carrierid,
			'lineids' : JSON.stringify(lineid_arr),
			'effdate' : effdate,
			'expdate' : expdate
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO hide modal refush data
				$('#inputSeaRuleModal').modal('hide');
				ajax_page_init($("#searulegrid"), "", $(this).serialize());
			}
		}
	})
});

// //-------------产装员订单分配-------------////
$('#inputTrailRuleModal').on('show.bs.modal', function(event)
{
	$('#mdlipt_trail_trailer').val('');
	$('#mdlipt_trail_trailer_show').val('');
	$('#ETD_Start').val('2015/05/01');
	$('#ETD_End').val('2020/01/01');
	$('#serviceroftrailergrid').empty();
});

$('#mdlipt_trail_query').click(
		function()
		{
			var staffid = $('#mdlipt_trail_trailer').val();
			var staffname = $('#mdlipt_trail_trailer_show').val();
			if (staffid == null || staffid == '' || staffname == null || staffname == '')
			{
				alert('请选择产装员！');
				return;
			}

			ajax_page_init($('#serviceroftrailergrid'), '/orderalloc/partial_serviceoftrailer',
					'staffid=' + staffid);
		});

$('.mdl_submit_ipttrailrule').click(function()
{
	var trailerid = $('#mdlipt_trail_trailer').val();
	var trailername = $('#mdlipt_trail_trailer_show').val();
	if (trailerid == null || trailerid == '' || trailername == null || trailername == '')
	{
		alert('请选择产装员！');
		return;
	}

	var effdate = $('#ETD_Start').val();
	var expdate = $('#ETD_End').val();
	if (effdate == null || effdate == '')
	{
		alert('请录入有效期起始日期！');
		return;
	}
	if (expdate == null || expdate == '')
	{
		alert('请录入有效期截止日期！');
		return;
	}

	var ckb_selecteds = $('#serviceroftrailergrid table tbody tr input[type="checkbox"]:checked');
	if (ckb_selecteds.length < 1)
	{
		alert('请选择客服！');
		return;
	}

	var pass = true;
	var servicerid_arr = new Array();
	ckb_selecteds.each(function()
	{
		var servicerid = $(this).closest('tr').find('td').eq(2).data('servicer');
		if (servicerid == null || servicerid == '')
		{
			alert('Invalid Param!');
			pass = false;
			return false;
		}
		servicerid_arr.push(
		{
			servicerid : servicerid
		});
	});

	if (!pass)
	{
		return;
	}

	if (!confirm('确定提交吗？'))
	{
		window.event.returnValue = false;
		return;
	}

	$.ajax(
	{
		url : '/orderalloc/inputtrailrule',
		data :
		{
			'Staffid' : trailerid,
			'serviceids' : JSON.stringify(servicerid_arr),
			'effdate' : effdate,
			'expdate' : expdate
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO hide modal refush data
				$('#inputTrailRuleModal').modal('hide');
				ajax_page_init($("#trailrulegrid"), "", $(this).serialize());
			}
		}
	})
});

// //-------------堆装员订单分配-------------////
$('#inputYardRuleModal').on('show.bs.modal', function(event)
{
	$('#mdlipt_yard_yarder').val('');
	$('#mdlipt_yard_yarder_show').val('');
	$('#ETD_Start').val('2015/05/01');
	$('#ETD_End').val('2020/01/01');
	$('#servicerofyardergrid').empty();
});

$('#mdlipt_yard_query').click(
		function()
		{
			var staffid = $('#mdlipt_yard_yarder').val();
			var staffname = $('#mdlipt_yard_yarder_show').val();
			if (staffid == null || staffid == '' || staffname == null || staffname == '')
			{
				alert('请选择堆装员！');
				return;
			}

			ajax_page_init($('#servicerofyardergrid'), '/orderalloc/partial_serviceofyarder',
					'staffid=' + staffid);
		});

$('.mdl_submit_iptyardrule').click(function()
{
	var yarderid = $('#mdlipt_yard_yarder').val();
	var yardername = $('#mdlipt_yard_yarder_show').val();
	if (yarderid == null || yarderid == '' || yardername == null || yardername == '')
	{
		alert('请选择堆装员！');
		return;
	}

	var effdate = $('#ETD_Start').val();
	var expdate = $('#ETD_End').val();
	if (effdate == null || effdate == '')
	{
		alert('请录入有效期起始日期！');
		return;
	}
	if (expdate == null || expdate == '')
	{
		alert('请录入有效期截止日期！');
		return;
	}

	var ckb_selecteds = $('#servicerofyardergrid table tbody tr input[type="checkbox"]:checked');
	if (ckb_selecteds.length < 1)
	{
		alert('请选择客服！');
		return;
	}

	var pass = true;
	var servicerid_arr = new Array();
	ckb_selecteds.each(function()
	{
		var servicerid = $(this).closest('tr').find('td').eq(2).data('servicer');
		if (servicerid == null || servicerid == '')
		{
			alert('Invalid Param!');
			pass = false;
			return false;
		}
		servicerid_arr.push(
		{
			servicerid : servicerid
		});
	});

	if (!pass)
	{
		return;
	}

	if (!confirm('确定提交吗？'))
	{
		window.event.returnValue = false;
		return;
	}

	$.ajax(
	{
		url : '/orderalloc/inputyardrule',
		data :
		{
			'Staffid' : yarderid,
			'serviceids' : JSON.stringify(servicerid_arr),
			'effdate' : effdate,
			'expdate' : expdate
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO hide modal refush data
				$('#inputYardRuleModal').modal('hide');
				ajax_page_init($("#yardrulegrid"), "", $(this).serialize());
			}
		}
	})
});

// ///--------------------订单分配微调-------------------/////
function getRolesByStaffId(text, value, obj)
{
	$('#roleid').val('');
	$('#roleid_show').val('');
	$.initStaticSelect("roleid", "roleid_selectList", "/orderalloc/getroleofuser", "staffid="
			+ value, "getUserByRole");
}

function getUserByRole(text, value, obj)
{
	$('#changestaffid').val('');
	$('#changestaffid_show').val('');
	$.initStaticSelect("changestaffid", "changestaffid_selectList", "/orderalloc/getusersbyrole",
			"roleid=" + value, "refreshorderlist");
}

function refreshorderlist(text, value, obj)
{
	$('#staffid1').val(value);
	ajax_page_init($("#orderownchangegrid"), "", $('#formfororderownchange').serialize());
}

$('#ownchange_btn_modify')
		.click(
				function()
				{
					var roleid = $('#roleid').val();
					var rolename = $('#roleid_show').val();
					if (roleid == null || roleid == '' || rolename == null || rolename == '')
					{
						alert('请选择岗位!');
						return;
					}

					var staffid = $('#changestaffid').val();
					var staffname = $('#changestaffid_show').val();
					if (staffid == null || staffid == '' || staffname == null || staffname == '')
					{
						alert('请选择要分配的操作员!');
						return;
					}
					
					var staffidori = $('#staffid').val();
					var staffnameori = $('#OperatorSH_Staff').val();
					
					if(staffidori==null || staffidori == '' || staffnameori == null || staffnameori == '')
					{
						alert('Invalid Param !');
						return;
					}

					var ckb_selecteds = $('#orderownchangegrid table tbody tr input[type="checkbox"]:checked');
					if (ckb_selecteds.length < 1)
					{
						alert('请选择要分配的订单！');
						return;
					}

					var pass = true;
					var orderid_arr = new Array();
					ckb_selecteds.each(function()
					{
						var td = $(this).closest('tr').find('td').eq(2);
						var orderid = td.data('orderid');
						if (orderid == null || orderid == '')
						{
							alert('Invalid Param!');
							pass = false;
							return pass;
						}
						orderid_arr.push(
						{
							orderid : orderid
						});
					});

					if (!pass)
					{
						return;
					}

					if (!confirm('确定要修改吗？'))
					{
						window.event.returnValue = false;
						return;
					}

					$.ajax(
					{
						url : '/orderalloc/orderownchange',
						data :
						{
							'roleid' : roleid,
							'staffid' : staffid,
							'orderids' : JSON.stringify(orderid_arr),
							'staffidori':staffidori
						},
						type : 'post',
						success : function(data)
						{
							var result = JSON.parse(data);
							alert(result.msg);
							if (result.success)
							{
								// TODO refuse data
								ajax_page_init($("#orderownchangegrid"), "", $(
										'#formfororderownchange').serialize());
							}
						}
					})
				});

function delorderalloc(id)
{
	var orderallocid = $('#'+id).data('orderallocid');
	var orderalloctype = $('#'+id).data('orderalloctype');
	if (orderallocid == null || orderallocid == '' || orderalloctype == null
			|| orderalloctype == '')
	{
		alert('Invalid Param!');
		return;
	}

	if (!confirm('确定删除吗？'))
	{
		window.event.returnValue = false;
		return;
	}

	var orderallocid_arr = new Array();
	orderallocid_arr.push(
	{
		orderallocid : orderallocid.toString()
	});

	$.ajax(
	{
		url : '/orderalloc/delorderalloc',
		data :
		{
			'orderalloctype' : orderalloctype,
			'orderallocids' : JSON.stringify(orderallocid_arr)
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO
				$('#'+id).closest('tr').remove();
			}
		}
	})
}

function delorderallocpl(id)
{
	var gridid = $('#'+id).data('gridid');
	var orderalloctype = $('#'+id).data('orderalloctype');
	if (gridid == null || gridid == '' || orderalloctype == null || orderalloctype == '')
	{
		alert('Invalid Param!');
		return;
	}

	var ckb_selecteds = $('#' + gridid + ' table tbody tr input[type="checkbox"]:checked');
	if (ckb_selecteds.length < 1)
	{
		alert('请选择要删除的数据！');
		return;
	}

	var pass = true;
	var orderallocid_arr = new Array();
	ckb_selecteds.each(function()
	{
		var orderallocid = $(this).closest('tr').find('td').eq(1).data('orderallocid');
		if (orderallocid == null || orderallocid == '')
		{
			alert('Invalid Param!');
			pass = false;
			return pass;
		}

		orderallocid_arr.push(
		{
			orderallocid : orderallocid.toString()
		});
	});

	if (!pass)
	{
		return;
	}

	if (!confirm('确定删除吗？'))
	{
		window.event.returnValue = false;
		return;
	}

	$.ajax(
	{
		url : '/orderalloc/delorderalloc',
		data :
		{
			'orderalloctype' : orderalloctype,
			'orderallocids' : JSON.stringify(orderallocid_arr)
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO
				ckb_selecteds.each(function()
				{
					$(this).closest('tr').remove();
				});
			}
		}
	});
}
