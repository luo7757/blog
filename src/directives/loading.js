import loaderImg from '@/assets/loading.svg';
import styles from './loading.module.less';

function getLoadingImg(el){
    return el.querySelector(`img[data-role=loadingImg]`);
}

function createLoadingImg(){
    const img = document.createElement('img');
    img.src = loaderImg;
    img.dataset.role = 'loadingImg';
    img.className = styles.loading;
    return img;
}
export default function(el, bingding){
    const loadingImg = getLoadingImg(el);
    if(bingding.value){
        // 指定显示loading
        if(!loadingImg){
            // 没有创建
            const img = createLoadingImg();
            el.appendChild(img);
        }
    }else {
        // 有就删除
        if(loadingImg){
            loadingImg.remove();
        }
    }
}