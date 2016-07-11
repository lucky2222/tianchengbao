$(function() {

		});

function ExportManifestFile(type) {

	var orderidlist = new Array();

	$('input[name="cb_orderid"]:checked').each(function() {
				orderidlist.push($(this).val());
			});

	if (orderidlist.length > 0) {

		var orderids="";
		for (var i = 0; i < orderidlist.length; i++) {

            if (i == 0)
                orderids += orderidlist[i];
            else
                orderids += "_" + orderidlist[i];
        }
        
        window.location.href = '/exportmanifestfile/switchfunction?type='+type+'&&orderidlist=' + orderids;
		/*
		 * $.ajax({ type : "POST", url : $.getContextPath() +
		 * "/exportmanifestfile/switchfunction", data : { orderidlist :
		 * orderidlist, type : type }, async : false, traditional : true, error :
		 * function(request) { alert("出错了"); }, success : function(data) {
		 *  }
		 * 
		 * });
		 */

	} else {
		alert("请选择数据");
	}

}