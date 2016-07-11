$(function() {

	$("[role='payablepriceconfirm']").click(function() {

		var td = $(this).parent();
		var payableprice = $(this).prev('input').val().trim();
		if (payableprice.length == 0) {
			alert("请先填写应付价格");
			return false;
		}
		var orderseapriceid = $(this).data('id') + "";
		var currencyid = $(this).parent().parent().find('select').val();
		$.ajax({
					type : "POST",
					url : $.getContextPath()
							+ "/orderfreight/applyingpayablepriceoperate",
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
							td.append(payableprice);
							td.next().text("确定");
						} else {
							alert(data.substr(1, data.length));
						}
					}

				});

	});

	$("[role='payablepricetentative']").click(function() {

		var td = $(this).parent();
		var payableprice = $(this).prev('input').val().trim();
		if (payableprice.length == 0) {
			alert("请先填写应付价格");
			return false;
		}
		var orderseapriceid = $(this).data('id') + "";
		var currencyid = $(this).parent().parent().find('select').val();
		$.ajax({
					type : "POST",
					url : $.getContextPath()
							+ "/orderfreight/applyingpayablepriceoperate",
					data : {
						orderseapriceid : orderseapriceid,
						currencyid : currencyid,
						payableprice : payableprice,
						type : '216101'
					},
					async : false,
					success : function(data) {
						if (data.substr(0, 1) == '0') {
							td.children().remove();
							td.append(payableprice);
							td.next().text("暂定");
						} else {
							alert(data.substr(1, data.length));
						}
					}

				});

	});

	$("[role='costpriceconfirm']").click(function() {

		var td = $(this).parent();
		var costprice = $(this).prev('input').val().trim();
		var agencyprice = $(this).parent().next().find('input').val()
				.trim();
		if (costprice.length == 0) {
			alert("请先填写财务价格");
			return false;
		}
		var orderseapriceid = $(this).data('id') + "";
		var currencyid = $(this).parent().parent().find('select').val();
		$.ajax({
			type : "POST",
			url : $.getContextPath() + "/orderfreight/applyingcostpriceoperate",
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
					td.append(costprice);
					td.next().next().text("确定");
					td.next().text(agencyprice);
				} else {
					alert(data.substr(1, data.length));
				}
			}

		});

	});
});