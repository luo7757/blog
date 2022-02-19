// blogType 组件的请求  导入axios 实例 使用实例方法来请求

import request from "./request";

// 导出一个函数 这个函数会发送一个异步请求
export async function getBlogCategories() {
  //博客类别获取
  // 处理get请求
  return await request.get("/api/blogtype");
}

export async function getBlogs(option) {
  //全部博客获取
  let options = {
    page: 1,
    limit: 10,
    categoryid: -1,
    keyword: "",
  };
  const params = Object.assign({}, options, option);
  return await request.get("/api/blog", params);
  //   return await request.get("http://mock.duyiedu.com/mock/76/api/blog", params);
}

export async function getBlog(id) {
  //获取单个博客详情页
  return await request.get(`/api/blog/${id}`);
}
export async function postComment(commentInfo) {
  //提交评论
  return await request.post("/api/comment", commentInfo);
}

export async function getComments(option) {
  //获取评论
  let options = {
    //默认参数
    page: 1,
    limit: 10,
    blogId: "",
  };
  let params = Object.assign({}, options, option);
  if (!params.blogId) {
    throw "There is no blogid attribute";
  }
  return await request.get("/api/comment", { params });
}
