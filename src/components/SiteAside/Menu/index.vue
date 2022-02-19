<template>
  <nav class="menu-container">
    <RouterLink
      :exact="item.exact"
      v-for="item in items"
      :to="{ name: item.name }"
      :key="item.link"
      active-class="selected"
      exact-active-class=""
    >
      <div class="menu-icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </nav>
</template>
<!--
  这中a标签使用history来进行无刷新跳转的话，默认还是会进行刷新 
  如果通过history.PushSate来切换地址，页面是不会刷新了，
  但这种方式Vue监控不到，就不会进行重新加载组件

  vue-router提供了一个全局组件 RouterLink 这个组件就是一个改造后的a标签，可以监控到,
  并且添加点击事件，阻止了a标签的默认行为 在事件内使用history api 更改路径

  这个标签会根据你的路由模式来创建对应模式下的 href的地址
  这意味以后改动模式 不会去改动源文件

  href 变成了 to（导航路径）


  :to="{ name: 'foo' }" 使用这种方式 不再是下面那种去查找路径文件  

  变成去查找匹配的路由 通过路由去查找路径

  将来如果要更改源文件的位置  就不需要去源码中到处修改路径了，只要在路由配置中更改就可以了

  下面的data中link就不使用了， 不跟路径有关了 只跟路由中name属性有关
    <a
      v-for="item in items"
      :href="item.link"
      :key="item.link"
      :class="{ selected: isSelected(item) }"
    >
      <div class="menu-icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </a>

-->  
<script>
import Icon from "@/components/Icon";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          // link: "/",
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true,
        },
        {
          // link: "/blog",
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false, // 精确匹配
        },
        {
          // link: "/about",
          name: "About",
          title: "关于我",
          icon: "about",
          exact: true,
        },
        {
          // link: "/project",
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          // link: "/message",
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
  // methods: {
  //   isSelected(item) {
  //     let link = item.link.toLowerCase();
  //     let curPathname = location.pathname.toLowerCase();
  //     if (item.startWith) {
  //       return curPathname.startsWith(link);
  //     } else {
  //       return curPathname === link;
  //     }
  //   },
  // },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.menu-container {
  width: 100%;
  height: 100%;
  color: @gray;
  margin: 24px 0;
  a {
    padding: 0px 50px;
    margin: 5px 0;
    height: 35px;
    font-size: 18px;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    white-space: nowrap;
    .menu-icon {
      width: 24px;
    }
    &:hover {
      color: @textHover;
    }
    &.selected {
      background-color: darken(@words, 3%);
      color: darken(@textHover, 10%);
      // 修改默认精确类名 为 selected  方法active-class
    }
    // &.router-link-active {
    //   background-color: darken(@words, 3%);
    //   color: darken(@textHover, 10%);
    //   // 使用精确匹配后的默认了类名
    // }
  }
}
</style>