/* 主框架-头部-组件 */
<template>
    <div class="main-header">
        主页面---公用头部
        <a-button type="primary" @click="goBack">
            返回
        </a-button>
    </div>
</template>
<script>
export default {
    name: 'MainHeader',
    components: {},
    inject: ['reload'],
    data() {
        return {};
    },
    computed: {
    },
    watch: {},
    created() {
        console.log('created');
    },
    mounted() {
        console.log('mounted');
    },
    methods: {
        goBack() {
            this.$router.push({
                path: '/login'
            });
        }
    }
};
</script>

<style scoped lang="less">
.main-header {
    height: @top_menu_h;
}
</style>
<style lang="less">
</style>

