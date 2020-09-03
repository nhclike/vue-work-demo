/* 模版-页面-百度编辑器 */
<template>
    <div class="ueditor-box">
        <vue-ueditor-wrap v-model="content" :config="myConfig"></vue-ueditor-wrap>
        <div class="form-bottom">
            <span class="save" @click="submit()">提交保存</span>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import VueUeditorWrap from 'vue-ueditor-wrap';
export default {
    name: 'Ueditor',
    components: { VueUeditorWrap },
    inject: ['reload'],
    filters: {},
    props: {
    },
    data() {
        return {
            id: 2, // number- (1:服务管理流程，2:产品服务，3:服务热线)
            /* ueditor */
            content: '', // 编辑器中的内容
            myConfig: {
                serverUrl: `${__GATEWAYPATH__}/ueditor/ueditorConfig`, // 上传功能的后端服务器接口地址
                UEDITOR_HOME_URL: '/ueditor/', // 你的UEditor资源存放的路径,相对于打包后的index.html
                autoHeightEnabled: true, // 编辑器是否自动被内容撑高
                autoFloatEnabled: false, // 工具栏是否可以浮动
                initialFrameHeight: 200, // 初始容器高度
                initialFrameWidth: '100%', // 初始容器高度
                enableAutoSave: true // 关闭自动保存
            }
        };
    },
    computed: {
    },
    watch: {
    },
    created() {
        // this.init();
    },
    mounted() {
        // this.init();
    },
    methods: {
        // 接口引入
        ...mapActions([
            'modulePlugin/getUeditorContent',
            'modulePlugin/updateUeditorContent'
        ]),
        // 初始化
        init() {
            let params = {
                id: this.id
            };
            this.postView(params);
        },

        // 接口-查看-富文本编辑框中的内容
        postView(params) {
            this.getUeditorContent(params).then(res => {
                console.log('getUeditorContent', res);
                if (res.code === 1) {
                    this.content = res.data;
                }
            });
        },

        // 接口-更新-富文本编辑框中的内容
        postUpdate(params) {
            this.updateUeditorContent(params).then(res => {
                console.log('updateUeditorContent', res);
                if (res.code === 1) {
                    this.$message.success(`${res.msg}`);
                    this.reload();
                }
            });
        },

        // 按钮点击-提交保存
        submit() {
            let params = {
                id: this.id, // number
                content: this.content// 编辑器助中的内容"
            };
            this.postUpdate(params);
        }
    }
};
</script>

<style lang="less" scoped>
</style>

