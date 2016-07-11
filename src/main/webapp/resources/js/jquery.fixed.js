(function($) {		
	jQuery.fn.fixed = function(options) {
		var defaults = {
			x:0,
			y:0
		};
		var o = jQuery.extend(defaults, options);
		var isIe6 = !window.XMLHttpRequest;
		var html= $('html');
		if (isIe6 && html.css('backgroundAttachment') !== 'fixed') {
			html.css('backgroundAttachment','fixed').css('backgroundImage','url(about:blank)');
		};
		return this.each(function() {
			var domThis=$(this)[0];
			var objThis=$(this);
			if(isIe6){
				objThis.css('position' , 'absolute');
				domThis.style.setExpression('left', 'eval((document.documentElement).scrollLeft + ' + o.x + ') + "px"');
				domThis.style.setExpression('top', 'eval((document.documentElement).scrollTop + ' + o.y + ') + "px"');
			} else {
				objThis.css('position' , 'fixed').css('top',o.y).css('left',o.x);
			}
		});
	};
})(jQuery)