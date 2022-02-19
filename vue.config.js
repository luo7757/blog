module.exports = {
  // 配置代理 请求这个接口转发代理位置
  // 这样一来 我们在源文件请求时不用带上协议、域名、端口，可以统一配置
  // 同时由于请求的时候如果不带协议、域名、端口，那么默认就是以当前的http位置准

  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
      },
      "/static": {
        target: "http://127.0.0.1:7001",
      },
    },
  },
  configureWebpack: require("./webpack.config"),
  // 使用外部配置 通过判断当前打包的环境 进行导入配置   在vue中使用打包命令时会注入一个环境类型的属性 可以通过这个来进行判断
};
