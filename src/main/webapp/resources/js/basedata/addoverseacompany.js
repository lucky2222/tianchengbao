

var canSend = true;

function AddSCNRow(obj) {
	var button = $(obj);
	var ref = button.data('ref');
	var maxrows = parseInt(button.data('maxrows'));
	var lastrow = $("ul[for='" + ref + "'] li:last");
	var seqno = parseInt(lastrow.children().eq(0).attr("seqno"));
	if (seqno < maxrows) {
		var lastclone = lastrow.clone();
		var removebtn = "<a href=\"#\" onclick=\"Removerow(this)\">删除</a>";
		lastclone.children().eq(0).val("");
		lastclone.children().eq(0).attr("seqno", seqno + 1);
		if (seqno == 1) {
			$("ul[for='" + ref + "']").append("<li>" + lastclone.html()
					+ removebtn + "</li>");
		} else {
			$("ul[for='" + ref + "']").append("<li>" + lastclone.html()
					+ "</li>");
		}
	} else {
		alert("最大可用行数为" + maxrows + "行");
	}

}

function SaveNewSCN() {
	var flag = true;
	var scn = {};
	var scncompanyname = [];
	var scncompanyaddress = [];
	if ($("#overseaSCNID").val().length == 0) {
		alert("必须选择收发通类型");
		return false;
	}

	var companyid = $("#overseacompanyid").val();
	if (companyid.length == 0) {
		alert("必须选择海外代理");
		return false;
	}

	$('input[name="addSCNCompanyName"]').each(function(i, item) {
				var isvalid = item.checkValidity();
				if (!isvalid) {
					flag = false;
					alert("公司名称有非英文字符，请修改");
					return false;
				} else if (item.value.length == 0) {
					flag = false;
					alert("公司名称需必填");
					return false;
				} else {
					scncompanyname.push(item.value.trim());
				}
			});
	$('input[name="addSCNCompanyAddress"]').each(function(i, item) {
				var isvalid = item.checkValidity();
				if (!isvalid) {
					flag = false;
					alert("公司地址有非英文字符，请修改");
					return false;
				} else if (item.value.length == 0) {

				} else {
					scncompanyaddress.push(item.value.trim());
				}
			});
	$('input[name="addSCNTel"]').each(function(i, item) {
				var isvalid = item.checkValidity();
				if (!isvalid) {
					flag = false;
					alert("公司电话有非英文字符，请修改");
					return false;
				}
			});
	$('input[name="addSCNEmail"]').each(function(i, item) {
				var isvalid = item.checkValidity();
				if (!isvalid) {
					flag = false;
					alert("公司邮箱有非英文字符，请修改");
					return false;
				}
			});
	$('input[name="addSCNFax"]').each(function(i, item) {
				var isvalid = item.checkValidity();
				if (!isvalid) {
					flag = false;
					alert("公司传真有非英文字符，请修改");
					return false;
				}
			});
	$('input[name="addSCNPostCode"]').each(function(i, item) {
				var isvalid = item.checkValidity();
				if (!isvalid) {
					flag = false;
					alert("公司邮编有非英文字符，请修改");
					return false;
				}
			});

	if (!flag)
		return false;

	scn.type = $("#overseaSCNID").val();
	scn.companyname = scncompanyname;
	scn.companyaddress = scncompanyaddress;
	scn.tel = $('input[name="addSCNTel"]').val().trim();
	scn.email = $('input[name="addSCNEmail"]').val().trim();
	scn.fax = $('input[name="addSCNFax"]').val().trim();
	scn.postcode = $('input[name="addSCNPostCode"]').val().trim();

	$.ajax({
				url : $.getContextPath() + "/basedata/addoverseacompany",
				data : {
					scn : JSON.stringify(scn),
					companyid : companyid
				},
				type : "post",
				async : false,
				success : function(result) {
					var data = JSON.parse(result);
					if (data.success == true) {
						$("#addoverseacompanymodal").modal('hide');
						$("#searchoverseaform").submit();
					} else {
						alert(data.msg);
					}
				}
			});
}

function Removerow(obj) {
	var prev = $(obj).parent().prev().children().eq(0);
	$(obj).parent().remove();
	SCNPreView(prev);
}

function SCNPreView(obj) {
	var type = $(obj).data('type');
	var category = $(obj).data('category');
	var companynamearr = new Array();
	var companyaddressarr = new Array();
	var tel = "";
	var email = "";
	var fax = "";
	var postcode = "";
	var result = new Array();

	var xx = $("[data-type='" + type + "']");
	xx.each(function(i, item) {
				if ($(item).data('category') == "CompanyName"
						&& $(item).val().length > 0) {
					companynamearr.push($(item).val());
				}
				if ($(item).data('category') == "CompanyAddress"
						&& $(item).val().length > 0) {
					companyaddressarr.push($(item).val());
				}
				if ($(item).data('category') == "Tel"
						&& $(item).val().length > 0)
					tel = $(item).val();
				if ($(item).data('category') == "Email"
						&& $(item).val().length > 0)
					email = $(item).val();
				if ($(item).data('category') == "Fax"
						&& $(item).val().length > 0)
					fax = $(item).val();
				if ($(item).data('category') == "PostCode"
						&& $(item).val().length > 0)
					postcode = $(item).val();
			});
	$.each(companynamearr, function(i, arritem) {
				result.push(arritem.toUpperCase());
			});
	$.each(companyaddressarr, function(i, arritem) {
				result.push(arritem.toUpperCase());
			});
	if (tel.length > 0)
		result.push(tel.toUpperCase());
	if (email.length > 0)
		result.push(email.toUpperCase());
	if (fax.length > 0)
		result.push(fax.toUpperCase());
	if (postcode.length > 0)
		result.push(postcode.toUpperCase());

	$("#" + type + "Preview").html("<p>" + result.join("</p><p>") + "</p>");

}