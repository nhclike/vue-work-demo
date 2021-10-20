<template>
  <div>
    <div>南北播放插件</div>
    <div>
      <el-button type="primary" @click="playVideo">播放</el-button>
       <el-button type="primary" @click="closeVideo">关闭播放器</el-button>

      <img :src="imgSrc" alt="">
    </div>
    <div class="video-box" ref="videoPlayerBox">
       <n-b-video
            :url="url"
            @videoPlayerLoaded="videoPlayerLoaded"
            :videoWidth="videoWidth"
            :isShowVideo="showPlayer"
            :playMode="playMode"
            :playList="playList"
            :NBAction="NBAction"
            ></n-b-video>

    </div>
  </div>

</template>

<script>
import NBVideo from '@/views/plugins/NBVideo';

export default {
    components: {
        NBVideo
    },
    data() {
        return {
           showPlayer: false,
            videoWidth: 640,
            videoHeight: 400,
            playMode:0,//0直播1点播
            NBAction:'',
            playList:[],
            url: {
                urls: [], // 复合画面地址
                liveUrl: '' // 直播流地址
            },
            imgSrc:""
            
        };
    },
    mounted() {
        console.log('NBVideo----mounted');
        setTimeout(()=>{
            this.showPlayer=true
        },1000)
    },
    methods: {
        videoPlayerLoaded() {
            console.log('NBVideo---videoPlayerLoaded');
            

        },
        playVideo(index) {


            // vlc视频播放---触发地址改变
           
            //this.url.liveUrl = `rtmp://172.19.82.228:1960/NBVod/mp4|D:\\SNTest\\1\\2`;
            //this.url.liveUrl = require('../../../public/video/1.mp4');
            //this.url.liveUrl='rtsp://dmcp:888888@172.19.82.241:554/cam/realmonitor?channel=5&subtype=0'
            this.url.liveUrl='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
            this.url.urls=[];
            

            this.NBAction=`playnum${new Date().getTime()}`;

        },
        closeVideo() {
           this.NBAction=`stopVideonum${new Date().getTime()}`;
        }
    }
};
</script>

<style scoped lang="less">
@camera_w: 592px;
@camera_h: 370px;
.video-box {
    width: @camera_w;
    height: @camera_h;
    z-index: 0;
    // border: 1px solid red;
}
</style>
