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
      <a-button id="step3" type="primary" > 
                第三步
            </a-button>
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
    },
    mounted(){
      var introJS=require("intro.js");
            introJS().setOptions({
                    prevLabel: "上一步",//下一步按钮的显示名称
                    nextLabel: "下一步",//上一步按钮的显示名称
                    skipLabel: "跳过",//跳过按钮的显示名称
                    doneLabel: "结束引导",//结束按钮的显示名称
                    tooltipPosition:"right",//说明框相对于高亮说明区域的位置
                    overlayOpacity: .7,
                    hidePrev: true,
                    hideNext: true,
                    showStepNumbers: false,
                    showProgress: false,
                    highlightClass: "highlight",
                    exitOnOverlayClick: false,
                    tooltipClass: "tool-tip",
                    steps: [
                    {
                        element: "#step1",
                        intro:
                        "这是第一步",
                        position: "right",
                    },
                    {
                        element: "#step2",
                        intro:
                        "这是第二步",
                        position: "left"
                    },
                    {
                        element: "#step3",
                        intro:
                        "这是第三步",
                        position: "top"
                    }
                    ]
                }).onbeforechange ((e) => {
                        
                    }).onexit(() =>{
 
                }).start();
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
