/* 组件-缺省页模板 */
<template>
    <div class="default" :class="'default'+defaultType">
        <h2>{{defaultTitle}}</h2>
        <p>{{defaultTip}}</p>
        <a href="javascript:" @click="defaultCallback">{{btnText}}</a>
    </div>
</template>

<script>
export default {
    name: 'by-default-page',
    props: {
        // 缺省页-背景
        defaultType: {
            type: Number,
            default: 1
        },
        // 缺省页-标题
        defaultTitle: {
            type: String,
            default: ''
        },
        // 缺省页-提示
        defaultTip: {
            type: String,
            default: ''
        },
        // 缺省页-按钮文字
        btnText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        };
    },
    methods: {
        defaultCallback() {
            this.$emit('defaultCallback');
        }
    }
};
</script>

<style scoped lang='less'>
.default{
    width:320px;
    padding-top: 255px;
    margin:0 auto;
    h2{
        color:@font-color-grey-1;
        font-size: @font20px;
        text-align: center;
    }
    p{
        color:@font-color-grey-1;
        font-size: @font14px;
        text-align: center;
        margin:12px 0;
    }
    a{
        display: block;
        width:120px;
        height:40px;
        font-size: @font14px;
        color:#fff;
        background: @color_primary;
        border-radius: @border_radius_middle;
        line-height: 40px;
        text-align: center;
        margin:0 auto;
    }
}
//.default1{
    // background: url(../../assets/no-auth.png) no-repeat top center ;
//}
//.default2{
    // background: url(../../assets/404.png) no-repeat top center;
//}
//.default3{
    // background: url(../../assets/no-msg.png) no-repeat top center;
//}
//.default4{
    // background: url(../../assets/no-role.png) no-repeat top center;
//}
</style>
