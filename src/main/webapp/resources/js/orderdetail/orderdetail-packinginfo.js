$(function() {

			$("[id='upi_etd']").datepicker({
						dateFormat : "yy/mm/dd"
					});
		});

function SavePackingInfo() {

	var orderid = $("#upi_orderid").val();
	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderdetail/savepackinginfo",
				async : false,
				data : $("#updatepackinginfoform").serialize(),
				traditional : true,
				error : function(error) {
					alert("出错了");
				},
				success : function(data) {
					if (data == "1") {
						$("#updatepackinginfo").modal('hide');
						location.href = $.getContextPath()
								+ "/orderdetail/index/" + orderid;
					}
				}

			});

}