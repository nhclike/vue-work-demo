/* 庭审主页面框架---包含2个子路由 */
<template>
  <div class="basic-layout full-height">
    <div class="top">
      <MainHeader></MainHeader>
    </div>
    <div class="content" v-if="showContent">
      <div class="left">left内容</div>
      \<div class="middle full-height pos-r" ref="leftBox">
            <!-- 路由匹配到的组件将显示在这里 -->
            <router-view 
            ref="leftRouter"
            :name="leftRouterName"         
            v-if="!slidStatus.rightScale"
            ></router-view>
            <div class="controlBox">
                    <img v-show="!slidStatus.leftScale" @click="leftBigger" src="@/assets/images/icon/icon-bigger.png" alt="">
                    <img v-show="slidStatus.leftScale" @click="splitScreen" src="@/assets/images/icon/icon-smaller.png" alt="">
                </div>
      </div>
      <div class="right full-height pos-r" ref="rightBox" >
        <!-- 路由匹配到的组件将显示在这里 -->
        <router-view 
          ref="rightRouter"
          v-if="!slidStatus.leftScale"
          :name="rightRouterName">
          </router-view>
         <div class="controlBox">
              <img v-show="!slidStatus.rightScale" @click="rightBigger" src="@/assets/images/icon/icon-bigger.png" alt="">
              <img v-show="slidStatus.rightScale" @click="splitScreen" src="@/assets/images/icon/icon-smaller.png" alt="">
          </div>
      </div>
      <div class="opt-btns pos-r" v-if="optBtns.length>0">
                <button
                    v-for="(btn,index) in optBtns"
                    :key="index"
                    @click="clickBtn(btn.func,btn,index)"
                    v-show="btn.isShow"
                    :class="[activeIndex==index?'active':'']">
                <img :src="`/images/trial/${btn.icon}.png`" alt="">
                <!-- <img src="/images/trial/caseInfo.png" alt=""> -->
                {{btn.name}}
                </button>
       </div>
    </div>
    <loading-iframe :isLoadingShow="isInitLoadingShow" :loading="initLoading"></loading-iframe>

  </div>
</template>

<script>
import MainHeader from '@/components/manage/MainHeader';
import LoadingIframe from '@/components/common/LoadingIframe';

export default {
    name: 'MainLayout',
    components: {
        MainHeader,
        LoadingIframe
    },
    inject: ['reload'],
    data() {
        return {
            leftRouterName: 'TopicReader',
            rightRouterName: '',
            isInitLoadingShow: false, // 初始页面加载显示是否显示控制
            initLoading: {// 初始页面加载显示框
                text: '正在与审判长建立连接'
            },
            optBtns: [],
            showContent:true,
            activeIndex: -1,
             slidStatus: { // 分屏控制状态
                leftScale: true,
                rightScale: false
            },
        };
    },
    computed: {},
    watch: {},
    created() {
    // this.init();
    },
    mounted() {
                    //   this.isInitLoadingShow = true;

        this.init();

        // let _this=this;
        // setTimeout(()=>{
        //   _this.showContent=true;
        //    _this.$nextTick(() => {
        //                 _this.isInitLoadingShow = false;
        //             });
        // },1000*3)
    },
    methods: {
    // 初始化
        init() {
            //
            this.initBtnAuthorize();
        },
        clickBtn(func, item, index) {
            this.activeIndex = index;
            if (this[func]) {
                this[func](item);
            }
        },
        initBtnAuthorize() {
            this.optBtns = [
                {
                    isShow: true,
                    icon: 'caseInfo',
                    name: '视频播放',
                    leftRouterName: 'TopicReader',
                    rightRouterName: 'Videojs',
                    url: '',
                    func: 'changeRouter'
                },
                 {
                    isShow: true,
                    icon: 'caseInfo',
                    name: 'WPS',
                    leftRouterName: 'TopicReader',
                    rightRouterName: 'Wps',
                    url: '',
                    func: 'changeRouter'
                }
            ];
            this.activeIndex = 0;
        },
        // 路由切换
        changeRouter(item) {
             // 切换菜单先分屏
            if (this.slidStatus.leftScale || this.slidStatus.rightScale) {
                this.splitScreen();
            }
            setTimeout(()=>{
  if (item.leftRouterName) {
                this.leftRouterName = item.leftRouterName;
            }
            if (item.rightRouterName) {
                this.rightRouterName = item.rightRouterName;

            }
            if (item.url) {
                this.$router.push({
                    path: item.url
                    // query: {
                    //     id: 'id'
                    // }
                });
            }
            },1000)
          
        },
        splitScreen() {
            this.$refs.rightBox.style.display = 'block';
            this.$refs.leftBox.style.display = 'block';
            let lrem = '9.3rem';
            this.$refs.leftBox.style.width = `${lrem}`;
            this.$refs.leftBox.style.flex = `0 0 ${lrem}`;
            this.slidStatus = {
                leftScale: false,
                rightScale: false
            };
        },
        leftBigger() {
            this.$refs.leftBox.style.display = 'block';
            this.$refs.leftBox.style.flex = 1;
            this.$refs.rightBox.style.display = 'none';
            this.slidStatus = {
                leftScale: true,
                rightScale: false
            };
        },
        rightBigger() {
            this.$refs.rightBox.style.display = 'block';
            this.$refs.rightBox.style.flex = 1;
            this.$refs.leftBox.style.display = 'none';
            this.slidStatus = {
                leftScale: false,
                rightScale: true
            };


        }
    }
};
</script>
<style scoped lang="less">
.basic-layout {
  font-size: @font20px;
  background: yellow;
  .content {
    height: calc(100% - @top_menu_h);
    display: flex;  
      position: relative;
    .left {
      width: 400px;
 padding:0 20px;
            position: relative;
      background: #ddd;           
       position: relative;

    }
    .middle {
      flex:1;
      width: 930px;

    }
    .right {
      display: none;
      min-width: 400px;
    }
    .controlBox{
      position: absolute;
      top:10px;
      right: 10px;
      img{
          width:40px;
          height: 40px;
      }
    }
    .opt-btns {
       flex: 0 0 180px;
            width: 180px;
            margin-left: 40px;
      background: red;
    }
  }
}
</style>

