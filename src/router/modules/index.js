/* modules路由总入口，导出modules里面的所有路由 */
const files = require.context('.', true, /\.js$/);

// console.log(files.keys()); // ["./home.js"] 返回一个数组
let configRouters = [];
/**
 * inject routers
 */
files.keys().forEach(key => {
    if (key === './index.js') { return }
    configRouters = configRouters.concat(files(key).default); // 读取出文件中的default模块
});
export default configRouters; // 抛出一个Vue-router期待的结构的数组
