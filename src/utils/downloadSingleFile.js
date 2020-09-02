/* 下载单一文件
 * @Author: ShiHuiJun
 * @Date: 2020-01-01 13:25:41
 * @Last Modified by:   ShiHuiJun
 * @Last Modified time: 2020-09-01 13:25:41
 */

class downloadFile {
    constructor() {
        this.elemIF = '';
    }
    init() {
        this.elemIF = this.creatEle();
    }
    creatEle() {
        const elemIF = document.createElement('iframe');
        elemIF.style.display = 'none';
        document.body.appendChild(elemIF);
        return elemIF;
    }
    setSrc(url) {
        this.elemIF.src = url;
    }
    destroy() {
        document.body.removeChild(this.elemIF);
    }
}
export default downloadFile;
