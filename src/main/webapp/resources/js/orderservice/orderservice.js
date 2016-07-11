$(function() {

			$("[name='searchETD_Start']").datepicker({
				dateFormat : "yy/mm/dd"
					// 在这里进行插件的属性设置

				});
			$("[name='searchETD_End']").datepicker({
				dateFormat : "yy/mm/dd"
					// 在这里进行插件的属性设置

				});

			$('#batchshutoutreason').on('show.bs.modal', function(event) {
						$("#ShutOutReason").val("");
					});

			$('#activitymodal').on('show.bs.modal', function(event) {
						$("#hidden_orderid").val("");
						var button = $(event.relatedTarget);
						var orderid = button.data('type');
						$("#hidden_orderid").val(orderid);
					});
			$('#recovermodal').on('show.bs.modal', function(event) {
						$("#hidden_orderid").val("");
						var button = $(event.relatedTarget);
						var orderid = button.data('type');
						$("#hidden_orderid").val(orderid);
					});
		});

function gotodetail(obj) {
	location.href = $.getContextPath() + "/orderdetail/index/" + $(obj).text();
}

function hoversuspendedremark(obj) {

	$(obj).popover({
				trigger : 'hover',
				placement : 'top',
				content : $(obj).text()
			});
}

function hovershutoutreason(obj) {

	$(obj).popover({
				trigger : 'hover',
				placement : 'top',
				content : $(obj).text()
			});
}

function clickbatchshutout() {
	if ($('input[name="btSelectItem"]:checked').length == 0) {
		alert("请必须选择至少一条订单");
		return false;
	}
	$("#batchshutoutreason").modal('show');
}

function submitbatchshutoutreason(obj) {
	var checkedarr = new Array();
	var shutoutreason = $("#ShutOutReason").val().trim();
	if (shutoutreason.length == 0) {
		alert("请填写退关原因");
	} else {
		$('input[name="btSelectItem"]:checked').each(function() {
					checkedarr.push($(this).parent().next().text().trim());
				});
		if (checkedarr.length > 0) {
			$.ajax({
						type : "POST",
						url : $.getContextPath() + "/orderservice/batchshutout",
						data : {
							orderidlist : checkedarr,
							ShutOutReason : $("#ShutOutReason").val().trim()
						},
						async : false,
						traditional : true,
						error : function(request) {
							alert("出错了");
						},
						success : function(data) {
							if (data.substr(0, 1) == '0') {
								location.href = $.getContextPath()
										+ data.substr(1, data.length);
							} else {
								alert(data.substr(1, data.length));
							}
						}

					});
		}
	}
}

function submitactivityorder() {
	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderservice/activityorder",
				data : {
					orderid : $("#hidden_orderid").val()
				},
				async : false,
				error : function(request) {
					alert("出错了");
				},
				success : function(data) {
					$("#closesactivitymodal").click();
					$("#suspendedlist").html(data);
				}

			});
}

function submitrecoverorder() {
	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderservice/recoverorder",
				data : {
					orderid : $("#hidden_orderid").val()
				},
				async : false,
				error : function(request) {
					alert("出错了");
				},
				success : function(data) {
					$("#closerecovermodal").click();
					$("#shutoutlist").html(data);
				}

			});
}

function undoExcel() {
	ExportExcel($.getContextPath() + "/orderservice/getundolistexcel?"
			+ $("form").serialize()
			+ "&auto_export_excel_by_list=true&exportflag=true");
}

function historyExcel() {
	ExportExcel($.getContextPath() + "/orderservice/gethistorylistexcel?"
			+ $("form").serialize()
			+ "&auto_export_excel_by_list=true&exportflag=true");
}