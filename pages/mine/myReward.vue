<template>
  <view class="allReward">
    <u-navbar leftText="我的悬赏" :autoBack="true" placeholder></u-navbar>
    <Reward
      v-for="(item, index) in rewardList"
      :key="index"
      :item="item"
      :childIndex="index"
      :deleteReward="deleteReward"
      :editReward="editReward"
      :soldReward="soldReward"
      @getRewardList="getRewardList"
    />
  </view>
</template>

<script>
import Reward from "./components/reward.vue";
export default {
  components: {
    Reward,
  },
  onShow() {
    this.getRewardList();
  },
  data() {
    return {
      rewardList: [],
    };
  },
  methods: {
    async deleteReward(index) {
      // console.log(index);
      const that = this;
      await wx.request({
        method: "DELETE",
        url: "https://101.43.254.115:7115/users/me/rewards/" + that.item.id,
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          console.log(res);
          that.$emit("getRewardList");
        },
      });
    },
    editReward(index) {
      // console.log(id);
      uni.navigateTo({
        url: "/pages/mine/editReward",
      });
    },
    async soldReward(index) {
      // console.log(this.item);
      const that = this;
      await wx.request({
        method: "PUT",
        url:
          "https://101.43.254.115:7115/users/me/rewards/" +
          that.item.id +
          "/state",
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          console.log(res);
          that.$emit("getRewardList");
        },
      });
    },
    async getRewardList() {
      const that = this;
      await wx.request({
        url: "https://101.43.254.115:7115/users/me/rewards",
        header: {
          Authorization: wx.getStorageSync("token"),
        },
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