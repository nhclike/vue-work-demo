/* router总入口，导出所有路由,router从“斜杠”开始 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterConfig from './modules'; // 引入业务逻辑模块
import CommonRouters from './common'; // 引入通用模块
Vue.use(VueRouter);
export default new VueRouter({
    // mode: 'history', // 配置应用的基路径,需要服务端支持
    // base: `${__PROJECTNAME__}`, // 配置应用的基路径
    // scrollBehavior: () => ({ y: 0 }),
    routes: RouterConfig.concat(CommonRouters)
});
