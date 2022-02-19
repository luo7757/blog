<template>
  <NavList :list="list" @select="handleSelect" />
</template>

<script>
import NavList from "./navList.vue";
import "@/styles/global.less";
export default {
  components: {
    NavList,
  },
  data() {
    return {
      list: [
        { name: "a", isSelect: false },
        { name: "b", isSelect: false },
        {
          name: "c",
          isSelect: true,
          children: [
            { name: "c-1", isSelect: false },
            {
              name: "c-2",
              isSelect: false,
              children: [
                { name: "c-2-1", isSelect: false },
                { name: "c-2-2", isSelect: false },
                { name: "c-2-3", isSelect: false },
                { name: "c-2-4", isSelect: false },
              ],
            },
            { name: "c-3", isSelect: false },
            { name: "c-4", isSelect: false },
          ],
        },
        { name: "d", isSelect: false },
      ],
    };
  },
  methods: {
    handleSelect(e) {
      console.log(e);
    },
  },
};
</script>

<style>
</style>