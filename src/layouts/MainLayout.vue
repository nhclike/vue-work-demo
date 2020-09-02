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
      <div class="opt-btns">
        <button class="shj-btn--primary shj-button--medium" @click="changeLeftUrl('left')">切换左侧路由</button>
        <button class="shj-btn--primary shj-button--medium" @click="changeRightUrl('right')">切换右侧路由</button>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/main/MainHeader';
export default {
    name: 'BasicLayout',
    components: {
        MainHeader
    },
    inject: ['reload'],
    data() {
        return {
            leftRouterName: 'right',
            rightRouterName: 'left'
        };
    },
    computed: {},
    watch: {},
    created() {
    // this.init();
    },
    mounted() {
    // this.init();
    },
    methods: {
    // 初始化
        init() {
            //
        },
        changeLeftUrl(routeName) {
            this.leftRouterName = routeName;
        },
        changeRightUrl(routeName) {
            this.rightRouterName = routeName;
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

