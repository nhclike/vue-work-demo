/* 主页面-路由管理 */
import { MainLayout } from '@/layouts';

/* 插件 */
const Videojs = () => import(/* webpackChunkName: "Videojs" */ '@/views/plugins/Videojs');
const TopicReader = () => import(/* webpackChunkName: "Videojs" */ '@/views/common/TopicReader');
const Wps = () => import(/* webpackChunkName: "Wps" */ '@/views/plugins/Wps');

const Ueditor = () => import(/* webpackChunkName: "Ueditor" */ '@/views/plugins/Ueditor');

export default [
    {
        path: '/main',  // 庭审主页面
        name: 'main',
        component: MainLayout,
        redirect: '/main',
        // meta: {
        //     requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        // },
        children: [
            {
                path: '',
                components: {
                    TopicReader: TopicReader,
                    Ueditor: Ueditor,
                    Videojs: Videojs,
                    Wps:Wps
                }
            }
        ]
    }
];
