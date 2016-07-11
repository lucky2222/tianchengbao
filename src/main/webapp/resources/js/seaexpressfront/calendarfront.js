function calenderSubmit() {
	var polID = $("#polID").val();
	var podID = $("#podID").val();
	var carrierID = $("#carrierID").val();
	var curUrl = $("#curUrl").val();
	var customerid = $("#customerid").val();
	var orderid = $("#orderid").val();
	$.ajax({
		type : 'post',
		async : false,
		traditional : true,
		url : 'partial_list',
		data : {
			polID : polID,
			podID : podID,
			curUrl : curUrl,
			carrierID : carrierID,
			customerid : customerid,
			orderid : orderid
		},
		success : function(result) {
			$("#datelist").html(result);
			var totalMsg = $("#totalMsgHid").val();
			$("#totalMsg").html(totalMsg);
		}
	});
}