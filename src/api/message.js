import request from './request';

export async function getMessages(page = 1, limit = 10){
    return await request.get('/api/message', {
        params : {
            page,
            limit,
        }
    })
}
// 获取评论

export async function postMessage(msgInfo){
    return await request.post('/api/message', msgInfo);
}
// 提交评论
