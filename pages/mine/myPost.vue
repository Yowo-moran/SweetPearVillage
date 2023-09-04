<template>
  <view class="allPost">
    <view
      style="
        width: 100%;
        height: 123rpx;
        position: absolute;
        top: 12%;
        z-index: 999;
      "
    >
      <InformVc v-if="isShow"></InformVc>
    </view>
    <u-navbar leftText="我的帖子" :autoBack="true" placeholder> </u-navbar>
    <Post :list="postList" @getPostList="getPostList" />
  </view>
</template>

<script>
import url from "@/api/api.js";
import InformVc from "@/components/InformVc.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Post from "./components/post.vue";
export default {
  components: {
    Post,
    InformVc,
  },
  onShow() {
    this.getPostList();
  },
  data() {
    return {
      postList: [],
      isShow: false,
    };
  },
  methods: {
    async getPostList() {
      const that = this;
      await wx.request({
        url: url + "/post/my",
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          if (res.data.code === "D0400") {
            that.getToken(); //刷新token
            that.getPostList(); //重新执行用户操作
          }
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          console.log(res);
          that.postList = res.data.data.posts;
        },
      });
    },
    ...mapActions("mine", ["getToken"]),
  },
  computed: {
    ...mapState("message", ["newChat"]),
  },
  watch: {
    newChat: {
      deep: true,
      handler() {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 2000);
      },
    },
  },
};
</script>

<style lang="scss">
.allPost {
  width: 100vw;
  min-height: 100vh;
  background-color: #d6d7b9;
}
</style>
