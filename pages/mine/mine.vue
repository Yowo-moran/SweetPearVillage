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
          <text
            style="font-weight: bold; font-size: 36rpx; color: #818258"
            @click="loginPopup = true"
            >{{ personalDetails.name }}</text
          >

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
    <u-popup :show="loginPopup" @close="close" @open="open" round="20rpx">
      <view class="loginPopup">
        <u-button
          type="primary"
          icon="weixin-fill"
          text="微信用户一键登录"
          color="#5AC725"
          class="button"
          shape="circle"
          open-type="getPhoneNumber"
          :safeAreaInsetBottom="false"
          @getphonenumber="getPhoneNumber"
        ></u-button>
        <view class="imparityClause">登录即表示同意知晓《甜梨村》
              <navigator style="color: #2979ff" url="/pages/mine/imparityClause">服务条款</navigator>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loginPopup: false,
      personalDetails: {
        profilePhoto:
          "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
        name: "Yowo_moran",
        gender: "男",
        college: "机械工程学院",
        major: "机械电子工程",
      },
      info: {},
    };
  },
  methods: {
    getPhoneNumber(e) {
      console.log(e);
      var that = this;
      if (e.detail.code) {
        this.$api.appPlateForm(
          "POST",
          this.$url.getPhoneNumber,
          {
            code: e.detail.code,
          },
          function (res) {
            if (res.code == "200") {
              uni.setStorageSync("getPhone", res.data.phone);
              console.log("打印获取的手机号", uni.getStorageSync("getPhone"));
              that.info.mobile = res.data.phone;
            }
          }
        );
        console.log(that.info);
      } else {
      }
    },
    login() {
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            console.log(res.code);
            // wx.request({
            //   url: "https://example.com/onLogin",
            //   data: {
            //     code: res.code,
            //   },
            // });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        },
      });
    },
    open() {
      console.log("open");
    },
    close() {
      this.loginPopup = false;
      console.log("close");
    },
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
.loginPopup {
  box-sizing: border-box;
  height: 20vh;
  padding: 80rpx 50rpx 0 50rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .imparityClause{
    display: flex;
  }
}
</style>