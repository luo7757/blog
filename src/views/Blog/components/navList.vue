<template>
  <ul class="navList-container">
    <li
      v-for="item in list"
      :key="item.id"
      @click="handleClick(item)"
      :class="{ active: item.isSelect }"
    >
      <div class="item">
        <span>{{ item.name }}</span>
        <span v-if="item.aside" :class="{ active: item.isSelect }">{{
          item.aside
        }}</span>
      </div>

      <NavList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "NavList",
  props: ["list"],
  methods: {
    handleClick(item) {
      this.$emit("select", item);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.navList-container {
  width: 100%;
  text-align: left;
  padding-left: 15px;
  li {
    padding: 10px 0 10px 10px;
    color: @words;
    font-size: 16px;
    cursor: pointer;
    .item {
      &:hover {
        color: lighten(@warn, 20%);
        span {
          color: inherit;
        }
      }
    }

    span {
      margin-right: 15px;
      cursor: pointer;
      &:last-of-type {
        font-size: 14px;
        color: inherit;
      }
      &.active {
        color: @warn;
      }
    }
    &.active {
      color: @warn;
      span {
        color: inherit;
      }
    }
  }
}
</style>