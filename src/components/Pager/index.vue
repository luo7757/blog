<template>
  <div class="pager-container">
    <a :class="{ disabled: current === 1 }" @click="handleClick(1)"
      >|&lt;&lt;</a
    >
    <a :class="{ disabled: current === 1 }" @click="handleClick(current - 1)"
      >&lt;&lt;</a
    >
    <a
      v-for="(n, i) in numbers"
      :key="i"
      @click="handleClick(n)"
      :class="{ active: n === current }"
      >{{ n }}</a
    >
    <!-- <div v-for="(n, i) in 'string'" :key="i">{{ n }}</div> -->
    <a
      :class="{ disabled: current === pageNumber }"
      @click="handleClick(current + 1)"
      >&gt;&gt;</a
    >
    <a
      :class="{ disabled: current === pageNumber }"
      @click="handleClick(pageNumber)"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      //当前页码
      type: Number,
      default: 1, //默认值
    },
    total: {
      //总数据量
      type: Number,
      default: 0,
    },
    limit: {
      //页容量
      type: Number,
      default: 10,
    },
    visibleNumber: {
      //可见页码数
      type: Number,
      default: 10,
    },
  },
  computed: {
    pageNumber() {
      //总页数
      return Math.ceil(this.total / this.limit);
    },
    visibleMin() {
      //获得最小页码数   当前页数减去 显示的总页数的 一半 总30页 当前第8页 显示10页 最小页 8- 10/2
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min <= 1) {
        //边界判定
        min = 1;
      }
      return min;
    },
    visibleMax() {
      // 获得最大页码数  求得最小页码数后， 直接加上最大显示页码数 -1 就可以了
      let max = this.visibleMin + this.visibleNumber - 1;
      if (max >= this.pageNumber) {
        //边界判定
        max = this.pageNumber;
      }
      return max;
    },
    numbers() {
      //计算出从最小页到最大页 的页数
      let nums = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }
      return nums;
    },
  },
  methods: {
    handleClick(newPage) {
      if (newPage <= 1) {
        newPage = 1;
      }
      if (newPage >= this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage === this.current) {
        return;
      }
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less">
@import "~@/styles/var.less";

.pager-container {
  display: flex;
  justify-content: center;
  align-content: center;
  a {
    padding: 0 5px;
    color: @primary;
    cursor: pointer;
    user-select: none;

    &.active {
      color: @words;
      cursor: text;
    }
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
  }
  div {
    padding: 0 5px;
  }
}
</style>