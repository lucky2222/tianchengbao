$(function(){

	$('#addoverseacompanymodal').on('show.bs.modal', function(event) {
				var button = $(event.relatedTarget);
				var type = button.data('type');
				$.ajax({
							type : "POST",
							url : $.getContextPath()
									+ "/basedata/loadaddoverseacompanymodal",
							data : {
								type : type
							},
							success : function(data) {
								$("#addoverseacompany-body").html(data);
							}

						});

			});
	$('#addoverseacompanymodal').on('hide.bs.modal', function(event) {
				$("#addoverseacompany-body").empty();
			});
	
});

