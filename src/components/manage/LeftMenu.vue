/*
 * @Author: nihc
 * @Date: 2021-01-19 14:20:51
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-10 11:16:11
 */
/* 主框架-左菜单-组件 */

<template>
    <div class="left-menu">
        左菜单
        <ul>
            <li>
                <router-link to="ueditor">百度编译器</router-link>
            </li>
             <li>
                <router-link to="Wps">Wps</router-link>
            </li>
            <li>
                <router-link to="Ntko">Ntko</router-link>
            </li>
            <li>
                <router-link to="Chat">消息聊天</router-link>
            </li>
            <li>
                <router-link to="antTree">ant design vue树</router-link>
            </li>
            <li>
                <router-link to="BaseUpload">基本文件上传</router-link>
            </li>
            <li>
                <router-link to="VueSimpleUploader">VueSimpleUploader插件</router-link>
            </li>
            <li>
                <router-link to="BaseTable">基本表格显示</router-link>
            </li>
            <li>
                <router-link to="PdfViewSingle">pdf单页面查看</router-link>
            </li>
            <li>
                <router-link to="uploadFileAndPdfView">本地文件pdf查看</router-link>
            </li>
            <li>
                <router-link to="VlcVideo">vlc播放</router-link>
            </li>
             <li>
                <router-link to="videojs">videojs视频播放</router-link>
            </li>
            <li>
                <router-link to="NBVideo">南北插件播放</router-link>
            </li>
            <li>
                <router-link to="NewNBVideo">新版南北插件播放</router-link>
            </li>
            <li>
                <router-link to="Capture">摄像头抓拍</router-link>
            </li>
             <li>
                <router-link to="WebRTCCapture">WebRTCCapture</router-link>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    name: 'LeftMenu',
    components: {},
    inject: ['reload'],
    filters: {},
    props: {
    },
    data() {
        return {
        };
    },
    computed: {
    },
    watch: {},
    created() {
        // this.init();
    },
    mounted() {
        this.init();
    },
    methods: {
        // 初始化
        init() {
            //
        }
    }
};
</script>

<style lang="less" scoped>
</style>

<style lang="less">
</style>

