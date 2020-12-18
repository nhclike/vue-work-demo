/* 庭审主页面框架---包含2个子路由 */
<template>
  <div class="basic-layout full-height">
    <div class="top">
      <MainHeader></MainHeader>
    </div>
    <div class="content">
      <div class="left">left内容</div>
      <div class="middle full-height">
        <!-- 路由匹配到的组件将显示在这里 -->
        <router-view :name="leftRouterName"></router-view>
      </div>
      <div class="right full-height">
        <!-- 路由匹配到的组件将显示在这里 -->
        <router-view :name="rightRouterName"></router-view>
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
  </div>
</template>

<script>
import MainHeader from '@/components/main/MainHeader';
export default {
    name: 'MainLayout',
    components: {
        MainHeader
    },
    inject: ['reload'],
    data() {
        return {
            leftRouterName: 'TopicReader',
            rightRouterName: '',
            optBtns: [],
            activeIndex: -1
        };
    },
    computed: {},
    watch: {},
    created() {
    // this.init();
    },
    mounted() {
        this.init();
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
                    name: '案件信息',
                    leftRouterName: 'TopicReader',
                    rightRouterName: '',
                    url: '',
                    func: 'changeRouter'
                }
            ];
            this.activeIndex = 0;
        },
        // 路由切换
        changeRouter(item) {
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
    .left {
      flex: 1;
      background: #ddd;
    }
    .middle {
      flex: 2;
    }
    .right {
      flex: 2;
    }
    .opt-btns {
      flex: 1;
      background: red;
    }
  }
}
</style>

