<template>
  <form
    class="messageArea-container"
    id="messageArea-container"
    v-on:submit.prevent="handleSubmit"
    ref="form"
  >
    <div class="user-name">
      <input
        type="text"
        placeholder="给自己取个名字"
        maxlength="10"
        v-model="formData.nickname"
        @change="change"
      />
      <span>{{ `${formData.nickname.length} / 10` }}</span>
      <span class="err">{{ error.nickname }}</span>
    </div>
    <div class="user-comment">
      <textarea
        placeholder="留下点什么"
        maxlength="300"
        ref="textarea"
        v-model="formData.content"
        @change="change"
      ></textarea>
      <span>{{ `${formData.content.length} / 300` }}</span>
      <span class="err">{{ error.content }}</span>
    </div>
    <div>
      <button
        class="btn"
        :class="{ submit: isSubmiting }"
        :disabled="isSubmiting"
      >
        {{ isSubmiting ? "提交中..." : "提交" }}
      </button>
    </div>
  </form>
</template>

<script>
// 这个组件  实现一个由用户名和内容组成的 from 表单的提交功能， 取消掉from表单和回车后 的默认事件，from表单提交会刷新页面
// 点击回车 或者 btn 后提交表单数据，做为一个较为通用的组件，自己是没有处理事件的能力的，交由父组件来进行处理，
// 再由父组件通信，告知处理结果 以便做出后续处理
export default {
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmiting: false,
    };
  },
  methods: {
    change() {
      this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
      this.error.content = this.formData.content ? "" : "请填写内容";
    },
    handleSubmit() {
      this.change();
      if (this.error.nickname || this.error.content) {
        return; //填写不完全  不通过
      }
      this.isSubmiting = true; //修改状态 使 button 禁用
      this.$emit("submit", this.formData, (successMsg) => {
        this.$showMessage({
          content: successMsg,
          type: "success",
          duration: 1000,
          container: this.$refs.form,
          callBack: () => {
            this.isSubmiting = false;
            this.formData.nickname = "";
            this.formData.content = "";
          },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.messageArea-container {
  width: 100%;
  height: 100%;
  border-bottom: 2px dashed;
  margin-bottom: 50px;
  & > div {
    margin-bottom: 40px;
    position: relative;
  }
  .user-name {
    width: 50%;
    height: 40px;
  }
  .user-comment {
    height: 200px;
    min-height: 200px;
  }
  input,
  textarea {
    border: 1px dashed @gray;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    font-size: 14px;
    display: block;
    box-sizing: border-box;
    padding-left: 10px;
  }
  textarea {
    resize: none;
    padding: 10px;
  }
  span {
    color: darken(@gray, 10%);
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    right: 5px;
    &.err {
      bottom: 0px;
      left: 0;
      color: red;
      transform: translate(0, 120%);
    }
  }
  button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: @primary;
    cursor: pointer;
    &.submit {
      background-color: lighten(@primary, 20%);
      cursor: not-allowed;
    }
  }
}
</style>