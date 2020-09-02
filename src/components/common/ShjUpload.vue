/* 文件上传-组件 */
<template>
    <div class="nb-upload">
        <div v-if="uploadListType==='pictureCard'">
            <div class="nb-upload-pictureCard" v-for="(item,index) in fileList" :key="index">
                <div
                    class="nb-upload-pictureCard-img"
                    @mouseenter="pictureCardHoverIndex=index"
                    @mouseleave="pictureCardHoverIndex=null"
                >
                    <img :src="formatFileUrl(item)" />
                    <div v-if="pictureCardHoverIndex===index" class="nb-upload-pictureCard-hover">
                        <slot
                            name="pictureCardHoverIcon"
                            :row="fileList[index]"
                            :index="index"
                            :minNum="minNum"
                            :maxNum="maxNum"
                        >
                            <!-- <i class="el-icon-zoom-in" @click="previewImg(item.filePath)"></i>
                            <i class="el-icon-delete" @click="removeFile(item,index)"></i>-->
                        </slot>
                    </div>
                </div>
                <slot name="pictureCardElement" :row="fileList[index]" :index="index">
                    <!-- <div class="nb-upload-pictureCard-operate font-color-primary clearfix">
                        <div class="txt-center">{{scope.row.name}}</div>
                        <span class="fl" @click="editBannerInfo(scope,'链接')">链接</span>
                        <span class="fr" @click="editBannerInfo(scope,'描述')">描述</span>
                    </div>-->
                </slot>
            </div>
            <slot name="pictureCardItem"></slot>
            <div
                v-if="showUploadPlus&&fileList.length!==maxNum"
                :class="{'nb-upload-plus':true, 'el-icon-plus':true,'nb-upload-plus-small':uploadPlusSmall}"
            >
                <input
                    v-if="multiple"
                    type="file"
                    multiple
                    @change="getFile"
                    :accept="acceptFileType"
                />
                <input v-if="!multiple" type="file" @change="getFile" :accept="acceptFileType" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'shj-upload',
    components: {},
    props: {
        /* [表格组件-1] */
        uploadListType: {
            type: String,
            default: 'pictureCard',
            required: false
        },
        // 是否多选文件
        multiple: {
            type: Boolean,
            default: false,
            required: false
        },
        // 接受的文件类型
        acceptFileType: {
            type: String,
            default: '',
            required: false
        },
        //  是否显示-上传图标
        showUploadPlus: {
            type: Boolean,
            default: true,
            required: false
        },
        uploadPlusSmall: {
            type: Boolean,
            default: false,
            required: false
        },
        //  是否校验-图片尺寸
        validImgSizeMode: {
            type: String,
            default: '', // strict|advice|''
            required: false
        },
        //  是否校验-图片尺寸
        minNum: {
            default: 0,
            required: false
        },
        //  是否校验-图片尺寸
        maxNum: {
            default: '',
            required: false
        },
        imageSize: {
            default: () => ({
                minWidth: '560',
                minHeight: '670'
            }),
            required: false
        },
        // 列[基本]-参数配置
        fileList: {
            default: () => [
                // {
                //     name: file.name,
                //     src: file.src,
                //     filePath: res.filePath,
                //     file: file
                // }
            ],
            required: true
        }
    },
    data() {
        return {
            pictureCardHoverIndex: '' // 鼠标移至的图片索引
        };
    },
    computed: {},
    watch: {},
    // created() {},
    // mounted() {},
    methods: {
        // 方法-格式化-URL
        formatFileUrl(file) {
            if (file.image_uri) {
                let path = `${__GATEWAYPATH__}${file.image_uri}`;
                return path;
            } else if (file.imgPath) {
                let path = `${__GATEWAYPATH__}${file.imgPath}`;
                return path;
            } else if (file.filePath) {
                let path = `${__GATEWAYPATH__}${file.filePath}`;
                return path;
            } else {
                return file.src;
            }
        },

        // 文件上传-选取文件
        getFile() {
            let fileObj = event.target.files;
            if (this.fileList.length < 1) {
                if (this.minNum && fileObj.length < this.minNum) {
                    this.validMinNum(fileObj);
                    return false;
                } else if (this.maxNum && fileObj.length > this.maxNum) {
                    this.validMaxNum(fileObj);
                    return false;
                }
            } else if (this.maxNum && this.fileList.length + fileObj.length > this.maxNum) {
                this.validMaxNum(fileObj);
                return false;
            }

            for (let fileKey in fileObj) {
                if ({}.hasOwnProperty.call(fileObj, fileKey)) {
                    let file = fileObj[fileKey];
                    console.log('file>', file);
                    // 校验选择的文件
                    this.validFile(file, fileKey, fileObj);
                }
            }
        },

        // 文件上传-文件超出限制个数
        validMaxNum(files) {
            console.log('validMaxNum>', files);
            this.$message.warning(
                `当前限制选择  ${this.maxNum} 个文件,请重新选择`
            );
        },

        // 文件上传-校验最少数量
        validMinNum(files) {
            console.log('validMinNum>', files);
            this.$message.warning(
                `当前最少选择  ${this.minNum} 个文件,请重新选择`
            );
        },

        // 文件上传-校验选择的文件
        validFile(file, fileKey, fileObj) {
            let arr = [];
            arr = this.acceptFileType.split(',');
            // console.log(arr);
            let isAcceptType = true; // 校验文件类型
            if (this.acceptFileType) {
                isAcceptType = arr.indexOf(file.type) > -1; // 校验文件类型
            }
            let isLt2M = file.size / 1024 / 1024 < 200; // 校验文件大小
            if (!isAcceptType) {
                this.$message.error(`文件类型应为:"${this.acceptFileType}"`);
            } else if (!isLt2M) {
                this.$message.error('文件大小不能超过 1MB!');
            } else if (file.type.split('/')[0] === 'image') {
                let _this = this;
                let reader = new FileReader();
                // let fileNew = event.target.files[0];// 写在beforupload时注释掉此行,在handleChange中时取消此行的注释
                reader.readAsDataURL(file);
                reader.onload = function(theFile) {
                    let image = new Image();
                    image.src = theFile.target.result;
                    file.src = theFile.target.result;
                    image.onload = function() {
                        if (
                            !_this.computeImgSize(
                                this.width,
                                this.height,
                                _this
                            )
                        ) {
                            if (_this.validImgSizeMode === 'advice') {
                                _this.$message.info(
                                    `${file.name}尺寸为${this.width}*${this.height}，图片最佳比例为 ${_this.imageSize.minWidth} * ${_this.imageSize.minHeight} ！`
                                );
                                file.width = this.width;
                                file.height = this.height;
                                console.log(file.width, file.height);
                                _this.beforeUploadFile(file);
                            } else if (_this.validImgSizeMode === 'strict') {
                                _this.$message.error(
                                    `${file.name}尺寸为${this.width}*${this.height}，图片最佳比例为  ${_this.imageSize.minWidth} * ${_this.imageSize.minHeight}  ！`
                                );
                            } else {
                                _this.beforeUploadFile(file);
                            }
                        } else {
                            file.width = this.width;
                            file.height = this.height;
                            console.log(
                                'computeImgSize>',
                                file.width,
                                file.height
                            );
                            _this.beforeUploadFile(file);
                        }
                    };
                };
            } else {
                this.beforeUploadFile(file);
            }
        },

        // 文件上传-计算图片比例是否符合要求
        computeImgSize(width, height, _this) {
            let minWidth = _this.imageSize.minWidth;
            let minHeight = _this.imageSize.minHeight;
            let isCreativeSize = true;
            if (width * minHeight > height * minWidth) {
                isCreativeSize =
                    width - Math.ceil((height * minWidth) / minHeight) < 2;
            } else {
                isCreativeSize =
                    height - Math.ceil((width * minHeight) / minWidth) < 2;
            }

            if (width < minWidth || height < minHeight) {
                // this.$message.error(`像素不够`);
                return false;
            } else if (!isCreativeSize) {
                return false;
            } else {
                return true;
            }
        },

        // 文件上传-文件上传前
        beforeUploadFile(file) {
            console.log('beforeUploadFile>', file);
            // 子传父
            this.$emit('beforeUploadFile', file);
        }
    }
};
</script>
<style scoped lang='less'>
@imgWidth: 160px;
@imgHeight: 120px;
@cardHeight: @imgWidth;
.nb-upload {
    .nb-upload-pictureCard {
        vertical-align: top;
        width: @imgWidth;
        // height: @cardHeight;
        display: inline-block;
        // position: relative;
        &:not(:nth-child(7n + 0)) {
            margin-right: 20px;
        }
        margin-bottom: 20px;

        .nb-upload-pictureCard-img {
            background: @bg_from_view;
            position: relative;
            width: @imgWidth;
            height: @imgHeight;
            line-height: @imgHeight;
            display: block;
            overflow: hidden;

            img {
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                width: 100%;
                // height: @imgHeight;
            }
        }

        .nb-upload-pictureCard-hover {
            position: absolute;
            top: 0;
            left: 0;
            background: @bg_maskLayer_black5;
            width: @imgWidth;
            height: @imgHeight;
            line-height: @imgHeight;
            text-align: center;
            color: #fff;
            i {
                font-size: @font24px;
                cursor: pointer;
                &:not(:last-child) {
                    margin-right: 10px;
                }
                &:hover {
                    color: @color_primary;
                }
            }
        }

        .nb-upload-pictureCard-operate {
            border: @border_small solid @border_color_form;
            padding: 0 20px;
            height: calc(@cardHeight - @imgHeight);
            // line-height: 50px;
            span {
                cursor: pointer;
            }
        }
    }

    .nb-upload-plus {
        display: inline-block;
        border: @border_small dotted @border_color_form;
        width: @imgWidth;
        height: @cardHeight;
        line-height: @cardHeight;
        text-align: center;
        vertical-align: top;
        color: @text_color_black_8;
        font-size: 40px;
        position: relative;
        overflow: hidden;
        text-decoration: none;
        text-indent: 0;

        input {
            font-size: @font10px;
            cursor: pointer;
            width: @imgWidth;
            height: calc(@cardHeight + 18px);
            position: absolute;
            right: 0;
            bottom: 0;
            opacity: 0;
        }
    }
    .nb-upload-plus:hover {
        border: @border_small dotted @color_primary;
        color: @color_primary;
    }

    .nb-upload-plus-small {
        width: @imgWidth;
        height: @imgHeight;
        line-height: @imgHeight;

        input {
            height: calc(@imgHeight + 18px);
        }
    }
}
</style>
<style lang='less'>
</style>

