$(function() {

			$('#addcustomerexpressmodal').on('hide.bs.modal', function(event) {
						$("#addcustomerexpress-body").empty();
					});
		});

function loadcustomerexpress() {
	$.ajax({
				type : "GET",
				url : $.getContextPath() + "/basedata/loadcustomerexpress",
				success : function(data) {
					$("#addcustomerexpress-body").html(data);
					$("#submitcustomerexpress").attr("form",
							"addCustomerExpressform");
					$("#addcustomerexpressmodal").modal('show');
				}

			});
}

function editcustomerexpress(id) {
	$.ajax({
		type : "GET",
		url : $.getContextPath() + "/basedata/loadeditcustomerexpress",
		data : {
			CustomerExpressAddressID : id
		},
		success : function(data) {
			$("#addcustomerexpress-body").html(data);
			$("#submitcustomerexpress").attr("form", "editCustomerExpressform");
			$("#addcustomerexpressmodal").modal('show');
		}

	});
}

function delcustomerexpress(id) {
	
	if (!confirm("确认删除吗？")) {
		return false;
	}

	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/basedata/delcustomerexpress",
				async : false,
				data : {
					customerexpressaddressid : id
				},
				success : function(data) {
					alert(data.substr(1, data.length));
					$("#btn_search").submit();
				}

			});
}
