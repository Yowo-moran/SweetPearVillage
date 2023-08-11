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
        专业：{{ item.grade }}
      </view>
      <view class="box-item-button">
        <button @click="deleteBook(item.id)">删除</button>
        <button @click="editBook(item)">编辑</button>
        <button @click="soldBook(item.id)">已出</button>
      </view>
    </view>
  </view>
</template>
 
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
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
    async soldBook(id) {
      const that = this;
      await wx.request({
        method: "POST",
        url: "https://101.43.254.115:7115/user/book/state/" + id,
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          console.log(res);
          that.$emit("getBookList");
        },
      });
    },
    async deleteBook(id) {
      // console.log(index);
      const that = this;
      await wx.request({
        method: "DELETE",
        url: "https://101.43.254.115:7115/user/book/" + id,
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          that.$emit("getBookList");
          // console.log(res);
        },
      });
    },
    editBook(item){
      this.setBook(item);
      console.log(item)
      uni.navigateTo({
        url: "/pages/mine/editBook",
      });
    },
    ...mapMutations("mine", ["setBook"]),
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