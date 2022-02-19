<template>
  <div
    class="home-container"
    v-loading="loading"
    ref="container"
    @wheel="handleWheel"
    v-if="data"
  >
    <ul
      class="home-carousel"
      :style="{ marginTop }"
      @transitionend="handleTransitionEnd"
      ref="carousel"
    >
      <li class="home-carousel-item" v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />

        <!-- <CarouselItem :carousel="item" v-model="index" :curIndex="i" /> -->
      </li>
    </ul>
    <div
      class="icon-up icon"
      v-show="index >= 1"
      @click="movePageTo(index - 1)"
    >
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon-down icon"
      v-show="index < data.length - 1"
      @click="movePageTo(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        :class="{ active: i === index }"
        v-for="(item, i) in data"
        :key="item.id"
        @click="movePageTo(i)"
      ></li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
@import "~@/styles/var.less";

.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flow-root;
  &.resizeChange {
    transition: none;
  }
  .home-carousel {
    width: 100%;
    height: 100%;
    transition: margin-top 0.4s ease-in-out;
    li {
      height: 100%;
    }
  }
  .icon {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: @textHover;
    display: flex;
    align-items: center;
    justify-content: center;
    &.icon-down {
      bottom: 10px;
      animation: jump-down 2s steps(120) infinite;
    }
    &.icon-up {
      top: 10px;
      animation: jump-up 2s steps(120) infinite;
    }
  }
  @jumpHeight: 5px;

  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jumpHeight);
    }
    50% {
      transform: translate(-50%, -@jumpHeight);
    }
    100% {
      transform: translate(-50%, @jumpHeight);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jumpHeight);
    }
    50% {
      transform: translate(-50%, @jumpHeight);
    }
    100% {
      transform: translate(-50%, -@jumpHeight);
    }
  }
  .indicator {
    position: fixed;
    right: 15px;
    top: 50%;
    transform: translate(0, -50%);
    li {
      height: 5px;
      width: 5px;
      border-radius: 50%;
      margin-bottom: 5px;
      border: 1px solid @gray;
      cursor: pointer;
      &.active {
        background-color: @textHover;
        border: 1px solid @textHover;
      }
    }
  }
}
</style>

<script>
import Icon from "@/components/Icon";
import CarouselItem from "./CarouselItem.vue";
import { mapState } from "vuex"; //获得 仓库

export default {
  components: {
    CarouselItem,
    Icon,
  },
  data() {
    return {
      index: 0,
      containerHeight: 0,
      switching: true,
      resizeChangeTime: null,
    };
  },
  created() {
    this.time = setTimeout(() => {
      console.log("33333");
    }, 3000);
    (() => {
      console.log("111111");
      setTimeout(() => {
        console.log("222222");
      }, 0);
    })();
    this.$store.dispatch("banner/fetchBanner"); //使用dispatch分发banner中action ，fetchBanner获取数据
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;

    window.addEventListener("resize", this.resizeChange);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChange);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },
  methods: {
    movePageTo(i) {
      this.index = i;
    },
    handleWheel(e) {
      if (this.switching) {
        if (e.deltaY > 20 && this.index < this.data.length - 1) {
          this.index++;
          this.switching = false;
        } else if (e.deltaY < -20 && this.index > 0) {
          this.index--;
          this.switching = false;
        }
      }
      // console.log(this.index);
    },
    handleTransitionEnd() {
      this.switching = true;
    },
    resizeChange() {
      this.containerHeight = this.$refs.container.clientHeight;
      // console.log(this.$refs.container);
      this.$refs.carousel.classList.add("resizeChange");
      clearTimeout(this.resizeChangeTime);
      this.resizeChangeTime = setTimeout(() => {
        this.$refs.carousel.classList.remove("resizeChange");
      }, 300);
    },
  },
};
</script>
