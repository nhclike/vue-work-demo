/* 页面名称 */
<template>
    <div class="listPage/pageName-list/detail/edit/list/info/report">页面名称</div>
</template>

<script>
import { mapActions } from 'vuex';
import ShjListPage from '@/components/common/ShjListPage';
export default {
    name: 'NewVuePage',
    components: { ShjListPage },
    inject: ['reload'],
    filters: {},
    props: {
        // 父组件>String
        // String: {
        //     type: String,
        //     default: 0,
        //     required: false,
        //     validator: function(value) {
        //         return value >= 0;
        //     }
        // },
        // 父组件>Number
        // Number: {
        //     type: Number,
        //     default: 0,
        //     required: false,
        //     validator: function(value) {
        //         return value >= 0;
        //     }
        // },
        // 父组件>object
        // Object: {
        //     type: Object,
        //     default: () => ({}),
        //     required: false
        // },
        // 父组件>array
        // Array: {
        //     type: Array,
        //     default: () => [],
        //     required: false
        // }
    },
    data() {
        return {};
    },
    computed: {
        // computeFunction() {
        //     return value;
        // }
    },
    watch: {
        // 监听-值
        // watchValue: {
        //     handler() {
        //     },
        //     deep: true,
        //     immediate: true
        // },
        // 监听-对象
        //  'watchObject.key': {
        //     handler() {
        //     },
        //     deep: true,
        //     immediate: true
        // }
    },
    created() {
        // this.init();
    },
    mounted() {
        // this.init();
    },
    methods: {
        // 初始化
        init() {
            //
        },
        // 接口引入
        ...mapActions(['moduleName/action'])
    }
};
</script>

<style lang="less" scoped>
</style>

<style lang="less">
</style>

