$('#createPort').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget);
	var type = button.data('type');
	var modal = $(this);
	if (type == "add") {
		modal.find('.modal-title').text("新增港口");
		$('#operate').text("保存");
		$('#operate').attr("operatetype", "add");
	}
	if (type == "update") {
		modal.find('.modal-title').text("更新港口");
		$('#operate').text("保存");
		$('#operate').attr("operatetype", "update");

		$('#createportid').val(button.data('portid'));
		$('#createportnameen').val(button.data('portnameen'));
		$('#createportnamecn').val(button.data('portnamecn'));
		$('#createportcode').val(button.data('code'));
		$('#CountryNameENcreate').val(button.data('countryname'));
		$('#routelineareanamecncreate').val(button.data('routelineareaname'));
		$('#CountryIDcreate').val(button.data('countryid'));
		$('#RouteLineAreaIDcreate').val(button.data('routelineareaid'));
	}
});

$("#createportform").validate(
		{
			rules : {
				nameen : "required",
				namecn : "required",
				code : "required",
				routelineareanamecncreate : "required",
				CountryNameENcreate : "required",
			},
			messages : {
				nameen : "必填",
				namecn : "必填",
				code : "必填",
				routelineareanamecncreate : "必填",
				CountryNameENcreate : "必填",
			},
			submitHandler : function(form) {
				if ($('#operate').attr("operatetype") == 'add'
						|| $('#operate').attr("operatetype") == 'update') {
					$.ajax({
						url : "./createportsubmit",
						traditional : true,
						data : $("#createportform").serialize(),
						type : "post",
						async : false,
						success : function(data) {
							var result = JSON.parse(data);
							alert(result.msg);
							if (result.success) {
								$.clearForm($("#createportform"));
								$('#createPort').modal('hide');
								$("#formportgrid").submit();
							}
						}
					});
				}
			}
		});

function deletePort(portid) {
	if (!confirm("确认删除吗？")) {
		return false;
	}
	$.ajax({
		url : "./deleteport",
		traditional : true,
		data : {
			portid : portid
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null) {
				alert(result.msg);
			}
			if (result.success) {
				$("#formportgrid").submit();
			}
		}
	});
}
