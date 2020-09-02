/* 组件-功能模块建设中 */
<template>
    <div class="full-width full-height building">
        <img src alt />
        <span>功能模块建设中</span>
    </div>
</template>

<script>
export default {
    name: 'Building'
};
</script>

<style scoped lang="less">
.building {
    font-size: @font24px;
    color: @color_info;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
        width: 180px;
        margin-bottom: 20px;
    }
}
</style>
