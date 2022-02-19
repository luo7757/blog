import Vue from 'vue';
import App from './App.vue';

// import './mock/index.js';//数据拦截模拟

import router from './views/routes/index.js';//导入路由
import showMessage from './util/showMessage.js';//导入全局 提示

import './styles/global.less';//全局样式

Vue.prototype.$showMessage = showMessage;//所有组件都可以使用

import vLoading from './directives/loading.js';//全局注册 loading  自定义事件
Vue.directive('loading', vLoading);//事件触发自动添加loading效果

import vLazy from './directives/lazy.js';
Vue.directive('lazy', vLazy);//全局指令 注册 img 懒加载


import './util/eventBus';//注入事件总线


import store from './store/index.js';

store.dispatch('setting/fetchSetting');

// import setting from './api/setting.js';
// setting().then(r => console.log(r));

// blog.getBlogType().then(r => console.log(r));
// blog.getBlogs({page : 2, limit : 10, categoryid : 3}).then(r => console.log(r));
new Vue({
  store,
  router, 
  render: h => h(App),
}).$mount('#app')
