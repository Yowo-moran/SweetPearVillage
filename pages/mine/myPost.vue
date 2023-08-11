<template>
  <view class="allPost">
    <u-navbar leftText="我的帖子" :autoBack="true" placeholder> </u-navbar>
    <Post :list="postList" @getPostList="getPostList"/>
  </view>
</template>

<script>
import Post from "./components/post.vue";
export default {
  components: {
    Post,
  },
  onShow() {
    this.getPostList();
  },
  data() {
    return {
      postList: [],
    };
  },
  methods: {
    async getPostList() {
      const that = this;
      await wx.request({
        url: "https://101.43.254.115:7115/post/my",
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          console.log(res);
          that.postList = res.data.data.posts;
        },
      });
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
