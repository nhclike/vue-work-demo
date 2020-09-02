/* 公用-404 */
<template>
  <div class="full-width full-height error">
    <img src="" alt="">
    <span>抱歉，页面丢失了</span>
  </div>
</template>
<script>
export default {
    name: 'Error',
    data() {
        return {};
    }
};
</script>
<style scoped lang="less">
  .error{
    font-size: @font24px;
    color: @color_info;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      width: 174px;
      margin-bottom: 20px;
    }
  }
</style>
