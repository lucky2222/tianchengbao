
		
		
function payablepriceconfirm(obj){
	
	var td = $(obj).parent();
				var payableprice = $(obj).prev('input').val().trim();
				if (payableprice.length == 0) {
					alert("请先填写应付价格");
					return false;
				}
				var orderseapriceid = $(obj).data('id') + "";
				var currencyid = $(obj).parent().parent().find('select').val();
				$.ajax({
							type : "POST",
							url : $.getContextPath()
									+ "/orderfreight/bookedpayablepriceoperate",
							data : {
								orderseapriceid : orderseapriceid,
								currencyid : currencyid,
								payableprice : payableprice,
								type : '216102'
							},
							async : false,
							success : function(data) {
								if (data.substr(0, 1) == '0') {
									td.children().remove();
									td.next().text("确定");
									td.append("<input type=\"number\" value=\""
											+ payableprice
											+ "\" disabled=\"disabled\" />");
									td
											.append("<a href=\"#\" data-id=\""
													+ orderseapriceid
													+ "\" onclick=\"editpayableprice(this)\">修改</a>");

								} else {
									alert(data.substr(1, data.length));
								}
							}

						});

						
}
		

function costpriceconfirm(obj){
	var td = $(obj).parent();
				var costprice = $(obj).prev('input').val().trim();
				var agencyprice = $(obj).parent().next().find('input').val()
						.trim();
				if (costprice.length == 0) {
					alert("请先填写财务价格");
					return false;
				}
				var orderseapriceid = $(obj).data('id') + "";
				var currencyid = $(obj).parent().parent().find('select').val();
				$.ajax({
							type : "POST",
							url : $.getContextPath()
									+ "/orderfreight/bookedcostpriceoperate",
							data : {
								orderseapriceid : orderseapriceid,
								currencyid : currencyid,
								costprice : costprice,
								agencyprice : agencyprice,
								type : '216102'
							},
							async : false,
							success : function(data) {
								if (data.substr(0, 1) == '0') {
									td.children().remove();
									td.next().children().remove();
									td.next().next().html("确定");
									var innerhtml = "<input type=\"number\" value=\""
											+ costprice
											+ "\" disabled=\"disabled\" />"
											+ "<a href=\"#\" data-id=\""
											+ orderseapriceid
											+ "\" onclick=\"editcostprice(this)\">修改</a>"
									td.html(innerhtml);
									td
											.next()
											.html("<input type=\"number\" value=\""
													+ agencyprice
													+ "\" disabled=\"disabled\" />");
								} else {
									alert(data.substr(1, data.length));
								}
							}

						});

}


function editpayableprice(obj) {
	$(obj).prev('input').attr("disabled", false);
	var orderseapriceid = $(obj).data('id') + "";
	$(obj).replaceWith("<a href=\"#\" data-id=\"" + orderseapriceid
			+ "\" onclick=\"modifypayableprice(this)\">确定</a>");
}

function editcostprice(obj) {
	$(obj).prev('input').attr("disabled", false);
	$(obj).parent().next().find('input').attr("disabled", false);
	var orderseapriceid = $(obj).data('id') + "";
	$(obj).replaceWith("<a href=\"#\" data-id=\"" + orderseapriceid
			+ "\" onclick=\"modifycostprice(this)\">确定</a>");
}

function modifypayableprice(obj) {
	var td = $(obj).parent();
	var payableprice = $(obj).prev('input').val().trim();
	if (payableprice.length == 0) {
		alert("请先填写应付价格");
		return false;
	}
	var orderseapriceid = $(obj).data('id') + "";
	var currencyid = $(obj).parent().parent().find('select').val();
	$.ajax({
				type : "POST",
				url : $.getContextPath()
						+ "/orderfreight/bookedpayablepricemodify",
				data : {
					orderseapriceid : orderseapriceid,
					currencyid : currencyid,
					payableprice : payableprice,
					type : '216102'
				},
				async : false,
				success : function(data) {
					if (data.substr(0, 1) == '0') {
						td.children().remove();
						td.next().text("确定");
						td.append("<input type=\"number\" value=\""
								+ payableprice + "\" disabled=\"disabled\" />");
						td.append("<a href=\"#\" data-id=\"" + orderseapriceid
								+ "\" onclick=\"editpayableprice(this)\">修改</a>");

					} else {
						alert(data.substr(1, data.length));
					}
				}

			});

}
function modifycostprice(obj) {
	var td = $(obj).parent();
	var costprice = $(obj).prev('input').val().trim();
	var agencyprice = $(obj).parent().next().find('input').val().trim();
	if (costprice.length == 0) {
		alert("请先填写财务价格");
		return false;
	}
	var orderseapriceid = $(obj).data('id') + "";
	var currencyid = $(obj).parent().parent().find('select').val();
	$.ajax({
				type : "POST",
				url : $.getContextPath()
						+ "/orderfreight/bookedcostpricemodify",
				data : {
					orderseapriceid : orderseapriceid,
					currencyid : currencyid,
					costprice : costprice,
					agencyprice : agencyprice,
					type : '216102'
				},
				async : false,
				success : function(data) {
					if (data.substr(0, 1) == '0') {
						td.children().remove();
						td.next().children().remove();
						td.next().next().html("确定");
						var innerhtml = "<input type=\"number\" value=\""
								+ costprice + "\" disabled=\"disabled\" />"
								+ "<a href=\"#\" data-id=\"" + orderseapriceid
								+ "\" onclick=\"editcostprice(this)\">修改</a>"
						td.html(innerhtml);
						td.next().html("<input type=\"number\" value=\""
								+ agencyprice + "\" disabled=\"disabled\" />");
					} else {
						alert(data.substr(1, data.length));
					}
				}

			});
}

function submitpayfee(orderid) {

	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderfee/confirmallfeeitem",
				data : {

					xconfirm_roleid : '4',
					payfeeid : "pay",
					confirm_orderid : orderid
				},
				async : false,
				success : function(data) {
					$("#bookedoperatemodal").modal('hide');
					$("#bookedform").submit();
				}

			});

}