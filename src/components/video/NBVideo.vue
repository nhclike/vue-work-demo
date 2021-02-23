<template>
  <div>
    <div>南北播放插件</div>
    <div>
      <el-button type="primary" @click="initCameraPhoto">显示插件</el-button>
      <el-button type="primary" @click="takePhoto">拍照</el-button>
            <el-button type="primary" @click="closeVideo">关闭播放器</el-button>

      <img :src="imgSrc" alt="">
    </div>
    <div
      class="cameraBox vertical-horizontal-center"
      ref="cameraBox" >
      <n-b-video
          ref="nbVideo"
          :isShowVideo="showCamera"
          @videoPlayerLoaded="videoPlayerLoaded"
          @changeImg="changeImg"
          :videoWidth="cameraWidth"
          :videoHeight="cameraHeight"
          :NBAction="cameraAction"
      ></n-b-video>
    </div>
  </div>

</template>

<script>
import NBVideo from '@/views/plugins/NewNBVideo';

export default {
    components: {
        NBVideo
    },
    data() {
        return {
            showCamera: false, // 显示photo组件
            cameraAction: '',
            cameraHeight: 0,
            cameraWidth: 0,
            isLoaded: false,
            timeOutNum: 2000,
            imgSrc: ''
        };
    },
    mounted() {
        console.log('NBVideo----mounted');
    },
    methods: {
        videoPlayerLoaded() {
            console.log('NBVideo---videoPlayerLoaded');
            this.isLoaded = true;
            let _this = this;
            _this.cameraAction = `getCameranum${new Date().getTime()}`;

        },
        initCameraPhoto() {

            let _this = this;
            _this.showCamera = true;

            this.$nextTick(() => {
                _this.cameraHeight = _this.$refs.cameraBox.clientHeight;
                _this.cameraWidth = _this.cameraHeight * 16 / 10;
                console.log('this.cameraHeight', this.cameraHeight, 'this.cameraWidth', this.cameraWidth);

            });

            this.cameraTimer = setInterval(() => {
                if (_this.isLoaded) {
                    _this.takePhoto();
                }
            }, this.timeOutNum);
        },
        takePhoto() {
            console.log('NBVideo---takePhoto');
            this.cameraAction = `screenShotnum${new Date().getTime()}`;
        },
        changeImg(b64) {
            console.log(`changeImg${b64}`);
            let src = 'data:image/png;base64,' + b64;
            this.imgSrc = src;
        },
        closeVideo() {
            if (this.cameraTimer) {
                clearInterval(this.cameraTimer);
                this.cameraTimer = null;
            }
            this.showCamera = false;
            this.isLoaded = false;
        }
    }
};
</script>

<style scoped lang="less">
@camera_w: 592px;
@camera_h: 370px;
.cameraBox {
    width: @camera_w;
    height: @camera_h;
    z-index: 0;
    // border: 1px solid red;
}
</style>
