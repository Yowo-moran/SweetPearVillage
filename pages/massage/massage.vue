<template>
  <view style="display: flex; flex-direction: column">
    <view class="notice">
      <view class="left">
        <u-icon name="chat" size="64"></u-icon>
      </view>
      <view class="right" @click="toNotice">
        <view class="titles">通知</view>
        <view class="preview">欢迎大家加入天理村儿～！</view>
      </view>
    </view>
    <view class="inform">
      <scroll-view
        scroll-y="true"
        class="scroll"
        v-if="chatList !== []"
      >
        <view
          class="scrollItem"
          @click="jump(item.receiverOpenId, item.receiverName)"
          v-for="item in chatList"
          :key="item.receiverOpenId"
        >
          <view class="left">
            <image
              :src="item.receiverAvatar"
              mode="aspectFill"
              class="img"
              :lazy-load="true"
            ></image>
            <div class="icon" v-if="item.unreadMsgNum !== 0">
              {{ item.unreadMsgNum < 99 ? item.unreadMsgNum : "99+" }}
            </div>
          </view>
          <view class="content">
            <view class="right">
              <view class="titles">{{ item.receiverName }}</view>
              <view class="preview">{{
                item.lastTalkMsgType === 1
                  ? item.lastTalkMsg
                  : item.lastTalkMsgType === 2
                  ? "图片"
                  : "语音"
              }}</view>
              <view class="time"> {{ item.lastTalkTime }} </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import InformVc from "@/components/InformVc.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { InformVc },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapState("message", ["chatList"]),
  },
  methods: {
    jump(openId, name) {
      uni.navigateTo({
        url: `/pages/massage/chat/chat?openId=${openId}&title=${name}`,
      });
    },
    toNotice() {
      uni.navigateTo({
        url: "notice/notice",
      });
    },
    ...mapActions("message", ["getChatList"]),
  },
  onShow() {
	  const token = wx.getStorageSync('token')
	    console.log(token)
	  if(!token){
	  	console.log('message Load')
	  	uni.switchTab({
	  		url:'/pages/mine/mine'
	  	})
	  }
    console.log("messageShow");
    if (wx.getStorageSync("token")) this.getChatList();
  },
  onHide() {
    console.log("message hide");
  },
};
</script>

<style lang="scss" scoped>
.notice {
  height: 10vh;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 4rpx solid #d6d7bc;
  .left .right {
    height: 100%;
  }
  .left {
    width: 20vw;
    display: flex;
    justify-content: center;
  }
  .right {
    width: 79vw;
    display: flex;
    flex-direction: column;
    padding-top: 5rpx;
    .titles {
      font-size: 44rpx;
      color: #878865;
    }
    .preview {
      font-size: 24rpx;
      color: #c1c198;
    }
  }
}
.inform {
  flex-grow: 1;
  .scroll {
    height: 100%;
    .scrollItem {
      margin-top: 20rpx;
      display: flex;
      justify-content: space-between;
      height: 12vh;
      .left {
        position: relative;
        width: 20vw;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
        }
        .icon {
          position: absolute;
          top: 0;
          right: 0;
          background: #bc271a;
          border-radius: 50%;
          height: 40rpx;
          width: 40rpx;
          line-height: 40rpx;
          text-align: center;
          font-size: 20rpx;
          color: #f8eaea;
        }
      }
      .content {
        width: 80vw;
        .right {
          padding-left: 20rpx;
          width: 90%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-top: 10rpx;
          box-sizing: border-box;
          box-sizing: border-box;
          border-bottom: 2rpx solid #e5e5d4;
          .titles {
            font-size: 44rpx;
            color: #878865;
          }
          .preview {
            font-size: 24rpx;
            color: #c1c198;
          }
          .time {
            font-size: 20rpx;
            color: #ababab;
          }
        }
      }
    }
  }
}
</style>
