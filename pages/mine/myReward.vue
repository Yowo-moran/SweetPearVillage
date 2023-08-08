<template>
  <view class="allReward">
    <u-navbar leftText="我的悬赏" :autoBack="true" placeholder> </u-navbar>
    <Reward :list="rewardList" />
  </view>
</template>

<script>
import Reward from "./components/reward.vue";
export default {
  components: {
    Reward,
  },
  data() {
    return {
      rewardList: [
        {
          profilePhoto:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          article: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "250",
          name: "moran",
          time: "上午",
        },
        {
          profilePhoto:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          time: "下午",
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
.allReward {
  width: 100vw;
  min-height: 100vh;
  background-color: #c3977e;
}
</style>