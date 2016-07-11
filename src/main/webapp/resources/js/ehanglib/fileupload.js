function initFileUpload(id,actionurl,uploadpath,allowedTypes,callback,param,attachshowname)
{
	
	var fileupload= $("#"+id+"_uploader").uploadFile({
		url:actionurl,
		multiple:false,
		showAbort:true,
		showDelete:true,
		allowedTypes:allowedTypes,
		returnType:'json',
		formData: {"uploadpath":uploadpath},
		fileName:"myfile",
		maxFileCount:1,
		onSuccess:function(files, data, xhr, pd){
			$("#"+id).val(data.url);
			$("#"+attachshowname).val(files);
		},
	});
	
	return fileupload;
}