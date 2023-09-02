<template>
  <view class="allReward">
    <u-navbar leftText="我的悬赏" :autoBack="true" placeholder></u-navbar>
    <Reward
      v-for="(item, index) in rewardList"
      :key="index"
      :item="item"
      :childIndex="index"
      @getRewardList="getRewardList"
    />
  </view>
</template>

<script>
import url from "@/api/api.js";
import Reward from "./components/reward.vue";
export default {
  components: {
    Reward,
  },
  onLoad(option) {
    console.log(option.openId);
    this.openId = option.openId;
  },
  onShow() {
    this.getRewardList();
  },
  data() {
    return {
      rewardList: [],
      isShow: false,
      openId: "",
    };
  },
  methods: {
    async getRewardList() {
      const that = this;
      await wx.request({
        url: `${url}/users/${that.openId}/rewards`,
        success(res) {
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          console.log(res);
          that.rewardList = res.data.data.rewards;
        },
      });
    },
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