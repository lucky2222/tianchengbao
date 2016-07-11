/*0622 laidz*/(function(e,j){var k=function(n){n=typeof n==="string"?j.getElementById(n):n;return new a(n);},f=Math.pow,h=Math.sin,m=Math.PI,l=1.70158,i=[];var g={easeBoth:function(n){return(n*=2)<1?0.5*n*n:0.5*(1-(--n)*(n-2));}};var d={getStyle:function(n,q){return"getComputedStyle" in e?function(){var p=getComputedStyle(n,null)[q];if((q==="left"||q==="right"||q==="top"||q==="bottom")&&p==="auto"){return"0px";}return p;}():function(){var s=q.replace(/\-(\w)/g,function(v,u){return u.toUpperCase();});var t=n.currentStyle[s];if((s==="width"||s==="height")&&t==="auto"){var r=n.getBoundingClientRect();return(s==="width"?r.right-r.left:r.bottom-r.top)+"px";}if(s==="opacity"){var p=n.currentStyle.filter;if(/opacity/.test(p)){t=p.match(/\d+/)[0]/100;return(t===1||t===0)?t.toFixed(0):t.toFixed(1);}else{if(t===undefined){return"1";}}}if((q==="left"||q==="right"||q==="top"||q==="bottom")&&t==="auto"){return"0px";}return t;}();},parseStyle:function(q){var p=parseFloat(q),n=q.replace(/^[\-\d\.]+/,"");return{val:p,unit:n,fn:function(r,s,t,u){return(r+(s-r)*u).toFixed(3)+t;}};},newObj:function(p,s){s=s!==undefined?s:1;var r={};for(var q=0,n=p.length;q<n;q+=1){r[p[q]]=s;}return r;},speed:{defaults:300},fxAttrs:function(q,p){var n=[];return{attrs:n[p],type:q};},setOptions:function(q,r,t,s){var n=this,p={};p.duration=(function(u){if(typeof u==="number"){return u;}else{if(typeof u==="string"&&n.speed[u]){return n.speed[u];}else{if(!u){return n.speed.defaults;}}}})(r);p.easing=(function(u){return g.easeBoth;})(t);p.callback=function(){if(typeof s==="function"){s();}n.dequeue(q);};return p;},setProps:function(s,r,q){if(q){var n=r().attrs,q=r().type,v,u,t;if(q==="hide"){v=n[0]==="opacity"?"0":"0px";}u=this.newObj(n,v);if(q==="show"){for(t in u){u[t]=this.getStyle(s,t);}}return u;}else{if(r&&typeof r==="object"){return r;}}},data:function(p){var n=p.animQueue;if(!n){n=p.animQueue=[];}return n;},queue:function(p,q){var n=this.data(p);if(q){n.push(q);}if(n[0]!=="runing"){this.dequeue(p);}},dequeue:function(r){var p=this,n=p.data(r),q=n.shift();if(q==="runing"){q=n.shift();}if(q){n.unshift("runing");if(typeof q==="number"){e.setTimeout(function(){p.dequeue(r);},q);}else{if(typeof q==="function"){q.call(r,function(){p.dequeue(r);});}}}if(!n.length){r.animQueue=undefined;}}};var b=function(r,n,q,p){this.elem=r;this.options=n;this.props=q;this.type=p;},c=d;b.prototype={start:function(p,q){this.startTime=+new Date();this.source=p;this.target=q;i.push(this);var n=this;if(n.elem.timer){return;}n.elem.timer=e.setInterval(function(){for(var r=0,s;s=i[r++];){s.run();}if(!i.length){n.stop();}},13);},run:function(u){var r=this.elem,B=this.type,C=this.props,q=this.startTime,F=+new Date(),s=this.options.duration,x=q+s,E=F>x?1:(F-q)/s,A=this.options.easing(E),z=0,v=0,n;for(n in C){z+=1;}r.style.overflow="hidden";if(B==="show"){r.style.display="block";}for(n in C){v+=1;var D=this.source[n].val,w=this.target[n].val,y=this.target[n].unit;if(u||F>=x){r.style.overflow="";if(B==="hide"){r.style.display="none";}if(B){if(n==="opacity"){c.setOpacity(r,1);}else{r.style[n]=(B==="hide"?D:w)+y;}}else{r.style[n]=/color/i.test(n)?"rgb("+w.r+","+w.g+","+w.b+")":w+y;}if(v===z){this.complete();this.options.callback.call(r);}}else{if(D===w){continue;}if(n==="opacity"){c.setOpacity(r,(D+(w-D)*A).toFixed(3));}else{r.style[n]=this.target[n].fn(D,w,y,A);}}}},stop:function(){e.clearInterval(this.elem.timer);this.elem.timer=undefined;},complete:function(){for(var n=i.length-1;n>=0;n--){if(this===i[n]){i.splice(n,1);}}}};var a=function(n){this.elem=n;};a.prototype={custom:function(q,s,u,t){var r=this.elem,n=c.setOptions(r,s,u,t),p=typeof q==="function"?q().type:null;q=c.setProps(r,q,p);c.queue(r,function(){var w={},y={},x;for(x in q){if(p==="show"){if(x==="opacity"){c.setOpacity(r,"0");}else{r.style[x]="0px";}}w[x]=c.parseStyle(c.getStyle(r,x));y[x]=c.parseStyle(q[x]);}var v=new b(r,n,q,p);v.start(w,y);});return this;},stop:function(n,p){var r=this.elem,q=i.length;if(n){r.animQueue=undefined;}while(q--){if(i[q].elem===r){if(p){i[q].run(true);if(r.timer){return;}r.timer=e.setInterval(function(){for(var s=0,t;t=i[s++];){t.run();}if(!q){e.clearInterval(r.timer);r.timer=undefined;}},13);}i.splice(q,1);}}if(!p){c.dequeue(r);}return this;}};e.easyAnim=k;})(window,document);var undefined;var $=function(a,e){e=e||document;if(a.indexOf("#")==0){var h=e.getElementById(a.substr(1));if(h&&h.nodeName){h.length=1;}}else{if(a.indexOf(".")==0){var h=[],g=e.getElementsByTagName("*");for(var d=0;d<g.length;d++){if(g[d].className.indexOf(a.substr(1))>-1){h.push(g[d]);}}}else{if(a.indexOf("|")>-1){var f=a.split("|");f[0]=f[0]||"*";var h=[];var c=e.getElementsByTagName(f[0]);for(var b=0;b<c.length;b++){if(c[b].getAttribute(f[1])!=undefined){h.push(c[b]);}}c=null;}else{var h=e.getElementsByTagName(a);}}}return h;};var addClass=function(d,e){if(d&&d.className){var f=d.className.split(" ");}if(f&&f.length){for(var a=0,b=f.length;a<b;a++){if(f[a]===e){return;}}}d.className=d.className+" "+e;return d;};var removeClass=function(b,c){if(typeof b.className==="string"){var a=new RegExp("(\\s*)"+c,"g");b.className=b.className.replace(a,"");}return b;};var inArray=function(b,c){for(var a=0;a<c.length;a++){if(b==c[a]){return a;}}return -1;};var offsetTop=function(c){var a=c;var b=0;while(a!=null&&a!=document.body){b+=a.offsetTop;a=a.offsetParent;}return b;};var backLoad={i:0,loadingI:0,loadingMAX:4,lIndex:0,add:function(a){this.i++;},del:function(){var a=this;a.i--;if(a.i<=0){a.i=0;setTimeout(function(){a.loadImg();},0);}},loadImg:function(){var b=this;for(var a=0;a<lazyImgs.length;a++){if(b.i>0){return;}if(lazyImgs[a]&&!lazyImgs[a]._loading){lazyImgs[a]._loading=1;lazyImgs[a].src=lazyImgs[a]._dataSrc;return;}}},preLoadImg:function(){var c=this;var f=lazyImgs.length;window._curImg=window._curImg||[];for(var d=c.lIndex;d<f;d++){var e=new Image();e._a=d;window._curImg[d]=lazyImgs[d];if(window._curImg[d]&&!window._curImg[d]._loading){e.onload=function(){var b=this._a;if(!window._curImg[b]._loading){window._curImg[b]._loading=1;window._curImg[b].src=this.src;}this.onload=this.onerror=null;c.loadingI--;c.preLoadImg();};e.onerror=function(){this.onload=this.onerror=null;c.loadingI--;c.preLoadImg();};c.loadingI++;c.lIndex++;e.src=window._curImg[d]._dataSrc;if(c.loadingI>c.loadingMAX){return;}}else{c.lIndex++;}}}};var SCROLL=function(c,g,d,f,b,a,h){if(!c){return;}var e=this;this.name=a;this.stage=c;this.callback=h;this.left=g;this.right=d;this.step=f;this.showerWidth=b;this.allWidth=parseInt(this.stage.offsetWidth);this.marginLeft=0;this.nowAt=0;this.left.onclick=function(){e.scrol(e.left,1);};this.right.onclick=function(){e.scrol(e.right,-1);};};SCROLL.prototype.scrol=function(c,a){var b=this;if(c.className.indexOf("disabled")>-1){return false;}var d=b.marginLeft+a*b.step;if(d>0){d=0;}if(d<0-(b.allWidth-b.showerWidth)){d=0-(b.allWidth-b.showerWidth);}if(d<0){removeClass(b.left,"disabled");}else{addClass(b.left,"disabled");}if(d>0-(b.allWidth-b.showerWidth)){removeClass(b.right,"disabled");}else{addClass(b.right,"disabled");}if(d==b.marginLeft){return false;}easyAnim(b.stage).stop(true,false).custom({marginLeft:d+"px"},300);b.marginLeft=d;b.nowAt=(0-d)/b.step;if(typeof b.callback){b.callback(b);}};var SLIDE=function(i,a,l,b,j,h,c,d,g){var f=this;if(!i||i.length!=1){return false;}this.name=c;this.now=1;this.lock=0;this.stage=i;this.nav=a;this.stageId=l;this.navId=b;this.height=j;this.count=h;if(!h){return;}this.hoverDom=g;for(var e=0;e<this.hoverDom.length;e++){this.hoverDom[e].onmouseover=function(){f.lock=1;};this.hoverDom[e].onmouseout=function(){f.lock=0;};}if(this.nav){this.li=$("a",this.nav);for(var e=0;e<this.li.length;e++){this.li[e]._Id=e;this.li[e].onmouseover=function(){f.scrol(this._Id+1);f.lock=1;};}}setInterval(function(){if(!f.lock){f.scrol();}},d);};SLIDE.prototype.scrol=function(d){var c=this;d=d||(c.now)%c.count+1;if(d==c.now){return;}if(d>1&&_scrollTop<630){c.loadImg(d);}if(this.nav){var b=$("#"+c.navId+d);for(var a=0;a<c.li.length;a++){removeClass(c.li[a],"nav_current");}addClass(b,"nav_current");}easyAnim(c.stage).stop(true,false).custom({marginTop:((1-d)*c.height)+"px"},300);c.now=d;};SLIDE.prototype.loadImg=function(d){var b=this;var c=$("img",$("#"+b.stageId+d));for(var a=0;a<c.length;a++){if(c[a]&&!c[a]._loading){if(d>1){backLoad.add("SLIDE"+a);}c[a]._loading=1;c[a].src=c[a]._dataSrc;}}};var lazyImg=function(e){for(var b=0,a=lazyImgs.length;b<a;b++){lazyImgs[b]._id=b;lazyImgs[b]._offsetTop=offsetTop(lazyImgs[b]);lazyImgs[b]._dataSrc=lazyImgs[b].getAttribute("data-src");lazyImgs[b].onload=lazyImgs[b].onerror=function(){var f=this._id;if(lazyImgs[f]&&lazyImgs[f]._loading){backLoad.del();lazyImgs[f]=null;this.onload=this.onerror=null;if(c()){clearTimeout(d);if(typeof e==="function"){e();}}}};}var c=function(){for(var g=0,f=lazyImgs.length;g<f;g++){if(lazyImgs[g]){return false;}}window._IMG_ALL_LOADED=true;return true;};var d=-1;window.onscroll=function(){var f=_scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;if(f>300){document.getElementById("JS_back_top").style.display="block";}else{document.getElementById("JS_back_top").style.display="none";}if(!window._IMG_ALL_LOADED){if(d!=-1){clearTimeout(d);}d=window.setTimeout(function(){for(var g=0;g<lazyImgs.length;g++){if(!lazyImgs[g]){continue;}if(lazyImgs[g]._loading){continue;}if(f+document.documentElement.clientHeight>lazyImgs[g]._offsetTop&&f<lazyImgs[g]._offsetTop+(lazyImgs[g].height||lazyImgs[g].cilentHeight)){backLoad.add("SCROLL:"+g);lazyImgs[g]._loading=1;lazyImgs[g].src=lazyImgs[g]._dataSrc;}}},500);}};};function changeHotGoodsCurrent(b){for(var a=0;a<6;a++){removeClass($("#JS_hot_goods_nav_"+a),"current");}addClass($("#JS_hot_goods_nav_"+b.nowAt),"current");}var preLoadResources=function(){var c=navigator.appName.indexOf("Microsoft")===0;var d=[""];for(var a=0,b=d.length;a<b;a++){if(c){new Image().src=d[a];continue;}o=document.createElement("object");o.data=d[a];o.width=0;o.height=0;document.body.appendChild(o);}};var _scrollTop;var lazyImgs=$("img|data-src");var hot_goods=new SCROLL($("#JS_hot_goods_stage"),$("#JS_hot_goods_left"),$("#JS_hot_goods_right"),708,708,"hot_goods",changeHotGoodsCurrent);var index_focus=new SLIDE($("#JS_focus_stage"),$("#JS_focus_nav"),"JS_focus_stage_","JS_focus_nav_",343,$("a",$("#JS_focus_stage")).length,"index_focus",5000,$(".JS_focus"));var index_ads=new SLIDE($("#JS_ads_stage"),false,"JS_ads_stage_",false,136,$("a",$("#JS_ads_stage")).length,"index_ads",3000,$(".JS_ads_hover"));var index_notice_tab=function(c){if(c==index_notice_tab.Id){return;}var b=[1,2];for(var a=0;a<b.length;a++){if(b[a]==c){document.getElementById("JS_notice_"+b[a]).className="body";document.getElementById("JS_noticet_"+b[a]).className="current";}else{document.getElementById("JS_notice_"+b[a]).className="body none";document.getElementById("JS_noticet_"+b[a]).className="";}}index_notice_tab.Id=c;};var speed=30;var stage=document.getElementById("JS_stage");var box1=document.getElementById("box1");var box2=document.getElementById("box2");var inbox=document.getElementById("JS_inbox");var _PAGE_LAZY_IMG=function(){lazyImg(preLoadResources);backLoad.loadImg();if(stage){if(box1.offsetWidth>=stage.offsetWidth){box2.innerHTML=box1.innerHTML;inbox.style.width=(box1.offsetWidth*2+10)+"px";function d(){if(box1.offsetWidth*2-stage.scrollLeft<=587){stage.scrollLeft=box1.offsetWidth-587;}else{stage.scrollLeft++;}}var c=setInterval(d,speed);stage.onmouseover=function(){clearInterval(c);};stage.onmouseout=function(){c=setInterval(d,speed);};}else{inbox.style.width=587+"px";}}};if(document.readyState=="complete"||document.readyState=="loaded"){_PAGE_LAZY_IMG();}else{if(document.all){window.attachEvent("onload",function(){_PAGE_LAZY_IMG();});}else{window.addEventListener("load",function(a){_PAGE_LAZY_IMG();},false);}}(function(h){function g(d){return h.getElementById(d);}for(var c=0;c<2;c++){var b=h.getElementById("JS_notice_nav_"+c);b._k=c;b.onmouseover=function(){var d=(this._k+1)%2;this.className=this._k?"current last":"current";g("JS_notice_nav_"+d).className=this._k?"":"last";g("JS_notice_ul_"+this._k).className="current";g("JS_notice_ul_"+d).className="";};}var f=g("JS_time_h");var a=g("JS_time_m");var e=g("JS_time_s");var i=parseInt((new Date()).getTime()/1000);window.LTime=parseInt(f.getAttribute("data-endTime")-i);window.LTimeHolder=setInterval(function(){if(window.LTime<0){clearTimeout(window.LTimeHolder);return;}var k=window.LTime%60;var d=parseInt(window.LTime%3600/60);var j=parseInt(window.LTime/3600);e.innerHTML=k<10?"0"+k:k;a.innerHTML=d<10?"0"+d:d;f.innerHTML=j<10?"0"+j:j;window.LTime--;},1000);})(document);(function(g){var j=[],e=[],c=[];var h=document.getElementById("JS_expr_bottom_nav");if(!h){return;}var a=h.getElementsByTagName("a").length;for(var f=1;f<=a;f++){j[f]=g.getElementById("JS_expr_bottom_nav_"+f);e[f]=g.getElementById("JS_expr_bottom_text_"+f);c[f]=g.getElementById("JS_expr_bottom_map_"+f);if(j[f]&&e[f]&&c[f]){j[f]._k=f;j[f].onmouseover=function(){i(this._k);};}}function i(l){for(var b=0,d=j.length;b<d;b++){if(!(j[b]&&e[b]&&c[b])){continue;}if(b==l){addClass(j[b],"current");addClass(e[b],"current");addClass(c[b],"current");}else{removeClass(j[b],"current");removeClass(e[b],"current");removeClass(c[b],"current");}}}})(document);(function(d){var f=[d.getElementById("JS_article_bottom_nav_1"),d.getElementById("JS_article_bottom_nav_2")];var c=[d.getElementById("JS_article_bottom_body_1"),d.getElementById("JS_article_bottom_body_2")];var a=[d.getElementById("JS_article_bottom_more_1"),d.getElementById("JS_article_bottom_more_2")];if(f[0]&&f[1]){f[0].onmouseover=function(){e(0);};f[1].onmouseover=function(){e(1);};}function e(g){var b=1-g;addClass(f[g],"current");addClass(c[g],"current");removeClass(a[g],"none");removeClass(f[b],"current");removeClass(c[b],"current");addClass(a[b],"none");}})(document);(function(c){var e=[c.getElementById("JS_btm_x_scroll_nav_1"),c.getElementById("JS_btm_x_scroll_nav_2")];var a=[c.getElementById("JS_btm_x_scroll_box_1"),c.getElementById("JS_btm_x_scroll_box_2")];if(e[0]&&e[1]&&a[0]&&a[1]){e[0].onmouseover=function(){d(0);};e[1].onmouseover=function(){d(1);};}function d(f){var b=1-f;addClass(e[f],"current");addClass(a[f],"current");removeClass(e[b],"current");removeClass(a[b],"current");}})(document);(function(c){var b=c.$("#JS_bottom_expr_box");if(b){var a=c.$("#JS_bottom_expr_box").childNodes;if(a){reSortDom(a,"current first");}}})(M);