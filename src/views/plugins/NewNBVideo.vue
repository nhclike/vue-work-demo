/* 新版南北插件可分屏
 * @Author: nihc
 * @Date: 2021-01-22 15:43:42
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-10 11:10:09
 */
<template>
    <div id="nbVideo" class="nbVideo" ref="nbVideo" >
        <div v-if="loadVideoObj">
            <object
                :id="objId"
                classid="CLSID:0327EBC8-681D-43EA-8042-4D267F832C6B"
                :width="videoWidth"
                :height="videoHeight"
            ></object>
        </div>
        <div v-if="videoError === '0'" class="notSupport">您的浏览器不支持播放该视频,请使用IE浏览器!</div>
    </div>
</template>

<script>
import { IEVersion, ActiveXKiller, compressImg, dataURLtoBlob, readImg } from '@/utils/utils';

export default {
    name: 'NBVideo',
    props: {
        NBAction: {
            type: String,
            default: ''
        },
        // 打点播放中的点位
        Dot: {
            type: Number,
            default: 0
        },
        // 控制播放地址,非必传--拉起摄像头就不需要传
        url: {
            type: Object,
            default: () => {
                return {
                    liveUrl: '',
                    urls: []
                };

            }
        },
        // 控制播放器大小
        videoWidth: {
            type: Number,
            default: 0
        },
        videoHeight: {
            type: Number,
            default: 0
        },
        objId: {
            type: String,
            default: 'nbVideoObj'
        },
        // 控制显示的时候初始化大小
        isShowVideo: {
            type: Boolean,
            default: false
        },
        // 1直播0点播2无工具栏
        playMode: {
            type: Number,
            default: 2
        },
        // 视频播放窗口树(1-9)
        winNum: {
            type: Number,
            default: 1
        },
        // 播放列表非必传
        playList: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            curPlayStatus:'',
            videoObj: null, // 视频对象
            loadVideoObj: false,
            videoError: '-1' // -1-可以正常播放,'0'-浏览器不支持, '1'-链接不存在,'2'-直播已结束
        };
    },
    watch: {
        NBAction: {
            handler(newVal) {
                let str = newVal.split('num')[0];
                console.log('this.NBAction', str);
                if (!str) {
                    return false;
                }
                let _this = this;
                setTimeout(() => {
                    switch (str) {
                        case 'play':
                            _this.playVideo();
                            break;
                        case 'DotPlay':
                            _this.DotPlay();
                            break;
                        case 'stopVideo':
                            _this.stopVideo();
                            break;
                        case 'getCamera':
                            _this.getCamera();
                            break;
                        case 'screenShot':
                            _this.screenShot();
                            break;
                        default:
                            break;
                    }
                }, 20);
            },
            deep: true,
            immediate: true
        },
        isShowVideo: {
            handler(newVal) {
                if (newVal) {
                    // console.log('isShowVideo---newVal', typeof (newVal));
                    let _this = this;
                    // console.log('NBVideo---this.videoWidth', this.videoWidth);
                    if (IEVersion() === -1) {
                        this.videoError = '0';
                        this.$emit('videoPlayerLoaded');
                    } else {
                        console.log('NBVideo---isShowVideo', newVal);
                        if (newVal) {
                            this.loadVideoObj = true;
                            this.$nextTick(function() {
                                _this.initVideo();

                            });
                        }
                        else {

                            this.loadVideoObj = false;
                            this.handleBeforeUnload();
                            console.log('隐藏video');
                        }

                    }
                }
            },
            deep: true,
            immediate: true
        },
        playList: {// 播放列表
            handler(newVal) {
                // 监听到播放列表改变
                if (newVal.length > 0) {
                    this.setPlayListPlay();
                }
            },
            immediate: true,
            deep: true
        }

    },
    mounted() {
        //
        console.log('NBVideo---mounted');
        window.addEventListener('beforeunload', this.handleBeforeUnload, false);

    },
    beforeDestroy() {
        console.log('NBVideo---beforeDestroy');
        // debugger;
        this.handleBeforeUnload();
        window.removeEventListener('beforeunload', this.handleBeforeUnload, false);

    },
    methods: {
        // 初始化南北视频插件
        // 1设置播放模式---默认直播
        // 2设置窗口数量---默认1个窗口
        initVideo() {
            let _this = this;
            console.log('initVideo', this.videoWidth);

            if (this.videoWidth > 0) {

                this.videoObj = document.getElementById(this.objId);
                let _this = this;
                console.log('NBVideo---this.videoObj', this.videoObj);
                try {
                    _this.videoObj.slots_SetLogLeve(2);
                    _this.setPlayMode();
                    _this.setWinNum();

                } catch (error) {
                    console.log(error);
                    this.$message.error('插件加载出错!');
                } finally {
                    this.$emit('videoPlayerLoaded');
                }

            }
            else {
                setTimeout(() => {
                    _this.initVideo();
                }, 20);
            }

        },
        // 设置播放模式
        setPlayMode() {
            this.videoObj.slots_playMode_change(this.playMode);
        },
        // 设置播放窗口
        setWinNum() {
            try {
                let num = this.videoObj.slots_out_WindowsNum();
                console.log(`setWinNum---${new Date()}`, num);

                if (num != this.winNum) {
                    this.videoObj.slots_init_windows(this.winNum);
                    this.$emit('emitSetWinNum')
                }
            } catch (error) {
                console.log('setWinNum', error);
            }finally{
                //console.log('setWinNum---AttachEvent');
                this.videoObj.AttachEvent(this.callBackFun);

            }

        },
        callBackFun(num,ret){
            this.curPlayStatus=ret;
            console.log(`emitStatusChange---${new Date()}`)
            this.$emit('emitStatusChange',num,ret);
        },
        // 设置定点播放模式并且开始播放---定点播放只在点播有效
        DotPlay() {
            if (this.videoObj) {
                this.videoObj.slots_out_StopPlay();
                setTimeout(() => {
                    this.videoObj.slots_playMode_change(0);
                    this.videoObj.slots_init_windows(this.winNum);
                    console.log('NBVideo---this.Dot', this.Dot);
                    this.videoObj.slots_out_seek(this.winNum, this.Dot * 1000);
                    this.videoObj.slots_out_playvideo(this.winNum, this.url.liveUrl, ':rtsp-tcp', 1000, 20000);

                }, 30);
            }
        },
        // 拉取摄像头
        getCamera() {
            if(this.curPlayStatus!='Playing'){
                this.videoObj.slots_out_playvideo(this.winNum, 'dshow://', ':rtsp-tcp', 1000, 20000);

            }

        },
        screenShot() {
            try {
                let str = this.videoObj.slots_out_playStatus(1);
                console.log('screenShot---slots_out_playStatus', str);
                if (str == 'Playing') {
                    let base64 = this.videoObj.slots_out_Screenshot(this.winNum);
                    console.log('窗口编号:' + this.winNum + '图片数据' + base64);
                    this.$emit('changeImg', base64);

                }

            } catch (error) {
                console.log(error);
            }



        },
        // 设置播放列表播放模式---并且添加定点播放
        setPlayListPlay() {
            console.log('setPlayListPlay');
        },

        // 设置播放模式和播放窗口并且开始播放
        playVideo() {
            if (this.videoObj) {
                this.setPlayMode();
                this.setWinNum();
                this.videoObj.slots_out_playvideo(this.winNum, this.url.liveUrl, ':rtsp-tcp', 1000, 20000);
                console.log('NBVideo---playVideo', this.url.liveUrl);
            }
        },

        stopVideo() {
            if (this.videoObj) {
                this.videoObj.slots_out_StopPlay(this.winNum);
            }
        },
        handleBeforeUnload() {
            console.log('NBVideo---handleBeforeUnload');
            if (this.videoObj) {
                this.videoObj.slots_out_StopPlay(this.winNum);
                this.videoObj.slots_out_windestroy();
                ActiveXKiller(this.objId, 'nbVideo');// 单页面框架在路由不跳转时，切换组件移除ActiveX控件，解决频繁切换IE崩溃问题
                this.videoObj = null;
                this.loadVideoObj = false;
            }
        }
    }
};
</script>

<style type="text/less" lang="less" scoped>
.nbVideo {
    background-color: #000;
    width: 100%;
    height: 0;
    padding-bottom: 60%;
    position: relative;
}
.notSupport {
    width: 100%;
    color: @text_color_white;
    text-align: center;
    margin-top: 200px;
    position: absolute;
    font-size: @font28px;
}
</style>

