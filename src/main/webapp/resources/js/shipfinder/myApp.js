/// <reference path="../../shipxyAPI.js" />
/// <reference path="../../shipxyMap.js" />
(function () {
    //初始化地图
    var initMap = function () {
        var mapOptions = new shipxyMap.MapOptions();
        mapOptions.center = new shipxyMap.LatLng(32, 122);
        mapOptions.zoom = 5;
        mapOptions.mapType = shipxyMap.MapType.GOOGLEMAP;
        var map = new shipxyMap.Map('mapDiv', mapOptions);
        //地图初始化完毕，flash组件会自动调用shipxyMap.mapReady函数
        //只有在mapReady函数被触发之后，才可以注册map事件和调用flash组件内部的方法
        shipxyMap.mapReady = function () {
            //try {
            myApp.initService();
            //} catch (e) {
            //    console.log(e.message);
            //}
        }
        return map;
    };
    myApp = {
        map: null, //地图对象
        //程序视图初始化：页面初始化、地图初始化
        initView: function (key) {
            //shipxyAPI.key = shipxyMap.key = key;
            this.map = initMap();
            this.view.init();

        },
        //程序服务初始化：初始化船舶服务
        initService: function () {
            this.service.init();
        }
    };
})();