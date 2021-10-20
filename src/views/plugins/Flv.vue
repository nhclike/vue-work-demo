<!--
 * @Descripttion: 
 * @Author: zhangt
 * @Date: 2021-05-10 14:15:06
 * @Last Modified by: zhangt
 * @Last Modified time: 2021-05-12 15:44:26
-->
<template>
  <div class="nbVideo">
    <div id="videoBox" v-if="loadVideoObj" class="full-height" :style="{height: videoHeight}">
      <video id="video" style="width: 100%;" :style="{height: videoHeight}"></video>
    </div>
    <div v-if="videoError === '0'" class="notSupport">您的浏览器不支持播放该视频,请使用360或谷歌浏览器!</div>
  </div>
</template>

<script>
import { IEVersion, ActiveXKiller } from '@/utils/utils';
import flvjs from 'flv.js/dist/flv.min.js'  // 引用编译后的es5版本
export default {
  name: "Flv",
  props: {
    NBAction: {
        type: String,
        default: ''
    },
    // 控制播放地址
    url: {
        type: Object,
        default: () => {
          return {
            liveUrl: 'http://172.19.82.247/vod/2.mp4',
            urls: []
          }
        }
    },
    // 控制播放器大小
    videoWidth: {
        type: Number,
        default: 500
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
      flvPlayer: null,
      loadVideoObj: true,
      videoError: '-1' // -1-可以正常播放,'0'-浏览器不支持, '1'-链接不存在,'2'-直播已结束
    }
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
                    if(this.playMode === 1) {
                      _this.playDemand()
                    } else {
                      _this.playLive()
                    }
                    break;
                case 'DotPlay':
                    _this.DotPlay();
                    break;
                case 'stopVideo':
                    _this.destroyVideo();
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
                    this.loadVideoObj = true;
                    this.$nextTick(function() {
                      if(this.playMode === 1) {
                        _this.playDemand()
                      } else {
                        _this.playLive()
                      }
                    });
            }
        },
        deep: true,
        immediate: true
    },
    playList: {
        handler(newVal) {
            // 监听到播放列表改变
            if (newVal.length > 0) {
                // this.setPlayListPlay();
            }
        },
        immediate: true,
        deep: true
    }
  },
  mounted() {
    console.log('flv---mounted');
    window.addEventListener('beforeunload', this.handleBeforeUnload, false);
    this.playLive()
  },
  beforeDestroy() {
    console.log('flv---beforeDestroy');
    // debugger;
    this.handleBeforeUnload();
    window.removeEventListener('beforeunload', this.handleBeforeUnload, false);
  },
  methods: {
    playLive() {
      if(this.url.liveUrl === '') {
        this.$emit('videoPlayerLoaded');
        return
      }
      this.destroyVideo()
      try {
        if (flvjs.isSupported()) {
          let videoElement = document.getElementById('video');
          this.flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: this.url.liveUrl,
            hasVideo: true,
            hasAudio: true,
            isLive: true
          });
          this.flvPlayer.attachMediaElement(videoElement);
          this.flvPlayer.load();
          this.flvPlayer.play();
        } else {
          this.videoError = '0';
        }
      } catch(error) {
        console.log(error);
        this.$message.error('插件加载出错!');
      } finally {
        this.$emit('videoPlayerLoaded');
      }
      this.flvPlayer.on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
		    console.log("errorType:", errorType);
        console.log("errorDetail:", errorDetail);
        console.log("errorInfo:", errorInfo);
        
      });
      // setInterval(() => {
      //   if (this.player.buffered.length) {
      //     let end = this.player.buffered.end(0);//获取当前buffered值
      //     let diff = end - this.player.currentTime;//获取buffered与currentTime的差值
      //     if (diff >= 0.5) {//如果差值大于等于0.5 手动跳帧 这里可根据自身需求来定
      //       this.player.currentTime = this.player.buffered.end(0);//手动跳帧
      //   }
      //   }
      // }, 2000); 
    },
    playDemand() {
      try {
        if (flvjs.isSupported()) {
          let videoElement = document.getElementById('video');
          this.flvPlayer = flvjs.createPlayer({
            type: 'mp4',
            url: this.url.liveUrl
          });
          this.flvPlayer.attachMediaElement(videoElement);
          this.flvPlayer.load();
          this.flvPlayer.play();
        } else {
          this.videoError = '0';
        }
      } catch(error) {
        console.log(error);
        this.$message.error('插件加载出错!');
      } finally {
        this.$emit('videoPlayerLoaded');
      }
      
      this.flvPlayer.on('error', err => {
        console.log('flv err', err);
      });
    },
    // 设置定点播放模式并且开始播放---定点播放只在点播有效
    DotPlay() {
      if (this.flvPlayer) {
        setTimeout(() => {
            console.log('flv---this.Dot', this.Dot);
          this.flvPlayer.currentTime = this.Dot
        }, 30);
      }
    },
    destroyVideo() {
      if(this.flvPlayer){
        this.flvPlayer.pause();
        this.flvPlayer.unload();
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
        this.flvPlayer = null;
      }
    },
    handleBeforeUnload() {
        console.log('flv---handleBeforeUnload');
        if (this.flvPlayer) {
            this.destroyVideo();
            ActiveXKiller('videoBox', 'video');// 单页面框架在路由不跳转时，切换组件移除ActiveX控件，解决频繁切换IE崩溃问题
            this.flvPlayer = null;
            this.loadVideoObj = false;
        }
    }
  }
}
</script>

<style lang="less" scoped>
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
