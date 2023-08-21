<template>
  <view>
    <view class="waterfall-box" v-for="(item, index) in list" :key="index">
      <view v-if="!item.states" class="overlay"></view>
      <u-image
        :src="item.image"
        :lazy-load="true"
        radius="0"
        width="325rpx"
        height="325rpx"
      ></u-image>
      <view class="box-item-price"> ￥{{ item.price }} </view>
      <view
        class="box-item-title"
        style="display: flex; justify-content: center"
      >
        {{ item.bookName }}
      </view>
      <view
        class="box-item-title"
        style="font-weight: lighter; margin-top: 20rpx"
      >
        学院：{{ item.college }}
      </view>
      <view class="box-item-title" style="font-weight: lighter">
        专业：{{ item.major }}
      </view>
      <view class="box-item-title" style="font-weight: lighter">
        年级：{{ item.grade }}
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
  methods: {
  },
};
</script>
 
<style lang="scss">
.waterfall-box {
  margin: 10rpx;
  background-color: #ffffff;
  padding: 16rpx;
  position: relative;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .box-item-title {
    width: 320rpx;
    font-size: 26rpx;
    margin-top: 10rpx;
    color: #434343;
    // text-overflow: -o-ellipsis-lastline;
    // overflow: hidden;
    // text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    // -webkit-box-orient: vertical;
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