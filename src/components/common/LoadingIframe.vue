/* 组件-公用-背景为iframe的loading组件
 * @Author: ShiHuiJun
 * @Date: 2020-09-03 17:23:59
 * @Last Modified by: mikey.zhaopengy.zhaopeng
 * @Last Modified time: 2021-05-10 15:25:50
 */
<template>
  <div class="full-width full-height loading-iframe-box" v-show="isLoadingShow">
    <div class="vertical-horizontal-center loading-body">
        <a-icon type="loading" class="margin-right20"/>
        <span>{{loading.text}}</span>
    </div>

    <iframe src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position: absolute; visibility: inherit; top: 0px; left: 0px; width: 100%; height: 100%; z-index: -1; "></iframe>
  </div>
</template>
<script>
export default {
    name: 'loading',
    props: {
        loading: {
            type: Object,
            default: () => {
                return {
                    text: '插件加载中'
                };
            }
        },
        isLoadingShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    }
};
</script>
<style scoped lang="less">
 .loading-iframe-box {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1990;
  .loading-body{
    font-size: @font38px;
    color: @color_primary;
  }
}
</style>
