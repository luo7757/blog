import getComponentRootDom from "./getComponentRootDom.js";
import Icon from '@/components/Icon/index.vue';
import styles from './showMessage.module.less';

/**
 * 弹出消息
 * @param {String} content 消息内容
 * @param {String} type 消息类型  info  error  success  warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中；如果不传，则显示到页面正中
 */

export default function(option = {}){
    let defaultOption = {
        content : '',
        type : 'success',
        duration : 2000,
        container : document.body,
        callBack : null
    }
    let options = Object.assign({}, defaultOption, option);

    if(options.container){
        if(getComputedStyle(options.container).position === 'static'){
            options.container.style.position = 'relative';
        }
    }
    
    const div = document.createElement('div');
    const icon = getComponentRootDom(Icon, {type : options.type});

    const dom = `<div>${icon.outerHTML}<span>${options.content}</span></div>`; 
    div.innerHTML = dom;
    div.className = `${styles.message} ${styles[`message-${options.type}`]}`;

    options.container.appendChild(div);

    getComputedStyle(div).left;


    // 坐标位置变化
    div.style.opacity = 1;
    div.style.transform = "translate(-50%, -50%)"

    setTimeout(()=>{
        div.style.opacity = 0;
        div.style.transform = "translate(-50%, -50%) translateY(-35px)";
        // 消失后删除元素
        div.addEventListener('transitionend', ()=>{
            div.remove();
            options.callBack && options.callBack();
            // 回调执行
        }, {once : true})
    }, options.duration);



}