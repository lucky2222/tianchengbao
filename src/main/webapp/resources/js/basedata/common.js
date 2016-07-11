$(function() {

			/*
			 * $("#createbasecategoryform").Validform({ tiptype : 2 });
			 */

			$('#createBaseCategory').on('show.bs.modal', function(event) {
						var button = $(event.relatedTarget);
						var type = button.data('type');
						var modal = $(this);
						if (type == "add") {
							modal.find('.modal-title').text("新建基础分类");
							$('#operate').text("新增");
							$('#operate').attr("operatetype", "add");
							$('#basecategoryid').val("");
							$('#categoryname').show();
							$('#seqno').show();
							$('#remark').show();
							$("[name='permission']").show();
							$('#categoryname').val("");
							$('#seqno').val("");
							$('#remark').val("");
							$("[name='permission']:checked").each(function() {
										$(this).attr("checked", false);
									});

						} else if (type == "update") {
							modal.find('.modal-title').text("更新基础分类");
							$('#operate').text("更新");
							$('#operate').attr("operatetype", "update");
							$('#basecategoryid').val(button
									.data('basecategory'));
							$('#categoryname').val(button.data('categoryname'));
							$('#seqno').val(button.data('seqno'));
							$('#remark').val(button.data('remark'));
							$("[name='permission']").each(function() {
										if ($(this).val() == button
												.data('permission'))
											$(this).attr("checked", "checked");
									});

						} else if (type == "del") {
							modal.find('.modal-title').text("删除基础分类");
							$('#operate').text("删除");
							$('#operate').attr("operatetype", "del");
							$('#basecategoryid').val(button
									.data('basecategory'));
							$('#param').hide();
							$('#categoryname').val(button
									.data('basecategoryname'));
							$('#seqno').val("");
							$('#remark').val("");
							$("[name='permission']:checked").each(function() {
										$(this).attr("checked", false);
									});

						}
					});

			$("#createbasecategoryform").validate({
				rules : {
					categoryname : "required",
					remark : "required"
				},
				messages : {
					categoryname : "必填",
					remark : "必填"
				},
				submitHandler : function(form) {
					if ($('#operate').attr("operatetype") == 'add') {
						$.ajax({
									url : "./createbasecategory",
									data : $("#createbasecategoryform")
											.serialize(),
									type : "post",
									async : false,
									success : function(data) {
										if (data.substr(0, 1) == '0') {
											alert(data.substr(1, data.length));
											$('#createBaseCategory')
													.modal('hide');
											location.reload();
										} else {
											alert(data.substr(1, data.length));
										}
									}
								});
					} else if ($('#operate').attr("operatetype") == 'update') {
						$.ajax({
									url : "./updatebasecategory",
									data : $("#createbasecategoryform")
											.serialize(),
									type : "post",
									async : false,
									success : function(data) {
										if (data.substr(0, 1) == '0') {
											alert(data.substr(1, data.length));
											$('#createBaseCategory')
													.modal('hide');
											location.reload();
										} else {
											alert(data.substr(1, data.length));
										}
									}
								});
					} else if ($('#operate').attr("operatetype") == 'del') {
						$.ajax({
									url : "./delbasecategory",
									data : {
										basecategoryid : $("#basecategoryid")
												.val(),
										categoryname : $("#categoryname").val()
									},
									type : "post",
									async : false,
									success : function(data) {
										if (data.substr(0, 1) == '0') {
											alert(data.substr(1, data.length));
											$('#createBaseCategory')
													.modal('hide');
											location.reload();
										} else {
											alert(data.substr(1, data.length));
										}
									}
								});
					}
				}
			});

			/*
			 * $("#operate").click(function() { if
			 * ($('#operate').attr("operatetype") == 'add') { $.ajax({ url :
			 * "./createbasecategory", data :
			 * $("#createbasecategoryform").serialize(), type : "post", async :
			 * false, success : function(data) { if (data.substr(0, 1) == '0') {
			 * alert(data.substr(1, data.length));
			 * $('#createBaseCategory').modal('hide'); location.reload(); } else {
			 * alert(data.substr(1, data.length)); } } }); } else if
			 * ($('#addSQL').attr("operatetype") == 'update') {
			 * $.post("./updatecodecode", { "codepath" :
			 * $('#addcodepath').val(), "codeid" : $('#addcodeid').val(),
			 * "codetype" : $('#addcodetype').val(), "sqlcode" :
			 * $.base64.encode($('#addsqlcode').val()), "remark" :
			 * $('#addremark').val() }, function(data) { if (data.substr(0, 1) ==
			 * '0') { alert(data.substr(1, data.length));
			 * $('#myModal').modal('hide'); location.reload(); } else {
			 * alert(data.substr(1, data.length)); } }); } else if
			 * ($('#addSQL').attr("operatetype") == 'del') {
			 * $.post("./delcodecode", { "codepath" : $('#addcodepath').val(),
			 * "codeid" : $('#addcodeid').val(), "remark" :
			 * $('#addremark').val() }, function(data) { if (data.substr(0, 1) ==
			 * '0') { alert(data.substr(1, data.length));
			 * $('#myModal').modal('hide'); location.reload(); } else {
			 * alert(data.substr(1, data.length)); } }); } });
			 */

			// basetype增删改
			$('#createBaseType').on('show.bs.modal', function(event) {
						var button = $(event.relatedTarget);
						var type = button.data('type');
						var modal = $(this);
						if (type == "add") {
							modal.find('.modal-title').text("新建基础数据");
							$('#operate').text("新增");
							$('#operate').attr("operatetype", "add");
							$('#basetypeid').val("");
							$('#typename').show();
							$('#categoryid').show();
							$('#seqno').show();
							$('#remark').show();
							$('#typename').val("");
							$('#categoryid').val("");
							$('#seqno').val("");
							$('#remark').val("");
						} else if (type == "update") {
							modal.find('.modal-title').text("更新基础数据");
							$('#operate').text("更新");
							$('#operate').attr("operatetype", "update");
							$('#basetypeid').val(button.data('basetypeid'));
							$('#typename').val(button.data('typename'));
							$('#categoryid').val(button.data('categoryid'));
							$('#seqno').val(button.data('seqno'));
							$('#remark').val(button.data('remark'));
						} else if (type == "del") {
							modal.find('.modal-title').text("删除基础数据");
							$('#operate').text("删除");
							$('#operate').attr("operatetype", "del");
							$('#basetypeid').val(button.data('basetypeid'));
							$('#param').hide();
							$('#typename').val(button.data('typename'));
							$('#seqno').val("");
							$('#remark').val("");
						}
					});
		});

$("#createbasetypeform").validate({
			rules : {
				categoryid : "required",
				typename : "required"
				,
			},
			messages : {
				categoryid : "必填",
				typename : "必填"
				,
			},
			submitHandler : function(form) {
				if ($('#operate').attr("operatetype") == 'add') {
					$.ajax({
								url : "./createbasetype",
								data : $("#createbasetypeform").serialize(),
								type : "post",
								async : false,
								success : function(data) {
									if (data.substr(0, 1) == '0') {
										alert(data.substr(1, data.length));
										$('#createBaseType').modal('hide');
										location.reload();
									} else {
										alert(data.substr(1, data.length));
									}
								}
							});
				} else if ($('#operate').attr("operatetype") == 'update') {
					$.ajax({
								url : "./updatebasetype",
								data : $("#createbasetypeform").serialize(),
								type : "post",
								async : false,
								success : function(data) {
									if (data.substr(0, 1) == '0') {
										alert(data.substr(1, data.length));
										$('#createBaseType').modal('hide');
										location.reload();
									} else {
										alert(data.substr(1, data.length));
									}
								}
							});
				} else if ($('#operate').attr("operatetype") == 'del') {
					$.ajax({
								url : "./delbasetype",
								data : {
									basetypeid : $("#basetypeid").val(),
									typename : $("#typename").val()
								},
								type : "post",
								async : false,
								success : function(data) {
									if (data.substr(0, 1) == '0') {
										alert(data.substr(1, data.length));
										$('#createBaseType').modal('hide');
										location.reload();
									} else {
										alert(data.substr(1, data.length));
									}
								}
							});
				}
			}
		});

function clearBaseCategoryInput() {

	$("#createbasecategoryform  > input").each(function() {
				if ($(this).type() == "text")
					$(this).val("");
			});
	$("input[name= 'permission']:checked").attr("checked", false);
}
