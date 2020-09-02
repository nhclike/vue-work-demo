export default () => (
    localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {
        isLogin: false, // 登录状态
        userInfo: {
            name: '',
            username: '',
            password: '',
            iconUrl: '',
            menuList: [],
            userToken: ''
        },
        SESSION: '', // cookie
        curVersion: '' // 版本号
    }
);
