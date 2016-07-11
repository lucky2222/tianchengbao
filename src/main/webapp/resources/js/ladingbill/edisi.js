function getPortCode(obj, codeid, carrierid) {
	if (obj.value == null || obj == '') {
		return false;
	}
	$.ajax({
		url : "/edi/getportcode",
		data : {
			portname : obj.value,
			carrierid : carrierid
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.success) {
				$("#" + codeid).val(result.id);
			}
		}
	});
}

function getRoutelineCode(text, value, obj) {
	$.ajax({
		url : "/edi/getroutelinecode",
		data : {
			routelineid : value
		},
		type : "post",
		async : false,
		success : function(data) {
			var result = JSON.parse(data);
			if (result.success) {
				$("#RouteLineCode_edispe").val(result.id);
			}
		}
	});
}