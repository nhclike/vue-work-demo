# plugins文件夹

用于插件配置

# 1. rem.js文件说明

### 1.1. 在IE、FireFox、Opera下都可以使用

`document.body.clientWidth` 网页可见区域宽

`document.body.clientHeight` 网页可见区域高

### 1.2. 如果在页面中添加这行标记的话

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

##### 1.2.1. IE | FireFox

`document.documentElement.clientWidth` ==> 可见区域宽度

`document.documentElement.clientHeight`==> 可见区域高度

`document.body.clientWidth` ==> BODY对象宽度

`document.body.clientHeight` ==> BODY对象高度

##### 1.2.2. Opera

`document.documentElement.clientWidth`==> 页面对象宽度(即BODY对象宽度加上Margin宽)

`document.documentElement.clientHeight` ==> 页面对象高度(即BODY对象高度加上Margin高)

`document.body.clientWidth` ==> 可见区域宽度

`document.body.clientHeight`==> 可见区域高度


### 1.3. 如果没有定义W2C的标准，则

##### 1.3.1. IE

`document.documentElement.clientWidth` ==> 0

`document.documentElement.clientHeight`==> 0

##### 1.3.1. FireFox | Opera

`document.documentElement.clientWidth` ==> 页面对象宽度(即BODY对象宽度加上Margin宽)

`document.documentElement.clientHeight` ==> 页面对象高度(即BODY对象高度加上Margin高)

### 1.4. 其他

`document.body.offsetWidth` ==> 网页可见区域宽(包括边线和滚动条的宽)

`document.body.offsetHeight` ==> 网页可见区域高(包括边线的宽)

`document.body.scrollWidth` ==> 网页正文全文宽

`document.body.scrollHeight` ==> 网页正文全文高

`document.body.scrollTop` ==> 网页被卷去的高(ff)

`document.documentElement.scrollTop` ==> 网页被卷去的高(ie)

`document.body.scrollLeft` ==> 网页被卷去的左

`window.screenTop`==> 网页正文部分上

`window.screenLeft`==> 网页正文部分左

`window.screen.height` ==> 屏幕分辨率的高

`window.screen.width` ==> 屏幕分辨率的宽

`window.screen.availHeight` ==> 屏幕可用工作区高度

`window.screen.availWidth` ==> 屏幕可用工作区宽度

`window.screen.colorDepth` ==> 你的屏幕设置是？位彩色

`window.screen.deviceXDPI` ==> 你的屏幕设置？像素/英寸