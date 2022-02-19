<template>
  <div
    v-show="show"
    class="mainScrollTop-container"
    @click="handleMainScrollTop"
  >
    Top
  </div>
</template>

<script>
// 点击后 通过事件总线 注入事件， 由父级控制后续操作  父级通过事件总线可以调用
// 这个组件被点击时 触发一个事件  这个事件就是修改scroll的值，可以有参数
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleScroll(dom) {
      // 滚动条滚动显示Top组件  依赖于父级的滚动事件
      if (!dom) {
        this.show = false;
        // console.log("xioahui");
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
    handleMainScrollTop() {
      // 点击滚动条回到最上面
      // 点击抛出事件，不推荐使用dom方式 ，这样就是一个组件控制了另一个不相关组件的dom， 应该交由组件自己处理
      //  所有使用事件总线 并当事件触发时， setMainScroll下的函数都会执行，获得参数 0.
      this.$bus.$emit("setMainScroll", 0); // 点击触发这个事件 这个setMainScroll中的事件全部触发 参数就是 0
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
    // 添加事件至滚动条监控事件中  滚动发生时就会触发
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.mainScrollTop-container {
  position: fixed;
  background-color: @primary;
  color: @textHover;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  line-height: 50px;
  text-align: center;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  opacity: 0.7;
}
</style>