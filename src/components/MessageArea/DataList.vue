<template>
  <div class="dataList-container" v-if="list">
    <ul>
      <li v-for="item in list" :key="item.id">
        <Avatar :url="item.avatar" :size="44" />
        <div class="user">
          <div class="user-info">
            <div class="nickname">{{ item.nickname }}</div>
            <div class="time">{{ dateConversion(item.createDate) }}</div>
          </div>
          <div class="content">{{ item.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// 列表组件 负责将获取的评论列表数据 渲染出来
import Avatar from "@/components/Avatar";
import dateConversion from "@/components/js/dateConversion.js";

export default {
  components: {
    Avatar,
  },
  methods: {
    dateConversion,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    subTitle: {
      type: String,
    },
    title: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.dataList-container {
  width: 100%;
  height: 100%;
  li {
    display: flex;
    align-items: center;
    margin: 20px 0;
    padding: 10px 0;
    border-bottom: 1px solid @gray;
    width: 100%;
    .avatar-container {
      margin-right: 20px;
    }
    .user {
      //   border: 1px solid;
      width: 100%;
      .user-info {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        color: darken(@gray, 40%);
        margin-bottom: 10px;
      }
      .content {
        box-sizing: border-box;
        text-indent: 2em;
      }
    }
  }
}
</style>