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

	scn.type = $("#SCNID").val();
	scn.companyname = scncompanyname;
	scn.companyaddress = scncompanyaddress;
	scn.tel = $('input[name="addSCNTel"]').val().trim();
	scn.email = $('input[name="addSCNEmail"]').val().trim();
	scn.fax = $('input[name="addSCNFax"]').val().trim();
	scn.postcode = $('input[name="addSCNPostCode"]').val().trim();

	$.ajax({
				url : "./savenewscn",
				data : {
					scn : JSON.stringify(scn)
				},
				type : "post",
				async : false,
				success : function(result) {
					var data = JSON.parse(result);
					if (data.success == true) {
						$("#newSCNmodal").modal('hide')
					} else {
						alert(data.msg);
					}
				}
			});
}
