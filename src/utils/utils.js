/*
 * @Author: ShiHuiJun
 * @Date: 2020-01-01 13:22:16
 * @Last Modified by: ShiHuiJun
 * @Last Modified time: 2020-09-01 15:30:19
 */

import { Message } from 'element-ui';
/* --------------------路径地址-开始-------------------- */
/**
 * 获取项目路径
 * @method getPath
 * @return 返回项目路径
 * @example http://localhost:8080/projectName => projectName
 */
let getPath = () => {
    let pathName = window.document.location.pathname; // 获取主机地址之后的目录,如 /projectName/index.html
    let index = pathName.substr(1).indexOf('/'); // 获取第2个 / 的索引号-1,如:projectName/index.html中第1个 / index为11
    let path = pathName.substr(0, index + 1); // 获取项目名称,如:projectName
    return path;
};

let ctx = getPath(); // 定义项目路径
// console.log(ctx);

/**
 * 获取项目根路径
 * @method getRootPath
 * @return {*} 返回项目的根路径
 * @example http://localhost:8080/projectName/index.html => http://localhost:8080/projectName
 */
let getRootPath = () => {
    let curWwwPath = window.document.location.href; // 获取当前网址,如: http://localhost:8080/projectName/index.html
    let pathName = window.document.location.pathname; // 获取主机地址之后的目录,如 /projectName/index.html
    let pos = curWwwPath.indexOf(pathName); // 获取pathName 在 curWwwPath 的索引号,如:20
    let localhostPath = curWwwPath.substring(0, pos); // 获取主机地址,如: http://localhost:8080
    let index = pathName.substr(1).indexOf('/'); // 获取第2个 / 的索引号-1,如:projectName/index.html中第1个 / index为11
    let path = pathName.substr(0, index + 1); // 获取项目名称,如:/projectName
    let rootPath = localhostPath + path; // 项目根路径
    return rootPath;
};

/**
 * 获取相对路径
 * @method getRelativePath
 * @return {*} 返回相对路径
 * @example var url='http://172.19.82.130:8080/uploadfiles/summary/7c54efed-fbc0-49c0-8568-62b07b5c1816/temp/3.png';var relativePath = getRelativePath(url);
 *
 */
let getRelativePath = (url) => {
    let str = url.split('http://')[1]; // 172.19.82.130:8080/uploadfiles/summary/7c54efed-fbc0-49c0-8568-62b07b5c1816/temp/3.png
    if (str && str.indexOf('/') > -1) {
        let pos = str.indexOf('/'); // 获取 相对路径 在 str 的索引号,如:18
        let relativePath = str.substring(pos + 1, url.length); // 获取相对路径,如: uploadfiles/summary/7c54efed-fbc0-49c0-8568-62b07b5c1816/temp/3.png
        return relativePath;
    }
    return '';
};

/**
 * 获取 WebSocket 路径
 * @method getWsUrl
 * @return {String} 返回 WebSocket 的前缀
 * @example http://localhost:8080/projectName/index.html => ws://localhost:8080
   function fnVoteWebSocket(){
     var wsUrl = getWsUrl();
     var ws = new WebSocket(wsUrl + '/websocket/voteWebSocket/'+currentUser.id);
     ws.onopen = function(evt) {};//连接成功建立的回调方法
     ws.onmessage = function(evt) {};//接收到消息的回调方法
     ws.onclose = function(evt) { ws.close();};//连接关闭的回调方法
     ws.onerror = function () {};//连接发生错误的回调方法
     window.onbeforeunload = function () {};//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
   }
   function sendMsg() {
    var msg = JSON.stringify(
        {
            interrogateId: room.interrogateId,
            content: $('#msg').val()
        }
    );
    ws.send(msg);
   }
 */
let getWsUrl = () => {
    let wsUrl;
    let curWwwPath = window.document.location.href; // 获取当前网址,如: http://localhost:8080/projectName/index.html
    let pathName = window.document.location.pathname; // 获取主机地址之后的目录,如 /projectName/index.html
    let pos = curWwwPath.indexOf(pathName); // 获取pathName 在 curWwwPath 的索引号,如:20
    if (pos > -1) {
        let localhostPath = curWwwPath.substring(0, pos); // 获取主机地址,如: http://localhost:8080
        wsUrl = localhostPath.replace('http://', 'ws://'); // 替换
    } else {
        wsUrl = curWwwPath.replace('http://', 'ws://');
    }
    return wsUrl;
};

/**
 * 使用url传参时，取参数的值公用方法 1
 * @method getQueryString
 * @description 使用有局限性,不适用iframe嵌入的页面 decodeURI与encodeURI成对使用,,否则IE会报错
 * @param {String} name 参数名称
 * @return {*} 返回 null 或者 查找参数的值
 * @example http://localhost:8080/projectName/updateUser?id=1&age=18&name=encodeURI(name)
 */
let getQueryString = (name) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 取 以&开头 或者 以name开头,以 &|$ 结尾的字符串
    let r = window.location.search.substr(1).match(reg); // search,查询 ？后面的参数，并匹配正则,如:此处name为id,匹配出的 r 为 [id=1&,,1,&];如:此处name为age,匹配出的 r 为[&age=18,&,18,]
    if (r != null) {
        return decodeURI(r[2]); // 对所选的字符串进行解码 decodeURI在IE下报错
    }
    return null;
};

/**
 * 使用url传参时，取参数的值公用方法 2
 * @method getParameter
 * @return {*} 返回 null 或者 查找参数的值
 * @example http://localhost:8080/projectName/updateUser?id=1&age=18&sex=1&name=encodeURI(name)
 * @example getParameter('age') 取 url 内字段 age 的值
 */
let getParameter = (param) => {
    //
    let url = window.location.href.split('?')[1]; // 获取url里"?"后面的值
    if (url && url.indexOf('&') > 0) {
    // 多个参数
        let urlParamArray = url.split('&'); // 分开每个参数，并放到数组里
        for (let i = 0; i < urlParamArray.length; i++) {
            let paramName = urlParamArray[i].split('='); // 把每个参数名和值分开，并放到数组里
            if (param == paramName[0]) {
                // 匹配输入的参数和数组循环出来的参数是否一样*
                return decodeURI(paramName[1]); // 中文解码 返回想要的参数值
            }
        }
    } else {
    // 只有1个参数
        let paramValue = url.split('=')[1];
        return decodeURI(paramValue); // 中文解码
    }
};
/* --------------------路径地址-结束-------------------- */

/* --------------------IE相关-开始-------------------- */
/**
 * 判断当前浏览器是否为IE
 * @method isIE
 * @return true:是IE false:不是IE
 */
let isIE = () => {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    // if (navigator.userAgent.indexOf('MSIE') != -1) {
        return true;
    }
    return false;
};

/**
 * 获取IE的版本号
 * @method IEVersion
 * @return 返回IE的版本号 7~11:IE版本7~11 6:IE版本<7 edge:edge -1:非IE
 */
let IEVersion = () => {
    let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    let isLessIE11 =
    userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否为小于IE11的浏览器
    let isEdge = userAgent.indexOf('Edge') > -1 && !isLessIE11; // 判断是否为IE的Edge浏览器
    let isIE11 =
    userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1; // 判断是否为IE11浏览器
    if (isLessIE11) {
        let IEReg = new RegExp('MSIE (\\d+\\.\\d+);'); // 正则表达式匹配浏览器的userAgent字符串中MSIE后的数字部分，，这一步不可省略！！！
        IEReg.test(userAgent);
        let IEVersionNum = parseFloat(RegExp['$1']); // 取正则表达式中第一个小括号里匹配到的值
        if (IEVersionNum === 7) {
            // IE7
            return 7;
        } else if (IEVersionNum === 8) {
            // IE8
            return 8;
        } else if (IEVersionNum === 9) {
            // IE9
            return 9;
        } else if (IEVersionNum === 10) {
            // IE10
            return 10;
        } else {
            // IE版本<7
            return 6;
        }
    } else if (isEdge) {
    // edge
        return 'edge';
    } else if (isIE11) {
    // IE11
        return 11;
    } else {
    // 不是ie浏览器
        return -1;
    }
};
/* --------------------IE相关-结束-------------------- */

/* --------------------移动应用相关-开始-------------------- */
/**
 * 获取平台名称 android 或 ios
 * @method platformName
 * @return android 或 ios
 */
let platformName = () => {
    let platform = '';
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
        platform = 'ios';
    } else if (isAndroid) {
        platform = 'android';
    }
    return platform;
};
/* --------------------移动应用相关-结束-------------------- */

/* --------------------数据处理-开始-------------------- */
/**
 * 日期格式化成 指定 形式
 * @method Date.prototype.Format
 * @param {*} formatStr 需要格式化的形式
 * @return 格式化后的日期
 * @description 年(yy|YY|yyyy|YYYY) 可以用 1-4 个占位符 月(M|MM)、日(dd|DD)、小时(hh|HH)、分(m|mm)、秒(s|S|ss|SS) 可以用 1-2 个占位符 星期(w|W)可以用 1 个占位符
 * @description new Date('Fri Mar 06 1899 11:53:44 GMT+0800 (中国标准时间)').getYear() 2020返回120 1999返回99 1900返回0 1899返回-1
 * @description 创建 Date 对象 new Date() ==> Fri Mar 06 2020 14:22:42 GMT+0800 (中国标准时间)
 * @description 创建 Date 对象 new Date(milliseconds) 如 new Date(88) ==> Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
 * @description 创建 Date 对象 new Date(dateString) 如 new Date('2078') ==> Sat Jan 01 2078 08:00:00 GMT+0800 (中国标准时间)
 * @description 创建 Date 对象 new Date(year, month, day, hours, minutes, seconds, milliseconds) 如 new Date(2020, 1, 2, 3, 4, 55, 198) ==> Sun Feb 02 2020 03:04:55 GMT+0800 (中国标准时间)
 * @example var curTime=new Date().Format('hh:mm:ss') ==> 08:09:04
 * @example (new Date()).Format("yyyy-MM-dd hh:mm:ss w") ==> 2020-03-06 08:09:04 五
 * @example (new Date()).Format("yyyy-M-d h:m:s") ==> 2020-3-6 8:9:4
 */
// eslint-disable-next-line no-extend-native
Date.prototype.Format = function(formatStr) {
    let str = formatStr;
    let Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear()); // 年份替换 yyyy|YYYY
    str = str.replace(
        /yy|YY/,
        this.getYear() % 100 > 9
            ? (this.getYear() % 100).toString()
            : '0' + (this.getYear() % 100)
    ); // 年份替换 yy|YY getYear 3位数和2位数的 模 100后 返回 后2位数,getYear 一位数的返回'0'+'1位数 '如 01
    let month = this.getMonth() + 1; // 月份 从0开始不是从1开始
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month); // 月份替换 MM 返回2位数
    str = str.replace(/M/g, month); // 月份替换 M 返回1位数或2位数
    str = str.replace(/w|W/g, Week[this.getDay()]); // 星期替换 w|W 0对应'日'
    str = str.replace(
        /dd|DD/,
        this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate()
    ); // 日替换 dd|DD 返回2位数
    str = str.replace(/d|D/g, this.getDate()); // 日替换 dd|DD 返回1位数或2位数
    str = str.replace(
        /hh|HH/,
        this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours()
    ); // 小时替换 hh|HH 返回2位数
    str = str.replace(/h|H/g, this.getHours()); // 小时替换 hh|HH 返回1位数或2位数
    str = str.replace(
        /mm/,
        this.getMinutes() > 9
            ? this.getMinutes().toString()
            : '0' + this.getMinutes()
    ); // 分钟替换 mm 返回2位数
    str = str.replace(/m/g, this.getMinutes()); // 分钟替换 mm 返回1位数或2位数
    str = str.replace(
        /ss|SS/,
        this.getSeconds() > 9
            ? this.getSeconds().toString()
            : '0' + this.getSeconds()
    ); // 秒替换 ss|SS 返回2位数
    str = str.replace(/s|S/g, this.getSeconds()); // 秒替换 ss|SS 返回1位数或2位数
    return str;
};

/**
 * 对 String 扩展了一个 trim 方法 用于删除字符串的头尾空格及特殊字符串
 * @description 解决IE8不兼容问题
 * @method String.prototype.trim
 * @param val 需要删除的值
 * @example str.trim('xiaoming')
 */
// eslint-disable-next-line no-extend-native
String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

/**
 * 对 Array 扩展了一个 remove 方法 用于删除数组中的某个值
 * @method Array.prototype.remove
 * @param val 需要删除的值
 * @example arr.remove('xiaoming')
 */
// eslint-disable-next-line no-extend-native
Array.prototype.remove = function(val) {
    let index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * 日期转换成 ms 毫秒数
 * @method formatDateToMs
 * @param {*} date 如 2020-3-6 16:52:59
 * @return 返回毫秒数
 * @example formatDateToMs('2020-3-6 16:52:59') ==> 1583484779000
 */
let formatDateToM = (date) => {
    let cur = new Date(Date.parse(date.replace(/-/g, '/'))).getTime();
    return cur;
};

/**
 * 毫秒数转换成 ms 日期
 * @method formatMsToDate
 * @param {*} time 如 2020-3-6 16:52:59
 * @return 返回日期
 * @example formatMsToDate('1583484779000') ==> 2020-3-6 16:52:59
 */
let formatMsToDate = (time) => {
    let cur = new Date(time);
    return cur;
};

/**
 * 将特殊格式日期转化为正常格式日期
 * @method formatDateToNormal
 * @param {*} date 如 2019-04-07T16:00:00.000+0000
 * @return 返回正常格式日期
 * @example formatDateToNormal('2019-04-07T16:00:00.000+0000') ==> 2020/3/6 16:52:59
 */
let formatDateToNormal = (date) => {
    let arr = date.split('T');
    let d = arr[0]; // 日期
    let dArr = d.split('-'); // 年月日

    let t = arr[1]; // 时间
    let tArr = t.split('.000');
    let mArr = tArr[0].split(':'); // 时分秒

    let cur =
    parseInt(dArr[0], 10) +
    '/' +
    parseInt(dArr[1], 10) +
    '/' +
    parseInt(dArr[2], 10) +
    ' ' +
    parseInt(mArr[0], 10) +
    ':' +
    parseInt(mArr[1], 10) +
    ':' +
    parseInt(mArr[2], 10);
    return cur;
};

/**
 * 日期格式化成 yyyy-mm-dd 形式
 * @method formatDateToYMD
 * @param {*} date
 * @return 返回格式化后的日期
 * @example formatDate(2020-5-2) ==> 2020-05-02
 */
let formatDateToYMD = (date) => {
    let dateNew = new Date(String(date).replace(/-/g, '/')); // 日期转化成字符串兼容ios
    let y = dateNew.getFullYear();
    let m = dateNew.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = dateNew.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
};

/**
 * 日期格式化成 m月d日 形式
 * @method formatDateToMD
 * @return 返回格式化后的日期
 * @param {*} date
 * @example formatDate('2020-05-20') ==> 5月20日
 */
let formatDateToMD = (date) => {
    let tmp = date.split('-');
    let month = tmp[1] - 0;
    let day = tmp[2] - 0;
    return month + '月' + day + '日';
};

/**
 * 时间格式化成 hh:mm:ss 形式
 * @method formatDateToTime
 * @return 返回格式化后的时间
 * @param {*} date
 * @example formatDateToTime('2020-05-20 5:20:35') ==> 05:20:35
 */
let formatDateToTime = (date) => {
    let dateNew = new Date(String(date).replace(/-/g, '/')); // 日期转化成字符串兼容ios
    let h = dateNew.getHours();
    h = h < 10 ? '0' + h : h;
    let minute = dateNew.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    let second = dateNew.getSeconds();
    second = second < 10 ? '0' + second : second;
    return h + ':' + minute + ':' + second;
};

/**
 * 添加千分符
 * @method thousandsSeparator
 * @param {Number} v 需要添加千分符的数字
 * @param {*} num 需要保留的小数位数
 * @return 返回添加千分符后的数字
 * @example thousandsSeparator(125553.66,7) ==> 125,553.6600000
 * @example thousandsSeparator(-125553.66,7) ==> -125,553.66
 */
let thousandsSeparator = (v, num) => {
    let re = /\d{1,3}(?=(\d{3})+$)/g;
    let newVal;
    if (typeof num === 'number') {
        v = v.toFixed(num);
    }
    if (v < 0) {
        v = -v;
        newVal = v.toString().replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
            return s1.replace(re, '$&,') + s2;
        });
        newVal = '-' + newVal;
    } else {
        newVal = v.toString().replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
            return s1.replace(re, '$&,') + s2;
        });
    }
    return newVal;
};

/**
 * 经纬度转化为度分秒
 * @method formateLocation
 * @param {*} v 经纬度
 * @param {*} i 0:度 1:分 2:秒
 */
let formateLocation = (v, i) => {
    if (v !== '') {
        v = String(v);
        let str1 = v.split('.');
        let du = str1[0];
        let tp = '0.' + str1[1];
        tp = String(tp * 60);
        let str2 = tp.split('.');
        let fen = str2[0];
        tp = '0.' + str2[1];
        let miao = Math.round(tp * 60);
        if (i == 0) {
            return du;
        } else if (i == 1) {
            return fen;
        } else if (i == 2) {
            return miao;
        }
    } else {
        return '';
    }
};

/**
 * 数组去重 方法1 双重for循环去重
 * @description 即arr[1]与后面的所有比如有相同则删除那个元素,然后在拿arr[2]与后面的所有比
 * @method arrDeduplication
 * @param {Array} arr 需要去重的数组
 * @returns 返回去重后的数组
 * @example  arrDeduplication([1,2,2,2,3,3,4])
 */
let arrDeduplication1 = (arr) => {
    // 第一层for 用来控制循环的次数 如 arr[1]=2
    for (let i = 0; i < arr.length; i++) {
    // 第二层for 用来控制与第一层比较的元素 如 arr[2]=3
        for (let j = i + 1; j < arr.length; j++) {
            // 比较arr[i]与arr[j] 如 arr[1]与arr[2] 如果相等
            if (arr[i] == arr[j]) {
                arr.splice(j, 1); // 从第j个位置上删除1 个元素 如删除索引为2的元素,此时arr为[1,2,2,3,3,4] 第一层for 再遍历时少了刚才重复的数据
                j--; // 如j为2,执行后j为1,下次循环时j为2,此时比较arr[1]与arr[2](原始arr[3]),如果j不减1,则会漏掉一个进行比较的元素
            }
        }
    }
    return arr;
};

/**
 * 数组去重 方法2 单层for循环与sort排序结合
 * @method arrDeduplication2
 * @description 即左右相比较,相同删除左边,再拿左边(删除前的右边)与右边相比较
 * @param {Array} arr 需要去重的数组
 * @returns 返回去重后的数组
 * @example  arrDeduplication2([1,2,10,3,3,4])
 */
let arrDeduplication2 = (arr) => {
    arr.sort(); // sort排序是把元素当字符串排序 如[1,10,2,3,3,4]
    for (let i = 0; i < arr.length - 1; i++) {
    // 如arr[3]与arr[4]
        if (arr[i] == arr[i + 1]) {
            arr.splice(i, 1); // 如[1,10,2,3,4]
            i--; // 如 2
        }
    }
    return arr;
};

/**
 * 数组去重 方法3 用一个空数组去存首次出现的元素
 * @method arrDeduplication3
 * @description
 * @param {Array} arr 需要去重的数组
 * @returns 返回去重后的数组
 * @example  arrDeduplication3([1,2,10,3,3,4])
 */
let arrDeduplication3 = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i]);
        }
    }
    return arr;
};

/**
 * 数组去重 方法4 利用对象给首次出现的属性赋值并用一个空数组去存首次出现的元素
 * @method arrDeduplication4
 * @description
 * @param {Array} arr 需要去重的数组
 * @returns 返回去重后的数组
 * @example  arrDeduplication4([1,2,10,3,3,4])
 */
let arrDeduplication4 = (arr) => {
    let obj = {};
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            newArr.push(arr[i]);
            obj[arr[i]] = 1;
        }
    }
    return newArr;
};

/**
 * 冒泡排序 从小到大排序
 * @description 双重for循环 相邻元素两两对比，元素交换，大的元素交换到后面,进行第一次循环后最大的在最后面
 * @method arrS2LSort
 * @param {Array} arr 需要排序的数组
 * @returns 返回排序后的数组
 * @example  arrS2LSort([4,2,3,5,1])=>[1,2,3,4,5]
 */
let arrS2LSort = (arr) => {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
};

/**
 * 冒泡排序 从大到小排序
 * @description 双重for循环 相邻元素两两对比，元素交换，小的元素交换到后面,进行第一次循环后最小的在最后面
 * @method arrL2SSort
 * @param {Array} arr 需要排序的数组
 * @returns 返回排序后的数组
 * @example  arrL2SSort([4,2,3,5,1])=>第1层for 4次=>第1遍 第2层for 4 次=>[4,3,5,2,1]=>第2遍 第2层for 3 次=>[4,5,3,2,1]=>第3遍 第2层for 2 次=> [4,5,3,2,1]=>第4遍 第2层for 1 次=> [5,4,3,2,1]
 */
let arrL2SSort = (arr) => {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] < arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
};

/** 方法说明
 * @sortByCommon 通用排序
 * @param {Object} obj1 字段1
 * @param {Object} obj2 字段2
 * @param {String} name 字段名称
 * @return{Boolean} false: 倒序  true: 正序
 * 使用方法:element-ui sort-method="(obj1,obj2)=>sortByCommon(obj1,obj2,name)"
 */

let sortByCommon = (obj1, obj2, name) => {
    let val1 = obj1[name];
    let val2 = obj2[name];
    return val1 - val2;
};

/**
 * 过滤特殊字符
 * @method replaceStr
 * @param {String} str 需要过滤的字符串
 * @returns 过滤后的字符串
 */
let replaceStr = (str) => {
    // eslint-disable-next-line no-useless-escape
    return str.replace(/\s+|[\\\\\\s%^&*|<>:?\"]/g, '');
};

/**
 * 清空对象
 * @method delObj
 * @param {*} obj
 * @return 返回清空后的对象
 * @example delObj({name:'xiaoming',age:20})
 */
let delObj = (obj) => {
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            obj[k] = '';
        }
    }
    return obj;
};

/**
 * 查询数组中与给定值最相近的数组
 * @method closestNumberIndex
 * @param {Array} arr 需要查询的数组
 * @param {String} uniqueId 对象数组中的某个属性 非对象数组为空
 * @param {Number} num 需要查询的数字
 * @returns {Number} 返回索引号 -1 不存在
 * @example closestNumberIndex([1,2,10,3,3,4],id,1)
 */
let closestNumberIndex = (arr, uniqueId, num) => {
    if (arr && arr.length > 0) {
        let index = -1;
        if (uniqueId) {
            let ret = Number(arr[0][uniqueId]);
            let distance = Math.abs(ret - num);
            for (let i = 1; i < arr.length; i++) {
                let newDistance = Math.abs(arr[i][uniqueId] - num);
                if (newDistance < distance) {
                    distance = newDistance;
                    ret = arr[i];
                    index = i;
                }
            }
        } else {
            let ret = Number(arr[0]);
            let distance = Math.abs(ret - num);
            for (let i = 1; i < arr.length; i++) {
                let newDistance = Math.abs(arr[i] - num);
                if (newDistance < distance) {
                    distance = newDistance;
                    ret = arr[i];
                    index = i;
                }
            }
        }
        return index;
    }
};

/**
 * 获取JSON对象中指定数组中指定值的索引号
 * @method getJSONArrDefValIdx
 * @param {Object} obj 被查找的对象
 * @param {Array} arr 被查找的对象中的数组
 * @param {String} key 数组的唯一识别字段
 * @param {*} val 数组中的某一项唯一识别字段的值
 * @return 返回选中的索引号 -1:未找到 -2:val不存在
 * @example var obj={pid:1,useList:[{id:1,name:'shj'},{id:2,name:'jxb'}]} getJSONArrDefValIdx(obj,'useList','id',1) ==> obj.defaultIndex 为 0
 */
let getJSONArrDefValIdx = (obj, arr, key, val) => {
    if (val === '' || val === null) {
        return -2;
    }
    obj[arr].forEach(function(v, i) {
        if (v[key] === val) {
            return (obj.defaultIndex = i);
        }
    });
    return -1;
};

/**
 * 查询数组中某个值的索引
 * @method getArrDefValIdx
 * @param {Array} arr 需要查询的数组
 * @param {String} uniqueId 对象数组中的某个属性 非对象数组为空
 * @param {*} value 需要查询的值
 * @returns {Number} 返回索引号 -1 不存在
 * @example  getArrDefValIdx([1,2,10,3,3,4],id,1)
 */
let getArrDefValIdx = (arr, uniqueId, value) => {
    if (uniqueId) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][uniqueId] === value) {
                return i;
            }
        }
    } else {
        for (let j = 0; j < arr.length; j++) {
            if (arr.indexOf(arr[j]) > -1) {
                return j;
            }
        }
    }
    return -1;
};

/**
 * 删除数组中的某个值
 * @method removeArrDefVal
 * @param {Array} arr 需要查询的数组
 * @param {String} uniqueId 对象数组中的某个属性 非对象数组为空
 * @param {*} value 需要查询的值
 * @example removeArrDefVal([1,2,10,3,3,4],id,1)
 */
let removeArrDefVal = (arr, uniqueId, value) => {
    let index = getArrDefValIdx(arr, uniqueId, value);
    if (index != -1) {
        arr.splice(index, 1);
    }
};

/**
 * @method json2FormData
 * @param {JSON} jsonObj
 * @returns {FormData} 返回FormData形式
 */
let json2FormData = (jsonObj) => {
    let formData = new FormData();
    // ES 5
    Object.keys(jsonObj).forEach(function(key, index) {
        formData.append(key, index, this.ruleForm[key]);
    });
    return formData;
};
/* --------------------数据处理-结束-------------------- */

/* --------------------地图相关-开始-------------------- */
/**
 * 调用百度地图API
 * @method loadBMapScript
 */
let loadBMapScript = () => {
    let script = document.createElement('script');
    script.src =
    'http://api.map.baidu.com/api?v=2.0&ak=k7uT4pdUEKqPr1d9ZSYDq1jxzd8fXtKk&callback=bMapInit';
    document.body.appendChild(script);
};

// 地址判断
let judgeAddr = (prov, city, block, street, detail) => {
    if (prov == '' || city == '' || block == '') {
        Message({
            message: '请填入完整的区域！',
            position: 'bottom',
            duration: 3000,
            className: 'globalMsg'
        });
        return false;
    } else if (street == '') {
        Message({
            message: '街道不能为空或该地址不在当前代理范围内！',
            position: 'bottom',
            duration: 3500,
            className: 'globalMsg'
        });
        return false;
    } else if (detail == '') {
        Message({
            message: '详细地址不能为空！',
            position: 'bottom',
            duration: 3000,
            className: 'globalMsg'
        });
        return false;
    } else {
        return true;
    }
};
/* --------------------地图相关-结束-------------------- */

/* --------------------文件相关-开始-------------------- */
/**
 * 将base64转成blob格式
 * @method base64ToBlob
 * @return {*} 返回blob格式
 * @example var blobObj=base64ToBlob(dataUrl);formData.append("file", blobObj,`${this.index + 1}.png`);
 */
let base64ToBlob = (dataUrl) => {
    let arr = dataUrl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1]; // 获取文件类型
    let blobStr = atob(arr[1]); // 用于解码使用 base-64 编码的字符串;btoa() 方法用于创建一个 base-64 编码的字符串
    let n = blobStr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = blobStr.charCodeAt(n); // 返回指定位置的字符的 Unicode 编码
    }
    let blobObj = new Blob([u8arr], { type: mime });
    return blobObj;
};
/* --------------------文件相关-结束-------------------- */

/* --------------------页面渲染相关-开始-------------------- */
/**
 * rem值转化为px值
 * @method rem2px
 * @param {Number} rem rem值
 * @example 根节点字体大小16px 如果存在 rem2px(1) ==> 1*16 ==> 16 否则 rem2px(1) ==> 1*100 ==> 100
 */
let rem2px = rem => {
    if (document.documentElement.style.fontSize) {
        return rem * document.documentElement.style.fontSize.replace('px', '');
    } else {
        return rem * 100;
    }
};
/* --------------------页面渲染相关-结束-------------------- */

// axios get请求 参数需要稍微封装
let axiosDataAdapter = obj => {
    return {
        params: obj
    };
};

export default {
    ctx: ctx,
    getPath: getPath,
    getRootPath: getRootPath,
    getRelativePath: getRelativePath,
    getWsUrl: getWsUrl,
    getQueryString: getQueryString,
    getParameter: getParameter,
    isIE: isIE,
    IEVersion: IEVersion,
    platformName: platformName,
    formatDateToM: formatDateToM,
    formatMsToDate: formatMsToDate,
    formatDateToNormal: formatDateToNormal,
    formatDateToYMD: formatDateToYMD,
    formatDateToMD: formatDateToMD,
    formatDateToTime: formatDateToTime,
    thousandsSeparator: thousandsSeparator,
    formateLocation: formateLocation,
    arrDeduplication1: arrDeduplication1,
    arrDeduplication2: arrDeduplication2,
    arrDeduplication3: arrDeduplication3,
    arrDeduplication4: arrDeduplication4,
    arrS2LSort: arrS2LSort,
    arrL2SSort: arrL2SSort,
    sortByCommon: sortByCommon,
    replaceStr: replaceStr,
    delObj: delObj,
    closestNumberIndex: closestNumberIndex,
    getJSONArrDefValIdx: getJSONArrDefValIdx,
    removeArrDefVal: removeArrDefVal,
    json2FormData: json2FormData,
    loadBMapScript: loadBMapScript,
    judgeAddr: judgeAddr,
    base64ToBlob: base64ToBlob,
    rem2px: rem2px,
    axiosDataAdapter: axiosDataAdapter
};
