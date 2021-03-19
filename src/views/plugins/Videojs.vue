/*点播页面
 * @Author: nihc
 * @Date: 2020-09-25 17:31:48
 * @Last Modified by: nihc
 * @Last Modified time: 2021-03-19 11:02:05
 */

<template>
  <div class="video-wrapper full-height">
    <div class="video-box full-height" v-if="showVideo">

        <video-player
        class="vjs-custom-skin video-player"
        ref="videoPlayer"
        :options="playerOptions"
        @loadeddata="onPlayerLoadeddata($event)"
        @canplay="onPlayerCanplay($event)"
        @ended="onPlayerEnded($event)"
        @timeupdate="onPlayerTimeUpdate($event)"
        ></video-player>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        playParams: {
            type: Object,
            default: {
                type: 'video/mp4',
                src: require('../../../public/video/1.mp4')
            },
            require: false
        }

    },
    data() {
        return {
            showVideo: true,
            playerOptions: {
                techOrder: ['html5', 'flash'], // 兼容顺序,使用flash播放，可以播放flv格式的文件
                playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                autoplay: true, // 如果true,浏览器准备好时开始回放
                notSupportedMessage: '此视频暂无法播放!', // 无法播放时显示的信息
                sourceOrder: true,
                loop: false, // 导致视频一结束就重新开始。
                // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                muted: false, // 默认情况下将会消除任何音频。
                language: 'zh-CN',
                // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                hls: true, // 启用hls？
                flash: {
                    hls: { withCredentials: false }
                },
                html5: { hls: { withCredentials: false } },
                sources: [
                    // {
                    //     type: 'application/x-mpegURL',
                    //     src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'
                    // },
                    // {
                    //     type: 'application/x-mpegURL',
                    //     src: 'http://172.19.82.247/vod/2.mp4'
                    // },
                    // {
                    //     // withCredentials: true，
                    //     type: 'application/x-mpegURL', // hls
                    //     src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8' // url地址
                    // }
                    {
                        type: 'rtmp/flv', // rtmp
                        src: `rtmp://172.19.82.228:1960/NBVod/mp4|D:\\SNTest\\1\\2`// rtmp
                    }
                    // {
                    //     type: 'rtmp/flv', // rtmp
                    //     src: `rtmp://58.200.131.2:1935/livetv/hunantv`
                    // }
                    // {
                    //     type: 'video/mp4', // 资源格式写法：'video/mp4'，否则控制台会出现notSupportedMessage设置的错误
                    //     src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm' // url地址
                    // }
                ],
                // poster: '/static/images/author.jpg', // 你的封面地址
                // width: document.documentElement.clientWidth,
                // height: document.documentElement.clientHeight, // 设置高度，fluid需要设置成flase
                // 配置控制栏
                controlBar: {
                    volumePanel: {
                        inline: false // 音量调节是否水平
                    },
                    currentTimeDisplay: true, // 当前播放位置
                    timeDivider: true, // 时间分割线
                    durationDisplay: true, // 总时间
                    progressControl: true, // 进度条
                    remainingTimeDisplay: false, // 剩余时间
                    fullscreenToggle: true // 全屏按钮
                }
            }
        };
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player;
        }
    },
    watch: {
        playParams: {
            handler(newVal, oldVal) {
                console.log('newVal', newVal);
                this.$nextTick(function() {
                    console.log('this.player', this.player);
                    if (newVal) {
                        this.videoPlay(newVal);

                    }
                });

            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        console.log('VideoPlayer-----mounted');
        // this.videoPlay(playParams)
    },
    updated() {
        console.log('VideoPlayer-----updated');

    },
    methods: {
        videoPlay(params) {
            this.playerOptions.sources = [
                params
            ];
            this.player.play();
        },

        // 视频加载完成---改变视频播放的起点--即为视频打点的位置
        onPlayerLoadeddata(player) {
            console.log('Loadeddata>视频加载完成!', player);
            // this.player.currentTime(this.videoDot);
        },

        // 可以播放视频
        onPlayerCanplay(player) {
            console.log('Canplay>可以播放视频!', player);

        },
        // 视频播放时间更新事件
        onPlayerTimeUpdate(player) {
            // console.log('timeUpdate>播放时间更新!', player);
            // let curTime = this.player.currentTime();
            // console.log(curTime);
        },
        // 视频播放结束--自动播放下段视频
        onPlayerEnded(player) {
            console.log('Ended>视频播放结束!', player);


        }
    }
};
</script>

<style  scoped lang="less" type="text/less">
/deep/.video-player .video-js{
    width: auto;
}

.video-box{
    max-width: 1500px;
    margin: 0 auto;
}
</style>
