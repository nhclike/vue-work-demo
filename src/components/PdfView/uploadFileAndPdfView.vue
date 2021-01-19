/*
 * @Author: nihc
 * @Date: 2021-01-19 14:19:27
 * @Last Modified by:   nihc
 * @Last Modified time: 2021-01-19 14:19:27
 */

<template>
  <div>
    <div style="margin-top: 40px">
            <input type="file" name="myfile" id="myfile" @change="preview($event)"/>
            <!--<button @click="changeLocal">点击预览本地pdf</button>-->
            <iframe v-if="showPdf" id="previewPdf" :src="'/pdf/web/viewer.html?file=' + fileUrl" height="560"
                    width="100%">
            </iframe>
        </div>
  </div>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
            fileUrl: '',
            showPdf: false

        };
    },
    methods: {
        preview(event) {
            let files = document.getElementById('myfile').files[0];
            if (files.type !== 'application/pdf') {
                alert('只能上传一份pdf文件哦～');
                return;
            }
            this.showPdf = true;
            this.fileUrl = this.getObjectURL(files);

        },
        getObjectURL(file) {
            let url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            }
            return url;
        }

    }
};
</script>

<style>

</style>
