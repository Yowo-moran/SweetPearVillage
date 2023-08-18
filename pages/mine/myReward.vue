<template>
  <view class="allReward">
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
import InformVc from "@/components/InformVc.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Reward from "./components/reward.vue";
export default {
  components: {
    Reward,
    InformVc,
  },
  onShow() {
    this.getRewardList();
  },
  data() {
    return {
      rewardList: [],
      isShow: false,
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
          if (res.data.code === "D0400") {
            that.getToken(); //刷新token
            that.getRewardList(); //重新执行用户操作
          }
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          console.log(res);
          that.rewardList = res.data.data.rewards;
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
.allReward {
  width: 100vw;
  min-height: 100vh;
  background-color: #c3977e;
}
</style>