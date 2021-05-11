<!--
 * @Descripttion: wps
 * @Author: zhangt
 * @Date: 2021-04-23 17:07:43
 * @Last Modified by: zhangt
 * @Last Modified time: 2021-04-25 18:10:18
-->
<template>
   <div class="full-height">
        <div id="doc" class="full-height">

        </div>
        <div v-show="PluginError">
            您的WPS版本不正确
        </div>
    </div>
</template>

<script>
export default {
    name: 'WPS',
    props: {
      docPath: {
        type: String,
        default: ''
      },
      docReadonly: {
        type: Boolean,
        default: true
      },
      docName: {
        type: String,
        default: ''
      }
    },
    watch: {

    },
    data() {
        return {
          PluginError: false,
          obj: null,
          app: null
        };
    },
    computed: {
        
    },
    mounted() {
      this.initWps()
    },
    methods: {
      // 初始化wps
      async initWps() {
        await this.initWpsApp('doc', "100%", "100%");
        this.app = this.obj.Application
        
        if (!this.app) {
          setTimeout(() => {
            if(!this.app) {
              clearInterval(Interval_control);
              console.log('插件不受支持')
              return;
            }
          }, 2000)
          // 为了兼容
          this.obj.setAttribute('data', '../../../public/wps/Normal.dotm');
          let Interval_control = setInterval(
            function () {
                this.app = this.obj.Application;
                if (this.app && this.app.IsLoad()) {
                    clearInterval(Interval_control);
                    this.openDocumentRemote();
                }
            }, 500);
        }
        else {
            this.openDocumentRemote();
        }
      },
      // 初始化文档对象
      initWpsApp(tagID, w, h) {
        let iframe;
        iframe = document.getElementById(tagID);
        if (iframe.innerHTML.indexOf("application/x-wps") > -1) {
            iframe.innerHTML = "";
        }
        let codes = [];
        codes.push("<object  name='webwps' id='webwps_id' type='application/x-wps'  width='100%'  height='100%'> <param name='Enabled' value='1' />  </object>");
        iframe.innerHTML = codes.join("");
        this.obj = document.getElementById("webwps_id");
        window.onbeforeunload = function () {
            this.obj.Application.Quit();
        };
      },
      // 创建空文档
      createDocument() {
          this.app.createDocument("wps");
      },
      // 打开远程文档 -- path为绝对路径
      openDocumentRemote() {
        if(this.app) {
          this.app.Quit()
        }
        console.log('open doc', this.docPath);
        let res = this.app.openDocumentRemote(this.docPath + '?t='+ Math.random(), this.docReadonly);
        console.log("openDocumentRemote",res);
        if(!res) this.app.createDocument();
        this.setWpsToolbarVisible(!this.docReadonly)
      },
      saveFile(url) {
        const res = this.saveToURL(url)
        if(res) {
          this.$message.success('保存成功')
        } else {
          this.$message.error('保存失败')
        }
      },
      // 保存文档
      saveToURL(url) {
          let aa = this.app.saveURL_s(url, this.docName);
          return aa;
      },
      // 打印
      print() {
        this.app.PrintOut()
      },
      // 打印预览
      printPreview () {
        this.app.PrintPreview = true
      },

      // 获取文本内容
      getText() {
          return this.app.getText();
      },

      // 设置文档只读可读模式 true 表示不可编辑，false 表示可编辑
      setWpsReadonly(readonly) {
          this.app.enableProtect(readonly)
      },

      // 设置显示、隐藏工具菜单 true 表示显示，为 false 表示不显示
      setWpsToolbarVisible(visible) {
          this.app.setToolbarAllVisible(visible)
      }
    }
};
</script>

<style>
    /*全局覆盖样式，注意在其他地方不要定义ntko-demo这个样式*/
    /*.ntko-demo .el-dialog__body{*/
        /*padding: 0 0 0 0 !important;*/
    /*}*/
</style>
