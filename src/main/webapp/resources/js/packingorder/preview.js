$(function() {

			$("#orderedit").click(function() {
				location.href = $.getContextPath()
						+ "/packingorder/create?orderid=" + $("#orderid").val();
			});

			$("#ordersubmit").click(function() {
				$.ajax({
							url : $.getContextPath() + "/packingorder/submit",
							data : {
								orderid : $("#orderid").val(),
								createflag : $("#createflag").val()
							},
							type : "post",
							async : false,
							error : function(request) {
								alert("出错了!");
							},
							success : function(result) {
								var data = JSON.parse(result);
								if (data.success == true) {
									if (data.msg.substr(0, 1) == '0') {
										localStorage
												.removeItem("dulicontainerpkgs");
										localStorage
												.removeItem("dulicontainer");
										localStorage.removeItem("dulicargo");
										location.href = $.getContextPath()
												+ data.msg.substr(1, data.msg.length);
									} else {
										alert(data.msg.substr(1, data.msg.length));
									}

								} else {
									alert(data.msg);
								}
							}

						});
			});
		});
