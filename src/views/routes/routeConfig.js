// import About from '@/views/About';
// import Home from '@/views/Home';
// import Blog from '@/views/Blog';
// import Message from '@/views/Message';
// import Project from '@/views/Project';
// import BlogDetail from "@/views/Blog/Detail";
// 配置路由 匹配文件
// 上面这种写法会导致页面回一次性加载全部页面  一个promise函数  这个函数会在路由匹配后执行  那么就会执行这个函数  

// 使用下面的动态导入 即可解决这个问题  按需加载

const config = [
  {name : "Home", path : '/', component : () => import(/* webpackChunkName: "Home" */ "@/views/Home"), meta : {
    title : "首页"
  }},
  {name : "About", path : '/About', component : () => import(/* webpackChunkName: "About" */ "@/views/About"), meta : {
    title : "关于我"
  }},
  {name : "Blog", path : '/article', component : () => import(/* webpackChunkName: "Blog" */ "@/views/Blog"), meta : {
    title : "文章"
  }},
  {name : "CategoryBlog", path : "/article/cate/:categoryId", component : () => import(/* webpackChunkName: "Blog" */ "@/views/Blog"), meta : {
    title : "文章"
  }},
  {name : "BlogDetail", path : "/article/:id", component : () => import(/* webpackChunkName: "BlogDetail" */ "@/views/Blog/Detail"), meta : {
    title : "文章详情"
  }},
  {name : "Message", path : '/Message', component : () => import(/* webpackChunkName: "Message" */ "@/views/Message"), meta : {
    title : "留言板"
  }},
  {name : "Project", path : '/Project', component : () => import(/* webpackChunkName: "Project" */ "@/views/Project"), meta : {
    title : "项目&效果"
  }}  
]

export default config;