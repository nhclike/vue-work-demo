<template>
  <div class="manage-layout">
    <div class="top">
      <MainHeader></MainHeader>
    </div>
    <div class="left">
      left
       <LeftMenu></LeftMenu>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/main/MainHeader';
import LeftMenu from '@/components/main/LeftMenu';
export default {
    name: 'ManageLayout',
    components: {
        MainHeader,
        LeftMenu
    },
    data() {
        return {};
    }
};
</script>

<style scoped lang="less">
.manage-layout{
  height: 100%;
  width: 100%;
  background: red;
  font-size: @font20px;
  position: relative;
  .top{
    height: 100px;
    width: 100%;
    background: yellow;
  }
  .left{
    height: calc(100% - 100px);
    width: 100px;
    background: #ddd;
  }
  .main{
    position: absolute;
    top:100px;
    bottom: 0;
    left: 100px;
    right: 0;
  }
}
</style>
