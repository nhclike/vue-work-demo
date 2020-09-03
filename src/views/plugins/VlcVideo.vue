/* vlc播放器 */
<template>
  <div class="vlc-box">
    <div v-if="videoError!=='-1'" class="vlcVideo pos-r">
      <div
        v-if="videoError==='0'"
        class="notSupportVlc pos-a vertical-horizontal-center"
      >您的浏览器不支持播放该视频,请使用IE浏览器!</div>
      <div
        v-if="videoError==='1'"
        class="notSupportVlc pos-a vertical-horizontal-center"
      >该视频链接不存在,暂无法播放!</div>
      <div
        v-if="videoError==='2'"
        class="notSupportVlc pos-a vertical-horizontal-center"
      >议题已结束,无法查看直播视频!</div>
    </div>

    <div v-if="videoError==='-1'" ref="vlcVideo" class="vlcVideo">
      <object
        class="vlcObj"
        type="application/x-vlc-plugin"
        id="vlc"
        events="True"
        classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"
        codebase
        width="340"
        height="190"
      >
        <param name="mrl" value />
        <param name="volume" value="50" />
        <param name="autoplay" value="true" />
        <param name="loop" value="false" />
        <param name="fullscreen" value="true" />
      </object>
    </div>
  </div>
</template>

<script>
export default {
    name: 'VlcVideo',
    components: {},
    inject: ['reload'],
    props: {},
    data() {
        return {
            videoError: '-1', // -1-可以正常播放,'0'-浏览器不支持, '1'-链接不存在,'2'-直播已结束
            isIE: true
        };
    },
    computed: {
    // computeFunction() {
    //     return value;
    // }
    },
    watch: {},
    methods: {
        // 切换视频
        playVideo(url) {
            if (url) {
                if (this.isIE) {
                    this.videoError = '-1';
                    this.$nextTick(() => {
                        let vlc = document.getElementById('vlc');
                        let mrl = encodeURI(url);
                        // let mrl = encodeURI(
                        //   'rtsp://admin1:admin1@172.19.82.241:554/cam/realmonitor?channel=21&subtype=0'
                        // );
                        // let mrl = encodeURI(
                        //   'rtmp://172.19.82.130:1960/NBVod/mp4|D:\\NBVideo\\202004\\(2018)黔23行初235号1/(2018)黔23行初235号_0409_141825_CH52000'
                        // );
                        let id = vlc.playlist.add(mrl);
                        vlc.video.aspectRatio = '4:3'; // 获取和设置长宽比使用视频屏幕。该属性采用字符串作为输入值。有效值为：“1:1”，“4:3”，“16:9”，“16:10”，“221:100”和“5:4”
                        let vlcVideo = this.$refs.vlcVideo;
                        let vlcH = vlcVideo.clientHeight;
                        let vlcW = vlcVideo.clientWidth;
                        vlc.style.height = `${vlcH}px`;
                        vlc.style.width = `${vlcW}px`;
                        vlc.style.position = `absolute`;
                        vlc.playlist.playItem(id);
                    });
                } else {
                    this.videoError = '0';
                }
            } else {
                this.videoError = '1';
            }
        }
    }
};
</script>

<style lang="less" scoped>
@spacing: 20px;
@top_h: 90px;
@left_w: 420px;
@right_w: 380px;
@confBox_h: 460px;
@video_h: 190px;
@video_w: 340px;
.right {
  width: 380px;
  margin-left: 40px;
  .notSupportVlc {
    width: @video_w;
    color: @text_color_white;
    text-align: center;
    padding: 10px;
  }
  .box {
    background: @text_color_white;
    padding: @spacing;
    .box-top {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid @border_color;
      margin-bottom: 25px;
      .title {
        font-size: @font22px;
      }
      .btn {
        width: 110px;
        line-height: 40px;
        font-size: @font22px;
        padding: 0;
      }
    }

    .box-content {
      // 视频
      &.video {
        height: 100%;
      }
      .section {
        &.topicAndTrialVideo {
          height: calc(100% - 250px);
          overflow-y: auto;
        }
        .section-top {
          margin-bottom: 10px;
          .title {
            font-size: @font18px;
            color: @text_color_content;
          }
        }
        .section-content {
          .title {
            margin-bottom: 10px;
          }
          .subTitle {
            line-height: 20px;
            cursor: pointer;
            padding-left: 30px;
            color: @text_color_content;
            margin-bottom: 10px;
            &.active {
              color: @color_primary;
            }
            &:hover {
              color: @color_primary;
            }
          }
          .icon-video {
            // background: url('~assets/img/icon/icon_video.png') no-repeat center
            //   center;
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
  .video-box {
    .vlcVideo {
      margin-bottom: 20px;
      width: @video_w;
      height: @video_h;
      background: @color_black;
      position: relative;
      .vlcObj {
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>

<style lang="less">
</style>

