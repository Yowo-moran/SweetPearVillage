<template>
  <view class="allMine">
    <view class="header">
      <view class="headportrait">
        <u-image
          :src="personalDetails.profilePhoto"
          :lazy-load="true"
          radius="50%"
          width="170rpx"
          height="170rpx"
          style="margin: 15rpx"
        ></u-image>
        <view class="username" style="margin-right: 130rpx">
          <text style="font-weight: bold; font-size: 36rpx; color: #818258">{{
            personalDetails.name
          }}</text>
          <text style="margin-top: 20rpx">{{ personalDetails.gender }}</text>
        </view>
        <navigator url="/pages/mine/setting"
          ><img
            src="../../static/菜单设置.png"
            alt=""
            style="height: 80rpx; width: 80rpx; margin-bottom: 50rpx"
        /></navigator>
      </view>
      <view class="usermajor">
        <text>学院： {{ personalDetails.college }}</text>
        <text style="margin-top: 10rpx"
          >专业： {{ personalDetails.major }}</text
        >
      </view>
    </view>
    <view class="main">
      <navigator url="/pages/mine/myReward"
        ><view class="options"
          ><text>我的悬赏</text><img src="../../static/箭头.png" alt="" /></view
      ></navigator>
      <navigator url="/pages/mine/myBook"
        ><view class="options"
          ><text>我出售的书籍</text
          ><img src="../../static/箭头.png" alt="" /></view
      ></navigator>
      <navigator url="/pages/mine/myIdle"
        ><view class="options"
          ><text>我的闲置</text><img src="../../static/箭头.png" alt="" /></view
      ></navigator>
      <navigator url="/pages/mine/myPost">
        <view class="options"
          ><text>我的帖子</text><img src="../../static/箭头.png" alt=""
        /></view>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      personalDetails: {
        profilePhoto:
          "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
        name: "Yowo_moran",
        gender: "男",
        college: "机械工程学院",
        major: "机械电子工程",
      },
    };
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
      justify-content: space-between;
      align-items: center;
      .username {
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