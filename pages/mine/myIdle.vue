<template>
  <view class="allIdle">
    <u-navbar leftText="我的闲置" :autoBack="true" placeholder> </u-navbar>
    <Idle
      v-for="(item, index) in idleList"
      :key="index"
      :item="item"
      :childIndex="index"
      :deleteIdle="deleteIdle"
      :editIdle="editIdle"
      :soldIdle="soldIdle"
      @getIdleList="getIdleList"
    />
  </view>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Idle from "./components/idle.vue";
export default {
  components: {
    Idle,
  },
  onShow() {
    this.getIdleList();
  },
  data() {
    return {
      idleList: [],
    };
  },
  methods: {
    async deleteIdle(index) {
      // console.log(index);
      const that = this;
      await wx.request({
        method: "DELETE",
        url: "https://101.43.254.115:7115/item/" + that.item.id,
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          that.$emit("getIdleList");
          // console.log(res);
        },
      });
    },
    editIdle(index) {
      // console.log(index);
      uni.navigateTo({
        url: "/pages/mine/editIdle",
      });
    },
    async soldIdle(index) {
      // console.log(index);
      const that = this;
      await wx.request({
        method: "PUT",
        url: "https://101.43.254.115:7115/item/sold?itemId=" + that.item.id,
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          that.$emit("getIdleList");
          // console.log(res);
        },
      });
    },
    async getIdleList() {
      const that = this;
      await wx.request({
        url: "https://101.43.254.115:7115/item/my",
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          if (res.data.code === "D0400") {
            that.getToken(); //刷新token
            that.getIdleList(); //重新执行用户操作
          }
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          console.log(res);
          that.idleList = res.data.data.items;
        },
      });
    },
    ...mapActions("mine", ["getToken"]),
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
