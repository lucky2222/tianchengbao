mui.plusReady(function() {
	var first = null;
	mui.back = function() {
		var list = plus.webview.currentWebview();
		if (list!=null) {
			list.close();
		} else {
			//首次按键，提示‘再按一次退出应用’
			if (!first) {
				first = new Date().getTime();
				mui.toast('再按一次退出应用');
				setTimeout(function() {
					first = null;
				}, 1000);
			} else {
				if (new Date().getTime() - first < 1000) {
					plus.runtime.quit();
				}
			}
		}
	};
});

function monitor_link(listname)
{
	mui(listname).on('tap', 'a', function() {
		//mui.toast(this.getAttribute('href'));
		if (this.getAttribute('href') == "#" || this.getAttribute('href') == "") {
			mui.toast('正在开发中...');
		}else if(this.getAttribute('href') == "##"){
			return ;
		}else {
			var idname = this.getAttribute('href').substring(this.getAttribute('href').lastIndexOf("/")+1,this.getAttribute('href').length);
			var list = mui.openWindow({
				url: this.getAttribute('href'),
				id: idname
			});
		}
	});
}

function monitor_li_link(listname)
{
	mui(listname).on('tap', 'li', function() {
		if (this.getAttribute('href') == "#" || this.getAttribute('href') == "") {
			mui.toast('正在开发中...');
		}else if(this.getAttribute('href') == "##"){
			return ;
		}else {
			var idname = this.getAttribute('href').substring(this.getAttribute('href').lastIndexOf("/")+1,this.getAttribute('href').length);
			var list = mui.openWindow({
				url: this.getAttribute('href'),
				id: idname
			});
		}
	});
}