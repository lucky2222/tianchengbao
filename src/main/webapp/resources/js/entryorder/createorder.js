$(function() {
	var WXP = "109103";// 危险品
	var LCWXP = "109105";// 冷藏危险品
	var TZXH = "109106";// 特种箱货
	var LH = "109104";// 冷货

	var canSend = true;

	localStorage.removeItem("containerpkgs");
	localStorage.removeItem("container");
	localStorage.removeItem("cargo");
	if ($("#orderid").val().length > 0) {
		localStorage.removeItem("containerpkgs");
		localStorage.removeItem("container");
		localStorage.removeItem("cargo");
	}

	VertifyLocalStorage();
	LoadContainerPkgsStorage();
	LoadContainerStorage();
	LoadCargoStorage();
	LoadSCN("SHIPPER");
	LoadSCN("CONSIGNEE");
	LoadSCN("NOTIFY");
	LoadSCN("SECONDNOTIFY");
	init();
	initContainerPkgs();
	initContainer();
	initCargo();
	// localStorage.clear();

	// 装箱方式增删改
	$('#addContainerPkgs').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var type = button.data('type');
		var modal = $(this);
		if (type == "add") {
			modal.find('.modal-title').text("新增装箱方式");
			$("#op_Pkgs").text("新增");
			$("#op_Pkgs").attr("operatetype", "add");
			$("#OrderContainerPkgsID").val("");
			$("#hide_pkgsid").val("");
			$("#Pkgs_ContainerPkgTypeID").get(0).selectedIndex = 0;
			$("#Pkgs_Contact").val("");
			$("#Pkgs_Tel").val("");
			$("#Pkgs_TrailerAddress").val("");
			$("#Pkgs_PkgRemark").val("");
			$("#Pkgs_Date").val("");
			$("#Pkgs_URL").val("");
			$("#div_Pkgs_Contact").hide();
			$("#div_Pkgs_Tel").hide();
			$("#div_Pkgs_TrailerAddress").hide();
			$("#div_Pkgs_PkgRemark").hide();
			$("#div_Pkgs_Date").hide();
			$("#div_Pkgs_URL").hide();
			if ($("#Pkgs_Date").parent().find("label").length > 0)
				$("#Pkgs_Date").parent().find("label").remove();
		} else if (type == "update") {
			modal.find('.modal-title').text("修改装箱方式");
			$('#op_Pkgs').text("修改");
			$('#op_Pkgs').attr("operatetype", "update");
			$("#hide_pkgsid").val(button.data('id'));
			$("#OrderContainerPkgsID").val(button.data('ordercontainerpkgsid'));
			$("#Pkgs_ContainerPkgTypeID")
					.val(button.data('containerpkgtypeid'));
			$("#Pkgs_Contact").val(button.data('contact'));
			$("#Pkgs_Tel").val(button.data('tel'));
			$("#Pkgs_TrailerAddress").val(button.data('traileraddress'));
			$("#Pkgs_Date").val(button.data('date'));
			$("#Pkgs_PkgRemark").val(button.data('pkgremark'));
			if ($("#Pkgs_Date").parent().find("label").length > 0)
				$("#Pkgs_Date").parent().find("label").remove();
			if (button.data('url') != 'undefined')
				$("#Pkgs_URL").val(button.data('url'));
			if (button.data('urlname') != 'undefined')
				$("#Pkgs_URLName").text(button.data('urlname'));
			if (button.data('urlnamedownload') != 'undefined')
				$("#Pkgs_URLName").attr("href", button.data('urlnamedownload'));

		}
	});

	$("#Pkgs_ContainerPkgTypeID").change(function() {
		if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "自装自集港") {
			$("#div_Pkgs_Contact").hide();
			$("#div_Pkgs_Tel").hide();
			$("#div_Pkgs_TrailerAddress").hide();
			$("#div_Pkgs_Date").hide();
			$("#div_Pkgs_PkgRemark").hide();
			$("#div_Pkgs_URL").hide();
			$("#Pkgs_URL").val("");
			$("#Pkgs_URLName").text("");
			$("#Pkgs_URLName").attr("href", "javascript:void(0)");
			if ($("#Pkgs_Date").parent().find("label").length > 0)
				$("#Pkgs_Date").parent().find("label").remove();
		} else if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "堆场装箱") {
			$("#div_Pkgs_Contact").show();
			$("#div_Pkgs_Tel").show();
			$("#div_Pkgs_TrailerAddress").show();
			$("#div_Pkgs_PkgRemark").show();
			$("#div_Pkgs_Date").show();
			$("#div_Pkgs_URL").show();
			$("#lb_Pkgs_Date").text("堆装日期:");
			$("#lb_Pkgs_URL").text("堆装文件:");
			$("#lb_Pkgs_PkgRemark").text("堆装要求:");
			if ($("#Pkgs_Date").parent().find("label").length > 0)
				$("#Pkgs_Date").parent().find("label").remove();
			var html = document.getElementById('uploadPkgsSpan').innerHTML;
			document.getElementById('uploadPkgsSpan').innerHTML = html;
			$("#Pkgs_URL").val("");
			$("#Pkgs_URLName").text("");
			$("#Pkgs_URLName").attr("href", "javascript:void(0)");

		} else if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "产地装箱(自装代集港)") {
			$("#div_Pkgs_Contact").show();
			$("#div_Pkgs_Tel").show();
			$("#div_Pkgs_TrailerAddress").show();
			$("#div_Pkgs_PkgRemark").show();
			$("#div_Pkgs_Date").show();
			$("#div_Pkgs_URL").show();
			$("#lb_Pkgs_Date").text("产装日期:");
			$("#lb_Pkgs_URL").text("产装文件:");
			$("#lb_Pkgs_PkgRemark").text("产装要求:");
			if ($("#Pkgs_Date").parent().find("label").length > 0)
				$("#Pkgs_Date").parent().find("label").remove();
			var html = document.getElementById('uploadPkgsSpan').innerHTML;
			document.getElementById('uploadPkgsSpan').innerHTML = html;
			$("#Pkgs_URL").val("");
			$("#Pkgs_URLName").text("");
			$("#Pkgs_URLName").attr("href", "javascript:void(0)");
		}
	});

	$("#op_Pkgs").click(function() {
		var count = 1;
		var flag = true;
		var containerpkgs = null;
		var containerpkgsarray = new Array();
		if (localStorage.getItem("containerpkgs") != null) {
			containerpkgs = JSON.parse(localStorage.getItem("containerpkgs"));
		}
		if (containerpkgs != null) {
			containerpkgs.sort(SortsDSC);
			containerpkgsarray = eval(containerpkgs);
		}

		if (containerpkgsarray.length > 0) {
			count = containerpkgsarray[0]["id"] + 1;
		}
		if ($('#op_Pkgs').attr("operatetype") == 'add') {

			if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "自装自集港") {
				$.each(containerpkgsarray, function(i, item) {
							if (item["ContainerPkgType"] == "自装自集港") {
								alert("已存在自装自集港，不能多次添加");
								flag = false;
								return false;
							}
						});
			}

			if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "堆场装箱") {
				if ($("#Pkgs_Date").val().trim().length == 0) {
					$("#Pkgs_Date").focus();
					if ($("#Pkgs_Date").parent().find("label").length == 0) {
						$("#Pkgs_Date").parent().append("<label>必填</label>");
					}
					flag = false;
					return false;
				}
			}
			if (!flag)
				return;
			var containerpkgsitem = {
				id : count,
				OrderContainerPkgsID : GenerateJQueryId(),
				ContainerPkgTypeID : $("#Pkgs_ContainerPkgTypeID option:selected")
						.val(),
				ContainerPkgType : $("#Pkgs_ContainerPkgTypeID option:selected")
						.text().trim(),
				Contact : $("#Pkgs_Contact").val(),
				Tel : $("#Pkgs_Tel").val(),
				TrailerAddress : $("#Pkgs_TrailerAddress").val(),
				PkgRemark : $("#Pkgs_PkgRemark").val(),
				Date : $("#Pkgs_Date").val(),
				URL : $("#Pkgs_URL").val(),
				URLName : $("#Pkgs_URLName").text(),
				URLNameDownLoad : $("#Pkgs_URLName").attr("href")
			}
			containerpkgsarray.push(containerpkgsitem);

			localStorage.setItem("containerpkgs", JSON
							.stringify(containerpkgsarray));
			$("#closeContainerPkgsModal").click();
			$("#tb_ContainerPkgs")
					.append("<tr id=\"tr_ContainerPkgs_"
							+ containerpkgsitem["OrderContainerPkgsID"]
							+ "\"><td><a href=\"#\" data-toggle=\"modal\" data-target=\"#addContainerPkgs\" data-type=\"update\" data-containerpkgtypeid=\""
							+ containerpkgsitem["ContainerPkgTypeID"]
							+ "\" data-ordercontainerpkgsid=\""
							+ containerpkgsitem["OrderContainerPkgsID"]
							+ "\" data-contact=\""
							+ containerpkgsitem["Contact"]
							+ "\" data-tel=\""
							+ containerpkgsitem["Tel"]
							+ "\" data-date=\""
							+ containerpkgsitem["Date"]
							+ "\" data-traileraddress=\""
							+ containerpkgsitem["TrailerAddress"]
							+ "\" data-pkgremark=\""
							+ containerpkgsitem["PkgRemark"]
							+ "\" data-url=\""
							+ containerpkgsitem["URL"]
							+ "\" data-urlname=\""
							+ containerpkgsitem["URLName"]
							+ "\" data-urlnamedownload=\""
							+ containerpkgsitem["URLNameDownLoad"]
							+ "\" data-id=\""
							+ containerpkgsitem["id"]
							+ "\">"
							+ containerpkgsitem["ContainerPkgType"]
							+ "</a></td><td>"
							+ containerpkgsitem["Contact"]
							+ "</td><td>"
							+ containerpkgsitem["Tel"]
							+ "</td><td>"
							+ containerpkgsitem["Date"]
							+ "</td><td>"
							+ containerpkgsitem["TrailerAddress"]
							+ "</td><td>"
							+ containerpkgsitem["PkgRemark"]
							+ "</td><td><a href=\""
							+ (containerpkgsitem["URLNameDownLoad"] == undefined
									? "#"
									: containerpkgsitem["URLNameDownLoad"])
							+ "\" >查看</a></td><td><a href=\"#\" name=\"delContainerPkgs\" onclick=\"deleteContainerPkgs(this)\" data-type=\""
							+ containerpkgsitem["OrderContainerPkgsID"]
							+ "\">删除</a></td></tr>");

			/*
			 * $("[name='delContainerPkgs']").bind("click",
			 * deleteContainerPkgs);
			 */

		} else if ($('#op_Pkgs').attr("operatetype") == 'update') {

			if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "自装自集港") {
				$.each(containerpkgsarray, function(i, item) {
							if (item["ContainerPkgType"] == "自装自集港") {
								alert("已存在自装自集港，不能多次添加");
								flag = false;
								return false;
							}
						});
			}
			if ($("#Pkgs_ContainerPkgTypeID option:selected").text() == "堆场装箱") {
				if ($("#Pkgs_Date").val().trim().length == 0) {
					$("#Pkgs_Date").focus();
					if ($("#Pkgs_Date").parent().find("label").length == 0) {
						$("#Pkgs_Date").parent().append("<label>必填</label>");
					}
					flag = false;
					return false;
				}
			}
			if (!flag)
				return;
			$.each(containerpkgsarray, function(i, item) {
				if (item["OrderContainerPkgsID"] == $("#OrderContainerPkgsID")
						.val()) {

					item["OrderContainerPkgsID"] = $("#OrderContainerPkgsID")
							.val();
					item["ContainerPkgTypeID"] = $("#Pkgs_ContainerPkgTypeID option:selected")
							.val();
					item["ContainerPkgType"] = $("#Pkgs_ContainerPkgTypeID option:selected")
							.text().trim();
					item["Contact"] = $("#Pkgs_Contact").val();
					item["Tel"] = $("#Pkgs_Tel").val();
					item["TrailerAddress"] = $("#Pkgs_TrailerAddress").val();
					item["PkgRemark"] = $("#Pkgs_PkgRemark").val();
					item["Date"] = $("#Pkgs_Date").val();
					item["URL"] = $("#Pkgs_URL").val();
					item["URLName"] = $("#Pkgs_URLName").text();
					item["URLNameDownLoad"] = $("#Pkgs_URLName").attr("href");
					var $td = $("#tr_ContainerPkgs_"
							+ item["OrderContainerPkgsID"]).children('td');

					$td
							.eq(0)
							.html("<a href=\"#\" data-toggle=\"modal\" data-target=\"#addContainerPkgs\" data-type=\"update\" data-containerpkgtypeid=\""
									+ item["ContainerPkgTypeID"]
									+ "\" data-ordercontainerpkgsid=\""
									+ item["OrderContainerPkgsID"]
									+ "\" data-contact=\""
									+ item["Contact"]
									+ "\" data-tel=\""
									+ item["Tel"]
									+ "\" data-date=\""
									+ item["Date"]
									+ "\" data-traileraddress=\""
									+ item["TrailerAddress"]
									+ "\" data-pkgremark=\""
									+ item["PkgRemark"]
									+ "\" data-url=\""
									+ item["URL"]
									+ "\" data-urlname=\""
									+ item["URLName"]
									+ "\" data-urlnamedownload=\""
									+ item["URLNameDownLoad"]
									+ "\" data-id=\""
									+ item["id"]
									+ "\">"
									+ item["ContainerPkgType"] + "</a>");
					$td.eq(1).html(item["Contact"]);
					$td.eq(2).html(item["Tel"]);
					$td.eq(3).html(item["Date"]);
					$td.eq(4).html(item["TrailerAddress"]);
					$td.eq(5).html(item["PkgRemark"]);
					$td.eq(6).html("<a href=\""
							+ (item["URLNameDownLoad"] == undefined
									? "#"
									: item["URLNameDownLoad"]) + "\" >查看</a>");

				}
			});
			localStorage.setItem("containerpkgs", JSON
							.stringify(containerpkgsarray));
			$("#closeContainerPkgsModal").click();
		}
	});

	/*
	 * $("[name='delContainerPkgs']").bind("click", deleteContainerPkgs);
	 * 
	 * $("[name='delContainer']").bind("click", deleteContainer);
	 * 
	 * $("[name='delCargo']").bind("click", deleteCargo);
	 */

	/*
	 * 箱型箱量增删改
	 */

	// 选择货物类型 更改箱型
	$("[name='lb_Container_CargoTypeID']").click(function() {
		var cargocategory = $(this).find("input").val();
		if ($("#Container_DangerLvl").parent().find("label").length > 0)
			$("#Container_DangerLvl").parent().find("label").remove();
		if ($("#Container_Amount").parent().find("label").length > 0)
			$("#Container_Amount").parent().find("label").remove();

		if (cargocategory == WXP || cargocategory == LCWXP) {
			$("#div_Container_DangerLvl").show();
			$("#Container_DangerLvl").attr("disabled", false);
		} else {
			$("#div_Container_DangerLvl").hide();
			$("#Container_DangerLvl").get(0).selectedIndex = 0;
			$("#Container_DangerLvl").attr("disabled", "disabled");
		}
		$.ajax({
			url : "./loadcontainertype",
			data : {
				CargoCategoryID : cargocategory
			},
			type : "post",
			success : function(data) {
				$("#Container_ContainerTypeID").empty();
				if (data != null && data.length > 0) {
					var result = JSON.parse(data);
					$.each(result, function(i, item) {
						$("#Container_ContainerTypeID")
								.append("<option value=\""
										+ item.ContainerTypeID + "\">"
										+ item.ContainerTypeName + "</option>");
					});

					$("#Container_ContainerTypeID").attr("disabled", false);

				}
			}
		});
	});

	// 添加箱型模态框初始化装箱方式
	$('#addContainer').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var type = button.data('type');
		var modal = $(this);
		if (type == "add") {
			modal.find('.modal-title').text("新增箱型箱量");
			$("#op_Container").text("新增");
			$("#op_Container").attr("operatetype", "add");
			if ($("#group_Container_CargoTypeID").parent()
					.find("label:contains('必填')").length > 0)
				$("#group_Container_CargoTypeID").parent()
						.find("label:contains('必填')").remove();
			if ($("#Container_DangerLvl").parent().find("label").length > 0)
				$("#Container_DangerLvl").parent().find("label").remove();
			if ($("#Container_Amount").parent().find("label").length > 0)
				$("#Container_Amount").parent().find("label").remove();
			if ($("#Container_ContainerPkgTypeID").parent().find("label").length > 0)
				$("#Container_ContainerPkgTypeID").parent().find("label")
						.remove();

			$("#div_Container_DangerLvl").hide();
			$("#Container_DangerLvl").get(0).selectedIndex = 0;
			$("#Container_DangerLvl").attr("disabled", "disabled");
			$("[name='Container_CargoTypeID']").removeAttr("checked");
			$("[name='lb_Container_CargoTypeID']").removeClass("active");
			$("#OrderContainerID").val("");
			$("#hide_containerid").val("");
			$("#Container_ContainerTypeID").empty()
					.attr("disabled", "disabled");
			$("#Container_Amount").val("");
			$("#Container_IsSoc").get(0).selectedIndex = 0;
			initPkgsTypeComponent();
		} else if (type == "update") {
			modal.find('.modal-title').text("修改箱型箱量");
			$('#op_Container').text("修改");
			$('#op_Container').attr("operatetype", "update");
			var cargotypeid = button.data('cargotypeid') + "";
			var dangerlvlid = button.data('dangerlvlid') + "";
			var containertypeid = button.data('containertypeid') + "";
			if ($("#Container_DangerLvl").parent().find("label").length > 0)
				$("#Container_DangerLvl").parent().find("label").remove();
			if ($("#Container_Amount").parent().find("label").length > 0)
				$("#Container_Amount").parent().find("label").remove();
			if ($("#Container_ContainerPkgTypeID").parent().find("label").length > 0)
				$("#Container_ContainerPkgTypeID").parent().find("label")
						.remove();
			$("[name='Container_CargoTypeID']").each(function(i, item) {
						if ($(item).val() == cargotypeid) {
							$(item).parent().click();
						}
					});
			if (cargotypeid == WXP || cargotypeid == LCWXP) {

				$("#div_Container_DangerLvl").show();
				$("#Container_DangerLvl").val(dangerlvlid);
			} else {
				$("#div_Container_DangerLvl").hide();
				$("#Container_DangerLvl").get(0).selectedIndex = 0;
				$("#Container_DangerLvl").attr("disabled", "disabled");
			}
			$("#OrderContainerID").val(button.data('ordercontainerid'));
			$("#hide_containerid").val(button.data('id'));
			$("#Container_ContainerTypeID").val(containertypeid);

			$("#Container_Amount").val(button.data('amount'));
			$("#Container_IsSoc").val(button.data('issocid'));
			initPkgsTypeComponent();
			$("#Container_ContainerPkgTypeID").val(button
					.data('containerpkgtypeid')
					+ "");

		}
	});

	$("#op_Container").click(function() {
		var count = 1;
		var flag = true;
		var container = null;
		var containerarray = new Array();
		if (localStorage.getItem("container") != null) {
			container = JSON.parse(localStorage.getItem("container"));
		}
		if (container != null) {
			container.sort(SortsDSC);
			containerarray = eval(container);
		}

		if (containerarray.length > 0) {
			count = containerarray[0]["id"] + 1;
		}

		var cargocategoryid = $('input[name="Container_CargoTypeID"]:checked')
				.val();
		var cargocategory = $('input[name="Container_CargoTypeID"]:checked')
				.parent().text().trim();

		var containertypeid = $("#Container_ContainerTypeID option:selected")
				.val();
		var dangerlvlid = $("#Container_DangerLvl option:selected").val();
		var amount = $("#Container_Amount").val();
		var containerpkgtypeid = $("#Container_ContainerPkgTypeID option:selected")
				.val();
		var issocid = $("#Container_IsSoc option:selected").val();
		if ($('#op_Container').attr("operatetype") == 'add') {

			if (cargocategoryid == undefined) {
				flag = false;
				if ($("#group_Container_CargoTypeID").parent()
						.find("label:contains('必填')").length == 0) {
					$("#group_Container_CargoTypeID").parent()
							.append("<label>必填</label>");
				}

			}

			if (cargocategoryid == WXP || cargocategoryid == LCWXP) {
				if (dangerlvlid.length == 0) {
					flag = false;
					$("#Container_DangerLvl").focus();
					if ($("#Container_DangerLvl").parent().find("label").length == 0) {
						$("#Container_DangerLvl").parent()
								.append("<label>必填</label>");
					}
				}
			}
			if (containerpkgtypeid == undefined) {
				flag = false;
				if ($("#Container_ContainerPkgTypeID").parent().find("label").length == 0) {

					$("#Container_ContainerPkgTypeID").parent()
							.append("<label>必填</label>");
				}

			}

			if (amount.length == 0) {
				flag = false;
				$("#Container_Amount").focus();
				if ($("#Container_Amount").parent().find("label").length == 0) {

					$("#Container_Amount").parent().append("<label>必填</label>");
				}

			}

			$.each(containerarray, function(i, item) {
						if (containertypeid == item["ContainerTypeID"]
								&& cargocategoryid == item["CargoTypeID"]
								&& dangerlvlid == item["DangerLvlID"]
								&& containerpkgtypeid == item["ContainerPkgTypeID"]
								&& issocid == item["IsSocID"]) {
							flag = false;
							alert("禁止多次添加同种类型箱子,如需更改请进行修改");
						}
					});
			if (!flag)
				return;
			var containeritem = {
				id : count,
				CargoTypeID : cargocategoryid,
				CargoType : cargocategory,
				DangerLvlID : dangerlvlid,
				DangerLvl : $("#Container_DangerLvl option:selected").text()
						.trim(),
				OrderContainerID : GenerateJQueryId(),
				ContainerTypeID : containertypeid,
				ContainerType : $("#Container_ContainerTypeID option:selected")
						.text().trim(),
				Amount : amount,
				IsSocID : $("#Container_IsSoc option:selected").val(),
				IsSoc : $("#Container_IsSoc option:selected").text().trim(),
				ContainerPkgTypeID : containerpkgtypeid,
				ContainerPkgType : $("#Container_ContainerPkgTypeID option:selected")
						.text()
			}
			containerarray.push(containeritem);

			localStorage.setItem("container", JSON.stringify(containerarray));
			$("#closeContainerModal").click();
			$("#tb_Container")
					.append("<tr id=\"tr_Container_"
							+ containeritem["OrderContainerID"]
							+ "\"><td><a href=\"#\" data-toggle=\"modal\" data-target=\"#addContainer\" data-type=\"update\" data-ordercontainerid=\""
							+ containeritem["OrderContainerID"]
							+ "\" data-containertypeid=\""
							+ containeritem["ContainerTypeID"]
							+ "\" data-cargotypeid=\""
							+ containeritem["CargoTypeID"]
							+ "\" data-dangerlvlid=\""
							+ containeritem["DangerLvlID"]
							+ "\" data-amount=\""
							+ containeritem["Amount"]
							+ "\" data-issocid=\""
							+ containeritem["IsSocID"]
							+ "\" data-containerpkgtypeid=\""
							+ containeritem["ContainerPkgTypeID"]
							+ "\" data-id=\""
							+ containeritem["id"]
							+ "\">"
							+ containeritem["ContainerType"]
							+ "</a></td><td>"
							+ containeritem["Amount"]
							+ "</td><td>"
							+ containeritem["CargoType"]
							+ "</td><td>"
							+ containeritem["IsSoc"]
							+ "</td><td>"
							+ containeritem["ContainerPkgType"]
							+ "</td><td><a href=\"#\" name=\"delContainer\" onclick=\"deleteContainer(this)\" data-type=\""
							+ containeritem["OrderContainerID"]
							+ "\">删除</a></td></tr>");

			/* $("[name='delContainer']").bind("click", deleteContainer); */

		} else if ($('#op_Container').attr("operatetype") == 'update') {

			if (cargocategoryid == undefined) {
				flag = false;
				if ($("#group_Container_CargoTypeID").parent()
						.find("label:contains('必填')").length == 0) {
					$("#group_Container_CargoTypeID").parent()
							.append("<label>必填</label>");
				}

			}

			if (cargocategoryid == WXP || cargocategoryid == LCWXP) {
				if (dangerlvlid.length == 0) {
					flag = false;
					$("#Container_DangerLvl").focus();
					if ($("#Container_DangerLvl").parent().find("label").length == 0) {
						$("#Container_DangerLvl").parent()
								.append("<label>必填</label>");
					}
				}
			}
			if (amount.length == 0) {
				flag = false;
				$("#Container_Amount").focus();
				if ($("#Container_Amount").parent().find("label").length == 0) {

					$("#Container_Amount").parent().append("<label>必填</label>");
				}

			}
			if (containerpkgtypeid == undefined) {
				flag = false;
				if ($("#Container_ContainerPkgTypeID").parent().find("label").length == 0) {

					$("#Container_ContainerPkgTypeID").parent()
							.append("<label>必填</label>");
				}

			}

			$.each(containerarray, function(i, item) {
						if (item["OrderContainerID"] != $("#OrderContainerID")
								.val()
								&& containertypeid == item["ContainerTypeID"]
								&& cargocategoryid == item["CargoTypeID"]
								&& dangerlvlid == item["DangerLvlID"]
								&& containerpkgtypeid == item["ContainerPkgTypeID"]
								&& issocid == item["IsSocID"]) {
							flag = false;
							alert("已经添加了相同选项的箱子");
						}
					});
			if (!flag)
				return;

			$.each(containerarray, function(i, item) {
				if (item["OrderContainerID"] == $("#OrderContainerID").val()) {

					item["CargoTypeID"] = cargocategoryid;
					item["CargoType"] = cargocategory;
					item["DangerLvlID"] = dangerlvlid;
					item["DangerLvl"] = $("#Container_DangerLvl option:selected")
							.text().trim();
					item["OrderContainerID"] = $("#OrderContainerID").val();
					item["ContainerTypeID"] = containertypeid;
					item["ContainerType"] = $("#Container_ContainerTypeID option:selected")
							.text().trim();
					item["Amount"] = amount;
					item["IsSocID"] = $("#Container_IsSoc option:selected")
							.val().trim();
					item["IsSoc"] = $("#Container_IsSoc option:selected")
							.text();
					item["ContainerPkgTypeID"] = containerpkgtypeid;
					item["ContainerPkgType"] = $("#Container_ContainerPkgTypeID option:selected")
							.text().trim();
					var $td = $("#tr_Container_" + item["OrderContainerID"])
							.children('td');

					$td
							.eq(0)
							.html("<a href=\"#\" data-toggle=\"modal\" data-target=\"#addContainer\" data-type=\"update\" data-ordercontainerid=\""
									+ item["OrderContainerID"]
									+ "\" data-containertypeid=\""
									+ item["ContainerTypeID"]
									+ "\" data-cargotypeid=\""
									+ item["CargoTypeID"]
									+ "\" data-dangerlvlid=\""
									+ item["DangerLvlID"]
									+ "\" data-amount=\""
									+ item["Amount"]
									+ "\" data-issocid=\""
									+ item["IsSocID"]
									+ "\" data-containerpkgtypeid=\""
									+ item["ContainerPkgTypeID"]
									+ "\" data-id=\""
									+ item["id"]
									+ "\">"
									+ item["ContainerType"] + "</a>");
					$td.eq(1).html(item["Amount"]);
					$td.eq(2).html(item["CargoType"]);
					$td.eq(3).html(item["IsSoc"]);
					$td.eq(4).html(item["ContainerPkgType"]);

				}
			});
			localStorage.setItem("container", JSON.stringify(containerarray));
			$("#closeContainerModal").click();
		}
	});

	$('#addCargo').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var type = button.data('type');
		var modal = $(this);
		if (type == "add") {
			modal.find('.modal-title').text("新增货物信息");
			$("#op_Cargo").text("新增");
			$("#op_Cargo").attr("operatetype", "add");
			$("[name='CargoTypeID']").removeAttr("checked");
			$("[name='lb_CargoTypeID']").removeClass("active");
			$.clearForm($("#addCargoform"));
			$.RemoveValidationMessage($("#addCargoform"), "label", "必填");
			$("[role='requiredinfo']").show();
			$("[role='dangerinfo']").hide();
			$("[role='reeferinfo']").hide();
			$("[role='specialinfo']").hide();
			$("#Marks").val("N/M");
		} else if (type == "update") {
			var updateid = button.data('updateid');
			modal.find('.modal-title').text("修改货物信息");
			$('#op_Cargo').text("修改");
			$('#op_Cargo').attr("operatetype", "update");
			$.clearForm($("#addCargoform"));
			$.RemoveValidationMessage($("#addCargoform"), "label", "必填");
			var cargo = null;
			var updateitem = null;
			if (localStorage.getItem("cargo") != null) {
				cargo = JSON.parse(localStorage.getItem("cargo"));
			}
			if (cargo != null) {
				$.each(cargo, function() {
							if (this.OrderCargoID == updateid) {
								updateitem = this;
							}
						});
			}

			if (updateitem != null) {
				$.each(updateitem, function(k, v) {
							if (k == "id" || k == "hide_cargoid") {
								$("#hide_cargoid").val(v);
							} else if (k == "CargoTypeID") {
								$("[name='CargoTypeID']").each(
										function(i, item) {
											if ($(item).val() == v) {
												$(item).parent().click();
											}
										});
							} else if (k == "IsPollution") {
								if (v == 1) {
									$("#IsPollution").prop("checked", true);
								}
							} else {
								$("#" + k).val(v);
							}

						});
			}
		}
	});

	// 选择货物类型 动态更改录入控件
	$("[name='lb_CargoTypeID']").click(function() {
		var cargocategory = $(this).find("input").val();
		$.RemoveValidationMessage($("#group_Cargo_CargoTypeID").parent(),
				"label", "必填");
		if (cargocategory == WXP) {
			$.clearForm($("[role='reeferinfo']"));
			$.clearForm($("[role='specialinfo']"));
			$("[role='dangerinfo']").show();
			$("[role='reeferinfo']").hide();
			$("[role='specialinfo']").hide();

		} else if (cargocategory == LCWXP) {
			$.clearForm($("[role='specialinfo']"));
			$("[role='dangerinfo']").show();
			$("[role='reeferinfo']").show();
			$("[role='specialinfo']").hide();

		} else if (cargocategory == LH) {
			$.clearForm($("[role='dangerinfo']"));
			$.clearForm($("[role='specialinfo']"));
			$("[role='dangerinfo']").hide();
			$("[role='reeferinfo']").show();
			$("[role='specialinfo']").hide();

		} else if (cargocategory == TZXH) {
			$.clearForm($("[role='dangerinfo']"));
			$.clearForm($("[role='reeferinfo']"));
			$("[role='dangerinfo']").hide();
			$("[role='reeferinfo']").hide();
			$("[role='specialinfo']").show();

		} else {
			$.clearForm($("[role='dangerinfo']"));
			$.clearForm($("[role='reeferinfo']"));
			$.clearForm($("[role='specialinfo']"));
			$("[role='dangerinfo']").hide();
			$("[role='reeferinfo']").hide();
			$("[role='specialinfo']").hide();

		}
			// $.ajax({
			// url : "./loadcarriercargodesc",
			// data : {
			// CargoCategoryID : cargocategory
			// },
			// type : "post",
			// success : function(data) {

			// TODO 加载船公司港口货物说明
			// });
	});

	$("#addCargoform").validate({
		onkeyup : false,
		onclick : false,
		onfocusout : false,
		rules : {

			HSCode : {
				required : true,
				remote : "./checkhscode"
			},
			HSCode_HSCode : "required",
			NameEN : "required",
			PackageNameEN : {
				required : true,

				remote : "./checkpackage"
			},
			PkgTypeID : "required",
			NameCN : "required",
			Number : {
				required : true,
				digits : true
			},
			Weight : {
				required : true,
				weight : true
			},
			Volume : {
				required : true,
				volume : true
			},
			Marks : {
				required : true,
				charEN : true
			},
			CargoDes : {
				charEN : true
			},
			UNNo : "required",
			ClassNo : "required",
			SetTemperature : {
				required : true,
				temperature : true
			},
			MaxTemperature : {
				required : true,
				temperature : true
			},
			MinTemperature : {
				required : true,
				temperature : true
			},
			VentilateType : "required",
			Ventilate : {
				required : true,
				floatnum : true
			},
			Humidity : {
				required : true,
				floatnum : true
			},
			SetLength : "required",
			SetWidth : "required",
			SetHeight : "required"

		},
		messages : {

			HSCode : {
				required : "必填",
				remote : "HSCode不存在"
			},
			HSCode_HSCode : "必填",
			NameEN : "必填",
			PackageNameEN : {
				required : "必填",
				remote : "包装不存在"
			},
			PkgTypeID : "必填",
			NameCN : "必填",
			Number : {
				required : "必填",
				digits : "必须是整数"
			},
			Weight : {
				required : "必填",
				weight : "必须是大于0的整数或小数"
			},
			Volume : {
				required : "必填",
				volume : "必须是大于0的整数或小数"
			},
			Marks : {
				required : "必填",
				charEN : "必须是字母、数字、符号"
			},
			CargoDes : {
				charEN : "必须是字母、数字、符号"
			},
			UNNo : "必填",
			ClassNo : "必填",
			SetTemperature : {
				required : "必填",
				temperature : "必须是正负整数或一位小数"
			},
			MaxTemperature : {
				required : "必填",
				temperature : "必须是正负整数或一位小数"
			},
			MinTemperature : {
				required : "必填",
				temperature : "必须是正负整数或一位小数"
			},
			VentilateType : "必填",
			Ventilate : {
				required : "必填",
				floatnum : "必须是整数或一位小数"
			},
			Humidity : {
				required : "必填",
				floatnum : "必须是整数或一位小数"
			},
			SetLength : "必填",
			SetWidth : "必填",
			SetHeight : "必填"

		},
		submitHandler : function(form) {
			var count = 1;
			var flag = true;
			var cargo = null;
			var cargoarray = new Array();

			if ($('input[name="CargoTypeID"]:checked').val() == undefined) {
				flag = false;
				if ($("#group_Cargo_CargoTypeID").parent()
						.find("label:contains('必填')").length == 0) {
					$("#group_Cargo_CargoTypeID").parent()
							.append("<label>必填</label>");
				}
			}
			if ($("#PkgTypeID").val().length == 0) {
				flag = false;
				if ($("#PackageNameEN").parent().find("label:contains('必填')").length == 0) {
					$("#PackageNameEN").parent().append("<label>必填</label>");
				}
			}

			if (localStorage.getItem("cargo") != null) {
				cargo = JSON.parse(localStorage.getItem("cargo"));
			}
			if (cargo != null) {
				cargo.sort(SortsDSC);
				cargoarray = eval(cargo);
			}

			if (cargoarray.length > 0) {
				count = cargoarray[0]["id"] + 1;
			}

			var cargoitem = $(form).serializeJson();

			if ($('#op_Cargo').attr("operatetype") == 'add') {
				if (cargoarray.length > 0) {
					$.each(cargoarray, function(i, item) {
								if (item.CargoTypeID == cargoitem.CargoTypeID
										&& item.HSCode == cargoitem.HSCode) {
									flag = false;
									alert("已有相同的货物");

								}
							});
				}

				if (!flag)
					return;
				if (!$.isEmptyObject(cargoitem)) {
					if (!CheckContainerBeforeAddCargo(cargoitem.CargoTypeID)) {
						return false;
					}

					cargoitem.OrderCargoID = GenerateJQueryId();
					cargoitem.CargoType = $('input[name="CargoTypeID"]:checked')
							.parent().text().trim();
					cargoitem.id = count;

				}
				cargoarray.push(cargoitem);
				localStorage.setItem("cargo", JSON.stringify(cargoarray));
				$("#closeCargoModal").click();
				$("#tb_Cargo")
						.append("<tr id=\"tr_Cargo_"
								+ cargoitem.OrderCargoID
								+ "\"><td><a href=\"#\" data-toggle=\"modal\" data-target=\"#addCargo\" data-type=\"update\" data-updateid=\""
								+ cargoitem.OrderCargoID
								+ "\">"
								+ cargoitem.CargoType
								+ "</a></td><td>"
								+ cargoitem.HSCode
								+ "</td><td>"
								+ cargoitem.NameEN
								+ "</td><td>"
								+ cargoitem.NameCN
								+ "</td><td>"
								+ cargoitem.Number
								+ "</td><td>"
								+ cargoitem.Weight
								+ "</td><td>"
								+ cargoitem.Volume
								+ "</td><td><a href=\"#\" name=\"delCargo\" onclick=\"deleteCargo(this)\" data-type=\""
								+ cargoitem.OrderCargoID
								+ "\">删除</a></td></tr>");

				/* $("[name='delCargo']").bind("click", deleteCargo); */

			} else if ($('#op_Cargo').attr("operatetype") == 'update') {

				if (cargoarray.length > 0) {

					if (!CheckContainerBeforeAddCargo(cargoitem.CargoTypeID)) {
						return false;
					}

					$.each(cargoarray, function(i, item) {
								if (item.OrderCargoID != cargoitem.OrderCargoID
										&& item.CargoTypeID == cargoitem.CargoTypeID
										&& item.HSCode == cargoitem.HSCode) {
									flag = false;
									alert("已有相同的货物");

								}
							});
				}

				if (!flag)
					return;

				$.each(cargoarray, function(i, item) {
					if (item.OrderCargoID == cargoitem.OrderCargoID) {
						$.each(cargoitem, function(k, v) {
									if (v.length == 0) {
										item[k] = "";
									} else {
										item[k] = cargoitem[k];
									}
								});

						item.CargoType = $('input[name="CargoTypeID"]:checked')
								.parent().text().trim();
						item.id = cargoitem["hide_cargoid"];

						var $td = $("#tr_Cargo_" + cargoitem.OrderCargoID)
								.children('td');
						$td
								.eq(0)
								.html("<a href=\"#\" data-toggle=\"modal\" data-target=\"#addCargo\" data-type=\"update\" data-updateid=\""
										+ item.OrderCargoID
										+ "\">"
										+ item.CargoType + "</a>");
						$td.eq(1).html(item.HSCode);
						$td.eq(2).html(item.NameEN);
						$td.eq(3).html(item.NameCN);
						$td.eq(4).html(item.Number);
						$td.eq(5).html(item.Weight);
						$td.eq(6).html(item.Volume);
					}
				});

				localStorage.setItem("cargo", JSON.stringify(cargoarray));
				$("#closeCargoModal").click();

			}
		}
	});

	/**
	 * 收发通动态增加行
	 */
	$("[role='addSCNRows']").click(function() {
		var button = $(this);
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

	});

	$("[role='navbutton']").click(function(event) {
		// $('#SaveOverLay').modal({
		// keyboard : false,
		// show : true
		// });

		var button = $(this);

		var buttontype = $(this).data('savetype') + "";
		if (buttontype == "500203") {

			$("#tempname").val("");
			if (!CheckData())
				return false;

		} else if (buttontype == "500202") {

			var display = $("#tempname").css("display");
			if (display != "none") {
				if ($("#tempname").val().trim().length == 0) {
					alert("请必须输入模板名称");
					$("#tempname").focus();
					return false;
				}
			} else {
				alert("请必须输入模板名称");
				$("#tempname").focus();
				$("#tempname").show();
				return false;
			}

		} else {
			$("#tempname").val("");
		}

		var containerpkgs = null;
		var container = null;
		var cargo = null;
		if (localStorage.getItem("containerpkgs") != null) {
			containerpkgs = JSON.parse(localStorage.getItem("containerpkgs"));
		}
		if (localStorage.getItem("container") != null) {
			container = JSON.parse(localStorage.getItem("container"));
		}
		if (localStorage.getItem("cargo") != null) {
			cargo = JSON.parse(localStorage.getItem("cargo"));
		}
		var postdata = {};

		postdata.createflag = $("#createflag").val();
		postdata.orderid = $("#orderid").val();
		postdata.customerid = $("#customerid").val();
		postdata.savetypeid = $(this).data('savetype') + "";
		postdata.seaexpressloadid = $("#refpolse").val();
		postdata.seaexpressdischargeid = $("#refpodse").val();
		postdata.deliveryid = $("#DeliveryID").val();
		postdata.paytypeid = $("#refpaytypeid").val();
		postdata.contractno = $("#ContractNo").val();
		postdata.transtypeid = $("#TransTypeID").val();
		postdata.salesid = $("#SalesID").val();
		postdata.routelinetransportid = $("#refpot").val();
		postdata.ladingbilltypeid = $('input[name="LadingBillFormType"]:checked')
				.val();
		postdata.hblreason = $("#HBLReason").val();
		postdata.billtypeid = $('input[name="BillType"]:checked').val();
		postdata.originalamount = $("#OriginalAmount").val();
		postdata.duplicateamount = $("#DuplicateAmount").val();
		postdata.takeladingbilltypeid = $('input[name="TakeLadingbillTypeID"]:checked')
				.val();
		postdata.takeladingbilllocationid = $("#TakeLadingbillLocationID")
				.val();
		postdata.manifestamount = $("#ManifestAmount").val();
		postdata.ladingbillamount = $("#LadingbillAmount").val();
		postdata.ladingbillremark = $("#LadingBillRemark").val().trim();
		postdata.specialremark = $("#SpecialRemark").val().trim();
		postdata.remark = $("#tempname").val();

		postdata.customsclearance = $("#CustomsClearance").val();
		postdata.customsinspection = $("#CustomsInspection").val();
		postdata.storageinspection = $("#StorageInspection").val();
		postdata.suffocating = $("#Suffocating").val();
		postdata.reinforcement = $("#Reinforcement").val();
		postdata.photograph = $("#Photograph").val();
		postdata.shrinkwrap = $("#Shrinkwrap").val();
		postdata.unloadingcharges = $("#Unloadingcharges").val();

		if (containerpkgs != null)
			postdata.ordercontainerpkgs = JSON.stringify(containerpkgs);
		else
			postdata.ordercontainerpkgs = {};

		if (container != null)
			postdata.ordercontainer = JSON.stringify(container);
		else
			postdata.ordercontainer = {};

		if (cargo != null)
			postdata.ordercargo = JSON.stringify(cargo);
		else
			postdata.ordercargo = {};

		var servicescategory = [];
		$('input[name="ServicesCategory"]:checked').each(function() {
					servicescategory.push($(this).val())
				})

		postdata.servicescategory = servicescategory.join(',');
		// 获取Shipper内容
		var shipper = {};
		var shippercompanyname = [];
		var shippercompanyaddress = [];
		$('input[name="ShipperCompanyName"]').each(function() {
					shippercompanyname.push($(this).val())
				});
		$('input[name="ShipperCompanyAddress"]').each(function() {
					shippercompanyaddress.push($(this).val())
				});

		shipper.type = "SHIPPER";
		shipper.companyname = shippercompanyname;
		shipper.companyaddress = shippercompanyaddress;
		shipper.tel = $('input[name="ShipperTel"]').val();
		shipper.email = $('input[name="ShipperEmail"]').val();
		shipper.fax = $('input[name="ShipperFax"]').val();
		shipper.postcode = $('input[name="ShipperPostCode"]').val();
		// 获取Consignee内容
		var consignee = {};
		var consigneecompanyname = [];
		var consigneecompanyaddress = [];
		$('input[name="ConsigneeCompanyName"]').each(function() {
					consigneecompanyname.push($(this).val())
				});
		$('input[name="ConsigneeCompanyAddress"]').each(function() {
					consigneecompanyaddress.push($(this).val())
				});

		consignee.type = "CONSIGNEE";
		consignee.companyname = consigneecompanyname;
		consignee.companyaddress = consigneecompanyaddress;
		consignee.tel = $('input[name="ConsigneeTel"]').val();
		consignee.email = $('input[name="ConsigneeEmail"]').val();
		consignee.fax = $('input[name="ConsigneeFax"]').val();
		consignee.postcode = $('input[name="ConsigneePostCode"]').val();

		var notify = {};
		var notifycompanyname = [];
		var notifycompanyaddress = [];
		$('input[name="NotifyCompanyName"]').each(function() {
					notifycompanyname.push($(this).val())
				});
		$('input[name="NotifyCompanyAddress"]').each(function() {
					notifycompanyaddress.push($(this).val())
				});

		notify.type = "NOTIFY";
		notify.companyname = notifycompanyname;
		notify.companyaddress = notifycompanyaddress;
		notify.tel = $('input[name="NotifyTel"]').val();
		notify.email = $('input[name="NotifyEmail"]').val();
		notify.fax = $('input[name="NotifyFax"]').val();
		notify.postcode = $('input[name="NotifyPostCode"]').val();

		var secondnotify = {};
		var secondnotifycompanyname = [];
		var secondnotifycompanyaddress = [];
		$('input[name="SecondNotifyCompanyName"]').each(function() {
					secondnotifycompanyname.push($(this).val())
				});
		$('input[name="SecondNotifyCompanyAddress"]').each(function() {
					secondnotifycompanyaddress.push($(this).val())
				});

		secondnotify.type = "SECONDNOTIFY";
		secondnotify.companyname = secondnotifycompanyname;
		secondnotify.companyaddress = secondnotifycompanyaddress;
		secondnotify.tel = $('input[name="SecondNotifyTel"]').val();
		secondnotify.email = $('input[name="SecondNotifyEmail"]').val();
		secondnotify.fax = $('input[name="SecondNotifyFax"]').val();
		secondnotify.postcode = $('input[name="SecondNotifyPostCode"]').val();

		postdata.shipper = JSON.stringify(shipper);
		postdata.consignee = JSON.stringify(consignee);
		postdata.notify = JSON.stringify(notify);
		postdata.secondnotify = JSON.stringify(secondnotify);

		if (!canSend)
			return false;

		canSend = false;

		$.ajax({
					url : "./save",
					data : postdata,
					type : "post",
					async : false,
					success : function(result) {
						var data = JSON.parse(result);
						if (data.success == true) {
							if (data.msg.substr(0, 1) == '0') {
								localStorage.removeItem("containerpkgs");
								localStorage.removeItem("container");
								localStorage.removeItem("cargo");
								location.href = $.getContextPath()
										+ data.msg.substr(1, data.msg.length);
							} else {
								alert(data.msg.substr(1, data.msg.length));
							}

						} else {
							alert(data.msg);
							canSend = true;
						}
					}

				});

	});

	$('#newSCNmodal').on('show.bs.modal', function(event) {
				var button = $(event.relatedTarget);
				var type = button.data('type');
				var ref = "";
				switch (type) {
					case "Consignee" :
						ref = "新增收货人";
						break;
					case "Shipper" :
						ref = "新增发货人";
						break;
					case "Notify" :
						ref = "新增通知人";
						break;
					case "SecondNotify" :
						ref = "新增第二通知人";
						break;
					default :
						ref = "";
				}

				$.ajax({
							type : "POST",
							url : $.getContextPath()
									+ "/entryorder/loadaddscnmodal",
							data : {
								type : type
							},
							success : function(data) {
								$("#newSCNmodal-body").html(data);
								$("#newSCNmodallabel").text(ref);

							}

						});

			});
	$('#newSCNmodal').on('hide.bs.modal', function(event) {
				$("#newSCNmodal-body").empty();
			});
});

function init() {
	// 提单类型选择代理单时显示代理原因控件
	$("[name='LadingBillFormType']").click(function() {
				if ($(this).val() == '146102') {
					$("#HBLReason").val("");
					$("#HBLReason").show();
				} else {
					$("#HBLReason").val("");
					$("#HBLReason").hide();
				}
			});

	// 出单形式选择正本时显示输入几正几副控件
	$("[name='BillType']").click(function() {
				if ($(this).val() == '112101') {
					$("#Orispan").show();
					$("#OriginalAmount").val("3");
					$("#DuplicateAmount").val("0");
				} else {
					$("#Orispan").hide();
					$("#OriginalAmount").val("");
					$("#DuplicateAmount").val("");
				}
			});

	// 放单地点选择第三地时显示输入放单地点控件
	$("[name='TakeLadingbillTypeID']").click(function() {
				if ($(this).val() == '148103') {
					$("#TakeLadingbillLocationID").val("");
					$("#TakeLadingbillLocationName").val("");
					$("#divTakeLadingbillLocation").show();
				} else {
					$("#TakeLadingbillLocationID").val("");
					$("#TakeLadingbillLocationName").val("");
					$("#divTakeLadingbillLocation").hide();
				}
			});

	$('#Pkgs_Date').datetimepicker({
				format : 'yyyy-mm-dd hh:ii',
				autoclose : true,
				startDate : new Date(),
				initialDate : new Date()
			});

}

function VertifyLocalStorage() {
	if (!window.localStorage) {
		alert('您的浏览器不支持本地存储,请更换火狐、谷歌Chrome、Safari等浏览器');
	}
}

function initContainerPkgs() {
	var containerpkgs = null;
	var containerpkgsarray = new Array();
	if (localStorage.getItem("containerpkgs") != null) {
		containerpkgs = JSON.parse(localStorage.getItem("containerpkgs"));
	}
	if (containerpkgs != null) {
		containerpkgs.sort(SortsASC);
		containerpkgsarray = eval(containerpkgs);
	}

	if (containerpkgsarray.length > 0) {
		$.each(containerpkgsarray, function(i, item) {
			$("#tb_ContainerPkgs")
					.append("<tr id=\"tr_ContainerPkgs_"
							+ item["OrderContainerPkgsID"]
							+ "\"><td><a href=\"#\" data-toggle=\"modal\" data-target=\"#addContainerPkgs\" data-type=\"update\" data-containerpkgtypeid=\""
							+ item["ContainerPkgTypeID"]
							+ "\" data-ordercontainerpkgsid=\""
							+ item["OrderContainerPkgsID"]
							+ "\" data-contact=\""
							+ item["Contact"]
							+ "\" data-tel=\""
							+ item["Tel"]
							+ "\" data-date=\""
							+ item["Date"]
							+ "\" data-traileraddress=\""
							+ item["TrailerAddress"]
							+ "\" data-pkgremark=\""
							+ item["PkgRemark"]
							+ "\" data-url=\""
							+ item["URL"]
							+ "\" data-urlname=\""
							+ item["URLName"]
							+ "\" data-urlnamedownload=\""
							+ item["URLNameDownLoad"]
							+ "\" data-id=\""
							+ item["id"]
							+ "\">"
							+ item["ContainerPkgType"]
							+ "</a></td><td>"
							+ item["Contact"]
							+ "</td><td>"
							+ item["Tel"]
							+ "</td><td>"
							+ item["Date"]
							+ "</td><td>"
							+ item["TrailerAddress"]
							+ "</td><td>"
							+ item["PkgRemark"]
							+ "</td><td><a href=\""
							+ (item["URLNameDownLoad"] == undefined
									? "#"
									: item["URLNameDownLoad"])
							+ "\" >查看</a></td><td><a href=\"#\" name=\"delContainerPkgs\" onclick=\"deleteContainerPkgs(this)\" data-type=\""
							+ item["OrderContainerPkgsID"]
							+ "\">删除</a></td></tr>");
		});
	}

}

function initContainer() {
	var container = null;
	var containerarray = new Array();
	if (localStorage.getItem("container") != null) {
		container = JSON.parse(localStorage.getItem("container"));
	}
	if (container != null) {
		container.sort(SortsASC);
		containerarray = eval(container);
	}

	if (containerarray.length > 0) {
		$.each(containerarray, function(i, containeritem) {
			$("#tb_Container")
					.append("<tr id=\"tr_Container_"
							+ containeritem["OrderContainerID"]
							+ "\"><td><a href=\"#\" data-toggle=\"modal\" data-target=\"#addContainer\" data-type=\"update\" data-ordercontainerid=\""
							+ containeritem["OrderContainerID"]
							+ "\" data-containertypeid=\""
							+ containeritem["ContainerTypeID"]
							+ "\" data-cargotypeid=\""
							+ containeritem["CargoTypeID"]
							+ "\" data-dangerlvlid=\""
							+ containeritem["DangerLvlID"]
							+ "\" data-amount=\""
							+ containeritem["Amount"]
							+ "\" data-issocid=\""
							+ containeritem["IsSocID"]
							+ "\" data-containerpkgtypeid=\""
							+ containeritem["ContainerPkgTypeID"]
							+ "\" data-id=\""
							+ containeritem["id"]
							+ "\">"
							+ containeritem["ContainerType"]
							+ "</a></td><td>"
							+ containeritem["Amount"]
							+ "</td><td>"
							+ containeritem["CargoType"]
							+ "</td><td>"
							+ containeritem["IsSoc"]
							+ "</td><td>"
							+ containeritem["ContainerPkgType"]
							+ "</td><td><a href=\"#\" name=\"delContainer\"  onclick=\"deleteContainer(this)\" data-type=\""
							+ containeritem["OrderContainerID"]
							+ "\">删除</a></td></tr>");
		});
	}

}

function initCargo() {
	var cargo = null;
	var cargoarray = new Array();
	if (localStorage.getItem("cargo") != null) {
		cargo = JSON.parse(localStorage.getItem("cargo"));
	}
	if (cargo != null) {
		cargo.sort(SortsASC);
		cargoarray = eval(cargo);
	}

	if (cargoarray.length > 0) {
		$.each(cargoarray, function(i, cargoitem) {
			$("#tb_Cargo")
					.append("<tr id=\"tr_Cargo_"
							+ cargoitem.OrderCargoID
							+ "\"><td><a href=\"#\" data-toggle=\"modal\" data-target=\"#addCargo\" data-type=\"update\" data-updateid=\""
							+ cargoitem.OrderCargoID
							+ "\">"
							+ cargoitem.CargoType
							+ "</a></td><td>"
							+ cargoitem.HSCode
							+ "</td><td>"
							+ cargoitem.NameEN
							+ "</td><td>"
							+ cargoitem.NameCN
							+ "</td><td>"
							+ cargoitem.Number
							+ "</td><td>"
							+ cargoitem.Weight
							+ "</td><td>"
							+ cargoitem.Volume
							+ "</td><td><a href=\"#\" name=\"delCargo\" onclick=\"deleteCargo(this)\"  data-type=\""
							+ cargoitem.OrderCargoID + "\">删除</a></td></tr>");
		});
	}

}

function initPkgsTypeComponent() {
	var containerpkgs = null;
	var containerpkgsarray = new Array();
	if (localStorage.getItem("containerpkgs") != null) {
		containerpkgs = JSON.parse(localStorage.getItem("containerpkgs"));
	}
	if (containerpkgs != null) {
		containerpkgs.sort(SortsASC);
		containerpkgsarray = eval(containerpkgs);
	}
	$("#Container_ContainerPkgTypeID").empty();
	if (containerpkgsarray.length > 0) {
		$.each(containerpkgsarray, function(i, item) {
					$("#Container_ContainerPkgTypeID")
							.append("<option value=\""
									+ item["OrderContainerPkgsID"] + "\">"
									+ item["ContainerPkgType"] + "</option>");
				});

		$("#Container_ContainerPkgTypeID").attr("disabled", false);
	}
}

function deleteContainerPkgs(obj) {

	var delid = $(obj).data('type');
	var containerpkgs = null;
	var containerpkgsarray = new Array();
	if (localStorage.getItem("containerpkgs") != null) {
		containerpkgs = JSON.parse(localStorage.getItem("containerpkgs"));
	}
	if (containerpkgs != null) {
		containerpkgsarray = eval(containerpkgs);
	}

	if (!CheckContainerBeforeDelPkgs(delid)) {
		alert("删除装箱方式前请先删除其所在箱型");
		return false;
	}

	var index = -1;
	$.each(containerpkgsarray, function(i, item) {
				if (item["OrderContainerPkgsID"] == delid)
					index = i;
			});
	if (index > -1) {
		containerpkgsarray.splice(index, 1);
	}
	localStorage.setItem("containerpkgs", JSON.stringify(containerpkgsarray));
	$("#tr_ContainerPkgs_" + delid).remove();

}

function CheckContainerBeforeDelPkgs(ordercontainerpkgsid) {

	var flag = true;
	var container = null;
	var containerarray = new Array();
	if (localStorage.getItem("container") != null) {
		container = JSON.parse(localStorage.getItem("container"));
	}
	if (container != null) {
		containerarray = eval(container);
	}

	$.each(containerarray, function(i, item) {
				if (item["ContainerPkgTypeID"] == ordercontainerpkgsid)
					flag = false;
			});

	return flag;

}

function deleteContainer(obj) {

	var delid = $(obj).data('type');
	var container = null;
	var containerarray = new Array();
	if (localStorage.getItem("container") != null) {
		container = JSON.parse(localStorage.getItem("container"));
	}
	if (container != null) {
		containerarray = eval(container);
	}
	var index = -1;
	$.each(containerarray, function(i, item) {
				if (item["OrderContainerID"] == delid)
					index = i;
			});
	if (index > -1) {
		containerarray.splice(index, 1);
	}
	localStorage.setItem("container", JSON.stringify(containerarray));
	$("#tr_Container_" + delid).remove();

}

function deleteCargo(obj) {

	var delid = $(obj).data('type');
	var cargo = null;
	var cargoarray = new Array();
	if (localStorage.getItem("cargo") != null) {
		cargo = JSON.parse(localStorage.getItem("cargo"));
	}
	if (cargo != null) {
		cargoarray = eval(cargo);
	}
	var index = -1;
	$.each(cargoarray, function(i, item) {
				if (item["OrderCargoID"] == delid)
					index = i;
			});
	if (index > -1) {
		cargoarray.splice(index, 1);
	}
	localStorage.setItem("cargo", JSON.stringify(cargoarray));
	$("#tr_Cargo_" + delid).remove();

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

function SortsASC(a, b) {
	return a.id - b.id;
}

function SortsDSC(a, b) {
	return b.id - a.id;
}

function GenerateJQueryId() {
	var timestamp = new Date().getTime();
	return "JQ" + timestamp;
}

function Removerow(obj) {
	var prev = $(obj).parent().prev().children().eq(0);
	$(obj).parent().remove();
	SCNPreView(prev);
}

function LoadContainerPkgsStorage() {
	var orderid = $("#orderid").val();
	if (orderid.length > 0) {
		var containerpkgs = null;
		var containerpkgsarray = new Array();
		localStorage.removeItem("containerpkgs");

		$.ajax({
					url : "./loadcontainerpkgsstorage",
					type : "post",
					data : {
						orderid : $("#orderid").val()
					},
					async : false,
					error : function(request) {
						alert("出错了!");
					},
					success : function(data) {
						if (data != null && data.length > 0) {
							var result = JSON.parse(data);
							localStorage.setItem("containerpkgs", JSON
											.stringify(result));
						}
					}
				});
	}
}

function LoadContainerStorage() {
	var orderid = $("#orderid").val();
	if (orderid.length > 0) {

		localStorage.removeItem("container");

		$.ajax({
					url : "./loadcontainerstorage",
					type : "post",
					data : {
						orderid : $("#orderid").val()
					},
					async : false,
					error : function(request) {
						alert("出错了!");
					},
					success : function(data) {
						if (data != null && data.length > 0) {
							var result = JSON.parse(data);
							localStorage.setItem("container", JSON
											.stringify(result));
						}
					}
				});
	}
}

function LoadCargoStorage() {
	var orderid = $("#orderid").val();
	if (orderid.length > 0) {

		localStorage.removeItem("cargo");

		$.ajax({
					url : "./loadcargostorage",
					type : "post",
					data : {
						orderid : $("#orderid").val()
					},
					async : false,
					error : function(request) {
						alert("出错了!");
					},
					success : function(data) {
						if (data != null && data.length > 0) {
							var result = JSON.parse(data);
							localStorage.setItem("cargo", JSON
											.stringify(result));
						}
					}
				});
	}
}

function LoadSCN(str) {
	var COMPANYNAME = "500301";
	var COMPANYADDRESS = "500302";
	var TEL = "500303";
	var EMAIL = "500304";
	var FAX = "500305";
	var POSTCODE = "500306";
	var ref = "";
	var orderid = $("#orderid").val();
	if (orderid.length > 0) {
		$.ajax({
			url : "./loadscn",
			type : "post",
			data : {
				orderid : $("#orderid").val(),
				scnid : str
			},
			error : function(request) {
				alert("发货人加载失败");
			},
			success : function(data) {
				if (data != null && data.length > 0) {
					var result = JSON.parse(data);
					$.each(result, function(i, item) {

						switch (item.SCNID) {
							case "104101" :
								ref = "Consignee";
								break;
							case "104102" :
								ref = "Shipper";
								break;
							case "104103" :
								ref = "Notify";
								break;
							case "104104" :
								ref = "SecondNotify";
								break;
							default :
								ref = "";
						}
						if (ref.length > 0) {
							if (item.SCNTypeID == COMPANYNAME) {
								if (item.Seqno == 1)
									$("input[name='" + ref
											+ "CompanyName'][seqno='1']")
											.val(item.Content);
								else {

									var lastrow = $("ul[for='" + ref
											+ "CompanyName'] li:first");
									var lastclone = lastrow.clone();
									var removebtn = "<a href=\"#\" onclick=\"Removerow(this)\">删除</a>";
									lastclone.children().eq(0).attr("value",
											item.Content);
									lastclone.children().eq(0).attr("seqno",
											item.Seqno);
									$("ul[for='" + ref + "CompanyName']")
											.append("<li>" + lastclone.html()
													+ removebtn + "</li>");
								}

							} else if (item.SCNTypeID == COMPANYADDRESS) {
								if (item.Seqno == 1)
									$("input[name='" + ref
											+ "CompanyAddress'][seqno='1']")
											.val(item.Content);
								else {
									var lastrow = $("ul[for='" + ref
											+ "CompanyAddress'] li:first");
									var lastclone = lastrow.clone();
									var removebtn = "<a href=\"#\" onclick=\"Removerow(this)\">删除</a>";
									lastclone.children().eq(0).attr("value",
											item.Content);
									lastclone.children().eq(0).attr("seqno",
											item.Seqno);
									$("ul[for='" + ref + "CompanyAddress']")
											.append("<li>" + lastclone.html()
													+ removebtn + "</li>");
								}

							} else if (item.SCNTypeID == TEL) {
								$("input[name='" + ref + "Tel']")
										.val(item.Content);
							} else if (item.SCNTypeID == EMAIL) {
								$("input[name='" + ref + "Email']")
										.val(item.Content);
							} else if (item.SCNTypeID == FAX) {
								$("input[name='" + ref + "Fax']")
										.val(item.Content);
							} else if (item.SCNTypeID == POSTCODE) {
								$("input[name='" + ref + "PostCode']")
										.val(item.Content);
							}
						}

					});

					if (ref != "")
						SCNPreView($("input[name='" + ref
								+ "CompanyName'][seqno='1']"));

				}
			}
		});
	}
}

function CheckData() {
	var result = true;
	var ladingbilltypeid = $('input[name="LadingBillFormType"]:checked').val();
	var billtypeid = $('input[name="BillType"]:checked').val();
	var takeladingbilltypeid = $('input[name="TakeLadingbillTypeID"]:checked')
			.val();
	if (ladingbilltypeid != undefined) {
		if (ladingbilltypeid == '146102') {
			if ($("#HBLReason").val().length == 0) {
				alert("请填写代理单原因");
				return result = false;
			}
		}
	} else {
		alert("请选择提单类型");
		return result = false;
	}

	if ($("#TransTypeID").val() == "") {
		alert("请选择运输条款");
		return result = false;
	}

	if ($("#SalesID").val() == "") {
		alert("请选择销售人员");
		return result = false;
	}

	if ($("#ContractNo").val() != undefined) {
		if ($("#ContractNo").val().trim().length == 0) {
			alert("请输入约号");
			return result = false;
		}
	}

	if (billtypeid != undefined) {
		if (billtypeid == '112101') {
			if ($("#OriginalAmount").val().length == 0) {
				alert("请填写正本数");
				return result = false;
			}
			if ($("#DuplicateAmount").val().length == 0) {
				alert("请填写副本数");
				return result = false;
			}
		}
	} else {
		alert("请选择出单形式");
		return result = false;
	}

	if ($("#ManifestAmount").val() == "") {
		alert("请输入舱单数");
		return result = false;
	}
	if ($("#LadingbillAmount").val() == "") {
		alert("请输入提单数");
		return result = false;
	}
	if (takeladingbilltypeid != undefined) {
		if (takeladingbilltypeid == '148103') {
			if ($("#TakeLadingbillLocationID").val().length == 0
					|| $("#TakeLadingbillLocationName").val().trim().length == 0) {
				alert("请填写放单地点");
				return result = false;
			}
		}
	} else {
		alert("请选择放单地点");
		return result = false;
	}

	if (localStorage.getItem("containerpkgs") == null) {
		alert("请录入装箱方式");
		return result = false;
	} else {
		var containerpkgs = JSON.parse(localStorage.getItem("containerpkgs"));
		if (containerpkgs.length == 0) {
			alert("请录入装箱方式");
			return result = false;
		}
	}
	if (localStorage.getItem("container") == null) {
		alert("请录入箱型箱量");
		return result = false;
	} else {
		var container = JSON.parse(localStorage.getItem("container"));
		if (container.length == 0) {
			alert("请录入箱型箱量");
			return result = false;
		}
	}
	if (localStorage.getItem("cargo") == null) {
		alert("请录入货物信息");
		return result = false;
	} else {
		var cargo = JSON.parse(localStorage.getItem("cargo"));
		if (cargo.length == 0) {
			alert("请录入货物信息");
			return result = false;
		}
	}

	if ($("input[name='ShipperCompanyName'][seqno='1']").val().trim() == 0) {
		alert("请录入发货人公司名称");
		return result = false;
	}
	if ($("input[name='ConsigneeCompanyName'][seqno='1']").val().trim() == 0) {
		alert("请录入收货人公司名称");
		return result = false;
	}
	if ($("input[name='NotifyCompanyName'][seqno='1']").val().trim() == 0) {
		alert("请录入通知人公司名称");
		return result = false;
	}

	if (!CheckSCNValidity('Shipper')) {
		alert("发货人中有非英文字符，请修改");
		return result = false;
	}
	if (!CheckSCNValidity('Consignee')) {
		alert("收货人中有非英文字符，请修改");
		return result = false;
	}
	if (!CheckSCNValidity('Notify')) {
		alert("通知人中有非英文字符，请修改");
		return result = false;
	}
	if (!CheckSCNValidity('SecondNotify')) {
		alert("第二通知人中有非英文字符，请修改");
		return result = false;
	}
	if (!doCheckSCNSubmit(document.getElementById("LadingBillRemark"), 30, 0)) {
		alert("需在提单显示的特殊内容有非英文字符，请修改");
		return result = false;
	}

	return result;

}

function PkgsUpload() {
	var val = $("#PkgsFileUpload").val();
	if (val == null || val == "") {
		alert("请选择上传装箱文件");
		return;
	}

	$.ajaxFileUpload({

				url : $.getContextPath() + "/packingorder/uploadpkgsfile",
				secureuri : false,
				fileElementId : "PkgsFileUpload",// file控件id
				dataType : "json",
				success : function(data) {
					$("#Pkgs_URL").val(data.fileurl);
					$("#Pkgs_URLName").text(data.oldfilename);
					$("#Pkgs_URLName").attr(
							"href",
							"/packingorder/downloadLbFile/" + data.dirname
									+ "/" + encodeURI(encodeURI(data.filename))
									+ "/" + data.suffix);
					var html = document.getElementById('uploadPkgsSpan').innerHTML;
					document.getElementById('uploadPkgsSpan').innerHTML = html;
				},
				error : function(data, status, e) {
					alert(e);
				}
			});
}

function CheckContainerBeforeAddCargo(cargotypeid) {
	var flag = false;
	var WXP = "109103";// 危险品
	var LCWXP = "109105";// 冷藏危险品
	var TZXH = "109106";// 特种箱货
	var LH = "109104";// 冷藏品
	var container = null;
	var containerarray = new Array();
	if (localStorage.getItem("container") != null) {
		container = JSON.parse(localStorage.getItem("container"));
	}
	if (container != null) {
		containerarray = eval(container);
	}
	if (containerarray.length == 0) {
		alert("请先添加箱子");
		return flag = false;
	}
	if (cargotypeid == WXP) {
		$.each(containerarray, function(i, item) {
					if (item["CargoTypeID"] == WXP
							|| item["CargoTypeID"] == LCWXP)
						flag = true;
				});

		if (flag != true) {
			alert("请先选择危险品箱型");
			return flag = false;
		}
	} else if (cargotypeid == LCWXP) {
		$.each(containerarray, function(i, item) {
					if (item["CargoTypeID"] == LCWXP)
						flag = true;
				});

		if (flag != true) {
			alert("请先选择冷藏危险品箱型");
			return flag = false;
		}
	} else if (cargotypeid == LH) {
		$.each(containerarray, function(i, item) {
					if (item["CargoTypeID"] == LCWXP
							|| item["CargoTypeID"] == LH)
						flag = true;
				});

		if (flag != true) {
			alert("请先选择冷藏品箱型");
			return flag = false;
		}
	}

	else if (cargotypeid == TZXH) {
		$.each(containerarray, function(i, item) {
					if (item["CargoTypeID"] == TZXH)
						flag = true;
				});

		if (flag != true) {
			alert("请先选择特种箱型");
			return flag = false;
		}
	} else {
		flag = true;

	}
	return flag;
}

function setLadingExpressAddress(text, value, obj) {

	$.ajax({
				type : "POST",
				url : $.getContextPath()
						+ "/entryorder/getcustomerexpressaddress",
				data : {
					id : value
				},
				success : function(data) {
					var result = JSON.parse(data);
					if (result != null) {
						$("#LadingBill_CompanyName").val(result.CompanyName);
						$("#LadingBill_Contactor").val(result.Contactor);
						$("#LadingBill_Address").val(result.Address);
						$("#LadingBill_Country").val(result.Country);
						$("#LadingBill_Mobile").val(result.Mobile);
						$("#LadingBill_Tel").val(result.Tel);
						$("#LadingBill_Areacode").val(result.Areacode);
					}
				}

			});

}

function CallBackSCNContent(text, value, obj) {
	eventdiv = $(obj).closest("div[role='searchscn_div']");
	var COMPANYNAME = "500301";
	var COMPANYADDRESS = "500302";
	var TEL = "500303";
	var EMAIL = "500304";
	var FAX = "500305";
	var POSTCODE = "500306";
	var ref = "";
	var eventid = eventdiv.attr("id");
	if (eventid.indexOf("shipper") > 0)
		ref = "Shipper";
	else if (eventid.indexOf("consignee") > 0)
		ref = "Consignee";
	else if (eventid.indexOf("notify") > 0)
		ref = "Notify";
	else if (eventid.indexOf("second") > 0)
		ref = "SecondNotify";

	$.ajax({
		type : "POST",
		url : $.getContextPath() + "/entryorder/getcustomerscn",
		data : {
			groupid : value
		},
		success : function(data) {
			var result = JSON.parse(data);
			$.each(result, function(i, item) {

				if (ref.length > 0) {
					if (item.SCNTypeID == COMPANYNAME) {
						if (item.Seqno == '1')
							$("input[name='" + ref + "CompanyName'][seqno='1']")
									.val(item.Content);
						else {

							if ($("input[name='" + ref
									+ "CompanyName'][seqno='" + item.Seqno
									+ "']").length > 0) {
								$("input[name='" + ref
										+ "CompanyName'][seqno='" + item.Seqno
										+ "']").val(item.Content);
							} else {
								var lastrow = $("ul[for='" + ref
										+ "CompanyName'] li:first");
								var lastclone = lastrow.clone();
								var removebtn = "<a href=\"#\" onclick=\"Removerow(this)\">删除</a>";
								lastclone.children().eq(0).attr("value",
										item.Content);
								lastclone.children().eq(0).attr("seqno",
										item.Seqno);
								$("ul[for='" + ref + "CompanyName']")
										.append("<li>" + lastclone.html()
												+ removebtn + "</li>");
							}
						}

					} else if (item.SCNTypeID == COMPANYADDRESS) {
						if (item.Seqno == 1)
							$("input[name='" + ref
									+ "CompanyAddress'][seqno='1']")
									.val(item.Content);
						else {

							if ($("input[name='" + ref
									+ "CompanyAddress'][seqno='" + item.Seqno
									+ "']").length > 0) {
								$("input[name='" + ref
										+ "CompanyAddress'][seqno='"
										+ item.Seqno + "']").val(item.Content);
							} else {
								var lastrow = $("ul[for='" + ref
										+ "CompanyAddress'] li:first");
								var lastclone = lastrow.clone();
								var removebtn = "<a href=\"#\" onclick=\"Removerow(this)\">删除</a>";
								lastclone.children().eq(0).attr("value",
										item.Content);
								lastclone.children().eq(0).attr("seqno",
										item.Seqno);
								$("ul[for='" + ref + "CompanyAddress']")
										.append("<li>" + lastclone.html()
												+ removebtn + "</li>");
							}
						}

					} else if (item.SCNTypeID == TEL) {
						$("input[name='" + ref + "Tel']").val(item.Content);
					} else if (item.SCNTypeID == EMAIL) {
						$("input[name='" + ref + "Email']").val(item.Content);
					} else if (item.SCNTypeID == FAX) {
						$("input[name='" + ref + "Fax']").val(item.Content);
					} else if (item.SCNTypeID == POSTCODE) {
						$("input[name='" + ref + "PostCode']")
								.val(item.Content);
					}
				}

				if (ref != "")
					SCNPreView($("input[name='" + ref
							+ "CompanyName'][seqno='1']"));

			});
			eventdiv.find('input').each(function(i, item) {
						item.value = "";
					});
		}
	});

}

function setInvoiceExpressAddress(text, value, obj) {

	$.ajax({
				type : "POST",
				url : $.getContextPath()
						+ "/entryorder/getcustomerexpressaddress",
				data : {
					id : value
				},
				success : function(data) {
					var result = JSON.parse(data);
					if (result != null) {
						$("#Invoice_CompanyName").val(result.CompanyName);
						$("#Invoice_Contactor").val(result.Contactor);
						$("#Invoice_Address").val(result.Address);
						$("#Invoice_Country").val(result.Country);
						$("#Invoice_Mobile").val(result.Mobile);
						$("#Invoice_Tel").val(result.Tel);
						$("#Invoice_Areacode").val(result.Areacode);
					}
				}

			});

}

function CheckSCNValidity(type) {
	var result = true;
	var name = "input[data-type='" + type + "']";
	$(name).each(function(i, item) {

				var isvalid = item.checkValidity();
				if (!isvalid) {
					result = false;
					return false;
				}
			});

	return result;
}

// 校验textarea

function checkLen(linestr, len) {
	if (linestr.length > len) {
		return true;
	} else {
		return false;
	}
}

function getIndexNum(linestr, len) {
	if (linestr.length > len) {
		// 超长
		var lastsplit = linestr.lastIndexOf(" ");
		var lastsplit1 = linestr.lastIndexOf(",");
		var lastsplit2 = linestr.lastIndexOf(".");
		var lastsplit3 = linestr.lastIndexOf("[");
		var lastsplit4 = linestr.lastIndexOf("]");
		var lastsplit5 = linestr.lastIndexOf("{");
		var lastsplit6 = linestr.lastIndexOf("}");
		if (lastsplit1 > lastsplit) {
			lastsplit = lastsplit1;
		}
		if (lastsplit2 > lastsplit) {
			lastsplit = lastsplit2;
		}
		if (lastsplit3 > lastsplit) {
			lastsplit = lastsplit3;
		}
		if (lastsplit4 > lastsplit) {
			lastsplit = lastsplit4;
		}
		if (lastsplit5 > lastsplit) {
			lastsplit = lastsplit5;
		}
		if (lastsplit6 > lastsplit) {
			lastsplit = lastsplit6;
		}

		if (lastsplit > 0) {
			temp = linestr.substr(0, lastsplit);
			if (checkLen(temp, len)) {
				return getIndexNum(temp, len);
			} else {
				return temp.length;
			}
		} else {
			return linestr.length;
		}
	} else {
		return linestr.length;
	}
}

function changeLine(lineinfo, len, spec) {
	var retstr = "";
	tempstr = lineinfo;
	do {
		if (spec != null && spec > 0) {
			ret = getIndexNum(tempstr, len - spec);
			spec = 0;
		} else {
			ret = getIndexNum(tempstr, len);
		}
		if (ret > 0) {
			retstr = retstr + tempstr.substr(0, ret) + "\n";
			tempstr = tempstr.substr(ret);
		}
	} while (tempstr.length > 0)

	return retstr;
}

function doChangeStyleFirst(content, len) {
	var dst = '';
	// 默认每行35字符
	if (len == null || len <= 0) {
		len = 35;
	}
	var contents = content.value.split("\n");
	for (var i = 0; i < contents.length; i++) {
		if (contents[i].length > len) {
			dst = dst + changeLine(contents[i], len);
		} else if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '') {

		} else {
			dst = dst + contents[i] + "\n";
		}
	}
	var lastline = dst.lastIndexOf("\n");
	dst = dst.substr(0, lastline);
	content.value = dst;

	contents = dst.split("\n");
	var retstr = "";
	for (var i = 0; i < contents.length; i++) {
		if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '') {
			continue;
		} else {
			retstr = retstr + contents[i].replace(/(^\s*)|(\s*$)/g, "");
		}
		if (i < contents.length - 1) {
			retstr = retstr + "\n";
		}
	}
	content.value = retstr;
}

function doCheckSCN(content, len, spec) {
	var dst = '';
	// 默认每行35字符
	if (len == null || len <= 0) {
		len = 35;
	}
	// 首次排序，不检查特殊字符
	doChangeStyleFirst(content, len);
	var contents = content.value.split("\n");
	for (var i = 0; i < contents.length; i++) {
		if (i == 4) {
			templen = len - spec;
		} else {
			templen = len;
		}
		if (contents[i].length > templen) {
			if (i == 4) {
				dst = dst + changeLine(contents[i], len - spec, spec);
			} else {
				dst = dst + changeLine(contents[i], len);
			}

		} else if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '') {

		} else {
			dst = dst + contents[i] + "\n";
		}
	}
	var lastline = dst.lastIndexOf("\n");
	dst = dst.substr(0, lastline);
	content.value = dst;

	contents = dst.split("\n");
	var retstr = "";
	for (var i = 0; i < contents.length; i++) {
		if (contents[i].length > len) {
			alert("此行数据超长：" + contents[i]);
		}
		if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '') {
			continue;
		} else {
			retstr = retstr + contents[i].replace(/(^\s*)|(\s*$)/g, "");
		}
		if (i < contents.length - 1) {
			retstr = retstr + "\n";
		}
	}
	content.value = retstr;

	var chs = dst.match(/[^\x00-\x7f]+/g);
	if (chs != null && chs != '') {
		alert("包含非法字符：" + chs);
		return;
	}
	chs = dst.match(/[\x5c]+/g);
	if (chs != null && chs != '') {
		alert("包含非法字符：" + chs);
		return;
	}
	chs = dst.match(/[\x09]+/g);
	if (chs != null && chs != '') {
		alert("包含非法字符：" + chs);
		return;
	}

}

// 提交
function doCheckSCNSubmit(content, len, spec) {
	var dst = '';
	var isSuccess = true;
	// 默认每行35字符
	if (len == null || len <= 0) {
		len = 35;
	}
	// 首次排序，不检查特殊字符
	doChangeStyleFirst(content, len);
	var contents = content.value.split("\n");
	for (var i = 0; i < contents.length; i++) {
		if (i == 4) {
			templen = len - spec;
		} else {
			templen = len;
		}
		if (contents[i].length > templen) {
			if (i == 4) {
				dst = dst + changeLine(contents[i], len - spec, spec);
			} else {
				dst = dst + changeLine(contents[i], len);
			}

		} else if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '') {

		} else {
			dst = dst + contents[i] + "\n";
		}
	}
	var lastline = dst.lastIndexOf("\n");
	dst = dst.substr(0, lastline);
	content.value = dst;

	contents = dst.split("\n");
	var retstr = "";
	for (var i = 0; i < contents.length; i++) {
		if (contents[i].length > len) {
			isSuccess = false;
		}
		if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '') {
			continue;
		} else {
			retstr = retstr + contents[i].replace(/(^\s*)|(\s*$)/g, "");
		}
		if (i < contents.length - 1) {
			retstr = retstr + "\n";
		}
	}
	content.value = retstr;

	var chs = dst.match(/[^\x00-\x7f]+/g);
	if (chs != null && chs != '') {
		isSuccess = false;
	}
	chs = dst.match(/[\x5c]+/g);
	if (chs != null && chs != '') {
		isSuccess = false;
	}
	chs = dst.match(/[\x09]+/g);
	if (chs != null && chs != '') {
		isSuccess = false;
	}

	return isSuccess;
}



$(document).keydown(function(e) {
			e = e ? e : (window.event ? window.event : null);
			var keycode;
			if (navigator.appName == "Microsoft Internet Explorer") {
				keycode = event.keyCode;
			} else {
				keycode = e.which;
			}
			/*
			 * if (keycode == 9) { e.preventDefault(); }
			 */
			if (e.altKey && keycode == 192) {
				$("#home-tab").click();
			} else if (e.altKey && keycode == 49) {
				$("#tab1").click();
			} else if (e.altKey && keycode == 50) {
				$("#tab2").click();
			} else if (e.altKey && keycode == 51) {
				$("#tab3").click();
			} else if (e.altKey && keycode == 52) {
				$("#tab4").click();
			} else if (e.altKey && keycode == 53) {
				$("#tab5").click();
			} else if (e.altKey && keycode == 54) {
				$("#tab6").click();
			} else if (e.altKey && keycode == 55) {
				$("#tab7").click();
			} else if (e.altKey && keycode == 56) {
				$("#tab8").click();
			} else if (e.altKey && keycode == 57) {
				$("#tab9").click();
			} else if (e.altKey && keycode == 48) {
				$("#tab10").click();
			}

		});