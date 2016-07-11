$(function() {

			$('#selectordertype').on('show.bs.modal', function(event) {
						var button = $(event.relatedTarget);
						var customerid = button.data("id") + "";
						$("#hidden_customerid").val(customerid);
						$("[name='OrderTypeID']").removeAttr("checked");
						$("#OrderTypeID_500101").click();
					});

			$("#submitselectordertype").click(function() {
				var ordertypeid = $('input[name="OrderTypeID"]:checked');
				var customerid = $("#hidden_customerid").val();
				if (ordertypeid.length == 0) {
					alert("请选择订单类型");
					return false;
				} else {
					var url = "";
					switch (ordertypeid.val()) {
						case '500101' :
							url = "/calendar/index?customerid=" + customerid;
							break;
						case '500102' :
							url = "";
							break;
						case '500103' :
							url = "/packingorder/create?customerid="
									+ customerid;
							break;
						case '500104' :
							url = "";
							break;
						case '500105' :
							url = "";
							break;
						case '500106' :
							url = "";
							break;
						case '500107' :
							url = "";
							break;
						default :
							url = "";
							break;
					}
					if (url.length > 0)
						location.href = $.getContextPath() + url;
					else {
						return alert("敬请期待!");
						return false;
					}
				}
			});
		});

function gotoorder(obj) {
	var ordertypeid = $(obj).data('ordertypeid') + "";
	var url = "";
	switch (ordertypeid) {
		case '500101' :
			url = "/entryorder/create?orderid=";
			break;
		case '500102' :
			url = "";
			break;
		case '500103' :
			url = "/packingorder/create?orderid=";
			break;
		case '500104' :
			url = "";
			break;
		case '500105' :
			url = "";
			break;
		case '500106' :
			url = "";
			break;
		case '500107' :
			url = "";
			break;
		default :
			url = "";
			break;
	}
	if (url.length > 0)
		location.href = $.getContextPath() + url + $(obj).text();
	else {
		return alert("敬请期待!");
		return false;
	}

}


function gototemplate(obj) {
	var ordertypeid = $(obj).data('ordertypeid') + "";
	var url = "";
	switch (ordertypeid) {
		case '500101' :
			url = "/calendar/index?orderid=";
			break;
		case '500102' :
			url = "";
			break;
		case '500103' :
			url = "/packingorder/create?orderid=";
			break;
		case '500104' :
			url = "";
			break;
		case '500105' :
			url = "";
			break;
		case '500106' :
			url = "";
			break;
		case '500107' :
			url = "";
			break;
		default :
			url = "";
			break;
	}
	if (url.length > 0)
		location.href = $.getContextPath() + url + $(obj).text();
	else {
		return alert("敬请期待!");
		return false;
	}

}