$('#createCompany').on(
		'show.bs.modal',
		function(event) {
			var button = $(event.relatedTarget);
			var type = button.data('type');
			var modal = $(this);
			$("#contractexpireddate_create").datepicker({
				dateFormat : "yy-mm-dd"
			// 在这里进行插件的属性设置
			});
			if (type == "add") {
				modal.find('.modal-title').text("新增公司");
				$('#operate').attr("operatetype", "add");
			}
			if (type == "update") {
				modal.find('.modal-title').text("更新公司");
				$('#operate').attr("operatetype", "update");

				// data-companyid="${item.get('CompanyID')}"
				// data-groupid="${item.get('GroupID')}"
				// data-companyname="${item.get('CompanyName')}"
				// data-stampurl="${item.get('StampUrl')}"
				// data-contractexpireddate="${item.get('ContractExpiredDate')}"
				// data-shortname="${item.get('ShortName')}"
				// data-taxregisterno="${item.get('TaxRegisterNo')}"
				// data-companycode="${item.get('CompanyCode')}"
				// data-email="${item.get('Email')}"
				// data-address="${item.get('Address')}"
				// data-tel="${item.get('Tel')}"
				// data-contacts="${item.get('Contacts')}"
				// data-fax="${item.get('fax')}"
				// data-paytypeid="${item.get('paytypeid')}"
				// data-paytypename="${item.get('paytypename')}"

				$('#companyid_create').val(button.data('companyid'));
				$('#groupid_create').val(button.data('groupid'));
				$('#companyname_create').val(button.data('companyname'));
				$('#stampurl_create').val(button.data('stampurl'));
				$('#contractexpireddate_create').val(
						button.data('contractexpireddate'));
				$('#shortname_create').val(button.data('shortname'));
				$('#taxregisterno_create').val(button.data('taxregisterno'));
				$('#companycode_create').val(button.data('companycode'));
				$('#email_create').val(button.data('email'));
				$('#address_create').val(button.data('address'));
				$('#tel_create').val(button.data('tel'));
				$('#contacts_create').val(button.data('contacts'));
				$('#fax_create').val(button.data('fax'));
				$('#PayTypeID_create').val(button.data('paytypeid'));
				$('#PayTypeName_create').val(button.data('paytypename'));
			}
		});

$("#createcompanyform").validate({
	rules : {
		companyname : "required",
		shortname : "required"
	},
	messages : {
		companyname : "必填",
		shortname : "必填"
	},
	submitHandler : function(form) {
		var url = "";
		if ($('#operate').attr("operatetype") == 'add') {
			url = "./createcompanysubmit";
		} else if ($('#operate').attr("operatetype") == 'update') {
			url = "./editcompanysubmit";
		}
		$.ajax({
			url : url,
			data : $("#createcompanyform").serialize(),
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#createcompanyform"));
					$('#createCompany').modal('hide');
					$("#formcompanygrid").submit();
				}
			}
		});
	}
});

function deleteCompany(companyid) {
	if (!confirm("确认删除吗？")) {
		return false;
	}
	$.ajax({
		url : "./deletecompany",
		traditional : true,
		data : {
			companyid : companyid
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null) {
				alert(result.msg);
			}
			if (result.success) {
				$("#formcompanygrid").submit();
			}
		}
	});
}

// 文件上传
function uploadCompanyStamp(companyid) {
	// 上传文件
	var fileElementId = "fileToUpload" + companyid;
	if ($("#" + fileElementId + "").val() == ""
			|| $("#" + fileElementId + "").val() == null) {
		alert("请选择文件")
		return;
	}
	$.ajaxFileUpload({

		url : "./uploadcompanystamp",// 处理图片脚本
		secureuri : false,
		fileElementId : fileElementId,// file控件id
		data : {
			"fileElementId" : fileElementId,
			"companyid" : companyid
		},
		dataType : String,
		success : function(data) {
			$("#formcompanygrid").submit();
		},
		error : function(data, status, e) {
			alert(e);
		}
	});
}

$('#editCompanyType').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget);
	var modal = $(this);
	var type = button.data('type');
	$('#companyid_editcompanytype').val(button.data('companyid'));

	$('#formcompanytypegrid').submit(function() {
		ajax_page_init($("#companytypegrid"), "", $(this).serialize());
		return false;
	});
	$('#formcompanytypegrid').submit();
});

function editCompanyTypeSubmit(companyid) {
	var categoryid = $("#CategoryID").val();
	$.ajax({
		url : "./editcompanytypesubmit",
		traditional : true,
		data : {
			companyid : companyid,
			categoryid : categoryid
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null) {
				alert(result.msg);
			}
			if (result.success) {
				$("#formcompanytypegrid").submit();
			}
		}
	});
	return false;

}

function deleteCompanyType(companyCategoryID) {
	if(!confirm("确认删除吗？")){
		return false;
	}
	$.ajax({
		url : "./deletecompanytype",
		traditional : true,
		data : {
			companyCategoryID : companyCategoryID
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null) {
				alert(result.msg);
			}
			if (result.success) {
				$("#formcompanytypegrid").submit();
			}
		}
	});
	return false;

}