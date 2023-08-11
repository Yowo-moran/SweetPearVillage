<template>
  <view class="allIdle">
    <Idle :list="idleList" />
  </view>
</template>

<script>
import Idle from "./components/idle.vue";
export default {
  components: {
    Idle,
  },
  data() {
    return {
      idleList: [
        {
          img: "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          profilePhoto:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          article: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "250",
          name: "moran",
        },
        {
          img: "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          profilePhoto:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          article: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "250",
          name: "moran",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.allIdle {
  width: 100vw;
  min-height: 100vh;
  background-color: #d6d7b9;
}
</style>
