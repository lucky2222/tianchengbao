function approvalTaxbackForEntry(idx, statuscode)
{
	if (idx == null || idx == '' || statuscode == null
			|| (!statuscode == -1 && !statuscode == 0 && !statuscode == 1))
	{
		alert('Invalid Params!');
		return;
	}

	var item = $('#entryfortaxback_row_' + idx);
	var orderid = item.data('orderid');
	var orderentryid = item.data('orderentryid');
	var manifestno = item.data('manifestno');

	if (orderid == null || orderid == '' || orderentryid == null || orderentryid == '')
	{
		alert('Invalid Params!');
		return;
	}

	var refuseremark = '';
	if (statuscode == 0)
	{
		// 拒绝
		refuseremark = item.find('input').eq(0).val();
		if (refuseremark == null || refuseremark == '')
		{
			alert('请输入拒绝原因！');
			return;
		}
	}

	var entry_arr = new Array();

	var entry_item =
	{
		orderid : orderid,
		orderentryid : orderentryid,
		refuseremark : refuseremark,
		manifestno : manifestno,
		statuscode : statuscode
	}

	entry_arr.push(entry_item);

	$.ajax(
	{
		url : '/orderfinance/approvaltaxbackforentry',
		data :
		{
			'statuscode' : statuscode,
			'taxbackparam' : JSON.stringify(entry_arr)
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			if (statuscode == 1)
			{
				alert('批准' + result.msg);
			}
			else if (statuscode == 0)
			{
				alert('拒绝' + result.msg);
			}
			else
			{
				alert('撤销' + result.msg);
			}
			if (result.success)
			{
				// TODO
				var id = JSON.parse(result.id);
				item.empty();
				var at = $('#entryfortaxback_row_at_' + idx);
				var au = $('#entryfortaxback_row_au_' + idx);
				if (statuscode == 1)
				{
					item.append('<i style="color:green;">已审批</i>');
					item.append('&nbsp;&nbsp;&nbsp;<a onclick="approvalTaxbackForEntry(' + idx
							+ ',-1);" href="javascript:void(0);">撤销</a>');
					if (at != null)
					{
						at.text(id.at);
					}
					if (au != null)
					{
						au.text(id.au);
					}
				}
				else if (statuscode == 0)
				{
					item.append('<i style="color:red;">已拒绝，原因：' + refuseremark + '</i>');
					item.append('&nbsp;&nbsp;&nbsp;<a onclick="approvalTaxbackForEntry(' + idx
							+ ',-1);" href="javascript:void(0);">撤销</a>');
					if (at != null)
					{
						at.text(id.at);
					}
					if (au != null)
					{
						au.text(id.au);
					}
				}
				else
				{
					item.append('<a onclick="approvalTaxbackForEntry(' + idx
							+ ',1);" href="javascript:void(0);">批准</a>'
							+ ' &nbsp;&nbsp;&nbsp;<a onclick="approvalTaxbackForEntry(' + idx
							+ ',0);" href="javascript:void(0);">拒绝</a>'
							+ ' <input type="text" placeholder="请输入拒绝原因">');
					if (at != null)
					{
						at.text('');
					}
					if (au != null)
					{
						au.text('');
					}
				}
			}
		}
	});
}

function approvalTaxbackForEntryPL(statuscode)
{
	if (statuscode == null || (statuscode != 1 && statuscode != 0 && statuscode != -1))
	{
		alert('Invalid Param');
		return;
	}

	var entry_arr = new Array();
	
	var cbkeds = $('table tbody input[name="ckbfortaxbackforentry"]:checked');
	if(cbkeds.length < 1)
	{
		alert('请先选择！');
		return;
	}
	var pass = true;
	cbkeds.each(
			function()
			{
				var orderid = $(this).data('orderid');
				var orderentryid = $(this).data('orderentryid');
				var refuseremark = '';
				var manifestno = $(this).data('manifestno');
				if (orderid == null || orderid == '' || orderentryid == null || orderentryid == ''
						|| manifestno == null || manifestno == '')
				{
					alert('Invalid Param!');
					pass= false;
					return false;
				}
				
				if(statuscode == 0)
				{
					var ipt = $('#entryfortaxback_row_'+$(this).data('flag')).find('input').eq(0);
					if(ipt == null)
					{
						alert('请输入拒绝原因！');
						pass= false;
						return false;
					}
					refuseremark = ipt.val();
					if(refuseremark == null || refuseremark == '')
					{
						alert('请输入拒绝原因！');
						pass= false;
						return false;
					}
				}
				var entry_item =
				{
					orderid : orderid,
					orderentryid : orderentryid,
					refuseremark : refuseremark,
					manifestno : manifestno,
					statuscode : statuscode
				}

				entry_arr.push(entry_item);
			});
	
	if(!pass)
	{
		return;
	}

	$.ajax(
	{
		url : '/orderfinance/approvaltaxbackforentry',
		data :
		{
			'statuscode' : statuscode,
			'taxbackparam' : JSON.stringify(entry_arr)
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			if (statuscode == 1)
			{
				alert('批准' + result.msg);
			}
			else if (statuscode == 0)
			{
				alert('拒绝' + result.msg);
			}
			else
			{
				alert('撤销' + result.msg);
			}
			if (result.success)
			{
				// TODO
				var id = JSON.parse(result.id);
				cbkeds.each(function(){
					var idx = $(this).data('flag');
					var item = $('#entryfortaxback_row_'+idx);
					var at = $('#entryfortaxback_row_at_' + idx);
					var au = $('#entryfortaxback_row_au_' + idx);
					if (statuscode == 1)
					{
						item.empty();
						item.append('<i style="color:green;">已审批</i>');
						item.append('&nbsp;&nbsp;&nbsp;<a onclick="approvalTaxbackForEntry(' + idx
								+ ',-1);" href="javascript:void(0);">撤销</a>');
						if (at != null)
						{
							at.text(id.at);
						}
						if (au != null)
						{
							au.text(id.au);
						}
					}
					else if (statuscode == 0)
					{
						var refuseremark = item.find('input').eq(0).val();
						item.empty();
						item.append('<i style="color:red;">已拒绝，原因：' + refuseremark + '</i>');
						item.append('&nbsp;&nbsp;&nbsp;<a onclick="approvalTaxbackForEntry(' + idx
								+ ',-1);" href="javascript:void(0);">撤销</a>');
						if (at != null)
						{
							at.text(id.at);
						}
						if (au != null)
						{
							au.text(id.au);
						}
					}
					else
					{
						item.empty();
						item.append('<a onclick="approvalTaxbackForEntry(' + idx
								+ ',1);" href="javascript:void(0);">批准</a>'
								+ ' &nbsp;&nbsp;&nbsp;<a onclick="approvalTaxbackForEntry(' + idx
								+ ',0);" href="javascript:void(0);">拒绝</a>'
								+ ' <input type="text" placeholder="请输入拒绝原因">');
						if (at != null)
						{
							at.text('');
						}
						if (au != null)
						{
							au.text('');
						}
					}
				});
			}
		}
	});
}
