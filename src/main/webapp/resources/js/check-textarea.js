//校验textarea

function checkLen(linestr, len)
{
	if (linestr.length > len)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function getIndexNum(linestr, len)
{
	if (linestr.length > len)
	{
		// 超长
		var lastsplit = linestr.lastIndexOf(" ");
		var lastsplit1 = linestr.lastIndexOf(",");
		var lastsplit2 = linestr.lastIndexOf(".");
		var lastsplit3 = linestr.lastIndexOf("[");
		var lastsplit4 = linestr.lastIndexOf("]");
		var lastsplit5 = linestr.lastIndexOf("{");
		var lastsplit6 = linestr.lastIndexOf("}");
		if (lastsplit1 > lastsplit)
		{
			lastsplit = lastsplit1;
		}
		if (lastsplit2 > lastsplit)
		{
			lastsplit = lastsplit2;
		}
		if (lastsplit3 > lastsplit)
		{
			lastsplit = lastsplit3;
		}
		if (lastsplit4 > lastsplit)
		{
			lastsplit = lastsplit4;
		}
		if (lastsplit5 > lastsplit)
		{
			lastsplit = lastsplit5;
		}
		if (lastsplit6 > lastsplit)
		{
			lastsplit = lastsplit6;
		}

		if (lastsplit > 0)
		{
			temp = linestr.substr(0, lastsplit);
			if (checkLen(temp, len))
			{
				return getIndexNum(temp, len);
			}
			else
			{
				return temp.length;
			}
		}
		else
		{
			return linestr.length;
		}
	}
	else
	{
		return linestr.length;
	}
}

function changeLine(lineinfo, len, spec)
{
	var retstr = "";
	tempstr = lineinfo;
	do
	{
		if (spec != null && spec > 0)
		{
			ret = getIndexNum(tempstr, len - spec);
			spec = 0;
		}
		else
		{
			ret = getIndexNum(tempstr, len);
		}
		if (ret > 0)
		{
			retstr = retstr + tempstr.substr(0, ret) + "\n";
			tempstr = tempstr.substr(ret);
		}
	} while (tempstr.length > 0)

	return retstr;
}

function doChangeStyleFirst(content, len)
{
	var dst = '';
	// 默认每行35字符
	if (len == null || len <= 0)
	{
		len = 35;
	}
	var contents = content.value.split("\n");
	for (var i = 0; i < contents.length; i++)
	{
		if (contents[i].length > len)
		{
			dst = dst + changeLine(contents[i], len);
		}
		else if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '')
		{

		}
		else
		{
			dst = dst + contents[i] + "\n";
		}
	}
	var lastline = dst.lastIndexOf("\n");
	dst = dst.substr(0, lastline);
	content.value = dst;

	contents = dst.split("\n");
	var retstr = "";
	for (var i = 0; i < contents.length; i++)
	{
		if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '')
		{
			continue;
		}
		else
		{
			retstr = retstr + contents[i].replace(/(^\s*)|(\s*$)/g, "");
		}
		if (i < contents.length - 1)
		{
			retstr = retstr + "\n";
		}
	}
	content.value = retstr;
}

function doCheck(content, len, spec)
{
	var dst = '';
	// 默认每行35字符
	if (len == null || len <= 0)
	{
		len = 35;
	}
	// 首次排序，不检查特殊字符
	doChangeStyleFirst(content, len);
	var contents = content.value.split("\n");
	for (var i = 0; i < contents.length; i++)
	{
		if (i == 4)
		{
			templen = len - spec;
		}
		else
		{
			templen = len;
		}
		if (contents[i].length > templen)
		{
			if (i == 4)
			{
				dst = dst + changeLine(contents[i], len - spec, spec);
			}
			else
			{
				dst = dst + changeLine(contents[i], len);
			}

		}
		else if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '')
		{

		}
		else
		{
			dst = dst + contents[i] + "\n";
		}
	}
	var lastline = dst.lastIndexOf("\n");
	dst = dst.substr(0, lastline);
	content.value = dst;

	contents = dst.split("\n");
	var retstr = "";
	for (var i = 0; i < contents.length; i++)
	{
		if (contents[i].length > len)
		{
			alert("此行数据超长：" + contents[i]);
		}
		if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '')
		{
			continue;
		}
		else
		{
			retstr = retstr + contents[i].replace(/(^\s*)|(\s*$)/g, "");
		}
		if (i < contents.length - 1)
		{
			retstr = retstr + "\n";
		}
	}
	content.value = retstr;

	var chs = dst.match(/[^\x00-\x7f]+/g);
	if (chs != null && chs != '')
	{
		alert("包含非法字符：" + chs);
		return;
	}
	chs = dst.match(/[\x5c]+/g);
	if (chs != null && chs != '')
	{
		alert("包含非法字符：" + chs);
		return;
	}
	chs = dst.match(/[\x09]+/g);
	if (chs != null && chs != '')
	{
		alert("包含非法字符：" + chs);
		return;
	}
}

// 提交
function doCheckSubmit(content, len, spec)
{
	var dst = '';
	var isSuccess = true;
	// 默认每行35字符
	if (len == null || len <= 0)
	{
		len = 35;
	}
	// 首次排序，不检查特殊字符
	doChangeStyleFirst(content, len);
	var contents = content.value.split("\n");
	for (var i = 0; i < contents.length; i++)
	{
		if (i == 4)
		{
			templen = len - spec;
		}
		else
		{
			templen = len;
		}
		if (contents[i].length > templen)
		{
			if (i == 4)
			{
				dst = dst + changeLine(contents[i], len - spec, spec);
			}
			else
			{
				dst = dst + changeLine(contents[i], len);
			}

		}
		else if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '')
		{

		}
		else
		{
			dst = dst + contents[i] + "\n";
		}
	}
	var lastline = dst.lastIndexOf("\n");
	dst = dst.substr(0, lastline);
	content.value = dst;

	contents = dst.split("\n");
	var retstr = "";
	for (var i = 0; i < contents.length; i++)
	{
		if (contents[i].length > len)
		{
			isSuccess = false;
		}
		if (contents[i].replace(/(^\s*)|(\s*$)/g, "") == '')
		{
			continue;
		}
		else
		{
			retstr = retstr + contents[i].replace(/(^\s*)|(\s*$)/g, "");
		}
		if (i < contents.length - 1)
		{
			retstr = retstr + "\n";
		}
	}
	content.value = retstr;

	var chs = dst.match(/[^\x00-\x7f]+/g);
	if (chs != null && chs != '')
	{
		isSuccess = false;
	}
	chs = dst.match(/[\x5c]+/g);
	if (chs != null && chs != '')
	{
		isSuccess = false;
	}
	chs = dst.match(/[\x09]+/g);
	if (chs != null && chs != '')
	{
		isSuccess = false;
	}
	return isSuccess;
}

function checkSaveCorrect()
{
	if (!doCheckSubmit(document.getElementById("ShipperDescription"), 35, 1))
	{
		alert("请检查Shipper格式");
		return false;
	}
	if (!doCheckSubmit(document.getElementById("ConfigneeDescription"), 35, 2))
	{
		alert("请检查Consignee格式");
		return false;
	}
	if (!doCheckSubmit(document.getElementById("NotifyDescription"), 35, 3))
	{
		alert("请检查Notify格式");
		return false;
	}
	if (document.getElementById("SecondNotifyDescription") != null)
	{
		if (!doCheckSubmit(document.getElementById("SecondNotifyDescription"), 35, 4))
		{
			alert("请检查SecondNotify格式");
			return false;
		}
	}

	if (!doCheckSubmit(document.getElementById("GoodsDescription"), 35, 0))
	{
		alert("请检查品名格式");
		return false;
	}
	if (!doCheckSubmit(document.getElementById("BingDanLadingBillRemark"), 35, 0))
	{
		alert("请检查货描格式");
		return false;
	}
	if (!doCheckSubmit(document.getElementById("Marks"), 26, 0))
	{
		alert("请检查唛头格式");
		return false;
	}
	return true;
}