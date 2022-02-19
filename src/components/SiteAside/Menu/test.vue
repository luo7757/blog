<template>
  <div class="test-contaienr">
    <Menu />
  </div>
</template>

<script>
import Menu from "./index.vue";
import "@/styles/global.less";

export default {
  components: {
    Menu,
  },
};
</script>

<style>
.test-contaienr {
  width: 200px;
  height: 400px;
  border: 2px solid red;
  background: #000;
  margin: 0 auto;
}
</style>