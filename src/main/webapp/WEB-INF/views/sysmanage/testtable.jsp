<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>
<%@ taglib uri="/WEB-INF/taglib/ehangtaglib.tld" prefix="cc"%>

<ehang:Main>
	<form action="/upload/uploadfile" method="post">
		<div class="row">
			<div class="col-sm-3">
				<ehang:Upload uploadpath="/upload" id="image1"
					allowedTypes="gif,jpg">文件上传测试</ehang:Upload>
			</div>
			<label for="receive_unitid" class="col-sm-2">测试auto</label>
			<div class="col-sm-4">
				<ehang:AutoComplete id="test" valuefieldid="staffname " minChars="2"
					showfieldid="staffname " urlref="/summary/staffnamebydepartname"
					callback="test">
				</ehang:AutoComplete>
			</div>
			<div class="col-sm-2">
				<ehang:StaticSelect initurl="/orderfee/getfeetypeids"
					id="add_feetypeid" params="param=pay" placeholder="费用类型"
					classstyle="form-control input-sm">
				</ehang:StaticSelect>
			</div>
		</div>

		<div class="row">
			<input type="email" class="form-control input-sm"> <label
				id="tdd"></label>
		</div>
		
		<cc:autocomelete id="testrole"  name ="rolemap" placeholder="测试auto"/>
		<cc:ehangselect groupname="test" name="state" initvalue="1"/>
		<input type="submit" id="dosubmit" value="提交">
	</form>
	<script>
		function test(name, value, tr)
		{
			alert(name + "-->" + value);
			alert($(tr).html());
		}
	</script>

	<script type="text/javascript">
		// 			function fun_fun(obj)
		// 			{
		// 				$('#tdd').html(obj.value);
		// 				alert(obj.type);
		// 			}

		$(function()
		{
			$('input').on(
			{
				"input propertychange" : function()
				{
					var type = $(this).attr('type');
					var val = $(this).val();

					switch (type)
					{
						case 'email':
							break;
						default:
							break;
					}
					$('#tdd').html($(this).val());
				},

				"blur" : function()
				{
					$('#tdd').html('');
				}

			});
		});
	</script>
</ehang:Main>
