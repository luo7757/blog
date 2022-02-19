<template>
  <div class="blogList-container" v-loading="isLoading">
    <h2 class="tatol" v-if="!isLoading">文章分类</h2>
    <NavList :list="list" @select="handleSelect" v-if="!isLoading" />
  </div>
</template>

<script>
// 博客分类  需要一个data数据  点击改变路由
import fetchData from "@/mixins/fetchData.js";
import NavList from "./navList.vue";
//使用组件 实现渲染列表 这个组件是一个递归组件 多层分类也可以处理
import { getBlogCategories } from "@/api/blog.js";

export default {
  // 混合中书写了 created 和 this.data;
  mixins: [fetchData([])],
  components: {
    NavList,
  },
  computed: {
    list() {
      // 修改获得 data数据 加上一条 全部数据  同时遍历添加active 类名选中的条件
      // 这个条件 由$route 中的 categoryId 决定
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );

      const result = [
        { name: "全部", id: -1, articleCount: totalArticleCount },
        ...this.data,
      ];

      return result.map((item) => ({
        ...item,
        isSelect: this.categoryId === item.id,
        aside: `${item.articleCount}篇`,
      }));
    },
    categoryId() {
      return +this.$route.params.categoryId || -1; //获得当前的 分类 id
    },
    limit() {
      return +this.$route.query.limit || 10; //获得当前的 页码数，切换后显示也是这个数
    },
  },
  methods: {
    //   调用混合方法  得到的数据保存到this.data中 混合中有created 和 this.data
    async fetchData() {
      return await getBlogCategories();
    },
    handleSelect(item) {
      //点击切换  获得当前的分类id 修改$router 实现响应式 重新加载数据 渲染
      //   console.log(item.id);
      const query = {
        //默认切换的属性  page limit
        page: 1,
        limit: this.limit,
      };

      if (item.id === -1) {
        // 代表选中全部
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        // 改变$router 显示响应式 watch的监听由List组件完成,
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blogList-container {
  width: 180px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  .tatol {
    font-size: 18px;
    text-align: center;
    padding: 20px 0;
  }
}
</style>