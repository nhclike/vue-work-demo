import Vue from 'vue';

import VueVideoPlayer from 'vue-video-player';
import 'vue-video-player/src/custom-theme.css';
import hls from 'videojs-contrib-hls';

import Video from 'video.js';
import 'video.js/dist/video-js.css';

// import 'video.js/dist/lang/zh-CN.js';// vue中直接引用会报错
// import 'video.js/dist/lang/zh-CN.json';// 本文使用的videojs版本中dist无此文件,根据video.js/dist/lang/zh-CN.js新建了下面video-zh-CN.json文件
import zhCN from './video-zh-CN.json';

import 'videojs-flash';

import SWF_URL from 'videojs-swf/dist/video-js.swf';

Video.options.flash.swf = SWF_URL; // 设置flash路径，Video.js会在不支持html5的浏览中使用flash播放视频文件
Video.addLanguage('zh-CN', zhCN);// 添加中文支持
Vue.use(hls);
Vue.use(VueVideoPlayer);
