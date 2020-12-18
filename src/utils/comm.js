/*
 * @Author: ShiHuiJun
 * @Date: 2020-06-01 13:24:54
 * @Last Modified by: nihc
 * @Last Modified time: 2020-12-18 15:16:54
 */

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
import store from './../store';

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
export function px2rem(pxVal) {
    let fontSize = parseInt(document.documentElement.style.fontSize);
    let remVal = (pxVal / fontSize);
    return remVal;
}

// 校验非负整数(正整数+0)
export const IsChkStrNonNegativeInteger = str => {
    let regexp = /^-?[1-9]\d*$|0$/;
    if (!regexp.test(str)) {
        return false;
    }
    return true;
};
// 校验是否显示按钮
export function isAuthorizeShow(str) {
    let permsListArr = store.state.userInfo.permsList ? store.state.userInfo.permsList : [];
    let localState = JSON.parse(localStorage.getItem('state'));
    let localPermsListArr = [];
    if (localState) {
        localPermsListArr = localState.userInfo.permsList;
    }
    permsListArr = permsListArr.length == 0 ? localPermsListArr : permsListArr;

    if (permsListArr && permsListArr.length > 0) {
        for (let i = 0; i < permsListArr.length; i++) {
            if (permsListArr[i] === str) {
                return true;
            }
        }
        return false;
    }
    else {
        return false;

    }

}

// 校验是否显示按钮
export function isTrialAuthorizeShow(str) {
    let permsListArr = store.state.trialPermsList ? store.state.trialPermsList : [];
    console.log('permsListArr', permsListArr);
    if (permsListArr && permsListArr.length > 0) {
        for (let i = 0; i < permsListArr.length; i++) {
            if (permsListArr[i] === str) {
                return true;
            }
        }
        return false;
    }
    else {
        return false;

    }

}


export function ArrayIsEqual(arr1, arr2) { // 判断2个数组是否相等
    if (!arr1 || !arr2) {
        return false;
    }
    if (arr1 === arr2) { // 如果2个数组对应的指针相同，那么肯定相等，同时也对比一下类型
        return true;
    } else {
        if (arr1.length != arr2.length) {
            return false;
        } else { // 长度相同
            for (let i in arr1) { // 循环遍历对比每个位置的元素
                if (arr1[i] != arr2[i]) { // 只要出现一次不相等，那么2个数组就不相等
                    return false;
                }
            }// for循环完成，没有出现不相等的情况，那么2个数组相等
            return true;
        }
    }
}
