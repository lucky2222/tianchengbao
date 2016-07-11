$(function() {

		});

function applyingoperate(obj) {

	$.ajax({
				type : "POST",
				url : $.getContextPath() + "/orderfreight/applyingcontent",
				data : {
					orderid : $(obj).data('id')
				},
				async : false,
				success : function(data) {
					$("#applyingcontent").html(data);
					$("#applyingoperatemodal").modal('show');
				}

			});

}