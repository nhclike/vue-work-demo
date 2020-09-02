/**
* 实时监控
*/
<template>
    <div class="wrap full-height">
        <div class="monitor-box full-height pos-r" v-loading="loading">
            <div class="full-width full-height" id="monitor-real"></div>
            <Address class="pos-a address-select" size="default" placeholder="请选择区域"
                     ref="address"
                     :hasTown="true"
                     :selectedDefault="selectedValue"
                     @getSelectedAddress="getSelectedAddress"></Address>
            <div class="pos-a type-select">
                <div :class="{active: curSort === 'overSpeed'}" @click="filterData('overSpeed')">
                    <span>超速车辆</span>
                    <div class="line"></div>
                </div>
                <!--<div :class="{active: curSort === 'mortarTank'}" @click="filterData('mortarTank')">
                    <span>砂浆罐站点</span>
                    <div class="line"></div>
                </div>-->
            </div>
            <div class="pos-a input-select">
                <el-input
                        @keyup.enter.native="getVehicleMonitorInfoScreen(true)"
                        v-model="search"
                        placeholder="输入车牌号/企业名称关键词"
                        prefix-icon="el-icon-search">
                    <el-button slot="append" icon="el-icon-search"
                               @click="getVehicleMonitorInfoScreen(true)"></el-button>
                </el-input>
            </div>
            <!-- v-show="isShowReal"-->
            <div class="monitor clearfix pos-a" ref="monitor" :class="{full: fullStatus}" v-if="isShowReal">
                <div class="operate-box full-width">
                    <img src="@/assets/icon/monitor-close.png" alt="关闭" @click="closeFull">
                    <img src="@/assets/icon/out-full.png" alt="退出全屏" @click="fullScreen" v-if="fullStatus">
                    <img src="@/assets/icon/full-screen.png" alt="全屏" @click="fullScreen" v-else>
                </div>

                <div class="monitor-item pos-r" v-for="item in realVideoList" :key="item.devId">
                    <video-player class="vjs-custom-skin full-width full-height" ref="videoPlayer"
                                  v-if="item.status"
                                  :options="item.option"></video-player>
                    <div class="tip" v-else>设备离线中</div>
                    <div class="name pos-a">{{item.device}}</div>
                </div>
                <!--<div class="monitor-item">
                    <video-player class="vjs-custom-skin full-width full-height" ref="videoPlayer" :options="playerOptions"></video-player>
                </div>
                <div class="monitor-item">
                    <video-player class="vjs-custom-skin full-width full-height" ref="videoPlayer" :options="playerOptions"></video-player>
                </div>
                <div class="monitor-item">
                    <video-player class="vjs-custom-skin full-width full-height" ref="videoPlayer" :options="playerOptions2"></video-player>
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Address from '@/components/common/Address';
const AMap = window.AMap;
const marks = require('@/data/marks.json');
let page = 0;
let timer = null;
const deg2txt = deg => {
    const yu = deg % 360;
    console.log(yu);
    let txt = '';
    if (yu == 0) {
        txt = '正北';
    } else if (yu < 90) {
        txt = '北偏东' + yu + '度';
    } else if (yu == 90) {
        txt = '正东';
    } else if (yu < 180) {
        txt = '南偏东' + (yu - 90) + '度';
    } else if (yu == 180) {
        txt = '正南';
    } else if (yu < 270) {
        txt = '南偏西' + (yu - 180) + '度';
    } else if (yu == 270) {
        txt = '正西';
    } else if (yu < 360) {
        txt = '北偏西' + (yu - 270) + '度';
    }
    return txt;
};
export default {
    name: '',
    components: {
        Address
    },
    inject: [],
    data() {
        return {
            map: null,
            markSet: [],
            cluster: null,
            infoWindow: null,
            curShowinfoWindowId: null,
            monitorInfo: [],
            curSort: '', // 当前显示车辆类型
            search: '',
            selectedValue: [],
            fullStatus: false,
            isShowReal: false,
            realVideoList: [],
            baseOption: {
                autoplay: 'any',
                controls: false,
                preload: 'auto',
                language: 'zh-CN',
                fluid: true,
                notSupportedMessage: '此视频暂无法播放，请稍后再试',
                sources: []
            },
            timeGap: 0,
            loading: false
        };
    },
    computed: {
        ...mapState(['userInfo']),
        loginInfo() {
            return this.userInfo;
        }
    },
    created() {
        // 先注册全局infoWindowOperation时间，用于信息窗体中的操作事件
        window.infoWindowOperation = this.infoWindowOperation;
    },
    mounted() {
        this.initAmap();
        // 加载信息窗体
        this.addInfoWindow();
        // 使用高德地图基础类添加点线
        for (let i = 0; i < marks.length; i++) {
            // this.addMark(marks[i]);
            // this.addElasticMarker(marks[i]);
        }

        // 点聚合
        this.markerClusterer();

        // this.getMortarTankData();
        this.getVehicleMonitorInfoScreen();

        this.setMapCenter(this.loginInfo.areaCode == '33' ? '3301' : this.loginInfo.areaCode);
        this.selectedValue = [this.loginInfo.areaCode];
    },
    beforeDestroy() {
        page = 0;
        timer && clearInterval(timer);
    },
    methods: {
        initAmap() {
            this.map = new AMap.Map('monitor-real', {
                // center: [120.601774, 30.185019],
                // center: [120.6026, 30.1789],
                // zoom: 20,
                isHotspot: false,
                rotateEnable: false,
                // mapStyle: 'amap://styles/dark',
                pitch: 35, // 地图俯仰角度，有效范围 0 度- 83 度
                viewMode: '3D' // 地图模式
            });
            this.map.on('click', () => {
                this.$refs.address.closeOption();
            });
        },
        // 获取砂浆罐站点数据
        getMortarTankData() {
            axios.get(__GATEWAYPATH__ + '/api-ent/vehicle/mortarTankData').then(res => {
                console.log(res);
            });
        },
        // 获取实时监控信息
        getVehicleMonitorInfoScreen(isSearch = false) {
            // let self = this;
            // setTimeout(function() {
            //     self.timeGap = 0;
            // }, 500);
            // if (this.timeGap === 500) {
            //     return false;
            // }
            page = 0;
            timer && clearInterval(timer);
            this.curSort = '';
            this.clearMarker();
            this.loading = true;
            axios.get(__GATEWAYPATH__ + '/api-ent/vehicle/vehicleMonitorInfoScreen', {
                params: {
                    param: this.search
                }
            }).then(res => {
                console.log(res);
                if (res.data.success) {
                    if (!res.data.obj.length && isSearch) {
                        this.$message.error('未查询到相关数据');
                    }
                    this.monitorInfo = res.data.obj;
                    clearInterval(timer);
                    timer = setInterval(() => {
                        console.log(page);
                        const arr = this.monitorInfo.slice(100 * page, 100 * (page + 1));
                        console.log(arr);
                        if (arr.length) {
                            this.addMarksSame(arr, isSearch);
                            page++;
                        } else {
                            page = 0;
                            timer && clearInterval(timer);
                        }
                    }, 500);
                    // this.addMarksSame(this.monitorInfo, isSearch);
                } else {
                    this.$message.error(res.data.msg);
                }
            }).finally(() => {
                this.loading = false;
            });
        },
        // 添加灵活点
        addElasticMarker(data) {
            /*eslint-disable*/
            const ElasticMarker = new AMap.ElasticMarker({
            /* eslint-enable */
                map: this.map,
                position: data.lnglat,
                zoomStyleMapping: {
                    14: 0,
                    15: 0,
                    16: 0,
                    17: 0,
                    18: 0,
                    19: 0,
                    20: 0
                },
                styles: [{
                    icon: {
                        img: require('@/assets/map/' + data.type + '.png'),
                        // img: './icon/icon.png',
                        size: [20, 30], // 图标的原始大小
                        ancher: [10, 30], // 锚点，图标原始大小下锚点所处的位置，相对左上角
                        fitZoom: 12, // 最合适的级别，在此级别下显示为原始大小
                        scaleFactor: 2, // 地图放大一级的缩放比例系数
                        maxScale: 2, // 最大放大比例
                        minScale: 1// 最小放大比例
                    }
                }]
            });
        },
        addMark(data) {
            /*eslint-disable*/
            const marker = new AMap.Marker({
            /* eslint-enable */
                map: this.map,
                position: data.lnglat,
                content: '<div class="mask"><img src="' + require('@/assets/map/' + data.type + '.png') +
                    '" alt=""></div>',
                anchor: 'center',
                offset: new AMap.Pixel(0, 0),
                shadow: new AMap.Icon({
                    image: require('@/assets/map/' + data.type + 'S.png'),
                    size: [30, 20],
                    imageSize: [30, 20]
                })
            });
        },
        addMarksSame(data, isSearch = false) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const icon = data[i].isOverSpeed ? require('@/assets/icon/speed-over.png') :
                    require('@/assets/icon/speed-normal.png');
                const marker = new AMap.Marker({
                    map: this.map,
                    position: [data[i].longitude, data[i].latitude],
                    icon: new AMap.Icon({
                        size: [20, 25],
                        image: icon,
                        imageSize: [20, 25]
                    }),
                    anchor: 'center',
                    autoRotation: true,
                    offset: new AMap.Pixel(0, 0),
                    extData: data[i]
                });
                this.markSet.push(marker);
                // 设置聚合点
                // this.cluster.addMarker(marker);
                // 信息弹窗
                marker.on('click', e => {
                    let extData = marker.getExtData();
                    console.log(extData);
                    this.showInfoWindow(extData);
                });
            }
            this.cluster.addMarkers(this.markSet);
            if (isSearch) {
                this.map.setFitView(this.markSet);
            }
        },
        // 点聚合
        markerClusterer() {
            this.cluster = new AMap.MarkerClusterer(this.map, [], {
                gridSize: 80,
                renderClusterMarker: context => {
                    let count = this.monitorInfo.length;
                    let size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 10);
                    context.marker.setOffset(new AMap.Pixel(-size / 2, -size * 1.25 / 2));
                    let div = document.createElement('div');
                    div.style.width = size + 'px';
                    div.style.height = size * 1.25 + 'px';
                    div.innerHTML = context.count;
                    div.style.lineHeight = size + 'px';
                    div.style.fontSize = '14px';
                    div.style.textAlign = 'center';
                    div.style.color = '#fff';
                    div.style.backgroundImage = 'url(' + require('@/assets/icon/speed-normal.png') + ')';
                    div.style.backgroundSize = 'cover';
                    context.marker.setContent(div);
                }
            });
        },
        // 加载信息窗体
        addInfoWindow() {
            this.infoWindow = new AMap.InfoWindow({
                autoMove: true
            });
            this.infoWindow.on('close', () => {
                this.curShowinfoWindowId = null;
            });
        },
        // 设置信息窗体显示内容
        setInfoWindowContent(data) {
            const el = `
                <div class="info-window">
                    <div class="info-row id-time">
                        <span class="id">${data.licPlate}</span>
                        <span class="time">${data.updateTime.replace('T', ' ')}</span>
                    </div>
                    <div class="info-row company">${data.enterpriseName}</div>
                    <div class="info-row detail">
                        <div><span class="name">速度：</span>${data.speed}Km/h</div>
                        <div><span class="name">方向：</span>${deg2txt(data.direction)}</div>
                    </div>
                    <div class="info-row detail">
                        <div><span class="name">纬度：</span>${data.latitude}</div>
                        <div><span class="name">经度：</span>${data.longitude}</div>
                    </div>
                    <div class="info-row operate">
                        <div class="btn back-btn" onclick="infoWindowOperation('back', ${data.vehicleId})">轨迹回放</div>
                        <div class="btn real-btn" onclick="infoWindowOperation('real', ${data.id})">实时视频</div>
                    </div>
                </div>
            `;
            return el;
        },
        // 显示信息窗体
        showInfoWindow(data) {
            console.log(data);
            this.curShowinfoWindowId = data.id;
            const content = this.setInfoWindowContent(data);
            this.infoWindow.setContent(content);
            this.infoWindow.open(this.map, new AMap.LngLat(data.longitude, data.latitude));
        },
        infoWindowOperation(type, id) {
            console.log(type);
            console.log(id);
            if (type === 'back') {
                this.$router.push({
                    path: '/main/car/track-playback',
                    query: {
                        id
                    }
                });
            } else {
                console.log('real');
                // 无法直接传汉字，使用id获取车牌号
                const licPlate = this.monitorInfo.find(item => item.id === id).licPlate;
                console.log(licPlate);
                this.getOnlineVedioMonitor(licPlate);
            }
        },
        // 显示车辆类型切换
        filterData(sort) {
            console.log(sort);
            if (this.curSort === sort) {
                this.curSort = '';
            } else {
                this.curSort = sort;
            }
            if (sort === 'overSpeed') {
                let data;
                if (this.curSort) {
                    data = this.monitorInfo.filter(item => item.isOverSpeed);
                } else {
                    data = this.monitorInfo;
                }
                console.log(data);
                page = 0;
                timer && clearInterval(timer);
                this.clearMarker();
                this.addMarksSame(data);
            } else {
                if (this.curSort) {
                    this.$message.info('暂无相关砂浆罐站点数据');
                }
            }
        },
        // 清除所有标记点，同时清除聚合点
        clearMarker() {
            console.log('clear');
            this.map.remove(this.markSet);
            this.cluster.clearMarkers();
            this.markSet.length = 0;
        },
        getSelectedAddress(data) {
            console.log(data.selectedValue);
            let areaCode = data.selectedValue.filter(e => e)[data.selectedValue.length - 1];
            this.setMapCenter(areaCode);
        },
        // 设置地图当前聚焦区域-中文城市名、adcode、citycode
        setMapCenter(code = this.loginInfo.areaCode) {
            // 编码补零
            code = (code + '0000000').substr(0, 6);
            console.log(code);
            this.map.setCity(code);
        },
        // 全屏/退出全屏
        fullScreen() {
            this.fullStatus = !this.fullStatus;
        },
        // 关闭监控视频
        closeFull() {
            console.log('close');
            this.isShowReal = false;
            this.fullStatus = false;
        },
        // 获取实时监控视频
        getOnlineVedioMonitor(id) {
            console.log('id', id);
            this.isShowReal = false;
            this.realVideoList.length = 0;
            axios.get(__GATEWAYPATH__ + '/api-ent/vehVideomonitorOnline/vedioMonitor', {
            // axios.get(__ANYIFEI__ + '/vehVideomonitorOnline/vedioMonitor', {
                params: {
                    param: id
                }
            }).then(res => {
                console.log(res);
                if (res.data.success) {
                    const list = res.data.obj[0].middleList[0].vehVideomonitorOnlineList;
                    console.log(list);
                    list.forEach(item => {
                        this.realVideoList.push({
                            devId: item.devId,
                            device: item.device,
                            status: item.status,
                            option: Object.assign({}, this.baseOption, {
                                sources: [{
                                    type: '',
                                    src: item.videoUrl
                                }, {
                                    type: 'application/x-mpegURL',
                                    src: item.videoUrl
                                }]
                            })
                        });
                    });
                    console.log('this.realVideoList', this.realVideoList);
                    this.isShowReal = true;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
    .wrap{
        padding: 10px;
        font-size: 16px;
    }
    .monitor-box {
        .monitor {
            right: 0;
            bottom: 0;
            width: 578px;
            height: 326px;
            background-color: #00A2FF;
            .operate-box {
                position: absolute;
                top: 0px;
                left: 0;
                z-index: 1000;
                height: 40px;
                line-height: 40px;
                background-color: rgba(0, 0, 0, 0.51);
                display: flex;
                align-items: center;
                flex-direction: row-reverse;
                img{
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    margin-right: 20px;
                }
            }
            .monitor-item {
                float: left;
                width: calc(~'(100% - 2px) / 2');
                height: calc(~'(100% - 2px) / 2');
                background-color: #333;
                &:nth-child(2n) {
                    margin-right: 2px;
                }
                &:nth-child(-n + 3) {
                    margin-bottom: 2px;
                }
                .video-player{
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }
                .tip{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                }
                .name{
                    left: 5px;
                    bottom: 5px;
                    font-size: 12px;
                    color: #fff;
                }
            }
            &.full{
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
            }
        }
        .address-select, .type-select, .input-select{
            background-color: #fff;
            border-radius: 4px;
            top: 20px;
        }
        .address-select{
            left: 20px;
        }
        .type-select{
            right: 320px;
            margin-right: 20px;
            height: 40px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #999;
            white-space: nowrap;
            padding: 0 20px;
            &>div{
                cursor: pointer;
            }
            .line{
                height: 2px;
                border-radius: 1px;
                margin-top: 2px;
            }
            div+div{
                margin-left: 20px;
            }
            div.active{
                color: #00A2FF;
                & .line{
                    background-color: #00A2FF;
                }
            }
        }
        .input-select{
            right: 20px;
            width: 280px;
        }
    }

    /*标记点*/
    #monitor-real {
        /deep/ .mask {
            width: 30px;
            img {
                width: 100%;
                &:hover {
                    animation: jump 1s linear infinite;
                }
            }
        }
        /deep/ .pointer {
            width: 15px;
            height: 15px;
            background: rgba(255,143,53,0.8);
            border-radius: 50%;
            filter: blur(2px);
            /*animation: animate 600ms infinite;*/
            &:hover {
                background-color: red !important;
                animation: animate 600ms infinite;
            }
        }
        /deep/ .amap-info-content{
            border-radius: 4px;
        }
        /deep/ .info-window{
            .info-row{
                width: 270px;
                font-size: 14px;
                display: flex;
                align-items: flex-end;
                margin-bottom: 5px;
            }
            .id-time{
                justify-content: space-between;
                .id{
                    color: #333;
                    font-size: 18px;
                    font-weight: bold;
                }
                .time{
                    color: #999999;
                }
            }
            .company{
                color: #333;
                font-size: 16px;
                margin-bottom: 15px;
            }
            .detail{
                color: #333;
                margin-bottom: 10px;
                div{
                    flex: 1;
                }
                .name{
                    color: #666;
                }
            }
            .operate{
                .btn{
                    text-align: center;
                    width: 80px;
                    height: 36px;
                    line-height: 36px;
                    border-radius: 2px;
                    border: 1px solid #006EEC;
                    color: #006EEC;
                    cursor: pointer;
                }
                .back-btn{
                    background-color: #006EEC;
                    color: #fff;
                    margin-right: 20px;
                }
            }
        }
    }

    @keyframes jump {
        0% {
            transform: translateY(0);
        }
        25% {
            transform: translateY(-5px);
        }
        50% {
            transform: translateY(-10px);
        }
        75% {
            transform: translateY(-5px);
        }
        100% {
            transform: translateY(0px);
        }
    }

    @keyframes animate {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(2);
        }
    }
</style>
<style lang="less">

</style>
