jQuery.download = function(url, data, method)
{
	// 获取url和data
	if (url && data)
	{
		// data 是 string 或者 array/object
		data = typeof data == 'string' ? data : jQuery.param(data);
		// 把参数组装成 form的 input
		var inputs = '';
		jQuery.each(data.split('&'), function()
		{
			var pair = this.split('=');
			inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
		});
		// request发送请求
		jQuery('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>').appendTo('body')
				.submit().remove();
	};
};

$("table thead tr th:first-child").click(function()
{
	var checkall = $(this).find("input[type='checkbox']");
	$(checkall).prop("checked", !$(checkall).prop("checked"));
	var all = $(this).closest("table").find("tbody tr ");
	$(all).each(function()
	{
		if ($(checkall).prop("checked"))
		{
			$(this).eq(0).find("input[type='checkbox']").prop("checked", true);
		}
		else
		{
			$(this).eq(0).find("input[type='checkbox']").prop("checked", false);
		}
	});

});

$("table tbody tr").click(
		function()
		{
			var checkline = $(this).children("td").eq(0).find("input[type='checkbox']");
			$(checkline).prop("checked", !$(checkline).prop("checked"));
			if (!$(checkline).prop("checked"))
			{
				$(this).closest("table").find("thead tr ").children("th").eq(0).find("input[type='checkbox']").prop(
						"checked", false);
			}
			else
			{
				if ($(this).closest("table").find("tbody input[type='checkbox']").not("input:checked").length == 0)
				{
					$(this).closest("table").find("thead tr ").children("th").eq(0).find("input[type='checkbox']")
							.prop("checked", true);
				}
			}

		});

$('#combineLadingbillNo').on(
		'show.bs.modal',
		function(event)
		{
			var trs = $('table tbody tr input[type="checkbox"]:checked');
			if (trs.length < 2)
			{
				alert('请选择要进行并单的提单，或您选择的提单数小于2');
				return event.preventDefault();
			}

			$('#combinebillnolist').empty();
			$('#mdlipt_combldbill_blnohead').val('');
			$('#mdlipt_combldbill_blnobody').val('');
			var pass = true;
			$('#combinebillnolist').append('<option data-blnohead="" data-blnobody="" value="">可选择</option>');
			trs.each(function()
			{
				var blnotd = $(this).closest('tr').find('td').eq(2);
				var ladingbillid = blnotd.data('ladingbillid');
				if (ladingbillid == null || ladingbillid == '')
				{
					alert('Invalid Param!');
					pass = false;
					return pass;
				}
				$('#combinebillnolist').append(
						'<option data-blnohead="' + blnotd.data("blnohead") + '" data-blnobody="'
								+ blnotd.data("blnobody") + '" value="' + ladingbillid + '">' + blnotd.html()
								+ '</option>');
			});

			if (!pass)
			{
				return event.preventDefault();
			}
		});

$('#combinebillnolist').change(function()
{
	var item = $(this).children('option:selected').eq(0);
	$('#mdlipt_combldbill_blnohead').val(item.data('blnohead'));
	$('#mdlipt_combldbill_blnobody').val(item.data('blnobody'));
});

// /------并单操作--------------/////
$('#mdlbtn_combldbill_submit').click(function()
{
	var ladbill_arr = new Array();
	var pass = true;
	$('#combinebillnolist option:gt(0)').each(function()
	{
		var ladingbillid = $(this).val()
		if (ladingbillid == null || ladingbillid == '')
		{
			alert('Invalid Param');
			pass = false;
			return pass;
		}

		ladbill_arr.push(
		{
			ladingbillid : ladingbillid
		});
	});

	if (!pass)
	{
		return;
	}

	var ladingbillnohead = $('#mdlipt_combldbill_blnohead').val();
	var ladingbillnobody = $('#mdlipt_combldbill_blnobody').val();
	if (ladingbillnohead == null || ladingbillnohead == '' || ladingbillnobody == null || ladingbillnobody == '')
	{
		alert('请录入合并后的提单号头和主体！');
		return;
	}

	$.ajax(
	{
		url : '/ladingbill/combineladingbill',
		data :
		{
			'ladingbillids' : JSON.stringify(ladbill_arr),
			'ladingbillnohead' : ladingbillnohead,
			'ladingbillnobody' : ladingbillnobody
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				$('#combineLadingbillNo').modal('hide');
				// TODO 刷新ladingbilllist
				$('#mdlipt_combldbill_blnohead').val('');
				$('#mdlipt_combldbill_blnobody').val('');
				location.reload();
			}
		}
	})
});

// /----保存提单信息-------/////
$('#ladbillformsample').validate(
{
	rules :
	{
		ShipperDescription : "required",
		ConfigneeDescription : "required",
		NotifyDescription : "required",
		// Notify2Description : "required",
		ladingbill_pol : "required",
		ladingbill_pod : "required",
		//ladingbill_delivery : "required",
		ladingbill_mark : "required",
		ladingbill_number : "required",
		ladingbill_pkg : "required",
		ladingbill_cargodes : "required",
		ladingbill_weight : "required",
		ladingbill_volume : "required",
		ladingbill_billtype : "required",
		ladingbill_takeLadingbillType : "required",
		ladingbill_takebilllocation : "required",
		ladingbill_originalamount : "required",
		ladingbill_duplicateamount : "required"
	},
	messages :
	{
		ShipperDescription : "必填",
		ConfigneeDescription : "必填",
		NotifyDescription : "必填",
		// Notify2Description : "必填",
		ladingbill_pol : "必填",
		ladingbill_pod : "必填",
		//ladingbill_delivery : "必填",
		ladingbill_mark : "必填",
		ladingbill_number : "必填",
		ladingbill_pkg : "必填",
		ladingbill_cargodes : "必填",
		ladingbill_weight : "必填",
		ladingbill_volume : "必填",
		ladingbill_billtype : "必填",
		ladingbill_takeLadingbillType : "必填",
		ladingbill_takebilllocation : "必填",
		ladingbill_originalamount : "必填",
		ladingbill_duplicateamount : "必填"
	},
	submitHandler : function(form)
	{
		var len = $('#txtarea_len').val();
		if(len == null || len == '')
		{
			alert('Invalid Param!');
			return;
		}
		if(!doCheckSubmit(document.getElementById('ShipperDescription'),35,1))
		{
			alert('Shipper格式错误！');
			return;
		}
		if(!doCheckSubmit(document.getElementById('ConfigneeDescription'),35,2))
		{
			alert('Confignee格式错误！');
			return;
		}
		if(!doCheckSubmit(document.getElementById('NotifyDescription'),35,3))
		{
			alert('Notify格式错误！');
			return;
		}
		if(!doCheckSubmit(document.getElementById('Notify2Description'),35,4))
		{
			alert('Notify2格式错误！');
			return;
		}
		
		if(!doCheckSubmit(document.getElementById('ladingbill_mark'),26,0))
		{
			alert('唛头格式错误！');
			return;
		}
		
		if(!doCheckSubmit(document.getElementById('ladingbill_mark'),26,0))
		{
			alert('唛头格式错误！');
			return;
		}
		
		if(!doCheckSubmit(document.getElementById('ladingbill_cargodes'),35,0))
		{
			alert('货描格式错误！');
			return;
		}
		
		$.ajax(
		{
			url : '/ladingbill/saveladingbillinfo',
			data : $("#ladbillformsample").serialize(),
			type : 'post',
			success : function(data)
			{
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success)
				{
					// TODO 保存成功后的操作
					location.reload();
				}
			}
		});
	}
});

// //--------提单确认OK---------------////
$('#ladbill_btn_confirm').click(function()
{

	if (!confirm("您确定提单样本OK吗？"))
	{
		window.event.returnValue = false;
		return;
	}

	var ladingbillid = $('#ladingbill_ladingbillid').val();
	if (ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}

	var oneblonemn = $('#oneblonemn_hipt_bl').val();
	if (oneblonemn == null || oneblonemn == '')
	{
		alert('Invalid Param!');
		return;
	}

	$.ajax(
	{
		url : '/ladingbill/confirmladingbill',
		data :
		{
			'ladingbillid' : ladingbillid,
			'oneblonemn' : oneblonemn
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO 提单确认成功后的操作
				location.reload();
			}
		}
	});
});

// //--------提单审核拒绝通过------------////
$('#ladbill_btn_refuse').click(function()
{
	if (!confirm("确认要拒绝吗？"))
	{
		window.event.returnValue = false;
		return;
	}

	var ladingbillid = $('#ladingbill_ladingbillid').val();
	if (ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}

	var certrejectreason = $('#ladingbill_certrejectreason').val();
	if (certrejectreason == null || certrejectreason == '')
	{
		alert('请输入拒绝原因！');
		return;
	}

	$.ajax(
	{
		url : '/ladingbill/approverefuseladingbill',
		data :
		{
			'ladingbillid' : ladingbillid,
			'certrejectreason' : certrejectreason
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO 提单审核拒绝成功后的操作
				location.reload();
			}
		}
	});
});

// //--------提单审核通过-------/////
$('#ladbill_btn_pass').click(function()
{
	if (!confirm("确认审核通过吗？"))
	{
		window.event.returnValue = false;
		return;
	}

	var ladingbillid = $('#ladingbill_ladingbillid').val();
	if (ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}

	$.ajax(
	{
		url : '/ladingbill/approvepassladingbill',
		data :
		{
			'ladingbillid' : ladingbillid
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO 提单审核通过成功后的操作
				location.reload();
			}
		}
	});
});

// //--------生成提单EDI-------/////
function makeedisi()
{
	if (!confirm("确认生成提单EDI吗？"))
	{
		window.event.returnValue = false;
		return;
	}

	// var ladingbillid = $('#ladingbill_ladingbillid').val();
	// if (ladingbillid == null || ladingbillid == '')
	// {
	// alert('Invalid Param!');
	// return;
	// }
	
	if(!doCheckSubmit(document.getElementById('BookingInstructions_edispe'),35,0))
	{
		alert('备注格式错误！');
		return;
	}

	$.ajax(
	{
		url : '/ladingbill/exportbledi',
		data : $('#edisispeinfoform').serialize(),
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);

			if (result.success)
			{
				// TODO 提单确认成功后的操作
				$('#speedisiinfo').modal('hide');
				$.download('/ladingbill/downloadbledi', 'filename=' + result.id, 'GET');
			}
			else
			{
				alert(result.msg);
			}
		}
	});
}

// //-------------取消并单----------------/////
$('.cancelcombine').click(function()
{
	var ladingbillid = $(this).data('ladingbillid');
	if (ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}

	if (!confirm("确认要取消并单吗？"))
	{
		window.event.returnValue = false;
		return;
	}

	$.ajax(
	{
		url : '/ladingbill/cancelcombineladingbill',
		data :
		{
			'ladingbillid' : ladingbillid
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				location.reload();
			}
		}
	});

});

// //-------解锁-------------------////
$('.unlockapproval').click(function()
{
	if (!confirm('确定要解锁码？'))
	{
		window.event.returnValue = false;
		return;
	}

	var ladingbillid = $(this).data('ladingbillid');
	if (ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}

	$.ajax(
	{
		url : '/ladingbill/unlockapprovalladingbill',
		data :
		{
			'ladingbillid' : ladingbillid
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO
				location.reload();
			}
		}
	});
})

// 文件上传 提单样本，格式单
function ybgsd_Upload(fileId, ladingbillid, UploadCategoryID)
{

	// 上传文件

	var fileElementId = fileId;
	if ($("#" + fileElementId + "").val() == "" || $("#" + fileElementId + "").val() == null)
	{
		alert("请选择上传文件")
		return;
	}
	$.ajaxFileUpload(
	{

		url : $.getContextPath() + "/OrderLbfileInfoController/uploadFileYbGs",// 处理图片脚本
		secureuri : false,
		fileElementId : fileElementId,// file控件id
		data :
		{
			"fileElementId" : fileElementId,
			"ladingbillid" : ladingbillid,
			"UploadCategoryID" : UploadCategoryID
		},
		dataType : 'JSON',
		success : function(data)
		{
			var list = JSON.parse(data)
			var result = list.result
			if (result != "" && result != null)
			{
				alert(list.result);
				$("#find").click();
			}
		},
		error : function(data, status, e)
		{
			alert(e);
		}
	});
}

// //--------一舱一提提单同步舱单------////
// ------保存箱信息-------//
function savectninfo(idx)
{
	var ladingbillid = $('#ladingbill_ladingbillid').val();
	if (ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}
	var obj = $('#ctninfoedt_btn_' + idx);
	var ldbillcontainerdetailid = obj.closest('tr').attr('data-blctndetailid');
	if (ldbillcontainerdetailid == null)
	{
		ldbillcontainerdetailid = '';
	}
	var ordercontainerid = obj.closest('tr').attr('data-ctntypeid');
	var ctntype = obj.closest('tr').attr('data-ctntype');
	if (ordercontainerid == null || ordercontainerid == '' || ctntype == null || ctntype == '')
	{
		alert('Invalid Param!');
		return;
	}
	var ctnsealnoid = obj.closest('tr').attr('data-ctnsealnoid');
	if (ctnsealnoid == null)
	{
		ctnsealnoid = '';
	}
	var ctndetailid = obj.closest('tr').attr('data-ctndetailid');
	if (ctndetailid == null)
	{
		ctndetailid = '';
	}
	var ctnno = obj.closest('tr').find('input[name="ctnno"]').eq(0).val();
	if (ctnno == null || ctnno == '')
	{
		alert('箱号不能为空！');
		return;
	}
	var sealno = obj.closest('tr').find('input[name="sealno"]').eq(0).val();
//	if (sealno == null || sealno == '')
//	{
//		alert('铅封号不能为空！');
//		return;
//	}
	var num = obj.closest('tr').find('input[name="num"]').eq(0).val();
	if (num == null || num == '')
	{
		alert('分箱件数不能为空！');
		return;
	}
	var weight = obj.closest('tr').find('input[name="weight"]').eq(0).val();
	if (weight == null || weight == '')
	{
		alert('分箱重量不能为空！');
		return;
	}
	var volume = obj.closest('tr').find('input[name="volume"]').eq(0).val();
	if (volume == null || volume == '')
	{
		alert('分箱体积不能为空！');
		return;
	}

	var mark = $('#ladingbill_mark').val();
	if (mark == null || mark == '')
	{
		alert('请录入唛头！');
		return;
	}

	var cargoname = $('#ladingbill_cargodes').val();
	if (cargoname == null || cargoname == '')
	{
		alert('请录入货描！');
		return;
	}

	var cargopkg = $('#ladingbill_pkg').val();
	if (cargopkg == null || cargopkg == '')
	{
		alert('请选择包装方式！');
		return;
	}

	var number_all = $('#ladingbill_number').val();
	if (number_all == null || number_all == '')
	{
		alert('请录入总件数！');
		return;
	}

	var weight_all = $('#ladingbill_weight').val();
	if (weight_all == null || weight_all == '')
	{
		alert('请录入总毛重！');
		return;
	}

	var volume_all = $('#ladingbill_volume').val();
	if (volume_all == null || volume_all == '')
	{
		alert('请录入总体积！');
		return;
	}
	
	obj.attr('disabled','disabled');
	$.startLoading();

	var ctninfo_arr = new Array();
	ctninfo_arr.push(
	{
		ordercontainerid : ordercontainerid.toString(),
		ctnno : ctnno.toString(),
		sealno : sealno.toString(),
		number : num.toString(),
		weight : weight.toString(),
		volume : volume.toString(),
		ladbillctndetailid : ldbillcontainerdetailid.toString(),
		orderctndetailid : ctndetailid.toString(),
		orderctnsealnoid : ctnsealnoid.toString(),
		ctntype : ctntype.toString()
	});

	$.ajax(
	{
		url : '/ladingbill/editctninfo',
		data :
		{
			'ladingbillid' : ladingbillid,
			'ctninfos' : JSON.stringify(ctninfo_arr),
			'cargoname' : cargoname,
			'cargopkg' : cargopkg,
			'number' : number_all,
			'weight' : weight_all,
			'volume' : volume_all,
			'mark' : mark
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO
				var msgList = JSON.parse(result.id);
				obj.closest('tr').attr('data-ctnsealnoid', msgList[0].ctnsealnoid);
				obj.closest('tr').attr('data-ctndetailid', msgList[0].ctndetailid);
				obj.closest('tr').attr('data-blctndetailid', msgList[0].blctndetailid);
				obj.attr('data-ldbillcontainerdetailid', msgList[0].blctndetailid);
			}
			
			obj.removeAttr('disabled','disabled');
			$.endLoading();
		}
	});
}

// ///------一舱一提提单同步舱单 批量保存箱信息----------/////

function savectninfopl()
{
	var ladingbillid = $('#ladingbill_ladingbillid').val();
	if (ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}

	var mark = $('#ladingbill_mark').val();
	if (mark == null || mark == '')
	{
		alert('请录入唛头！');
		return;
	}

	var cargoname = $('#ladingbill_cargodes').val();
	if (cargoname == null || cargoname == '')
	{
		alert('请录入货描！');
		return;
	}

	var cargopkg = $('#ladingbill_pkg').val();
	if (cargopkg == null || cargopkg == '')
	{
		alert('请选择包装方式！');
		return;
	}

	var number_all = $('#ladingbill_number').val();
	if (number_all == null || number_all == '')
	{
		alert('请录入总件数！');
		return;
	}

	var weight_all = $('#ladingbill_weight').val();
	if (weight_all == null || weight_all == '')
	{
		alert('请录入总毛重！');
		return;
	}

	var volume_all = $('#ladingbill_volume').val();
	if (volume_all == null || volume_all == '')
	{
		alert('请录入总体积！');
		return;
	}

	var pass = true;
	var ctninfo_arr = new Array();
	var r = 0;
	var issanzi = $('#sanzi_hipt_bl').val();
	
	$('#blcontainerdetailgrid table tbody tr').each(
			function()
			{
				r = r + 1;
				var tr = $(this);
				var ordercontainerid = tr.data('ctntypeid');
				var ctntype = tr.data('ctntype');
				var ctnsealnoid = tr.data('ctnsealnoid');
				if(ctnsealnoid == null || ctnsealnoid == '')
				{
					if(issanzi != 'true')
					{
						alert('综合业务暂未录入箱封号！');
						pass = false;
						return pass;
					}
				}
				var ctndetailid = tr.data('ctndetailid');
				var ldbillcontainerdetailid = tr.data('blctndetailid');
				var ctnno = tr.find('input[name="ctnno"]').eq(0).val();
				var sealno = tr.find('input[name="sealno"]').eq(0).val();
				var num = tr.find('input[name="num"]').eq(0).val();
				var weight = tr.find('input[name="weight"]').eq(0).val();
				var volume = tr.find('input[name="volume"]').eq(0).val();
				if (ordercontainerid == null || ordercontainerid == '' || ctntype == null || ctntype == ''
						|| ldbillcontainerdetailid == null || ctnsealnoid == null || ctndetailid == null
						|| ctnno == null || sealno == null || num == null || weight === null || volume == null)
				{
					alert('Invalid Param!');
					pass = false;
					return pass;
				}

				if (ldbillcontainerdetailid != '' || ctnno != '' || sealno != '' || num != '' || weight != ''
						|| volume != '')
				{
					if (ctnno == null || ctnno == '')
					{
						alert('第' + r + '行,箱号不能为空！');
						pass = false;
						return pass;
					}

//					if (sealno == null || sealno == '')
//					{
//						alert('第' + r + '行,铅封号不能为空！');
//						pass = false;
//						return pass;
//					}

					if (num == null || num == '')
					{
						alert('第' + r + '行,分箱件数不能为空！');
						pass = false;
						return pass;
					}

					if (weight == null || weight == '')
					{
						alert('第' + r + '行,分箱重量不能为空！');
						pass = false;
						return pass;
					}

					if (volume == null || volume == '')
					{
						alert('第' + r + '行,分箱体积不能为空！');
						pass = false;
						return pass;
					}

					ctninfo_arr.push(
					{
						ordercontainerid : ordercontainerid.toString(),
						ctnno : ctnno.toString(),
						sealno : sealno.toString(),
						number : num.toString(),
						weight : weight.toString(),
						volume : volume.toString(),
						ladbillctndetailid : ldbillcontainerdetailid.toString(),
						orderctndetailid : ctndetailid.toString(),
						orderctnsealnoid : ctnsealnoid.toString(),
						ctntype : ctntype.toString()
					});
				}
			});

	if (!pass)
	{
		return;
	}
	
	$('#blcontainer_savepl').attr('disabled','disabled');
	$.startLoading();

	$.ajax(
	{
		url : '/ladingbill/editctninfo',
		data :
		{
			'ladingbillid' : ladingbillid,
			'ctninfos' : JSON.stringify(ctninfo_arr),
			'cargoname' : cargoname,
			'cargopkg' : cargopkg,
			'number' : number_all,
			'weight' : weight_all,
			'volume' : volume_all,
			'mark' : mark
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO
				ajax_page_init($("#blcontainerdetailgrid"), $("#blcontainerdetailgrid").closest("#panel_ajax_page")
						.attr('actionurl'), "");
			}
			
			$('#blcontainer_savepl').removeAttr('disabled');
			$.endLoading();
		}
	});
}

function blinfotomanifest()
{
	if (!confirm("您确定导入舱单吗？"))
	{
		window.event.returnValue = false;
		return;
	}

	var ladingbillid = $('#ladingbill_ladingbillid').val();
	if (ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}

	var oneblonemn = $('#oneblonemn_hipt_bl').val();
	if (oneblonemn == null || oneblonemn == '')
	{
		alert('Invalid Param!');
		return;
	}

	$.ajax(
	{
		url : '/ladingbill/blinfotomanifest',
		data :
		{
			'ladingbillid' : ladingbillid,
			'oneblonemn' : oneblonemn
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			alert(result.msg);
			if (result.success)
			{
				// TODO 提单确认成功后的操作
				location.reload();
			}
		}
	});
}

$('#ladbill_btn_export').click(function()
{
	var ladingbillid = $('#ladingbill_ladingbillid').val();
	window.location.href = '/ladingbill/blsampleexportpdf?ladingbillid=' + ladingbillid;
});

$('#splitLadingbill').on(
		'shown.bs.modal',
		function(event)
		{

			var blnohead = $('#ladbillno_head_split').val();
			var blnobody = $('#ladbillno_body_split').val();
			var ladingbillid = $('#ladingbillid_split').val();

			$('#msplit_ladingbillhead_add').val(blnohead);
			$('#msplit_ladingbillbody_add').val(blnobody);

			ajax_page_init($('#ctndetailsofwaitsplit'), '/ladingbill/partial_ctndetailsofwaitsplit', 'ladingbillid='
					+ ladingbillid);
		});

$('#editLadingbillInfo').on('shown.bs.modal', function(event)
{
	var btn = $(event.relatedTarget);
	var blnohead = btn.data('blnohead');
	var blnobody = btn.data('blnobody');
	var ladingbillid_split = btn.data('ladingbillid');

	$('#meditsplitblno_ladingbillid').val(ladingbillid_split);
	$('#msplit_ladingbillhead_modify').val(blnohead);
	$('#msplit_ladingbillbody_modify').val(blnobody);
});

function fun_addSplitBLSubmit()
{
	var ladingbillnohead = $('#msplit_ladingbillhead_add').val();
	var ladingbillnobody = $('#msplit_ladingbillbody_add').val();
	var mainladingbillid = $('#ladingbillid_split').val();

	if (mainladingbillid == null || mainladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}

	if (ladingbillnobody == null || ladingbillnobody == '')
	{
		alert('请录入提单号主体！');
		return;
	}

	var ckb_selected = $('#ctndetailsofwaitsplit table tbody tr td input[type="checkbox"]:checked');
	if (ckb_selected == null || ckb_selected.length < 1)
	{
		alert('请选择要分配的箱信息！');
		return;
	}

	var pass = true;
	var ctndetails_arr = new Array();
	ckb_selected.each(function()
	{
		var tr = $(this).closest('tr');
		var mainblctndetailId = tr.find('td').eq(1).data('mblctndetailid');
		var orderctndetailId = tr.find('td').eq(1).data('octndetailid');

		if (mainblctndetailId == null || mainblctndetailId == '' || orderctndetailId == null || orderctndetailId == '')
		{
			alert('Invalid Param！');
			pass = false;
			return pass;
		}

		var number = tr.find('td').eq(4).find('input').eq(0).val();
		var weight = tr.find('td').eq(5).find('input').eq(0).val();
		var volume = tr.find('td').eq(6).find('input').eq(0).val();
		var ctntype = tr.find('td').eq(1).html();

		ctndetails_arr.push(
		{
			mainblctndetailId : mainblctndetailId.toString(),
			orderctndetailId : orderctndetailId.toString(),
			number : number.toString(),
			weight : weight.toString(),
			volume : volume.toString(),
			ctntype : ctntype.toString()
		});
	});

	if (!pass)
	{
		return;
	}

	$.ajax(
	{
		url : '/ladingbill/addsplitladingbill',
		data :
		{
			'mainladingbillid' : mainladingbillid,
			'ladingbillnohead' : ladingbillnohead,
			'ladingbillnobody' : ladingbillnobody,
			'splitctndetails' : JSON.stringify(ctndetails_arr)
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			if (result.success)
			{
				window.location.reload();
			}
			else
			{
				alert(result.msg);
			}
		}
	});
}

function fun_split_remove(ladingbillid)
{
	if (ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param！');
		return;
	}

	if (!confirm('确定要删除吗？'))
	{
		return;
	}

	$.ajax(
	{
		url : '/ladingbill/delsplitladingbill',
		data :
		{
			'ladingbillid' : ladingbillid
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			if (result.success)
			{
				window.location.reload();
			}
			else
			{
				alert(result.msg);
			}
		}
	});
}

function fun_editsplitblno()
{
	var ladingbillid = $('#meditsplitblno_ladingbillid').val();
	var ladingbillnohead = $('#msplit_ladingbillhead_modify').val();
	var ladingbillnobody = $('#msplit_ladingbillbody_modify').val();

	if (ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}

	if (ladingbillnobody == null || ladingbillnobody == '')
	{
		alert('请录入提单号主体！');
		return;
	}

	$.ajax(
	{
		url : '/ladingbill/editsplitladingbillno',
		data :
		{
			'ladingbillid' : ladingbillid,
			'ladingbillnohead' : ladingbillnohead,
			'ladingbillnobody' : ladingbillnobody
		},
		type : 'post',
		success : function(data)
		{
			var result = JSON.parse(data);
			if (result.success)
			{
				window.location.reload();
			}
			else
			{
				alert(result.msg);
			}
		}
	});
}

function fun_confirm_splitok()
{
	var ladingbillid = $('#ladingbillid_split').val();
	if(ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}
	
	$.ajax({
		url:'/ladingbill/confirmsplitladingbillok',
		data:{'ladingbillid':ladingbillid},
		type:'post',
		success:function(data)
		{
			var result = JSON.parse(data);
			if (result.success)
			{
				window.location.reload();
			}
			else
			{
				alert(result.msg);
			}
		}
	});
}

function fun_cancel_split()
{
	var ladingbillid = $('#ladingbillid_split').val();
	if(ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}
	
	$.ajax({
		url:'/ladingbill/cancelsplitladingbill',
		data:{'ladingbillid':ladingbillid},
		type:'post',
		success:function(data)
		{
			var result = JSON.parse(data);
			if (result.success)
			{
				window.location.reload();
			}
			else
			{
				alert(result.msg);
			}
		}
	});
}

function fun_cancel_split(ladingbillid)
{
	if(ladingbillid == null || ladingbillid == '')
	{
		alert('Invalid Param!');
		return;
	}
	
	$.ajax({
		url:'/ladingbill/cancelsplitladingbill',
		data:{'ladingbillid':ladingbillid},
		type:'post',
		success:function(data)
		{
			var result = JSON.parse(data);
			if (result.success)
			{
				window.location.reload();
			}
			else
			{
				alert(result.msg);
			}
		}
	});
}
