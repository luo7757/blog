export default function throttle(fn, duration = 100){
    let timer = new Date().getTime();
    return (...args) => {
        if(new Date().getTime() - timer >= duration){
            timer = new Date().getTime();
            fn(...args);
        }
    }
}