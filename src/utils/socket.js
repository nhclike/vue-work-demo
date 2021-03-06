/*
 * @Author: ShiHuiJun
 * @Date: 2020-01-01 13:26:28
 * @Last Modified by: ShiHuiJun
 * @Last Modified time: 2020-09-01 13:27:08
 */

function getSocket(url, params, callback) {
    let socket;
    if (typeof (WebSocket) === 'undefined') {
        console.log('您的浏览器不支持WebSocket');
    } else {
        console.log('您的浏览器支持WebSocket');
        // 实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        socket = new WebSocket(url);
        // 打开事件
        socket.onopen = function() {
            console.log('Socket 已打开');
            socket.send(params);
        };
        // 获得消息事件
        socket.onmessage = function(msg) {
        // 发现消息进入    开始处理前端触发逻辑
            callback(msg, socket);
        };
        // 关闭事件
        socket.onclose = function() {
            console.log('Socket已关闭');
        };
        // 发生了错误事件
        socket.onerror = function() {
            console.log('Socket发生了错误,请刷新页面');
        // 此时可以尝试刷新页面
        };
    }
}

export {
    getSocket
};
