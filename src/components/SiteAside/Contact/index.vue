<template>
  <a class="contact-item" :href="href" :target="href ? '_Blank' : undefined">
    <Icon :type="iconType" />
    <span>{{ text }}</span>
    <div class="contact-item-code" v-if="!!hoverCode">
      <img :src="hoverCode" />
    </div>
  </a>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  components: {
    Icon,
  },
  props: {
    href: {
      type: String,
      required: false,
      default: undefined,
    },
    text: {
      type: String,
      // required: true,
    },
    iconType: {
      type: String,
      required: true,
    },
    hoverCode: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="less">
@import "~@/styles/var.less";
.contact-item {
  color: @lightWords;
  position: relative;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  &:hover {
    color: @primary;
    .contact-item-code {
      transform: translate(0, -100%) scale(1);
    }
  }
  i {
    margin-right: 15px;
  }
  span {
    font-size: 12px;
  }

  .contact-item-code {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    transition: inherit;
    transform: translate(0, -100%) scale(0);
    transform-origin: center bottom;
    &::before {
      content: "";
      width: 6px;
      height: 6px;
      background-color: #fff;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%) rotate(45deg);
      position: absolute;
    }
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
