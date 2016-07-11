/**
 * 上传扫描件
 */
//文件上传
function uploadDzScan(fileId,LadingbillID){
		 
		      //上传文件
		      var fileElementId=fileId;
		      if($("#"+fileElementId+"").val()==""||$("#"+fileElementId+"").val()==null){
		    	  alert("请选择上传文件")
		    	  return ;
		      }
		    $.ajaxFileUpload({
		    	
		        url:$.getContextPath() + "/orderfinance/uploadTdldScan",//处理图片脚本
		        secureuri :false,
		        fileElementId :fileElementId,//file控件id
		        data:{"fileElementId":fileElementId,"LadingbillID":LadingbillID},
		        dataType:'JSON',
		        success : function(data) {
		        	var list=JSON.parse(data)
		        	alert(list.result)
		        	$("#findList").click();
				},
		        error: function(data, status, e){
		            alert(e);
		        }
		});
		  }