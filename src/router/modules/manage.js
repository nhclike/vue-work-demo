/* 后台管理系统-路由管理 */
import {
    ManageLayout,
    RouteView
} from '@/layouts';

/* 插件 */
/* 视频播放 */
const Videojs = () => import(/* webpackChunkName: "Videojs" */ '@/views/plugins/Videojs');
const VlcVideo = () => import(/* webpackChunkName: "VlcVideo" */ '@/views/plugins/VlcVideo');
const Flv = () => import(/* webpackChunkName: "VlcVideo" */ '@/views/plugins/Flv');

/* 南北视频插件 */
const NBVideo = () => import(/* webpackChunkName: "NBVideo" */ '@/components/video/NBVideo');
/* 新版 南北视频插件 */
const NewNBVideo = () => import(/* webpackChunkName: "NBVideo" */ '@/components/video/NewNBVideo');
/* 富文本编辑器 */
const Ntko = () => import(/* webpackChunkName: "Ntko" */ '@/views/plugins/Ntko');
const Ueditor = () => import(/* webpackChunkName: "Ueditor" */ '@/views/plugins/Ueditor');
const Wps = () => import(/* webpackChunkName: "Wps" */ '@/views/plugins/Wps');

/* 组件 */
/* tree */
const AntTree = () => import(/* webpackChunkName: "AntTree" */ '@/views/tree/AntTree');

/* 上传插件 */
const BaseUpload = () => import(/* webpackChunkName: "BaseUpload" */ '@/components/upload/base');
const VueSimpleUploader = () => import(/* webpackChunkName: "VueSimpleUploader" */ '@/components/upload/VueSimpleUploader');



/* 表格 */
const BaseTable = () => import(/* webpackChunkName: "BaseTable" */ '@/components/table/basic');

/* pdf阅读插件查看单页面 */
const PdfViewSingle = () => import(/* webpackChunkName: "PdfViewSingle" */ '@/components/PdfView/PdfViewSingle');
/* 上传并且查看pdf */
const uploadFileAndPdfView = () => import(/* webpackChunkName: "uploadFileAndPdfView" */ '@/components/PdfView/uploadFileAndPdfView');

/* 摄像抓拍插件 */
const Capture = () => import(/* webpackChunkName: "Capture" */ '@/components/video/Capture');
/* webRTC抓拍 */
const WebRTCCapture = () => import(/* webpackChunkName: "WebRTCCapture" */ '@/components/video/WebRTCCapture');


/* 常用业务功能 */
/* websocket消息聊天 */
const Chat = () => import(/* webpackChunkName: "Chat" */ '@/views/chat/Chat');

export default [
    {
        path: '/manage',
        name: 'manage',
        component: ManageLayout,
        redirect: '/manage/plugins',
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
                        path: 'VlcVideo',
                        name: 'VlcVideo',
                        component: VlcVideo
                    },
                    {
                        path: 'Flv',
                        name: 'Flv',
                        component: Flv
                    },
                    {
                        path: 'NBVideo',
                        name: 'NBVideo',
                        component: NBVideo
                    },{
                        path: 'NewNBVideo',
                        name: 'NewNBVideo',
                        component: NewNBVideo
                    },
                    {
                        path: 'Capture',
                        name: 'Capture',
                        component: Capture
                    },
                    {
                        path: 'WebRTCCapture',
                        name: 'WebRTCCapture',
                        component: WebRTCCapture
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
                        path: 'Wps',
                        name: 'Wps',
                        component: Wps
                    },
                    {
                        path: 'Chat',
                        name: 'Chat',
                        component: Chat
                    },
                    {
                        path: 'AntTree',
                        name: 'AntTree',
                        component: AntTree
                    },
                    {
                        path: 'BaseUpload',
                        name: 'BaseUpload',
                        component: BaseUpload
                    },
                    {
                        path: 'VueSimpleUploader',
                        name: 'VueSimpleUploader',
                        component: VueSimpleUploader
                    },
                    {
                        path: 'BaseTable',
                        name: 'BaseTable',
                        component: BaseTable
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
