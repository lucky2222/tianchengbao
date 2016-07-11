$(function() {
			$("[name='searchETD_Start']").datepicker({
				dateFormat : "yy/mm/dd"
					// 在这里进行插件的属性设置

				});
			$("[name='searchETD_End']").datepicker({
				dateFormat : "yy/mm/dd"
					// 在这里进行插件的属性设置

				});

		});

function hoversuspendedremark(obj) {
	$(obj).popover({
				trigger : 'hover',
				placement : 'top',
				content : $(obj).text()
			});
}

function hovershutoutreason(obj) {

	$(obj).popover({
				trigger : 'hover',
				placement : 'top',
				content : $(obj).text()
			});
}
