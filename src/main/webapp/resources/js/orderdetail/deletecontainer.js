$(function() {
	
	$('#deleteContainer').on('hide.bs.modal', function(event) {
				$("#deleteContainer-body").empty();
			});
			
	$("#deleteContainerform").validate({
		onkeyup : false,
		onclick : false,
		onfocusout : false,
		rules : {

			Container_EditReason : "required"

		},
		messages : {

			Container_EditReason : "必填"

		},
		submitHandler : function(form) {
			$.ajax({
						type : "POST",
						url : $.getContextPath()
								+ "/orderdetail/deleteordercontainer",
						async : false,
						data : {
							content : JSON.stringify($("#deleteContainerform")
									.serializeJson()),
							orderid : $("#orderid").text()
						},
						success : function(data) {
							$("#closeeditContainerModal").click();
							$("#cargo").html(data);
						}

					});
		}
	});
});