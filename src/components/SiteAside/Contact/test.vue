<template>
  <div class="text-container">
    <ul>
      <li>
        <Contact
          href="mailto:775743564@qq.com"
          text="775743564@qq.com"
          :hoverCode="'https://www.baidu.com/img/flexible/logo/pc/result.png'"
          :iconType="'mail'"
        />
      </li>
      <li>
        <Contact
          href="tencent://message/?Menu=yes&uin=775743564&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45"
          text="775743564"
          :iconType="'qq'"
        />
      </li>
      <li>
        <Contact
          href="tencent://message/?Menu=yes&uin=775743564&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45"
          text="github"
          :hoverCode="'https://www.baidu.com/img/flexible/logo/pc/result.png'"
          :iconType="'github'"
        />
      </li>
      <li>
        <Contact text="dwada775743564" :iconType="'chat'" />
      </li>
    </ul>
  </div>
</template>

<script>
import Contact from "./index.vue";

export default {
  components: {
    Contact,
  },
};
</script>

<style lang="less">
@import "~@/styles/var.less";
@import "~@/styles/global.less";

.text-container {
  margin: 0 auto;
  width: 200px;
  height: 500px;
  border: 2px solid;
  background-color: @words;
  position: relative;
  ul {
    position: absolute;
    top: 50%;
    width: 100%;
  }
  li {
    margin: 14px 0;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
  }
}
</style>