<template>
  <view>
    <view v-for="(item, index) in list" :key="index" class="listItem">
      <view class="card">
        <view class="content">
          <text>{{ item.article }}</text>
          <text>时间：{{ item.time }}</text>
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
          <button>完成</button>
          <text>￥{{ item.price }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "MyReward",
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
  background-color: #c3977e;
  .card {
    height: 175rpx;
    padding: 25rpx;
    background-color: #fff;
    border-radius: 30rpx;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.34);
    display: flex;
    .content {
      font-size: 24rpx;
      width: 600rpx;
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
      }
    }
    .threeButton {
      button {
        font-size: 28rpx;
        padding: 0;
        width: 80rpx;
        height: 40rpx;
        line-height: 40rpx;
        color: black;
        margin-bottom: 10rpx;
        background-color: #c3977e;
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