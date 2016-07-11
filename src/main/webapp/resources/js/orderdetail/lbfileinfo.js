//查询方法
function findListLb(orderid) {
	$.ajax({
		url :$.getContextPath() + "/orderdetail/lbfileinfo/" + orderid,
		async : false,
		success : function(data) {
			$("#lbfileinfo").html(data);
		}
	});
}
