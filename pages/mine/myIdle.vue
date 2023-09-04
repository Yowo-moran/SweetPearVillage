<template>
  <view class="allIdle">
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
import url from "@/api/api.js";
import InformVc from "@/components/InformVc.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Idle from "./components/idle.vue";
export default {
  components: {
    Idle,
    InformVc
  },
  onShow() {
    this.getIdleList();
  },
  data() {
    return {
      idleList: [],
      isShow: false,
    };
  },
  methods: {
    async deleteIdle(index) {
      // console.log(index);
      const that = this;
      await wx.request({
        method: "DELETE",
        url: url + "/item/" + that.item.id,
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
        url: url + "/item/sold?itemId=" + that.item.id,
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
        url: url + "/item/my",
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
.allIdle {
  width: 100vw;
  min-height: 100vh;
  background-color: #d6d7b9;
}
</style>
