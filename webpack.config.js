const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

if(process.env.NODE_ENV === "production"){
    module.exports = {
        devtool : "none",
        plugins : [new BundleAnalyzerPlugin()],
        externals : {
            vue : "Vue",
            vuex : "Vuex",
            "vue-router" : "VueRouter",
            axios : "axios",
            // 组件基本都是打包后的
            // 这个配置使得webpack不对这些包进行打包  所有用到这个包的地方都会变成使用全局变量
            // 通过使用 CDN 加载后的包会变成全局变量

            // 在ｗｅｂｐａｃｋ中配置ｂｕｉｌｄ的命令加上－－ｍｏｄｅｒｎ　就可以生成２个包，一个是兼容后的包，一个是没有进行兼容的包
        },
    };
} else {
    module.exports = {};
};