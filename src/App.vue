<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
let beforeUnloadTime,
    gapTime;
export default {
    // 刷新当前页方法
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            gap_time: '',
            isRouterAlive: true
        };
    },

    mounted() {
        // 对于ie|谷歌|360：
        // 页面加载时只执行onload
        // 页面刷新时，刷新之前执行onbeforeunload事件，在新页面即将替换旧页面时onunload事件，最后onload事件。
        // 页面关闭时，先onbeforeunload事件，再onunload事件。
        // 对于火狐:
        // 页面刷新时，只执行onunload；页面关闭时，只执行onbeforeunload事件
        window.onbeforeunload = function(e) {
            let isFireFox = navigator.userAgent.indexOf('Firefox') > -1;// 是否是火狐浏览器
            beforeUnloadTime = new Date().getTime();
            if (isFireFox) {
                // 火狐关闭
                this.isLoginMut(false);
                let storage = window.localStorage;
                storage.clear();
            }
        };
        window.addEventListener('unload', this.saveState);
    },
    methods: {
        ...mapMutations(['isLoginMut']),
        saveState() {
            gapTime = new Date().getTime() - beforeUnloadTime;
            if (gapTime <= 5) {
                // 浏览器关闭
                this.isLoginMut(false);
                let storage = window.localStorage;
                storage.removeItem('state');
                // storage.clear();
            } else {
                // 浏览器刷新
            }
        },
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            });
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>
<style lang="less">
/* 定义滚动条 */

//  滚动条整体部分
::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}

// 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条
::-webkit-scrollbar-thumb {
  background: #aaa;
  min-width: 150px;
  border-radius:@border_radius_large;
  //   background-color: #0ae;
  //   background-image: -webkit-gradient(
  //     linear,
  //     0 0,
  //     0 100%,
  //     color-stop(0.5, rgba(255, 255, 255, 0.2)),
  //     color-stop(0.5, transparent),
  //     to(transparent)
  //   );
}

::-webkit-scrollbar-thumb:vertical:hover {
  background: #555555;
}

::-webkit-scrollbar-thumb:horizontal:hover {
  background: #555555;
}

// 滚动条的轨道（里面装有Thumb）
// ::-webkit-scrollbar-track
// {
//     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
//     border-radius: @border_radius_large;
//     background-color: #F5F5F5;
// }

// 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
// ::-webkit-scrollbar-button {
//   width: 10px;
//   height: 20px;
//   background: aquamarine;
// }

// 内层轨道，滚动条中间部分（除去）
::-webkit-scrollbar-track-piece {
  background-color: #eee;
  border-radius: @border_radius_middle;
}

// ::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处

// :-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件

#app {
//   scrollbar-arrow-color: aqua;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @text_color_black;
  min-width: 1024px;
  min-height: 600px;
  height: 100%;
  margin: 0;
  padding: 0;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
