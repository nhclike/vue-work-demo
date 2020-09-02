/* 登录-模块接口 */

/* eslint-disable no-unused-vars */

// application/json默认格式，无需添加请求头
const configFormURL = {
    headers: { 'Content-Type': 'application/x-www-form-urlencodeed' }
};
const configFormData = { headers: { 'Content-Type': 'multipart/form-data' } };
const configFormText = { headers: { 'Content-Type': 'text/xml' } };

export default {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        /* egg 登录 */
        async eggLogin({ commit }, params) {
            // __GATEWAYPATH__/__SHJ__/__GTY__/__BY__
            let res = await axios.post(`${__SHJ__}/login/view`, params);
            return res.data;
        }
    }
};
