<template>
  <div class="test-container">
    <Layout>
      <template v-slot:left><SiteAside /> </template>
      <template v-slot:main><RouterView /> </template>
      <!-- <template v-slot:right>
        <div class="test" ref="test">
          <button @click="handleChilk">点击触发</button>
        </div>
      </template> -->
    </Layout>
    <MainScrollTop />
  </div>
</template>

<script>
import "@/styles/global.less";
import MainScrollTop from "@/components/MainScrollTop";
import Layout from "@/components/Layout/index";
import SiteAside from "@/components/SiteAside/index";

export default {
  components: {
    Layout,
    SiteAside,
    MainScrollTop,
  },
  methods: {
    // handleChilk() {
    //   this.$showMessage({
    //     type: "success",
    //     callBack: () => {
    //       console.log("回调执行");
    //     },
    //     container: this.$refs.test,
    //     content: "发送成功",
    //   });
    // },
  },
};
</script>

<style lang="less">
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";

.test-container {
  width: 100%;
  height: 100%;
  // .test {
  //   width: 300px;
  //   height: 600px;
  //   margin: 0 auto;
  // }
}
</style>