<template>
  <view>
    <view class="post-item" v-for="(item, index) in list" :key="index" @click="jump(item.id)">
      <u-image
        :src="item.avatar"
        :lazy-load="true"
        radius="10rpx"
        width="90rpx"
        height="90rpx"
      ></u-image>
      <view class="content">
        <view class="name">{{ item.nickName }}</view>
        <view style="margin-bottom: 20rpx">{{ item.content }}</view>
        <!-- <view
          class="photos"
          :style="
            item.images.length !== 4
              ? ''
              : 'width:380rpx;grid-template-columns: 1fr 1fr;'
          "
        >
          <u-image
            v-for="(photo, it) in item.images"
            :key="it"
            :src="photo.image"
            :lazy-load="true"
            radius="0"
            width="180rpx"
            height="180rpx"
          ></u-image>
        </view> -->
        <u-album
          :urls="item.images"
          keyName="image"
          multipleSize="180rpx"
          singleSize="360rpx"
          space="10rpx"
          :rowCount="item.images.length !== 4 ? 3 : 2"
        ></u-album>
        <view class="content-bottom">
          <view class="time">{{ Time(item.createTime) }}</view>
          <view style="width: 340rpx; display: flex">
            <view class="likes">
              <button @click="deletePost(item.id)">删除</button>
              <text style="margin-right: 20rpx">{{ item.praiseCnt }}</text>
              <u-icon name="thumb-up" color="#b9ba88" size="50rpx"></u-icon>
            </view>
            <view class="comments" style="margin-left: 20rpx">
              <text style="margin-right: 20rpx">{{ item.commentCnt }}</text>
              <u-icon name="chat" color="#b9ba88" size="50rpx"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
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
  methods: {
    Time(e) {
      //处理时间
      return moment(parseInt(e)).format("MM-DD HH:mm");
    },
    async deletePost(id) {
      const that = this;
      await wx.request({
        method: "DELETE",
        url: "https://101.43.254.115:7115/post/" + id,
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          console.log(res);
          that.$emit("getPostList");
        },
      });
    },
    jump(id) {
      uni.navigateTo({
        url: `topicDetail?id=${id}`,
      });
    },
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
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      // grid-template-columns: 1fr;
      grid-row-gap: 10rpx;
      grid-column-gap: 5rpx;
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