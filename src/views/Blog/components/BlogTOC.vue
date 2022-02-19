<template>
  <aside class="blogTOC-container">
    <div class="menu" v-show="toc">目录</div>
    <NavList :list="tocWithSelect" @select="handleSelect" />
  </aside>
</template>

<script>
import NavList from "./navList.vue";
import debounce from "@/util/debounce.js";
export default {
  components: {
    NavList,
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  // 动态控制activeAnchor
  props: {
    toc: {
      type: Array,
    },
  },
  computed: {
    tocWithSelect() {
      //在 toc列表数据中 添加选中的条件  深度优先遍历
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    getDoms() {
      //递归遍历数组 获得目录中对应在页面中的元素
      const doms = [];
      const addToDom = (toc) => {
        for (const item of toc) {
          doms.push(document.getElementById(item.anchor));
          if (item.children && item.children.length > 0) {
            addToDom(item.children);
          }
        }
      };
      addToDom(this.toc);
      return doms;
    },
  },
  created() {
    this.setSelectDebounce = debounce(this.setSelect, 50);
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    setSelect() {
      // 当滚动条滚动时 循环遍历监控doms元素的位置 符合条件就修改data中的activeAnchor的值
      // 使计算属性 响应式变化 重新计算、渲染、选中目录中的元素.
      // console.log(1);
      this.activeAnchor = "";
      const range = 200;
      for (const dom of this.getDoms) {
        if (!dom) {
          return;
        }
        const top = dom.getBoundingClientRect().top; //每次获得都是相对于视口左上角的位置
        if (top >= 0 && top <= range) {
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          return;
        } else {
          this.activeAnchor = dom.id;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blogTOC-container {
  .menu {
    font-size: 20px;
    text-align: center;
    padding: 10px 0;
  }
}
</style>