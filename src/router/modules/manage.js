/* 后台管理系统-路由管理 */
import {
    ManageLayout,
    RouteView
} from '@/layouts';

/* 插件 */
/* 视频播放 */
const Videojs = () => import(/* webpackChunkName: "Videojs" */ '@/views/plugins/Videojs');
/* 富文本编辑器 */
const Ntko = () => import(/* webpackChunkName: "Ntko" */ '@/views/plugins/Ntko');
const Ueditor = () => import(/* webpackChunkName: "Ueditor" */ '@/views/plugins/Ueditor');
/* 组件 */
/* tree */
const searchTree = () => import(/* webpackChunkName: "chat" */ '@/views/tree/tree');
/* 上传插件 */
const BaseUpload = () => import(/* webpackChunkName: "chat" */ '@/components/upload/base');
/* 表格 */
const BaseTable = () => import(/* webpackChunkName: "BaseTable" */ '@/components/table/basic');
/* pdf阅读插件 */
const PdfView = () => import(/* webpackChunkName: "PdfView" */ '@/components/PdfView/PdfView');
/* pdf阅读插件查看单页面 */
const PdfViewSingle = () => import(/* webpackChunkName: "PdfViewSingle" */ '@/components/PdfView/PdfViewSingle');

const uploadFileAndPdfView = () => import(/* webpackChunkName: "uploadFileAndPdfView" */ '@/components/PdfView/uploadFileAndPdfView');


/* 常用业务功能 */
/* websocket消息聊天 */
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
                    },
                    {
                        path: 'searchTree',
                        name: 'searchTree',
                        component: searchTree
                    },
                    {
                        path: 'BaseUpload',
                        name: 'BaseUpload',
                        component: BaseUpload
                    },
                    {
                        path: 'BaseTable',
                        name: 'BaseTable',
                        component: BaseTable
                    },
                    {
                        path: 'PdfView',
                        name: 'PdfView',
                        component: PdfView
                    },
                    {
                        path: 'PdfViewSingle',
                        name: 'PdfViewSingle',
                        component: PdfViewSingle
                    },
                    {
                        path: 'uploadFileAndPdfView',
                        name: 'uploadFileAndPdfView',
                        component: uploadFileAndPdfView
                    }
                ]
            }
        ]
    }
];
