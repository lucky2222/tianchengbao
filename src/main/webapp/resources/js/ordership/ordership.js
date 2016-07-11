$('.ordership_editshipno').click(function()
{
	var ipt = $(this).parent().find('input').eq(0);
	var seaexpressloadid = ipt.data('seaexpressloadid');
	var shipno = ipt.val();

	if (seaexpressloadid == null || seaexpressloadid == '' || shipno == null || shipno == '')
	{
		alert('Invalid Param!');
		return;
	}

	$.ajax(
	{
		url : '/orderbook/editshipnoformanifestedi',
		data :
		{
			'seaexpressloadid' : seaexpressloadid,
			'shipno' : shipno
		},
		type : 'post',
		success : function(obj)
		{
			var result = JSON.parse(obj);
			alert(result.msg);
		}
	})
});

function autoportentran_callback(text, value, item)
{
	$(item).closest("div").closest("td").next().find("input").eq(0).val(value);
}

function autoportendeliver_callback(text, value, item)
{
	$(item).closest("div").closest("td").next().find("input").eq(0).val(value);
}

function autoportenpl_callback(text, value, item)
{
	$('#' + $(item).closest('div').prop('id').replace('autoList', 'code5')).val(value);
}

$('table thead input[type="checkbox"]').click(function()
{
	$('table tbody input[type="checkbox"]').prop('checked', $(this).prop('checked'));
});

$('table tbody input[type="checkbox"]').click(
		function()
		{
			if (!$(this).prop('checked'))
			{
				$(this).closest("table").find("thead tr ").children("th").eq(0).find(
						"input[type='checkbox']").prop("checked", false);
			}
			else
			{
				if ($(this).closest("table").find("tbody input[type='checkbox']").not(
						"input:checked").length == 0)
				{
					$(this).closest("table").find("thead tr ").children("th").eq(0).find(
							"input[type='checkbox']").prop("checked", true);
				}
			}
		});

$('.btn-save-editport').click(function()
{
	var tr = $(this).closest('tr');
	var orderid = tr.children('td').eq(2).children('a').eq(0).html();
	if (orderid == null || orderid == '')
	{
		alert('Invalid Param!');
		return;
	}

	var tranporten = tr.children('td').eq(9).find('input').eq(0).val();
	var tranportcode = tr.children('td').eq(10).find('input').eq(0).val();

	var deliveren = tr.children('td').eq(11).find('input').eq(0).val();
	var delivercode = tr.children('td').eq(12).find('input').eq(0).val();

	if ((tranportcode == null || tranportcode == '') && (delivercode == null || delivercode == ''))
	{
		alert('请录入舱单转港，或舱单交货地信息！');
		return;
	}

	var param_arr = new Array();
	var param =
	{
		orderid : orderid,
		tranporten : tranporten,
		tranportcode : tranportcode,
		deliveren : deliveren,
		delivercode : delivercode
	}

	param_arr.push(param);

	$.ajax(
	{
		url : '/orderbook/editmanifestport',
		data :
		{
			'param' : JSON.stringify(param_arr)
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
		}
	});
});

$('#ordersiv_btn_edittranport').click(function()
{
	var tranporten = $('#AutoTransPLSH_PortEn').val();
	var tranportcode = $('#portcodetranspl_code5').val();
	if (tranporten == null || tranporten == '' || tranportcode == null || tranportcode == '')
	{
		alert('请录入舱单转港信息！');
		return;
	}

	var param_arr = new Array();
	var pass = true;
	var ckbitem = $('table tbody input[type="checkbox"]:checked');
	if (ckbitem.length < 1)
	{
		alert('请选择您要编辑的委托！');
		return;
	}
	ckbitem.each(function()
	{
		var tr = $(this).closest('tr');
		var orderid = tr.children('td').eq(2).children('a').eq(0).html();
		if (orderid == null || orderid == '')
		{
			alert('Invalid Param!');
			pass = false;
			return false;
		}

		var param =
		{
			orderid : orderid,
			tranporten : tranporten,
			tranportcode : tranportcode,
			deliveren : '',
			delivercode : ''
		}

		param_arr.push(param);
	});
	if (!pass)
	{
		return;
	}

	$.ajax(
	{
		url : '/orderbook/editmanifestport',
		data :
		{
			'param' : JSON.stringify(param_arr)
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				ckbitem.each(function()
				{
					var tr = $(this).closest('tr');
					tr.children('td').eq(8).find('input').eq(0).val(tranporten);
					tr.children('td').eq(9).find('input').eq(0).val(tranportcode);
				});
			}
		}
	});
});

$('#ordersiv_btn_editdeliverport').click(
		function()
		{
			var deliverporten = $('#AutoDeliverPLSH_PortEn').val();
			var deliverportcode = $('#portcodedeliverpl_code5').val();
			if (deliverporten == null || deliverporten == '' || deliverportcode == null
					|| deliverportcode == '')
			{
				alert('请录入舱单交货地信息！');
				return;
			}

			var param_arr = new Array();
			var pass = true;
			var ckbitem = $('table tbody input[type="checkbox"]:checked');
			if (ckbitem.length < 1)
			{
				alert('请选择您要编辑的委托！');
				return;
			}
			ckbitem.each(function()
			{
				var tr = $(this).closest('tr');
				var orderid = tr.children('td').eq(2).children('a').eq(0).html();
				if (orderid == null || orderid == '')
				{
					alert('Invalid Param!');
					pass = false;
					return false;
				}

				var param =
				{
					orderid : orderid,
					tranporten : '',
					tranportcode : '',
					deliveren : deliverporten,
					delivercode : deliverportcode
				}

				param_arr.push(param);
			});
			if (!pass)
			{
				return;
			}

			$.ajax(
			{
				url : '/orderbook/editmanifestport',
				data :
				{
					'param' : JSON.stringify(param_arr)
				},
				type : 'post',
				success : function(data)
				{
					var result = JSON.parse(data);
					alert(result.msg);
					if (result.success)
					{
						ckbitem.each(function()
						{
							var tr = $(this).closest('tr');
							tr.children('td').eq(10).find('input').eq(0).val(deliverporten);
							tr.children('td').eq(11).find('input').eq(0).val(deliverportcode);
						});
					}
				}
			});
		});