// 做一个 请求拦截集合 所有的请求都由这个文件提供接口 此为mock处理
import './banner.js';
import './blog.js';
import './setting.js';
import './about.js';
import './project.js';
import './message.js';

import Mock from 'mockjs';

// 设置数据返回时间延迟
Mock.setup({
    timeout : "300-600"
})