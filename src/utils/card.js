/*
 * @Author: ShiHuiJun
 * @Date: 2020-01-01 13:25:12
 * @Last Modified by:   ShiHuiJun
 * @Last Modified time: 2020-09-01 13:25:12
 */

/* 验证身份证号 */
let idCardNoUtil = {
    provinceAndCitys: {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
    },

    powers: ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'],

    parityBit: ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'],

    sexObj: { male: '1', female: '2' },

    // 校验地址
    checkAddressCode: function(addressCode) {
        let check = /^[1-9]\d{5}$/.test(addressCode);
        if (!check) { return false }
        if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2), 10)]) {
            return true;
        } else {
            return false;
        }
    },

    // 校验出生日期
    checkBirthDayCode: function(birDayCode) {
        let check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
        if (!check) { return false }
        let yyyy = parseInt(birDayCode.substring(0, 4), 10);
        let mm = parseInt(birDayCode.substring(4, 6), 10);
        let dd = parseInt(birDayCode.substring(6), 10);
        let xdata = new Date(yyyy, mm - 1, dd);
        if (xdata > new Date()) {
            return false;// 生日不能大于当前日期
        } else if ((xdata.getFullYear() == yyyy) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
            return true;
        } else {
            return false;
        }
    },

    // 根据18位身份证前17位计算出最后一个校验位
    getParityBit: function(idCardNo) {
        let id17 = idCardNo.substring(0, 17);

        let power = 0;
        for (let i = 0; i < 17; i++) {
            power += parseInt(id17.charAt(i), 10) * parseInt(idCardNoUtil.powers[i], 10);
        }

        let mod = power % 11;
        return idCardNoUtil.parityBit[mod];
    },

    // 验证校检码
    checkParityBit: function(idCardNo) {
        let parityBit = idCardNo.charAt(17).toUpperCase();
        if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
            return true;
        } else {
            return false;
        }
    },

    // 校验15位的身份证号码
    check15IdCardNo: function(idCardNo) {
        // 15位身份证号码的基本校验
        let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
        if (!check) { return false }
        // 校验地址码
        let addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) { return false }
        let birDayCode = '19' + idCardNo.substring(6, 12);
        // 校验日期码
        return idCardNoUtil.checkBirthDayCode(birDayCode);
    },

    // 校验18位的身份证号码
    check18IdCardNo: function(idCardNo) {
        // 18位身份证号码的基本格式校验
        let check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
        if (!check) { return false }
        // 校验地址码
        let addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) { return false }
        // 校验日期码
        let birDayCode = idCardNo.substring(6, 14);
        check = idCardNoUtil.checkBirthDayCode(birDayCode);
        if (!check) { return false }
        // 验证校检码
        return idCardNoUtil.checkParityBit(idCardNo);
    },

    // 格式化出生日期
    formateDateCN: function(day) {
        let yyyy = day.substring(0, 4);
        let mm = day.substring(4, 6);
        let dd = day.substring(6);
        return yyyy + '-' + mm + '-' + dd;
    }

};

// 校验-身份证号
let checkIdCardNo = (idCardNo) => {
    // 15位和18位身份证号码的基本校验
    let check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
    if (!check) { return false }
    // 判断长度为15位或18位
    if (idCardNo.length == 15) {
        return idCardNoUtil.check15IdCardNo(idCardNo);
    } else if (idCardNo.length == 18) {
        return idCardNoUtil.check18IdCardNo(idCardNo);
    } else {
        return false;
    }
};

// 校验-护照
let checkNumber = (number) => {
    let str = number;
    // 在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
    let Expression = /(P\d{7})|(G\d{8})/;
    let objExp = new RegExp(Expression);
    if (objExp.test(str) == true) {
        return true;
    } else {
        return false;
    }
};

// 根据-身份证号-获取-性别及出生日期
let getIdCardInfo = (idCardNo) => {
    let idCardInfo = {
        age: '',
        sex: '', // 性别
        birthday: '' // 出生日期(yyyy-mm-dd)
    };
    let myDate = new Date();
    let age = 0;
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    if (idCardNo.length == 15) {
        age = myDate.getFullYear() - idCardNo.substring(6, 8) - 1901;
        if (
            idCardNo.substring(8, 10) < month ||
            (idCardNo.substring(8, 10) == month && idCardNo.substring(10, 12) <= day)
        ) {
            age++;
        }
        let aday = '19' + idCardNo.substring(6, 12);
        idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
        if (parseInt(idCardNo.charAt(14), 10) % 2 == 0) {
            idCardInfo.sex = idCardNoUtil.sexObj.female;
        } else {
            idCardInfo.sex = idCardNoUtil.sexObj.male;
        }
    } else if (idCardNo.length == 18) {
        age = myDate.getFullYear() - idCardNo.substring(6, 10) - 1;
        if (
            idCardNo.substring(10, 12) < month ||
            (idCardNo.substring(10, 12) == month && idCardNo.substring(12, 14) <= day)
        ) {
            age++;
        }

        let aday = idCardNo.substring(6, 14);
        idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
        if (parseInt(idCardNo.charAt(16), 10) % 2 == 0) {
            idCardInfo.sex = idCardNoUtil.sexObj.female;
        } else {
            idCardInfo.sex = idCardNoUtil.sexObj.male;
        }
    }
    idCardInfo.age = age;
    return idCardInfo;
};

// 根据-身份证号-获取-15位身份证号
let getId15 = (idCardNo) => {
    if (idCardNo.length == 15) {
        return idCardNo;
    } else if (idCardNo.length == 18) {
        return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
    } else {
        return null;
    }
};

// 根据-身份证号-获取-18位身份证号
let getId18 = (idCardNo) => {
    if (idCardNo.length == 15) {
        let id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
        let parityBit = idCardNoUtil.getParityBit(id17);
        return id17 + parityBit;
    } else if (idCardNo.length == 18) {
        return idCardNo;
    } else {
        return null;
    }
};

export {
    checkIdCardNo,
    checkNumber,
    getIdCardInfo,
    getId15,
    getId18
};

