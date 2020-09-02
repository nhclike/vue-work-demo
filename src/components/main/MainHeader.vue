/* 主框架-头部-组件 */
<template>
    <div class="main-header">
        头部
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

