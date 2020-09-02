/* 后台管理系统-路由管理 */
import { BasicLayout } from '@/layouts';

/* 插件 */
const Videojs = () => import(/* webpackChunkName: "Videojs" */ '@/views/plugins/Videojs');

const Ntko = () => import(/* webpackChunkName: "Ntko" */ '@/views/plugins/Ntko');

export default [
    {
        path: '/home',  // 庭审主页面
        name: 'home',
        component: BasicLayout,
        redirect: '/home',
        // meta: {
        //     requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        // },
        children: [
            {
                path: '',
                components: {
                    left: Videojs,
                    right: Ntko
                }
            },
            {
                path: '/Ntko',
                components: {
                    left: Videojs,
                    right: Ntko
                }
            }
        ]
    }
];
