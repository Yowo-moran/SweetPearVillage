<template>
  <view class="box" @tap="jump">
    <view class="left">
      <image :src="newChat.senderAvatar" mode="aspectFill" class="img"></image>
    </view>
    <view class="content">
      <view class="right">
        <view class="titles">{{ newChat.senderNickName }}</view>
        <view class="preview">{{
          newChat.msgType === 1
            ? newChat.message
            : newChat.msgType === 2
            ? "图片"
            : "语音"
        }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "information",
  data() {
    return {};
  },
  methods: {
    jump() {
      const openId = newChat.senderOpenId;
	  const title = newChat.senderNickName
      uni.navigateTo({
        url: `/pages/massage/chat/chat?openId=${openId}&title=${title}`,
      });
    },
  },
  computed: {
    ...mapState("message", ["newChat"]),
  },
};
</script>

<style lang="scss" scoped>
.box {
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
  border-radius: 20rpx;
  width: 80%;
  z-index: 999;
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  height: 123rpx;
  background-color: #ffffff;
  animation-name: aniamte;
  animation-duration: 1s;
  .left {
    width: 18%;
    padding-left: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .img {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }
  }
  .content {
    width: 78%;
    .right {
      position: relative;
      margin-left: 20rpx;
      width: 90%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-top: 10rpx;
      box-sizing: border-box;
      .titles {
        font-size: 34rpx;
        color: #878865;
      }
      .preview {
        font-size: 24rpx;
        color: #c1c198;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .time {
        font-size: 20rpx;
        color: #ababab;
      }
    }
  }
}
</style>