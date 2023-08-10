<template>
  <view class="allMine">
    <view class="header">
      <view class="headportrait">
        <button
          open-type="chooseAvatar"
          @chooseavatar="editAvatar"
          :disabled="!logined"
        >
          <u--image
            :src="personalDetails.avatar"
            :lazyLoad="false"
            radius="50%"
            width="170rpx"
            height="170rpx"
          ></u--image>
        </button>
        <view class="username" style="margin-right: 130rpx">
          <text
            style="font-weight: bold; font-size: 36rpx; color: #818258"
            @click="
              if (!this.logined) {
                loginPopup = true;
              }
            "
            >{{ personalDetails.nickName }}</text
          >

          <text style="margin-top: 20rpx">{{ personalDetails.gender }}</text>
        </view>
        <view @click="jumpTo('/pages/mine/setting')"
          ><img
            src="../../static/菜单设置.png"
            alt=""
            style="
              height: 80rpx;
              width: 80rpx;
              margin-bottom: 50rpx;
              margin-right: 20rpx;
            "
        /></view>
      </view>
      <view class="usermajor">
        <text>学院： {{ personalDetails.college }}</text>
        <text style="margin-top: 10rpx"
          >专业： {{ personalDetails.major }}</text
        >
      </view>
    </view>
    <view class="main">
      <view class="options" @click="jumpTo('/pages/mine/myReward')"
        ><text>我的悬赏</text><img src="../../static/箭头.png" alt=""
      /></view>
      <view class="options" @click="jumpTo('/pages/mine/myBook')"
        ><text>我出售的书籍</text><img src="../../static/箭头.png" alt=""
      /></view>
      <view class="options" @click="jumpTo('/pages/mine/myIdle')"
        ><text>我的闲置</text><img src="../../static/箭头.png" alt=""
      /></view>
      <view class="options" @click="jumpTo('/pages/mine/myPost')"
        ><text>我的帖子</text><img src="../../static/箭头.png" alt=""
      /></view>
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
          :safeAreaInsetBottom="false"
          @click="login"
        ></u-button>
        <view class="imparityClause"
          >登录即表示同意知晓《甜梨村》
          <navigator style="color: #2979ff" url="/pages/mine/imparityClause"
            >服务条款</navigator
          >
        </view>
      </view>
    </u-popup>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  onLoad() {
    const details = wx.getStorageSync("details");
    if (details) {
      this.setLogined(true);
      this.setPersonalDetails(details);
    }
  },
  data() {
    return {
      loginPopup: false,
    };
  },
  methods: {
    async login() {
      const that = this;
      this.showToast();
      await wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: "https://101.43.254.115:7115/user/" + res.code,
              success(res) {
                if (res.data.code !== "00000") {
                  console.log("登录失败！");
                  return;
                }
                // console.log(typeof res.data);
                uni.setStorage({
                  key: "token",
                  data: res.data.data.token,
                  success: function () {
                    that.setLogined(true);
                  },
                });
                const {
                  id,
                  avatar,
                  nickName,
                  sex,
                  college,
                  major,
                  wechatNumber,
                  openId,
                } = res.data.data;
                const details = {
                  id,
                  avatar,
                  nickName,
                  sex,
                  college,
                  major,
                  wechatNumber,
                  openId,
                };
                uni.setStorage({
                  key: "details",
                  data: details,
                });
                that.setPersonalDetails(details);
              },
            });
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
    showToast() {
      const that = this;
      this.$refs.uToast.show({
        type: "loading",
        title: "正在加载",
        message: "正在加载",
        iconUrl: "https://cdn.uviewui.com/uview/demo/toast/loading.png",
        complete() {
          that.close();
        },
      });
    },
    jumpTo(url) {
      if (!this.logined) {
        this.loginPopup = true;
        return;
      }
      uni.navigateTo({
        url: url,
      });
    },
    async editAvatar(e) {
      const that = this;
      await uni.uploadFile({
        url: "https://101.43.254.115:7115/avatar",
        filePath: e.detail.avatarUrl,
        name: "avatar",
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          let data = JSON.parse(res.data);
          if (data.code !== "00000") {
            console.log("修改失败！");
            return;
          }
          that.setPersonalDetails({ avatar: data.data.url });
          uni.setStorage({
            key: "details",
            data: that.personalDetails,
          });
          console.log("修改成功！");
        },
      });
    },
    ...mapMutations("mine", ["setLogined", "setPersonalDetails"]),
  },
  computed: {
    ...mapState("mine", ["logined", "personalDetails"]),
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
      button {
        padding: 0;
        margin: 0;
        border-radius: 50%;
        background-color: #ffffff00;
      }
      button::after {
        border: 0;
      }
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
  .imparityClause {
    display: flex;
  }
}
</style>