<!--
 * @Descripttion: wps
 * @Author: zhangt
 * @Date: 2021-04-23 17:07:43
 * @Last Modified by: zhangt
 * @Last Modified time: 2021-04-25 18:10:18
-->
<template>
   <div class="full-height">
        <div>
            <el-button type="primary" @click="fnDot">打点</el-button>
      <el-button type="primary" @click="markLink">书签跳转</el-button>
        </div>
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
        default: false
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
          TANGER_OCX_OBJ: null,
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
        this.app = this.TANGER_OCX_OBJ.Application
        
        if (!this.app) {
          setTimeout(() => {
            if(!this.app) {
              clearInterval(Interval_control);
              console.log('插件不受支持')
              return;
            }
          }, 2000)
          // 为了兼容
          this.TANGER_OCX_OBJ.setAttribute('data', '../../../public/wps/Normal.dotm');
          let Interval_control = setInterval(
            function () {
                this.app = this.TANGER_OCX_OBJ.Application;
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
        this.TANGER_OCX_OBJ = document.getElementById("webwps_id");
        window.onbeforeunload = function () {
            this.TANGER_OCX_OBJ.Application.Quit();
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
        // console.log('open doc', this.docPath);
        let res = this.app.openDocumentRemote("http://172.19.82.181:8080/test.docx", this.docReadonly);
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
      //打点
      fnDot(){
            let doc = this.TANGER_OCX_OBJ;

            let rangeObj = doc.Application.Selection.Range;
            doc.Application.Selection.Font.Color = 255;// 选中字体颜色变红
            //let timeStamp = new Date().getTime();
             let timeStamp = 123;
            this.app.ActiveDocument.Bookmarks.Add('dot' + timeStamp, rangeObj);// 加书签
            //let descr = this.app.GetBookmarkValue('dot' + timeStamp);// 取书签值
            // let descr = this.app.ActiveDocument.Bookmarks.Item('dot' + timeStamp).Name;// 取书签值
              let descr=doc.Application.Selection.Text;
            // let recordId = this.recordIdGet;
            console.log( descr + 'descr');
            if (!descr || descr.trim() === '') {
                //this.openNotify(`请选择打点内容!`, 'info');
                // this.$CusConfirm(`请选择打点内容!`);
                return false;
            }
      },
      markLink() {
            // 取书签值跳转转到书签}
            //let dot = 'dot' + timestamp;
             let timestamp = 123;
            let dot = 'dot' + timestamp;
            let r=this.app.ActiveDocument.BookMarks.Exists(dot);
            console.log(r+"Exists")
            if (r)
            {
                this.app.ActiveDocument.Application.Selection.GoTo(-1, 0, 0, dot);
            }
            else {
                //this.openNotify(`书签不存在!`, 'error');
                // this.$CusConfirm(`书签不存在!`);
            }
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
