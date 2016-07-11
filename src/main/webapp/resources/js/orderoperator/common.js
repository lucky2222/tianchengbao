//$('#mytab a').click(function(e){
//	 e.preventDefault();
//	 $(this).tab('show');
//});

$('.datetimepicker').datetimepicker(
{
	format : "yyyy/mm/dd hh:ii",
	autoclose : true,
	todayBtn : true,
	pickerPosition : "bottom-left",
	minuteStep : 30
});

// -- 录入产装信息 --------------//
$('#settrailer').on('shown.bs.modal', function(event)
{

	var containertype = '';// 箱型箱量 SOC
	var contact = '';// 客户联系人
	var tel = '';// 客户联系电话
	var date = '';// 产装时间
	var pkgremark = '';// 产装地址
	var remark = '';// 产装备注
	var ordercontainerpkgsids = '';// 装箱方式ID
	var ordercontainerids = '';// 箱型箱量ID
	var containerpkgtypeids = '';// 装箱类别ID
	var orderid = '';// 订单ID
	var url = '';// 产装要求
	var trailername = '';// 车队
	var trailerid = '';// 车队id
	var contactsid = '';// 车队联系人id
	var contacts = '';// 车队联系人
	var pkgaddress = '';// 产装地址

	var ckb_selecteds = $('#containertypesforcz_table tbody input[type="checkbox"]:checked');
	if (ckb_selecteds.size() < 1)
	{
		$('#settrailer').modal('hide');
		alert('请先选择箱型箱量');
		return event.preventDefault();
	}
	var kf = $('#roletypesforcz').data('kf');
	var cz = $('#roletypesforcz').data('cz');
	if (kf == null || cz == null)
	{
		$('#settrailer').modal('hide');
		alert('Invalid Param');
		return event.preventDefault();
	}
	ckb_selecteds.each(function(obj)
	{
		var obj = $(this).closest('tr').find('td').eq(1);
		if (obj.data('pkgconfirm') == 0 && !kf)
		{
			$('#settrailer').modal('hide');
			alert('客服未确认产装信息，不能安排车队！');
			return event.preventDefault();
		}
		orderid = obj.data('orderid');
		ordercontainerpkgsids += obj.data('ordercontainerpkgsid') + ';';
		ordercontainerids += obj.data('ordercontainerid') + ';';
		containerpkgtypeids = obj.data('containerpkgtypeid');
		containertype += obj.data('containertype');
		if (obj.data('soc') == '是')
		{
			containertype += ' SOC；';
		}
		else
		{
			containertype += ' 非SOC；';
		}
		contact = obj.data('contact');
		tel = obj.data('tel');
		date = obj.data('date');
		pkgremark = obj.data('pkgremark');
		remark = obj.data('remark');
		url = obj.data('url');
		trailername = obj.data('trailername');
		trailerid = obj.data('trailerid');
		contactsid = obj.data('contactsid');
		contacts = obj.data('contacts');
		pkgaddress = obj.data('pkgaddress');
	});

	var date = strToDate(date);
	var datestr = '';
	if (date != null)
	{
		datestr = date.Format('yyyy-MM-dd HH:mm');
	}
	if (kf == false)
	{
		$('#contactforcz').text(contact);
		$('#contacttelforcz').text(tel);

		$('#arrivedateforcz').text(datestr);
		$('#pkgaddressforcz').text(pkgaddress);
	}
	else
	{
		$('#contactforcz').val(contact);
		$('#contacttelforcz').val(tel);
		$('#arrivedateforcz').val(datestr);
		$('#pkgaddressforcz').val(pkgaddress);
		if (kf == true)
		{
			$('#urlforcz_par').val(url);
		}
	}
	$('#pkgremarkforcz').text(pkgremark);

	if (cz == false)
	{
		if (trailername == '')
		{
			trailername = '待录入...';
		}
		if (contacts == '')
		{
			contacts = '待录入...';
		}
		$('#TrailerSH_CompanyName').text(trailername);
		$('#TrailerSH_CompanyID').text(contacts);
	}
	else
	{
		$('#TrailerSH_CompanyName').val(trailername);
		$('#trailerId').val(trailerid);
		$('#TrailerSH_CompanyID').val(contacts);
		$('#trailerContactID').val(contactsid);
	}
	$('#remarkforcz').text(remark);

	$('#orderidforcz').val(orderid);
	$('#ordercontainerpkgsidsforcz').val(ordercontainerpkgsids);
	$('#containerpkgtypeidsforcz').val(containerpkgtypeids);
	$('#ordercontaineridsforcz').val(ordercontainerids)
	$('#lbcontainerforcz').text(containertype);

	if (url == null || url == '')
	{
		$('#urlforcz').text('');
		$('#urlforcz').attr('href', '#');
	}
	else
	{
		$('#urlforcz').text(url.substring(url.lastIndexOf('\\')));
		$('#urlforcz').attr('href', url);
	}

});

function getTrailerContact(text, value, obj)
{
	$('#TrailerSH_CompanyID').val('');
	$('#trailerContactID').val('');
	auto_page_init($("#trailerContactID_autoList"), "/sysmanage/contactautocomplete/" + value, "TrailerSH_CompanyID",
			"trailerContactID", "contacts", "ContactsID");
}

$('#formforinputczinfo').validate(
{
	rules :
	{
		trailerId : "required",
		trailerContactID : "required",
		// contactforcz : "required",
		// contacttelforcz : "required",
		arrivedateforcz : "required",
		pkgaddressforcz : "required"
	},
	messages :
	{
		trailerId : "必填",
		trailerContactID : "必填",
		// contactforcz : "必填",
		// contacttelforcz : "必填",
		arrivedateforcz : "必填",
		pkgaddressforcz : "必填"
	},
	submitHandler : function(form)
	{
		$.ajax(
		{
			url : "/orderoperator/inputczinfo",
			data : $("#formforinputczinfo").serialize(),
			type : "post",
			async : false,
			success : function(data)
			{
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success)
				{
					$('#settrailer').modal('hide');
					$('#orderidforcz').val('');
					$('#ordercontainerpkgsidsforcz').val('');
					$('#containerpkgtypeidsforcz').val('');
					$('#ordercontaineridsforcz').val('')
					$('#lbcontainerforcz').text('');
					$('#arrivedateforcz').val('');
					$('#pkgremarkforcz').text('');
					$('#contactforcz').val('');
					$('#contacttelforcz').val('');
					$('#remarkforcz').text('');
					ajax_page_init($("#containertypesforcz"), "", "");
				}
			}
		});
	}
});

// ---- 录入堆装信息 --------------------

$('#setyardinfo').on('shown.bs.modal', function(event)
{
	var containertype = '';// 箱型箱量 SOC
	var contact = '';// 客户联系人
	var tel = '';// 客户联系电话
	var date = '';// 到货时间
	var pkgremark = '';// 堆装地址
	var remark = '';// 装箱备注
	var ordercontainerpkgsids = '';// 装箱方式ID
	var ordercontainerids = '';// 箱型箱量ID
	var containerpkgtypeids = '';// 装箱类别ID
	var orderid = '';// 订单ID
	var storageinspection = '';// 是否监装
	var url = '';// 装箱要求
	var contactsid = '';// 堆场联系人id
	var contacts = '';// 堆场联系人
	var yardid = '';// 堆场id
	var yardname = '';// 堆场
	var inspectionortel = '';// 监装人电话
	var inspectionor = '';// 监装人
	// var pkgaddress = '';// 堆装地址

	var ckb_selecteds = $('#containertypesfordz_table tbody input[type="checkbox"]:checked');
	if (ckb_selecteds.size() < 1)
	{
		$('#setyardinfo').modal('hide');
		alert('请先选择箱型箱量');
		return event.preventDefault();
	}
	var kf = $('#roletypes').data('kf');
	var dz = $('#roletypes').data('dz');
	if (kf == null || dz == null)
	{
		$('#setyardinfo').modal('hide');
		alert('Invalid Param');
		return event.preventDefault();
	}
	ckb_selecteds.each(function(obj)
	{
		var obj = $(this).closest('tr').find('td').eq(1);
		if (obj.data('pkgconfirm') == 0 && !kf)
		{
			$('#setyardinfo').modal('hide');
			alert('客服未确认堆装信息，不能安排堆场！');
			return event.preventDefault();
		}
		orderid = obj.data('orderid');
		ordercontainerpkgsids += obj.data('ordercontainerpkgsid') + ';';
		ordercontainerids += obj.data('ordercontainerid') + ';';
		containerpkgtypeids = obj.data('containerpkgtypeid');
		containertype += obj.data('containertype') + '*' + obj.data('containeramount');
		if (obj.data('soc') == '是')
		{
			containertype += ' SOC；';
		}
		else
		{
			containertype += ' 非SOC；';
		}
		contact = obj.data('contact');
		tel = obj.data('tel');
		date = obj.data('date');
		pkgremark = obj.data('pkgremark');
		remark = obj.data('remark');
		storageinspection = obj.data('storageinspection');
		url = obj.data('url');
		contactsid = obj.data('contactsid');
		contacts = obj.data('contacts');
		yardid = obj.data('yardid');
		yardname = obj.data('yardname');
		inspectionortel = obj.data('inspectionortel');
		inspectionor = obj.data('inspectionor');
		// pkgaddress = obj.data('pkgaddress');
	});

	$('#orderidfordz').val(orderid);
	$('#ordercontainerpkgsidsfordz').val(ordercontainerpkgsids);
	$('#containerpkgtypeidsfordz').val(containerpkgtypeids);
	$('#ordercontaineridsfordz').val(ordercontainerids)
	$('#lbcontainerfordz').text(containertype);

	if (kf == false)
	{
		$('#arrivedatefordz').text(date);
		$('#contactfordz').text(contact);
		$('#contacttelfordz').text(tel);
	}
	else
	{
		$('#arrivedatefordz').val(date);
		$('#contactfordz').val(contact);
		$('#contacttelfordz').val(tel);
	}
	// $('#pkgaddressfordz').text(pkgaddress);
	$('#pkgremarkfordz').text(pkgremark);

	if (dz == false)
	{

		if (yardname == '')
		{
			yardname = '待录入...';
		}
		if (contacts == '')
		{
			contacts = '待录入...';
		}
		$('#YardSH_CompanyName').text(yardname);
		$('#YardSH_CompanyID').text(contacts);
	}
	else
	{
		$('#YardSH_CompanyName').val(yardname);
		$('#yardId').val(yardid);
		$('#YardSH_CompanyID').val(contacts);
		$('#yardContactID').val(contactsid);
	}
	$('#remarkfordz').text(remark);

	$('#storageinspectionfordz').val('');
	if (storageinspection == 1)
	{
		if (kf == true)
		{
			$('input[name="storageinspectionfordz"][value=1]').attr('checked', 'checked');
		}
		else if (kf == false)
		{
			$('#storageinspectionfordz').text('是');
		}
		if (dz == false)
		{
			$('#inspectionortelfordz').text(inspectionortel);
			$('#inspectionorfordz').text(inspectionor);
		}
		else
		{
			$('#inspectionortelfordz').val(inspectionortel);
			$('#inspectionorfordz').val(inspectionor);
		}

		$('#inspectionortelfordz').closest('p').css('display', 'block');
		$('#inspectionorfordz').closest('p').css('display', 'block');
	}
	else
	{
		if (kf == true)
		{
			$('input[name="storageinspectionfordz"][value=0]').attr('checked', 'checked');
		}
		else if (kf == false)
		{
			$('#storageinspectionfordz').text('否');
		}

		$('#inspectionortelfordz').closest('p').css('display', 'none');
		$('#inspectionorfordz').closest('p').css('display', 'none');
	}

	if (url == null || url == '')
	{
		$('#urlfordz').text('');
		$('#urlfordz').attr('href', '#');
		if (kf == true)
		{
			$('#urlfordz_par').val('');
		}
	}
	else
	{
		$('#urlfordz').text(url.substring(url.lastIndexOf('\\')));
		$('#urlfordz').attr('href', url);
		if (kf == true)
		{
			$('#urlfordz_par').val(url);
		}
	}
});

function getYardContact(text, value, obj)
{
	$('#YardSH_CompanyID').val('');
	$('#yardContactID').val('');
	auto_page_init($("#yardContactID_autoList"), "/sysmanage/contactautocomplete/" + value, "YardSH_CompanyID",
			"yardContactID", "contacts", "ContactsID");
}

$('#formforinputdzinfo').validate(
{
	rules :
	{
		yardId : "required",
		yardContactID : "required",
		// contactfordz : "required",
		// contacttelfordz : "required",
		arrivedatefordz : "required",
		storageinspectionfordz : "required",
	// pkgaddressfordz : "required",
	},
	messages :
	{
		yardId : "必填",
		yardContactID : "必填",
		// contactfordz : "必填",
		// contacttelfordz : "必填",
		arrivedatefordz : "必填",
		storageinspectionfordz : "必填",
	// pkgaddressfordz : "必填",
	},
	submitHandler : function(form)
	{
		$.ajax(
		{
			url : "/orderoperator/inputdzinfo",
			data : $("#formforinputdzinfo").serialize(),
			type : "post",
			async : false,
			success : function(data)
			{
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success)
				{
					$('#setyardinfo').modal('hide');
					$('#orderidfordz').val('');
					$('#ordercontainerpkgsidsfordz').val('');
					$('#containerpkgtypeidsfordz').val('');
					$('#ordercontaineridsfordz').val('')
					$('#lbcontainerfordz').text('');
					$('#arrivedatefordz').val('');
					$('#pkgremarkfordz').text('');
					$('#contactfordz').val('');
					$('#contacttelfordz').val('');
					$('#remarkfordz').text('');
					$('#storageinspectionfordz').val('');
					$('#urlfordz').text('无');
					$('#urlfordz').attr('href', '#');

					ajax_page_init($("#containertypesfordz"), "", "");
				}
			}
		});
	}
});

// ----- 堆装录入箱封号--------

$('#inputContainerSealNoDZ').on(
		'show.bs.modal',
		function(event)
		{
			$('#tbody_ctnsealno_dz_ipt').empty();
			$('#p_ctnsealno_dz_ipt').empty();

			var containertype = '';
			var containeramount = 0;
			var orderid = '';
			var containertypeid = '';
			var ordercontainerid = '';

			var button = $(event.relatedTarget).parent().parent().find('td').eq(1);
			containertype = button.data('containertype');
			containeramount = button.data('containeramount');
			ordercontainerid = button.data('ordercontainerid');
			orderid = button.data('orderid');
			containertypeid = button.data('containertypeid');
			var yardname = button.data('yardname');
			if (yardname == null || yardname == '')
			{
				alert('未选择堆场，不能录入箱封号');
				return event.preventDefault();
			}
			var tbds = $('#containersealnofordzgridlist_table').find('tbody');
			var trs = tbds.eq(0).find('tr');
			var n = 0;
			for (var i = 0; i < trs.length; i++)
			{
				var tds = trs.eq(i).find('td');
				var td = tds.eq(2);
				if (tds.eq(0).find('input').eq(0).attr('data-ordercontainerid') == ordercontainerid)
				{
					n++;
				}
			}

			if (n < containeramount)
			{
				for (var i = 1; i <= containeramount - n; i++)
				{
					$('#tbody_ctnsealno_dz_ipt').append(
							'<tr><td>' + i + '</td>' + '<td>' + containertype + '</td>'
									+ '<td><input type="text" value="" placeholder="箱号"/></td>'
									+ '<td><input type="text" value="" placeholder="封号"/></td>'
									+ '<td><input type="number" value="" placeholder="件数"/></td>' + '</tr>');
				}
			}
			else
			{
				alert('该箱型箱量铅封号已录入完成，不可继续添加！');
				return event.preventDefault();
			}
			$('#p_ctnsealno_dz_ipt').append(
					'堆场：' + button.data('yardname') + '<br /> 箱型箱量：' + containertype + '*' + containeramount);

			$('#mdl_ctnsealno_orderid_dz_ipt').val(orderid);
			$('#mdl_ctnsealno_ordercontainerid_dz_ipt').val(ordercontainerid);
			$('#mdl_ctnsealno_containertypeid_dz_ipt').val(containertypeid);
		});

$('#submit_ctnsealno_dz_ipt').click(function()
{
	var orderid = $('#mdl_ctnsealno_orderid_dz_ipt').val();// 订单Id
	var ordercontainerid = $('#mdl_ctnsealno_ordercontainerid_dz_ipt').val();// 箱型箱量ID
	var containertypeid = $('#mdl_ctnsealno_containertypeid_dz_ipt').val();// 箱型ID
	var containersealno_arr = new Array();

	var trs = $('#tbody_ctnsealno_dz_ipt').find('tr');
	if (trs.length == 0)
	{
		alert('无需提交，请关闭！');
		return;
	}
	for (var i = 0; i < trs.length; i++)
	{
		var tds = trs.eq(i).find('td');
		var ctnno = tds.eq(2).find('input').eq(0).val();
		var sealno = tds.eq(3).find('input').eq(0).val();
		var number = tds.eq(4).find('input').eq(0).val();
		if ((ctnno != null && ctnno != '') || (sealno != null && sealno != '') || (number != null && number != ''))
		{
			if (ctnno == null || ctnno == '')
			{
				alert('请录入箱号');
				return;
			}

			if (sealno == null || sealno == '')
			{
				alert('请录入铅封号');
				return;
			}

			// if (number == null || number == '')
			// {
			// alert('请录入分箱件数');
			// return;
			// }

			var containersealno_item =
			{
				ordercontainersealnoid : 0,
				containertypeid : '',
				number : '',
				weight : '',
				volume : '',
				containerno : ctnno,
				sealno : sealno,
				opnumber : number,
				ordercontainerid : ordercontainerid
			}

			containersealno_arr.push(containersealno_item);
		}
	}

	var params = {};
	params['orderid'] = orderid;
	params['ordercontainerid'] = ordercontainerid;
	params['containertypeid'] = containertypeid;
	// params['containernos'] = containernos;
	// params['sealnos'] = sealnos;
	// params['opnumbers'] = opnumbers;
	params['pkgtype'] = '116102';// 堆装
	// params['containersealnoids'] = containersealnoids;
	params['containersealno'] = JSON.stringify(containersealno_arr);

	$.ajax(
	{
		url : "/orderoperator/inputcontainersealnoinfo",
		data : params,
		type : "post",
		async : false,
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				$('#inputContainerSealNoDZ').modal('hide');
				$('#tbody_ctnsealno_dz_ipt').empty();
				$('#mdl_ctnsealno_orderid_dz_ipt').val('');
				$('#mdl_ctnsealno_ordercontainerid_dz_ipt').val('');
				$('#mdl_ctnsealno_containertypeid_dz_ipt').val('');
				$('#p_ctnsealno_dz_ipt').empty();

				// TODO 刷新页面
				ajax_page_init($("#containersealnofordzgridlist"), "", "");
			}
		}
	});
});

// ------ 产装录入箱封号 ----------------------
$('#inputContainerSealNoCZ').on(
		'shown.bs.modal',
		function(event)
		{
			$('#tbody_ctnsealno_cz_ipt').empty();
			$('#p_ctnsealno_cz_ipt').empty();

			var containertype = '';
			var containeramount = 0;
			var orderid = '';
			var containertypeid = '';
			var ordercontainerid = '';

			var button = $(event.relatedTarget).parent().parent().find('td').eq(1);
			containertype = button.data('containertype');
			containeramount = button.data('containeramount');
			ordercontainerid = button.data('ordercontainerid');
			orderid = button.data('orderid');
			containertypeid = button.data('containertypeid');
			var tailername = button.data('trailername');
			if (tailername == null || tailername == '')
			{
				$('#inputContainerSealNoCZ').modal('hide');
				alert('未选择车队，不能录入箱封号');
				return event.preventDefault();
			}
			var tbds = $('#containersealnoforczgridlist_table').find('tbody');
			var trs = tbds.eq(0).find('tr');
			var n = 0;
			for (var i = 0; i < trs.length; i++)
			{
				var tds = trs.eq(i).find('td');
				var td = tds.eq(2);
				if (tds.eq(0).find('input').eq(0).data('ordercontainerid') == ordercontainerid)
				{
					n++;
				}
			}

			if (n < containeramount)
			{
				for (var i = 1; i <= containeramount - n; i++)
				{
					$('#tbody_ctnsealno_cz_ipt').append(
							'<tr><td>' + i + '</td>' + '<td>' + containertype + '</td>'
									+ '<td><input type="text" value="" placeholder="箱号"/></td>'
									+ '<td><input type="text" value="" placeholder="封号"/></td>'
									+ '<td><input type="text" value="" placeholder="车牌号" /></td>'
									+ '<td><input type="text" value="" placeholder="司机电话" /></td>'
									+ '<td><input type="text" placeholder="出发时间" class="StartDate" />'
									+ '<td><input type="text" placeholder="预计时间" class="StartDate" />'
									+ '<td><input type="text" placeholder="实际时间" class="StartDate" />' + '</tr>');
				}

				$("#tbody_ctnsealno_cz_ipt .StartDate").datetimepicker(
				{
					format : "yyyy/mm/dd hh:ii",
					autoclose : true,
					todayBtn : true,
					pickerPosition : "bottom-left",
					minuteStep : 30
				});
			}
			else
			{
				$('#inputContainerSealNoCZ').modal('hide');
				alert('该箱型箱量铅封号已录入完成，不可继续添加！');
				return event.preventDefault();
			}
			$('#p_ctnsealno_cz_ipt')
					.append('车队：' + tailername + '<br /> 箱型箱量：' + containertype + '*' + containeramount);

			$('#mdl_ctnsealno_orderid_cz_ipt').val(orderid);
			$('#mdl_ctnsealno_ordercontainerid_cz_ipt').val(ordercontainerid);
			$('#mdl_ctnsealno_containertypeid_cz_ipt').val(containertypeid);
		});

$('#submit_ctnsealno_cz_ipt').click(function()
{
	var orderid = $('#mdl_ctnsealno_orderid_cz_ipt').val();// 订单Id
	var ordercontainerid = $('#mdl_ctnsealno_ordercontainerid_cz_ipt').val();// 箱型箱量ID
	var containertypeid = $('#mdl_ctnsealno_containertypeid_cz_ipt').val();// 箱型ID
	var containersealno_arr = new Array();

	var trs = $('#tbody_ctnsealno_cz_ipt').find('tr');
	if (trs.length == 0)
	{
		alert('无需提交，请关闭！');
		return;
	}
	for (var i = 0; i < trs.length; i++)
	{
		var tds = trs.eq(i).find('td');
		var ctnno = tds.eq(2).find('input').eq(0).val();
		var sealno = tds.eq(3).find('input').eq(0).val();
		var truckno = tds.eq(4).find('input').eq(0).val();
		var truckertel = tds.eq(5).find('input').eq(0).val();
		var starttime = tds.eq(6).find('input').eq(0).val();
		var forcasttime = tds.eq(7).find('input').eq(0).val();
		var realtime = tds.eq(8).find('input').eq(0).val();
		if ((ctnno != null && ctnno != '') || (sealno != null && sealno != ''))
		{
			if (ctnno == null || ctnno == '')
			{
				alert('请录入箱号');
				return;
			}

			if (sealno == null || sealno == '')
			{
				alert('请录入铅封号');
				return;
			}

			var containersealno_item =
			{
				containerno : ctnno,
				sealno : sealno,
				ordercontainerid : ordercontainerid,
				truckno : truckno,
				truckertel : truckertel,
				starttime : starttime,
				forcasttime : forcasttime,
				realtime : realtime
			}

			containersealno_arr.push(containersealno_item);
		}
	}

	var params = {};
	params['orderid'] = orderid;
	params['ordercontainerid'] = ordercontainerid;
	params['containertypeid'] = containertypeid;
	params['pkgtype'] = '116101';// 产装
	params['containersealno'] = JSON.stringify(containersealno_arr);

	$.ajax(
	{
		url : "/orderoperator/inputcontainersealnoinfo",
		data : params,
		type : "post",
		async : false,
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				$('#inputContainerSealNoCZ').modal('hide');
				$('#tbody_ctnsealno_cz_ipt').empty();
				$('#mdl_ctnsealno_orderid_cz_ipt').val('');
				$('#mdl_ctnsealno_ordercontainerid_cz_ipt').val('');
				$('#mdl_ctnsealno_containertypeid_cz_ipt').val('');
				$('#p_ctnsealno_cz_ipt').empty();

				// TODO 刷新页面
				ajax_page_init($("#containersealnoforczgridlist"), "", "");
			}
		}
	});
});

// 产装修改箱封号、件数、车牌号、手机电话、出发时间
function upt_ctnsealnoinfo_forcz(idx)
{
	var tds = $('#containersealno_cz_' + idx).parent().parent().children();
	var ctnsealnoid = tds.eq(0).children().eq(0).data('ordercontainersealnoid');
	var orderid = tds.eq(0).children().eq(0).data('orderid');
	var truckcontainerinfoid = tds.eq(0).children().eq(0).data('truckcontainerinfoid');
	var ctnno = tds.eq(2).children().eq(0).val();
	var sealno = tds.eq(3).children().eq(0).val();
	var truckno = tds.eq(4).children().eq(0).val();
	var truckertel = tds.eq(5).children().eq(0).val();
	var starttime = tds.eq(6).children().eq(0).val();
	var forcasttime = tds.eq(7).children().eq(0).val();
	var realtime = tds.eq(8).children().eq(0).val();
	var ordercontainerid = tds.eq(0).children().eq(0).data('ordercontainerid');

	if (orderid == null || orderid == '' || ctnsealnoid == null || ctnsealnoid == '' || ordercontainerid == null
			|| ordercontainerid == '')
	{
		alert('Invalid Param!');
		return;
	}
	if (ctnno == null || ctnno == '')
	{
		alert('箱号不能为空！');
		return;
	}
	// if (sealno == null || sealno == '')
	// {
	// alert('铅封号不能为空！');
	// return;
	// }

	var params = {};
	params['orderid'] = orderid;
	params['containersealnoid'] = ctnsealnoid;
	params['truckcontainerinfoid'] = truckcontainerinfoid;
	params['containerno'] = ctnno;
	params['sealno'] = sealno;
	params['truckno'] = truckno;
	params['truckertel'] = truckertel;
	params['starttime'] = starttime;
	params['forcasttime'] = forcasttime;
	params['realtime'] = realtime;
	params['pkgtype'] = '116101';// 116101==产装
	params['ordercontainerid'] = ordercontainerid;

	$.ajax(
	{
		url : "/orderoperator/uptcontainersealnoinfo",
		data : params,
		type : "post",
		async : false,
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				ajax_page_init($("#containersealnoforczgridlist"), "", "");
			}
		}
	});
}

// 堆装修改箱封号、件数
function upt_ctnsealnoinfo_fordz(idx)
{
	var tds = $('#containersealno_dz_' + idx).parent().parent().children();
	var ctnsealnoid = tds.eq(0).children().eq(0).data('ordercontainersealnoid');
	var orderid = tds.eq(0).children().eq(0).data('orderid');
	var ctnno = tds.eq(2).children().eq(0).val();
	var sealno = tds.eq(3).children().eq(0).val();
	var ordercontainerid = tds.eq(0).children().eq(0).data('ordercontainerid');
	var opnumber = tds.eq(4).children().eq(0).val();

	if (orderid == null || orderid == '' || ctnsealnoid == null || ctnsealnoid == '' || ordercontainerid == null
			|| ordercontainerid == '')
	{
		alert('Invalid Param!');
		return;
	}
	if (ctnno == null || ctnno == '')
	{
		alert('箱号不能为空！');
		return;
	}
	// if (sealno == null || sealno == '')
	// {
	// alert('铅封号不能为空！');
	// return;
	// }
	if (opnumber == null || opnumber == '')
	{
		alert('件数不能为空！');
		return;
	}

	var params = {};
	params['orderid'] = orderid;
	params['containersealnoid'] = ctnsealnoid;
	params['containerno'] = ctnno;
	params['sealno'] = sealno;
	params['pkgtype'] = '116102';// 116102==堆装
	params['ordercontainerid'] = ordercontainerid;
	params['opnumber'] = opnumber;

	$.ajax(
	{
		url : "/orderoperator/uptcontainersealnoinfo",
		data : params,
		type : "post",
		async : false,
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				ajax_page_init($("#containersealnofordzgridlist"), "", "");
			}
		}
	});
}

// ------------报关信息编辑---------------
$('#editEntryInfo').on('shown.bs.modal', function(event)
{
	// TODO
	var obj = $(event.relatedTarget);
	var opertype = obj.data('opertype');
	if (opertype == null || (!opertype == 'add' && !opertype == 'modify'))
	{
		alert('Invalid Param!');
		$('#editEntryInfo').modal('hide');
		return;
	}
	if (opertype == 'modify')
	{
		var button = $(event.relatedTarget).parent();
		var tr = button.parent();

		var orderid = button.data('orderid');
		var orderentryid = button.data('orderentryid');
		var mainfestno = tr.find('td').eq(1).text();
		var oprerationcompany = tr.find('td').eq(3).text();
		var cargonamecn = tr.find('td').eq(4).text();
		var cargonameen = button.data('cargonameen');
		var hscode = tr.find('td').eq(5).text();
		var customsno = tr.find('td').eq(6).text();
		var manifeststatus = button.data('manifeststatus');// 舱单状态
		var arrivedstatus = button.data('arrivedstatus');// 运抵状态
		var ischeck = button.data('ischeck');// 验货状态
		var releasetime = tr.find('td').eq(10).text();// 放行时间
		var preassigntime = tr.find('td').eq(11).text();// 预留时间
		// var chargebacktime = tr.find('td').eq(12).text();//
		// 退单时间
		// var approvaluser = button.data('approvaluser');// 审批人
		// var approvaltime = tr.find('td').eq(14).text();//
		// 审批时间
		var ordermanifestid = button.data('ordermanifestid');

		var orderentryno = tr.find('td').eq(2).text();

		$('#mentry_lb_mainfestno').html(mainfestno);
		$('#mentry_ipt_orderentryno').val(orderentryno);
		$('#mentry_ipt_oprerationcompany').val(oprerationcompany);
		$('#mentry_ipt_hscode').val(hscode);
		$('#HSCode').val(hscode);
		$('#mentry_ipt_cargonameen').val(cargonameen);
		$('#mentry_ipt_cargonamecn').val(cargonamecn);
		$('#mentry_ipt_customsno').val(customsno);
		// $('#mentry_hipt_approvaluser').val(approvaluser);
		// $('#mentry_hipt_approvaltime').val(approvaltime);

		var opts = $('#mentry_opt_manifeststatus')[0].options;
		for (var i = 0; i < opts.length; i++)
		{
			if (opts[i].value == manifeststatus)
			{
				opts[i].selected = true;
				break;
			}
		}

		opts = $('#mentry_opt_arrivedstatus')[0].options;
		for (var i = 0; i < opts.length; i++)
		{
			if (opts[i].value == arrivedstatus)
			{
				opts[i].selected = true;
				break;
			}
		}

		opts = $('#mentry_opt_ischeck')[0].options;
		for (var i = 0; i < opts.length; i++)
		{
			if (opts[i].value == ischeck)
			{
				opts[i].selected = true;
				break;
			}
		}

		$('#mentry_ipt_relesedate').val(releasetime);
		$('#mentry_ipt_preassigndate').val(preassigntime);
		// $('#mentry_ipt_chargebackdate').val(chargebacktime);
		$('#mentry_hipt_orderid').val(orderid);
		$('#mentry_hipt_orderentryid').val(orderentryid);
		$('#mentry_hipt_ordermanifestid').val(ordermanifestid);

		var li = $('#mentry_lb_mainfestno').closest('li');
		$('#mentry_lb_mainfestno').remove();
		li.append('<label id="mentry_lb_mainfestno"></label>');
		$('#mentry_lb_mainfestno').text(mainfestno);
	}
	else
	{
		var orderid = obj.data('orderid');
		if (orderid == null || orderid == '')
		{
			alert('Invalid Param!');
			return;
		}
		$('#mentry_hipt_orderid').val(orderid);
		var li = $('#mentry_lb_mainfestno').closest('li');
		$('#mentry_lb_mainfestno').remove();
		li.append('<input type="text" id="mentry_lb_mainfestno" name="mainfestno" size="100" placeholder="舱单号">');
	}
	$('#mentry_hipt_opertype').val(opertype);
});

$('#formforeditentryinfo').validate(
{
	rules :
	{
		oprerationcompany : "required",
		hscode : "required",
		cargonameen : "required",
		cargonamecn : "required",
		// customsno : "required",
		hscode : "required",
		orderentryno : "required",
		mainfestno : "required"
	},
	messages :
	{
		oprerationcompany : "必填",
		hscode : "必填",
		cargonameen : "必填",
		cargonamecn : "必填",
		// customsno : "必填",
		hscode : "必填",
		orderentryno : "必填",
		mainfestno : "必填"
	},
	submitHandler : function(form)
	{
		$.ajax(
		{
			url : "/orderoperator/editentryinfo",
			data : $("#formforeditentryinfo").serialize(),
			type : "post",
			async : false,
			success : function(data)
			{
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success)
				{
					$('#editEntryInfo').modal('hide');

					$('#mentry_lb_mainfestno').html('');
					$('#mentry_ipt_oprerationcompany').val('');
					$('#mentry_ipt_hscode').val('');
					$('#mentry_ipt_cargonameen').val('');
					$('#mentry_ipt_cargonamecn').val('');
					$('#mentry_ipt_customsno').val('');
					$('#mentry_ipt_relesedate').val('');
					$('#mentry_ipt_preassigndate').val('');
					$('#mentry_ipt_chargebackdate').val('');
					$('#mentry_hipt_orderid').val('');
					$('#mentry_hipt_orderentryid').val('');
					$('#mentry_hipt_approvaluser').val('');
					$('#mentry_hipt_approvaltime').val('');
					$('#mentry_ipt_orderentryno').val('');

					// TODO 刷新报关列表
					ajax_page_init($("#orderforentrygridlist"), "", "");
				}
			}
		});
	}
});

// ------------- 报关单据上传 ------------
$('#entryCert')
		.on(
				'show.bs.modal',
				function(event)
				{
					// TODO
					var button = $(event.relatedTarget).parent();
					var tr = button.parent();

					var orderid = button.data('orderid');
					var orderentryid = button.data('orderentryid');
					var mainfestno = tr.find('td').eq(1).text();
					var cargonamecn = tr.find('td').eq(3).text();
					var ordercertdetailid = button.data('ordercertdetailid');

					if (orderentryid == null || orderentryid == '')
					{
						alert('请先点击编辑，录入报关信息');
						return event.preventDefault();
					}

					$('#mentrycert_hipt_orderentryid').val(orderentryid);
					$('#mentrycert_hipt_orderid').val(orderid);

					$('#mentry_upl_baseinfo').html('舱单号：' + mainfestno + '<br /> 品名：' + cargonamecn);

					var tbody = $('#mentrycert_body');
					tbody.empty();

					$
							.ajax(
							{
								url : "/orderoperator/certforentrygrid",
								data :
								{
									"orderentryid" : orderentryid,
									"orderid" : orderid
								},
								type : "post",
								async : true,
								success : function(data)
								{
									var result = JSON.parse(data);
									var certs = JSON.parse(result.msg);
									var funrights = JSON.parse(result.id);
									var trshtml = "";
									var entrycertok = result.redirect;
									if (entrycertok == null || entrycertok == 'invalid')
									{
										alert('Invalid Param!');
										return;
									}

									if (entrycertok == 1)
									{
										for (var i = 0; i < certs.length; i++)
										{
											trshtml += '<tr>' + '<td>' + (i + 1) + '</td>' + '<td>'
													+ certs[i].certtypename + '</td>';
											if (certs[i].approvalstatusid == null
													|| certs[i].approvalstatusid != '102103')
											{
												trshtml += '<td>--</td>';
											}
											else
											{
												trshtml += '<td><a href="/orderoperator/download/entrycert/'
														+ certs[i].ordercertdetailid + '">' + certs[i].remark
														+ '</a></td>';
											}
											trshtml += '<td>单据OK</td></tr>';
										}
									}
									else
									{
										for (var i = 0; i < certs.length; i++)
										{
											trshtml += '<tr data-certid="' + certs[i].certid
													+ '" data-ordercertdetailid="' + ordercertdetailid + '">' + '<td>'
													+ (i + 1) + '</td>' + '<td>' + certs[i].certtypename + '</td>';
											if (certs[i].approvalstatusid == null
													|| certs[i].approvalstatusid == '102101')
											{
												if (funrights.entrycertapproval == 'entrycertapproval')
												{
													trshtml += '<td>--</td>';
												}
												else
												{
													trshtml += '<td><input name="mentrycert_upl_' + i
															+ '" id="mentrycert_upl_' + i
															+ '" type="file"/><a onclick="uploadcertforentry(' + i
															+ ');" href="#">上传</a></td>';
												}
												trshtml += '<td>未上传</td>';
											}
											else
											{
												if (funrights.entrycertapproval == 'entrycertapproval')
												{
													trshtml += '<td><a href="/orderoperator/download/entrycert/'
															+ certs[i].ordercertdetailid + '">' + certs[i].remark
															+ '</a></td>';
												}
												else
												{
													trshtml += '<td><a href="/orderoperator/download/entrycert/'
															+ certs[i].ordercertdetailid + '">' + certs[i].remark
															+ '</a>';
													if (certs[i].approvalstatusid != '102103')
													{
														trshtml += '&nbsp;&nbsp;&nbsp;&nbsp;<input name="mentrycert_upl_'
																+ i
																+ '" id="mentrycert_upl_'
																+ i
																+ '" type="file"/><a onclick="uploadcertforentry('
																+ i
																+ ');" href="#">上传</a>';
													}
													trshtml += '</td>';
												}

												if (certs[i].approvalstatusid == '102102')
												{
													if (funrights.entrycertapproval == 'entrycertapproval')
													{
														trshtml += '<td><a onclick="approvalcertforentry(&quot;'
																+ certs[i].ordercertdetailid
																+ '&quot;,1,'
																+ i
																+ ')" href="#">批准</a>&nbsp;<a onclick="approvalcertforentry(&quot;'
																+ certs[i].ordercertdetailid
																+ '&quot;,0,'
																+ i
																+ ')" href="#">拒绝</a>&nbsp;<input type="text" placeholder="请输入拒绝原因"/></td>';
													}
													else
													{
														trshtml += '<td>未审批</td>';
													}
												}
												else if (certs[i].approvalstatusid == '102103')
												{
													trshtml += '<td>已审批</td>';
												}
												else if (certs[i].approvalstatusid == '102104')
												{
													trshtml += '<td>已拒绝：<strong>' + certs[i].remark + '</strong></td>';
												}
											}
											trshtml += '</tr>';
										}
									}

									tbody.append(trshtml);
								}
							});
				});

function fileUploadEntry()
{
	var orderid = $('#custmos_orderidforentryfile').val();
	if (orderid == null || orderid == '')
	{
		alert('Invalid Param!');
		return;
	}
	if ($('#uploadentryfileforkf').val() == null || $('#uploadentryfileforkf').val() == '')
	{
		alert('请选择要上传的文件');
		return;
	}

	$.ajaxFileUpload(
	{
		url : "/orderoperator/uploadentryfile",
		secureuri : false,
		fileElementId : 'uploadentryfileforkf',// file控件id
		data :
		{
			'fileElementId' : 'uploadentryfileforkf',
			'orderid' : orderid,
		},
		dataType : String,
		success : function(data)
		{
			// TODO 刷新单据列表
			ajax_page_init($("#entryfilegrid_div"), "/orderoperator/partial_entryfile/" + orderid, "");
		}
	});
}

function uploadcertforentry(idx)
{

	var obj = $('#mentrycert_upl_' + idx);
	if (obj.val() == null || obj.val() == '')
	{
		alert('请选择要上传的文件！');
		return;
	}

	var tr = obj.parent().parent();
	var ordercertdetailid = tr.data('ordercertdetailid');
	var orderid = $('#mentrycert_hipt_orderid').val();
	var orderentryid = $('#mentrycert_hipt_orderentryid').val();
	var certid = tr.data('certid');

	$.ajaxFileUpload(
	{
		url : "/orderoperator/uploadcertforentry",// 处理图片脚本
		secureuri : false,
		fileElementId : 'mentrycert_upl_' + idx,// file控件id
		data :
		{
			'fileElementId' : 'mentrycert_upl_' + idx,
			'orderid' : orderid,
			'orderentryid' : orderentryid,
			'ordercertdetailid' : ordercertdetailid,
			'certid' : certid
		},
		dataType : String,
		success : function(data)
		{
			var result = JSON.parse(data);
			var certinfo = JSON.parse(result.id);
			alert(result.msg);
			if (result.success)
			{
				tr.attr('data-ordercertdetailid', certinfo.ordercertdetailid);
				var td2 = tr.find('td').eq(2);
				td2.empty();
				td2.append('<a href="/orderoperator/download/entrycert/' + certinfo.ordercertdetailid + '">'
						+ certinfo.filename + '</a>&nbsp;&nbsp;&nbsp;&nbsp;<input name="mentrycert_upl_' + idx
						+ '" id="mentrycert_upl_' + idx + '" type="file"/><a onclick="uploadcertforentry(' + idx
						+ ');" href="#">上传</a>');

				var td3 = tr.find('td').eq(3);
				td3.empty();
				td3.append('未审批');
			}
		}
	});

}

function deletecertforentry(certdetailid, idx)
{
	if (certdetailid == null || certdetailid == '')
	{
		alert('Invalid Param');
		return;
	}
	var obj = $('#mentrycert_upl_' + idx);
	var tr = obj.parent().parent();

	$.ajax(
	{
		url : '/orderoperator/deletecertforentry',
		data :
		{
			'ordercertdetailid' : certdetailid
		},
		async : false,
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				tr.attr('data-ordercertdetailid', '');
				var i = tr.find('td').eq(0).text();
				var td2 = tr.find('td').eq(2);
				td2.empty();
				td2.append('<input name="mentrycert_upl_' + i + '" id="mentrycert_upl_' + i
						+ '" type="file" /><a onclick="uploadcertforentry(' + i + ');" href="#">上传</a>');
				var td3 = tr.find('td').eq(3);
				td3.empty();
				td3.append('--');
			}
		}
	});
}

function approvalcertforentry(certdetailid, status, idx)
{
	if (certdetailid == null || certdetailid == '' || status == null || status == '' || (status != 1 && status != 0))
	{
		alert('Invalid Params!');
		return;
	}

	var obj = $('#mentrycert_upl_' + idx);
	var tr = obj.parent().parent();
	var approvalremark = tr.find('td').eq(3).find('input').eq(0).val();

	$.ajax(
	{
		url : '/orderoperator/approvalcertforentry',
		data :
		{
			'ordercertdetailid' : certdetailid,
			'approvalremark' : approvalremark,
			'approvalstatus' : status
		},
		type : 'post',
		async : false,
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				var td3 = tr.find('td').eq(3);
				td3.empty();
				td3.append('已通过');
			}
		}
	});
}

function confirmcertforentrystatus(orderid, certstatus)
{
	if (orderid == null || orderid == '' || certstatus == null || certstatus == '')
	{
		alert('Invalid Params!');
		return;
	}

	$.ajax(
	{
		url : '/orderoperator/confirmcertforentryokorno',
		data :
		{
			"orderid" : orderid,
			"certforentrystatus" : certstatus
		},
		type : 'post',
		async : false,
		success : function(data)
		{
			var result = JSON.parse(data);
			if (result.success)
			{
				if (certstatus == '1')
				{
					alert('确认OK！');
				}
				else
				{
					alert('取消成功！');
				}
				ajax_page_init($("#orderforentrygridlist"), "", "");
			}
		}
	});
}

// //---------报关 编辑签收人-----------/////
function editreceiverforentry(idx)
{
	var ipt = $('#customs_ipt_receiver_' + idx);
	var orderentryid = ipt.data('orderentryid');
	var isapproved = ipt.data('isapproved');
	var receiver = ipt.val();
	if (orderentryid == null || orderentryid == '')
	{
		alert('请先确认是否已录入报关信息！');
		return;
	}

	if (isapproved == null)
	{
		alert('Invalid Param');
		return;
	}

	if (isapproved != 1)
	{
		alert('核销退税，未通过！不能进行操作！');
		return;
	}

	if (receiver == null || receiver == '')
	{
		alert('请录入签收人！');
		return;
	}

	$.ajax(
	{
		url : '/orderoperator/editreceiverforentry',
		data :
		{
			'orderentryid' : orderentryid,
			'receiver' : receiver
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO
			}
		}
	});
}

// //--------批量编辑签收人----------//////
function editreceiverforentrypl()
{
	var pass = true;
	var trs = $('#customs_table tbody tr');
	var param_arr = new Array();
	trs.each(function()
	{
		var td = $(this).find('td').eq(15);
		var childs = td.find('input');
		if (childs.length == 1)
		{
			var ipt = childs.eq(0);
			var orderentryid = ipt.data('orderentryid');
			var receiver = ipt.val();
			var receiverori = ipt.data('receiver');
			if (receiver != receiverori)
			{
				if (receiver == '')
				{
					alert('请录入签收人！');
					pass = false;
					return pass;
				}
				param_arr.push(
				{
					orderentryid : orderentryid,
					receiver : receiver
				});
			}
		}
	});

	if (!pass)
	{
		return;
	}

	if (param_arr.length == 0)
	{
		alert('没有修改痕迹，不用提交！');
		return;
	}

	$.ajax(
	{
		url : '/orderoperator/editreceiverforentrypl',
		data :
		{
			'receivers' : JSON.stringify(param_arr)
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO 待定
				trs.each(function()
				{
					var td = $(this).find('td').eq(15);
					var childs = td.find('input');
					if (childs.length == 1)
					{
						var ipt = childs.eq(0);
						ipt.attr('data-receiver', ipt.val());
						ipt.val(ipt.val());
					}
				});
			}
		}
	});
}

// //--------堆装箱封号导入----------/////
$('#importContainerSealno').on('show.bs.modal', function(event)
{
	var pass = true;
	var button = $(event.relatedTarget);
	var pkgtype = button.data('pkgtype');
	var orderid = button.data('orderid');
	if (orderid == null || orderid == '')
	{
		alert('Invalid Param!');
		return event.preventDefault();
	}

	if (pkgtype == 'yard')
	{
		var trs = $('#containertypesfordz_table tbody tr');
		if (trs.length < 1)
		{
			alert('本单无堆装！');
			pass = false;
		}

		trs.each(function()
		{
			if ($(this).find('td').eq(5).html() == '')
			{
				alert('请先选择堆场！');
				pass = false;
				return pass;
			}
		});
	}
	else if (pkgtype == 'trailer')
	{
		var trs = $('#containertypesforcz_table tbody tr');
		if (trs.length < 1)
		{
			alert('本单无产装！');
			pass = false;
		}

		trs.each(function()
		{
			if ($(this).find('td').eq(5).html() == '')
			{
				alert('请先选择车队！');
				pass = false;
				return pass;
			}
		});
	}
	else
	{
		alert('Invalid Param!');
		pass = false;
	}

	if (!pass)
	{
		return event.preventDefault();
	}

	$('#mimportctnsealno_hipt_pkgtype').val(pkgtype);
	$('#mimportctnsealno_hipt_orderid').val(orderid);
});

$('#mimportctnsealno_btn_import').click(function()
{
	var excelurl = $('#ctnsealnoExcelUrl').val();
	if (excelurl == null || excelurl == '')
	{
		alert('请选择要导入的Excel文件！');
		return;
	}

	var orderid = $('#mimportctnsealno_hipt_orderid').val();
	var pkgtype = $('#mimportctnsealno_hipt_pkgtype').val();

	if (orderid == null || orderid == '' || pkgtype == null || (pkgtype != 'yard' && pkgtype != 'trailer'))
	{
		alert('Invalid Param!');
		return;
	}

	$.ajax(
	{
		url : '/orderoperator/importctnsealno',
		data :
		{
			'orderid' : orderid,
			'pkgtype' : pkgtype,
			'excelurl' : excelurl
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO
				$('#importContainerSealno').modal('hide');
				if (pkgtype == 'yard')
				{
					ajax_page_init($("#containersealnofordzgridlist"), "", "");
				}
				else
				{
					ajax_page_init($("#containersealnoforczgridlist"), "", "");
				}
			}
		}
	});
});

/**
 * 箱封号录入完成确认
 * 
 * @param pkgtype
 */
function confirmctnseal(pkgtype)
{
	if (!confirm('确定吗？'))
	{
		return;
	}
	if (pkgtype == null || (!pkgtype == 'yard') && !pkgtype == 'trailer')
	{
		alert('Invalid Param！');
		return;
	}

	var orderid = '';
	var obj;
	if (pkgtype == 'yard')
	{
		obj = $('#containeryard_ctnsealconfirmok');
		orderid = $('#containeryard_ctnsealconfirmok').data('orderid');
	}
	else
	{
		obj = $('#containertrailer_ctnsealconfirmok');
		orderid = $('#containertrailer_ctnsealconfirmok').data('orderid');
	}

	if (orderid == null || orderid == '')
	{
		alert('Invalid Param!');
		return;
	}

	$.ajax(
	{
		url : '/orderoperator/confirmctnsealno',
		data :
		{
			'orderid' : orderid,
			'pkgtype' : pkgtype
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO 待定
				obj.attr('disabled', true);
				obj.html('箱封号录入完成已确认');
				obj.removeClass('btn-warning').addClass('btn-default');
				obj.attr('onclick', '');
			}
		}
	});
}

// ///-------上传监装文件---------//////
// $('.monitorupload').click(
function monitorupload(idx)
{
	var obj = $('#monitorupload_' + idx);
	var monitortype = obj.data('monitortype');
	if (monitortype == null || monitortype == ''
			|| (monitortype != 'pic' && monitortype != 'video' && monitortype != 'excel'))
	{
		alert('Invalid Param!');
		return;
	}

	var fileipt = obj.closest('td').find('input[type="file"]');
	if (fileipt.val() == null || fileipt.val() == '')
	{
		alert('请选择要上传的文件！');
		return;
	}

	var orderid = fileipt.data('orderid');
	if (orderid == null || orderid == '')
	{
		alert('Invalid Param!');
		return;
	}

	var ordermonitorid = fileipt.data('ordermonitorid');

	$.ajaxFileUpload(
	{
		url : '/orderoperator/uploadmonitor',
		secureuri : false,
		fileElementId : fileipt.attr('id'),
		data :
		{
			'fileElementId' : fileipt.attr('id'),
			'orderid' : orderid,
			'monitortype' : monitortype,
			'ordermonitorid' : ordermonitorid
		},
		dataType : String,
		success : function(data)
		{
			var result = JSON.parse(data);
			var monitorinfo = JSON.parse(result.id);
			alert(result.msg);
			if (result.success)
			{
				fileipt.attr('data-ordermonitorid', monitorinfo.ordermonitorid);
				var btnupl = obj.closest('td').find('button').eq(0);
				btnupl.removeClass('btn-danger').addClass('btn-warning');
				var btndwn = obj.closest('td').find('button').eq(1);
				btndwn.removeClass('btn-default').addClass('btn-success').attr('disabled', false);
				var label = obj.closest('td').find('label').eq(0);
				label.html(monitorinfo.filename);
			}
		}
	});
}
// );

// $('.monitordownload').click(
function monitordownload(idx)
{
	var obj = $('#monitordownload_'+idx);
	var monitortype = obj.data('monitortype');
	if (monitortype == null || monitortype == ''
			|| (monitortype != 'pic' && monitortype != 'video' && monitortype != 'excel'))
	{
		alert('Invalid Param!');
		return;
	}

	var fileipt = obj.closest('td').find('input[type="file"]');
	var ordermonitorid = fileipt.data('ordermonitorid');
	if (ordermonitorid == null || ordermonitorid == '')
	{
		alert('Invalid Param!');
		return;
	}

	window.location.href = '/orderoperator/download/monitor?ordermonitorid=' + ordermonitorid + '&monitortype='
			+ monitortype;
}
// );

function PkgsUpload_yard()
{
	var val = $("#PkgsFileUpload_yard").val();
	if (val == null || val == "")
	{
		alert("请选择上传堆装文件");
		return;
	}

	$.ajaxFileUpload(
	{
		url : $.getContextPath() + "/packingorder/uploadpkgsfile",
		secureuri : false,
		fileElementId : "PkgsFileUpload_yard",// file控件id
		dataType : "json",
		data :
		{
			'fileElementId' : "PkgsFileUpload"
		},
		success : function(data)
		{
			$("#urlfordz_par").val(data.fileurl);
			$("#urlfordz").text(data.oldfilename);
			$("#urlfordz").attr(
					"href",
					"/packingorder/downloadLbFile/" + data.dirname + "/" + encodeURI(encodeURI(data.filename)) + "/"
							+ data.suffix);
		},
		error : function(data, status, e)
		{
			alert(e);
		}
	});
}

function PkgsUpload_trail()
{
	var val = $("#PkgsFileUpload_trail").val();
	if (val == null || val == "")
	{
		alert("请选择上传产装文件");
		return;
	}

	$.ajaxFileUpload(
	{
		url : $.getContextPath() + "/packingorder/uploadpkgsfile",
		secureuri : false,
		fileElementId : "PkgsFileUpload_trail",// file控件id
		dataType : "json",
		data :
		{
			'fileElementId' : "PkgsFileUpload"
		},
		success : function(data)
		{
			$("#urlforcz_par").val(data.fileurl);
			$("#urlforcz").text(data.oldfilename);
			$("#urlforcz").attr(
					"href",
					"/packingorder/downloadLbFile/" + data.dirname + "/" + encodeURI(encodeURI(data.filename)) + "/"
							+ data.suffix);
		},
		error : function(data, status, e)
		{
			alert(e);
		}
	});
}

function kfconfirmpkgok()
{
	$.ajax(
	{
		url : "/orderoperator/confirmpkgsok",
		data : $("#formforinputdzinfo").serialize(),
		type : "post",
		async : false,
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				$('#setyardinfo').modal('hide');
				$('#orderidfordz').val('');
				$('#ordercontainerpkgsidsfordz').val('');
				$('#containerpkgtypeidsfordz').val('');
				$('#ordercontaineridsfordz').val('')
				$('#lbcontainerfordz').text('');
				$('#arrivedatefordz').val('');
				$('#pkgremarkfordz').text('');
				$('#contactfordz').val('');
				$('#contacttelfordz').val('');
				$('#remarkfordz').text('');
				$('#storageinspectionfordz').val('');
				$('#urlfordz').text('无');
				$('#urlfordz').attr('href', '#');

				ajax_page_init($("#containertypesfordz"), "", "");
			}
		}
	});
}

function kfconfirmpkgokcz()
{
	$.ajax(
	{
		url : "/orderoperator/confirmpkgsokcz",
		data : $("#formforinputczinfo").serialize(),
		type : "post",
		async : false,
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				$('#settrailer').modal('hide');
				$('#orderidforcz').val('');
				$('#ordercontainerpkgsidsforcz').val('');
				$('#containerpkgtypeidsforcz').val('');
				$('#ordercontaineridsforcz').val('')
				$('#lbcontainerforcz').text('');
				$('#arrivedateforcz').val('');
				$('#pkgremarkforcz').text('');
				$('#contactforcz').val('');
				$('#contacttelforcz').val('');
				$('#remarkforcz').text('');
				$('#urlforcz').text('无');
				$('#urlforcz').attr('href', '#');

				ajax_page_init($("#containertypesforcz"), "", "");
			}
		}
	});
}

function confirmplanstatus(idstr)
{
	var btn = $('#' + idstr);
	if (btn == null)
	{
		alert('Invalid Param!');
		return;
	}

	var orderid = btn.attr('orderid');
	var confirmstatus = btn.attr('confirmstatus');
	var pkg = btn.attr('pkg');
	if (orderid == null || orderid == '' || confirmstatus == null
			|| (confirmstatus != 'ok' && confirmstatus != 'cancel') || pkg == null
			|| (pkg != 'yard' && pkg != 'trailer'))
	{
		alert('Invalid Param!');
		return;
	}

	$.ajax(
	{
		url : '/orderoperator/confirmplanstatus',
		data :
		{
			'orderid' : orderid,
			'pkg' : pkg,
			'confirmstatus' : confirmstatus
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO
				if (confirmstatus == 'ok')
				{
					btn.closest('td').html('<b style="color:#5cb85c;">是</>');
				}
				else
				{
					btn.closest('td').html('否');
				}
				btn.remove();
			}
		}
	});
}
