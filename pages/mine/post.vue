<template>
  <view>
    <view class="post-item" v-for="(item, index) in list" :key="index">
      <u-image
        :src="item.profilePhoto"
        :lazy-load="true"
        radius="10rpx"
        width="90rpx"
        height="90rpx"
      ></u-image>
      <view class="content">
        <view class="name">{{ item.name }}</view>
        <view>{{ item.content }}</view>
        <view class="photos">
          <u-image
            v-for="(photo, index) in item.images"
            :key="index"
            :src="item.profilePhoto"
            :lazy-load="true"
            radius="0"
            width="200rpx"
            height="200rpx"
          ></u-image>
        </view>
        <view class="content-bottom">
          <view class="time">{{ item.time }}</view>
          <view style="width: 340rpx; display: flex">
            <view class="likes">
              <button>删除</button>
              <text style="margin-right: 20rpx;">{{ item.lisks }}</text>
              <u-icon name="thumb-up" color="#b9ba88" size="50rpx"></u-icon>
            </view>
            <view class="comments" style="margin-left: 20rpx">
              <text style="margin-right: 20rpx;">{{ item.comments }}</text>
              <u-icon name="chat" color="#b9ba88" size="50rpx"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "MyPost",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.post-item {
  box-sizing: border-box;
  width: 100vw;
  min-height: 200rpx;
  padding: 30rpx;
  display: flex;
  .content {
    margin-left: 20rpx;
    width: 75vw;
    display: flex;
    flex-direction: column;
    font-size: 25rpx;
    .name {
      color: #82835a;
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    .photos {
      margin-top: 20rpx;
    }
    .content-bottom {
      width: 100%;
      height: 50rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20rpx 0;
      .time {
        font-size: 26rpx;
        font-weight: 400;
      }
      .likes {
        width: 220rpx;
        display: flex;
        align-items: center;
        color: #b9ba88;
        button {
          font-size: 21rpx;
          padding: 0;
          width: 70rpx;
          height: 30rpx;
          line-height: 30rpx;
          color: #7c7d54;
          margin-right: 20rpx;
          background-color: #c1c4a6;
        }
      }
      .comments {
        color: #b9ba88;
        width: 100rpx;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>