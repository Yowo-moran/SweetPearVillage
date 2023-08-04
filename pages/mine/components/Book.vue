<template>
  <view>
    <view class="waterfall-box" v-for="(item, index) in list" :key="index">
      <u-image
        :src="item.image"
        :lazy-load="true"
        radius="0"
        width="325rpx"
        height="325rpx"
      ></u-image>
      <view class="box-item-price"> ￥{{ item.price }} </view>
      <view class="box-item-title">
        {{ item.title }}
      </view>
      <view
        class="box-item-title"
        style="font-weight: lighter; margin-top: 20rpx"
        v-show="item.college != ''"
      >
        学院：{{ item.college }}
      </view>
      <view
        class="box-item-title"
        style="font-weight: lighter"
        v-show="item.major != ''"
      >
        专业：{{ item.major }}
      </view>
      <view class="box-item-button">
        <button>删除</button>
        <button>编辑</button>
        <button>已出</button>
      </view>
    </view>
  </view>
</template>
 
<script>
export default {
  name: "MyBook",
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
.waterfall-box {
  margin: 10rpx;
  background-color: #ffffff;
  padding: 16rpx;
  position: relative;
  .box-item-title {
    width: 320rpx;
    font-size: 26rpx;
    margin-top: 10rpx;
    color: #434343;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .box-item-price {
    text-align: center;
    font-size: 40rpx;
    color: #b38f8f;
    margin-top: 10rpx;
  }
  .box-item-button {
    display: flex;
    margin-top: 20rpx;
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
  }
}
</style>