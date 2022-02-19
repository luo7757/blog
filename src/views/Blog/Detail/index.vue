<template>
  <Layout>
    <template v-slot:main>
      <div class="blogDetail" v-loading="isLoading" ref="mainContainer">
        <BlogDetail v-if="data" :blogData="data" />

        <BlogComment v-if="!isLoading" class="blogComment"/>
      </div>
    </template>

    <template #right>
      <div class="blogTOC" v-loading="isLoading">
        <BlogTOC v-if="data.toc" :toc="data.toc" />
      </div>
    </template>
  </Layout>
</template>

<script>
import BlogDetail from "../components/BlogDetail.vue";
import BlogComment from "../components/BlogComment.vue";
import BlogTOC from "../components/BlogTOC.vue";
import Layout from "@/components/Layout";
import fetchData from "@/mixins/fetchData.js";
import { getBlog } from "@/api/blog.js";
import mainScroll from "@/mixins/mainScroll.js";
import titleContorller from "@/util/setRouterTitle.js";

export default {
  mixins: [fetchData({}), mainScroll("mainContainer")],
  components: {
    Layout,
    BlogTOC,
    BlogDetail,
    BlogComment,
  },
  methods: {
    async fetchData() {
      let data = await getBlog(this.$route.params.id);
      // console.log(data);
      titleContorller.setRouterTitle(data.title);
      return data;
    },
    // handleScroll() {
    //   this.$bus.$emit("mainScroll", this.$refs.mainContainer);
    // },
    // handleSetScroll(scrollTop) {
    //   //作为自己的处理函数
    //   this.$refs.mainContainer.scrollTop = scrollTop;
    // },
  },
  // 实现功能 ： 滚动条变化 修改目录的选中效果 需要在不同组件之间通信 使用事件总线来实现
  // 需要的功能 ： 修改目录的选中效果  监控目录对应的元素的位置(滚动条触发)
  // 独立于一个大组件的功能由最终的组件来控制 子组件不该有过多的功能，一个子组件应该就完成数据的渲染和传递即可.
  // mounted() {
  //   //真实dom
  //   this.$bus.$on("setMainScroll", this.handleSetScroll);
  //   // 控制滚动条

  //   // 在事件总线 setMainScroll中 添加一个事件，scrollTop的处理事件
  //   // 当使用 $emit 触发时，提供的参数会被收集起来  在对应事件集合先下的处理事件都会获得这个参数并执行
  //   // 那么在 setMainScroll 中注册的 $emit 事件中包含了一个 参数 0 ，

  //   // console.log("mounted执行");
  //   this.$refs.mainContainer.addEventListener("scroll", this.handleScroll); //监控触发滚动条处理事件
  // },
  // beforeDestroy() {
  //   //组件销毁
  //   // console.log("销毁执行");
  //   this.$bus.$emit("mainScroll");

  //   this.$bus.$off("setMainScroll", this.handleSetScroll);
  //   this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
  // },
  watch: {
    isLoading() {
      // console.log("数据变动up");
      //数据响应后 重新渲染
      const hash = location.hash;
      location.hash = "";
      setTimeout(() => {
        location.hash = hash;
      }, 50);
    },
  },
};
</script>

<style lang="less" scoped>
.blogDetail {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  scroll-behavior: smooth;
  position: relative;
}
.blogTOC {
  height: 100%;
  width: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
}
.blogComment{
  border-top: 1px solid #333;
  padding-top: 20px;
}
</style>