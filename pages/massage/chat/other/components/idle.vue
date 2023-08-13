<template>
  <view class="listItem">
    <view class="card">
      <div v-if="item.sold" class="overlay"></div>
      <u-image
        :src="item.image"
        :lazy-load="true"
        radius="30rpx"
        width="175rpx"
        height="175rpx"
      ></u-image>
      <view class="content">
        <text style="height: 120rpx; width: 350rpx; overflow: auto">{{
          item.description
        }}</text>
        <view class="user">
          <u-image
            :src="item.avatar"
            :lazy-load="true"
            radius="50%"
            width="50rpx"
            height="50rpx"
          ></u-image>
          <text>{{ item.nickName }}</text>
        </view>
      </view>
      <view class="threeButton">
        <button @click="idleDelete">删除</button>
        <button @click="idleEdit">编辑</button>
        <button @click="idleSold">已出</button>
        <text>￥{{ item.price }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "MyIdle",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.listItem {
  height: 230rpx;
  padding: 30rpx 20rpx 0 20rpx;
  background-color: #d6d7b9;
  .card {
    position: relative;
    height: 175rpx;
    padding: 25rpx;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.34);
    display: flex;
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;
    }
    .content {
      font-size: 24rpx;
      margin-left: 20rpx;
      width: 380rpx;
      height: 180rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .user {
        display: flex;
        align-items: center;
        font-size: 32rpx;
        text {
          margin-left: 10rpx;
        }
        img {
          width: 50rpx;
          height: 50rpx;
          border-radius: 50%;
        }
      }
    }
    .threeButton {
      button {
        font-size: 28rpx;
        padding: 0;
        width: 80rpx;
        height: 40rpx;
        line-height: 40rpx;
        color: #7c7d54;
        margin-bottom: 10rpx;
        background-color: #c1c4a6;
        opacity: 0;
      }
      text {
        font-size: 24rpx;
        font-weight: bold;
        color: #be978f;
      }
    }
  }
}
</style>