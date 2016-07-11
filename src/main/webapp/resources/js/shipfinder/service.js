/// <reference path="../../shipxyAPI.js" />
/// <reference path="../../shipxyMap.js" />
/// <reference path="../fleetData.js" />
/// <reference path="myApp.js" />
/// <reference path="view.js" />
(function () {
    var map = null, util = null, view = null, service = null,
    searchMaxCount = 100, //查询结果最大返回数
    searchOj = null, //API查询工具对象
    trackObj = null, //API正在查询的轨迹工具对象
    trackObjs = [], //缓存轨迹列表
    fleet = null, //船队列表
    fleetObj = null, //API船队船舶数据查询对象
    //fleetGroupList = null, //船队分组列表，组名、组颜色、自定义船名
    fleetShipList = {}, //船队的所有船舶对象列表
    isUpdatedList;

    //初始化船队
    var initFleet = function () {
        fleet = new shipxyAPI.Fleet(function (status) {
            if (status == 0) {
                fleetObj = new shipxyAPI.AutoShips(this, shipxyAPI.Ships.INIT_FLEET); //构建API船队船舶数据查询对象
                fleetObj.getShips(fleetCallback); //调用API的请求船队船舶数据接口
                fleetObj.setAutoUpdateInterval(30); //调用API的设置自动更新间隔=30秒
                fleetObj.startAutoUpdate(fleetCallback); //调用API的开启自动更新
                view.showList('fleetlist', this.data); //显示对象列表
            } else {
                errorTip(status);
            }
        });
    };
    var fleetCallback = function (status) {
        if (status == 0) {//成功
            showShips(this.data);
        } else {//错误
            errorTip(status);
        }
    };

    //根据船舶数据数组显示船舶
    var showShips = function (shipDatas) {
        if (!shipDatas || shipDatas.length == 0) return;
        var i = 0, len = shipDatas.length, d, opts, ship, group, groupShip;
        for (; i < len; i++) {
            d = shipDatas[i];
            ship = fleetShipList[d.shipId];
            if (!ship) {//新增的
                opts = new shipxyMap.ShipOptions();
                ship = new shipxyMap.Ship(d.shipId, d, opts);
                fleetShipList[d.shipId] = ship;
            } else {//更新的
                opts = ship.options;
                ship.data = d;
            }
            group = fleet.getGroupsByShipId(d.shipId)[0];
            groupShip = group.getShip(d.shipId);
            opts.fillStyle.color = opts.labelOptions.fontStyle.color = opts.labelOptions.borderStyle.color = group.color.replace('#', '0x'); //给每条船匹配分组颜色
            opts.labelOptions.text = groupShip.customName || d.name || d.MMSI || d.shipId;
            opts.labelOptions.fontStyle.size = 12;
            map.addOverlay(ship);
            if (d.shipId == service.selectedShipId) {//当是选择船，打开船舶信息框
                view.showShipWin(d);
            }
        }
        if (!isUpdatedList) {
            view.showList('fleetlist', fleet.data); //显示对象列表
            isUpdatedList = true;
        }
    };

    //船舶点击事件处理函数
    var addShipClickEvent = function () {
        var EventObj = shipxyMap.Event;
        //调用API的注册船舶事件接口
        map.addShipEventListener(EventObj.CLICK, function (event) {
            //从缓存中来获取数据
            var shipId = event.overlayId;
            var ship = map.getOverlayById(shipId);
            if (ship) {
                service.selectShip(shipId); //框选
                view.showShipWin(ship.data); //显示船舶信息框
            }
            //请求最新数据来展示
            var that = this;
            var ships = new shipxyAPI.Ships(shipId, shipxyAPI.Ships.INIT_SHIPID);
            ships.getShips(function (status) {
                if (status == 0) {
                    var data = this.data[0];
                    if (data) {
                        if (ship) ship.data = data;
                        else ship = new shipxyMap.Ship(data.shipId, data);
                        service.selectShip(shipId); //框选
                        view.showShipWin(ship.data); //显示船舶信息框
                    }
                }
            });
        });
        map.addShipEventListener(EventObj.MOUSE_OVER, function (event) {
            var shipId = event.overlayId;
            var ship = map.getOverlayById(shipId);
            view.showShipTip(ship.data, event.latLng); //显示船舶简单信息提示
        });
        map.addShipEventListener(EventObj.MOUSE_OUT, function (event) {
            view.hideShipTip(); //隐藏船舶简单信息提示
        });
    };

    //轨迹点鼠标移上事件处理函数
    var trackover = function (event) {
        var track = map.getOverlayById(event.overlayId);
        var shipData = map.getOverlayById(track.data.shipId).data;
        view.showTrackTip({ name: shipData.name, callsign: shipData.callsign, MMSI: shipData.MMSI, IMO: shipData.IMO }, event.extendData); //显示轨迹点信息提示
    };
    //轨迹点鼠标移出事件处理函数
    var trackout = function (event) {
        view.hideTrackTip(); //隐藏轨迹点信息提示
    };

    //定位该船
    var locate = function (ship, options) {
        if (options) {
            if (options.color) {
                ship.options.fillStyle.color = options.color.replace('#', '0x');
            }
        }
        map.addOverlay(ship, true); //优先显示
        map.locateOverlay(ship, service.locateShipZoom); //定位船舶
        service.selectShip(ship.data.shipId); //框选船舶
        view.showShipWin(ship.data); //显示船舶信息框
    };

    //错误提示
    var errorTip = function (errorCode) {
        switch (errorCode) {
            case 1:
                myApp.Message.error('网站服务出错！错误原因：服务过期。错误代码：1。');
                break;
            case 2:
                myApp.Message.error('网站服务出错！错误原因：服务无效或被锁定。错误代码：2。');
                break;
            case 3:
                myApp.Message.error('网站服务出错！错误原因：域名错误。错误代码：3。');
                break;
            case 4:
                myApp.Message.error('网站服务出错！错误原因：请求的数据量过大。错误代码：4。');
                break;
            case 100:
                myApp.Message.error('网站服务出错！错误原因：未知。错误代码：100。');
                break;
        }
    };

    myApp.service = {
        //初始化服务，包括注册船舶事件、初始化船队列表
        init: function () {
            map = myApp.map;
            util = myApp.util;
            view = myApp.view;
            service = this;
            initFleet();
            addShipClickEvent();
        },

        locateShipZoom: 10, //船舶定位级别
        selectedShipId: '-1', //被选择的船舶shipId

        //选择船舶
        selectShip: function (shipId) {
            if (shipId == this.selectedShipId) return;
            //先清除原先被选择船舶的选择框
            this.unselectShip(this.selectedShipId);
            var ship = map.getOverlayById(shipId);
            if (ship) {
                ship.options.isSelected = true;
                map.addOverlay(ship);
                this.selectedShipId = shipId;
            }
        },

        //反选船舶
        unselectShip: function (shipId) {
            if (shipId == '-1') return;
            var ship = map.getOverlayById(shipId);
            if (ship) {
                ship.options.isSelected = false;
                map.addOverlay(ship);
                this.selectedShipId = -1; //清除被选船舶shipId缓存
            }
        },

        //定位一条船,options可以包含一些改变此船外观显示的属性，比如颜色
        locateShip: function (shipId, options) {
            var ship = map.getOverlayById(shipId);
            if (ship) {//缓存里存在，定位
                locate(ship, options);
            }
            //请求最新数据来定位
            var that = this;
            var ships = new shipxyAPI.Ships(shipId, shipxyAPI.Ships.INIT_SHIPID); //构建API请求单条船舶数据对象
            //调用API的请求单条船舶数据接口
            ships.getShips(function (status) {
                if (status == 0) {
                    var data = this.data[0];
                    if (data) {
                        if (ship) ship.data = data;
                        else ship = new shipxyMap.Ship(data.shipId, data);
                        locate(ship, options);
                    } else {
                        service.unselectShip(that.selectedShipId); //框选船舶
                        view.showShipWin(that.getEmptyShipInfo(shipId)); //显示船舶信息框
                    }
                }
            });
        },

        //根据关键字查询船舶
        searchShip: function (key) {
            if (!key || key == '请输入船名') { return; }
            if (!searchOj) {
                searchOj = new shipxyAPI.Search(); //构建API查询工具对象
            }
            var that = this;
            //调用API查询船舶接口
            searchOj.searchShip({ keyword: key, max: searchMaxCount }, function (status) {
                var data = this.data;
                if (status == 0 && data && data.length > 0) {//当有结果，先定位第一条结果到醒目位置
                    that.locateShip(data[0].shipId);
                }
                view.showList('searchlist', data); //刷新搜索结果列表
            });
        },

        //查询轨迹
        searchTrack: function (shipId, btime, etime) {
            this.abortSearchTrack();
            var that = this, EventObj = shipxyMap.Event;
            view.setTrackMsg('正在查询轨迹，请稍候...');
            trackObj = new shipxyAPI.Tracks();
            //调用API的查询轨迹接口
            trackObj.getTrack(shipId, btime, etime, function (status) {
                //显示轨迹
                var trackData = this.data;
                if (status == 0 && trackData && trackData.data && trackData.data.length > 0) {
                    var trackId = trackData.trackId;
                    view.setTrackMsg('');
                    var len = trackObjs.length, td;
                    while (len--) {
                        td = trackObjs[len].data;
                        //重复查询的，先从缓存里删除
                        if (td && td.trackId == trackId) {
                            trackObjs.splice(len, 1);
                            that.delTrack(trackId);
                            break;
                        }
                    }
                    var opts = new shipxyMap.TrackOptions();
                    opts.strokeStyle.color = 0x0000ff;
                    opts.pointStyle.strokeStyle.color = 0x0000ff;
                    opts.labelOptions.borderStyle.color = 0x0000ff;
                    var track = new shipxyMap.Track(trackId, trackData, opts);
                    map.addOverlay(track);
                    //注册轨迹点事件
                    map.addEventListener(track, EventObj.TRACKPOINT_MOUSEOVER, trackover);
                    map.addEventListener(track, EventObj.TRACKPOINT_MOUSEOUT, trackout);
                    trackObjs.push(trackObj); //存储当前的轨迹
                    view.showList("tracklist", trackObjs, true); //显示轨迹列表
                    trackObj = null;
                } else {
                    view.setTrackMsg('暂无轨迹');
                }
            });
        },

        //销毁轨迹查询
        abortSearchTrack: function () {
            if (trackObj) {
                trackObj.abort(); //销毁当前轨迹的请求
                trackObj = null;
                view.setTrackMsg('');
            }
        },

        //删除轨迹
        delTrack: function (trackId) {
            var track = map.getOverlayById(trackId), EventObj = shipxyMap.Event;
            if (track) {
                //移除轨迹点事件
                map.removeEventListener(track, EventObj.MOUSE_OVER, trackover);
                map.removeEventListener(track, EventObj.MOUSE_OUT, trackout);
                map.removeOverlay(track); //删除轨迹显示
                var len = trackObjs.length, td;
                //删除轨迹数据缓存
                while (len--) {
                    td = trackObjs[len].data;
                    if (td && td.trackId == trackId) {
                        trackObjs.splice(len, 1);
                        break;
                    }
                }
                //刷新列表
                view.showList("tracklist", trackObjs, true);
            }
        },

        //定位轨迹
        locateTrack: function (trackId) {
            var track = map.getOverlayById(trackId);
            if (track) {
                map.locateOverlay(track); //定位
            }
        },

        //生成空船舶信息
        getEmptyShipInfo: function (shipId) {
            return { shipId: shipId, name: "", callsign: "", MMSI: "", IMO: "", type: "", status: "", length: NaN, beam: NaN, draught: NaN, lat: NaN, lng: NaN,
                heading: NaN, course: NaN, speed: NaN, rot: NaN, dest: "", eta: "", lastTime: NaN, country: "", cargoType: ""
            };
        }
    };
})();