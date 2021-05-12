/* 南北播放插件
 * @Author: zhangt
 * @Date: 2020-09-03 17:47:08
 * @Last Modified by: nihc
 * @Last Modified time: 2021-01-18 15:47:34
 */

<template>
    <div id="nbVideo" class="nbVideo" ref="nbVideo">
        <div v-if="loadVideoObj">
            <object
                :id="objId"
                classid="CLSID:F29190C4-EC83-4426-B1E4-CDFD59267F8D"
                :width="videoWidth"
                :height="videoHeight"
            ></object>
        </div>
        <div v-if="videoError === '0'" class="notSupport">您的浏览器不支持播放该视频,请使用IE浏览器!</div>
    </div>
</template>

<script>
import { IEVersion, ActiveXKiller } from '@/utils/utils';

export default {
    name: 'NBVideo',
    props: {
        NBAction: {
            type: String,
            default: ''
        },
        Dot: {
            type: Number,
            default: 0
        },
        // 控制播放地址
        url: {
            type: Object,
            default: {
                liveUrl: '',
                urls: []
            }
        },
        // 控制播放器大小
        videoWidth: {
            type: Number,
            default: 500
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
        // 0直播1点播
        playMode: {
            type: Number,
            default: 0
        },
        playList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            videoObj: null, // 视频对象
            loadVideoObj: false,
            videoError: '-1' // -1-可以正常播放,'0'-浏览器不支持, '1'-链接不存在,'2'-直播已结束
        };
    },
    computed: {
        videoHeight() {
            return this.videoWidth / 1.66666;
        }
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
                    let _this = this;
                    console.log('NBVideo---this.videoWidth', this.videoWidth);
                    if (IEVersion() === -1) {
                        this.videoError = '0';
                        this.$emit('videoPlayerLoaded');
                    } else {
                        this.loadVideoObj = true;
                        this.$nextTick(function() {
                            _this.initVideo();
                        });
                    }
                }
            },
            deep: true,
            immediate: true
        },
        playList: {
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
        // 1初始化大小
        // 2设置播放模式---默认直播
        initVideo() {
            this.videoObj = document.getElementById(this.objId);
            console.log('NBVideo---this.videoObj', this.videoObj);
            try {
                this.videoObj.NB_PlayOcx_InitSize(this.videoWidth, this.videoHeight);
            } catch (error) {
                console.log(error);
                this.$message.error('插件加载出错!');
            } finally {
                this.$emit('videoPlayerLoaded');
            }
        },

        // 设置播放模式
        setPlayMode() {
            this.videoObj.NB_PlayOcx_PlayMode(this.playMode);
        },

        // 设置定点播放模式并且开始播放---定点播放只在点播有效
        DotPlay() {
            if (this.videoObj) {
                this.videoObj.NB_PlayOcx_CloseVideo();
                setTimeout(() => {
                    this.videoObj.NB_PlayOcx_PlayMode(1);
                    console.log('NBVideo---this.Dot', this.Dot);
                    this.videoObj.NB_PlayOcx_StreamSeek(2, this.Dot);
                    this.videoObj.NB_PlayOcx_StartVideo(this.url.liveUrl);
                }, 30);
                /* let _this=this;
                setTimeout(() => {
                    _this.videoObj.NB_PlayOcx_StreamSeek(2,_this.Dot);
                }, 20); */
            }
        },

        // 设置播放列表播放模式---并且添加定点播放
        setPlayListPlay() {
            this.videoObj.NB_PlayOcx_PlayMode(1);
            this.videoObj.NB_PlayOcx_StreamSeek(2, this.Dot);
            this.videoObj.NB_PlayOcx_SetPlayList(this.playList);
        },

        // 设置播放模式并且开始播放
        playVideo() {
            if (this.videoObj) {
                this.setPlayMode();
                this.videoObj.NB_PlayOcx_StartVideo(this.url.liveUrl);
                console.log('NBVideo---playVideo', this.url.liveUrl);
            }
        },

        stopVideo() {
            if (this.videoObj) {
                this.videoObj.NB_PlayOcx_CloseVideo();
            }
        },
        handleBeforeUnload() {
            console.log('NBVideo---handleBeforeUnload');
            if (this.videoObj) {
                this.videoObj.NB_PlayOcx_CloseVideo();
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
