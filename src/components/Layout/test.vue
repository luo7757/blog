<template>
  <div class="test-container">
    <Layout>
      <template v-slot:left> <div>左边</div> </template>
      <template v-slot:main> <div>中间</div> </template>
      <template v-slot:right> <div>右边</div> </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./index.vue";
export default {
  components: {
    Layout,
  },
};
</script>

<style lang="less">
.test-container {
}
</style>