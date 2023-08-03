<template>
  <view class="allPost">
    <Post :list="postList" />
  </view>
</template>

<script>
import Post from "./post.vue";
export default {
  components: {
    Post,
  },
  data() {
    return {
      postList: [
        {
          profilePhoto:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          name: "Yowo_moran",
          content: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          images: [
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          ],
          time: "今天 17:00",
          lisks: "666",
          comments: "12",
        },
        {
          profilePhoto:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          name: "Yowo_moran",
          content: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          images: [
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          ],
          time: "今天 17:00",
          lisks: "666",
          comments: "12",
        },
      ],
    };
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
