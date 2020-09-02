/* 用于请求接口时加载
 * @Author: ShiHuiJun
 * @Date: 2020-01-01 13:26:12
 * @Last Modified by:   ShiHuiJun
 * @Last Modified time: 2020-09-01 13:26:12
 */

import { Loading, Message } from 'element-ui';

let loadingCount = 0;
let loading;

const startLoading = () => {
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
};

const endLoading = () => {
    loading.close();
};

setTimeout(() => {
    if (loadingCount > 0) {
        Message({
            message: '连接服务器失败，请稍后再试！',
            // position: position,
            type: 'error',
            duration: 3000
        });
        loading.close();
    }
}, 30000);

export const showLoading = () => {
    if (loadingCount === 0) {
        startLoading();
    }
    loadingCount += 1;
};

export const hideLoading = () => {
    if (loadingCount <= 0) {
        return;
    }
    loadingCount -= 1;
    if (loadingCount === 0) {
        endLoading();
    }
};
