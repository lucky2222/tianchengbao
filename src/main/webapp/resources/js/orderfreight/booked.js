$(function() {

			$('#refusemodal').on('hide.bs.modal', function(event) {
						$("#hidden_orderid").val("");
						$("#hidden_tradetype").val("");
						$("#hidden_ori_tradeid").val("");
						$("#ApproveRemark").val("");
					});

		});

function bookedoperate(obj) {

	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderfreight/bookedcontent",
				data : {
					orderid : $(obj).data('id')
				},
				async : false,
				success : function(data) {
					$("#bookedcontent").html(data);
					$("#bookedoperatemodal").modal('show');
				}

			});

}

function bookedExcel() {
	ExportExcel($.getContextPath() + "/orderfreight/getbookedlistexcel?"
			+ $("form").serialize()
			+ "&auto_export_excel_by_list=true&exportflag=true");
}
function historyExcel() {
	ExportExcel($.getContextPath() + "/orderfreight/gethistorylistexcel?"
			+ $("form").serialize()
			+ "&auto_export_excel_by_list=true&exportflag=true");
}

function ApproveTradeType(orderid, tradetype, ori_tradeid) {

	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderapprove/approvetradetype",
				data : {
					orderid : orderid,
					tradetype : tradetype,
					ori_tradeid : ori_tradeid
				},
				async : false,
				success : function(result) {
					var data = JSON.parse(result);
					if (data.success == true) {
						$('form').submit();
					} else {
						alert(data.msg);
					}
				}

			});

}

function RefuseTradeType(orderid, tradetype, ori_tradeid) {
	$("#hidden_orderid").val(orderid);
	$("#hidden_tradetype").val(tradetype);
	$("#hidden_ori_tradeid").val(ori_tradeid);
	$("#refusemodal").modal('show');
}

function submitrefusetradetype() {

	if ($("#ApproveRemark").val().trim().length == 0) {
		alert("请必须输入拒绝原因");
		return false;
	}

	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderapprove/refusetradetype",
				data : {
					orderid : $("#hidden_orderid").val(),
					tradetype : $("#hidden_tradetype").val(),
					ori_tradeid : $("#hidden_ori_tradeid").val(),
					approveremark : $("#ApproveRemark").val().trim()
				},
				async : false,
				success : function(result) {

					var data = JSON.parse(result);
					if (data.success == true) {
						$("#refusemodal").modal('hide');
						$('form').submit();
					} else {
						alert(data.msg);
					}
				}

			});
}