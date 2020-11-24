<template>

   <div>
        <div id="ntko">

        </div>
        <div v-show="PluginError">
            您的浏览器不支持此插件,请使用IE浏览器
        </div>
    </div>
</template>

<script>
export default {
    name: 'Ntko',
    props: {
        ntkoHeight: {
            type: Number,
            default: 900
        }
    },
    data() {
        return {
            PluginError: false,

            // 32位控件的classid
            // classid: 'C9BC4E1F-4248-4a3c-8A49-63A7D317F404', // 南北
            classid: 'A64E3073-2016-4baf-A89D-FFE1FAA10EC0', // 高院
            // 64位控件的calssid
            classidx64: '',
            // 32位控件包的路径
            // codebase: '/officecontrol/NtkoOfficeControlSetup.msi', // 南北
            codebase: '', // 高院

            // 64位控件包的路径
            codebase64: '',
            // 设置高度
            height: this.ntkoHeight,
            // 设置宽度
            width: '100%',
            // 买断授权密钥如果不是买断可以不用写
            MakerCaption: '',
            // 买断授权密钥如果不是买断可以不用写
            MakerKey: '',
            // 密钥
            // ProductCaption: '浙江南北联合',
            ProductCaption: '浙江省高级人民法院',

            // 密钥
            // ProductKey: '1061CFD1C3CADD35DA08D816866744EB45BB13DD', // 南北
            ProductKey: 'F3377399C79C47C6FCEE890E5C85B2DA9934574A', // 高院

            // 解除时间密钥
            NoExpireKey: '3701675797ADD8099C698013EFCC10E6',
            TANGER_OCX_OBJ: '',
            ntkoFilePath: '/test.doc',
            wordContentLen: 0// 文本内容长度
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
        console.log('ntko----mounted');
        let _this = this;
        this.$nextTick(() => {
            if (this.browser == 'IE') {
                _this.initNtko();
                setTimeout(() => {
                    // _this.openNtko(true);
                    _this.openNtko(false);

                }, 20);

            }
            else {
                _this.PluginError = true;

            }
            _this.$emit('ntkoLoaded');


        });
    },
    methods: {
        initNtko() {
            this.id = this.createGUID();
            if (this.browser == 'IE') {
                if (window.navigator.platform == 'Win32') {
                    let domStr = '';
                    domStr += '<!-- 用来产生编辑状态的ActiveX控件的JS脚本-->   ';
                    domStr += '<!-- 因为微软的ActiveX新机制，需要一个外部引入的js-->   ';
                    domStr += '<object id="' + this.id + '" classid="clsid:' + this.classid + '" codebase="' + this.codebase + '" width="' + this.width + '" height="' + this.height + '">   ';
                    // domStr += '<param name="MakerCaption" value="' + this.MakerCaption + '">   ';
                    // domStr += '<param name="MakerKey" value="' + this.MakerKey + '">   ';
                    domStr += '<param name="ProductCaption" value="' + this.ProductCaption + '">   ';
                    domStr += '<param name="ProductKey" value="' + this.ProductKey + '">   ';
                    domStr += '<param name="NoExpireKey" value="' + this.NoExpireKey + '">   ';
                    domStr += '<param name="BorderStyle" value="1">';
                    domStr += '<param name="BorderColor" value="14402205">';
                    domStr += '<param name="TitlebarColor" value="15658734">';
                    domStr += '<param name="TitlebarTextColor" value="0">';
                    domStr += '<param name="Titlebar" value="false">';
                    domStr += '<param name="MenubarColor" value="14402205">';
                    domStr += '<param name="MenuButtonColor" VALUE="16180947">';
                    domStr += '<param name="MenuBarStyle" value="3">';
                    domStr += '<param name="MenuButtonStyle" value="7">';
                    domStr += '<param name="WebUserName" value="NTKO">';
                    domStr += '<param name="Statusbar" value="false">';
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
        },
        createGUID() {
            let _guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            _guid = _guid.replace(/[xy]/g, function(c) {
                let r = Math.random() * 16 | 0;
                let v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
            return _guid.toUpperCase();
        },
        openNtko(isFullScreen) {
            this.TANGER_OCX_OBJ = document.getElementById(this.id);
            console.log('this.TANGER_OCX_OBJ', this.TANGER_OCX_OBJ);
            // 如果网络错误，不弹出提示
            this.TANGER_OCX_OBJ.IsShowNetErrorMsg = false;
            this.TANGER_OCX_OBJ.FileNew = false;
            this.TANGER_OCX_OBJ.FileOpen = false;
            this.TANGER_OCX_OBJ.FileClose = false;
            this.TANGER_OCX_OBJ.FullScreenMode = isFullScreen;
            if (this.ntkoFilePath) {
                this.openFile();
            }


        },
        openFile() {
            // let url = this.ntkoFilePath.replace(/\\/g, '/');
            // let path = `${__API__}/trial${url}?t=${Date.now()}`;
            let url = '/test.docx';
            let path = 'http://172.19.82.181:8080/test.docx';
            let lastIndex = url.lastIndexOf('.');
            let suffix = url.substr(lastIndex + 1);
            let fileType = '';
            if (suffix == 'xls' || suffix == 'xlsx') {
                fileType = 'excel';
                path = url;
            }
            console.log(path);

            try {
                if (this.TANGER_OCX_OBJ.ActiveDocument) {
                    this.TANGER_OCX_OBJ.close();
                }

                switch (fileType) {
                    case 'excel':
                        debugger;
                        // this.TANGER_OCX_OBJ.OpenFromURL(path, false, 'Excel.Sheet');
                        this.TANGER_OCX_OBJ.BeginOpenFromURL(path, false, true);// 异步(第三个参数为是否只读)

                        break;

                    default:
                        this.TANGER_OCX_OBJ.OpenFromURL(path, false);

                        break;
                }
                // debugger;
                // this.TANGER_OCX_OBJ.OpenFromURL(path, false);

                // this.setReadMode();

            } catch (err) {
                // 如果没有打开文件，则创建文件
                if (this.TANGER_OCX_OBJ.ActiveDocument == 'undefined' || this.TANGER_OCX_OBJ.ActiveDocument == null) {
                    // debugger;
                    switch (fileType) {
                        case 'excel':
                            this.TANGER_OCX_OBJ.CreateNew('Excel.Sheet');

                            break;

                        default:
                            this.TANGER_OCX_OBJ.CreateNew('Word.Document');

                            break;
                    }
                }
                console.log('OpenFromURL---error', err);


            } finally {
                this.$emit('ntkoLoaded');

            }


        }
    }

};
</script>

<style>
    /*全局覆盖样式，注意在其他地方不要定义ntko-demo这个样式*/
    /*.ntko-demo .el-dialog__body{*/
        /*padding: 0 0 0 0 !important;*/
    /*}*/
</style>
