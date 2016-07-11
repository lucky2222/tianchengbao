/// <reference path="../../shipxyAPI.js" />
/// <reference path="../../shipxyMap.js" />
/// <reference path="myApp.js" />
/// <reference path="util.js" />
/// <reference path="service.js" />
/// <reference path="xwin.js" />
(function () {
    var flagsPath = 'http://api.shipxy.com/apiresource/flags/', //国旗图标服务器路径
        map = null, util = null, view = null, service = null,
        shipWin = null, //船舶信息框
        shipWinWidth = 420, //船舶信息框宽度
        shipInfo = null, //船舶信息
        shipTip = null, //船舶简单信息提示框
        trackTip = null, //轨迹点信息框
        pageSize = 20, //分页大小
        searchPaging = null; //搜索分页

    var country_zh = { "ABW": "阿鲁巴", "ADL": "阿黛利地", "AFG": "阿富汗", "AGO": "安哥拉", "AIA": "安圭拉", "ALB": "阿尔巴尼亚", "AND": "安道尔", "ANT": "荷兰属地", "ARE": "阿联酋", "ARG": "阿根廷", "ARM": "亚美尼亚", "ASL": "阿森松岛", "ASM": "美属萨摩亚", "ATF": "凯尔盖朗群岛", "ATG": "安提瓜和巴布达", "AUS": "澳大利亚", "AUT": "奥地利", "AZE": "阿塞拜疆", "AZS": "亚速尔群岛", "BDI": "布隆迪", "BEL": "比利时", "BEN": "贝宁", "BFA": "布基纳法索", "BGD": "孟加拉国", "BGR": "保加利亚", "BHR": "巴林", "BHS": "巴哈马", "BIH": "波黑", "BLR": "白俄罗斯", "BLZ": "伯利兹", "BMU": "百慕大", "BOL": "玻利维亚", "BRA": "巴西", "BRB": "巴巴多斯", "BRN": "文莱达鲁萨兰国", "BTN": "不丹", "BWA": "伯兹瓦纳", "CAF": "中非共和国", "CAN": "加拿大", "CCK": "科科斯群岛", "CHL": "智利", "CHN": "中国", "CIV": "科特迪瓦", "CMR": "喀麦隆", "COG": "刚果", "COK": "库克群岛", "COL": "哥伦比亚", "COM": "科摩罗", "CPV": "佛得角", "CRI": "哥斯达黎加", "CUB": "古巴", "CXR": "圣诞岛（英属）", "CYM": "开曼群岛（英属）", "CYP": "塞浦路斯", "CZE": "捷克共和国", "DEU": "德国", "DJI": "吉布提", "DNK": "丹麦", "DOM": "多米尼加共和国", "DZA": "阿尔及利亚", "ECU": "厄瓜多尔", "EGY": "埃及", "ERI": "厄立特里亚", "ESP": "西班牙", "EST": "爱沙尼亚", "ETH": "埃塞俄比亚", "FIN": "芬兰", "FJI": "斐济", "FLK": "福克兰群岛", "FRA": "法国", "FRO": "法罗群岛", "FSM": "密克罗尼西亚", "GAB": "加蓬", "GBR": "英国", "GEO": "格鲁吉亚", "GHA": "加纳", "GIB": "直布罗陀", "GIN": "几内亚", "GLP": "瓜德罗普岛（法属）", "GMB": "冈比亚", "GNB": "几内亚比绍", "GNQ": "赤道几内亚", "GRC": "希腊", "GRD": "格林纳达", "GRL": "格陵兰群岛", "GTM": "危地马拉", "GUY": "圭亚那", "HKG": "中国香港", "HND": "洪都拉斯", "HRV": "克罗蒂亚", "HTI": "海地", "HUN": "匈牙利", "IDN": "印度尼西亚", "IND": "印度", "IRL": "爱尔兰共和国", "IRN": "伊朗", "IRQ": "伊拉克", "ISL": "冰岛", "ISR": "以色列", "ITA": "意大利", "JAM": "牙买加", "JOR": "约旦", "JPN": "日本", "KAZ": "哈萨克斯坦", "KEN": "肯尼亚", "KGZ": "吉尔吉斯斯坦", "KHM": "柬埔塞", "KIR": "基里巴斯", "KNA": "圣基茨和尼维斯", "KOR": "韩国", "KWT": "科威特", "LAO": "老挝人民共和国", "LBN": "黎巴嫩", "LBR": "利比里亚", "LBY": "利比亚", "LCA": "圣露西亚岛", "LIE": "列支敦士登", "LKA": "斯里兰卡", "LSO": "莱索托", "LTU": "立陶宛", "LUX": "卢森堡", "LVA": "拉脱维亚", "MAC": "中国澳门", "MAR": "摩洛哥", "MDA": "摩尔多瓦", "MDG": "马达加斯加", "MDR": "马德拉", "MDV": "马尔代夫", "MEX": "墨西哥", "MHL": "马绍尔群岛", "MKD": "马其顿", "MLI": "马里", "MLT": "马尔他", "MMR": "缅甸", "MNE": "黑山共和国", "MNG": "蒙古", "MNP": "北马里亚纳群岛", "MOZ": "莫桑比克", "MRT": "毛里塔尼亚", "MSR": "蒙塞拉特岛", "MTQ": "马提尼克岛（法属）", "MUS": "毛里求斯", "MWI": "马拉维", "MYS": "马来西亚", "NAM": "纳米比亚", "NCL": "新喀里多尼亚", "NER": "尼日尔", "NGA": "尼日利亚", "NIU": "纽埃", "NLD": "荷兰", "NOR": "挪威", "NPL": "尼泊尔", "NRU": "瑙鲁", "NZL": "新西兰", "OMN": "阿曼", "PAK": "巴基斯坦", "PAN": "巴拿马", "PCN": "皮特克恩岛", "PER": "秘鲁", "PHL": "菲律宾", "PLW": "帕劳", "PNG": "巴布亚新几内亚", "POL": "波兰", "PRI": "波多黎各", "PRK": "朝鲜", "PRT": "葡萄牙", "PRY": "巴拉圭", "PSE": "巴勒斯坦", "PYF": "法属玻利尼西亚", "QAT": "卡塔尔", "REU": "留尼汪岛", "ROU": "罗马尼亚", "RUS": "俄罗斯联邦", "RWA": "卢旺达", "SAU": "沙特阿拉伯", "SDN": "苏丹", "SEN": "塞内加尔", "SGP": "新加坡", "SHN": "圣海伦娜", "SLB": "所罗门群岛", "SLE": "塞拉利昂", "SLV": "萨尔瓦多", "SMR": "圣马力诺", "SOM": "索马里", "SPM": "圣皮埃尔和密克隆", "SRB": "塞尔维亚", "STP": "圣多美和普林西比", "SUR": "苏里南", "SVK": "斯洛伐克", "SVN": "斯洛文尼亚", "SWE": "瑞典", "SWZ": "斯威士兰", "SYC": "塞舌尔", "SYR": "叙利亚", "TCA": "特克斯和凯科斯群岛", "TCD": "乍得", "TGO": "多哥", "THA": "泰国", "TKM": "土库曼斯坦", "TON": "汤加", "TTO": "特立尼达和多巴哥", "TUN": "突尼斯", "TUR": "土耳其", "TUV": "图瓦卢", "TWN": "台湾", "TZA": "坦桑尼亚", "UGA": "乌干达", "UKR": "乌克兰", "URY": "乌拉圭", "USA": "美国", "UZB": "乌兹别克斯坦", "VAT": "梵地冈", "VCT": "圣文森特和格林纳丁斯", "VEN": "委内瑞拉", "VGB": "维京群岛", "VNM": "越南", "VUT": "瓦努阿图", "WLF": "瓦利斯和富图纳", "WSM": "萨摩亚", "YEM": "也门", "ZAF": "南非", "ZMB": "赞比亚", "ZWE": "津巴布韦" };
    //初始化布局
    var initLayout = function () {
        var body = document.body,
        header = util.getElement('header'),
        lister = util.getElement('lister'),
        mainer = util.getElement('mainer'),
        width = body.clientWidth/1.2 - lister.offsetWidth*2 + 'px',
        height = body.clientHeight - header.offsetHeight*0 + 'px';
        mainer.style.width = width;
        mainer.style.height = lister.style.height = height;
    };

    //初始化左侧列表
    var initList = function () {
        var box = util.getElement('listbox');
        util.addEvent(box, 'click', function (event) {
            util.stopPropagation(event);
            var target = event.target, tag = target.tagName, cmd;
            if (tag == 'A') {
                cmd = target.getAttribute('data-cmd');
                if (cmd == 'listhead') {
                    toggleList(box, target.parentNode.parentNode);
                } else if (cmd == 'grouplist') {
                    toggleList(util.getElement('groupbox', box), target.parentNode.parentNode);
                } else if (cmd == 'ship') {//船舶
                    var selectedShipLink = util.getElement('selectedShip', box);
                    if (selectedShipLink) {//若有被选择的定位项，先清除
                        selectedShipLink.className = '';
                        selectedShipLink.id = '';
                    }
                    target.className = 'sel';
                    target.id = 'selectedShip';
                    var shipId = target.getAttribute('data-shipId');
                    var color = target.getAttribute('data-color');
                    if (shipId) {
                        var opts = null;
                        if (color) opts = { color: color };
                        service.locateShip(shipId, opts);
                    }
                } else if (cmd == 'track') {//轨迹
                    var selectedTrackLink = util.getElement('selectedTrack', box);
                    if (selectedTrackLink) {//若有被选择的定位项，先清除
                        selectedTrackLink.className = '';
                        selectedTrackLink.id = '';
                    }
                    target.className = 'sel';
                    target.id = 'selectedTrack';
                    var trackId = target.getAttribute('data-trackId');
                    if (trackId) {
                        service.locateTrack(trackId);
                    }
                }
            } else if (tag == 'I') {
                cmd = target.getAttribute('data-cmd');
                if (cmd == 'track') {//轨迹
                    var trackId2 = target.getAttribute('data-trackId');
                    if (trackId2) {
                        service.delTrack(trackId2);
                    }
                }
            }
            util.preventDefault(event);
        });
        //初始化，打开我的船队列表
        view.showList('fleetlist', null);
    };

    //展开/闭合列表
    var toggleList = function (box, list) {
        if (!box || !list) return;
        var a = list.getElementsByTagName('A')[0];
        var b = a.className == 'on';
        a.className = b ? '' : 'on'; //+-图标切换
        var other = null, len = box.children.length;
        //关闭其他展开的列表
        for (var i = 0; i < len; i++) {
            other = box.children[i];
            if (other != list) {//非本身列表
                if (other.getAttribute('data-toggle') == 'on') {
                    arguments.callee(box, other); //递归
                }
            }
        }
        var ul = list.getElementsByTagName('UL')[0];
        if (ul) {
            ul.className = b ? '' : 'on'; //展开/闭合列表
        }
        list.setAttribute('data-toggle', b ? 'off' : 'on'); //更改展开状态
    };

    var getShipName = function (data) {
        if (data.customName) return data.customName;
        return data.name ? data.name : data.MMSI;
    };

    //生成左侧列表内容
    var createList = function (ul, listname, data) {
        var s = '', i = 0, len = 0, d, parent;
        switch (listname) {
            case 'fleetlist':
                if (data && data.length > 0) {
                    var g, gc, gd, j, len1 = data.length, len2;
                    s += '<div id="groupbox">';
                    for (i = 0; i < len1; i++) {
                        g = data[i];
                        gc = g.color;
                        gd = g.data;
                        len2 = gd.length;
                        s += '<div class="shipGroup" data-toggle="off"><h6><a href="javascript:void(0)" title="' + g.name + '" data-cmd="grouplist" style="color:' + gc + ';">' +
                        g.name + '<span>(' + len2 + ')</span></a></h6><ul>';
                        for (j = 0; j < len2; j++) {
                            len++;
                            d = gd[j];
                            var ship = map.getOverlayById(d.shipId);
                            s += '<li><a href="javascript:void(0)" title="点击定位此船' + (d.remarks ? '\n备注:' + d.remarks : '') + '" data-cmd="ship" data-shipId="' + d.shipId + '" data-color="' + gc + '" style="color:' + gc + ';"';
                            if (service.selectedShipId == d.shipId) s += ' class="sel" id="selectedShip"';
                            s += '>' + (d.customName || (ship ? (ship.data.name || ship.data.MMSI || d.shipId) : d.shipId)) + '</a></li>';
                        }
                        s += '</ul></div>';
                    }
                    s += '</div>';
                } else {
                    s = '<li><a href="javascript:void(0)" title="点击定位此船" class="nodata" data-shipId="">船名</a></li>';
                }
                ul.innerHTML = s;
                util.getElement('fleetcount').innerHTML = '(' + len + ')';
                break;
            case 'tracklist':
                if (data && data.length > 0) {
                    s += '<div id="trackbox">';
                    for (i = 0, len = data.length; i < len; i++) {
                        d = data[i].data;
                        var ship2 = map.getOverlayById(d.shipId);
                        var name = ship2 ? getShipName(ship2.data) : d.shipId;
                        var tip = util.formatTime(d.startTime) + ' - ' + util.formatTime(d.endTime);
                        s += '<li><a href="javascript:void(0)" title="' + tip + '" data-cmd="track" data-trackId="' + d.trackId + '">' + name + '</a>' +
                        '<i class="del" title="删除" data-cmd="track" data-trackId="' + d.trackId + '"></i></li>';
                    }
                    s += '</div>';
                } else {
                    s = '<li><a href="javascript:void(0)" class="nodata" data-trackId="">暂无轨迹</a></li>';
                }
                ul.innerHTML = s;
                util.getElement('trackcount').innerHTML = '(' + len + ')';
                break;
            case 'searchlist':
                parent = util.getElement('search_pagebox', ul);
                if (!parent) {
                    ul.innerHTML = '<div id="search_pagebox" class="pagebox"></div>';
                    parent = util.getElement('search_pagebox', ul);
                }
                if (data && data.length > 0) {
                    if (!searchPaging) {
                        searchPaging = new Paging({
                            size: pageSize,
                            parent: parent,
                            callback: function (pageData) {
                                s = '';
                                for (i = 0, len = pageData.length; i < len; i++) {
                                    d = pageData[i];
                                    s += '<li>';
                                    var src, title;
                                    if (d.country) {
                                        src = flagsPath + d.country + '.png';
                                        title = country_zh[d.country];
                                    } else {
                                        src = flagsPath + 'qita.png';
                                        title = '其他';
                                    }
                                    s += '<img src="' + src + '" title="' + title + '"/>';
                                    s += '<a href="javascript:void(0)" title="点击定位此船：' + d.shipId + '" data-cmd="ship" data-shipId="' + d.shipId + '"';
                                    if (service.selectedShipId == d.shipId) s += ' class="sel" id="selectedShip"';
                                    s += '>' + getShipName(d) + '</a></li>';
                                }
                                parent.innerHTML = s;
                            }
                        });
                    }
                    searchPaging.setValue(null, data);
                } else {
                    parent.innerHTML = '<li><a href="javascript:void(0)" class="nodata">暂无搜索结果</a></li>';
                }
                util.getElement('searchcount').innerHTML = '(' + (data ? data.length : 0) + ')';
                break;
        };
    };

    //分页组件
    var Paging = function (opts) {
        this.data = opts.data || []; //源数据
        this.now = opts.now || 1; //当前页，默认为第一页
        this.size = opts.size || 20; //页大小，默认为20个
        this.total = this.data.length; //总个数
        this.callback = opts.callback || function () { }; //页切换时触发的回调函数
        this.mini = 1;
        this.step = opts.step || 1; //步频，默认为1页1页的切换
        this.prev = opts.prev || '上页'; //上页
        this.next = opts.next || '下页'; //下页
        this.sum = Math.ceil(this.total / this.size); //总页数，由总个数/页大小计算得到
        this.parent = opts.parent || document; //分页组件将要添加到的父容器，若不指定，默认为document
        this.box = null; //组件
    };
    Paging.prototype = {
        //设置当前页值和源数据，将会自动刷新组件，并从源数据中切割出当前页部分的数据，最后触发callback，传出当前页数据
        //若只设置当前页，看做是切换页
        //若设置了源数据，看做是刷新整个组件，但会保持组件的当前页状态
        setValue: function (now, data) {
            if (now) this.now = now; //当前页
            if (data) {//更新源数据：重置总数、总页数
                this.data = data;
                this.total = this.data.length;
                this.sum = Math.ceil(this.total / this.size);
            }
            //切割当前页数据，然后触发callback
            this.callback.call(this, this.data.slice((this.now - 1) * this.size, this.now * this.size));
            if (!this.box) {
                this.box = document.createElement('DIV');
                this.box.className = 'pageLink';
                var that = this;
                util.addEvent(this.box, 'click', function (event) {
                    util.stopPropagation(event);
                    var target = event.target;
                    if (target.tagName == 'A') {
                        that.change(parseInt(target.getAttribute('data-page')));
                    }
                    util.preventDefault(event);
                });
            }
            this.box.innerHTML = this.create();
            this.parent.appendChild(this.box); //加入父容器
        },
        //生成组件
        create: function () {
            if (this.sum <= 1) return '';
            var that = this;
            var end, ret = '', len = this.step * 2 + 1, start = this.now - this.step, each = function (page, text, cls) {
                if (page === '') return '<span>' + text + '</span>';
                if (page < 1 || page > that.sum) return '';
                if (page == that.now) return text ? ('<span>' + text + '</span>') : ('<span>' + page + '</span>');
                return '<a href="javascript:void(0)" data-page="' + page + '" ' + (cls || '') + '>' + (text || page) + '</a>';
            };
            if (start < 1) start = 1;
            if (start + len > this.sum) start = this.sum - len;
            end = start + len;
            if (end > this.sum) end = this.sum;
            if (this.mini) ret += each(1, '首页');
            if (this.now == 1) ret += each('', this.prev);
            if (this.now > 1) ret += each(this.now - 1, this.prev, ' class="pre"');
            if (this.mini) {
                ret += '<em>' + this.now + '</font>/' + this.sum + '</em>';
            } else {
                if (start > 1) ret += each(1);
                if (start > 2) ret += each(Math.floor((1 + start) / 2), '...');
                for (var i = start; i < end; i++) ret += each(i);
                if (end < this.sum) ret += each(Math.floor((this.sum + end) / 2), '...');
                if (end < this.sum + 1) ret += each(this.sum);
            }
            if (this.now < this.sum) ret += each(this.now + 1, this.next, ' class="next"');
            if (this.now == this.sum) ret += each('', this.next);
            if (this.mini) ret += each(this.sum, '末页');
            return ret;
        },
        //切换页
        change: function (page) {
            this.setValue(page);
        }
    };

    //文本框占位文字
    var PlaceHolder = function () { this.init.apply(this, arguments) };
    PlaceHolder.prototype = {
        init: function (input, text) {
            if (typeof input == 'string') input = document.getElementById(input);
            var that = this; this.input = input; this.setText(text || input.getAttribute('placeholder') || '');
            input.onfocus = function () { if (!this.value || this.value == that.text) this.value = ''; this.style.color = 'black' };
            input.onblur = function () { if (!this.value) this.value = that.text; if (this.value == that.text) this.style.color = '#ccc' };
            input.onblur();
        },
        setText: function (text) { this.text = text; if (this.input.style.color) this.input.value = this.text }
    };

    //初始化搜索：搜索框占位文本、注册查询按钮点击事件(触发查询船舶服务)
    var initSearch = function () {
        var input = util.getElement('searchKey');
        new PlaceHolder(input, '请输入船名');
        util.addEvent(util.getElement('btnQuery'), 'click', function (event) {
            util.stopPropagation(event);
            service.searchShip(input.value); //查询船舶
            input.focus();
            util.preventDefault(event);
        });
    };

    //构建船舶信息框数据区的html内容
    var createShipWinDataHtml = function (data) {
        var IMO = '', heading = '', course = '', speed = '', length = '', beam = '', draught = '', dest = '', lat = '', lng = '', lastTime = '';
        //无效IMO
        IMO = data.IMO == '2147483647' ? '' : data.IMO.toString();
        heading = (data.heading < 0 || data.heading > 360) ? '未知' : (data.heading + '度');
        course = (data.course < 0 || data.course > 360) ? '未知' : (data.course + '度');
        speed = isNaN(data.speed) ? '' : (data.speed == 0 ? '0.0' : (Math.round((data.speed) * 10) / 10) + '节'); //转成节
        if (data.length > 0) { length = data.length + '米'; }
        if (data.beam > 0) { beam = data.beam + '米'; }
        if (data.draught > 0) { draught = data.draught + '米'; }
        dest = data.dest.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
        if (!data.MMSI) {
            heading = '';
            course = '';
        }
        lat = isNaN(data.lat) ? '' : util.formatLat(data.lat);
        lng = isNaN(data.lng) ? '' : util.formatLng(data.lng);
        lastTime = isNaN(data.lastTime) ? '' : util.formatTime(data.lastTime);
        return '<table id="infoTable" class="xinfo"><tr>'
            + '<td class="ll">船名：</td><td><div class="o" title="' + data.name + '">' + data.name + '</div></td>'
            + '<td class="l">纬度：</td><td><div class="ro" title="' + lat + '">' + lat + '</div></td>'
            + '</tr><tr>'
            + '<td>呼号：</td><td><div class="o" title="' + data.callsign + '">' + data.callsign + '</div></td>'
            + '<td class="l">经度：</td><td><div class="ro" title="' + lng + '">' + lng + '</div></td>'
            + '</tr><tr>'
            + '<td>MMSI：</td><td><div class="o" title="' + data.MMSI + '">' + data.MMSI + '</div></td>'
            + '<td class="l">船首向：</td><td><div class="ro" title="' + heading + '">' + heading + '</div></td>'
            + '</tr><tr>'
            + '<td>IMO：</td><td><div class="o" title="' + IMO + '">' + IMO + '</div></td>'
            + '<td class="l">航迹向：</td><td><div class="ro" title="' + course + '">' + course + '</div></td>'
            + '</tr><tr>'
            + '<td>船籍：</td><td><div class="o" title="' + (country_zh[data.country] || '其他') + '">' + (country_zh[data.country] || '其他') + '</div></td>'
            + '<td class="l">航速：</td><td><div class="ro" title="' + speed + '">' + speed + '</div></td>'
            + '</tr><tr>'
            + '<td>类型：</td><td><div class="o" title="' + data.type + '">' + data.type + '</div></td>'
            + '<td class="l">货物类型：</td><td><div class="ro" title="' + data.cargoType + '">' + data.cargoType + '</div></td>'
            + '</tr><tr>'
            + '<td>状态：</td><td><div class="o" title="' + data.status + '">' + data.status + '</div></td>'
            + '<td class="l">目的地：</td><td><div class="ro" title="' + dest + '">' + dest + '</div></td>'
            + '</tr><tr>'
            + '<td>船长：</td><td><div class="o" title="' + length + '">' + length + '</div></td>'
            + '<td class="l">预到时间：</td><td><div class="ro" title="' + data.eta + '">' + data.eta + '</div></td>'
            + '</tr><tr>'
            + '<td>船宽：</td><td><div class="o" title="' + beam + '">' + beam + '</div></td>'
            + '<td class="l">最后时间：</td><td><div class="ro" title="' + lastTime + '">' + lastTime + '</div></td>'
            + '</tr><tr>'
            + '<td>吃水：</td><td><div class="o" title="' + draught + '">' + draught + '</div></td>'
            + '<td class="l"></td><td class="r"></td>'
            + '</tr></table>';
    };

    //构建船舶信息框内容：包括数据区、按钮区、轨迹查询区
    var createShipWinContent = function () {
        return '<div class="locusBox">'
            + '<div id="shipWinDiv">'
            + '<div class="swtitle">以下数据来自于AIS：</div>'
            + '<div id="dataHtmlDiv"></div>'
            + '<div id="trackSearchDiv">'
            + '<div><label for="startTime">开始时间：</label><input type="text" id="startTime"/></div>'
            + '<div><label for="endTime">结束时间：</label><input type="text" id="endTime"/></div>'
            + '<div class="btnLink">'
            + '<a href="javascript:void(0)" id="btnTrackSearch">查 询</a>'
            + '<a href="javascript:void(0)" id="btnTrackCancel">取 消</a>'
            + '</div>'
            + '</div>'
            + '<div class="trackMsg"><span id="trackMsg"></span></div>'
            + '<div class="btnLink" id="btnLinkDiv">'
            + '<a href="javascript:void(0)" id="btnLocate">定 位</a>'
            + '<a href="javascript:void(0)" id="btnTrack">轨 迹</a>'
            + '</div>'
            + '</div>'
            + '</div>';
    };

    //注册船舶信息框所有按钮的点击事件
    var addShipWinBtnEvent = function () {
        var parent = util.getElement('shipWinDiv');
        //定位到地图中心点、指定级别
        util.addEvent(util.getElement('btnLocate', parent), 'click', function (event) {
            util.stopPropagation(event);
            //定位船舶
            service.locateShip(shipInfo.shipId);
            util.preventDefault(event);
        });
        //进入轨迹查询区
        util.addEvent(util.getElement('btnTrack', parent), 'click', function (event) {
            util.stopPropagation(event);
            toggleTrackSearchDiv(true);
            util.preventDefault(event);
        });
        //查询轨迹
        util.addEvent(util.getElement('btnTrackSearch', parent), 'click', function (event) {
            util.stopPropagation(event);
            var bgn = util.getDateByString(util.getElement("startTime", parent).value); //生成开始Date对象
            var end = util.getDateByString(util.getElement("endTime", parent).value); //生成结束Date对象
            bgn = bgn.getTime() / 1000;
            end = end.getTime() / 1000;
            if (bgn >= end) {
                view.setTrackMsg('开始时间必须小于等于结束时间相同');
                return;
            }
            service.searchTrack(shipInfo.shipId, bgn, end);
            util.preventDefault(event);
        });
        //取消查询轨迹，退出轨迹查询区
        util.addEvent(util.getElement('btnTrackCancel', parent), 'click', function (event) {
            util.stopPropagation(event);
            service.abortSearchTrack();
            toggleTrackSearchDiv(false);
            util.preventDefault(event);
        });
    };

    //切换轨迹查询区
    var toggleTrackSearchDiv = function (isTrack) {
        var parent = util.getElement('shipWinDiv'), trackMsg = util.getElement("trackMsg", parent);
        trackMsg.innerHTML = '';
        if (isTrack) {//轨迹查询
            //初始化日期与时间选择器
            var nDate = new Date();
            var sDateTSpan = nDate.setDate(nDate.getDate() - 6); //6天前
            var startDate = new Date(sDateTSpan);
            util.getElement('startTime', parent).value = util.formatDateToString(startDate).substr(0, 10) + ' 00:00:00';
            util.getElement('endTime', parent).value = util.formatDateToString(new Date());
            util.getElement('btnLinkDiv', parent).style.display = 'none';
            util.getElement('trackSearchDiv', parent).style.display = '';
            trackMsg.style.display = '';
        } else {
            trackMsg.style.display = 'none';
            util.getElement('trackSearchDiv', parent).style.display = 'none';
            util.getElement('btnLinkDiv', parent).style.display = '';
        }
    };

    myApp.view = {
        //页面初始化
        init: function () {
            map = myApp.map;
            util = myApp.util;
            view = this;
            service = myApp.service;
            initLayout();
            initList();
            initSearch();
            util.addEvent(window, 'resize', initLayout);
        },

        //打开指定列表，同时会关闭其他列表，listname:'fleetlist'、'searchlist'，若传入data，则用data刷新列表
        showList: function (listname, data) {
            if (!listname) { return; }
            var box = util.getElement('listbox'), list = util.getElement(listname, box);
            if (!box || !list) { return; }
            var ul = list.getElementsByTagName('UL')[0];   //元素
            createList(ul, listname, data);
            if (list.getAttribute('data-toggle') != 'on') {
                toggleList(box, list);
            }
        },

        //关闭指定列表，listname:'fleetlist'、'searchlist'
        hideList: function (listname) {
            if (!listname) { return; }
            var box = util.getElement('listbox'), list = util.getElement(listname, box);
            if (!box || !list) { return; }
            if (list.getAttribute('data-toggle') != 'off') {
                toggleList(box, list);
            }
        },

        //检测指定列表是否已打开
        isOpenedList: function (listname) {
            if (!listname) { return; }
            var list = util.getElement(listname);
            if (!list) { return; }
            if (list.getAttribute('data-toggle') == 'on') {
                return true;
            }
            return false;
        },

        //显示船舶信息框
        //isUpdate  单单数据更新
        showShipWin: function (data) {
            if (!data) { return; }
            service.abortSearchTrack(); //取消轨迹查询，若有正在查询的轨迹
            if (!shipWin) {
                shipWin = new myApp.XWin({
                    modal: false,
                    dragbody: true,
                    //                    width: shipWinWidth - 20,
                    width: shipWinWidth - 20,
                    position: [document.body.clientWidth - shipWinWidth - 10, 100], //[left,top]
                    title: '船舶信息',
                    content: createShipWinContent(), //信息框内容
                    onhide: function () {
                        service.abortSearchTrack(); //取消轨迹查询，若有正在查询的轨迹
                        service.unselectShip(shipInfo.shipId); //关闭船舶信息框之后，反选船舶
                        shipInfo = null;
                    }
                });
                addShipWinBtnEvent(); //注册所有按钮的点击事件
            }
            util.getElement('dataHtmlDiv').innerHTML = createShipWinDataHtml(data); //刷新数据区内容

            if (!shipInfo || shipInfo.shipId != data.shipId)//单单数据更新
                toggleTrackSearchDiv(false); //信息框打开初始化状态：轨迹查询区不显示，当点击轨迹按钮之后进入轨迹查询区

            shipWin.show(); //显示
            shipInfo = data; //缓存船舶信息
        },

        //关闭船舶信息框
        hideShipWin: function () {
            if (shipWin && !shipWin.ishide()) {
                shipWin.hide();
            }
        },

        //设置轨迹查询提示消息
        setTrackMsg: function (msg) {
            var trackMsg = util.getElement("trackMsg");
            trackMsg.innerHTML = msg;
            if (msg) {
                trackMsg.style.display = '';
            } else {//当是空消息，隐藏
                trackMsg.style.display = 'none';
            }
        },

        //显示船舶简单信息提示
        showShipTip: function (data, latLng) {
            var pos = map.fromLatLngToPoint(latLng ? latLng : new shipxyMap.LatLng(latLng.lat, data.lng));
            if (!shipTip) {
                shipTip = document.createElement('div');
                shipTip.className = 'shipTip';
                util.getElement('mainer').appendChild(shipTip);
            }
            var html = '';
            if (data.name) html += '船名：' + data.name + '<br/>';
            if (data.callsign) html += '呼号：' + data.callsign + '<br/>';
            if (data.MMSI) html += 'MMIS：' + data.MMSI + '<br/>';
            if (data.IMO) html += 'IMO：' + data.IMO + '<br/>';
            if (data.lastTime) html += '最后时间：' + util.formatTime(data.lastTime);
            shipTip.innerHTML = html;
            shipTip.style.display = 'block';
            shipTip.style.left = pos.x + 10 + 'px';
            shipTip.style.top = pos.y + 20 + 'px';
        },

        //隐藏船舶简单信息提示
        hideShipTip: function () {
            if (shipTip) {
                shipTip.style.display = 'none';
            }
        },

        //显示轨迹点信息提示
        //shipData:所属船舶的简单数据（船名：呼号、MMSI、IMO）
        //trackData:该轨迹点的数据（纬度、经度、速度、船向、时间）
        showTrackTip: function (shipData, trackData) {
            var pos = map.fromLatLngToPoint(new shipxyMap.LatLng(trackData.lat, trackData.lng));
            if (!trackTip) {
                trackTip = document.createElement('div');
                trackTip.className = 'trackTip';
                util.getElement('mainer').appendChild(trackTip);
            }
            var html = '';
            if (shipData.name) html += shipData.name + '<br/>';
            if (shipData.callsign) html += shipData.callsign + '<br/>';
            if (shipData.MMSI) html += shipData.MMSI + '<br/>';
            if (shipData.IMO) html += shipData.IMO + '<br/>';
            if (trackData.speed) html += trackData.speed.toFixed(1) + '节<br/>';
            if (trackData.course) html += trackData.course + '度<br/>';
            if (trackData.lastTime) html += util.formatTime(trackData.lastTime);
            trackTip.innerHTML = html;
            trackTip.style.display = 'block';
            trackTip.style.left = pos.x + 10 + 'px';
            trackTip.style.top = pos.y + 20 + 'px';
        },

        //隐藏轨迹点信息提示
        hideTrackTip: function () {
            if (trackTip) trackTip.style.display = 'none';
        }
    };
})();