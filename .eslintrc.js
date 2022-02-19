module.exports = {
  root: true,//当前配置文件不能向上查找 
  env: {
    node: true, //指定环境的全局变量 ，下面的配置指定为node环境
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren' : 0,
    'semi' : 0,
  }
}
