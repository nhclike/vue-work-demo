/* 通用 */
export default [
    // 默认页面
    {
        path: '/',
        redirect: '/login'
        // hidden: true
    },
    {
        path: '/error',
        meta: {
            title: '页面不存在',
            requiresAuth: false
        },
        name: 'error',
        component: () =>
        import(/* webpackChunkName: "Error" */ '@/components/common/Error')
    },
    {
        path: '/building',
        meta: {
            title: '页面建设中',
            requiresAuth: false
        },
        name: 'building',
        component: () =>
        import(/* webpackChunkName: "Building" */ '@/components/common/Building')
    }
];
