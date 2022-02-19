// banner组件的请求  导入axios 实例 使用实例方法来请求

import request from './request';

// 导出一个函数 这个函数会发送一个异步请求
export default async function getBanners(){
    // 处理get请求
    let data = await request.get('/api/banner')
    // return await request.get('api/banner');
    // console.log(data);
    return data;
}
