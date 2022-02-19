<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      required: false, // 非必填
      default: "无数据", // 默认值
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.empty-container {
  .self-center();
  color: @gray;
  .icon-container {
    font-size: 72px;
  }
  p {
    text-align: center;
  }
}
</style>




