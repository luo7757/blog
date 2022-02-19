<template>
  <div
    class="carouselItem-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter"
  >
    <div class="carousel-img" ref="inner" :style="getPosition">
      <ImageLoader
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
        @load="handleImgLoad"
      />
    </div>
    <div class="title">
      <h2 ref="title">{{ carousel.title }}</h2>
      <h3 ref="description">{{ carousel.description }}</h3>
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  components: {
    ImageLoader,
  },
  // model: {
  //   prop: "index",
  //   event: "wheel",
  // },
  props: {
    carousel: {
      type: Object,
    },
    // curIndex: {
    //   type: Number,
    //   required: true,
    // },
    // index: {
    //   type: Number,
    //   required: true,
    // },
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, //父级容器的尺寸 需要的生成真实DOM后获取
      innerSize: null, //子级尺寸
      mouseX: null, //鼠标坐标
      mouseY: null,
    };
  },
  //   计算出两个盒子的大小差距  用差距 / 小盒子大小 得出一个比列 ，
  // 即鼠标在小盒子内移动一个整个距离对应移动大盒子 与小盒子的差距距离
  // 需要参数  差距与盒子的比例 鼠标的坐标X,Y
  // 先获得两个盒子的坐标 需要在生成真实dom后
  methods: {
    getSize() {
      this.containerSize = {
        height: this.$refs.container.clientHeight,
        width: this.$refs.container.clientWidth,
      };
      this.innerSize = {
        height: this.$refs.inner.clientHeight,
        width: this.$refs.inner.clientWidth,
      };
    },

    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },

    handleMouseLeave() {
      // 鼠标移出回归原位 居中
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;

      // this.changeTransitionClass();
    },

    handleMouseEnter() {
      // this.changeTransitionClass();
    },

    // changeTransitionClass() {
    //   this.$refs.inner.classList.add("transitions");
    //   this.$refs.inner.addEventListener(
    //     "transitionend",
    //     () => {
    //       this.$refs.inner.classList.remove("transitions");
    //     },
    //     { once: true }
    //   );
    // },
    handleImgLoad() {
      if (this.index === this.curIndex) {
        this.$refs.title.style.opacity = 1;
        this.$refs.title.style.width = 0;
        // 强制让浏览器渲染一次
        this.$refs.title.clientWidth; // reflow
        this.$refs.title.style.transition = "1s linear";
        this.$refs.title.style.width = this.titleWidth + "px";

        // 描述也是一样
        this.$refs.description.style.opacity = 1;
        this.$refs.description.style.width = 0;
        // 强制让浏览器渲染一次
        this.$refs.description.clientWidth; // reflow
        this.$refs.description.style.transition = "2s 1s linear";
        this.$refs.description.style.width = this.descWidth + "px";
        this.$emit("loader");
      } else {
        this.$refs.title.style = "";
        this.$refs.title.style = "";
      }
    },
  },
  computed: {
    getPosition() {
      if (!this.containerSize || !this.innerSize) {
        return;
      }
      const differenceWidth = this.innerSize.width - this.containerSize.width;
      const differenceHeight =
        this.innerSize.height - this.containerSize.height;
      //获得大小盒子的差值

      // 多出来的差值 除以 小盒子 得出鼠标移动一个整个小盒子距离，就移动大盒子一个差值距离
      const left = (-differenceWidth / this.containerSize.width) * this.mouseX;
      const top = (-differenceHeight / this.containerSize.height) * this.mouseY;

      // 返回一个样式表 作用：style 绑定样式
      // return {
      //   left: `${left}px`,
      //   top: `${top}px`,
      // };
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    center() {
      // 默认居中 图片的坐标依靠于鼠标位置 在没有进入之前和移出后 img样式应该居中
      // 居中就是鼠标移动了 container盒子的大小 / 2
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    this.getSize();
    // 初始化 居中 鼠标位置设置为处于container中间  那么img就会居中
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;

    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.description.clientWidth;

    window.addEventListener("resize", this.getSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.getSize);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.carouselItem-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .carousel-img {
    position: absolute;
    width: 110%;
    height: 110%;
    left: 0;
    top: 0;
    transition: 0.2s;
  }
  // .transitions {
  //   transition: 0.2s;
  // }
  .title {
    // display: flex;
    // flex-direction: column;
    padding-left: 20px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    h2,
    h3 {
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
        0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
      white-space: nowrap;
      overflow: hidden;
      opacity: 0;
      transition: width 1s;
    }
    h2 {
      margin-bottom: 15px;
      color: lighten(@gray, 10%);
    }

    h3 {
      color: darken(@gray, 20%);
      font-size: 15px;
    }
  }
}
</style>