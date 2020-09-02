/*
 * @Author: ShiHuiJun
 * @Date: 2020-04-09 11:20:26
 * @Last Modified by: ShiHuiJun
 * @Last Modified time: 2020-06-09 16:01:15
 */
<template>
  <div class="confirm-box">
    <div class="confirm-box-body">
      <div class="confirm-box-body_top">
        <p class="title">{{confirmObj.title}}</p>
        <i type="primary" class="el-icon-close icon" @click="close()"></i>
      </div>
      <div class="confirm-box-body_content">{{confirmObj.message}}</div>
      <div class="confirm-box-body_bottom">
        <div class="btn-group">
          <span
            v-for="(button,index) in confirmObj.buttonGroup"
            :key="index"
            :class="button.class"
            @click="button.func"
          >{{button.name}}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 使用方法 -->
  <!-- <Confirm v-if="confirmObj.show" :confirmObj="confirmObj" @close="confirmObj.show=false"></Confirm> -->
</template>
<script>
export default {
    props: {
        confirmObj: {
            default: () => ({
                show: false,
                title: '系统提示',
                message: '',
                buttonGroup: [
                    {
                        name: '取消',
                        class: 'grey',
                        func: () => {
                            alert('cancel');
                        }
                    },
                    {
                        name: '确定',
                        class: 'blue',
                        func: () => {
                            alert('submit');
                        }
                    }
                ]
            })
        }
    },
    data() {
        return {};
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style lang="less" scoped>
.confirm-box {
  height: 100%;
  width: 100%;
  background: @bg_maskLayer_black7;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1999;
  .confirm-box-body {
    background: #fff;
    width: 600px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .confirm-box-body_top {
      position: relative;
      font-size: @font24px;
      border-bottom: @border_middle solid @border_color;
      padding: 20px;
      .title {
        line-height: 30px;
        height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: @font20px;
      }
      .icon {
        position: absolute;
        right: 10px;
        top: 20px;
        cursor: pointer;
        font-size: 32px;
        &:hover {
          color: @color_primary;
        }
      }
    }
    .confirm-box-body_content {
      padding: 20px;
      font-size: @font20px;
    }
    .confirm-box-body_bottom {
      padding: 20px;
      text-align: right;
      .btn-group {
        height: @form_item_h;
        line-height: @form_item_h;
        display: inline-block;
        button,
        span {
          cursor: pointer;
          display: inline-block;
          text-align: center;
          padding: 0 30px;
          line-height: @form_item_h;
          color: @base_color_white;
          font-size: @font20px;
          border: none;
          &:not(:first-child) {
            margin-left: 20px;
          }
          &.blue {
            background: @color_primary;
            &:hover {
              opacity: 0.7;
            }
          }
          &.grey {
            color: @text_color_black;
            border: 1px solid @color_info;
            &:hover {
              background: rgb(233, 245, 255);
              color: @color_primary;
              opacity: 0.7;
            }
          }
        }
      }
    }
  }
}
</style>
