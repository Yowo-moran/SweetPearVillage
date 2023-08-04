<template>
  <view class="allReward">
    <view v-for="(item, index) in lists" :key="index" class="listItem">
      <view class="card">
        <view class="content">
          <text>{{ item.article }}</text>
          <text>时间：{{ item.time }}</text>
          <view class="user">
            <img src="../../static/111.jpg" alt="" />
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
	<view class="listItem">
	</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {
          article: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "250",
          name: "moran",
          time: "上午",
        },
        {
          time: "下午",
          article: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "250",
          name: "moran",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.allReward {
  width: 100vw;
  min-height: 100vh;
  background-color: #C3977E;
  .listItem {
    height: 230rpx;
    padding: 30rpx 20rpx 0 20rpx;
    background-color: #C3977E;
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
          color: black;
          margin-bottom: 10rpx;
          background-color: #C3977E;
        }
        text {
          font-size: 24rpx;
          font-weight: bold;
          color: #be978f;
        }
      }
    }
  }
}
</style>