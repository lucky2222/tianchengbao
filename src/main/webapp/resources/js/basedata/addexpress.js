$(function() {

			$("#addCustomerExpressform").validate({
				onkeyup : false,
				onclick : false,
				onfocusout : false,
				rules : {

					CustomerExpress_Company : "required",
					CustomerExpress_TypeID : "required",
					CustomerExpress_CompanyName : "required",
					CustomerExpress_Address : "required"

				},
				messages : {

					CustomerExpress_Company : "必填",
					CustomerExpress_TypeID : "必填",
					CustomerExpress_CompanyName : "必填",
					CustomerExpress_Address : "必填"

				},
				submitHandler : function(form) {
					var flag = true;
					if ($("#CustomerExpress_CompanyID").val().length == 0) {
						flag = false;
						if ($("#CustomerExpress_Company").parent()
								.find("label:contains('必填')").length == 0) {
							$("#CustomerExpress_Company").parent()
									.append("<label>必填</label>");
						}
					}
					if (!flag)
						return;

					$.ajax({
								type : "POST",
								url : $.getContextPath()
										+ "/basedata/addcustomerexpress",
								async : false,
								data : {
									content : JSON
											.stringify($("#addCustomerExpressform")
													.serializeJson())
								},
								success : function(data) {
									alert(data.substr(1, data.length));
									$("#addcustomerexpressmodal").modal('hide');
									$("#btn_search").submit();
								}

							});

				}
			});

			
			$("#editCustomerExpressform").validate({
				onkeyup : false,
				onclick : false,
				onfocusout : false,
				rules : {

					CustomerExpress_Company : "required",
					CustomerExpress_TypeID : "required",
					CustomerExpress_CompanyName : "required",
					CustomerExpress_Address : "required"

				},
				messages : {

					CustomerExpress_Company : "必填",
					CustomerExpress_TypeID : "必填",
					CustomerExpress_CompanyName : "必填",
					CustomerExpress_Address : "必填"

				},
				submitHandler : function(form) {
					var flag = true;
					if ($("#CustomerExpress_CompanyID").val().length == 0) {
						flag = false;
						if ($("#CustomerExpress_Company").parent()
								.find("label:contains('必填')").length == 0) {
							$("#CustomerExpress_Company").parent()
									.append("<label>必填</label>");
						}
					}
					if (!flag)
						return;

					$.ajax({
								type : "POST",
								url : $.getContextPath()
										+ "/basedata/editcustomerexpress",
								async : false,
								data : {
									content : JSON
											.stringify($("#editCustomerExpressform")
													.serializeJson())
								},
								success : function(data) {
									alert(data.substr(1, data.length));
									$("#addcustomerexpressmodal").modal('hide');
									$("#btn_search").submit();
								}

							});

				}
			});

		});