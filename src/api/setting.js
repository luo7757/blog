import request from './request.js';

export default async function getSetting(){
    return await request.get('/api/setting')
}