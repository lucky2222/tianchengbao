function $DE(id) {
	return document.getElementById(id);
}

/**
 * js版UrlEncode
 */
String.prototype.UrlEncode = function() 
{ 
	var str = this; 
	str = str.replace(/./g,function(sHex) 
	{ 
		window.EnCodeStr = ""; 
		window.sHex = sHex; 
		window.execScript('window.EnCodeStr=Hex(Asc(window.sHex))',"vbscript"); 
		return window.EnCodeStr.replace(/../g,"%$&"); 
	}); 
	return str; 
} 

/**
 * JS版超链接拼接
 */
function TUI_LINK_APPEND(href,varName,val)
{
	var link="";
	if(href.indexOf("?")>0)
	{
		if(href.substring(href.length-1, href.length)=="?")
		{
			link=href + varName + '=' + val;
		}
		if(href.substring(href.length-1, href.length)=="&")
		{
			link=href + varName + '=' + val;
		}
		else
		{
			link=href + "&" + varName + '=' + val;
		}
	}
	else
	{
		link=href + "?" + varName + '=' + val;
	}
	return link;
}
