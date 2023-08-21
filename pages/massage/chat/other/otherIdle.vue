<template>
  <view class="allIdle">
	  <u-navbar leftText="我的闲置" :autoBack="true" placeholder> </u-navbar>
    <Idle
      v-for="(item, index) in idleList"
      :key="index"
      :item="item"
      @getIdleList="getIdleList"
    />
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
      idleList: [],
	  openId:''
    };
  },
  onLoad(option){
	  this.openId = option.openId
  },
  onShow() {
    this.getIdleList();
  },
  methods: {
    async getIdleList() {
      const that = this;
      await wx.request({
        url: `https://101.43.254.115:7115/item/user/${that.openId}`,
        success(res) {
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          console.log(res);
          that.idleList = res.data.data.items;
        },
      });
    },
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
