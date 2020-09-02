/* 用于简单的加密解密
 * @Author: ShiHuiJun
 * @Date: 2020-01-01 13:26:00
 * @Last Modified by:   ShiHuiJun
 * @Last Modified time: 2020-09-01 13:26:00
 */

const encrypt = plaintext => {
    let c = String.fromCharCode(plaintext.charCodeAt(0) + plaintext.length);
    for (let i = 1; i < plaintext.length; i++)
    {
        c += String.fromCharCode(plaintext.charCodeAt(i) + plaintext.charCodeAt(i - 1));
    }
    return decodeURI(c);
};
// JSON.parse(decrypt(localStorage.getItem('li')))
const decrypt = ciphertext => {
    ciphertext = decodeURIComponent(ciphertext);
    let c = String.fromCharCode(ciphertext.charCodeAt(0) - ciphertext.length);
    for (let i = 1; i < ciphertext.length; i++)
    {
        c += String.fromCharCode(ciphertext.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
};
export {
    encrypt,
    decrypt
};
