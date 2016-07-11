function tableinit(el){
	if(window.localStorage){
		var hidefield = localStorage.getItem($(el).closest("#panel_ajax_page").find(".table.table-hover").attr('id')+".hidefield");//获取隐藏列的值
		if(hidefield!=null)
		{
			var fields = hidefield.split(",");
			for(var i=0;i<fields.length;i++)
			{
				$(el).closest("#panel_ajax_page").find(".table.table-hover").bootstrapTable("hideColumn",fields[i]);
			}
		}
	}
	//直接更换页码
	$('#topagenum').bind('keypress',function(event){
    	if(event.keyCode == "13")    
        {
    		goPageNum($(this),$(this).val());
    		return false;
        }
     });
	//升序排序

	$('th.sorting_asc_disabled,th.sorting_desc').click(function(){
		$(this).closest("#panel_ajax_page").find("#hidden_ordercondition").val("&orderby="+$(this).data('ordervalue')+"|asc");
		goPageNum($(this),'1');
	});
	//降序排序
	$('th.sorting_desc_disabled,th.sorting_asc').click(function(){
		$(this).closest("#panel_ajax_page").find("#hidden_ordercondition").val("&orderby="+$(this).data('ordervalue')+"|desc");
		goPageNum($(this),'1');
	});
	//隐藏列
	$('#panel_ajax_page').on('column-switch.bs.table', function (e, field, checked) {
		
		var temphidefield = "";
		 if(checked)//从隐藏列中去掉此字段
	     {
			var hidefield = localStorage.getItem($(this).closest("#panel_ajax_page").find(".table.table-hover").attr('id')+".hidefield");//获取隐藏列的值
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
	    	//新增隐藏列
	    	var hidefield = localStorage.getItem($(this).closest("#panel_ajax_page").find(".table.table-hover").attr('id')+".hidefield");//获取隐藏列的值
			if(hidefield!=null)
			{
	    		temphidefield = hidefield+","+field;
			}else{
				temphidefield =field;
			}
	    }
		localStorage.setItem($(this).closest("#panel_ajax_page").find(".table.table-hover").attr('id')+".hidefield",temphidefield);
    });
    
	//注册每页显示数更改事件	
	$('#perpagenum').change(function(){
		goPageNum($(this),'1');
	});
}

function getPage(el,url,paramstr)
{
	var ajax_part_id = $(el).closest("#panel_ajax_page").attr("ajax_part_id");
	$.get(url,paramstr,
			  function(data){
				$(el).closest("#panel_ajax_page"+" #"+ajax_part_id).html(data);
			    tableinit(el);
	});
}

function refreshPage(el)
{
	var num = $(el).closest("#panel_ajax_page").find("#topagenum").val();
	goPageNum(el,num);
}

function goPageNum(el,num)
{
	var condition=$(el).closest("#panel_ajax_page").find('#hidden_condition').val();
	var perpagenum =$(el).closest("#panel_ajax_page").find('#perpagenum').find("option:selected").text();
	var ordercondition =$(el).closest("#panel_ajax_page").find('#hidden_ordercondition').val();
	
	getPage(el,$(el).closest("#panel_ajax_page").attr('actionurl'),encodeURI(encodeURI("topagenum="+num+"&hidden_condition="+condition
			+"&perpagenum="+perpagenum+ordercondition)));
}
