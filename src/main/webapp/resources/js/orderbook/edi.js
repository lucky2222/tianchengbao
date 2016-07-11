$('#speediinfo').on(
		'show.bs.modal',
		function(event) {
			var button = $(event.relatedTarget);
			var type = button.data('type');
			var modal = $(this);
			// data-id="${speediinfo.get('id')}"
			// data-orderid="${order.orderid}"
			// data-startportname="${speediinfo.get('StartPortName')}"
			// data-startportcode="${speediinfo.get('StartPortCode')}"
			// data-endportname="${speediinfo.get('EndPortName')}"
			// data-endportcode="${speediinfo.get('EndPortCode')}"
			// data-transportname="${speediinfo.get('TransPortName')}"
			// data-transportcode="${speediinfo.get('TransPortCode')}"
			// data-deliveryplace="${speediinfo.get('DeliveryPlace')}"
			// data-deliveryplacecode="${speediinfo.get('DeliveryPlaceCode')}"
			// data-receiptplacecode="${speediinfo.get('ReceiptPlaceCode')}"
			// data-receiptplace="${speediinfo.get('ReceiptPlace')}"
			// data-destinationcode="${speediinfo.get('DestinationCode')}"
			// data-destination="${speediinfo.get('Destination')}"
			// data-contractno="${speediinfo.get('ContractNo')}"
			// data-routelinecode="${speediinfo.get('RouteLineCode')}"
			// data-freightpaidaddress="${speediinfo.get('FreightPaidAddress')}"
			// data-freightpaidaddresscode="${speediinfo.get('FreightPaidAddressCode')}"
			// data-ladingbillissueaddress="${speediinfo.get('LadingBillIssueAddress')}"
			// data-ladingbillissueaddresscode="${speediinfo.get('LadingBillIssueAddressCode')}"
			// data-salesname="${speediinfo.get('SalesName')}"
			// data-suitcaseyard="${speediinfo.get('SuitcaseYard')}"
			// data-emergencycontact="${speediinfo.get('EmergencyContact')}"
			// data-contacttel="${speediinfo.get('ContactTel')}"
			// data-bookinginstructions="${speediinfo.get('BookingInstructions')}"
			// data-bookingno="${speediinfo.get('BookingNo')}"
			// data-ladingbilltype="${speediinfo.get('LadingBillType')}"
			// data-realshipper="${speediinfo.get('RealShipper')}"
			// data-hscode="${speediinfo.get('HSCode')}"
			$('#id_edispe').val(button.data('id'));
			$('#orderid_edispe').val(button.data('orderid'));
			$('#StartPortName_edispe').val(button.data('startportname'));
			$('#StartPortCode_edispe').val(button.data('startportcode'));
			$('#EndPortName_edispe').val(button.data('endportname'));
			$('#EndPortCode_edispe').val(button.data('endportcode'));
			$('#TransPortName_edispe').val(button.data('transportname'));
			$('#TransPortCode_edispe').val(button.data('transportcode'));
			$('#DeliveryPlace_edispe').val(button.data('deliveryplace'));
			$('#DeliveryPlaceCode_edispe')
					.val(button.data('deliveryplacecode'));
			$('#ReceiptPlaceCode_edispe').val(button.data('receiptplacecode'));
			$('#ReceiptPlace_edispe').val(button.data('receiptplace'));
			$('#DestinationCode_edispe').val(button.data('destinationcode'));
			$('#Destination_edispe').val(button.data('destination'));
			$('#ContractNo_edispe').val(button.data('contractno'));
			$('#RouteLineCode_edispe').val(button.data('routelinecode'));
			$('#RouteLineName_edispe').val(button.data('routelinename'));
			$('#RouteLineName_edispe_show').val(
					button.data('routelinenameshow'));
			$('#FreightPaidAddress_edispe').val(
					button.data('freightpaidaddress'));
			$('#FreightPaidAddressCode_edispe').val(
					button.data('freightpaidaddresscode'));
			$('#LadingBillIssueAddress_edispe').val(
					button.data('ladingbillissueaddress'));
			$('#LadingBillIssueAddressCode_edispe').val(
					button.data('ladingbillissueaddresscode'));
			$('#SalesName_edispe').val(button.data('salesname'));
			$('#SuitcaseYard_edispe').val(button.data('suitcaseyard'));
			$('#EmergencyContact_edispe').val(button.data('emergencycontact'));
			$('#ContactTel_edispe').val(button.data('contacttel'));
			$('#BookingInstructions_edispe').val(
					button.data('bookinginstructions'));
			$('#BookingNo_edispe').val(button.data('bookingno'));
			$('#LadingBillType_edispe').val(button.data('ladingbilltype'));
			$('#RealShipper_edispe').val(button.data('realshipper'));
			$('#HSCode1').val(button.data('hscode'));

			if (type == "shipgrid") {
				$('#operate').attr("operatetype", "shipgrid");
			}
			if (type == "fastquery") {
				$('#operate').attr("operatetype", "fastquery");
			}
		});

$('#speediinfo').on('hide.bs.modal', function(event) {
	window.location.reload();
});

$("#edispeinfoform").validate({
	// rules : {
	// vessel : "required",
	// voyage : "required",
	// vesselcn : "required",
	// etd : "required"
	// },
	// messages : {
	// vessel : "必填",
	// voyage : "必填",
	// vesselcn : "必填",
	// etd : "必填"
	// },
	submitHandler : function(form) {
		var orderid = $("#orderid_edispe").val();
		$.ajax({
			url : "/edi/saveedispeinfo",
			data : $("#edispeinfoform").serialize(),
			type : "post",
			async : false,
			success : function(data) {
				var result = JSON.parse(data);
				if (result.msg != null && result.msg != '') {
					alert(result.msg);
				}
				if (result.success) {
					// $('#speediinfo').modal('hide');
					location.href = "/edi/bookingedi?orderid=" + orderid;
					// $.ajax({
					// url : "/edi/bookingedi",
					// data : {
					// orderid : $("#orderid_edispe").val()
					// },
					// type : "post",
					// async : false,
					// success : function(data1) {
					// var result1 = JSON.parse(data1);
					// if (result1.msg != null) {
					// alert(result1.msg);
					// }
					// }
					// });
				}
			}
		});

	}
});

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
