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
import Reward from "./components/reward.vue";
export default {
  components: {
    Reward,
  },
  onLoad(option) {
  	this.openId = option.openId
  },
  onShow() {
  	this.getRewardList();
  },
  data() {
    return {
      rewardList: [
        
      ],
	  openId:''
    };
  },
  methods:{
	  async getRewardList() {
	    const that = this;
	    await wx.request({
	      url: `https://101.43.254.115:7115/users/${that.openId}/rewards`,
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
  }
};
</script>

<style lang="scss">
.allReward {
  width: 100vw;
  min-height: 100vh;
  background-color: #c3977e;
}
</style>