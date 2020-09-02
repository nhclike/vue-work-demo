/**
* 视频监控
*/
<template>
    <div class="video-surveillance clearfix">
        <div class="monitor-tree fl">
            <MonitorTree @playVideo="playVideo"></MonitorTree>
        </div>
        <div class="monitor-content fl">
            <h2>视频监控</h2>
            <div class="monitor-box clearfix">
                <div class="monitor-item" :class="{'active':activePlayer===1}" @click="changePlayer(1)">
                    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions[0]" :playsinline="true" playbackRate="0.1" height="243px">
                    </video-player>
                </div>
                <div class="monitor-item" :class="{'active':activePlayer===2}" @click="changePlayer(2)">
                    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions[1]" :playsinline="true" playbackRate="0.1">
                    </video-player>
                </div>
                <div class="monitor-item" :class="{'active':activePlayer===3}" @click="changePlayer(3)">
                    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions[2]" :playsinline="true" playbackRate="0.1">
                    </video-player>
                </div>
                <div class="monitor-item" :class="{'active':activePlayer===4}" @click="changePlayer(4)">
                    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions[3]" :autoplay="true" :playsinline="true" playbackRate="0.1">
                    </video-player>
                </div>
                <div class="monitor-item" :class="{'active':activePlayer===5}" @click="changePlayer(5)">
                    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions[4]" :playsinline="true" playbackRate="0.1">
                    </video-player>
                </div>
                <div class="monitor-item" :class="{'active':activePlayer===6}" @click="changePlayer(6)">
                    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions[5]" :playsinline="true" playbackRate="0.1">
                    </video-player>
                </div>
                <div class="monitor-item" :class="{'active':activePlayer===7}" @click="changePlayer(7)">
                    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions[6]" :playsinline="true" playbackRate="0.1">
                    </video-player>
                </div>
                <div class="monitor-item" :class="{'active':activePlayer===8}" @click="changePlayer(8)">
                    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions[7]" :playsinline="true" playbackRate="0.1">
                    </video-player>
                </div>
                <div class="monitor-item" :class="{'active':activePlayer===9}" @click="changePlayer(9)">
                    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions[8]" :playsinline="true" playbackRate="0.1">
                    </video-player>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MonitorTree from '@/components/carManage/currentMonitor/MonitorTree';
export default {
    name: '',
    components: {
        MonitorTree
    },
    data() {
        return {
            activePlayer: 1,
            showAll: false,
            currentPath: '',
            monitorData: [],
            playerOptions: [{
                language: 'en',
                width: '432px',
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                sourceOrder: true,
                flash: {
                    hls: { withCredentials: false },
                    swf: './static/video-js.swf'
                },
                sources: [{
                    type: '',
                    src: ''
                }],
                autoplay: true,
                techOrder: ['html5', 'flash'] // 设置顺序，
            }, {
                language: 'en',
                width: '432px',
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                sourceOrder: true,
                flash: {
                    hls: { withCredentials: false },
                    swf: './static/video-js.swf'
                },
                sources: [{
                    type: '',
                    src: ''
                }],
                techOrder: ['html5', 'flash'] // 设置顺序，
            }, {
                language: 'en',
                width: '432px',
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                sourceOrder: true,
                flash: {
                    hls: { withCredentials: false },
                    swf: './static/video-js.swf'
                },
                sources: [{
                    type: '',
                    src: ''
                }],
                techOrder: ['html5', 'flash'] // 设置顺序，
            }, {
                language: 'en',
                width: '432px',
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                sourceOrder: true,
                flash: {
                    hls: { withCredentials: false },
                    swf: './static/video-js.swf'
                },
                sources: [{
                    type: '',
                    src: ''
                }],
                techOrder: ['html5', 'flash'] // 设置顺序，
            }, {
                language: 'en',
                width: '432px',
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                sourceOrder: true,
                flash: {
                    hls: { withCredentials: false },
                    swf: './static/video-js.swf'
                },
                sources: [{
                    type: '',
                    src: ''
                }],
                techOrder: ['html5', 'flash'] // 设置顺序，
            }, {
                language: 'en',
                width: '432px',
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                sourceOrder: true,
                sources: [{
                    type: '',
                    src: ''
                }],
                flash: {
                    hls: { withCredentials: false },
                    swf: './static/video-js.swf'
                },
                techOrder: ['html5', 'flash'] // 设置顺序，
            }, {
                language: 'en',
                width: '432px',
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                sourceOrder: true,
                flash: {
                    hls: { withCredentials: false },
                    swf: './static/video-js.swf'
                },
                sources: [{
                    type: '',
                    src: ''
                }],
                techOrder: ['html5', 'flash'] // 设置顺序，
            }, {
                language: 'en',
                width: '432px',
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                sourceOrder: true,
                flash: {
                    hls: { withCredentials: false },
                    swf: './static/video-js.swf'
                },
                sources: [{
                    type: '',
                    src: ''
                }],
                techOrder: ['html5', 'flash'] // 设置顺序，
            }, {
                language: 'en',
                width: '432px',
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                sourceOrder: true,
                sources: [{
                    type: '',
                    src: ''
                }],
                flash: {
                    hls: { withCredentials: false },
                    swf: './static/video-js.swf'
                },
                techOrder: ['html5', 'flash'] // 设置顺序，
            }]
        };
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player;
        },
        currentStream() {
            return this.currentTech === 'Flash' ? 'RTMP' : 'HLS';
        }
    },
    methods: {
        playVideo(src) {
            if (this.activePlayer > 9) {
                this.activePlayer = 1;
                this.showAll = true;
                this.playerOptions[this.activePlayer - 1].sources[0].src = src;
                this.playerOptions[this.activePlayer - 1].sources[0].type = '';
                this.playerOptions[this.activePlayer - 1].autoplay = true;
            } else {
                this.playerOptions[this.activePlayer - 1].sources[0].src = src;
                this.playerOptions[this.activePlayer - 1].sources[0].type = '';
                this.playerOptions[this.activePlayer - 1].autoplay = true;
                this.activePlayer++;
            }
        },
        changePlayer(index) {
            this.activePlayer = index;
        }
    }
};
</script>

<style scoped lang="less">
.monitor-tree{
    font-size: 14px;
    float: left;
    width:320px;
    min-height: 100%;
    background: #fff;
    padding:25px;
}
.video-surveillance{
    background: #fff;
}
.monitor-content{
    font-size: 14px;
    width:1300px;
    float: left;
    margin-left: 28px;
    background: #fff;
    padding-top:25px;
    h2{
        font-size: 18px;
        color:#333;
        font-weight: 700;
        margin-bottom: 25px;
    }
    .monitor-box{
        width:1300px;
        .monitor-item{
            float:left;
            width:432px;
            height: 243px;
            float:left;
            border:1px solid #00A2FF;
            background: #0E1224;
            overflow: hidden;
        }
    }
}
.monitor-content .monitor-box  .active{
    border:1px solid #0dd266;
}
</style>
<style lang="less">
.video-player{
    height:100%;
}
.vjs-custom-skin > .video-js{
    height:100%;
}
.vjs-custom-skin > .video-js .vjs-big-play-button{
    display:none !important;
}
.vjs-error .vjs-error-display .vjs-modal-dialog-content{
    display: none;
}
.video-js .vjs-progress-control{
    display: none !important;
}
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-time-control{
    display: none !important;
}
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate{
    display: none;
}
</style>
