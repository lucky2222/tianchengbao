$(function(){
	$('[data-toggle="popover"]').popover();
	//测试SQL语句
	$('#testSQL').click(function(){
		var pattern="#\\{.*?\\}";
		var sqlcode= $('#addsqlcode').val();
		var sqlline = sqlcode.split("\n");
		var paramstr = 'sqlcode='+encodeURI(encodeURI($("#addsqlcode").val().replace(/\#\{/g,"``")));
		for(i=0;i<sqlline.length;i++)
		{
			var param = sqlline[i].match(pattern);
			if(param!=null)
			{
				var paramid = param[0].replace("#{","").replace("}","");
				//alert(paramid+"="+$('#param_'+paramid).val());
				paramstr = paramstr+'\&'+paramid+'='+encodeURI(encodeURI($('#param_'+paramid).val()));
			}
		}
		$.get("./testsqlbysqlcode",paramstr,
				  function(data){
				    $('#testresult').html(data);
		});
	});
	//SQL语句变量分析
	$('#addsqlcode').change(function(){
		var pattern="#\\{.*?\\}";
		var sqlcode= $('#addsqlcode').val();
		
		var sqlline = sqlcode.split("\n");
		$('#ParamInfo').html("");
		for(i=0;i<sqlline.length;i++)
		{
			var param = sqlline[i].match(pattern);
			if(param!=null)
			{
				var paramid = param[0].replace("#{","").replace("}","");
				$('#ParamInfo').append('<div class="form-group"><div class="input-group"><div class="input-group-addon">'+paramid+'：</div><input type="text" class="form-control" id="param_'+paramid+'" placeholder="'+paramid+'"></div></div>');
			}
		}
		$('#addsqlcode').attr("rows",sqlline.length);
	});
	//SQL语句的保存
	$('#addSQL').click(function(){
		if($('#addSQL').attr("operatetype")=='add')
		{
			$.post("./addcodecode",{
				"codepath":$('#addcodepath').val(),
				"codeid":$('#addcodeid').val(),
				"codetype":$('#addcodetype').val(),
				"sqlcode":encodeURI(encodeURI($('#addsqlcode').val().replace(/\#\{/g,"``"))),
				"remark":$('#addremark').val()
			},
			function(data){
					    if(data.substr(0,1)=='0')
					    {
					    	alert(data.substr(1,data.length));
					    	$('#myModal').modal('hide');
					    	//列表变更
					    	$('#sqllist').bootstrapTable('insertRow', {
				                index: 0,
				                row: {
				                    '序号': "new",
				                    '表名称':$('#addcodepath').val(),
				                    'SQL名称':$('#addcodeid').val(),
				                    'SQL类型':$('#addcodetype').val(),
				                    'SQL内容':$('#addsqlcode').val(),
				                    '更新时间':$('#addsqlcode').val(),
				                    '备注':$('#addremark').val()
				                }
				            });
					    }else{
					    	alert(data.substr(1,data.length));
					    }
			});
		}else if($('#addSQL').attr("operatetype")=='update')
		{
			$.post("./updatecodecode",{
				"codepath":$('#addcodepath').val(),
				"codeid":$('#addcodeid').val(),
				"codetype":$('#addcodetype').val(),
				"sqlcode":encodeURI(encodeURI($('#addsqlcode').val().replace(/\#\{/g,"``"))),
				"remark":$('#addremark').val()
			},
			function(data){
				if(data.substr(0,1)=='0')
			    {
			    	alert(data.substr(1,data.length));
			    	$('#myModal').modal('hide');
			    	//列表变更
			    	$('#sqllist').bootstrapTable('updateRow', {
			    		index: ($('#addcount').val()-1),
		                row: {
		                	'序号': "upd",
		                	 'SQL类型':$('#addcodetype').val(),
		                	 'SQL内容':$('#addsqlcode').val(),
			                 '备注':$('#addremark').val()
		                }
		            });
			    }else{
			    	alert(data.substr(1,data.length));
			    }
			});
		}else if($('#addSQL').attr("operatetype")=='del')
		{
			$.post("./delcodecode",{
				"codepath":$('#addcodepath').val(),
				"codeid":$('#addcodeid').val(),
				"remark":$('#addremark').val()
			},
			function(data){
				if(data.substr(0,1)=='0')
			    {
			    	alert(data.substr(1,data.length));
			    	$('#myModal').modal('hide');
			    	$('#sqllist').bootstrapTable('updateRow', {
			    		index: ($('#addcount').val()-1),
		                row: {
		                    '序号': "del",
		                    '表名称':"",
		                    'SQL名称':"",
		                    'SQL类型':"",
		                    'SQL内容':"",
		                    '更新时间':"",
		                    '备注':'已删除'
		                }
		            });
			    }else{
			    	alert(data.substr(1,data.length));
			    }
			});
		}
	});
	//配置SQL的初始化操作
	$('#myModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var type = button.data('type') ;
		var modal = $(this);
		$('#testresult').html("");
		if(type=="add")
		{
			modal.find('.modal-title').text("新建SQL对象");
			$('#testSQL').show();
			$('#addSQL').text("确认新建SQL对象");
			$('#addSQL').attr("operatetype","add");
			$('#addSQL').show();
			$('#ParamInfo').html("");
			$('#addcodepath').val("");
		    $('#addcodeid').val("");
		    $('#addcodetype').val("");
		    $('#addsqlcode').val("");
		}else if(type=="update")
		{
			modal.find('.modal-title').text("更新SQL对象");
			$('#testSQL').show();
			$('#addSQL').text("确认更新SQL对象");
			$('#addSQL').attr("operatetype","update");
			$('#addSQL').show();
			$.getJSON("./getsqlbykey",{"codepath":button.data('codepath'),"codeid":button.data('codeid')},
					  function(data){
						$('#addcount').val(button.data('count') );
					    $('#addcodepath').val(data.codepath);
					    $('#addcodeid').val(data.codeid);
					    $('#addcodetype').val(data.codetype);
					    $('#addsqlcode').val(decodeURIComponent(data.sqlcode).replace(/\+/g," "));
					    $('#addremark').val(decodeURIComponent(data.remark).replace(/\+/g," "));
					    $('#addsqlcode').change();
			});
		}else if(type=="del")
		{
			modal.find('.modal-title').text("删除SQL对象");
			$('#testSQL').hide();
			$('#addSQL').attr("operatetype","del");
			$('#addSQL').text("确认删除SQL对象");
			$.getJSON("./getsqlbykey",{"codepath":button.data('codepath'),"codeid":button.data('codeid')},
					  function(data){
						$('#addcount').val(button.data('count') );
					    $('#addcodepath').val(data.codepath);
					    $('#addcodeid').val(data.codeid);
					    $('#addcodetype').val(data.codetype);
					    $('#addsqlcode').val(decodeURIComponent(data.sqlcode).replace(/\+/g," "));
					    $('#addremark').val(decodeURIComponent(data.remark).replace(/\+/g," "));
					    $('#addsqlcode').change();
			});
		}
	});
	
	//表头配置初始化
	$('#fieldModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var codepath = button.data('codepath') ;
		var codeid = button.data('codeid') ;
		$('#addSQLHead').attr("operatetype",codepath+"."+codeid);
		
		$('#HeadInfo').html('<div class="col-sm-4">字段</div><div class="col-sm-4">序列</div><div class="col-sm-2">选择</div>');
		$.getJSON("./getsqlheadbykey",{"codepath":button.data('codepath'),"codeid":button.data('codeid')},
				  function(data){
					$(data).each(function(index) {
						var val = data[index];
						$('#HeadInfo').append('<div class="form-group"><div class="col-sm-4"><div class="input-group"><div class="input-group-addon">'+val.fieldid+'</div><input type="text" class="form-control" id="head_'+val.fieldid+'" value="'+decodeURIComponent(val.fieldname)+'"></div></div><div class="col-sm-4"><input class="form-control" id="sort_'+val.fieldid+'" value="'+val.ordernum+'"></div><div class="col-sm-2"><label><input type="checkbox" '+val.ischeck+' id="display_'+val.fieldid+'">选择配置</label></div></div>');
					});
		});
	});
	
	//表头配置
	$('#addSQLHead').click(function(){
		var paramstr="[";
		$("#HeadInfo .input-group-addon").each(function(index) {
			var headid = "head_"+$(this).text();
			var sortid = "sort_"+$(this).text();
			var displayid = "display_"+$(this).text();
			if($("#"+displayid).prop("checked")==true)
			{
				paramstr = paramstr+"{";
				paramstr = paramstr+"\"fieldid\":\""+$(this).text()+"\",";
				paramstr = paramstr+"\"sortnum\":\""+$("#"+sortid).val()+"\",";
				paramstr = paramstr+"\"fieldname\":\""+encodeURI(encodeURI($("#"+headid).val()))+"\"},";
			}
		});
		if(paramstr.substring(paramstr.length-1,paramstr.length)==',')
		{
			paramstr = paramstr.substring(0,paramstr.length-1);
		}
		paramstr = paramstr+"]";
		
		$.post("./configtablehead",{
			"sqlref":$('#addSQLHead').attr("operatetype"),
			"items":paramstr
		},
		function(data){
			if(data.substr(0,1)=='0')
		    {
		    	alert(data.substr(1,data.length));
		    	$('#myModal').modal('hide');
		    	location.reload();
		    }else{
		    	alert(data.substr(1,data.length));
		    }
		});
		
	});
});