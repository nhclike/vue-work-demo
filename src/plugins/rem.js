/**
 * 设置浏览器基准字体大小
 * @param{}[document]
 * @param{}[window]
 * @param{}[documentElement] 属性以一个元素对象返回一个文档的文档元素
 * @orientationchange 事件在设备的纵横方向改变时触发
 * @param{}[designWidth] 设计稿的宽度
 * @param{}[clientWidth] 可见区域宽度
 * @param{}[document.documentElement.style.fontSize] 动态计算html的font-size
 * @DOMContentLoaded 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded事件被触发
 * @recalc 1rem=浏览器的fontSize（默认是16px），通过recalc（）以设计稿的尺寸改变浏览器的fontSize为100px，客户端与设计稿尺寸相同时，那么1rem=100px
 */
(function(doc, win) {
    let docEl = doc.documentElement;
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    function recalc() {
        let designWidth = 2560;
        let clientWidth = docEl.clientWidth;
        if (!clientWidth) { return }
        docEl.style.fontSize = (100 * clientWidth / designWidth) + 'px';
    }
    if (!doc.addEventListener) { return }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
