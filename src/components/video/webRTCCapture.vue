<template>
  <div>
      <el-button type="primary" @click="initFaceCamera">开始人脸识别</el-button>
      <div class="faceCamera">
            <video
                ref="video"
                id="video"
                width="320"
                height="240"
                preload
                autoplay
                loop
                muted
            ></video>
            <canvas ref="canvas" id="canvas" width="320" height="240"></canvas>

        </div>
        <span>{{isdetected}}</span>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
 //import dat from 'dat.gui';
//  import tracking from 'tracking/build/tracking-min.js';
require('tracking/build/tracking-min.js');
require('tracking/build/data/face-min.js');
// require('tracking/examples/assets/stats.min.js');
export default {
    data(){
        return {
            isdetected: '请您保持脸部在画面中央!',
            // videos
            myVideo: {},
            constraints: {
                audio: {
                    noiseSuppression: true,
                    echoCancellation: true
                },
                video: {
                    width: 400,
                    height: 300,
                    frameRate: 30,
                    // transform: 'scaleX(-1)',
                    facingMode: 'environment'
                }
            },
        }
    },
    mounted(){
                this.myVideo = document.getElementById('video');

    },
    methods:{
         /* --------------------人脸识别-开始-------------------- */
        async initFaceCamera() {
            this.canvas = this.$refs.canvas;
            // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
            if (!navigator.mediaDevices) {
                navigator.mediaDevices = {};
                console.log('设置mediaDevices空对象');
            }
            // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
            // 使用getUserMedia，因为它会覆盖现有的属性。
            // 这里，如果缺少getUserMedia属性，就添加它。
            if (!navigator.mediaDevices.getUserMedia) {
                navigator.getUserMedia =
                    navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia; // 有些浏览器不支持，会返回错误信息
                console.log('重新定义getUserMedia');
                if (!navigator.getUserMedia) {
                    // 不存在则报错
                    console.log('此浏览器中不包含getUserMedia方法');
                    return false;
                }
            }

            // await navigator.mediaDevices
            //     .getUserMedia(this.constraints)
            //     .then(this.getMediaStreamSuccess)
            //     .catch(this.getMediaStreamError);
            await this.getUserMedia();

            
        },
        // 拿到媒体流
        async getUserMedia() {
            console.log(`Requesting  video stream`);

            if ('mediaDevices' in navigator) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia(
                        this.constraints
                    );
                    this.getMediaStreamSuccess(stream);
                    console.log('Received local video stream');
                } catch (error) {
                    this.getMediaStreamError();
                    console.log(`getUserMedia error: ${error}`);
                }
            }
        },
        // 视频媒体流成功
        getMediaStreamSuccess(stream) {
            window.stream = stream; // make stream available to browser console
            //window.attachMediaStream(this.myVideo, stream);---ie兼容使用
            this.myVideo.srcObject = stream;
            console.log('getMediaStreamSuccess', stream);

            this.startPlay();
        },

        // 视频媒体流失败
        getMediaStreamError(error) {
            this.$message.error('视频媒体流获取错误' + error);
        },

        // 截图
        snapshot() {
            let canvas = this.$refs.picture;
            canvas.width = 400;
            canvas.height = 300;
            canvas.getContext('2d').drawImage(this.myVideo, 0, 0, canvas.width, canvas.height);
        },

        // 开始识别
        startPlay() {
            console.log('startPlay');
            this.onTrackTracking();
        },

        // 人脸侦测中
        onTrackTracking() {
            const _this = this;
            const video = this.myVideo;
            const canvas = this.canvas;
            const canvasContext = canvas.getContext('2d');
            // eslint-disable-next-line no-undef
            let tracker = new tracking.ObjectTracker('face');
            video.pause();
            video.src = '';
            tracker.setInitialScale(4);
            tracker.setStepSize(2);
            tracker.setEdgesDensity(0.1);
            // eslint-disable-next-line no-undef
            console.log('tracker setEdgesDensity');
            _this.trackerTask = tracking.track('#video', tracker, {camera: true});
            /* let element = tracking.one(this.myVideo);
            console.log('element', element);
 */
            console.log('tracker trackerTask');
            let yRect;
            tracker.on('track', function(event) {
                console.log('track event');
                if (event.data && event.data.length === 0) {
                    if (_this.isGetFace) {
                        _this.isdetected = '正在登录...';
                    } else {
                        _this.isdetected = '请您保持脸部在画面中央!';
                        canvasContext.clearRect(
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        );
                    }
                } else {
                    for (let rect of event.data.values()) {
                        console.log('已检测到人脸');
                        // _this.isdetected = '已检测到人脸，正在登录...';
                        canvasContext.strokeStyle = '#ff0000';
                        canvasContext.strokeRect(
                            rect.x,
                            rect.y,
                            rect.width,
                            rect.height
                        );
                        canvasContext.font = '11px Helvetica';
                        canvasContext.fillStyle = '#fff';
                        canvasContext.fillText(
                            'x: ' + rect.x + 'px',
                            rect.x + rect.width + 5,
                            rect.y + 11
                        );
                        canvasContext.fillText(
                            'y: ' + rect.y + 'px',
                            rect.x + rect.width + 5,
                            rect.y + 22
                        );
                        // _this.isGetFace = true;
                        // _this.shoot(
                        //     rect,
                        //     video,
                        //     canvas,
                        //     canvasContext,
                        //     tracker
                        // );
                        // window.stream.getTracks().forEach((track) => track.stop()); // 停止侦测
                        // _this.sleep(1000 * 60 * 1);

                        yRect = rect;
                        break;
                    }
                    /* event.data.forEach(function(rect) {

                    }); */
                    if (event.data && _this.count <= 10) {
                        console.log(_this.count);
                        if (_this.count < 0) {
                            _this.count = 0;
                            _this.isdetected = '请您保持脸部在画面中央!';
                        }
                        _this.count += 1;
                        if (_this.count > 10) {
                            _this.isdetected = '已检测到人脸，正在登录';
                            _this.isGetFace = true;
                            _this.shoot(
                                yRect,
                                video,
                                canvas,
                                canvasContext,
                                tracker
                            );
                            window.stream
                                .getTracks()
                                .forEach((track) => track.stop());
                            _this.count = 0;
                        }
                    } else {
                        _this.count -= 1;
                        if (_this.count < 0) {
                            _this.isdetected = '请您保持脸部在画面中央!';
                        }
                    }
                }

                /* let gui = new dat.GUI();
                gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
                gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
                gui.add(tracker, 'stepSize', 1, 5).step(0.1); */
            });
        },

        shoot(rect, video, canvas, canvasContext, tracker) {
            // 把当前视频帧内容渲染到画布上
            // canvasContext.drawImage(video,x,y,width+20,height+20);
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            canvasContext.drawImage(
                video,
                rect.x - 50,
                rect.y - 50,
                rect.width + 50,
                rect.height + 100,
                0,
                0,
                rect.width + 50,
                rect.height + 100
            );
            let imgSrc = this.canvas.toDataURL('image/png');
            // console.log(imgSrc);
            // 删除字符串前的提示信息 "data:image/png;base64,"
            let b64 = imgSrc.substring(22);
            
            let params = {
                facePic: b64, // 脸图片base64编码
                identityPic: "",
                name: 'test' // 当事人姓名
                // name: this.idCardInfo.name// 当事人姓名
            };
            console.log(params);
            //提交后台登录
        },

        // 休眠方法--测试
        sleep(numberMillis) {
            let now = new Date();
            let exitTime = now.getTime() + numberMillis;
            while (true) {
                now = new Date();
                if (now.getTime() > exitTime) {
                    return;
                }
            }
        },

        // base64转文件
        dataURLtoFile(dataurl, filename) {
            let arr = dataurl.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        },

        // 结束媒体流
        stopMediaStreamTrack() {
            // this.trackerTask.stop();// 停止侦测
            // this.trackerTask.closeCamera();// 关闭摄像头
            if (typeof window.stream === 'object') {
                if (this.myVideo.srcObject) {
                    this.myVideo.srcObject = null;
                }
                // this.$store.commit('setVideoCanvasObject', '')
                window.stream.getTracks().forEach((track) => track.stop()); // 停止侦测
            }
        }
        /* --------------------人脸识别-结束-------------------- */
    }
}
</script>

<style scoped lang='less'>
.faceCamera {
    position: relative;
    width: 500px;
    height: 400px;
    border: 1px solid #ddd;
    video,
    canvas {
        z-index: 999;
        position: absolute;
        top: 0;
        left: 0;
        // transform: translate(-50%, -50%);
    }
}
</style>