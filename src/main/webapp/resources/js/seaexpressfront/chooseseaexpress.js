/**
 * 前台船期运价界面Js
 */

function ChkAllWeeks() {
	var arrSon = document.getElementsByName("select");
	var cbAll = document.getElementById("selectAll");
	var tempState = cbAll.checked;
	for (i = 0; i < arrSon.length; i++) {
		if (arrSon[i].checked != tempState)
			arrSon[i].checked = tempState;
	}
	WeekChk();
}

function IsStraightOrTrans(id) {

	var x = document.getElementById(id);
	if (x.checked) {
		x.value = 1;
	} else {
		x.value = 0;
	}
	WeekChk();
}

function RadioCargoTypeClick(type) {
	if (type == 'd') {
		$("#AllDangerTypeSpan").show();
		$("#DangerTypeSpan").show();
		$("#IsDanger").val(1);

	} else {
		$("#AllDangerTypeSpan").hide();
		$("#DangerTypeSpan").hide();
		var arrSon = document.getElementsByName("selectDangerType");
		var cbAll = document.getElementById("selectAllDanger");
		cbAll.checked = false;
		for (i = 0; i < arrSon.length; i++) {
			arrSon[i].checked = false;
		}
		$("#IsDanger").val(0);
	}
	WeekChk();

}

function ChkAllDanger() {
	var arrSon = document.getElementsByName("selectDangerType");
	var cbAll = document.getElementById("selectAllDanger");
	var tempState = cbAll.checked;
	for (i = 0; i < arrSon.length; i++) {
		if (arrSon[i].checked != tempState)
			arrSon[i].checked = tempState;
	}
	WeekChk();
}

function WeekChk() {
	var polID = $("#PolID").val();
	var podID = $("#PodID").val();
	var OrderByDays = $("#OrderByDays").val();
	var OrderBy20GP = $("#OrderBy20GP").val();
	var OrderBy40GP = $("#OrderBy40GP").val();
	var OrderBy40HC = $("#OrderBy40HC").val();
	var IsStraight = $("#IsStraight").val();
	var IsTrans = $("#IsTrans").val();
	var IsAmsEns = $("#IsAmsEns").val();
	var IsDanger = $("#IsDanger").val();
	var QueryCarrier = $("#QueryCarrier").val();
	var IsAllWater = 0;
	var IsNotAllWater = 0;
	if (IsAmsEns == 0) {
		IsAllWater = $("#IsAllWater").val();
		IsNotAllWater = $("#IsNotAllWater").val();
	}
	var etdList = new Array();

	$("input[name='select']").each(function() {
		if (this.checked) {
			etdList.push(this.value);
		}
	});

	var dangerLvlList = new Array();

	$("input[name='selectDangerType']").each(function() {
		if (this.checked) {
			dangerLvlList.push(this.value);
		}
	});
	$
			.ajax({
				type : 'post',
				async : false,
				traditional : true,
				url : 'partial_gridsefront',
				data : {
					polID : polID,
					podID : podID,
					ETDList : etdList,
					DangerLvlList : dangerLvlList,
					OrderByDays : OrderByDays,
					OrderBy20GP : OrderBy20GP,
					OrderBy40GP : OrderBy40GP,
					OrderBy40HC : OrderBy40HC,
					IsStraight : IsStraight,
					IsTrans : IsTrans,
					IsAllWater : IsAllWater,
					IsNotAllWater : IsNotAllWater,
					IsDanger : IsDanger,
					IsAmsEns : IsAmsEns,
					QueryCarrier : QueryCarrier
				},
				success : function(result) {
					$("#gridview").html(result);
					var DangerRadioChecked = document
							.getElementById("DangerRadio").checked;

					if (dangerLvlList.length > 0) {
						showAllByName("dangerTable");
						hideAllByName("normalTable");
					} else {
						showAllByName("normalTable");
						hideAllByName("dangerTable");
					}
				}
			});
}

function showAllByName(tagName) {
	var items = document.getElementsByName(tagName);
	for (i = 0; i < items.length; i++) {
		$(items[i]).show();
	}
}

function hideAllByName(tagName) {
	var items = document.getElementsByName(tagName);
	for (i = 0; i < items.length; i++) {
		$(items[i]).hide();
	}
}

function GoToOrder(pol, pod, pot, delivery, polse, podse) {
	var radioname = "radio" + pol;
	var radios = document.getElementsByName(radioname);
	var customerid = $("#customerid").val();
	var orderid = $("#orderid").val();
	var paytypeid = "";
	for (i = 0; i < radios.length; i++) {
		if (radios[i].checked)
			paytypeid = radios[i].value;
	}
	if (paytypeid == "") {
		alert("请选择付款方式");
		return false;
	}
	window.location.href = $.getContextPath() + '/entryorder/create?pol=' + pol
			+ '&&pod=' + pod + '&&pot=' + pot + '&&delivery=' + delivery
			+ '&&polse=' + polse + '&&podse=' + podse + '&&paytypeid='
			+ paytypeid + '&&customerid=' + customerid + '&&orderid='
			+ orderid;

}