<template>
  <div class="blogList-container" ref="container" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id" class="blogList-item">
        <div class="thumb" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img
              :src="item.thumb"
              :alt="item.title"
              :title="item.title"
              v-lazy="item.thumb"
            />
            <!-- 'v-lazy' 给指令传递一个参数 是图片的链接 -->
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ item.createDate }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }"
            >
              {{ item.category.name }}
            </RouterLink>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Pager
      v-if="data.total"
      :total="data.total"
      :current="routerInfo.page"
      :limit="routerInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blogList-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  .blogList-item {
    border-bottom: 1px solid #ddd;
    margin: 10px 0;
    padding-bottom: 20px;
    display: flex;

    padding-top: 20px;
    .thumb {
      img {
        height: 150px;
        border-radius: 20px;
      }
    }
    .main {
      padding: 0px 0 0 20px;
      h2 {
        font-size: 20px;
      }
      .aside {
        font-size: 12px;
        color: @gray;
        span {
          margin-right: 20px;
        }
        a {
          color: inherit;
        }
      }
      .desc {
        font-size: 14px;
        color: @words;
      }
    }
  }
}
</style>
<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData.js";
import { getBlogs } from "@/api/blog.js";
import mainScroll from "@/mixins/mainScroll.js";

export default {
  mixins: [fetchData({}), mainScroll("container")], //混合 里面注册了 created 钩子函数 和 this.data 数据
  components: {
    Pager,
  },
  methods: {
    async fetchData() {
      //注册一个异步函数  getBlogs 里面调用了这个函数 传入参数(page（页码）/limit（页容量）/categoryId（分类ID）)
      return await getBlogs(this.routerInfo); //得到得结果 存在 this.data 中
    },
    handlePageChange(newPage) {
      //获得点击时显示的页码数
      // 监控pager 组件的点击事件 触发时 我们需要通过改变 $route 监控的 path路径来实现 组件和数据的变换
      // 获得当前的参数项  获得当前点击的 page 即页码数  改变path 跳转自新页面
      // path 的数据响应式 需要使用 watch 来监控 这样一来 $route 的变化就会被监控到 实现响应式

      const query = {
        page: newPage, //当前页码数
        limit: this.routerInfo.limit, //当前的页面显示的数据量
      };
      if (this.$route.categoryId === -1) {
        //是不是分类
        this.$router.push({
          // $router的方法
          name: "Blog", //跳转路由
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog", //跳转路由
          query,
          params: {
            categoryId: this.routerInfo.categoryId, //分类加上 分类ID
          },
        });
      }
      // 现在实现了 $route 的变化  地址栏中的显示也在变化 那么我们现在需要去根据参数 请求数据来重新渲染数据.
    },
  },
  computed: {
    routerInfo() {
      //
      return {
        page: +this.$route.query.page || 1,
        limit: +this.$route.query.limit || 10,
        categoryId: +this.$route.params.categoryId || -1,
      };
    },
  },
  watch: {
    // 监控 $route Pager组件点击后更改 $router的数据  实现数据变化 ，监控到后 获取参数  去请求数据
    async $route() {
      this.isLoading = true;
      this.$refs.container.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>
