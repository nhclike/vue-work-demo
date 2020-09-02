# views 文件夹

## 1 文件夹命名方式

### 1.1 一级目录

- 代表`模块`的名字
- 尽量由`名词`组成
- 单词`只有一个`
- `文件夹`名字以`小写字母`开头,`.vue文件`名字以`大写字母`开头
- `只有一个文件时`不出现文件夹，直接放在 `views` 下面,为***.vue文件

如 `main` | `login` | `common`,`Main.vue` | `Login.vue` | `Common.vue`

### 1.2 二级目录

- 代表着一级目录中`某一大模块`的名字
- 尽量由`名词`组成
- 名字至少`两个单词`
- `文件夹`名字以`小写字母`开头,`.vue文件`名字以`大写字母`开头
- `只有一个文件时`不出现文件夹，直接放在 `一级目录` 下面,为***.vue文件

常用结尾单词有 `Detail` | `Edit` | `List` | `Info` | `Report`,如 `SolutionList`

以 `Item` 结尾的代表着组件,如 `SolutionItem`

## 2 method 自定义方法命名

- 动宾短语 `toPage` | `editSoloutionInfo`
- `ajax` | `axios方法`:以 `get` | `post` 开头,以 `data` 结尾如,`getListData` `postFormData`
- 事件方法:以 `on` 开头(`init` `refresh` 单词除外),如 `onTypeChange` `onUsernameInput`
- 尽量使用`常用单词`开头如, `set` | `get` | `open` | `close` | `jump`
- 驼峰命名 getListData

## 3 data props 方法注意点

- 使用 `data` 里的变量时请先在 `data` 里面初始化
- `props` 指定类型,也就是 `type`
- `props` 改变父组件数据,基础类型用 `$emit` ,复杂类型直接改
- `ajax` 请求数据用上 `isLoading` `isError` 变量
- 不命名多余数据,比如现在是详情页 你的数据是 `ajax` 请求的,那就直接声明一个对象叫 d，而不是每个字段都声明
- 表单数据请包裹一层 `form`

## 4 生命周期方法注意点

- 不在 `mounted` | `created` 之类的方法写逻辑,取 `ajax` 数据
- 在 `created` 里面监听 Bus 事件