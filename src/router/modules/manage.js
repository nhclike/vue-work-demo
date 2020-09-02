/* 后台管理系统-路由管理 */
import {
    ManageLayout,
    RouteView
} from '@/layouts';

/* 插件 */
const Videojs = () => import(/* webpackChunkName: "Videojs" */ '@/views/plugins/Videojs');
const Ntko = () => import(/* webpackChunkName: "Ntko" */ '@/views/plugins/Ntko');
const Ueditor = () => import(/* webpackChunkName: "Ueditor" */ '@/views/plugins/Ueditor');
/* 组件 */
const chat = () => import(/* webpackChunkName: "chat" */ '@/views/chat/chat');
export default [
    {
        path: '/main',
        name: 'main',
        component: ManageLayout,
        redirect: '/main/plugins',
        // meta: {
        //     requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        // },
        children: [
            {
                path: 'plugins',
                component: RouteView,
                redirect: 'plugins/ueditor',
                children: [
                    {
                        path: 'videojs',
                        name: 'videojs',
                        component: Videojs
                    },
                    {
                        path: 'ueditor',
                        name: 'ueditor',
                        component: Ueditor
                    },
                    {
                        path: 'Ntko',
                        name: 'Ntko',
                        component: Ntko
                    },
                    {
                        path: 'chat',
                        name: 'chat',
                        component: chat
                    }
                ]
            }
        ]
    }
];
