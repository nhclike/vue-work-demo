/* 空白页--设置项目统一背景 */
<template>
  <div class="container-box">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'Blank'
};
</script>
<style scoped lang="less">
.container-box {
  background: red;
}
</style>
<style lang="less">
</style>
