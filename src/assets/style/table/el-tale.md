# 公共列表样式使用说明

> 本样式主要涵盖以下几种列表页面

- 嵌入列表
- 弹窗列表


## 嵌入列表

即页面中需要使用表单的地方,支持头部,内容区,底部,最外层加上样式相应位置加上,如弹窗表单的使用

`class="table-top"`

`class="form-top"`

`class="form-bottom"`

## 列表查询表单

与列表页查询区相对应,使用时最外层加上`class="form-body inquire"`

```html
<div class="form-body inquire">
  <div class="label-justify">
    <el-form
      :model="inquireForm"
      :label-position="'left'"
      label-width="1rem"
      status-icon
    >
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="所属法院" class>
            <tree-select
              :placeholder="'请选择所属法院'"
              :treeSelectOptions="treeSelectOptions"
              @treeSelectChange="treeSelectChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</div>
```

## 弹窗表单

```html
<template>
  <div class="alert-box-body">
    <!-- 头部 -->
    <div class="form-top">
      <p v-if="operateBtnName==='add'" class="form-title">新增议题</p>
      <p v-if="operateBtnName==='edit'" class="form-title">修改议题</p>
      <p v-if="operateBtnName==='view'" class="form-title">查看议题</p>
      <i
        type="primary"
        class="el-icon-close form-top-icon"
        @click="close()"
      ></i>
    </div>
    <!-- 内容 -->
    <div class="form-body">
      <el-form
        :label-position="'left'"
        :model="ruleForm"
        label-width="1.3rem"
        status-icon
        :rules="operateBtnName!=='view'?rules:viewRules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="材料" prop="material">
          <div class="form-view" v-if="operateBtnName==='view'">
            {{ruleForm.material}}
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 底部 -->
    <div class="form-bottom" v-if="operateBtnName!=='view'">
      <span @click="submit('ruleForm')">确定</span>
      <span class="cancel" @click="close()">取消</span>
    </div>
  </div>
</template>
```
