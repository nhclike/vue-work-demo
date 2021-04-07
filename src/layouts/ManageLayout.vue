/* 管理系统通用框架---包含头部和左菜单 */
<template>
  <div class="manage-layout">
    <div class="top">
      <MainHeader></MainHeader>
    </div>
    <div class="left">
      left
       <LeftMenu></LeftMenu>
    </div>
    <div class="main-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/manage/MainHeader';
import LeftMenu from '@/components/manage/LeftMenu';
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
@left-width:350px;
@top-height:100px;
.manage-layout{
  height: 100%;
  width: 100%;
  background: #fff;
  font-size: @font20px;
  position: relative;
  .top{
    height: @top-height;
    width: 100%;
    background: yellow;
  }
  .left{
    height: calc(100% - @top-height);
    width: @left-width;
    background: #ddd;
  }
  .main-box{
    position: absolute;
    top:100px;
    bottom: 0;
    left: @left-width;
    right: 0;
    overflow-y: scroll;
  }
}
</style>
