import eventBus from "@/util/eventBus";//导入事件总线 这个事件总线中就有相关的滚动条的监控
import debounce from '@/util/debounce.js';// 控制触发的次数 防抖函数
import defaultGif from '@/assets/default.gif';// 导入默认图片  不能在代码中直接使用绝对路径  打包后的路劲就不对了，使用导入即可解决.


// 

let imgs = [];
// 用于保存需要处理的img dom元素.


function setImage(img){
    img.dom.src = defaultGif;//一开始将获取到的图片设置为默认图片 由于缓存机制 后续相同图片加载会直接在缓存中拿 

    const clientHeight = document.documentElement.clientHeight;
    const rect = img.dom.getBoundingClientRect();
    const height = rect.height || 150;
    if(rect.top >= -height && rect.top <= clientHeight){
        img.dom.src = img.src;
        imgs = imgs.filter(i => i !== img);
    }
}

function setImages(){
    for (const img of imgs) {
        setImage(img);
    }
}

function handleScroll(){
    setImages();
}

eventBus.$on('mainScroll', debounce(handleScroll, 50));

export default {
    // 导出的指令钩子函数会被传入多个参数 
    /*
    el：指令所绑定的元素，可以用来直接操作 DOM。
    binding：一个对象，包含以下 property：
        name：指令名，不包括 v- 前缀。
        value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
        oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
        expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
        arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
        modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
    vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
    oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
    
    */ 

    inserted(el, bindings){
        const img = {
            dom : el,//指令绑定的元素 
            src : bindings.value,//value获得的就是指令后面写的值，会传递到value中，我们向value中传递了一个图片地址
        };
        imgs.push(img);
        setImage(img);//元素生成后 立即执行一次
    },
    unbind(el){
        imgs = imgs.filter(img => img.dom !== el);
    }
}