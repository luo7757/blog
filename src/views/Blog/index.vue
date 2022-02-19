<template>
  <Layout>
    <template v-slot:main>
      <BlogList />
    </template>
    <div>
    </div>
    <template #right>
      <BlogCetagory />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout/index.vue";
import BlogList from "@/views/Blog/components/BlogList.vue";
import BlogCetagory from "@/views/Blog/components/BlogCategory.vue";

export default {
  components: {
    Layout,
    BlogList,
    BlogCetagory,
  },
};
</script>

<style lang="less" scoped>
.comment{
  border-top: 11px dashed #333;
}
</style>