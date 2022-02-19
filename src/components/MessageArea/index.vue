<template>
  <div class="messageArea-container">
    <!-- <DataFrom @submit="handleSubmit" /> -->
    <!-- 上面的写法会要求注入一个方法来抛出接收的方法及参数，使用 v-on 可以传递多个事件 ，而$listeners 会获得这个组件上所有的监听事件，
    可以通过这个方法将事件监听指向这个组件的子元素 
    -->
    <DataFrom v-on="$listeners" />
    <h2>{{ title + subTitle }}</h2>
    <DataList :list="list" />
    <div class="loading" v-loading="isListLoading">
      <Empty v-show="empty && !isListLoading" text="没有啦"></Empty>
    </div>
  </div>
</template>

<script>
import DataFrom from "./DataFrom.vue";
import DataList from "./DataList.vue";
import Empty from "@/components/Empty";

export default {
  components: {
    DataFrom,
    DataList,
    Empty,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.loading {
  height: 100px;
  position: relative;
}
</style>