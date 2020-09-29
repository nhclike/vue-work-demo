import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@babel/polyfill';// 兼容ie
import 'default-passive-events';
import 'style/common.less';// 引入公用样式
import './plugins/Antd.js';// 引入ant-design-vue插件

import './plugins/element.js';// 引入element-ui插件
// import './plugins/echarts';// 引入echarts
import './plugins/print.js';// 引入打印插件
import './plugins/video';// 引入视频播放插件
import '@/plugins/mock';// 引入mock.js模拟接口插件

import '@/plugins/rem';// 引入px与rem换算方法
import { showLoading, hideLoading } from './utils/loading';// 用于接口请求前后加载中
import vfilter from './mixins/filter';// 过滤

// 注册comm.js为全局js，页面中使用this.comm.方法名即可
const commJs = require('@/utils/comm.js');
let comm = {
    install(Vue) {
        Vue.prototype.comm = commJs;
    }
};
Vue.use(comm);

// 注册filter
for (let key in vfilter) {
    if ({}.hasOwnProperty.call(vfilter, key)) {
        Vue.filter(key, vfilter[key]);
    }
}

// 阻止启动生产消息
Vue.config.productionTip = false;

// 路由跳转前处理
router.beforeEach((to, from, next) => {
    // console.log(store.state.isLogin);
    if (localStorage.getItem('state')) {
        store.replaceState(JSON.parse(localStorage.getItem('state')));
    }
    // console.log(store.state);
    // 关闭所有消息提示
    if (vm) {
        vm.$message.closeAll();
    }
    if (to.matched.length === 0) {
        next({ path: '/error' });
    } else if (to.path === '/login/entry') {
        // 判断用户是否登陆
        next();
    } else if (to.matched.some(record => record.meta.requireAuth)) {
        if (store.state.isLogin) {
            next();
        } else {
            next({ path: '/login/entry' });
        }
    } else {
        next();
    }

});

// 请求拦截器-请求之前
axios.interceptors.request.use((request) => {
    showLoading();

    request.headers.csrfToken = getCookie('csrfToken');

    if (store.state.isLogin) {
        request.headers.Authorization = store.state.userInfo.userToken;
    }

    return request;
}, err => Promise.reject(err));

// egg 封装获取 cookie 的方法
function getCookie(name) {
    let arr;
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

// 请求拦截器-请求之后
axios.interceptors.response.use(response => {
    hideLoading();
    if (response.data.success || response.data.code === 1) {
        return response;
    } else {
        if (response.data.code === 401) {
            store.state.isLogin = false;
            vm.$message.error('请重新登录');
            setTimeout(() => {
                vm.$router.push('/login/entry');
            }, 3000);
        } else if (response.data.msg) {
            // response.data.msg === '获取登录用户失败,请重新登录!' ||
            if (response.data.msg === '账号未登录' || response.data.msg === '登录超时') {
                vm.$message.error('请重新登录');
                setTimeout(() => {
                    vm.$router.push('/login/entry');
                }, 3000);
            } else {
                // vm.$message.error({
                //     message: response.data.msg
                // });
                vm.$messageError(response.data.msg);
            }
        }
        return response;
    }
}, error => {
    hideLoading();
    // vm.$message.error('连接服务器失败，请稍后再试！');
    vm.$messageError(`连接服务器失败，请稍后再试！`);
    return Promise.reject(error);
});

// 权限控制
Vue.directive('control', function(el, binding) {
    let path = binding.value.path;// 用于比对数据库中存入的接口路径
    let rightList = JSON.parse(sessionStorage.getItem('operateRight') || []);
    if (path && rightList.length) {
        for (let i = 0; i < rightList.length; i++) {
            if (path === rightList[i].url) {
                el.style.visibility = 'visibile';
                break;
            } else {
                if (i === rightList.length - 1) {
                    el.style.display = 'none';
                }
            }
        }
    }
});

// 注册vue
const vm = new Vue({
    router,
    store,
    // 全局提供localStorage的userInfo信息，需要使用时在export default中注入inject: ["userInfo"],
    provide: {
        // {status:'',username:'',password:'',menu:{}}
        // userInfo: () => JSON.parse(localStorage.getItem('userInfo') || '{}')
    },
    render: h => h(App)
}).$mount('#app');
