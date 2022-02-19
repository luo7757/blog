<template>
  <div class="siteaside-container" v-if="data">
    <header class="avatar">
      <Avatar :url="data.avatar" :size="150" />
      <span>{{ data.siteTitle }}</span>
    </header>
    <menu class="menu">
      <Menu />
    </menu>
    <footer class="contact">
      <ul>
        <li>
          <Contact :href="data.mail" :text="data.mail" :iconType="'mail'" />
        </li>
        <li>
          <Contact
            :hoverCode="data.qqQrCode"
            :href="data.qqhref"
            :text="data.qq"
            :iconType="'qq'"
          />
        </li>
        <li>
          <Contact :href="data.github" text="github" :iconType="'github'" />
        </li>
        <li>
          <Contact
            :hoverCode="data.weixinQrCode"
            :text="data.weixin"
            :iconType="'chat'"
          />
        </li>
      </ul>
    </footer>
    <footer class="remarks">
      <small>{{ data.icp }}</small>
    </footer>
  </div>
</template>

<script>
import Contact from "./Contact";
import Menu from "./Menu";
import Avatar from "@/components/Avatar";
import { mapState } from "vuex";

import "@/styles/global.less";
export default {
  components: {
    Contact,
    Menu,
    Avatar,
  },
  computed: mapState("setting", ["data"]),
  mounted(){
    console.log(this.data)
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.siteaside-container {
  width: 200px;
  height: 100%;
  background-color: @dark;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: auto;
  padding: 20px 0;
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    flex-direction: column;
    span {
      font-size: 20px;
      margin-top: 10px;
      color: @lightWords;
    }
  }

  .contact {
    li {
      margin: 20px 0;
      padding: 0 15px;
      height: 30px;
      line-height: 30px;
      font-size: 30px;
    }
  }

  .remarks {
    border-top: 1px solid #000;
    color: darken(@gray, 40%);
    font-size: xx-small;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 20px 0;
    small {
      transform: scale(0.7);
    }
  }
}
</style>