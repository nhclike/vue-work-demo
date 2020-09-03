/* 登录路由页 */
<template>
  <div class="login">
  <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
const nsName = 'ModuleName';// 命名空间namespace
export default {
    components: {},
    inject: ['reload'],
    filters: {},
    props: {
    // 父组件>Number
    // string: {
    //   type: Number,
    //   default: 0,
    //   required: false,
    //   validator: function (value) {
    //     return value >= 0
    //   }
    // },
    // 父组件>object
    // object: {
    //   type: Object,
    //   default: () => ({}),
    //   required: false
    // },
    // 父组件>array
    // array: {
    //   type: Array,
    //   default: () => [],
    //   required: false
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
    // 接口引入
        ...mapActions(nsName, []),

        // 初始化
        init() {
            //
        }
    }


};
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: rgb(228, 231, 237);
}
</style>

<style lang="less">
</style>

