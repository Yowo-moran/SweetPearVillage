<template>
  <view>
    <view v-for="(item, index) in list" :key="index" class="listItem">
      <view class="card">
        <u-image
          :src="item.img"
          :lazy-load="true"
          radius="30rpx"
          width="175rpx"
          height="175rpx"
        ></u-image>
        <view class="content">
          <text>{{ item.article }}</text>
          <view class="user">
            <u-image
              :src="item.profilePhoto"
              :lazy-load="true"
              radius="50%"
              width="50rpx"
              height="50rpx"
            ></u-image>
            <text>{{ item.name }}</text>
          </view>
        </view>
        <view class="threeButton">
          <button>删除</button>
          <button>编辑</button>
          <button>已出</button>
          <text>￥{{ item.price }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "MyIdle",
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
.listItem {
  height: 230rpx;
  padding: 30rpx 20rpx 0 20rpx;
  background-color: #d6d7b9;
  .card {
    height: 175rpx;
    padding: 25rpx;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.34);
    display: flex;
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