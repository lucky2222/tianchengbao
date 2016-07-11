/**
 * common Js
 */

//checkbox全选
function ChkAllClick(obj) {
    var arrSon = document.getElementsByName("select");
    var tempState = obj.checked;
    for (i = 0; i < arrSon.length; i++) {
        if (arrSon[i].checked != tempState)
            arrSon[i].click();
    }
}