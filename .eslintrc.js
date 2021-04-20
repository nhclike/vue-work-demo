module.exports = {
  root: true,// 此项是用来告诉 eslint 找当前配置文件不能往父级查找
  env: {// 此项指定环境的全局变量,下面的配置指定为 node 环境
    node: true
  },
  'extends': [// 此项是用来配置 vue.js 风格,就是说代码的时候要规范的写
    // 'plugin:vue/essential',
    // '@vue/standard'
    'eslint-config-kordeta/vue',
  ],
  exclude:[
    '/public'
  ]
  globals: {// 使用 globals 指出你要使用的全局变量.将变量设置为 true 将允许变量被重写,或 false 将不允许被重写(只读)
    'axios': false,// 全局使用axios
    'videojs': false,
    '__PROJECTPATH__': false,
    '__API__': false,
    '__SHJ__': false,
    '__PROJECTNAME__':false,// 配置应用的基路径
  },
  rules: {// 规则配置
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    'standard/computed-property-even-spacing': [2, "either"],
  },
  // parserOptions: {
  //   parser: 'babel-eslint'
  // }
}
