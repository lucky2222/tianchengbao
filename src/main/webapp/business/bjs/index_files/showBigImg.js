// JavaScript Document
window.onload=function(){
    var oGallery = document.getElementById('gallery3');
    var oListshow = document.getElementById('listshow3');
    var oUl = document.getElementById('goods_list2');
    var oLis = oUl.getElementsByTagName('li');
    var oImgboxs = getElesByClass("oImgbox",oUl);
    var nIndex = 36;
    
    for(var i = 0; i < oLis.length; i++){
        var oLi = oLis[i];
        oLi.style.zIndex=nIndex;
        nIndex--;
    }
    
//    for(var i = 0; i < oImgboxs.length; i++){
//        var oImgbox = oImgboxs[i];
//        oImgbox.style.zIndex=nIndex;
//        nIndex--;
//    } 

    var oAs = document.getElementsByTagName('a');
    var oListCheck = byClass("fs_check",oAs);
    var oQalleryCheck = byClass("fl_check",oAs);
    // console.log(oListCheck);
    // console.log(oQalleryCheck);
    if(oListCheck.length>0){
       listShow(); 
    }else if(oQalleryCheck.length>0){
        qalleryShow();
    }
    
    
    oListshow.onclick = function(){
        removeClass(oUl,'goods_list2');
        addClass(oUl,'goods_list4');
        qalleryShow();
    }

    oGallery.onclick = function(){
        removeClass(oUl,'goods_list4');
        addClass(oUl,'goods_list2');
        listShow(); 
    }

    function listShow(){
        var oBoxs = getElesByClass("img_box_150");
        for(var i=0; i < oBoxs.length; i++){
            (function(i){
                var nZindex = oBoxs[i].parentNode.parentNode.style.zIndex;
                oBoxs[i].onmouseover=function(){
                    var oImg = nextSiblings(oBoxs[i]);
                    oImg[0].style.display='block';
                    if(i%3==2){
                        oImg[0].style.left=this.style.left;
                        this.parentNode.parentNode.style.zIndex = nZindex+1;
                        var oBs = getElesByClass("hiddenImg_dot",oImg[0]);
                        removeClass(oBs[0],"hiddenImg_dot2");
                    }
                }
                oBoxs[i].onmouseout=function(){
                    var oImg = nextSiblings(oBoxs[i]);
                    oImg[0].style.display='none';
                    this.parentNode.parentNode.style.zIndex = nZindex;
                }
            })(i);
        }
    }
    
    function qalleryShow(){
        var oBoxs = getElesByClass("img_box_150");
        for(var i=0; i < oBoxs.length; i++){
            (function(i){
                var nZindex = oBoxs[i].parentNode.style.zIndex;
                oBoxs[i].onmouseover=function(){
                    var oImg = nextSiblings(oBoxs[i]);
                    oImg[0].style.display='block';
                    if(i%3==2){
                        oImg[0].style.left='-352'+'px';
                        this.parentNode.style.zIndex = nZindex+1;
                        var oBs = getElesByClass("hiddenImg_dot",oImg[0]);
                        addClass(oBs[0],"hiddenImg_dot2");
                    }
                }
                oBoxs[i].onmouseout=function(){
                    var oImg = nextSiblings(oBoxs[i]);
                    oImg[0].style.display='none';
                    if(i%3==2){
                        this.parentNode.style.zIndex = nZindex;
                    }
                }
            })(i);
        }
    }

    function getElesByClass(strClassName,context){
        if(typeof strClassName == 'string'){
            context = context || document;
            if(context.nodeType == 1 || context.nodeType == 9){
                if(context.getElementsByClassName){
                    return context.getElementsByClassName(strClassName);
                }else{
                    var reg = /^\s+|\s+$/;
                    strClassName = strClassName.replace(reg,"");
                    var aClass = strClassName.split(/\s+/);
                    var eles = context.getElementsByTagName('*');
                    for(var i = 0; i < aClass.length; i++){
                        eles=byClass(aClass[i],eles);   
                    }
                    return eles;
                }
            }else{
                throw new Error("第二个参数类型错误！");
            }
        }else{
            throw new Error("第一个参数必需是一个字符串！");
        }
        
    }

    // function byClass(strClassName,eles){
    //         var reg=new RegExp("(^| )"+strClassName+"( |$)");
    //         //var eles=document.getElementsByTagName("*");
    //         var a=[];//把找到的放到这个数组里
    //         for(var i=0,len=eles.length;i<len;i++){
    //             var ele=eles[i];
    //             if(reg.test(ele.className)){//5
    //                 a.push(ele);
    //             }       
    //         }
    //         return a;   
    //     }
    function byClass(strClassName,eles){//例：在li集合下找出有option或是（有顺序的option hight这样有顺序，如果hight option这样就找不到了，就得用getElesByClass方法，把多个类放在数组里来找）类的li集合
        var reg=new RegExp("(^| )"+strClassName+"( |$)");
        var a=[];
        for(var i=0,len=eles.length;i<len;i++){
            var ele=eles[i];
            var aClass=ele.className;
            if(reg.test(aClass)){
                a.push(ele);
            }
        }
        return a;
    }

    function nextSiblings(ele){
        var n=ele.nextSibling;
        var a=[];
        while(n){
            if(n.nodeType===1){
                a.push(n);  
            }
            n=n.nextSibling;
        }
        return a;
    }

    function addClass(ele,strClassName){
        var reg=new RegExp("(?:^| )"+strClassName+"(?: |$)");
        if(!reg.test(ele.className))
            ele.className+=" "+strClassName;
        
    }

    function removeClass(ele,strClassName){
        var reg=new RegExp("(?:^| )"+strClassName+"(?: |$)","g");
        ele.className=ele.className.replace(reg,"");
        
    }
}