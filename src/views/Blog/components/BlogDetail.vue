<template>
  <div class="blogDetail-container" v-if="blogData">
    <header class="blog-header">
      <hgroup class="title" v-if="blogData.category">
        <h1>{{ blogData.title }}</h1>
        <span>日期 : {{ dateConversion(blogData.createDate) }}</span>
        <span>浏览 : {{ blogData.scanNumber }}</span>
        <a href="#messageArea-container"
          >评论 : {{ blogData.commentNumber }}
        </a>
        <RouterLink
          :to="{
            name: 'CategoryBlog',
            params: {
              categoryId: blogData.category.id,
            },
          }"
          >分类 : {{ blogData.category.name }}</RouterLink
        >
      </hgroup>
    </header>
    <main class="blog-main">
      <div class="markdown-body" v-html="blogData.htmlContent"></div>
    </main>
  </div>
</template>

<script>
import dateConversion from "@/components/js/dateConversion.js";
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";

export default {
  props: {
    blogData: {
      type: Object,
    },
  },
  methods: {
    dateConversion,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blogDetail-container {
  width: 100%;
  .blog-header {
    margin: 20px 0;
    span,
    a {
      margin-right: 15px;
      font-size: 12px;
      color: @gray;
    }
  }
}
.markdown-body {
  margin: 2em 0;
}
</style>