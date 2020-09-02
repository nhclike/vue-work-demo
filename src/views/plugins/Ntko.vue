<template>
    <div id="ntko">

    </div>
</template>

<script>
export default {
    name: 'Ntko',
    data() {
        return {
        // 32位控件的classid
            classid: 'C9BC4E1F-4248-4a3c-8A49-63A7D317F404',
            // classid : "A64E3073-2016-4baf-A89D-FFE1FAA10EE0",
            // 64位控件的calssid
            classidx64: 'A64E3073-2016-4baf-A89D-FFE1FAA10EC0',
            // 32位控件包的路径
            codebase: 'officecontrol/OfficeControl.cab#version = 6.0.0.1',
            // 64位控件包的路径
            codebase64: 'officecontrol/OfficeControlx64.cab#version=6,0,0,1',
            // 设置高度
            height: '600px',
            // 设置宽度
            width: '100%',
            // 买断授权密钥如果不是买断可以不用写
            MakerCaption: '',
            // 买断授权密钥如果不是买断可以不用写
            MakerKey: '',
            // 密钥
            ProductCaption: '浙江南北联合',
            // 密钥
            ProductKey: '1061CFD1C3CADD35DA08D816866744EB45BB13DD',
            // 解除时间密钥
            NoExpireKey: ''
        };
    },
    computed: {
        title() {
            return 'vue集成ntko示例浏览器参数：' + this.platform + '-' + this.browser;
        },
        platform() {
            return window.navigator.platform;
        },
        browser() {
            let userAgent = navigator.userAgent;
            let rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
            let rFirefox = /(firefox)\/([\w.]+)/;
            let rOpera = /(opera).+version\/([\w.]+)/;
            let rChrome = /(chrome)\/([\w.]+)/;
            let rSafari = /version\/([\w.]+).*(safari)/;
            let browser;
            function uaMatch(ua) {
                let match = rMsie.exec(ua);
                if (match != null) {
                    return { browser: 'IE', version: match[2] || '0' };
                }
                match = rFirefox.exec(ua);
                if (match != null) {
                    return { browser: match[1] || '', version: match[2] || '0' };
                }
                match = rOpera.exec(ua);
                if (match != null) {
                    return { browser: match[1] || '', version: match[2] || '0' };
                }
                match = rChrome.exec(ua);
                if (match != null) {
                    return { browser: match[1] || '', version: match[2] || '0' };
                }
                match = rSafari.exec(ua);
                if (match != null) {
                    return { browser: match[2] || '', version: match[1] || '0' };
                }
                if (match != null) {
                    return { browser: '', version: '0' };
                }
            }
            let browserMatch = uaMatch(userAgent.toLowerCase());
            if (browserMatch.browser) {
                browser = browserMatch.browser;
            }
            return browser;
        }
    },
    mounted() {
        // alert(this.browser);
        this.$nextTick(() => {
            if (this.browser == 'IE') {
                if (window.navigator.platform == 'Win32') {
                    let domStr = '';
                    domStr += '<!-- 用来产生编辑状态的ActiveX控件的JS脚本-->   ';
                    domStr += '<!-- 因为微软的ActiveX新机制，需要一个外部引入的js-->   ';
                    domStr += '<object id="TANGER_OCX" classid="clsid:' + this.classid + '" codebase="' + this.codebase + '" width="' + this.width + '" height="' + this.height + '">   ';
                    domStr += '<param name="MakerCaption" value="' + this.MakerCaption + '">   ';
                    domStr += '<param name="MakerKey" value="' + this.MakerKey + '">   ';
                    domStr += '<param name="ProductCaption" value="' + this.ProductCaption + '">   ';
                    domStr += '<param name="ProductKey" value="' + this.ProductKey + '">   ';
                    domStr += '<param name="NoExpireKey" value="' + this.NoExpireKey + '">   ';
                    domStr += '<param name="IsUseUTF8URL" value="-1">   ';
                    domStr += '<param name="IsUseUTF8Data" value="-1">   ';
                    domStr += '<param name="Caption" value="NTKO OFFICE文档控件示例演示 http://www.ntko.com">   ';
                    domStr += '<SPAN STYLE="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</SPAN>   ';
                    domStr += '</object>';
                    document.getElementById('ntko').innerHTML += domStr;
                }
                if (window.navigator.platform == 'Win64') {
                    let domStr = '';
                    domStr += '<!-- 用来产生编辑状态的ActiveX控件的JS脚本-->   ';
                    domStr += '<!-- 因为微软的ActiveX新机制，需要一个外部引入的js-->   ';
                    domStr += '<object id="TANGER_OCX" classid="clsid:\'+this.classidx64+\'" codebase="' + this.codebase64 + '" width="' + this.width + '" height="' + this.height + '">   ';
                    domStr += '<param name="MakerCaption" value="' + this.MakerCaption + '">   ';
                    domStr += '<param name="MakerKey" value="' + this.MakerKey + '">   ';
                    domStr += '<param name="ProductCaption" value="' + this.ProductCaption + '">   ';
                    domStr += '<param name="ProductKey" value="' + this.ProductKey + '">   ';
                    domStr += '<param name="NoExpireKey" value="' + this.NoExpireKey + '">   ';
                    domStr += '<param name="IsUseUTF8URL" value="-1">   ';
                    domStr += '<param name="IsUseUTF8Data" value="-1">   ';
                    domStr += '<param name="Caption" value="NTKO OFFICE文档控件示例演示 http://www.ntko.com">   ';
                    domStr += '<SPAN STYLE="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</SPAN>   ';
                    domStr += '</object>';
                    document.getElementById('ntko').innerHTML += domStr;
                }
            }
            else if (this.browser == 'firefox') {
                let domStr = '';
                domStr += '<object id="TANGER_OCX" type="application/ntko-plug"  codebase="' + this.codebase + '" width="' + this.width + '" height="' + this.height + '" ForOnSaveToURL="ntkosavetourl"  ForOndocumentopened="ntkoondocumentopened"';
                domStr += 'ForOnpublishAshtmltourl="ntkopublishashtml"';
                domStr += 'ForOnpublishAspdftourl="ntkopublishaspdf"';
                domStr += 'ForOnSaveAsOtherFormatToUrl="ntkosaveasotherurl"';
                domStr += '_MakerCaption="' + this.MakerCaption + '"  ';
                domStr += '_MakerKey="' + this.MakerKey + '"  ';
                domStr += '_ProductCaption="' + this.ProductCaption + '"  ';
                domStr += '_ProductKey="' + this.ProductKey + '"   ';
                domStr += '_NoExpireKey="' + this.NoExpireKey + '"   ';
                domStr += 'clsid="{' + this.classid + '}" >';
                domStr += '<SPAN STYLE="color:red">尚未安装NTKO Web FireFox跨浏览器插件</SPAN>   ';
                domStr += '</object>   ';
                document.getElementById('ntko').innerHTML += domStr;
            } else if (this.browser == 'chrome') {

                let domStr = '';
                domStr += '<object id="TANGER_OCX" clsid="{' + this.classid + '}"  ForOnSaveToURL="ntkosavetourl"  ForOndocumentopened="ntkoondocumentopened"';
                domStr += 'ForOnpublishAshtmltourl="ntkopublishashtml"';
                domStr += 'ForOnpublishAspdftourl="ntkopublishaspdf"';
                domStr += 'ForOnSaveAsOtherFormatToUrl="ntkosaveasotherurl"';
                domStr += '_IsUseUTF8URL="-1"   ';
                domStr += '_IsUseUTF8Data="-1"   ';
                domStr += '_MakerCaption="' + this.MakerCaption + '"  ';
                domStr += '_MakerKey="' + this.MakerKey + '"  ';
                domStr += '_ProductCaption="' + this.ProductCaption + '"  ';
                domStr += '_NoExpireKey="' + this.NoExpireKey + '"   ';
                domStr += '_ProductKey="' + this.ProductKey + '"   ';
                domStr += 'codebase="' + this.codebase + '" width="' + this.width + '" height="' + this.height + '" type="application/ntko-plug" ';
                domStr += '<SPAN STYLE="color:red">尚未安装NTKO Web Chrome跨浏览器插件</SPAN>   ';
                domStr += '</object>';
                document.getElementById('ntko').innerHTML += domStr;
            } else {
                alert('暂不支持其他浏览器');
            }
            let obj  = document.getElementById('TANGER_OCX');
            obj.CreateNew('Word.Document');

        });
    },
    methods: {
    }

};
</script>

<style>
    /*全局覆盖样式，注意在其他地方不要定义ntko-demo这个样式*/
    /*.ntko-demo .el-dialog__body{*/
        /*padding: 0 0 0 0 !important;*/
    /*}*/
</style>
