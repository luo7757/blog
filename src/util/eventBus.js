// const listeners = [];

// 事件总线
// 一个可以脱离组件、甚至脱离Vue  独立存在 可以监控任何事件的一种处理方式
// 使用提供方法 $on 添加监控对象 需要的参数就是 事件本身 和 处理函数
// $off 取消监控
// $emit 事件触发后 就会以此执行某个事件下 所有拥有的所有事件 ，将传递的参数 进行分发
// 这样一来 不同组件 甚至不同Vue 之间就可以通信、监控，及其灵活
// 而在vue中也提供了 事件总线的实现 直接new 一个Vue 并导出即可，其内部就有On、off、emit方法

// export default {
//     $on(event, handle){
//         if(!listeners[event]){
//             listeners[event] = new Set(handle);
//         }
//         listeners[event].add(handle);
//     },
//     $off(event, handle){
//         if(!listeners[event]){
//             return;
//         }
//         listeners[event].delate(handle);
//     },
//     $emit(event, ...args){
//         if(!listeners[event]){
//             return;
//         }
//         for (const handle in listeners[event]) {
//                handle(...args);
//         }
//     }
// }


// 可以直接作为Vue原型上的方法 这样就不用在每个使用的组件中引入 直接在main中引入一次即可 
import Vue from 'vue';
// export default new Vue({});
let app = new Vue({});
Vue.prototype.$bus = app;

export default app;
