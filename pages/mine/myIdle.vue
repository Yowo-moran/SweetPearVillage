<template>
  <view class="allIdle">
    <u-navbar leftText="我的闲置" :autoBack="true" placeholder> </u-navbar>
    <Idle
      v-for="(item, index) in idleList"
      :key="index"
      :item="item"
      :child-index="index"
      :deleteIdle="deleteIdle"
      :editIdle="editIdle"
      :soldIdle="soldIdle"
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
  onShow() {
    this.getIdleList();
  },
  data() {
    return {
      idleList: [
        {
          id: "1",
          image:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          avatar:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          description:
            "每数儿最始更调明场号老身列林学很从。事你大细间容已相适称打气安型。只光员口段学关受书性造特工。头物斗西写子线组养日专先不斗极。没政强说能位题广然三军史断龙书度报又。",
          price: "250",
          nickName: "moran",
          sold: true,
        },
        {
          id: "2",
          image:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          avatar:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          description:
            "每数儿最始更调明场号老身列林学很从。事你大细间容已相适称打气安型。只光员口段学关受书性造特工。头物斗西写子线组养日专先不斗极。没政强说能位题广然三军史断龙书度报又。",
          price: "250",
          nickName: "moran",
          sold: false,
        },
      ],
    };
  },
  methods: {
    deleteIdle(index) {
      // console.log(index);
      const that = this;
      const token = wx.getStorageSync("token");
      const id = that.item.id;
      wx.request({
        method: "DELETE",
        url: "https://101.43.254.115:7115/item/" + id,
        header: {
          Authorization: token,
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
      console.log(index);
      uni.navigateTo({
        url: "/pages/mine/editIdle",
      });
    },
    soldIdle(index) {
      // console.log(index);
      const that = this;
      const token = wx.getStorageSync("token");
      const id = that.item.id;
      wx.request({
        method: "PUT",
        url: "https://101.43.254.115:7115/item/sold?itemId=" + id,
        header: {
          Authorization: token,
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
      const token = wx.getStorageSync("token");
      await wx.request({
        url: "https://101.43.254.115:7115/item/my",
        header: {
          Authorization: token,
        },
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
