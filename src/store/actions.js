/* 公用-接口 */

/* eslint-disable no-unused-vars */
// application/json默认格式，无需添加请求头
const configFormURL = {'headers': {'Content-Type': 'application/x-www-form-urlencodeed'}};
const configFormData = {'headers': {'Content-Type': 'multipart/form-data'}};
const configFormText = {'headers': {'Content-Type': 'text/xml'}};

export default {
    // 查询数据字典
    async getDictBydictCode({ commit }, params) {
        // __GATEWAYPATH__/__SHJ__/__GTY__/__BY__
        let res = await axios.post(`${__GATEWAYPATH__}/dict/getDictBydictCode`, params, configFormText);
        return res.data;
    }
};

