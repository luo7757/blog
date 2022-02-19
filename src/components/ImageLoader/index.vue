<template>
  <div class="imageLoader-container">
    <img :src="placeholder" class="placeholder" v-if="!allDone" />
    <img
      :src="src"
      class="origin"
      @load="originLoader"
      :style="{ opacity: originOpacity, transition: `opacity ${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      requried: true,
    },
    duration: {
      type: Number,
      required: false,
      default: 500,
    },
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  data() {
    return {
      originLoaded: false,
      allDone: false,
    };
  },
  methods: {
    originLoader() {
      this.originLoaded = true;
      setTimeout(() => {
        this.allDone = true;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";

.imageLoader-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: @gray;
  overflow: hidden;
  .origin {
    opacity: 0;
  }

  .placeholder {
    filter: blur(2vw);
  }

  img {
    .self-fill();
    object-fit: cover;
  }
}
</style>