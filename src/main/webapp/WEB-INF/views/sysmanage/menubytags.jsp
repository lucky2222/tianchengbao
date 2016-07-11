<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags/" prefix="ehang"%>

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/jquery.mobile-git.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/editable-listview.css">

<script
	src="${pageContext.request.contextPath}/resources/js/jquery.mobile-git.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/collapsible-patched.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/editable-listview.js"></script>

<script type="text/javascript">
	$(function()
	{
		$('#collapsible-hx .ui-collapsible-heading')
				.click(
						function(event)
						{
							var $target = $(event.target);
							if ($target.hasClass("ui-collapsible-heading")
									|| $target.hasClass("ui-collapsible-heading-toggle"))
							{
								var isCollapse = !$(this).hasClass("ui-collapsible-heading-collapsed");

								$(this).toggleClass("ui-collapsible-heading-collapsed", isCollapse).find(
										".ui-collapsible-heading-toggle").toggleClass("ui-icon-carat-d", !isCollapse)
										.toggleClass("ui-icon-carat-r", (isCollapse || "carat-d" === "carat-r"))
										.removeClass($.mobile.activeBtnClass);

								$(this).parent().toggleClass("ui-collapsible-collapsed", isCollapse);
								$(this).next().toggleClass("ui-collapsible-content-collapsed", isCollapse).attr(
										"aria-hidden", isCollapse).trigger("updatelayout");
								// 			        this.options.collapsed = isCollapse;
								// 			        this._trigger( isCollapse ? "collapse" : "expand" );
							}
						});

	});
</script>

<div>
	<div id="collapsible-hx"
		class="ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content">
		<div data-role="header" role="banner"
			class="ui-header ui-collapsible-heading ui-bar-inherit">
			<h1
				class="ui-title ui-collapsible-heading-toggle ui-icon-carat-d ui-btn-icon-left"
				role="heading" aria-level="1">最新消息</h1>
			<button
				class="ui-btn-right  ui-btn ui-btn-a ui-btn-icon-right ui-btn-inline ui-shadow ui-corner-all ui-mini">
				Send<span style="padding-left: 0.5em; color: green;"
					class="glyphicon glyphicon-send" aria-hidden="true"></span>
			</button>
		</div>
		<div class="ui-collapsible-content ui-body-inherit"
			aria-hidden="false">
			<ehang:Ajax_Page actionurl="/message/partial_mainmessagelist"
				id="mainmessagegridforindex"></ehang:Ajax_Page>
		</div>
	</div>
</div>

<div>
	<ul id="memolist_ul" data-role="listview" data-editable="true"
		data-editable-type="complex" data-editable-form="editing-form"
		data-title="备忘录" data-empty-title="今日没有备忘记录" url="/memo/partial_memolistforindex" load="true">

<!-- 				<li><a> -->
<!-- 						<p> -->
<!-- 						<h3>Apple</h3> -->
<!-- 						</p> -->

<!-- 						<p> -->
<!-- 							<em>Shape:</em> <strong>round</strong> -->
<!-- 						</p> -->
<!-- 						<p> -->
<!-- 							<em>Color:</em> <strong>red</strong> -->
<!-- 						</p> -->
<!-- 				</a> -->
<!-- 				</li> -->
<!-- 				<li><a> -->
<!-- 						<h3>Pineapple</h3> -->
<!-- 						<p> -->
<!-- 							<em>Shape:</em> <strong>oval</strong> -->
<!-- 						</p> -->
<!-- 						<p> -->
<!-- 							<em>Color:</em> <strong>yellow</strong> -->
<!-- 						</p> -->
<!-- 				</a></li> -->
<!-- 				<li><a> -->
<!-- 						<h3>Orange</h3> -->
<!-- 						<p> -->
<!-- 							<em>Shape:</em> <strong>round</strong> -->
<!-- 						</p> -->
<!-- 						<p> -->
<!-- 							<em>Color:</em> <strong>orange</strong> -->
<!-- 						</p> -->
<!-- 				</a></li> -->
	</ul>

	<form id="editing-form" data-editable-form="true">
		<label>标题：</label> <input id="memotitle" type="text"
			data-item-name="memoName" data-item-template="<h3>%%</h3>"> <label>内容：</label>
		<textarea id="memocontent" rows="4" style="width: 100%;"
			data-item-name="memoContent"
			data-item-template="<p><em>内容:</em> <strong>%%</strong></p>"></textarea>
		<label><span class="glyphicon glyphicon-time"></span> 时间：</label><input
			id="memotime" class="datepicker" type="text"
			data-item-name="memoTime"
			data-item-template="<p><em><span class='glyphicon glyphicon-time'></span></em> <strong>%%</strong></p>">
		<button class="ui-btn ui-corner-all ui-btnul btn-success"
			data-add-button="true" onclick="fun_add_memo();">Add</button>
		<button class="ui-btn ui-corner-all ui-btnul btn-default"
			data-clear-button="true">Clear</button>
	</form>

</div>
<script type="text/javascript">
	$(function()
	{
// 		ajax_ul_init($('#memolist_ul'), '/memo/partial_memolistforindex', '');
	});

	function ajax_ul_init(el, url, param)
	{
// 		$.get(url, encodeURI(param), function(data)
// 		{
// 			el.html(data);
// 		});
		$.ajax({
			url:url,
			data:encodeURI(param),
			async:false,
			success:function(data)
			{
				el.html(data);
			}
		})
	}

	function showMsg(msgID, msgContent, orderid, isOpen)
	{
		var param =
		{
			"OrderMsgID" : msgID
		}
		var path = $.getContextPath() + "/message/updateIsRead";
		callAjax(path, param, showMsg_callback);
		if (isOpen == 1)
		{
			window.open($.getContextPath() + "/orderdetail/index/" + orderid);
		}
		ajax_page_init($("#mainmessagegridforindex"), "/message/partial_mainmessagelist", "");
	}
	function showMsg_callback(data)
	{

	}

	function fun_add_memo()
	{
		var memotitle = $('#memotitle').val();
		var memocontent = $('#memocontent').val();
		var memotime = $('#memotime').val();

		if (memotitle == null || memotitle == '')
		{
			alert('请输入标题！');
			return;
		}

		if (memocontent == null || memocontent == '')
		{
			memocontent = memotitle;
		}

		if (memotime == null || memotime == '')
		{
			alert('请录入时间！');
			return;
		}

		$.ajax(
		{
			url : '/memo/addmemo',
			data :
			{
				'notetitle' : memotitle,
				'notecontent' : memocontent,
				'remindtime' : memotime
			},
			type : 'post',
			success : function(data)
			{
				var result = JSON.parse(data);
				alert(result.msg);
				if (result.success)
				{
					//TODO
					ajax_ul_init($('#memolist_ul'), '/memo/partial_memolistforindex', '');
				}
			}
		})
	}
</script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/manager.js"></script>