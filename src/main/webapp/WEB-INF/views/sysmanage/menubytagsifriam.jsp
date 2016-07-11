<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title>jQuery添加删除移动列表插件 - 网站源码</title>
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/jquery.mobile-git.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/editable-listview.css">
	
	<script src="${pageContext.request.contextPath}/resources/js/jquery/2.0.0/jquery.min.js"></script>
	<script  src="${pageContext.request.contextPath}/resources/js/jquery.mobile-git.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/collapsible-patched.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/editable-listview.js"></script>
</head>

<body style="padding: 20px">

    <div style="padding: 20px">
 <p>An example of <strong>Complex Editable Listview</strong></p>
        <ul data-role="listview" data-editable="true" data-editable-type="complex" data-editable-form="editing-form" data-title="Fruits" data-empty-title="No Fruits">
            <li>
                <a>
                    <h3>Apple</h3>
                    <p><em>Shape:</em> <strong>round</strong></p>
                    <p><em>Color:</em> <strong>red</strong></p>
                </a>
            </li>
            <li>
                <a>
                    <h3>Pineapple</h3>
                    <p><em>Shape:</em> <strong>oval</strong></p>
                    <p><em>Color:</em> <strong>yellow</strong></p>
                </a>
            </li>
            <li>
                <a>
                    <h3>Orange</h3>
                    <p><em>Shape:</em> <strong>round</strong></p>
                    <p><em>Color:</em> <strong>orange</strong></p>
                </a>
            </li>
        </ul>

        <form id="editing-form" data-editable-form="true">
            <input type="text" data-item-name="fruitName" data-item-template="<h3>%%</h3>">
            <input type="text" data-item-name="fruitShape" data-item-template="<p><em>Shape:</em> <strong>%%</strong></p>">
            <input type="text" data-item-name="fruitColor" data-item-template="<p><em>Color:</em> <strong>%%</strong></p>">
            <button class="ui-btn ui-corner-all" data-add-button="true">Add</button>
            <button class="ui-btn ui-corner-all" data-clear-button="true">Clear</button>
        </form>

    </div>

</body>
</html>
