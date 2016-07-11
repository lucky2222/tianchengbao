$(function(){
	/*
	 * 新增菜单
	 */
	$('#addMenu').click(function(){
		$.ajax({
	          url: './savemenu',
	          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	          dataType: "html",
	          type: "POST",
	          beforeSend:function(xhr){
	        	  //改按钮为只读，保存中
	          },
	          data: {
	        	  "parentid" : encodeURIComponent($('#parentmenu_hidden_value').val()),
	        	  "menuname": encodeURIComponent($('#addmenuname').val()),
	        	  "menufile":$('#addmenufile').val(),
	        	  "functionright": encodeURIComponent($('#addfunctionright').val()),
	        	  "sortnum":$('#addsortnum').val()
	          },
	          success: function( data ) {
	        		if(data=="ok")
	        		{
	        			goPageNum(1);
	        		}else{
	        			alert("新增菜单错误，请联系管理员.")
	        		}
	        		//判断返回结果，调用界面刷新
	        	}
	        	//改按钮为可用，保存完成
	        });
	});
	
	//更新面板的数据自动填写
	$('#updateModal').on('show.bs.modal', function (event) {
		 var button = $(event.relatedTarget);
		 var menuname = button.data('menuname') ;
		 var pid = button.data('pid') ;
		 var pname = button.data('pname') ;
		 var menufile = button.data('menufile') ;
		 var func = button.data('func') ;
		 var sortnum = button.data('sortnum') ;
		 var upmenuid = button.data('menuid') ;
		 var modal = $(this);
		 modal.find('.modal-body #upparentmenu').val(pname);
		 modal.find('.modal-body #upparentmenu_hidden_value').val(pid);
		 modal.find('.modal-body #upmenuname').val(menuname);
		 modal.find('.modal-body #upmenufile').val(menufile);
		 modal.find('.modal-body #upfunctionright').val(func);
		 modal.find('.modal-body #upsortnum').val(sortnum);
		 modal.find('.modal-body #upmenuid').val(upmenuid);
	});
	
	$('#upMenu').click(function(){
		$.ajax({
	          url: './updatemenu',
	          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	          dataType: "html",
	          type: "POST",
	          beforeSend:function(xhr){
	        	  //改按钮为只读，保存中
	          },
	          data: {
	        	  "menuid":$('#upmenuid').val(),
	        	  "parentid" : encodeURIComponent($('#upparentmenu_hidden_value').val()),
	        	  "menuname": encodeURIComponent($('#upmenuname').val()),
	        	  "menufile":$('#upmenufile').val(),
	        	  "functionright": encodeURIComponent($('#upfunctionright').val()),
	        	  "sortnum":$('#upsortnum').val()
	          },
	          success: function( data ) {
	        		if(data=="ok")
	        		{
	        			goPageNum(1);
	        		}else{
	        			alert("更新菜单错误，请联系管理员.")
	        		}
	        		//判断返回结果，调用界面刷新
	        	}
	        	//改按钮为可用，保存完成
	        });
	});
	
	//删除菜单确认
	$('#deleteModal').on('show.bs.modal', function (event) {
		 var button = $(event.relatedTarget);
		 var menuname = button.data('menuname') ;
		 var upmenuid = button.data('menuid') ;
		 var modal = $(this);
		 modal.find('.modal-body #delmenuname').val(menuname);
		 modal.find('.modal-body #delmenuid').val(upmenuid);
		 
	});
	
	$('#delMenu').click(function(){
		$.ajax({
	          url: './delmenu',
	          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	          dataType: "html",
	          type: "POST",
	          beforeSend:function(xhr){
	        	  //改按钮为只读，保存中
	          },
	          data: {
	        	  "menuid":$('#delmenuid').val()
	          },
	          success: function( data ) {
	        		if(data=="ok")
	        		{
	        			goPageNum(1);
	        		}else{
	        			alert("删除菜单错误，请联系管理员.")
	        		}
	        		//判断返回结果，调用界面刷新
	        	}
	        	//改按钮为可用，保存完成
	        });
	});
});