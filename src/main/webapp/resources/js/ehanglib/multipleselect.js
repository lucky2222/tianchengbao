function initMultipleSelect(id,urlref,showname,valuename,initvalue,callback,param)
{
	/**
	 * 请求初始化页面
	 */
	$.ajax({
		  url: urlref,
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		  data: encodeURI(encodeURI(param))+'&id='+id+'&showname='+showname+'&valuename='+valuename,
		  dataType: 'html',
		  success:  function( data ) {
			$('#'+id+'_body').html(data);
			//初始化
			if(initvalue!='')
			{
				initparam = initvalue.split(',');
				var rowname = "";
				$.each($('#'+id+'_hidden_list tbody tr'),function(idx,item){
					if($(this).attr("rowname")==undefined)
					{
						return true;
					}
					for(var num =0;num<initparam.length;num++)
					{
						if($(this).attr("rowvalue")==initparam[num])
						{
							rowname = rowname +$(this).attr("rowname")+",";
							var obj = $(this).find('td input:checkbox');
							obj.prop("checked",true);
							continue;
						}
					}
		    	});
				if(rowname.length>0&&(rowname.lastIndexOf(',')==rowname.length-1))
				{
					rowname = rowname.substring(0,rowname.length-1);
				}
				$('#show_'+id).val(rowname);
				$('#'+id).val(initvalue);
			}else{
				$('#show_'+id).val('');
				$('#'+id).val('');
			}
			//下拉框展示事件
			$('#show_'+id).focus(function() {
				$('#'+id+'_hidden_list').show();
			});
			$('#'+id+'_hidden_list').hide();
			//下拉框取值
			$('#'+id+'_hidden_list thead tr th').on('click', function (e) {
				var rowname = "";
				var rowvalue = "";
				$.each($('#'+id+'_hidden_list tbody tr td input:checked'),function(idx,item){
					if($(this).closest("tr").attr("rowname")==undefined)
					{
						return true;
					}
					rowname = rowname +$(this).closest("tr").attr("rowname")+",";
					rowvalue = rowvalue + $(this).closest("tr").attr("rowvalue")+",";
		    	});
				if(rowname.length>0&&(rowname.lastIndexOf(',')==rowname.length-1))
				{
					rowname = rowname.substring(0,rowname.length-1);
				}
				if(rowvalue.length>0&&(rowvalue.lastIndexOf(',')==rowvalue.length-1))
				{
					rowvalue = rowvalue.substring(0,rowvalue.length-1);
				}
				$('#show_'+id).val(rowname);
				$('#'+id).val(rowvalue);
				$('#'+id+'_hidden_list').hide();
			});
			
			//下拉框单选框选择
			$('#'+id+'_hidden_list tbody tr').on('click', function (e) {
				var obj = $(this).find('td input:checkbox');
				if(obj.prop("checked")==true)
				{
					obj.prop("checked",false);
				}else{
					obj.prop("checked",true);
				}
				var allcheck=true;
				$.each($('#'+id+'_hidden_list tbody tr td input:checkbox'),function(idx,item){
					if($(this).prop("checked")==false)
					{
						allcheck = false;
					}
				});
				$('#'+id+'_hidden_list thead tr td input:checkbox').prop("checked",allcheck);
				
			});
			//全选，全取消
			$('#'+id+'_hidden_list thead tr th input:checkbox').on('click', function (e) {
				if($(this).prop("checked")==true)
				{
					$('#'+id+'_hidden_list tbody tr td input:checkbox').prop("checked",true);
				}else{
					$('#'+id+'_hidden_list tbody tr td input:checkbox').prop("checked",false);
				}
			});
			
			/**
			 * 默认选择第一个
			 */
			$(document).click(function(){
				if(!$('#'+id+'_hidden_list').is(':hidden'))
				{
					if($(event.target).closest("table").attr('id')!=id+'_hidden_list'&&$(event.target).attr('id')!='show_'+id)
					{
						$('#'+id+'_hidden_list thead tr th').trigger('click');
					}
				}
			});
		  }
		});
}