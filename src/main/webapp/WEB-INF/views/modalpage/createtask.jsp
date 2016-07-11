<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>
	<div class="form-group">
		<div class="row">
			<div class="col-md-6">
				<label for="orderid">委托编号</label>
    			<input type="text" class="form-control" id="orderid"  name="orderid"  value="${result.orderid}" >
			</div>
			<div class="col-md-6">
				<label for="limittime">完成时限</label>
    			<input type="text" class="form-control" id="limittime"  name="limittime"  value="" pattern="yyyy-MM-dd HH:mm">
			</div>
		</div>
	</div>
	
	<div class="form-group">
		<div class="row">
			<div class="col-md-12">
				<label for="tasktitle">任务名称</label>
    			<input type="text" class="form-control" id="tasktitle" name="tasktitle" value="" >
			</div>
			
		</div>
	</div>
	
	<div class="form-group">
		<div class="row">
			<div class="col-md-12">
				<label for="tasktitle">任务内容</label>
    			<textarea class="form-control" rows="5" id="taskinfo" name="taskinfo"></textarea>
			</div>
			
		</div>
	</div>
	
	<div class="form-group">
		<div class="row">
			<div class="col-md-12">
				<label for="attachid">任务附件</label>
				<cc:fileupload uploadpath="taskfile" actionurl="/upload/uploadfile" id="attachid" srcname="attachshowname" >附件上传</cc:fileupload>
			</div>
		</div>
	</div>
	
	<div class="form-group">
		<div class="row">
			<div class="col-md-6">
				<label for="orderid">接收岗位</label>
    			<cc:ehangselect groupname="rolelist" name="roleid" classname="form-control"  initvalue="1" callback="checkRole"/>
			</div>
			<div class="col-md-6">
				<label for="show_staffid">接收人</label>
    			<cc:multipleselect id="receivestaffid" name="receivestaffid" style="form-control"  showname="StaffName" valuename="Staffid" 
					initvalue="" urlref="${pageContext.request.contextPath}/sysmanage/getStaffListByRoleId" param=""/>
			</div>
		</div>
	</div>
	<script>
		function checkRole(id)
		{
			var orderid = $('#orderid').val();
			var initstaffid='';
			if(orderid!='')
			{
				$.ajax({
					  url: '/sysmanage/getStaffIdByOrderIDAndRoleID',
					  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					  data: 'orderid='+orderid+'&roleid='+id.children('option:selected').val(),
					  success:  function( data ) {
						  initstaffid=data;
						  initMultipleSelect('receivestaffid','/sysmanage/getStaffListByRoleId','StaffName','Staffid',initstaffid,'','roleid='+id.children('option:selected').val());
					  }
				});
			}else{
				initMultipleSelect('receivestaffid','/sysmanage/getStaffListByRoleId','StaffName','Staffid','','','roleid='+id.children('option:selected').val());
			}
			
		}
		
		function checkbeforecreatetask()
		{
			if($('#tasktitle').val()=='')
			{
				alert("请填写任务名称");
				return false;
			}
			if($('#receivestaffid').val()=='')
			{
				alert("请选择任务接收人");
				return false;
			}
			return true;
		}
		
		function createTask(data){
			alert('任务创建完成'+data);
			$('#limittime').val('');
			$('#tasktitle').val('');
			$('#taskinfo').val('');
			$('#attachid').val('');
			$('#attachid_err').text('');
			$('#show_receivestaffid').val('');
			$('#receivestaffid').val('');
			$('#receivestaffid_hidden_list tbody tr td input:checkbox').prop("checked",false);
			$(".ajax-upload-dragdrop").remove();
			$(".ajax-file-upload-statusbar").remove();
			initFileUpload('attachid','/upload/uploadfile','taskfile','*','','','attachshowname');
		}
		
		$('[name*="limittime"]').datetimepicker(
		{
			format : "yyyy-mm-dd hh:ii",
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-left",
			minuteStep:30
		});
	</script>
	<cc:ScriptEnd></cc:ScriptEnd>
