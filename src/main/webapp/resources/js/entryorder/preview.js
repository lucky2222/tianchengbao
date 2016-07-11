$(function() {

			LoadSCN("SHIPPER");
			LoadSCN("CONSIGNEE");
			LoadSCN("NOTIFY");
			LoadSCN("SECONDNOTIFY");

			$("#orderedit").click(function() {
				location.href = $.getContextPath()
						+ "/entryorder/create?orderid=" + $("#orderid").val();
			});

			$("#ordersubmit").click(function() {
				$.ajax({
							url : $.getContextPath() + "/entryorder/submit",
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
												.removeItem("containerpkgs");
										localStorage.removeItem("container");
										localStorage.removeItem("cargo");
										location.href = $.getContextPath()
												+ data.msg.substr(1,
														data.msg.length);
									} else {
										alert(data.msg.substr(1,
												data.msg.length));
									}

								} else {
									alert(data.msg);
								}
							}

						});
			});
		});

function LoadSCN(str) {
	var COMPANYNAME = "500301";
	var COMPANYADDRESS = "500302";
	var TEL = "500303";
	var EMAIL = "500304";
	var FAX = "500305";
	var POSTCODE = "500306";
	var orderid = $("#orderid").val();
	var arrcompanyname = new Array();
	var arrcompanyaddress = new Array();
	var strtel = "";
	var stremail = "";
	var strfax = "";
	var strpostcode = "";
	if (orderid.length > 0) {
		$.ajax({
			url : $.getContextPath() + "/entryorder/loadscn",
			type : "post",
			data : {
				orderid : $("#orderid").val(),
				scnid : str
			},
			error : function(request) {
				alert("加载失败");
			},
			success : function(data) {
				if (data != null && data.length > 0) {
					var result = JSON.parse(data);
					$.each(result, function(i, item) {

								switch (item.SCNID) {
									case "104101" :
										ref = "Consignee";
										break;
									case "104102" :
										ref = "Shipper";
										break;
									case "104103" :
										ref = "Notify";
										break;
									case "104104" :
										ref = "SecondNotify";
										break;
									default :
										ref = "";
								}
								if (ref.length > 0) {
									if (item.SCNTypeID == COMPANYNAME) {

										arrcompanyname.push(item.Content);

									} else if (item.SCNTypeID == COMPANYADDRESS) {
										arrcompanyaddress.push(item.Content);

									} else if (item.SCNTypeID == TEL) {
										strtel = item.Content;
									} else if (item.SCNTypeID == EMAIL) {
										stremail = item.Content;
									} else if (item.SCNTypeID == FAX) {
										strfax = item.Content;;
									} else if (item.SCNTypeID == POSTCODE) {
										strpostcode = item.Content;
									}
								}

							});

					var result = arrcompanyname.join('<br/>') + '<br/>'
							+ arrcompanyaddress.join('<br/>') + '<br/>'
							+ strtel + '<br/>' + stremail + '<br/>' + strfax
							+ '<br/>' + strpostcode;

					$("#" + str).html(result);

				}
			}
		});
	}
}