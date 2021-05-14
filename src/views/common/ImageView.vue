<template>
  <div class="img-box full-height">
      <div class="img-wrapper">
        <ul>
          <li v-for="(item,index) in curFile.pngList" :key="index">
              <img  v-lazy="item" alt="">
          </li>
        </ul>
      </div>
     <!-- 底部操作区 -->
      <div class="material-operate-box"
      >
      
        <span
          class="btn txt-justify"
          @click="scrollToPage(curPageNum-1)"
        >上一页</span>
        <span
          class="btn txt-justify"
        >&nbsp;{{curPageNum}}&nbsp;/&nbsp;{{curFile.pngList.length}}&nbsp;</span>
        <span
          class="btn txt-justify"
          @click="scrollToPage(curPageNum+1)"
        >下一页</span>
        <span v-if="curFile.pngList&&curFile.pngList.length?true:false" class="btn jumpToNum">
          跳转至第
          <el-input v-model="jumpToNum" placeholder />&nbsp;页
          <span class="font-color-primary" @click="scrollToPage(jumpToNum)">Go</span>
        </span>
        
      </div>
     
  </div>
</template>

<script>
export default {
    props:{
        
    },
    data(){
        return {
            curFile: {
                fileId: '1301201902010001340001',
                pngList: [
                    '/images/topicMaterial/1.png',
                    '/images/topicMaterial/2.png',
                    '/images/topicMaterial/3.png'
                ],
                pngSize: 3,
                pngUrl: '/file/123Relese',
                typeCode: null,
                url: ''
            }, // 当前材料
            jumpToNum:0,
            curPageNum:1
        }
    },
    methods:{
        // 材料区跳转至某页
        scrollToPage(pageNum) {
            if (!this.comm.IsChkStrNonNegativeInteger(pageNum)) {
                this.$message.error('请输入正确的页码');
                return false;
            }
            this.confirmScrollToPage(pageNum);
        },
        confirmScrollToPage(pageNum) {
            if (pageNum <= 0) {
                this.jumpToNum = 1;
                this.$refs.material.scrollTop = 0; // 兼容ie
                // this.$refs.material.scrollTo(0, 0);//不兼容ie
            } else {
                let page = this.$refs.material.children[0].children[0];
                let pageH = page.offsetHeight;
                // console.log(pageH);
                if (pageNum > this.curFile.pngList.length) {
                    this.jumpToNum = this.curFile.pngList.length;
                    this.$refs.material.scrollTop =
            pageH * (this.curFile.pngList.length - 1); // 兼容ie
                    // this.$refs.material.scrollTo(0, pageH * (pageNum - 1));//不兼容ie
                } else {
                    this.$refs.material.scrollTop = pageH * (pageNum - 1); // 兼容ie
                }
            }
        },
    }
}
</script>

<style scoped lang="less">
.img-box{
    overflow: scroll;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

} 
.img-wrapper{
    
}
</style>