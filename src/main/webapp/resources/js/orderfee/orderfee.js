$(function() {
	$('[data-toggle="popover"]').popover();
	/**
	 * 只读模式转为编辑模式
	 */
	function readToEdit(currtext,modifyitem,feetype)
	{
		var count = $(modifyitem).eq(1).find("#mod_currencyid  option").length;
		for (var i = 0; i < count; i++) {
			if ($(modifyitem).eq(1).find("#mod_currencyid").get(0).options[i].text == currtext.eq(1).text()) {
				$(modifyitem).eq(1).find("#mod_currencyid").get(0).selectedIndex = i;
				break;
			}
		}
		$(modifyitem).closest("tr").attr("mod_currencyid",currtext.eq(1).text());
		count = $(modifyitem).eq(2).find("#mod_feetypeid  option").length;
		for (var i = 0; i < count; i++) {
			if ($(modifyitem).eq(2).find("#mod_feetypeid").get(0).options[i].text == currtext.eq(2).html()) {
				$(modifyitem).eq(2).find("#mod_feetypeid").get(0).selectedIndex = i;
				break;
			}
		}
		$(modifyitem).closest("tr").attr("mod_feetypeid",currtext.eq(2).text());
		count = $(modifyitem).eq(3).find("#mod_unitid  option").length;
		for (var i = 0; i < count; i++) {
			if ($(modifyitem).eq(3).find("#mod_unitid").get(0).options[i].text == currtext.eq(3).html()) {
				$(modifyitem).eq(3).find("#mod_unitid").get(0).selectedIndex = i;
				break;
			}
		}
		$(modifyitem).closest("tr").attr("mod_unitid",currtext.eq(3).text());
		$(modifyitem).eq(4).find("#mod_price").val(currtext.eq(4).html());
		$(modifyitem).closest("tr").attr("mod_price",currtext.eq(4).text());
		if(feetype=='payfeeitemlist')
		{
			$(modifyitem).eq(5).find("#mod_costprice").val(currtext.eq(5).html());
			$(modifyitem).closest("tr").attr("mod_costprice",currtext.eq(5).text());
			$(modifyitem).eq(6).find("#mod_amount").val(currtext.eq(6).html());
			$(modifyitem).closest("tr").attr("mod_amount",currtext.eq(6).text());
			$(modifyitem).eq(8).find("#mod_praccountsid").val(currtext.eq(8).html());
			$(modifyitem).closest("tr").attr("mod_praccountsid",currtext.eq(8).text());
			$(modifyitem).closest("tr").attr("staffname",currtext.eq(9).text());
			$(modifyitem).closest("tr").attr("updatetime",currtext.eq(10).text());
			$(modifyitem).closest("tr").attr("statename",currtext.eq(12).text());
		}else if(feetype=='receivefeeitemlist'){
			$(modifyitem).eq(5).find("#mod_amount").val(currtext.eq(5).html());
			$(modifyitem).closest("tr").attr("mod_amount",currtext.eq(5).text());
			$(modifyitem).eq(7).find("#mod_praccountsid").val(currtext.eq(7).html());
			$(modifyitem).closest("tr").attr("mod_praccountsid",currtext.eq(7).text());
			$(modifyitem).closest("tr").attr("staffname",currtext.eq(8).text());
			$(modifyitem).closest("tr").attr("updatetime",currtext.eq(9).text());
			$(modifyitem).closest("tr").attr("statename",currtext.eq(11).text());
		}
		
		$(modifyitem).closest("tr").attr("orderfeeid",currtext.closest("tr").attr("orderfeeid"));
		$(modifyitem).closest("tr").attr("flag",currtext.closest("tr").attr("flag"));
		
	}
	/**
	 * 编辑模式转为只读模式
	 */
	function editToRead(modifyitem,currtext,feetype)
	{
		$(currtext).closest("tr").attr("orderfeeid",$(modifyitem).closest("tr").attr("orderfeeid"));
		$(currtext).closest("tr").attr("flag",$(modifyitem).closest("tr").attr("flag"));
		$(currtext).eq(0).find("checkbox").attr("state",$(modifyitem).closest("tr").attr("state"));
		$(currtext).eq(1).text($(modifyitem).attr("mod_currencyid"));
		$(currtext).eq(2).text($(modifyitem).attr("mod_feetypeid"));
		$(currtext).eq(3).text($(modifyitem).attr("mod_unitid"));
		$(currtext).eq(4).text($(modifyitem).attr("mod_price"));
		if(feetype=='payfeeitemlist')
		{
			$(currtext).eq(5).text($(modifyitem).attr("mod_costprice"));
			$(currtext).eq(6).text($(modifyitem).attr("mod_amount"));
			$(currtext).eq(7).text($(modifyitem).attr("mod_price")*$(modifyitem).attr("mod_amount"));
			$(currtext).eq(8).text($(modifyitem).attr("mod_praccountsid"));
			$(currtext).eq(9).text($(modifyitem).attr("staffname"));
			$(currtext).eq(10).text($(modifyitem).attr("updatetime"));
			$(currtext).eq(12).text($(modifyitem).attr("statename"));
		}else if(feetype=='receivefeeitemlist'){
			$(currtext).eq(5).text($(modifyitem).attr("mod_amount"));
			$(currtext).eq(6).text($(modifyitem).attr("mod_price")*$(modifyitem).attr("mod_amount"));
			$(currtext).eq(7).text($(modifyitem).attr("mod_praccountsid"));
			$(currtext).eq(8).text($(modifyitem).attr("staffname"));
			$(currtext).eq(9).text($(modifyitem).attr("updatetime"));
			$(currtext).eq(11).text($(modifyitem).attr("statename"));
		}
		
	}
	/**
	 * 保存成功转为只读
	 */
	function SaveToRead(modifyitem,obj,list)
	{
		if(list=='payfeeitemlist')
		{
			$('#'+list+" tbody").prepend("<tr state='toread'><td><input type='checkbox'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
		}else if(list=='receivefeeitemlist'){
			$('#'+list+" tbody").prepend("<tr state='toread'><td><input type='checkbox'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
		}
		var currtext = $('#'+list).find("tr[state=toread]").children("td");
		
		$(currtext).closest("tr").attr("orderfeeid",$(modifyitem).closest("tr").attr("orderfeeid"));
		$(currtext).closest("tr").attr("flag",obj.orderfeestatusid);
		
		$(currtext).eq(0).html("<input type='checkbox'>");
		$(currtext).eq(1).text(obj.currencyname);
		$(currtext).eq(2).text(obj.feetype);
		$(currtext).eq(3).text(obj.unit);
		$(currtext).eq(4).text(obj.price);
		
		if(list=='payfeeitemlist')
		{
			$(currtext).eq(5).text(obj.costprice);
			$(currtext).eq(6).text(obj.amount);
			$(currtext).eq(7).text(obj.count);
			$(currtext).eq(8).text(obj.praccountsid);
			$(currtext).eq(9).text(obj.updatestaffname);
			$(currtext).eq(10).text(obj.createtime);
			$(currtext).eq(12).text("未确认");
		}else if(list=='receivefeeitemlist'){
			$(currtext).eq(5).text(obj.amount);
			$(currtext).eq(6).text(obj.count);
			$(currtext).eq(7).text(obj.praccountsid);
			$(currtext).eq(8).text(obj.updatestaffname);
			$(currtext).eq(9).text(obj.createtime);
			$(currtext).eq(11).text("未确认");
		}
		
		$(currtext).closest("tr").attr("state","updateed");
		$(currtext).closest("tr").addClass("danger");
		$(modifyitem).remove();
	}
	/**
	 * 开始编辑
	 */
	function modifyfeeprimaryfn(list)
	{
		$("#"+list).find("tbody tr[state='inupdate']").remove();
		$('#'+list).find("tr td input[type='checkbox']:checked").each(function(){
			if($(this).closest("tr").attr("flag")=='188001')
			{
				var currtext =$(this).closest("tr").children("td");
				if(list=='receivefeeitemlist')
				{
					$("#"+list).find("tbody").prepend($("#modifyfeeitem tbody").html());
				}else if(list=='payfeeitemlist')
				{
					$("#"+list).find("tbody").prepend($("#modifypayfeeitem tbody").html());
				}
				
				var modifyitem = $("#"+list).find("tbody tr[state='inupdate']").children("td");
				readToEdit(currtext,modifyitem,list);
				$(modifyitem).eq(0).find("#removemodifyfeebtn").attr("listname",list);
				$(modifyitem).closest("tr").attr("state","update");
				//alert($(this).attr("orderfeeid")+"修改");
				$(modifyitem).eq(0).find("#removemodifyfeebtn").click(function(){
					removemodifyfeebtn($(this),$(this).attr("listname"));
				});
			}
		});
		$('#'+list).find("tr td input[type='checkbox']:checked").each(function(){
			$(this).closest("tr").remove();
		});
		$("#"+list).find("tbody").prepend($("#modifyfeeitem tbody").html());
		$("#"+list).find("tbody tr[state='inupdate']").hide();
		if($("#"+list).find("tbody tr[state='update']").length>0)
		{
			$("#"+list).closest("section").find("#modifySaveprimary").show();
		}
		return true;
	}
	/**
	 * 移除编辑
	 */
	function removemodifyfeebtn(line,list)
	{
		if(list=='receivefeeitemlist')
		{
			$('#'+list).prepend("<tr state='toread'><td><input type='checkbox'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
		}else if(list=='payfeeitemlist'){
			$('#'+list).prepend("<tr state='toread'><td><input type='checkbox'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
		}
		
		editToRead($(line).closest("tr"),$('#'+list).find("tr[state=toread]").children("td"),list);
		$('#'+list).find("tr[state=toread]").removeAttr("state");
		$(line).closest("tr").remove();
		
		orderfeeinit();
	}
	/**
	 * 开始编辑按钮监听
	 */
	$("section").find("#modifyfeeprimary").click(function(){
		modifyfeeprimaryfn($(this).attr("listname"));
	});
	
	/**
	 * 获取待修改内容json
	 */
	function getJsonFromEdit(list,state)
	{
		var data = new Array();
		var rowid = 0;
		$("#"+list+" tbody tr[state='"+state+"']").each(function(){
			if($(this).children("td").eq(2).find("[id$='_feetypeid']").val() == "")
			{
				alert("费用名称不能为空");
				$(this).children("td").eq(2).find("[id$='_feetypeid']").focus();
				return false;
			}
			if($(this).children("td").eq(3).find("[id$='_unitid']").val() == "")
			{
				alert("计费单位不能为空");
				$(this).children("td").eq(3).find("[id$='_unitid']").focus();
				return false;
			}
			if($(this).children("td").eq(4).find("[id$='_price']").val() == "")
			{
				alert("单价不能为空");
				$(this).children("td").eq(4).find("[id$='_price']").focus();
				return false;
			}
			if($(this).find("[id$='_amount']").val() == "")
			{
				alert("数量不能为空");
				$(this).find("[id$='_amount']").focus();
				return false;
			}
			if($(this).find("[id$='_praccountsid']").val() == "")
			{
				alert("单位名称不能为空");
				$(this).find("[id$='_praccountsid']").focus();
				return false;
			}
			var comment={};

			comment.currencyid = $(this).children("td").eq(1).find("[id$='_currencyid']").val();
			comment.feetypeid = $(this).children("td").eq(2).find("[id$='_feetypeid']").val();
			comment.unitid = $(this).children("td").eq(3).find("[id$='_unitid']").val();
			comment.price = $(this).children("td").eq(4).find("[id$='_price']").val();
			comment.amount = $(this).find("[id$='_amount']").val();
			comment.praccountsid = $(this).find("[id$='_praccountsid']").val();
			comment.costprice = $(this).find("[id$='_costprice']").val();
				
			if(state=="update")
			{
				comment.orderfeeid = $(this).attr("orderfeeid");
				$(this).attr("state","updateing");
			}else{
				$(this).attr("state","inserting");
			}
			
			data[rowid]=comment;
			rowid++;
		});
		var jsondata = $.toJSON(data);
		return jsondata;
	}
	/**
	 * 保存修改内容按钮监听
	 */
	$("section").find("#modifySaveprimary").click(function(){
		var list = $(this).attr("listname");
		var paytypeid = $(this).attr("paytypeid");
		var jsondata = getJsonFromEdit(list,'update');
		if(jsondata!='[]')
		{
			$.post(
					$.getContextPath()
							+ "/orderfee/saveFeeItem",
							'data='+jsondata+'&orderid='+$("#add_orderid").val()+"&paytypeid="+paytypeid,
					function(result) {
						var obj = jQuery.parseJSON(result);
						if(obj.resultflag)
						{
							var rowid=0;
							$("#"+list+" tbody").find("tr[state='updateing']").each(function(){
								SaveToRead($(this),obj.resultlist[rowid],list);
								rowid++;
							});
							
							$('#receiveSaveFee').unbind("click");
							$("#receiveSaveFee").hide();
							orderfeeinit();
						}
					});
		}
	});
	/**
	 * 按钮状态重置
	 */
	function btninit(btn)
	{
		if($("#tbody").find("tr[state='insert']").length>0)
		{
			$("#tbody").find("tr[state='insert']").closest("section").find("#paySaveFee").show();
			return false;
		}
		if($("#tbody").find("tr[state='update']").length>0)
		{
			$("#tbody").find("tr[state='insert']").closest("section").find("#modifySaveprimary").show();
			return false;
		}
		var state1=0;
		var state2=0;
		$(btn).closest("table").find("tbody input[type='checkbox']:checked").each(function(){
			if($(this).closest("tr").attr("flag")=='188001')
			{
				state1++;
			}else if($(this).closest("tr").attr("flag")=='188002')
			{
				state2++;
			}
		});
		if(state1>0)
		{
			$(btn).closest("section").find("#confirmfeeprimary").show();
			$(btn).closest("section").find("#modifycompayprimary").show();
			$(btn).closest("section").find("#delfeeitemprimary").show();
			$(btn).closest("section").find("#foldprimary").show();
			$(btn).closest("section").find("#modifyfeeprimary").show();
			
		}else{
			$(btn).closest("section").find("#confirmfeeprimary").hide();
			$(btn).closest("section").find("#modifycompayprimary").hide();
			$(btn).closest("section").find("#delfeeitemprimary").hide();
			$(btn).closest("section").find("#foldprimary").hide();
			$(btn).closest("section").find("#modifyfeeprimary").hide();
		}
		if(state2>0)
		{
			$(btn).closest("section").find("#returnConfirmprimary").show();
		}else{
			$(btn).closest("section").find("#returnConfirmprimary").hide();
		}
		if((state1+state2)>0)
		{
			if($(btn).closest("section").find("#confirmPreprimary").length>0)
			{
				$(btn).closest("section").find("#confirmPreprimary").show();
			}
			if($(btn).closest("section").find("#preinvoiceprimary").length>0)
			{
				$(btn).closest("section").find("#preinvoiceprimary").show();
			}
			if($(btn).closest("section").find("#prepayprimary").length>0)
			{
				$(btn).closest("section").find("#prepayprimary").show();
			}
			$("section #rSaveFeeRemark").show();
		}else{
			$(btn).closest("section").find("#confirmPreprimary").hide();
			$(btn).closest("section").find("#preinvoiceprimary").hide();
			$(btn).closest("section").find("#prepayprimary").hide();
		}
	}
	function orderfeeinit()
	{
		$("#receiveSaveFee").hide();
		$("#paySaveFee").hide();
		$("section #confirmfeeprimary").hide();
		$("section #modifycompayprimary").hide();
		$("section #delfeeitemprimary").hide();
		$("section #confirmPreprimary").hide();
		$("section #returnConfirmprimary").hide();
		$("section #preinvoiceprimary").hide();
		$("section #foldprimary").hide();
		$("section #prepayprimary").hide();
		$("section #modifySaveprimary").hide();
		$("section #modifyfeeprimary").hide();
		$("section #rSaveFeeRemark").hide();
		
		$('table tbody tr').unbind("click");
		$("table tbody tr").click(function(){
			var checkline = $(this).children("td").eq(0).find("input[type='checkbox']");
			$(checkline).prop("checked",!$(checkline).prop("checked"));
			if(!$(checkline).prop("checked"))
			{
				$(this).closest("table").find("thead tr ").children("th").eq(0).find("input[type='checkbox']").prop("checked",false);
				
			}else{
				if($(this).closest("table").find("tbody input[type='checkbox']").not("input:checked").length==0)
				{
					$(this).closest("table").find("thead tr ").children("th").eq(0).find("input[type='checkbox']").prop("checked",true);
				}
			}
			btninit($(this));
		});
		$('table thead tr').unbind("click");
		$("table thead tr").click(function(){
			var checkall = $(this).children("th").eq(0).find("input[type='checkbox']");
			$(checkall).prop("checked",!$(checkall).prop("checked"));
			var all = $(this).closest("table").find("tbody tr ");
			$(all).each(function(){
				if($(checkall).prop("checked"))
				{
					$(this).eq(0).find("input[type='checkbox']").prop("checked",true);
				}else{
					$(this).eq(0).find("input[type='checkbox']").prop("checked",false);
				}
			});
			btninit($(this));
		});
	}
	orderfeeinit();
	/**
	 * 应收的修改函数
	 */
	
	/**
	 * 增加按钮监控
	 */
	$("#addreceivefeebtn").click(function(){
		$("#receivefeeitemlist tbody").prepend($("#createreceivefeeitem tbody").html());
		$("#receiveSaveFee").show();
		if($("#receivefeeitemlist tbody").find("tr[state='insert']").length==1)
		{
		$("#receiveSaveFee").click(function(){
			var jsondata = getJsonFromEdit('receivefeeitemlist','insert');
			if(jsondata!='[]')
			{
				$.post(
					$.getContextPath()
							+ "/orderfee/saveFeeItem",
							'data='+jsondata+'&orderid='+$("#add_orderid").val()+"&paytypeid=receive&opertype=insert",
					function(result) {
						var obj = jQuery.parseJSON(result);
						if(obj.resultflag)
						{
							var rowid=0;
							$("#receivefeeitemlist tbody").find("tr[state='inserting']").each(function(){
								$(this).children("td").eq(0).html("<input type='checkbox'>");
								$(this).children("td").eq(1).text(obj.resultlist[rowid].currencyname);
								$(this).children("td").eq(2).text(obj.resultlist[rowid].feetype);
								$(this).children("td").eq(3).text(obj.resultlist[rowid].unit);
								$(this).children("td").eq(6).text(obj.resultlist[rowid].count);
								$(this).children("td").eq(4).text(obj.resultlist[rowid].price);
								$(this).children("td").eq(5).text(obj.resultlist[rowid].amount);
								$(this).children("td").eq(7).text(obj.resultlist[rowid].praccountsid);
								$(this).children("td").eq(8).text(obj.resultlist[rowid].updatestaffname);
								$(this).children("td").eq(9).text(obj.resultlist[rowid].createtime);
								$(this).children("td").eq(11).text("未确认");
								$(this).attr("state","inserted");
								$(this).addClass("danger");
								$(this).attr("orderfeeid",obj.resultlist[rowid].orderfeeid);
								$(this).attr("flag",obj.resultlist[rowid].orderfeestatusid);
								rowid++;
							});
							$('#receiveSaveFee').unbind("click");
							$("#receiveSaveFee").hide();
							orderfeeinit();
						}
					});
			}
		});
		}
		$("#removepayfeebtn").click(function(){
			$(this).closest("tr").remove();
			if($("#receivefeeitemlist tbody").find("tr[state='insert']").length==0)
			{
				$('#receiveSaveFee').unbind("click");
				$("#receiveSaveFee").hide();
			}
			
		});
	});
	
	/**
	 * 确认框提交按钮
	 */
	$("#confirmfeebtn").click(function(){
		$.post(
				$.getContextPath()
						+ "/orderfee/confirmdelfeeitem",
						$("#confirmfeeform").serialize(),
				function(result) {
					if(result=="ok")
					{
						$('#confirmfee').modal('hide');
						if($("#modify_type").val()=='confirmreceivefee')
						{
							$('#receivefeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(11).text("已确认");
							});
							alert("应收费用明细确认成功");
						}else if($("#modify_type").val()=='confirmpayfee')
						{
							$('#payfeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(12).text("已确认");
							});
							alert("应付费用明细确认成功");
						}else if($("#modify_type").val()=='delreceivefee'){
							$('#receivefeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").html("");
							});
							alert("应收费用明细删除成功");
						}else if($("#modify_type").val()=='delpayfee'){
							$('#payfeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").html("");
							});
							alert("应付费用明细删除成功");
						}else if($("#modify_type").val()=='modifycompaypay'){
							$('#payfeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(7).text($("#modify_praccountsid").val());
							});
							alert("修改付费单位名称成功");
						}else if($("#modify_type").val()=='modifycompayreceive'){
							$('#receivefeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(8).text($("#modify_praccountsid").val());
							});
							alert("修改收费单位名称成功");
						}else if($("#modify_type").val()=='preinvoiceprimary'){
							$('#receivefeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(11).text("发票申请中");
							});
							alert("应收费用明细提前开发票成功");
						}else if($("#modify_type").val()=='prepayprimary'){
							$('#payfeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(12).text("请款中");
							});
							alert("应付费用明细提前请款成功");
						}else if($("#modify_type").val()=='financelockprimart'){
							$('#receivefeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(11).text("财务已锁定");
							});
							alert("费用明细财务已锁定成功");
						}else if($("#modify_type").val()=='financeunlockprimart'){
							$('#receivefeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(11).text("未确认");
							});
							alert("费用明细财务解锁成功");
						}
						
					}else{
						alert("系统错误");
					}
				});
	});
	
	$("#returnconfirmbtn").click(function(){
		$.post(
				$.getContextPath()
						+ "/orderfee/confirmdelfeeitem",
						$("#confirmfeeform").serialize(),
				function(result) {
					if(result=="ok")
					{
						$('#confirmfee').modal('hide');
						if($("#modify_type").val()=='returnConfirmReceive')
						{
							$('#receivefeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(11).text("未确认");
							});
							alert("费用明细解锁成功");
						}else if($("#modify_type").val()=='returnConfirmPay')
						{
							$('#payfeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(12).text("未确认");
							});
							alert("费用明细解锁成功");
						}
					}
				});
				});
	
	
	/** 确认事件内容展示内容组合* */
	function generatorHtml(list) {
		var first = 0;
		var htmls = '';
		var orderfeeids = '';
		var state ="";
		$(list)
				.find("tr td input[type='checkbox']:checked")
				.each(
						function() {
							
							if(($('#modify_type').val()=='returnConfirmReceive'||
									$('#modify_type').val()=='returnConfirmPay')
									&&$(this).closest("tr").attr("flag")!='188002')
							{
								return;
							}
							if(($('#modify_type').val()=='confirmPreReceive'||
									$('#modify_type').val()=='confirmPrePay')
									&&$(this).closest("tr").attr("flag")!='188003')
							{
								return;
							}
							if(($('#modify_type').val()=='delpayfee'||
									$('#modify_type').val()=='delreceivefee'||
									$('#modify_type').val()=='confirmreceivefee'||
									$('#modify_type').val()=='confirmpayfee')
									&&$(this).closest("tr").attr("flag")!='188001')
							{
								return;
							}
							
							if (typeof ($(this).attr('id')) == "undefined") {
								if (first > 0) {
									htmls = htmls
											+ '<div class="col-md-12"><hr></div>';
									orderfeeids = orderfeeids + ',';
									
								}
								orderfeeids = orderfeeids
										+ $(this).closest("tr").attr("orderfeeid");
								
								if($(list).attr("id") =='receivefeeitemlist')
								{
									htmls = htmls
									+ '<div class="col-md-3 col-md-offset-1">币种：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(1).text()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">费用名称：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(2).html()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">计费单位：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(3).html()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">单价：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(4).html()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">数量：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(5).html()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">合计：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(6).html()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">收费单位：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(7).html() + '</div>';
								}else if($(list).attr("id") =='payfeeitemlist'){
									htmls = htmls
									+ '<div class="col-md-3 col-md-offset-1">币种：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(1).text()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">费用名称：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(2).html()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">计费单位：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(3).html()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">单价：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(4).html()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">数量：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(6).html()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">合计：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(7).html()
									+ '</div>'
									+ '<div class="col-md-3 col-md-offset-1">收费单位：</div><div class="col-md-8">'
									+ $(this).closest("tr").children("td")
											.eq(8).html() + '</div>';
								}
								
								
								first++;
								if(state=="")
								{
									state = $(this).closest("tr").attr("flag");
								}else if(state!=$(this).closest("tr").attr("flag")){
									state ="不可操作";
								}
								
							}
						});
		//caozuo 
		$('#receivefeebody').html(htmls);
		$('#modify_orderfeeids').val(orderfeeids);
		if ($('#receivefeebody').html() == '') {
			$('#receivefeebody')
					.html(
							'<div class="col-md-8 col-md-offset-1">未选中明细，请选择相应处理条目!</div>');
		}
		if(state=="188001")
		{
			$("#confirmfeebtn").show();
			$("#returnconfirmbtn").hide();
			$("#returnbtn").hide();
			$("#confirmbtn").hide();
		}else if(state=="188002")
		{
			$("#returnconfirmbtn").show();
			$("#returnbtn").hide();
			$("#confirmfeebtn").hide();
			$("#confirmbtn").hide();
		}else if(state=="188003"||state=="188004")
		{
			$("#confirmbtn").show();
			$("#returnbtn").show();
			$("#returnconfirmbtn").hide();
			$("#confirmfeebtn").hide();
		}else if(state=="不可操作")
		{
			$("#confirmbtn").hide();
			$("#returnbtn").hide();
			$("#returnconfirmbtn").hide();
			$("#confirmfeebtn").hide();
		}else{
			$("#confirmbtn").hide();
			$("#returnbtn").hide();
			$("#returnconfirmbtn").hide();
			$("#confirmfeebtn").hide();
		}
	}
	/** 确认删除事件内容修改* */
	$('#confirmfee')
			.on(
					'show.bs.modal',
					function(event) {
						var button = $(event.relatedTarget);
						var type = button.data('type');
						var listname = button.data("listname");
						$('#modify_type').val(type);
						if (type == "confirmreceivefee") {
							generatorHtml($('#receivefeeitemlist'));
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-success">应收费用确认<i class="glyphicon glyphicon-log-in"></span>');
							$('#confirmfeebtn').html('确认应收');
						} else if (type == "confirmpayfee") {
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-primary">应付费用确认<i class="glyphicon glyphicon-log-out"></span>');
							generatorHtml($('#payfeeitemlist'));
							$('#confirmfeebtn').html('确认应付');
						} else if (type == "delreceivefee") {
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-warning">应收费用删除<i class="glyphicon glyphicon-remove"></span>');
							generatorHtml($('#receivefeeitemlist'));
							$('#confirmfeebtn').html('确认删除应收');
						} else if (type == "delpayfee") {
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-danger">应付费用删除<i class="glyphicon glyphicon-remove"></span>');
							generatorHtml($('#payfeeitemlist'));
							$('#confirmfeebtn').html('确认删除应付');
						}else if (type == "confirmPreReceive") {
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-warning">提前开发票审批<i class="glyphicon glyphicon-remove"></span>');
							generatorHtml($('#receivefeeitemlist'));
							$('#confirmfeebtn').html('');
						} else if (type == "confirmPrePay") {
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-danger">提前请款审批<i class="glyphicon glyphicon-remove"></span>');
							generatorHtml($('#payfeeitemlist'));
							$('#confirmfeebtn').html('');
						}else if (type == "returnConfirmReceive") {
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-warning">已确认应收解锁<i class="glyphicon glyphicon-remove"></span>');
							generatorHtml($('#receivefeeitemlist'));
							$('#confirmfeebtn').html('');
						} else if (type == "returnConfirmPay") {
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-danger">已确认应付解锁<i class="glyphicon glyphicon-remove"></span>');
							generatorHtml($('#payfeeitemlist'));
							$('#confirmfeebtn').html('');
						}else if (type == "preinvoiceprimary") {
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-warning">提前开发票<i class="glyphicon glyphicon-remove"></span>');
							generatorHtml($('#receivefeeitemlist'));
							$('#confirmfeebtn').html('确认提前开发票');
						} else if (type == "prepayprimary") {
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-danger">提前请款<i class="glyphicon glyphicon-remove"></span>');
							generatorHtml($('#payfeeitemlist'));
							$('#confirmfeebtn').html('确认提前请款');
						}else if (type == "financelockprimart") {
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-danger">财务锁定<i class="glyphicon glyphicon-remove"></span>');
							generatorHtml($('#'+listname));
							$('#confirmfeebtn').html('确认财务锁定');
						}else if (type == "financeunlockprimart") {
							$('#modifybody').html("");
							$('#myModalLabel')
									.html(
											'<span class="label label-danger">财务解锁<i class="glyphicon glyphicon-remove"></span>');
							generatorHtml($('#'+listname));
							$('#confirmfeebtn').html('确认财务解锁');
						}

					});
	/** 修改事件内容展示内容组合* */
	function generatorModifyHtml(line) {
		var currtext =$(line).closest("tr").children("td");
		
		var count = $("#add_currencyid  option").length;
		for (var i = 0; i < count; i++) {
			if ($("#add_currencyid").get(0).options[i].text == currtext.eq(1)
					.text()) {
				$("#add_currencyid").get(0).selectedIndex = i;
				break;
			}
		}
		count = $("#add_feetypeid  option").length;
		for (var i = 0; i < count; i++) {
			if ($("#add_feetypeid").get(0).options[i].text == currtext.eq(2)
					.html()) {
				$("#add_feetypeid").get(0).selectedIndex = i;
				break;
			}
		}
		count = $("#add_unitid  option").length;
		for (var i = 0; i < count; i++) {
			if ($("#add_unitid").get(0).options[i].text == currtext.eq(3)
					.html()) {
				$("#add_unitid").get(0).selectedIndex = i;
				break;
			}
		}
		$("#add_price").val(currtext.eq(4).html());
		$("#add_amount").val(currtext.eq(5).html());
		$("#add_praccountsid").val(currtext.eq(7).html());
		$('#add_orderfeeid').val(currtext.closest("tr").attr("orderfeeid"));
		if(currtext.eq(11).html()!='未确认')
		{
			$("#addfeebtn").hide();
		}else{
			$("#addfeebtn").show();
		}
	}
	/**
	 * 新增事件内容展示内容初始化
	 */
	function generatorInitHtml() {
		$("#add_currencyid").get(0).selectedIndex = 1;
		$("#add_feetypeid").get(0).selectedIndex = 0;
		$("#add_unitid").get(0).selectedIndex =0;
		$("#add_price").val("");
		$("#add_amount").val("");
		$("#add_praccountsid").val("");
	}
	/** 修改事件内容展示* */
	$('#createpayfee')
			.on(
					'show.bs.modal',
					function(event) {
						var button = $(event.relatedTarget);
						var type = button.data('type');
						$('#add_orderfeeid').val("");
						if (type == "addpay") {
							$('#createpayfeeLabel')
									.html(
											'<span class="label label-primary">新增应付费用<i class="glyphicon glyphicon-plus"></span>');
							$('#add_paytypeid').val("pay");
							$('#addfeebtn').text("应付提交");
							generatorInitHtml();
						} else if (type == "modifypay") {
							$('#createpayfeeLabel')
									.html(
											'<span class="label label-warning">修改应付费用<i class="glyphicon glyphicon-pencil"></span>');
							$('#add_paytypeid').val("modifypay");
							return generatorModifyHtml(button);
						} else if (type == "addreceive") {
							$('#createpayfeeLabel')
									.html(
											'<span class="label label-info">新增应收费用<i class="glyphicon glyphicon-plus"></span>');
							$('#add_paytypeid').val("receive");
							$('#addfeebtn').text("应收提交");
							generatorInitHtml();
						} else if (type == "modifyreceive") {
							$('#createpayfeeLabel')
									.html(
											'<span class="label label-danger">修改应收费用<i class="glyphicon glyphicon-pencil"></span>');
							$('#add_paytypeid').val("modifyreceive");
							return generatorModifyHtml(button);
						}
					});
	/**
	 * 折币对话框
	 */
	$('#foldprimarymodal').on('show.bs.modal',
		function(event) {
		var button = $(event.relatedTarget);
		var type = button.data('type');
		var listname = button.data('listname');
		var list= $("#"+listname+" tbody").find("tr input[type='checkbox']:checked");
		if($(list).closest("tr").children("td").filter(":contains('未确认')").length>1)
		{
			alert("每次只能选择一条未确认的折币明细。")
			return e.preventDefault();
		}
		//查找当前币种ID
		$("#fold_orderfeeid").val($(list).closest("tr").attr("orderfeeid"));
		var ttd = $(list).closest("tr").children("td").filter(":contains('未确认')");
		$("#fromcurrencyid").text(ttd.closest("tr").children("td").eq(1).text());
		var currtext = ttd.closest("tr").children("td").eq(1).text();
		//调用当前币种的折币参数
		var paramstr= "fromcurrencyname="+currtext;
		$.get($.getContextPath()+ "/orderfee/exchangerateoption",paramstr,
				  function(data){
					$('#tocurrencyid option').remove();
				    $('#tocurrencyid').append(data);
				    $("#tocurrencyid").change();
		});
		$("#fromprice").text(ttd.closest("tr").children("td").eq(4).html());
		$("#foldfeebtn").attr("listname",listname);
		//$("#exchangerate").text();
		$("#toprice").text();
	});
	/**
	 * 折币选择框的选择
	 */
	$("#exchangerate").change(function(){
		$("#toprice").text(($("#exchangerate").val()*$("#fromprice").text()).toFixed(3));
	});
	/**
	 * 汇率变动
	 */
	$("#tocurrencyid").change(function(){
		$("#exchangerate").val($("#tocurrencyid").find("option:selected").attr("rate"));
		$("#toprice").text(($("#exchangerate").val()*$("#fromprice").text()).toFixed(3));
	});
	/**
	 * 折币提交按钮监控
	 */
	$("#foldfeebtn").click(function(){
		$.post(
				$.getContextPath()
						+ "/orderfee/foldfeeitem",
						$("#foldprimarymodalform").serialize(),
				function(result) {
					if(result=="ok")
					{
						$("#"+$("#foldfeebtn").attr("listname")+" tbody").find("tr td input[type='checkbox']:checked").each(function(){
							var html = "<a  data-content='汇率："+$.trim($("#exchangerate").val())+"' tabindex='0' role='button'"+ 
								" data-toggle='popover' data-trigger='focus' title='目标币种："+$("#tocurrencyid").find("option:selected").text()+
								"'>"+$.trim($(this).closest("tr").children("td").eq(1).text())+
								$("#foldimg").html()+" </a>";
							$(this).closest("tr").children("td").eq(1).html(html);
							$(this).closest("tr").children("td").eq(1).find("a").popover();
						});
						alert("此费用明细折币成功");
					}else{
						alert("系统错误");
					}
					$('#foldprimarymodal').modal('hide');
				});
	});
	/**根据应付增加应收**/
	$('#createreceivefee')
			.on(
					'show.bs.modal',
					function(event) {
						var button = $(event.relatedTarget);
						var type = button.data('type');
						var currtext = $(event.relatedTarget).closest("tr")
								.children("td");
						var count = $("#receive_currencyid  option").length;
						for (var i = 0; i < count; i++) {
							if ($("#receive_currencyid").get(0).options[i].text == currtext
									.eq(1).text()) {
								$("#receive_currencyid").get(0).selectedIndex = i;
								break;
							}
						}
						count = $("#receive_feetypeid  option").length;
						for (var i = 0; i < count; i++) {
							if ($("#receive_feetypeid").get(0).options[i].text == currtext
									.eq(2).html()) {
								$("#receive_feetypeid").get(0).selectedIndex = i;
								break;
							}
						}
						count = $("#receive_unitid  option").length;
						for (var i = 0; i < count; i++) {
							if ($("#receive_unitid").get(0).options[i].text == currtext
									.eq(3).html()) {
								$("#receive_unitid").get(0).selectedIndex = i;
								break;
							}
						}
						$("#receive_price").val(currtext.eq(4).html());
						$("#receive_amount").val(currtext.eq(5).html());
						$("#receive_praccountsid").val(currtext.eq(7).html());
						$("#pay_currencyid").text(currtext.eq(1).text());
						$("#pay_feetypeid").text(currtext.eq(2).html());
						$("#pay_unitid").text(currtext.eq(3).html());
						$("#pay_price").text(currtext.eq(4).html());
						$("#pay_amount").text(currtext.eq(5).html());
						$("#pay_praccountsid").text(currtext.eq(7).html());
						$("#pay_count").text(currtext.eq(6).html());
					});
/**
 * 收付费单位修改
 */
	$('#modifypraccountsid')
	.on(
			'show.bs.modal',
			function(event) {
				var button = $(event.relatedTarget);
				var type = button.data('type');
				$('#mp_type').val(type);
				 if (type == "modifycompaypay") {
						$('#modifypraccountsidLabel')
								.html(
										'<span class="label label-danger">付费单位修改<i class="glyphicon glyphicon-pencil"></span>');
						generatorMPHtml($('#payfeeitemlist'));
						
					} else if (type == "modifycompayreceive") {
						$('#modifypraccountsidLabel')
								.html(
										'<span class="label label-danger">收费单位修改<i class="glyphicon glyphicon-pencil"></span>');
						generatorMPHtml($('#receivefeeitemlist'));
					}
			});
	/**
	 * 收付费单位修改内容拼写
	 */
	function generatorMPHtml(list) {
		var first = 0;
		var htmls = '';
		var orderfeeids = '';
		var state ="";
		$(list)
				.find("tr td input[type='checkbox']:checked")
				.each(
						function() {
							if (typeof ($(this).attr('id')) == "undefined") {
								if($(this).closest("tr").children("td").eq(11).text()!='未确认')
								{
									return;
								}
								if (first > 0) {
									htmls = htmls
											+ '<div class="col-md-12"><hr></div>';
									orderfeeids = orderfeeids + ',';
								}
								orderfeeids = orderfeeids
										+ $(this).closest("tr").attr("orderfeeid");
								
								htmls = htmls
										+ '<div class="col-md-3 col-md-offset-1">币种：</div><div class="col-md-8">'
										+ $(this).closest("tr").children("td")
												.eq(1).text()
										+ '</div>'
										+ '<div class="col-md-3 col-md-offset-1">费用名称：</div><div class="col-md-8">'
										+ $(this).closest("tr").children("td")
												.eq(2).html()
										+ '</div>'
										+ '<div class="col-md-3 col-md-offset-1">计费单位：</div><div class="col-md-8">'
										+ $(this).closest("tr").children("td")
												.eq(3).html()
										+ '</div>'
										+ '<div class="col-md-3 col-md-offset-1">单价：</div><div class="col-md-8">'
										+ $(this).closest("tr").children("td")
												.eq(4).html()
										+ '</div>'
										+ '<div class="col-md-3 col-md-offset-1">数量：</div><div class="col-md-8">'
										+ $(this).closest("tr").children("td")
												.eq(5).html()
										+ '</div>'
										+ '<div class="col-md-3 col-md-offset-1">合计：</div><div class="col-md-8">'
										+ $(this).closest("tr").children("td")
												.eq(6).html()
										+ '</div>'
										+ '<div class="col-md-3 col-md-offset-1">收费单位：</div><div class="col-md-8">'
										+ $(this).closest("tr").children("td")
												.eq(7).html() + '</div>';
								first++;
								if(state=="")
								{
									state = $(this).closest("tr").children("td").eq(11).html();
								}else if(state!=$(this).closest("tr").children("td").eq(11).html()){
									state ="不可操作";
								}
								
							}
						});
		//caozuo 
		$('#mpfeebody').html(htmls);
		$('#mp_orderfeeids').val(orderfeeids);
		if ($('#mpfeebody').html() == '') {
			$('#mpfeebody')
					.html(
							'<div class="col-md-8 col-md-offset-1">未选中明细，请选择相应处理条目!</div>');
		}
		
	}
	/**
	 * 修改应付费单位按钮事件
	 */
	$("#mpfeebtn").click(function(){
		$.post(
				$.getContextPath()
						+ "/orderfee/confirmdelfeeitem",
						$("#modifypraccountsidform").serialize(),
				function(result) {
					if(result=="ok")
					{
						$('#modifypraccountsid').modal('hide');
						if($("#mp_type").val()=='modifycompaypay'){
							$('#payfeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(7).text($("#mp_praccountsid").val());
							});
							alert("修改付费单位名称成功");
						}else if($("#mp_type").val()=='modifycompayreceive'){
							$('#receivefeeitemlist').find("tr td input[type='checkbox']:checked").each(function(){
								$(this).closest("tr").children("td").eq(7).text($("#mp_praccountsid").val());
							});
							alert("修改收费单位名称成功");
						}
					}else{
						alert("系统错误");
					}
				});
	});
	
	/**
	 * 备注框弹出事件
	 */
	$('#remarkfee')
	.on(
			'show.bs.modal',
			function(event) {
				var button = $(event.relatedTarget);
				var listname = button.data("listname");
				if($("#"+listname+" tbody").find("tr td input[type='checkbox']:checked").length==0)
				{
					alert("请选择需要备注的费用明细!")
					return event.preventDefault();
				}
				var feenames = "";
				var orderfeeids = "";
				var first =0;
				$("#"+listname+" tbody").find("tr td input[type='checkbox']:checked").each(function(){
					if(first>0)
					{
						feenames = feenames+",";
						orderfeeids = orderfeeids+",";
					}
					feenames=feenames+$(this).closest("tr").children("td").eq(2).text();
					orderfeeids = orderfeeids	+ $(this).closest("tr").attr("orderfeeid");
					first++;
				});
				$("#remark_orderfeeids").val(orderfeeids);
				$("#remarkfeebtn").attr("listname",listname);
				$("#names").html(feenames);
			});
	/**
	 * 备注提交按钮事件
	 */
	$("#remarkfeebtn").click(function(){
		$.post(
				$.getContextPath()
						+ "/orderfee/remarkfeeitem",
						$("#remarkfeeform").serialize(),
				function(result) {
					if(result=="ok")
					{
						$("#"+$("#remarkfeebtn").attr("listname")+" tbody").find("tr td input[type='checkbox']:checked").each(function(){
							if($("#remarkfeebtn").attr("listname")=='receivefeeitemlist')
							{
							var html = "<a  data-content='"+$.trim($("#remark").val())+"' tabindex='0' role='button'"+ 
								" data-toggle='popover' data-trigger='focus' title='备注'>"+$(this).closest("tr").children("td").eq(8).text()+
								$("#remarkimg").html()+" </a>";
							
								$(this).closest("tr").children("td").eq(8).html(html);
								$(this).closest("tr").children("td").eq(8).find("a").popover();
							}else if($("#remarkfeebtn").attr("listname")=='payfeeitemlist'){
								var html = "<a  data-content='"+$.trim($("#remark").val())+"' tabindex='0' role='button'"+ 
								" data-toggle='popover' data-trigger='focus' title='备注'>"+$(this).closest("tr").children("td").eq(9).text()+
								$("#remarkimg").html()+" </a>";
								$(this).closest("tr").children("td").eq(9).html(html);
								$(this).closest("tr").children("td").eq(9).find("a").popover();
							}
							
						});
					}else{
						alert("系统错误");
					}
					$('#remarkfee').modal('hide');
				});
	});
	
	/**
	 * 应付新增按钮
	 */
	$("#addpayfeebtn").click(function(){
		$("#payfeeitemlist tbody").prepend($("#createpayfeeitem tbody").html());
		//$("#paySaveFee").show();
		$("#paySaveFee").click(function(){
			var jsondata = getJsonFromEdit('payfeeitemlist','insert');
			if(jsondata!='[]')
			{
				$.post(
						$.getContextPath()
								+ "/orderfee/saveFeeItem",
								'data='+jsondata+'&orderid='+$("#add_orderid").val()+"&paytypeid=pay",
						function(result) {
							var obj = jQuery.parseJSON(result);
							if(obj.resultflag)
							{
								var rowid=0;
								$("#payfeeitemlist tbody").find("tr[state='inserting']").each(function(){
									$(this).children("td").eq(0).html("<input type='checkbox'>");
									$(this).children("td").eq(1).text(obj.resultlist[rowid].currencyname);
									$(this).children("td").eq(2).text(obj.resultlist[rowid].feetype);
									$(this).children("td").eq(3).text(obj.resultlist[rowid].unit);
									$(this).children("td").eq(4).text(obj.resultlist[rowid].price);
									$(this).children("td").eq(5).text(obj.resultlist[rowid].costprice);
									$(this).children("td").eq(6).text(obj.resultlist[rowid].amount);
									$(this).children("td").eq(7).text(obj.resultlist[rowid].count);
									$(this).children("td").eq(8).text(obj.resultlist[rowid].praccountsid);
									$(this).children("td").eq(9).text(obj.resultlist[rowid].updatestaffname);
									$(this).children("td").eq(10).text(obj.resultlist[rowid].createtime);
									$(this).children("td").eq(12).text("未确认");
									$(this).attr("state","inserted");
									$(this).addClass("danger");
									$(this).attr("orderfeeid",obj.resultlist[rowid].orderfeeid);
									$(this).attr("flag",obj.resultlist[rowid].orderfeestatusid);
									rowid++;
								});
								orderfeeinit();
							}
						});
			}
			
		});
		orderfeeinit();
		$("#add_price").change(function(){
			$(this).closest("tr").find("#add_costprice").val($("#add_price").val());
		});
		
		$("#removepayfeebtn").click(function(){
			$(this).closest("tr").remove();
			if($("#payfeeitemlist tbody").find("tr[state='insert']").length==0)
			{
				$('#paySaveFee').unbind("click");
				$("#paySaveFee").hide();
			}
		});
	});
});