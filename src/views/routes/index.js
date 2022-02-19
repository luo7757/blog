 import Vue from 'vue';
import VueRouter from 'vue-router';
import titleController from '@/util/setRouterTitle.js';
import routes from './routeConfig';

// 创建路由 导出路由
if(!window.VueRouter){
    Vue.use(VueRouter); 
    // 使用 CDN 分布式后 会自动成为Vue的组件 这种方式就不行了 由于CDN引入会有一个全局变量　判断这个变量就可以了
}


const router = new VueRouter({
    routes,
    mode : 'history',
})

router.afterEach((to) => {
    if(to.meta.title){
        // console.log(to);
        // 控制页面状态栏内容
        titleController.setRouterTitle(to.meta.title);
    }
})

export default router;
