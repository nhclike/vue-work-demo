/* 后台管理系统-路由管理 */
import {
// BasicLayout
// RouteView
} from '@/layouts';

const Template = () => import(/* webpackChunkName: "Login" */ '@/views/template/Template');

/* 默认缺省页面 */

export default [
    {
        path: '/template',
        name: 'template',
        component: Template,
        children: [
        ]
    }
];
