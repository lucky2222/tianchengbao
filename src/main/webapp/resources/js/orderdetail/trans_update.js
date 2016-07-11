/**
 * 修改运输条款
 */

$(function() {
	checkBillType();
	$("#update_payType_val").change(function() {
		payNumber();

	});
})

// 展示运输条款
function show_update_Trans() {
	$("#update_trans").modal("show");
}
// 提交运输协议
function sub_trans() {
	var OrderID = $("#orderid").text();
	var update_trans_val = $("#update_trans_val").val();
	var param = {
		"OrderID" : OrderID,
		"TransTypeID" : update_trans_val
	};
	var path = $.getContextPath() + "/OrderUpdateController/updateTrans";
	callAjax(path, param, sub_trans_callback);
}
function sub_trans_callback(data) {
	var list = JSON.parse(data);
	var result = list.result;
	if (result != null && result != "") {
		alert(result)
		$("#update_trans").modal("hide");
		document.location.reload();
	}
}
// 显示提单号
function show_tdNo() {
	var OrderID = $("#orderid").text();
	var param = {
		"OrderID" : OrderID
	};
	var path = $.getContextPath() + "/OrderUpdateController/findTdNoList"

	callAjax(path, param, show_tdNo_callback);
}
function show_tdNo_callback(data) {
	var list = JSON.parse(data);
	var result = list.result;
	if (result != "" && result != null) {
		if (result == "没有订舱受理中不能修改提单号") {
			alert(result)
			return;
		} else {
			$("#update_tdNo").modal("show");
			$("#LadingbillNoHead_update").val(result.LadingbillNoHead)
			$("#LadingbillNoBody_update").val(result.LadingbillNoBody)
		}
	}
}
// 修改提单号
function submit_updateTdNO() {
	var OrderID = $("#orderid").text();
	var LadingbillNoHead = $.trim($("#LadingbillNoHead_update").val());
	var LadingbillNoBody = $.trim($("#LadingbillNoBody_update").val());
	if ((LadingbillNoHead + LadingbillNoBody) == null
			|| (LadingbillNoHead + LadingbillNoBody) == "") {
		alert("提单号头和提单号主体不能同时为空");
		return;
	}
	var param = {
		"OrderID" : OrderID,
		"LadingbillNoHead" : LadingbillNoHead,
		"LadingbillNoBody" : LadingbillNoBody
	};
	var path = $.getContextPath() + "/OrderUpdateController/updateTdNoInfo"
	callAjax(path, param, submit_updateTdNO_callback);
}
function submit_updateTdNO_callback(data) {
	var list = JSON.parse(data);
	var result = list.result;
	if (result == "repeat") {
		alert("提单号不能重复！");
	} else if (result > 0) {
		$("#ladingbillno_update").text(list.ladingbillno_update);
		$("#update_tdNo").modal("hide");
		$("#LadingbillNoHead_update").val("");
		$("#LadingbillNoBody_update").val("");
		findDcSuccess();
	}
}

// 修改付款方式
function show_payType() {
	$("#update_payType").modal("show");
}
// 提交付款方式
function sub_payType() {
	var ContractNo = $("#yNo").val();

	var PayTypeID = $("#update_payType_val").val()
	if (PayTypeID == "117102") { // 预付自有约
		if (ContractNo == null || ContractNo == "") {
			alert("请填写预付自有约的约号");
			return false;
		}
	}
	if (PayTypeID == "117104") { // 到付自有约
		if (ContractNo == null || ContractNo == "") {
			alert("请填写到付自有约的约号");
			return false;
		}
	}
	var OrderID = $("#orderid").text();
	var param = {
		"ContractNo" : ContractNo,
		"OrderID" : OrderID,
		"PayTypeID" : PayTypeID
	}
	var path = $.getContextPath() + "/OrderUpdateController/updatePayType"
	callAjax(path, param, sub_payType_callback);
}
function sub_payType_callback(data) {
	var list = JSON.parse(data);
	var result = list.result;
	if (result != null && result != "") {
		if (result > 0) {
			alert("修改付款方式成功");
			$("#yNo").val("");
			document.location.reload();
		} else {
			alert("修改付款方式失败");
		}
	}
}
// 修改舱单数和提单数
function show_update_Amount(type) {
	$("#update_CdTdCount").modal("show");
	$("#cdtd_type").val(type);
	var cdtd_type = $("#cdtd_type").val();
	if (cdtd_type == "cd") {
		$("#update_name").text("舱单数");
		$("#updateCdTd").text("修改舱单");
	} else if (cdtd_type == "td") {
		$("#update_name").text("提单数");
		$("#updateCdTd").text("修改提单");
	}
}
// 提交舱单数和提单数
function sub_cdtdCount() {
	var cdtd_type = $("#cdtd_type").val();
	var OrderID = $("#orderid").text();
	var cdtd_count = $("#cdtd_count").val();
	var path = $.getContextPath() + "/OrderUpdateController/updateCdTdcount"
	var param = {};
	param = {
		"cdtd_type" : cdtd_type,
		"OrderID" : OrderID,
		"cdtd_count" : cdtd_count
	}
	callAjax(path, param, sub_cdtdCount_callback);
}
function sub_cdtdCount_callback(data) {
	var list = JSON.parse(data);
	var result = list.result;
	if (result != null && result != "") {
		alert(result)
		document.location.reload();
	}
}
// 修改特殊订舱申请（非提单显示）
function sub_SpecialRemark() {
	if (confirm("确定提交吗？") == false) {
		return false;
	}
	var SpecialRemark = $("#update_SpecialRemark").val();
	var OrderID = $("#orderid").text();
	var param = {
		"OrderID" : OrderID,
		"SpecialRemark" : SpecialRemark
	}
	var path = $.getContextPath()
			+ "/OrderUpdateController/updateSpecialRemark"
	callAjax(path, param, sub_SpecialRemark_callback);
}
function sub_SpecialRemark_callback(data) {
	var list = JSON.parse(data);
	var result = list.result;
	if (result != null && result != "") {
		alert(result)
		document.location.reload();
	}
}

// 需在提单显示的特殊内容
function sub_ladingbillremark() {
	if (confirm("确定提交吗？") == false) {
		return false;
	}
	var OrderID = $("#orderid").text();
	var ladingbillremark = $("#update_ladingbillremark").val();
	if (!doCheckSubmit(document.getElementById("update_ladingbillremark"), 35)) {
		alert("提交失败：包含非法字符");
		return false;
	}
	var path = $.getContextPath()
			+ "/OrderUpdateController/updateLadingbillremark"
	var param = {
		"OrderID" : OrderID,
		"ladingbillremark" : ladingbillremark
	}
	callAjax(path, param, sub_ladingbillremark_callback);
}
function sub_ladingbillremark_callback(data) {
	var list = JSON.parse(data);
	var result = list.result;
	if (result != null && result != "") {
		alert(result)
		document.location.reload();
	}
}
// 根据付款方式是否显示约号
function payNumber() {

	var update_payType_val = $("#update_payType_val").val();
	if (update_payType_val == "117102") { // 预付自有约
		$("#yNo_title").show();
		$("#yNo_title").text("预付自有约号：");
		$("#yNo").show();
	} else if (update_payType_val == "117104") { // 到付自有约
		$("#yNo_title").show();
		$("#yNo_title").text("到付自有约号：");
		$("#yNo").show();
	} else {
		$("#yNo").hide();
		$("#yNo_title").hide();
	}

}

// 显示海外代理列表
function show_agent() {
	$("#update_agent").modal("show");
	AgentList();
}

// 查询海外代理列表
function AgentList() {
	var path = $.getContextPath() + "/OrderUpdateController/AgentList"
	callAjax(path, null, AgentList_callback);

}
function AgentList_callback(data) {
	var result = JSON.parse(data);
	var list = result.list
	if (list != null && list != "") {
		var html = "";
		for (var i = 0; i < list.length; i++) {
			var OverSeaCompanyID = list[i]['OverSeaCompanyID'];
			var OverSeaCompanyName = list[i]['OverSeaCompanyName'];
			html += "<option value ='" + OverSeaCompanyID + "'>"
					+ OverSeaCompanyName + "</option>";
		}
		$("#AgentList").append(html);

	}
}
// 查询是否是代理单
function checkBillType() {
	var OrderID = $("#orderid").text();
	var path = $.getContextPath() + "/OrderUpdateController/checkBillType"
	var param = {
		"OrderID" : OrderID,
	}
	callAjax(path, param, checkBillType_callback);
}
function checkBillType_callback(data) {
	var list = JSON.parse(data);
	var result = list.result;
	if (result == "1") {
		$("#agent_label").show();
	} else {
		$("#agent_label").hide();
	}
}
// 修改海外代理
function updateAgent() {
	var OrderID = $("#orderid").text();
	var AgentCompanyID = $("#AgentList").val();
	var path = $.getContextPath() + "/OrderUpdateController/updateAgent"
	var param = {
		"OrderID" : OrderID,
		"AgentCompanyID" : AgentCompanyID
	}
	callAjax(path, param, updateAgent_callback);
}
function updateAgent_callback(data) {
	var list = JSON.parse(data);
	var result = list.result;
	if (result == "1") {
		alert("修改成功");
		$("#update_agent").modal("hide");
		location.reload();
	} else {
		alert("修改失败");
	}
}
