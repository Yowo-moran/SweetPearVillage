<template>
  <view class="allMine">
    <view class="header">
      <view class="headportrait">
        <u-image
          :src="personalDetails.avatar"
          :lazy-load="true"
          radius="50%"
          width="170rpx"
          height="170rpx"
          style="margin: 15rpx"
        ></u-image>
        <view class="username" style="margin-right: 130rpx">
          <text style="font-weight: bold; font-size: 36rpx; color: #818258">{{
            personalDetails.nickName
          }}</text>
          <text style="margin-top: 20rpx">{{
            personalDetails.sex === 0
              ? "暂未设定"
              : personalDetails.sex === 1
              ? "男"
              : "女"
          }}</text>
        </view>
      </view>
      <view class="usermajor">
        <text>学院： {{ personalDetails.college }}</text>
        <text style="margin-top: 10rpx"
          >专业： {{ personalDetails.major }}</text
        >
      </view>
    </view>
    <view class="main">
      <navigator :url="`/pages/massage/chat/other/otherReward?openId=${openId}`"
        ><view class="options"
          ><text>我的悬赏</text
          ><img src="../../../../static/箭头.png" alt="" /></view
      ></navigator>
      <navigator :url="`/pages/massage/chat/other/otherBook?openId=${openId}`"
        ><view class="options"
          ><text>我出售的书籍</text
          ><img src="../../../../static/箭头.png" alt="" /></view
      ></navigator>
      <navigator :url="`/pages/massage/chat/other/otherIdle?openId=${openId}`"
        ><view class="options"
          ><text>我的闲置</text
          ><img src="../../../../static/箭头.png" alt="" /></view
      ></navigator>
      <navigator :url="`/pages/massage/chat/other/otherPost?openId=${openId}`">
        <view class="options"
          ><text>我的帖子</text><img src="../../../../static/箭头.png" alt=""
        /></view>
      </navigator>
    </view>
  </view>
</template>

<script>
import url from "@/api/api.js";
export default {
  data() {
    return {
      personalDetails: {
        nickName: "",
        openId: "",
        sex: 0,
        college: "",
        major: "",
        wechatNumber: "",
        avatar: "",
      },
      openId: "",
    };
  },
  onLoad(option) {
    console.log(option);
    const openId = option.openId;
    this.openId = openId;
    const that = this;
    wx.request({
      url: `${url}/user-info/${openId}`,
      header: {
        Authorization: wx.getStorageSync("token"),
      },
      method: "GET",
      success(res) {
        that.personalDetails = res.data.data;
        console.log(that.personalDetails);
      },
    });
  },
};
</script>

<style lang="scss">
.allMine {
  min-height: 100vh;
  background-color: #d6d7b9;
  font-size: 28rpx;
  color: #aeaf75;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    box-sizing: border-box;
    width: 100vw;
    height: 400rpx;
    padding: 15rpx;
    padding-left: 35rpx;
    background-color: #ffffff;
    border-radius: 0 0 80rpx 80rpx;
    display: flex;
    flex-direction: column;
    .headportrait {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .username {
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    .usermajor {
      display: flex;
      flex-direction: column;
      margin: 15rpx;
    }
  }
  .main {
    box-sizing: border-box;
    width: 90vw;
    margin: 5vw;
    .options {
      width: 100%;
      height: 120rpx;
      margin-bottom: 20rpx;
      background-color: #c4ddaf;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text {
        color: #8da56f;
        font-size: 42rpx;
        margin-left: 25rpx;
      }
      img {
        width: 50rpx;
        height: 50rpx;
        margin-right: 40rpx;
      }
    }
  }
}
</style>