function getDepartmentByCompany(text, value, obj) {
	$('#DepartmentSH_CompanyID').val('');
	$('#departmentID').val('');
	auto_page_init($("#departmentID_autoList"),
			"/sysmanage/departmentautocomplete/" + value,
			"DepartmentSH_CompanyID", "departmentID", "DepartmentName",
			"DepartmentID");
}

function getDepartmentByCompany_create(text, value, obj) {
	$('#createuser_DepartmentSH_CompanyID').val('');
	$('#createuser_departmentID').val('');
	auto_page_init($("#createuser_departmentID_autoList"),
			"/sysmanage/departmentautocomplete/" + value,
			"createuser_DepartmentSH_CompanyID", "createuser_departmentID",
			"DepartmentName", "DepartmentID");
}

function getDepartmentByCompany_edit(text, value, obj) {
	$('#edituser_DepartmentSH_CompanyID').val('');
	$('#edituser_departmentID').val('');
	auto_page_init($("#edituser_departmentID_autoList"),
			"/sysmanage/departmentautocomplete/" + value,
			"edituser_DepartmentSH_CompanyID", "edituser_departmentID",
			"DepartmentName", "DepartmentID");
}

// $('#createUserInfo').on('show.bs.modal', function(event) {
// var button = $(event.relatedTarget);
// var type = button.data('type');
// var modal = $(this);
// if (type == "add") {
// modal.find('.modal-title').text("新增港口");
// $('#operate').text("保存");
// $('#operate').attr("operatetype", "add");
// }
// if (type == "update") {
// modal.find('.modal-title').text("更新港口");
// $('#operate').text("保存");
// $('#operate').attr("operatetype", "update");
//
// $('#createportid').val(button.data('portid'));
// $('#createportnameen').val(button.data('portnameen'));
// $('#createportnamecn').val(button.data('portnamecn'));
// $('#createportcode').val(button.data('code'));
// $('#CountryNameENcreate').val(button.data('countryname'));
// $('#routelineareanamecncreate').val(button.data('routelineareaname'));
// $('#CountryIDcreate').val(button.data('countryid'));
// $('#RouteLineAreaIDcreate').val(button.data('routelineareaid'));
// }
// });

$("#createuserinfoform").validate({
	rules : {
		staffid : "required",
		staffname : "required",
		password : {
			required : true,
			password : true
		},
		pwdconfirm : {
			required : true,
			password : true
		},
		CompanyId_create : "required",
		CompanyName_create : "required"
	},
	messages : {
		staffid : "必填",
		staffname : "必填",
		password : {
			required : "必填",
			password : "必须是长度6到16位,数字、字母、字符组成"
		},
		pwdconfirm : {
			required : "必填",
			password : "必须是长度6到16位,数字、字母、字符组成"
		},
		CompanyId_create : "必填",
		CompanyName_create : "必填"
	},
	submitHandler : function(form) {
		$.ajax({
			url : "./createuserinfosubmit",
			traditional : true,
			data : $("#createuserinfoform").serialize(),
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#createuserinfoform"));
					$('#createUserInfo').modal('hide');
					$("#formuserinfogrid").submit();
				}
			}
		});

	}
});

$('#editUserInfo').on('show.bs.modal', function(event) {
//	data-staffid="${item.get('StaffID')}" 
//		data-staffname="${item.get('StaffName')}" 
//		data-companyid="${item.get('companyid')}" 
//		data-companyname="${item.get('CompanyName')}" 
//		data-departmentid="${item.get('departmentid')}" 
//		data-departmentname="${item.get('DepartmentName')}" 
//		data-tel="${item.get('Tel')}" 
//		data-email="${item.get('Email')}" 
//		data-fax="${item.get('Fax')}" 
//	data-contacts="${item.get('Contacts')}" 
	//edituser
	 var button = $(event.relatedTarget);
	$('#edituserstaffid').val(button.data('staffid'));
	$('#edituserstaffidlbl').text(button.data('staffid'));
	$('#edituserstaffname').val(button.data('staffname'));
	$('#CompanyId_edit').val(button.data('companyid'));
	$('#CompanyName_edit').val(button.data('companyname'));
	$('#edituser_departmentID').val(button.data('departmentid'));
	$('#edituser_DepartmentSH_CompanyID').val(button.data('departmentname'));
	$('#editusercontacts').val(button.data('contacts'));
	$('#editusertel').val(button.data('tel'));
	$('#edituseremail').val(button.data('email'));
	$('#edituserfax').val(button.data('fax'));
	
});

$("#edituserinfoform").validate({
	rules : {
		staffid : "required",
		staffname : "required",
		CompanyId_edit : "required",
		CompanyName_edit : "required"
	},
	messages : {
		staffid : "必填",
		staffname : "必填",
		CompanyId_edit : "必填",
		CompanyName_edit : "必填"
	},
	submitHandler : function(form) {
		$.ajax({
			url : "./edituserinfosubmit",
			traditional : true,
			data : $("#edituserinfoform").serialize(),
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#edituserinfoform"));
					$('#editUserInfo').modal('hide');
					$("#formuserinfogrid").submit();
				}
			}
		});

	}
});

function deleteUserInfo(staffid) {
	if (!confirm("确认删除吗？")) {
		return false;
	}
	$.ajax({
		url : "./deleteuserinfo",
		traditional : true,
		data : {
			staffid : staffid
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.msg != null) {
				alert(result.msg);
			}
			if (result.success) {
				$("#formuserinfogrid").submit();
			}
		}
	});
}



$('#editPassword').on('show.bs.modal', function(event) {

	 var button = $(event.relatedTarget);
	$('#editpwdstaffid').val(button.data('staffid'));
	$('#editpwdstaffidlbl').text(button.data('staffid'));
});

$("#editpwdform").validate({
	rules : {
		password : {
			required : true,
			password : true
		},
		pwdconfirm : {
			required : true,
			password : true
		}
	},
	messages : {
		password : {
			required : "必填",
			password : "必须是长度6到16位,数字、字母、字符组成"
		},
		pwdconfirm : {
			required : "必填",
			password : "必须是长度6到16位,数字、字母、字符组成"
		}
	},
	submitHandler : function(form) {
		$.ajax({
			url : "./editpwdsubmit",
			traditional : true,
			data : $("#editpwdform").serialize(),
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success) {
					$.clearForm($("#editpwdform"));
					$('#editPassword').modal('hide');
					$("#formuserinfogrid").submit();
				}
			}
		});

	}
});


