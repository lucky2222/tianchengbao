$(function(){
	//权限定义增删改的提交动作
	$('#addfunction').click(function(){
		if($('#addfunction').attr("operatetype")=='addfunction')
		{
			if($('#addfunctionname').val()==null||$('#addfunctionname').val()=='')
			{
				alert("权限名称不能为空");
				return false;
			}
			if($('#addfunctionright').val()==null||$('#addfunctionright').val()=='')
			{
				alert("权限编码不能为空");
				return false;
			}
			
			$.post("./addfunctionitem",{
				"functionname":$('#addfunctionname').val(),
				"functionright":$('#addfunctionright').val(),
				"functiontype":$('#addfunctiontype').val(),
				"remark":$('#addremark').val()
			},
			function(data){
					    if(data.substr(0,1)=='0')
					    {
					    	alert(data.substr(1,data.length));
					    	$('#myModal').modal('hide');
					    	refreshPage($("#functionlist"));
					    }else{
					    	alert(data.substr(1,data.length));
					    }
			});
		}else if($('#addfunction').attr("operatetype")=='update')
		{
			if($('#addfunctionname').val()==null||$('#addfunctionname').val()=='')
			{
				alert("权限名称不能为空");
				return false;
			}
			if($('#addfunctionright').val()==null||$('#addfunctionright').val()=='')
			{
				alert("权限编码不能为空");
				return false;
			}
			
			$.post("./updfunctionitem",{
				"functionid":$('#addfunctionid').val(),
				"functionname":$('#addfunctionname').val(),
				"functionright":$('#addfunctionright').val(),
				"functiontype":$('#addfunctiontype').val(),
				"remark":$('#addremark').val()
			},
			function(data){
					    if(data.substr(0,1)=='0')
					    {
					    	alert(data.substr(1,data.length));
					    	$('#myModal').modal('hide');
					    	refreshPage($("#functionlist"));
					    }else{
					    	alert(data.substr(1,data.length));
					    }
			});
		}else if($('#addfunction').attr("operatetype")=='delete')
		{
			if($('#addfunctionid').val()==null||$('#addfunctionid').val()=='')
			{
				alert("权限ID不能为空");
				return false;
			}
			
			$.post("./delfunctionitem",{
				"functionid":$('#addfunctionid').val()
			},
			function(data){
					    if(data.substr(0,1)=='0')
					    {
					    	alert(data.substr(1,data.length));
					    	$('#myModal').modal('hide');
					    	refreshPage($("#functionlist"));
					    }else{
					    	alert(data.substr(1,data.length));
					    }
			});
		}
	});
	
	//权限定义弹出模态框事件
	$('#myModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var type = button.data('type') ;
		var modal = $(this);
		if(type=="addfunction")
		{
			modal.find('.modal-title').text("新增权限");
			$('#addfunction').text("确认新增权限");
			$('#addfunction').attr("operatetype","addfunction");
			$('#addfunction').show();
			$('#addfunctionname').val("");
		    $('#addfunctionright').val("");
		    $('#addfunctiontype').val("");
		    $('#addremark').val("");
		}else if(type=="update")
		{
			modal.find('.modal-title').text("更新权限");
			$('#addfunction').text("确认更新权限");
			$('#addfunction').attr("operatetype","update");
			$('#addfunction').show();
			
			$('#addfunctionid').val(button.data('functionid') );
			$('#addfunctionname').val(button.data('functionname') );
		    $('#addfunctionright').val(button.data('functionright'));
		    $('#addfunctiontype').val(button.data('functiontype'));
		    $('#addremark').val(button.data('remark'));
		}else if(type=="delete")
		{
			modal.find('.modal-title').text("删除权限");
			$('#addfunction').attr("operatetype","delete");
			$('#addfunction').text("确认删除权限");
			$('#addfunction').show();
			
			$('#addfunctionid').val(button.data('functionid') );
			$('#addfunctionname').val(button.data('functionname') );
		    $('#addfunctionright').val(button.data('functionright'));
		    $('#addfunctiontype').val(button.data('functiontype'));
		    $('#addremark').val(button.data('remark'));
		}
	});
	//角色定义弹出模态框事件
	$('#roleModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var type = button.data('type') ;
		var modal = $(this);
		if(type=="addrole")
		{
			modal.find('.modal-title').text("新增角色");
			$('#addrole').text("确认新增角色");
			$('#addrole').attr("operatetype","addrole");
			$('#addrole').show();
			$('#addrolename').val("");
		    $('#addroletype').val("");
		    $('#addremark').val("");
		}else if(type=="update")
		{
			modal.find('.modal-title').text("更新角色");
			$('#addrole').text("确认更新角色");
			$('#addrole').attr("operatetype","update");
			$('#addrole').show();
			
			$('#addroleid').val(button.data('roleid') );
			$('#addrolename').val(button.data('rolename') );
		    $('#addroletype').val(button.data('roletype'));
		    $('#addremark').val(button.data('remark'));
		}else if(type=="delete")
		{
			modal.find('.modal-title').text("删除角色");
			$('#addrole').attr("operatetype","delete");
			$('#addrole').text("确认删除角色");
			$('#addrole').show();
			
			$('#addroleid').val(button.data('roleid') );
			$('#addrolename').val(button.data('rolename') );
		    $('#addroletype').val(button.data('roletype'));
		    $('#addremark').val(button.data('remark'));
		}
	});
	//角色定义增删改的提交动作
	$('#addrole').click(function(){
		if($('#addrole').attr("operatetype")=='addrole')
		{
			if($('#addrolename').val()==null||$('#addrolename').val()=='')
			{
				alert("角色名称不能为空");
				return false;
			}
			
			$.post("./addroleitem",{
				"rolename":$('#addrolename').val(),
				"roletype":$('#addroletype').val(),
				"remark":$('#addremark').val()
			},
			function(data){
					    if(data.substr(0,1)=='0')
					    {
					    	alert(data.substr(1,data.length));
					    	$('#roleModal').modal('hide');
					    	refreshPage($("#rolelist"));
					    }else{
					    	alert(data.substr(1,data.length));
					    }
			});
		}else if($('#addrole').attr("operatetype")=='update')
		{
			if($('#addrolename').val()==null||$('#addrolename').val()=='')
			{
				alert("角色名称不能为空");
				return false;
			}
			
			$.post("./updroleitem",{
				"roleid":$('#addroleid').val(),
				"rolename":$('#addrolename').val(),
				"roletype":$('#addroletype').val(),
				"remark":$('#addremark').val()
			},
			function(data){
					    if(data.substr(0,1)=='0')
					    {
					    	alert(data.substr(1,data.length));
					    	$('#roleModal').modal('hide');
					    	refreshPage($("#rolelist"));
					    }else{
					    	alert(data.substr(1,data.length));
					    }
			});
		}else if($('#addrole').attr("operatetype")=='delete')
		{
			if($('#addroleid').val()==null||$('#addroleid').val()=='')
			{
				alert("权限ID不能为空");
				return false;
			}
			
			$.post("./delroleitem",{
				"roleid":$('#addroleid').val()
			},
			function(data){
					    if(data.substr(0,1)=='0')
					    {
					    	alert(data.substr(1,data.length));
					    	$('#roleModal').modal('hide');
					    	refreshPage($("#rolelist"));
					    }else{
					    	alert(data.substr(1,data.length));
					    }
			});
		}
	});
	
	//权限分配弹出模态框事件
	$('#funcRoleModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var type = button.data('type') ;
		var modal = $(this);
		if(type=="addFunc")
		{
			modal.find('.modal-title').text("权限分配");
			$('#addfunctionrole').text("确认权限分配");
			$('#addfunctionrole').attr("operatetype","addFunc");
			$('#addfunctionrole').show();
			
			$('#addnum').val(button.data('addnum') );
			$('#addroleid').val(button.data('roleid') );
			$('#addrolename').val(button.data('rolename') );
			$('#addfunctionid').val(button.data('functionid') );
			$('#addfunctionname').val(button.data('functionname') );
		    $('#addfunctiontype').val(button.data('functiontype'));
		    $('#addremark').val(button.data('remark'));
		}else if(type=="delete")
		{
			modal.find('.modal-title').text("取消权限");
			$('#addfunctionrole').attr("operatetype","delete");
			$('#addfunctionrole').text("确认取消权限");
			$('#addfunctionrole').show();
			
			$('#addnum').val(button.data('addnum') );
			$('#addfuncroleid').val(button.data('funcroleid') );
			$('#addfunctionname').val(button.data('functionname') );
		    $('#addfunctiontype').val(button.data('functiontype'));
		    $('#addremark').val(button.data('remark'));
		}
	});
	
	//权限分配的提交动作
	$('#addfunctionrole').click(function(){
		if($('#addfunctionrole').attr("operatetype")=='addFunc')
		{
			if($('#addroleid').val()==null||$('#addroleid').val()=='')
			{
				alert("角色ID不能为空");
				return false;
			}
			if($('#addfunctionid').val()==null||$('#addfunctionid').val()=='')
			{
				alert("权限ID不能为空");
				return false;
			}
			
			$.post("./addfunctionroleitem",{
				"roleid":$('#addroleid').val(),
				"functionname":$('#addfunctionname').val(),
				"functionid":$('#addfunctionid').val()
			},
			function(data){
					    if(data.substr(0,1)=='0')
					    {
					    	alert(data.substr(1,data.length));
					    	$('#funcRoleModal').modal('hide');
					    	//列表变更
					    	$('#hasfunctionlist table').bootstrapTable('insertRow', {
				                index: 0,
				                row: {
				                    '序号': "new",
				                    '角色名称':$('#addrolename').val(),
				                    '权限名称':  $('#addfunctionname').val(),
				                    '权限类型':  $('#addfunctiontype').find("option:selected").text()
				                }
				            });
					    	var vals = "["+$('#addnum').val()+"]";
					    	$('#nofunctionlist table').bootstrapTable('remove', {
					    		field: '序号',
					    		values: vals
				            });
					    }else{
					    	alert(data.substr(1,data.length));
					    }
			});
		}else if($('#addfunctionrole').attr("operatetype")=='delete')
		{
			if($('#addfuncroleid').val()==null||$('#addfuncroleid').val()=='')
			{
				alert("角色权限ID不能为空");
				return false;
			}
			
			$.post("./delfunctionroleitem",{
				"funcroleid":$('#addfuncroleid').val(),
				"functionname":$('#addfunctionname').val()
			},
			function(data){
					    if(data.substr(0,1)=='0')
					    {
					    	alert(data.substr(1,data.length));
					    	$('#funcRoleModal').modal('hide');
					    	//列表变更
					    	$('#nofunctionlist table').bootstrapTable('insertRow', {
				                index: 0,
				                row: {
				                    '序号': "del",
				                    '权限名称':  $('#addfunctionname').val(),
				                    '权限类型':  $('#addfunctiontype').find("option:selected").text(),
				                    '备注':'已删除'
				                }
				            });
					    	var vals = "["+$('#addnum').val()+"]";
					    	$('#hasfunctionlist table').bootstrapTable('remove', {
					    		field: '序号',
					    		values: vals
				            });
					    }else{
					    	alert(data.substr(1,data.length));
					    }
			});
		}
	});
	
	//角色分配弹出模态框事件
	$('#userRoleModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var type = button.data('type') ;
		var modal = $(this);
		if(type=="addRoleToUser")
		{
			modal.find('.modal-title').text("权限分配");
			$('#addroletouser').text("确认权限分配");
			$('#addroletouser').attr("operatetype","addRoleToUser");
			$('#addroletouser').show();
			
			$('#addnum').val(button.data('addnum') );
			$('#addroleid').val(button.data('roleid') );
			$('#addrolename').val(button.data('rolename') );
			$('#addstaffid').val(button.data('staffid') );
			$('#adduserroleid').val(button.data('userroleid') );
		    $('#addroletype').val(button.data('roletype'));
		    $('#addremark').val(button.data('remark'));
		}else if(type=="delete")
		{
			modal.find('.modal-title').text("取消权限");
			$('#addroletouser').attr("operatetype","delete");
			$('#addroletouser').text("确认取消权限");
			$('#addroletouser').show();
			
			$('#addnum').val(button.data('addnum') );
			$('#addrolename').val(button.data('rolename') );
			$('#addstaffid').val(button.data('staffid') );
			$('#adduserroleid').val(button.data('userroleid') );
		    $('#addroletype').val(button.data('roletype'));
		}
	});
	
	//角色分配的提交动作
	$('#addroletouser').click(function(){
		if($('#addroletouser').attr("operatetype")=='addRoleToUser')
		{
			if($('#addroleid').val()==null||$('#addroleid').val()=='')
			{
				alert("角色ID不能为空");
				return false;
			}
			if($('#addstaffid').val()==null||$('#addstaffid').val()=='')
			{
				alert("员工ID不能为空");
				return false;
			}
			
			$.post("./addroletouseritem",{
				"roleid":$('#addroleid').val(),
				"addstaffid":$('#addstaffid').val(),
				"rolename":$('#addrolename').val(),
				"remark":$('#addremark').val()
			},
			function(data){
					    if(data.substr(0,1)=='0')
					    {
					    	alert(data.substr(1,data.length));
					    	$('#userRoleModal').modal('hide');
					    	//列表变更
					    	$('#hasrolelist table').bootstrapTable('insertRow', {
				                index: 0,
				                row: {
				                    '序号': "new",
				                    '用户编码':$('#addstaffid').val(),
				                    '角色名称':$('#addrolename').val(),
				                    '角色类型':  $('#addroletype').find("option:selected").text()
				                }
				            });
					    	var vals = "["+$('#addnum').val()+"]";
					    	$('#norolelist table').bootstrapTable('remove', {
					    		field: '序号',
					    		values: vals
				            });
					    }else{
					    	alert(data.substr(1,data.length));
					    }
			});
		}else if($('#addroletouser').attr("operatetype")=='delete')
		{
			if($('#adduserroleid').val()==null||$('#adduserroleid').val()=='')
			{
				alert("用户角色ID不能为空");
				return false;
			}
			
			$.post("./delroletouseritem",{
				"userroleid":$('#adduserroleid').val(),
				"rolename":$('#addrolename').val(),
				"remark":$('#addremark').val()
			},
			function(data){
					    if(data.substr(0,1)=='0')
					    {
					    	alert(data.substr(1,data.length));
					    	$('#userRoleModal').modal('hide');
					    	//列表变更
					    	$('#norolelist table').bootstrapTable('insertRow', {
				                index: 0,
				                row: {
				                    '序号': "del",
				                    '角色名称':  $('#addrolename').val(),
				                    '角色类型':  $('#addroletype').find("option:selected").text(),
				                    '备注':'已删除'
				                }
				            });
					    	var vals = "["+$('#addnum').val()+"]";
					    	$('#hasrolelist table').bootstrapTable('remove', {
					    		field: '序号',
					    		values: vals
				            });
					    }else{
					    	alert(data.substr(1,data.length));
					    }
			});
		}
	});
});