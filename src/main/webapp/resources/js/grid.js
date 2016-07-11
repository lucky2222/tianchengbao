/**
 * Grid分页控件方法
 */
$(function() {
	$.extend({
		/**
		 * 访问指定页面
		 * 表ID，FORM提交地址，每页显示条数，当前页面
		 */
		initGrid:function(id,actionurl,perpage,pagenum)
		{
			var grid_id = id;
			var actionurl = actionurl;
			
			
			function tableinit(){
				if(window.localStorage){
					var hidefield = localStorage.getItem(id+".hidefield");//获取隐藏列的值
					if(hidefield!=null)
					{
						var fields = hidefield.split(",");
						for(var i=0;i<fields.length;i++)
						{
							$('#'+id).bootstrapTable("hideColumn",fields[i]);
						}
					}
				}
			};
			
			$('.goPageNum').click(function(){
				location.href = encodeURI(encodeURI(actionurl+"?topagenum="+$(this).attr("pagenum")+"&"+id+"_hidden_condition="+$('#'+id+'_hidden_condition').val()+"&perpagenum="+$('#'+id+'_perpagenum').find("option:selected").text()+$('#'+id+'_hidden_ordercondition').val()));
			});
			
			function goPageNum(num)
			{
				location.href = encodeURI(encodeURI(actionurl+"?topagenum="+num+"&"+id+"_hidden_condition="+$('#'+id+'_hidden_condition').val()+"&perpagenum="+$('#'+id+'_perpagenum').find("option:selected").text()+$('#'+id+'_hidden_ordercondition').val()));
			};
			
			$('#'+id+' th.sorting_asc_disabled').click(function(){
				$('#'+id+'_hidden_ordercondition').val("&"+id+"_orderby="+$(this).data('ordervalue')+"|asc");
				goPageNum('1');
			});
			
			$('th.sorting_desc_disabled').click(function(){
				$('#'+id+'_hidden_ordercondition').val("&"+id+"_orderby="+$(this).data('ordervalue')+"|desc");
				goPageNum('1');
			});
			
			$('th.sorting_asc').click(function(){
				$('#'+id+'_hidden_ordercondition').val("&"+id+"_orderby="+$(this).data('ordervalue')+"|desc");
				goPageNum('1');
			});
			
			$('th.sorting_desc').click(function(){
				$('#'+id+'_hidden_ordercondition').val("&"+id+"_orderby="+$(this).data('ordervalue')+"|asc");
				goPageNum('1');
			});
			/**
			 * 注册每页显示数更改事件
			 */
			$('#'+id+'_perpagenum').change(function(){
				goPageNum(pagenum);
			});
			
			$('#'+id+'_topagenum').bind('keypress',function(event){
				if(event.keyCode == "13")    
	            {
					goPageNum($('#'+id+'_topagenum').val());
					return false;
	            }
			 });
			
			$('#'+id).on('column-switch.bs.table', function (e, field, checked) {
				var temphidefield = "";
				 if(checked)
			     {
					 /**
					  * 获取隐藏列的值
					  */
					var hidefield = localStorage.getItem(id+".hidefield");
					if(hidefield!=null)
					{
							var fields = hidefield.split(",");
							for(var i=0;i<fields.length;i++)
							{
								if(fields[i]=="")
								{
									continue;
								}
								if(fields[i]==field)
								{
									fields[i]="";
									continue;
								}
								temphidefield = temphidefield +","+fields[i];
							}
					}
			    }else{
			    	/**
			    	 * 新增隐藏列
			    	 */
			    	var hidefield = localStorage.getItem(id+".hidefield");//获取隐藏列的值
					if(hidefield!=null)
					{
			    		temphidefield = hidefield+","+field;
					}else{
						temphidefield =field;
					}
			    }
				localStorage.setItem(id+".hidefield",temphidefield);
		    });
			/**
			 * 选中每页显示数
			 */
			$('#'+id+'_perpagenum').val(perpage);
		/**
		 * 表格初始化
		 */
		tableinit();
		}
	});
});