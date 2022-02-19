<template>
  <div class="about-container" v-loading="!srcLoaded || loading">
    <!-- 使用一个参数srcLoading 使页面数据加载完成 再显示出来 -->
    <iframe
      :src="src"
      frameborder="0"
      @load="srcLoaded = true"
      class="about-content"
      v-if="src"
    ></iframe>
  </div>
</template>

<script>
// 思路
// 使用 仓库保存 获得地址属性 就不会多次去发送请求 请求这个地址  减少每次切换时的请求次数
// 使用 dispatch分发action 请求数据
// 使用 一个属性来记录页面加载的状态
import { mapState } from "vuex";

export default {
  data() {
    return {
      srcLoaded: false,
    };
  },
  computed: mapState("about", {
    src: "data",
    loading: "loading",
  }),
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
};
</script>

<style lang="less" scoped>
.about-container {
  height: 100%;
  width: 100%;
  .about-content {
    height: 100%;
    width: 100%;
  }
}
</style>