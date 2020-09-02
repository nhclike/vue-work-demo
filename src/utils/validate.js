// 默认mint-ui，根据项目情况自行修改
import { Message } from 'element-ui';
// let tipPosition = 'bottom';
let tipDuration = 2000;

/* 公共方法说明
 *@doToastFn 提示校验失败
 *@param{String}[tipmessage] 校验失败提示信息
 *@return{Boolean}[false] 默认返回false，表示校验失败状态
*/
let doToastFn = tipmessage => {
    Message({
        message: tipmessage,
        // position: tipPosition,
        type: 'error',
        duration: tipDuration
    });
    return false;
};

/* 公共方法说明
 *@isEmptyFn 验证是否为空
 *@param{String,Number,Array}[item] 被校验字段
 *@return{Boolean} false: 不为空  true: 为空
*/
let isEmptyFn = item => {
    return String(item).replace(/(^s*)|(s*$)/g, '').length == 0;
};

/* 公共方法说明
 *@validateComFn 校验函数公共调用
 *@param{String,Number,Array}[item] 被校验字段
 *@param{Boolean}[required] 是否必填
 *@param{String}[msg] 被校验字段名称
 *@param{Boolean}[validateResult] item非空时是否未通过校验,传入值类似 !reg.test(item) ,如果只需有值，则传入false
 *@param{String}[msgInfo] 自定义未通过校验的消息提示
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateComFn = (item, required, msg, validateResult, msgInfo) => {
    let isEmpty = isEmptyFn(item);
    if (required && isEmpty) {
        return doToastFn(`请填写${msg}~`);
    } else if (!isEmpty && validateResult) {
        return doToastFn(msgInfo || `请填写正确的${msg}~`);
    } else {
        return true;
    }
};

/* 方法说明
 *@validateSame 校验两次输入item1和item2是否一致
 *@param{String}[item1] 被校验字段1
 *@param{String}[item2] 被校验字段2
 *@param{Boolean}[required] 是否必填,默认值：true
 *@param{String}[msg] 被校验字段名称，默认值：二次密码
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateSame = (item1, item2, required = true, msg = '二次密码') => {
    let isEmpty = isEmptyFn(item2);
    if (required && isEmpty) {
        return doToastFn(`请填写${msg}~`);
    } else if (item1 !== item2) {
        return doToastFn('两次输入不一致');
    } else {
        return true;
    }
};

/* 方法说明
 *@validatePassword2 校验密码（包含重复输入密码）（长度6-20位,英文（大小写）/数字/-/_）
 *@param{String}[item1] 被校验字段1
 *@param{String}[item2] 被校验字段2(重复输入密码)
 *@param{Boolean}[required] 是否必填,默认值：true
 *@param{String}[msg] 被校验字段名称，默认值：密码
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validatePassword2 = (item1, item2, required = true, msg = '密码') => {
    return validatePassword(item1, required, msg) && validateSame(item1, item2, required);
};

/* 方法说明
 *@validatePassword 校验密码（长度6-20位,英文（大小写）/数字/-/_@）
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：true
 *@param{String}[msg] 被校验字段名称，默认值：密码
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validatePassword = (item, required = true, msg = '密码') => {
    let reg = /^[A-Za-z0-9\-_@]{6,20}$/;
    return validateComFn(
        item,
        required,
        msg,
        !reg.test(item),
        `${msg}长度须为6-20位，可输入英文（大小写）/数字/-/_/@`
    );
};

/* 方法说明
 *@validateAmount 校验数额是否为正数
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：true
 *@param{String}[msg] 被校验字段名称，默认值：数额
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateAmount = (item, required = true, msg = '数额') => {
    return validateComFn(item, required, msg, !(item - 0 > 0));
};

/* 方法说明
 *@validateFileIsEmpty 校验文件是否为空，包括字符串类型、数组类型
 *@param{String,Array}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：true
 *@param{String}[msg] 被校验字段名称，默认值：文件
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateFileIsEmpty = (item, required = true, msg = '文件') => {
    return validateComFn(item, required, msg, false);
};

/* 方法说明
 *@validateName 校验中文姓名
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：true
 *@param{String}[msg] 被校验字段名称，默认值：姓名
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateName = (item, required = true, msg = '姓名') => {
    let reg = /^[\u4e00-\u9fa5]{2,6}(·[\u4e00-\u9fa5]{2,6})*$/;
    return validateComFn(item, required, msg, !reg.test(item));
};

/* 方法说明
 *@validateIdCard 校验身份证号
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：true
 *@param{String}[msg] 被校验字段名称，默认值：身份证号
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateIdCard = (item, required = true, msg = '身份证号') => {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return validateComFn(item, required, msg, !reg.test(item));
};

/* 方法说明
 *@validateTel 校验手机号
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：true
 *@param{String}[msg] 被校验字段名称，默认值：手机号
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateTel = (item, required = true, msg = '手机号') => {
    let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    return validateComFn(item, required, msg, !reg.test(item));
};

/* 方法说明
 *@validateBankCard 校验银行卡号
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：true
 *@param{String}[msg] 被校验字段名称，默认值：银行卡号
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateBankCard = (item, required = true, msg = '银行卡号') => {
    let reg = /^([1-9]{1})([0-9]{14,18})$/;
    return validateComFn(item, required, msg, !reg.test(item));
};

/* 方法说明
 *@validateFileIsNum 校验价格输入(0-99999999.99)，最多保留2位小数
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：true
 *@param{String}[msg] 被校验字段名称，默认值：售价
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateFileIsNum = (item, required = true, msg = '价格') => {
    let reg = /^(\d{1,8})(\.\d{0,2})?$/;
    return validateComFn(item, required, msg, !reg.test(item));
};

/* 方法说明
 *@validateVerifiCode 校验验证码（6位数字）
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：true
 *@param{String}[msg] 被校验字段名称，默认值：验证码
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateVerifiCode = (item, required = true, msg = '验证码') => {
    let reg = /^\d{6}$/;
    return validateComFn(item, required, msg, !reg.test(item));
};

/* 方法说明
 *@validateInvitedCode 校验邀请码（6位的大写字符或数字组合）
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：false
 *@param{String}[msg] 被校验字段名称，默认值：邀请码
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateInvitedCode = (item, required = false, msg = '邀请码') => {
    let reg = /^[A-Z0-9]{6}$/;
    return validateComFn(item, required, msg, !reg.test(item));
};

/* 方法说明
 *@validateAmmeterCode 校验并网电表号长度（9~13位数字）
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：false
 *@param{String}[msg] 被校验字段名称，默认值：并网电表号
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateAmmeterCode = (item, required = false, msg = '并网电表号') => {
    let reg = /^\d{9,13}$/;
    return validateComFn(item, required, msg, !reg.test(item));
};

/* 方法说明
 *@validateInputLenght 校验输入长度判断最大6位，小数最多两位
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：false
 *@param{String}[msg] 被校验字段名称，默认值：值
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateInputLenght = (item, required = false, msg = '值') => {
    let reg = /^(?=([0-9]{0,6}$|[0-9]{0,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1,2})?$/;
    return validateComFn(item, required, msg, !reg.test(item));
};

/* 方法说明
 *@validateAddress 校验收货地址（1-25个任意大小写字母数字横杠下划线加中文）
 *@param{String}[item] 被校验字段
 *@param{Boolean}[required] 是否必填,默认值：false
 *@param{String}[msg] 被校验字段名称，默认值：收货地址
 *@return{Boolean} false: 未通过校验  true: 校验通过
*/
let validateAddress = (item, required = false, msg = '收货地址') => {
    let reg = /[A-Za-z\d_\-\u4e00-\u9fa5]{1,25}$/;
    return validateComFn(item, required, msg, !reg.test(item));
};

export {
    validateName, // 校验中文姓名
    validateIdCard, // 校验身份证号
    validateTel, // 校验手机号
    validateInvitedCode, // 校验邀请码（6位的大写字符或数字组合）
    validateVerifiCode, // 校验验证码（6位数字）
    validatePassword, // 校验密码（长度6-20位,英文（大小写）/数字/-/_）
    validatePassword2,  // 校验密码（包含重复输入密码）（长度6-20位,英文（大小写）/数字/-/_）
    validateAmount, // 校验数额是否为正数
    validateBankCard, // 校验银行卡号
    validateFileIsEmpty, // 校验文件是否为空，包括字符串类型、数组类型
    validateInputLenght, // 校验输入长度判断最大6位，小数最多两位
    validateFileIsNum, // 校验价格输入(0-99999999.99)，最多保留2位小数
    validateAmmeterCode, // 校验并网电表号长度（9~13位数字）
    validateAddress // 校验收货地址（1-25个任意大小写字母数字下划线加中文）
};
