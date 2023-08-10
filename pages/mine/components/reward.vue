<template>
    <view class="listItem">
      <view class="card">
        <div v-show="!item.status" class="overlay"></div>
        <view class="content">
          <text style="height: 100rpx; width: 480rpx; overflow: auto">{{
            item.rewardContent
          }}</text>
          <text v-show="item.senderAddress">地点：{{ item.senderAddress }}</text>
          <text v-show="item.deliveryAddress">收货地点：{{ item.deliveryAddress }}</text>
          <view class="user">
            <view style="width: 50rpx">
              <u-image
                :src="personalDetails.avatar"
                :lazy-load="true"
                radius="50%"
                width="50rpx"
                height="50rpx"
              ></u-image>
            </view>
            <text>{{ personalDetails.nickName }}</text>
          </view>
        </view>
        <view class="threeButton">
          <button @click="rewardDelete">删除</button>
          <button @click="rewardEdit">编辑</button>
          <button @click="rewardSold">完成</button>
          <text>￥{{ item.rewardAmount }}</text>
        </view>
      </view>
    </view>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "MyReward",
  props: {
    item: {
      type: Object,
      required: true,
    },
    deleteReward: {
      type: Function,
      required: true,
    },
    editReward: {
      type: Function,
      required: true,
    },
    soldReward: {
      type: Function,
      required: true,
    },
    childIndex: Number,
  },
  data() {
    return {};
  },
  methods: {
    rewardDelete() {
      this.deleteReward(this.childIndex);
    },
    rewardEdit() {
      this.editReward(this.childIndex);
      this.setReward(this.item);
    },
    rewardSold() {
      this.soldReward(this.childIndex);
    },
    ...mapMutations("mine", ["setReward"]),
  },
  computed: {
    ...mapState("mine", ["personalDetails"]),
  },
};
</script>

<style lang="scss">
.listItem {
  height: 250rpx;
  padding: 30rpx 20rpx 0 20rpx;
  background-color: #c3977e;
  .card {
    position: relative;
    height: 195rpx;
    padding: 25rpx;
    background-color: #fff;
    border-radius: 30rpx;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.34);
    display: flex;
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 30rpx;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;
    }
    .content {
      box-sizing: border-box;
      padding-left: 15rpx;
      font-size: 24rpx;
      width: 580rpx;
      height: 200rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .user {
        display: flex;
        align-items: center;
        height: 50rpx;
        margin-top: 10rpx;
        font-size: 28rpx;

        text {
          margin-left: 10rpx;
        }
      }
    }
    .threeButton {
      width: 120rpx;
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