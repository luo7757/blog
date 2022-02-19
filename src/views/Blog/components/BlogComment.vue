<template>
  <MessageArea
    :list="data.row"
    title="评论列表"
    :subTitle="`(${data.total})`"
    :isListLoading="isLoading"
    @submit="handleSubmit"
    :empty="isEmpty"
  />
</template>

<script>
// 博客评论组件 控制内部的参数
// 由评论列表组件、评论form表单组成,
// 通过$route中的 blogId 发送请求 请求对应博客下的评论 传递评论列表参数 使用组件渲染
// 添加form评论组件， 获取表单中的值 ，这个组件本身不具有处理该事件的能力，
// 从设计来说也该由使用该组件的父组件来处理，所以使用$emit方式传递获得的表单提交的值
// 同时由于可能是多层嵌套关系 ，每层组件都有自己的事件传递给上层父级，那么如果使用$emit传递就会变得冗余

// 子组件使用 $listeners 即可获得父级传递的所有事件 一级一级传递下去.
// $listeners详解 ：当子组件抛出一些事件给多层父级后，这些父级都需要在注入一个属性来接收这个事件 然后再传递出去，那么我们使用$listeners 直接获得父级向下传递的事件，就不需要在自己注入一个属性来接收， 直接向下传递

// 同时如果传递事件的子级需要父级在处理完事件之后，通知子组件，子组件再通过获得的结果来进行对应的后续处理
// 那么就需要一个父子之间的通信了，有是三种方式来进行同行，
// 一种是使用 $emit 子级传递一个回调函数，这个函数里面就包括了父级处理完后的子级对应的处理方式
// 一种是使用 props 注册属性 来进行数据的传递
// 一种就是使用 $listener 来传递
import MessageArea from "@/components/MessageArea";
import { getComments, postComment } from "@/api/blog.js";
import fetchData from "@/mixins/fetchData.js";

export default {
  mixins: [fetchData({ total: 0, row: [] })],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    hasMore() {
      // console.log(this.data.rows)
      if(this.data.rows){
        return this.data.rows.length < this.data.total;
      }
      return true;
    },
    isEmpty() {
      return !this.hasMore;
    },
  },
  methods: {
    async fetchData() {
      const data = await getComments({
        blogId: this.$route.params.id,
        page: this.page,
        limit: this.limit,
      });
      // console.log(data);
      return data;
    },
    async handleSubmit(formData, callBack) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      this.data.row.unshift(resp);
      this.data.total++;
      callBack("评论成功");
    },
    async fetchMore() {
      // console.log("执行");
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      // console.log("isLoading");
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.row = this.data.row.concat(resp.row);
      this.isLoading = false;
    },
    handleScroll(dom) {
      // 这个组件是和blogDetail同时存在，在blogDetail中注册了滚动事件，$emit = mainScroll， 它的dom参数就是包裹住两个组件的父级。
      // 需要的滚动条参数 就在父级上，
      // console.log(dom);
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100;
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      // console.log(dec);
      if (dec <= range) {
        this.fetchMore();
      }
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  }
};
</script>

<style lang="less" scoped>
</style>