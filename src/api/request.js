import axios from 'axios';
// import showMessage from '../util/showMessage';

// 创建一个 axios 实例 这个实例的Interceptors（拦截）方法可以拦截 响应体或请求体，
// 这里我们只需要拦截 响应体 对响应体做处理  
// 而请求体 由于在开发环境中时，后端没有提供端口api时，使用mock 拦截可以，有了后端api直接请求就可以

const ins = axios.create();
ins.interceptors.response.use(resp => {
    // 判断响应体的成功与否 做出对应处理
    if(resp.data.code !== 0){
        // showMessage({
        //     content : resp.data.msg,
        //     type : "error",
        // })
        return null;
    }else{
        // showMessage({
        //     content : "请求成功",
        //     type : "success",
    
        // })
    }
    return resp.data.data;
})

export default ins;