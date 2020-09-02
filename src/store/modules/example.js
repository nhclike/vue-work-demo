/* 接口模板 */

/* eslint-disable no-unused-vars */
// application/json默认格式，无需添加请求头
const configFormURL = {'headers': {'Content-Type': 'application/x-www-form-urlencodeed'}};
const configFormData = {'headers': {'Content-Type': 'multipart/form-data'}};// 注意传参数中有 文件|图片 时参数请求头无需填写,必须在页面中单独声明一个新的formdata对象,将参数放入formdata对象中再传递
const configFormText = {'headers': {'Content-Type': 'text/xml'}};

export default {
    namespaced: true,
    // computed: {...mapState(['moduleLogin/userInfo'])}  使用this.userInfo
    state: {},
    // computed: {...mapState(['moduleLogin/userInfoGet'])} 使用this.userInfoGet
    getters: {
    },
    // methods: { ...mapActions(['moduleLogin/userInfoMut'])} 使用this.userInfoMut()
    mutations: {},
    // methods: { ...mapActions(['moduleLogin/eggLogin'])}  使用this.eggLogin()
    actions: {
        /* //  async await结合post请求示例
        async getData({commit}, params) {
            // __GATEWAYPATH__/__SHJ__/__GTY__/__BY__
            let res =  await axios.post(`${__GATEWAYPATH__}/接口地址`, params,configFormText);
            return res.data;
        }, */

        /* // async await结合get请求示例
        async getData({commit}, params) {
            // __GATEWAYPATH__/__SHJ__/__GTY__/__BY__
            let res =  await axios.get(`${__GATEWAYPATH__}/接口地址`, {params: params});
            return res.data;
        }, */

        //  async await结合post请求示例-请求头
        /* async getData({commit}, params) {
            // __GATEWAYPATH__/__SHJ__/__GTY__/__BY__
            let res =  await
            axios.post(`${__GATEWAYPATH__}/接口地址`, params, {'headers': {'Content-Type': 'application/x-www-form-urlencodeed'}});
            return res.data;
        }, */

        //  async await结合post请求示例-请求头
        /* async getData({commit}, params) {
            // __GATEWAYPATH__/__SHJ__/__GTY__/__BY__
            let res =  await
            axios.post(`${__GATEWAYPATH__}/接口地址`, params, configFormURL);
            return res.data;
        }, */

        /* // post请求示例
        async getData({commit}, params) {
            // __GATEWAYPATH__/__SHJ__/__GTY__/__BY__
            return axios.post(`${__GATEWAYPATH__}/接口地址`, params,configFormURL);
        }, */

        /* // get请求示例
        async getData({commit}, params) {
            // __GATEWAYPATH__/__SHJ__/__GTY__/__BY__
            return axios.get(`${__GATEWAYPATH__}/接口地址`, {params: params},configFormData);
        } */


    }
};
