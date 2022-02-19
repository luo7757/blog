<template>
  <img
    :src="url"
    alt=""
    :style="{ width: `${size}px`, height: `${size}px` }"
    class="avatar-container"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true, // 指定这个属性必填
    },
    size: {
      type: Number,
      default: 150, //参数默认值 不写就使用这个值
    },
  },
};
</script>

<style scoped>
.avatar-container {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>