/* 会议详情|议题详情
 * @Author: ShiHuiJun
 * @Date: 2020-03-19 09:36:04
 * @Last Modified by: nihc
 * @Last Modified time: 2021-02-25 15:04:20
 */

<template>
  <div
    class="topicReader full-height"
    @selectstart="handleSelectStart($event)"
    @mouseup="isArea=false;isMouseUp=true;"
  >
    <!-- 内容 -->
    <div class="content full-w">
      <!-- 材料/笔录/会议纪要 -->
      <div ref="material" class="material" @scroll="handleScroll()">
        <div v-if="(curFile.pngList&&curFile.pngList.length<1)||!curFile.pngList" class="noFile">
          <img class src="../../assets/images/topicReader/noFile.png" />
          <p>{{noFileMsg}}</p>
        </div>
        <div
          v-if="showFile === 1"
          ref="pageBox"
          class="pageBox"
          :style="materialStyleObj.pageBoxStyle"

        >
          <div
            @mouseenter="isArea=true;"
            @mouseout="isArea=false;"
            :id="`page${index+1}`"
            :style="materialStyleObj.pageStyle"
            class="page"
            v-for="(item,index) in curFile.pngList"
            :key="index"
          >
            <img
                class="full-width"
                :style="materialStyleObj.imgStyle"
                v-lazy="item"
                alt
                :key="index"
            />
            <!-- 画板 -->
            <DrawCanvas
              v-if="(index+1)>Math.floor((curPageNum-1)/canvasPageSize)*10&&(index+1)<=Math.ceil(curPageNum/canvasPageSize)*10"
              :curFileNotationURL="curFileNotationURL"
              :index="index"
              :activeIndex="activeIndex"
              :fileId="curFile.fileId||''"
              :bgUrl="item"
              :canvasStyle="canvasStyle"
              :canvasSize="canvasSize"
              :config="brushOptions.config"
              :isWrite="isWrite"
              :isArea="isArea"
              :isMouseUp="isMouseUp"
              :action="action"
              :actionStepObjFather="actionStepObjFather"
              @emitActionStep="emitActionStep"
              @emitCanvasStyle="emitCanvasStyle"
              @emitDrawStatus="emitDrawStatus"
            ></DrawCanvas>
          </div>
        </div>
      </div>
      <!-- 右侧功能区 -->
      <div
        v-if="curFile.pngList&&curFile.pngList.length?true:false"
        class="material-func-box"
        @click="showAnnotationList=false;showBrushSetting=false"
      >
        <div>
          <!-- 手写批注 -->
          <span
            class="btn txt-justify annotation_hand"
            @click="setBrushShape('line')"
          >&nbsp;批注&nbsp;</span>
          <!-- 批注列表 -->
          <span
            v-if="!isWrite"
            class="btn txt-justify annotation_list"
            @click.stop="showAnnotationList=!showAnnotationList"
          >批注列表</span>
          <!-- 橡皮擦 -->
          <span
            v-if="isWrite"
            class="btn txt-justify annotation_erasure"
            @click="setBrushShape('eraser')"
          >&nbsp;橡皮擦&nbsp;</span>
          <!-- 退出批注 -->
          <span
            v-if="isWrite"
            class="btn txt-justify annotation_exit"
            @click="saveAndExitAnnotation()"
          >&nbsp;退出&nbsp;</span>
          <!-- 保存批注 -->
          <span
            v-if="isWrite"
            class="btn txt-justify annotation_exit"
            @click="saveAnnotation()"
          >&nbsp;保存&nbsp;</span>
          <!-- 批注设置 -->
          <span
            v-if="isWrite"
            class="btn txt-justify annotation_set"
            @click.stop="showBrushSetting=!showBrushSetting;"
          >&nbsp;设置&nbsp;</span>
          <!-- 清除本页 -->
          <span
            class="btn txt-justify annotation_erasure"
            @click="brushControl('clear')"
          >清除本页</span>
          <!-- 批注撤销 -->
          <span
            v-if="isWrite"
            class="btn txt-justify annotation_revoke"
            @click="brushControl('prev')"
          >&nbsp;撤销&nbsp;</span>
        </div>
      </div>
      <!-- 批注列表 -->
      <transition name="transition-setting">
        <div v-if="showAnnotationList" class="setting-box">
          <div class="annotation-list">
            <h5>批注列表</h5>
            <div
              v-for="(item,index) in curFileNotationURL"
              :key="index"
              :class="{'active':String(curPageNum) === String(item.sort)}"
              @click.stop="curPageNum=Number(item.sort);scrollToPage(Number(item.sort))"
            >P{{item.sort}}</div>
          </div>
        </div>
      </transition>
      <!-- 画笔设置 -->
      <transition name="transition-setting">
        <div v-if="showBrushSetting" class="setting-box">
          <!-- 画笔颜色 -->
          <h5>画笔颜色</h5>
          <div class="brush-color">
            <span
              v-for="(item,index) in brushOptions.colors"
              :key="index"
              :class="{'active':brushOptions.config.lineColor === item}"
              :style="{ background: item }"
              @click.stop="setBrushColor(item)"
            ></span>
          </div>
          <!-- 画笔粗细 -->
          <h5>画笔粗细</h5>
          <div class="brush-thickness">
            <span
              v-for="(pen,index) in brushOptions.brushs"
              :key="index"
              :class="[pen.className,{'active': brushOptions.config.lineWidth === pen.lineWidth}]"
              @click.stop="setBrushThickness(pen.lineWidth)"
            >{{pen.name}}</span>
          </div>
          <!-- 画笔形状 -->
          <h5>画笔形状</h5>
          <div class="brush-thickness">
            <span
              v-for="(shape,index) in brushOptions.shapes"
              :key="index"
              :class="[shape.className,{'active': brushOptions.config.shape === shape.shape}]"
              @click.stop="setBrushShape(shape.shape)"
            >{{shape.name}}</span>
          </div>
        </div>
      </transition>
      <!-- 底部操作区 -->
      <div class="material-operate-box"
      >
        <span
          class="btn txt-justify"
          @click="scaleBigger"
        >&nbsp;放大&nbsp;</span>
        <span
          class="btn txt-justify"
          @click="scrollToPage(curPageNum-1)"
        >上一页</span>
        <span
          class="btn txt-justify"
        >&nbsp;{{curPageNum}}&nbsp;/&nbsp;{{curFile.pngList.length}}&nbsp;</span>
        <span
          class="btn txt-justify"
          @click="scrollToPage(curPageNum+1)"
        >下一页</span>
        <span v-if="curFile.pngList&&curFile.pngList.length?true:false" class="btn jumpToNum">
          跳转至第
          <el-input v-model="jumpToNum" placeholder />&nbsp;页
          <span class="font-color-primary" @click="scrollToPage(jumpToNum)">Go</span>
        </span>
        <span
          class="btn txt-justify"
          @click="scaleSmaller"
        >&nbsp;缩小&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import DrawCanvas from '@/components/common/DrawCanvas';
export default {
    layout: 'blank',
    components: {
        DrawCanvas
    },
    inject: ['reload'],
    props: {},
    data() {
        return {
            curPage: 'MaterialRead',

            showFile: 1,
            showMaterialList: false, // 是否显示-材料列表
            showAnnotationList: false, // 是否显示批注列表
            materialStyleObj: {
                pageBoxStyle: 'width:6.36rem;',
                pageStyle: 'width:6.36rem;min-height:0.5rem;',
                imgStyle: 'width:6.36rem;min-height:0.5rem;' // 材料区 图片样式
            },

            noFileMsg: '本议题暂无电子材料', // 无材料显示文字
            curFile: {
                fileId: '1301201902010001340001',
                pngList: [
                    '/images/topicMaterial/1.png',
                    '/images/topicMaterial/2.png',
                    '/images/topicMaterial/3.png'
                ],
                pngSize: 3,
                pngUrl: '/file/123Relese',
                typeCode: null,
                url: ''
            }, // 当前材料
            curPageNum: 1, // 当前所在页码
            canvasPageSize: 10, // 每次加载canvas数量
            jumpToNum: 1, // 跳转页码
            scrollTop: 0, // 滚动的值
            lastScrollTop: 0, // 上次滚动的距离,判断滚动是否停止

            /* --------------------DrawCanvas-props-开始-------------------- */
            curFileNotationURL: [
                {
                    bookScale: null,
                    caseId: '11',
                    creator: '00c7d8ffae6aa409175879851f7d7f97',
                    creatorTime: '2020-09-17 11:47:56',
                    fileId: '1301201902010001340001',
                    imgData: null,
                    imgUrl: '/images/notate/1.png',
                    pageNo: '1',
                    typeCode: '1'
                },
                {
                    bookScale: null,
                    caseId: '11',
                    creator: '00c7d8ffae6aa409175879851f7d7f97',
                    creatorTime: '2020-09-17 11:47:56',
                    fileId: '1301201902010001340001',
                    imgData: null,
                    imgUrl: '/images/notate/2.png',
                    pageNo: '1',
                    typeCode: '1'
                },
                {
                    bookScale: null,
                    caseId: '11',
                    creator: '00c7d8ffae6aa409175879851f7d7f97',
                    creatorTime: '2020-09-17 11:47:56',
                    fileId: '1301201902010001340001',
                    imgData: null,
                    imgUrl: '/images/notate/3.png',
                    pageNo: '1',
                    typeCode: '1'
                }
            ], // 当前材料的批注列表
            activeIndex: 0, // 当前批注上一步或者下一步的图像所在的页面
            canvasStyle: 'width:6.36rem;min-height:0.5rem;', // 父传子 每页canvas样式
            // 父传子 canvas大小
            canvasSize: {
                width: 0,
                height: 0,
                scale: 1
            },
            isWrite: false, // 是否开启批注
            isArea: false, // 是否在可涂鸦区域
            isMouseUp: true, // 鼠标是否已抬起
            action: '', // 父传子 fnScale|prev|next|clear|save
            // canvas所有操作步骤
            actionStepObjFather: {
                preDrawAry: [], // 存储当前表面状态数组-上一步
                nextDrawAry: [], // 存储当前表面状态数组-下一步
                middleAry: [] // 中间数组
            },
            /* --------------------DrawCanvas-props-结束-------------------- */
            // 画笔
            showBrushSetting: false, // 是否显示-画笔设置
            // 画笔设置-参数
            brushOptions: {
                // 父传子 配置参数
                config: {
                    lineWidth: 3,
                    lineColor: '#ff0000',
                    shadowBlur: 2,
                    shape: 'line'
                },
                colors: [
                    '#000000',
                    '#ff0000',
                    '#80ff00',
                    '#00ffff',
                    '#ff8000',
                    '#408080',
                    '#8000ff',
                    '#cccc00'
                ],
                brushs: [
                    {
                        className: 'thin',
                        lineWidth: 3,
                        name: '细'
                    },
                    {
                        className: 'middle',
                        lineWidth: 6,
                        name: '中'
                    },
                    {
                        className: 'thick',
                        lineWidth: 12,
                        name: '粗'
                    }
                ],
                shapes: [
                    {
                        className: 'line',
                        shape: 'line',
                        name: '线条'
                    },
                    {
                        className: 'rect',
                        shape: 'rect',
                        name: '矩形'
                    },
                    {
                        className: 'circle',
                        shape: 'circle',
                        name: '圆形'
                    }
                ],
                // 画笔操作样式
                brushControlClass: {
                    prevClass: 'i-prev',
                    nextClass: 'i-next',
                    clearClass: 'el-icon-delete'
                }
            }
        };
    },
    computed: {
        brushControls() {
            return [
                {
                    title: '上一步',
                    action: 'prev',
                    className: this.brushOptions.brushControlClass.prevClass
                },
                {
                    title: '下一步',
                    action: 'next',
                    className: this.brushOptions.brushControlClass.nextClass
                },
                {
                    title: '清除',
                    action: 'clear',
                    className: this.brushOptions.brushControlClass.clearClass
                }
            ];
        }
    },
    watch: {
        scrollTop(newValue, oldValue) {
            setTimeout(() => {
                if (newValue == this.$refs.material.scrollTop) {
                    // 延时执行后当 newValue 等于新的scrollTop，代表滚动结束
                    console.log('滚动结束');
                    this.lastScrollTop = newValue; // 每次滚动结束后都要给 lastScrollTop 赋值
                    this.isScrollEnd(); // 滚动结束提示批注保存
                }
            }, 500); // 必须使用延时器，否则每次newValue和window.scrollY都相等，无法判断，watch的侦听周期大于20ms
            if (this.lastScrollTop == oldValue) {
                // 每次滚动开始时 lastScrollTop 与 oldValue相等
                console.log('滚动开始');
            }
        }
    },
    created() {
    },
    mounted() {
        this.initFile();


    },
    methods: {
        ...mapActions({

        }),

        // 初始化材料
        initFile() {

            /* 材料 */
            this.showFile = 1; // 清空材料显示
            this.showAnnotationList = false; // 隐藏批注列表
            // 还原材料区样式
            this.materialStyleObj = {
                pageBoxStyle: 'width:6.36rem;',
                pageStyle: 'width:6.36rem;min-height:0.5rem;',
                imgStyle: 'width:6.36rem;min-height:0.5rem;' // 材料区 图片样式
            };
            this.noFileMsg = ''; // 无材料显示文字
            // this.curFile =  {}; // 清空当前文件信息
            /* DrawCanvas-props */
            // this.curFileNotationURL = []; // 清空当前批注图片信息
            this.isWrite = false; // 关闭批注
            this.action = ''; // 清除之前的操作
            // 清除canvas所有操作步骤
            this.actionStepObjFather = {
                preDrawAry: [], // 存储当前表面状态数组-上一步
                nextDrawAry: [], // 存储当前表面状态数组-下一步
                middleAry: [] // 中间数组
            };
            /* toolBar */
            this.showBrushSetting = false; // 隐藏画笔设置
            this.activeTool = -1; // 不选中任何工具
            this.action = `initnum${Date.now()}`;
        },
        // 保存批注
        saveAnnotation() {
            this.$confirm(`确定保存当前批注吗？`, '系統提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                showCancelButton: true,
                customClass: 'confirm-success',
                type: 'info'
            })
                .then(() => {
                    this.action = `savenum${Date.now()}`;
                })
                .catch(() => {
                    // this.$message.info(`取消批注`);
                });
        },

        // 保存并退出批注
        saveAndExitAnnotation() {
            this.$confirm(`确定退出？`, '系統提示', {
                confirmButtonText: '保存',
                cancelButtonText: '取消',
                showCancelButton: true,
                customClass: 'confirm-success',
                type: 'info'
            })
                .then(() => {
                    this.isWrite = false;
                })
                .catch(() => {
                    // this.$message.info(`取消批注`);
                });
        },

        /* --------------------DrawCanvas-emit事件-开始-------------------- */

        // 改变绘图状态
        emitDrawStatus(isArea, isMouseUp) {
            this.isArea = isArea;
            this.isMouseUp = isMouseUp;
        },
        // 设置canvas样式
        emitCanvasStyle(width, height) {
            console.log(`[${this.curPage}]`, 'emitCanvasStyle');

            let rem2px = Number(
                getComputedStyle(window.document.documentElement)['font-size'].split(
                    'px'
                )[0]
            );
            console.log();
            this.canvasSize.width = width;
            this.canvasSize.height = height;
            this.materialStyleObj = {
                pageBoxStyle: `width:${(width / rem2px).toFixed(2)}rem;`,
                pageStyle: `width:${(width / rem2px).toFixed(2)}rem;height:${(height / rem2px + 0.02).toFixed(
                    2
                )}rem;min-height:0.5rem;`,
                imgStyle: `width:${(width / rem2px).toFixed(2)}rem;height:${(height / rem2px).toFixed(
                    2
                )}rem;min-height:0.5rem;`
            };
            this.canvasStyle = this.materialStyleObj.imgStyle;
            this.$nextTick(() => {
                console.log(`[${this.curPage}]---emitCanvasStyle---this.canvasStyle`, this.canvasStyle);
            });
        },
        // 子传父 设置 上一步|下一步|清除 样式
        emitActionStep(action, pObj, mObj, nObj) {
            switch (action) {
                case 'clearDraw':
                    // 父组件 空绘图表面进栈
                    this.actionStepObjFather.preDrawAry = [];
                    this.actionStepObjFather.middleAry = [
                        {
                            index: mObj.index,
                            preData: mObj.preData
                        }
                    ];
                    this.actionStepObjFather.nextDrawAry = [];
                    break;
                case 'canvasDown':
                    // 父组件 当前绘图表面
                    this.actionStepObjFather.preDrawAry.push({
                        index: pObj.index,
                        preData: pObj.preData
                    });
                    break;
                case 'canvasUp':
                    // 父组件 当前绘图表面
                    this.actionStepObjFather.middleAry.push({
                        index: mObj.index,
                        preData: mObj.preData
                    });
                    break;
                case 'resetAllArr':
                    // 父组件 当前绘图表面
                    this.actionStepObjFather.middleAry = [];
                    this.actionStepObjFather.middleAry = this.actionStepObjFather.middleAry.concat(
                        this.actionStepObjFather.preDrawAry
                    );
                    this.actionStepObjFather.middleAry.push({
                        index: mObj.index,
                        preData: mObj.preData
                    });
                    this.actionStepObjFather.nextDrawAry = [];
                    break;
            }
            let prevClass = 'i-prev';
            let nextClass = 'i-next';
            let clearClass = 'el-icon-delete';
            if (this.actionStepObjFather.preDrawAry.length) {
                prevClass = 'active i-prev';
            } else {
                prevClass = 'i-prev';
            }
            if (this.actionStepObjFather.nextDrawAry.length) {
                nextClass = 'active i-next';
            } else {
                nextClass = 'i-next';
            }
            if (prevClass === 'active i-prev' || nextClass === 'active i-next') {
                clearClass = 'active el-icon-delete';
            } else {
                clearClass = 'el-icon-delete';
            }
            this.brushOptions.brushControlClass.prevClass = prevClass;
            this.brushOptions.brushControlClass.nextClass = nextClass;
            this.brushOptions.brushControlClass.clearClass = clearClass;
        },

        emitActionChange(action) {
            this.action = `${action}num${Date.now()}`;

        },
        /* --------------------DrawCanvas-emit事件-结束-------------------- */

        /* --------------------画笔设置-开始-------------------- */
        // 设置画笔颜色
        setBrushColor(color) {
            this.brushOptions.config.lineColor = color;
        },
        // 设置画笔粗细
        setBrushThickness(type) {
            this.brushOptions.config.lineWidth = type;
        },
        // 设置画笔粗细
        setBrushShape(shape) {
            this.brushOptions.config.shape = shape;
            this.isWrite = true;
        },
        // 画笔操作
        brushControl(action) {
            switch (action) {
                case 'prev':
                    this.activeIndex =
            this.actionStepObjFather.preDrawAry.length > 0
                ? this.actionStepObjFather.preDrawAry[
                    this.actionStepObjFather.preDrawAry.length - 1
                ].index
                : -2;
                    if (this.actionStepObjFather.preDrawAry.length) {
                        this.action = `${action}num${Date.now()}`;
                        // 父组件 当前绘图表面
                        this.actionStepObjFather.preDrawAry.pop(); // 上一步数组 删除最后一步
                        let midDataFather = this.actionStepObjFather.middleAry[
                            this.actionStepObjFather.preDrawAry.length + 1
                        ]; // 中间数组 取上一步数组的最后一步
                        this.actionStepObjFather.nextDrawAry.push(midDataFather); // 下一步数组 加入上一步数组的最后一步
                    }
                    break;
                case 'next':
                    this.activeIndex =
            this.actionStepObjFather.nextDrawAry.length > 0
                ? this.actionStepObjFather.nextDrawAry[
                    this.actionStepObjFather.nextDrawAry.length - 1
                ].index
                : -2;
                    if (this.actionStepObjFather.nextDrawAry.length) {
                        this.action = `${action}num${Date.now()}`;
                        // 父组件 当前绘图表面
                        this.actionStepObjFather.nextDrawAry.pop(); // 下一步数组 删除最后一步
                        let midDataFather = this.actionStepObjFather.middleAry[
                            this.actionStepObjFather.middleAry.length -
                this.actionStepObjFather.nextDrawAry.length -
                -1
                        ]; // 中间数组 取下一步数组的最后一步
                        this.actionStepObjFather.preDrawAry.push(midDataFather); // 上一步数组 加入下一步数组的最后一步
                    }
                    break;
                case 'clear':
                    this.$confirm(
                        `确定清除 第${this.curPageNum}页 的批注吗？`,
                        '系統提示',
                        {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            showCancelButton: true,
                            customClass: 'confirm-success',
                            type: 'info'
                        }
                    )
                        .then(() => {
                            // 父组件 清除 当前绘图表面
                            this.activeIndex = this.curPageNum - 1;
                            let preDrawAry = this.actionStepObjFather.preDrawAry;
                            let nextDrawAry = this.actionStepObjFather.nextDrawAry;
                            let middleAry = this.actionStepObjFather.middleAry;
                            this.actionStepObjFather.preDrawAry = [];
                            this.actionStepObjFather.nextDrawAry = [];
                            this.actionStepObjFather.middleAry = [];
                            preDrawAry.forEach((element, i) => {
                                if (element.index !== this.activeIndex) {
                                    this.actionStepObjFather.preDrawAry.push(element);
                                }
                            });
                            // console.log(`preDrawAry`, this.actionStepObjFather.preDrawAry);
                            nextDrawAry.forEach((element, i) => {
                                if (element.index !== this.activeIndex) {
                                    this.actionStepObjFather.nextDrawAry.push(element);
                                }
                            });
                            // console.log(`nextDrawAry`, this.actionStepObjFather.nextDrawAry);
                            middleAry.forEach((element, i) => {
                                if (element.index !== this.activeIndex) {
                                    this.actionStepObjFather.middleAry.push(element);
                                }
                            });
                            // console.log(`middleAry`, this.actionStepObjFather.middleAry);

                            this.action = `${action}num${Date.now()}`;
                        })
                        .catch(() => {
                            this.$message.info(`取消删除`);
                        });

                    break;
            }
        },
        /* --------------------画笔设置-结束-------------------- */

        /* --------------------操作区-开始-------------------- */
        // 禁止批注时鼠标移动选择事件
        handleSelectStart(event) {
            // console.log(event);
            if (this.isWrite) {
                if (window.event.preventDefault) {
                    window.event.preventDefault();
                } else {
                    event.returnValue = true;
                }
            }
        },
        // 材料区滚动时当前页显示
        handleScroll() {
            if (
                this.$refs.material &&
        this.curFile &&
        this.curFile.pngSize &&
        this.curFile.pngSize > 0
            ) {
                let scrollTop = Math.ceil(this.$refs.material.scrollTop);
                let page = this.$refs.material.children[0].children[0];
                let pageH = page.offsetHeight;
                let pageNum = Math.floor(scrollTop / pageH + 1);
                // this.curPageNum = Math.floor(scrollTop / pageH + 1);
                if (
                    this.isWrite &&
          (pageNum <=
            Math.floor((this.curPageNum - 1) / this.canvasPageSize) * 10 ||
            pageNum > Math.ceil(this.curPageNum / this.canvasPageSize) * 10)
                ) {
                    this.scrollTop = scrollTop;
                } else {
                    this.curPageNum = pageNum;
                }
            }
            // console.log(scrollTop)
        },
        // 滚动结束提示批注保存
        isScrollEnd() {
            // let scrollTop = this.$refs.material.scrollTop;
            let page = this.$refs.material.children[0].children[0];
            let pageH = page.offsetHeight;
            let pageNum = Math.floor(this.scrollTop / pageH + 1);
            this.$confirm(
                `第${
                    Math.floor((this.curPageNum - 1) / this.canvasPageSize) * 10 + 1
                }页至第${
                    Math.ceil(this.curPageNum / this.canvasPageSize) * 10
                }页正在批注,点击确定后不会保存,确定继续吗?`,
                '系統提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    customClass: 'confirm-success',
                    type: 'info',
                    closeOnClickModal: false
                }
            )
                .then(() => {
                    this.setCurFile(false);
                    this.curPageNum = pageNum;
                })
                .catch(() => {
                    this.scrollToPage(this.curPageNum);
                    this.scrollTop = 0;
                    this.lastScrollTop = 0;
                });
        },
        // 材料区跳转至某页
        scrollToPage(pageNum) {
            if (!this.comm.IsChkStrNonNegativeInteger(pageNum)) {
                this.$message.error('请输入正确的页码');
                return false;
            }
            this.confirmScrollToPage(pageNum);
        },
        confirmScrollToPage(pageNum) {
            if (pageNum <= 0) {
                this.jumpToNum = 1;
                this.$refs.material.scrollTop = 0; // 兼容ie
                // this.$refs.material.scrollTo(0, 0);//不兼容ie
            } else {
                let page = this.$refs.material.children[0].children[0];
                let pageH = page.offsetHeight;
                // console.log(pageH);
                if (pageNum > this.curFile.pngList.length) {
                    this.jumpToNum = this.curFile.pngList.length;
                    this.$refs.material.scrollTop =
            pageH * (this.curFile.pngList.length - 1); // 兼容ie
                    // this.$refs.material.scrollTo(0, pageH * (pageNum - 1));//不兼容ie
                } else {
                    this.$refs.material.scrollTop = pageH * (pageNum - 1); // 兼容ie
                }
            }
        },

        // 放大
        scaleBigger() {
            let item = {
                zoom: 1.5,
                maxRem: 49
            };
            let rem2px = Number(getComputedStyle(window.document.documentElement)['font-size'].split('px')[0]);
            let img = this.$refs.pageBox.children[0].children[0];
            let imgW = img.offsetWidth;
            let imgH = img.offsetHeight;
            if (imgW * item.zoom >= item.maxRem * rem2px) {
                return false;
            }
            this.materialStyleObj = {
                pageBoxStyle: `width:${((imgW * item.zoom) / rem2px).toFixed(2)}rem;`,
                pageStyle: `width:${((imgW * item.zoom) / rem2px).toFixed(2)}rem;height:${(
                    (imgH * item.zoom) / rem2px +
                    0.02
                ).toFixed(2)}rem;min-height:0.5rem;`,
                imgStyle: `width:${((imgW * item.zoom) / rem2px).toFixed(2)}rem;height:${((imgH * item.zoom) / rem2px).toFixed(
                    2
                )}rem;min-height:0.5rem;`
            };
            this.canvasStyle = this.materialStyleObj.imgStyle; // 重新设置canvas画布尺寸
            this.canvasSize.width = imgW * item.zoom;
            this.canvasSize.height = imgH * item.zoom;
            this.canvasSize.scale = item.zoom;
            this.action = `fnScalenum${Date.now()}`; // 传到DrawCanvas页面做监听处理
        },
        // 缩小
        scaleSmaller() {
            let item = {
                zoom: 1.5,
                minRem: 6.2
            };
            let rem2px = Number(getComputedStyle(window.document.documentElement)['font-size'].split('px')[0]);
            let img = this.$refs.pageBox.children[0].children[0];
            let imgW = img.offsetWidth;
            let imgH = img.offsetHeight;
            if (imgW / item.zoom < item.minRem * rem2px) {
                this.canvasSize.scale = 1;
                return false;
            }
            this.materialStyleObj = {
                pageBoxStyle: `width:${(imgW / item.zoom / rem2px).toFixed(2)}rem;`,
                pageStyle: `width:${(imgW / item.zoom / rem2px).toFixed(2)}rem;height:${(imgH / item.zoom / rem2px + 0.02).toFixed(
                    2
                )}rem;min-height:0.5rem;`,
                imgStyle: `width:${(imgW / item.zoom / rem2px).toFixed(2)}rem;height:${(imgH / item.zoom / rem2px).toFixed(
                    2
                )}rem;min-height:0.5rem;`
            };

            this.canvasStyle = this.materialStyleObj.imgStyle; // 重新设置canvas画布尺寸
            this.canvasSize.width = imgW / item.zoom;
            this.canvasSize.height = imgH / item.zoom;
            this.canvasSize.scale = 1 / item.zoom;
            this.action = `fnScalenum${Date.now()}`; // 传到DrawCanvas页面做监听处理
        }
        /* --------------------操作区-结束-------------------- */
    }
};
</script>

<style scoped lang="less">
@spacing: 20px;
.topicReader {
  background: #f3f4f8;
  .content {
    color: @text_color_white;
    padding: 30px;
    height: 100%;
    font-size: @font18px;
    display: flex;
    justify-content: space-between;
    position: relative;
    // 材料区
    .material {
      width: 986px;
      overflow: auto;
      height: 100%;
      margin: 0 auto;
      position: relative;
      background: @text_color_white;
      .noFile {
        position: absolute;
        top: 50%;
        left: 50%;
        text-align: center;
        transform: translate(-50%, -50%);
        img {
          width: 280px;
          height: 280px;
        }
        p {
          font-size: 0.4rem;
          color: @text_color_white;
        }
      }
      .pageBox {
        width: 100%;
        border: 1px solid @border_color;
        border-top: 0;
        .page {
          position: relative;
          border-bottom: 5px solid #eee;
          margin: 0 auto;
          .myCanvas {
            position: absolute;
            top: 0;
            left: 0;
            cursor: crosshair;
          }
        }
      }
    }
    // 画笔设置
    .setting-box {
      overflow-y: auto;
      z-index: 3001;
      font-size: @font20px;
      width: 380px;
      padding: 20px;
      position: absolute;
      bottom: 0;
      right: -440px;
      background: #fff;
      border-radius: @border_radius_small;
      box-shadow: 0px 0px 5px 0px #666;
      h5 {
        font-weight: bold;
        color: #777;
      }
      .brush-color {
        display: block;
        .active {
          border: @border_large solid #00cc00;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          width: 70px;
          height: 60px;
          border-radius: @border_radius_middle;
          border: @border_large solid #fff;
          margin: 5px;
          cursor: pointer;
        }
      }
      .brush-thickness {
        .active {
          background: #f5606f;
          color: @text_color_white;
        }
        span {
          display: inline-block;
          width: 60px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-radius: @border_radius_middle;
          margin: 10px;
          background: #ddd;
          cursor: pointer;
        }
        .thin {
          font-weight: 500;
        }
        .middle {
          font-weight: 700;
        }
        .thick {
          font-weight: 900;
        }
      }
      .brush-control {
        .active {
          background: #f5606f;
          color: @text_color_white;
        }
        span {
          display: inline-block;
          width: 60px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-radius: @border_radius_middle;
          margin: 10px;
          background: #ddd;
          vertical-align: middle;
          cursor: pointer;
        }
        .i-prev::before {
          content: '\21BA';
        }
        .i-next::before {
          content: '\21BB';
        }
      }
      .annotation-list {
        height: 400px;
        .active {
          color: #fa4c4c;
        }
        div {
          cursor: pointer;
        }
      }
    }
    // 右侧功能区
    .material-func-box {
      position: absolute;
      top: 0;
      right: -50px;
      z-index: 1999;
      span {
        cursor: pointer;
        display: block;
        writing-mode: vertical-lr; /* Webkit */
        writing-mode: tb-lr;
        padding: 5px;
        height: 100px;
        background-color: #fa4c4c;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        &:not(:first-child) {
          margin-top: 5px;
        }
      }
    }
    // 底部操作区
    .material-operate-box {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 100px);
      text-align: center;
      border-radius: @border_radius_middle;
      background: @bg_maskLayer_black5;
      .btn {
        // width: 110px;
        padding: 0 10px;
        line-height: 60px;
        background: none;
        font-size: @font22px;
        border-radius: 0;
        &:not(:first-child) {
          border-left: 1px solid #666;
        }
        &.jumpToNum {
          width: 250px;
          input {
            color: @text_color_black;
            width: 50px;
            padding: 0 10px;
            text-align: center;
            border-radius: @border_radius_middle;
            outline: 0;
            border: 0;
            line-height: @form_item_h;
          }
          /deep/.el-input {
            width: 50px;
            .el-input__inner {
              padding: 0 10px;
              text-align: center;
            }
          }
          span {
            color: rgb(0, 255, 221);
            font-weight: bold;
          }
        }
      }
      .materialList {
        z-index: 3001;
        position: absolute;
        background: #666;
        max-height: 500px;
        overflow-y: auto;
        width: 500px;
        bottom: 60px;
        padding: 0 20px;
        text-align: left;
        .active {
          color: @color_primary;
        }
      }
    }
  }
}

/* 画笔设置过渡效果 */
.transition-settingsetting-enter-active {
  transition: opacity 0.5s;
}
.transition-setting-enter {
  opacity: 0;
}
.transition-setting-leave-active {
  transition: opacity 0.5s;
}
.transition-setting-leave-to {
  opacity: 0;
}
</style>
