<template>
  <Pager
    :total="total"
    :current="current"
    @pageChange="handlePageChange($event)"
  />
</template>

<script>
import Pager from "./index";
export default {
  components: {
    Pager,
  },
  data() {
    return {
      current: 1,
      total: 302,
    };
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
      console.log(newPage);
    },
  },
};
</script>
<style lang="less">
@import "~@/styles/global.less";
</style>