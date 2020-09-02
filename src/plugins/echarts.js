/* 按需引入echarts
    可以按需引入的模块列表见 https://github.com/ecomfe/echarts/blob/master/index.js
 */
import Vue from 'vue';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/chart/pictorialBar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/visualMap';

Vue.prototype.$echarts = echarts;
