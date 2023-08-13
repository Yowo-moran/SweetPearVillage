<template>
  <view @tap="showFooter = false">
    <view class="topBar" :style="{ height: topBarHeight + 'px' }"> </view>
    <uni-nav-bar left-icon="left" @clickLeft="back">
      <view class="title">{{ title }}</view></uni-nav-bar
    >

    <view class="box" :style="{ height: safeArea + 'px' }">
      <scroll-view
        :scroll-top="scrollTop"
        class="message-container"
        scroll-y
        @scrolltoupper="getChat"
        @scroll="recordHeight"
		scroll-with-animation
      >
        <view
          class="message"
          v-for="item in chatHistoryList"
          :key="item.sendTime"
          :class="item.senderOpenId === openId ? 'other' : 'self'"
          :id="item.sendTime"
        >
          <view class="avatar" @tap="goTo(item)" v-if="item.sendTime !== ''">
            <image
              :src="item.senderOpenId === openId ? receiverAvatar : avatar"
              mode="aspectFill"
              class="avatarItem"
              :lazy-load="true"
            ></image>
          </view>
          <view class="content" v-if="item.sendTime !== ''">
            <view v-if="item.msgType === 1">
              {{ item.message }}
            </view>

            <image
              :src="item.message"
              mode="aspectFit"
              v-else-if="item.msgType === 2"
              @tap="preview(item.message)"
              :lazy-load="true"
            ></image>

            <view
              v-else-if="parseInt(item.msgType / 100) === 3"
              class="voice-content"
              @tap="play(item.message)"
            >
              {{ item.msgType % 300 }}
              <image
                src="../../../static/icon/wave.png"
                mode="scaleToFill"
                class="voice-img"
                :lazy-load="true"
                :style="{ width: (item.msgType % 300) + 20 + 'px' }"
              ></image>
            </view>
          </view>
        </view>
      </scroll-view>
      <view class="cancel" v-if="needCancel">
        <view class="voiceTime" :class="cancel ? 'warn' : ''">
          <image
            src="../../../static/icon/voice.png"
            mode="scaleToFill"
            class="left"
            :lazy-load="true"
          ></image>
          <span style="margin: 0 5px">{{
            cancel ? "松开手指取消发送" : time
          }}</span>
          <image
            :lazy-load="true"
            src="../../../static/icon/voice.png"
            mode="scaleToFill"
            class="right"
          ></image>
        </view>
        <view class="voiceIcon">
          <image
            :lazy-load="true"
            src="../../../static/icon/cancel.png"
            mode="scaleToFill"
            class="cancelIcon"
          ></image>
        </view>
      </view>
      <view class="input" :class="showFooter ? 'hHeight' : ''">
        <view class="header">
          <span style="margin: 0 10px" @tap="showFooter = false"
            ><u-icon
              :name="!isVoice ? 'mic' : 'edit-pen'"
              size="28"
              @tap="isVoice = !isVoice"
            ></u-icon
          ></span>
          <view class="textarea" v-if="!isVoice">
            <u-textarea
              v-model="inform"
              placeholder="请输入内容"
              autoHeight
              class="area"
            ></u-textarea>
            <button
              style="background-color: #e9eac9; color: #fff; height: 45px"
              @tap="sendMessage"
            >
              发送
            </button>
          </view>
          <view
            class="voice"
            v-else
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
            @touchmove="move"
          >
            <view class="button">
              {{ !needCancel ? "按住说话" : "" }}
            </view>
          </view>
          <span style="margin: 0 10px"
            ><u-icon
              name="plus-circle"
              size="28"
              @tap.stop="changeShow"
              :color="showFooter ? 'skyblue' : ''"
            ></u-icon
          ></span>
        </view>
        <view class="footer" v-if="showFooter" @tap.stop="">
          <view class="btn" @tap="useCamera">
            <view class="icon">
              <u-icon name="camera" size="50" color="#fff"></u-icon>
            </view>
            <view class="text">拍照</view>
          </view>
          <view class="btn" @tap="chooseImage">
            <view class="icon">
              <u-icon name="photo" size="50" color="#fff"></u-icon>
            </view>
            <view class="text">相册</view>
          </view>
          <view class="btn" @tap="sendWeChat">
            <view class="icon">
              <u-icon name="weixin-fill" size="50" color="#fff"></u-icon>
            </view>
            <view class="text">发送微信号</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
import moment from "moment";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      avatar: "",
      query: null,
      title: "",
      topBarHeight: 0,
      safeArea: 0,
      safeBottom: 0,
      inform: "",
      showFooter: false,
      isVoice: false,
      scrollTop: 0,
      needCancel: false,
      cancel: false,
      timer: null,
      length: 0,
      recorder: null,
      innerAudioContext: null,
      isPlay: false,
      startY: 0,
      time: "0:00",
      newHeight: 0,
      openId: "",
      myId: "",
      newTop: 0,
      isChat: false,
	  isFirst:true,
    };
  },
  onLoad(options) {
    let systemInfo = uni.getSystemInfoSync();
    console.log(systemInfo.windowHeight);
    this.topBarHeight = systemInfo.statusBarHeight || 0;
    this.safeBottom =
      systemInfo.windowHeight - this.topBarHeight - systemInfo.safeArea.height;
    this.safeArea =
      systemInfo.windowHeight - this.topBarHeight - 44 - this.safeBottom;
    uni.getSetting({
      success: (res) => {
        console.log(res.authSetting["scope.record"]);
        if (!res.authSetting["scope.record"]) {
          uni.authorize({
            scope: "scope.record",
          });
        }
      },
    });
    this.innerAudioContext = uni.createInnerAudioContext();
    console.log(this.innerAudioContext);
    console.log(options);
    this.openId = options.openId;
    this.title = options.title;
    this.avatar = wx.getStorageSync("details").avatar;
    this.myId = wx.getStorageSync("details").openId;
    this.getInform(this.openId);
  },
  onShow() {
    console.log("@myId", this.myId);
  },
  onUnload() {
    console.log("bye");
    wx.request({
      url: "https://101.43.254.115:7115/chat-page/quit",
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token"),
      },
    });
  },
  methods: {
    ...mapActions("message", ["getInform", "sendMine", "getHistory"]),
    ...mapMutations("message", ["ADD_NEWCHAT"]),
    back() {
      uni.navigateBack();
    },
    getChat() {
      console.log("到顶了");
      const index = this.chatHistoryList[0].msgId;
      const time = this.chatHistoryList[0].sendTime;
      this.getHistory({
        msgId: index,
        that: this,
        openId: this.openId,
        time: time,
      });
    },
    changeShow() {
      this.showFooter = !this.showFooter;
      this.isVoice = false;
      return false;
    },
    sendMessage() {
      if (this.inform) {
        const temp = {
          sendTime: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          msgType: 1,
          message: this.inform.trim(),
          senderOpenId: this.myId,
          receiverOpenId: this.openId,
        };
        this.ADD_NEWCHAT(temp);
        this.sendMine({
          sender: temp.senderOpenId,
          receiver: temp.receiverOpenId,
          sendTime: temp.sendTime,
          message: temp.message,
        });
        this.inform = "";
        this.toBottom();
      }
    },
    sendImage() {
      const temp = {
        sendTime: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        msgType: 2,
        message: this.inform,
        senderOpenId: this.myId,
        receiverOpenId: this.openId,
      };
      this.ADD_NEWCHAT(temp);
      console.log("upload");
      wx.uploadFile({
        url: "https://101.43.254.115:7115/chat/file",
        filePath: temp.message,
        name: "file",
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        formData: {
          sender: temp.senderOpenId,
          receiver: temp.receiverOpenId,
          sendTime: temp.sendTime,
          msgType: 2,
          voiceLen: 0,
        },
        success(res) {
          console.log(res);
        },
        fail(res) {
          console.log(res);
        },
      });
      this.inform = "";
      this.showFooter = false;
      this.toBottom();
    },
    chooseImage() {
      uni.chooseMedia({
        mediaType: ["image"],
        sourceType: ["album"],
        success: function (res) {
          console.log(res.tempFiles);
          this.inform = res.tempFiles[0].tempFilePath;
          this.sendImage();
        }.bind(this),
      });
    },
    useCamera() {
      uni.chooseMedia({
        mediaType: ["image"],
        sourceType: ["camera"],
        camera: "back",
        success: function (res) {
          console.log(res.tempFiles);
          this.inform = res.tempFiles[0].tempFilePath;
          this.sendImage();
          this.toBottom();
        }.bind(this),
      });
    },

    toBottom() {
      this.$nextTick(() => {
        this.query = uni.createSelectorQuery().in(this);
        this.query
          .selectAll(".message")
          .boundingClientRect((data) => {
            const elements = Array.from(data);
            console.log(elements);
            if (!elements.length) return;
            let index = elements.length - 1;
            this.scrollTop = elements[index].bottom - elements[0].bottom;
          })
          .exec();
        this.query = null;
      });
    },
    preview(url) {
      console.log(url);
      uni.previewImage({
        urls: [url],
      });
    },
    handleTouchStart(e) {
      this.startY = e.touches[0].pageY;
      this.needCancel = true;
      this.recorder = uni.getRecorderManager();
      this.recorder.start();
      let minute = 0;
      let ten = 0;
      let ge = 0;
      this.timer = setInterval(() => {
        this.length += 1;
        ge = this.length % 10;
        ten = Math.floor(this.length / 10);
        minute = Math.floor(this.length / 60);
        this.time = minute + ":" + ten + ge;
        if (this.length >= 60) {
          this.handleTouchEnd();
        }
      }, 1000);
    },
    handleTouchEnd() {
      clearInterval(this.timer);
      this.recorder.stop();
      if (this.length < 1) {
        this.needCancel = false;
        return;
      }
      this.recorder.onStop((res) => {
        console.log(res);
        if (!this.cancel && this.length >= 1) {
          const temp = {
            sendTime: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            msgType: 300 + this.length,
            message: res.tempFilePath,
            length: this.length,
            senderOepnId: this.myId,
            receiverOpenId: this.openId,
          };
          console.log(temp.message);
          this.ADD_NEWCHAT(temp);
          uni.uploadFile({
            url: "https://101.43.254.115:7115/chat/file",
            filePath: temp.message,
            name: "file",
            header: {
              Authorization: wx.getStorageSync("token"),
            },
            formData: {
              sender: temp.senderOepnId,
              receiver: temp.receiverOpenId,
              sendTime: temp.sendTime,
              msgType: 3,
              voiceLen: temp.length,
            },
          });
        }
        this.needCancel = false;
        this.cancel = false;
        this.length = 0;
        this.toBottom();
      });
      this.time = "0:00";
    },
    move(e) {
      if (this.startY - e.touches[0].pageY > 55) {
        this.cancel = true;
      } else {
        this.cancel = false;
      }
    },
    play(url) {
      console.log(url);
      console.log(this.innerAudioContext);
      this.innerAudioContext.src = url;
      this.isPlay = !this.isPlay;
      this.isPlay
        ? this.innerAudioContext.play()
        : this.innerAudioContext.stop();
      this.innerAudioContext.onEnded(() => {
        this.isPlay = false;
      });
      this.innerAudioContext.onStop(() => {
        this.isPlay = false;
      });
    },
    goTo(sender) {
      console.log(sender);
      if (sender.senderOpenId === this.openId)
        uni.navigateTo({
          url: `/pages/massage/chat/other/other?key=${sender}`,
        });
      else
        uni.switchTab({
          url: `/pages/mine/mine`,
        });
    },
    recordHeight(e) {
      this.newTop = e.detail.scrollTop;
    },
    sendWeChat() {
      this.inform = wx.getStorageSync("details").wechatNumber;
      this.sendMessage();
    },
  },
  computed: {
    ...mapState("message", [
      "chatHistoryList",
      "receiverAvatar",
      "receiveNickname",
      "count",
    ]),
  },
  watch: {
    count: {
      handler() {
		console.log('@count_handler')
        this.scrollTop = this.newTop;
      },
    },
    chatHistoryList: {
      handler(newVal, oldVal) {
        if(this.isFirst){
			console.log("@handler", newVal, oldVal);
			  this.toBottom();
			  this.isFirst = false
			
		}
		
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 32rpx;
}
.box {
  display: flex;
  flex-direction: column;
  position: relative;
  .message-container {
    background-color: blanchedalmond;
    flex-grow: 1;
    box-sizing: border-box;
    overflow: hidden;
	overflow-anchor: false;
    .message {
      display: flex;
      align-items: center;
      padding: 20rpx 0;
	  box-sizing: border-box;

      .avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        background-color: #eee;
        margin: 0 20rpx;
        overflow: hidden;
        .avatarItem {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        box-sizing: border-box;
        max-width: 560rpx;
        padding: 20rpx;
        border-radius: 20rpx;
        background-color: #fff;
        box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
        word-break: break-all;
        display: flex;
        justify-content: center;
        .voice-content {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 24rpx;
          font-weight: 200;
          .voice-img {
            margin-left: 10rpx;
            height: 44rpx;
          }
        }
      }
    }
    .self {
      flex-direction: row-reverse;
    }
  }
  .hHeight {
    height: 300rpx !important;
  }
  .cancel {
    position: absolute;
    width: 100%;
    height: 400rpx;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
    bottom: 120rpx;
    .voiceIcon {
      position: absolute;
      bottom: 50rpx;
      background: #eeeeee;
      padding: 24rpx;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      .cancelIcon {
        width: 70rpx;
        height: 70rpx;
      }
    }

    .voiceTime {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 110rpx;
      .left {
        width: 80rpx;
        height: 50rpx;
      }
      .right {
        width: 80rpx;
        height: 50rpx;
        transform: rotate(180deg);
      }
    }

    .warn {
      color: white;
      background-color: indianred;
      border-radius: 20rpx;
    }
  }
  .input {
    height: 120rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .header {
      height: 120rpx;
      display: flex;
      align-items: center;
      .textarea {
        flex-grow: 1;
        display: flex;
      }
      .textarea /deep/ .u-textarea {
        max-height: 80rpx;
        overflow: auto;
      }
      .voice {
        flex-grow: 1;
        .button {
          width: 100%;
          height: 72rpx;
          background-color: #eee;
          text-align: center;
          line-height: 72rpx;
          border-radius: 10rpx;
        }
      }
    }
    .footer {
      position: relative;
      bottom: 0;
      margin: 30rpx 0;
      display: flex;
      justify-content: space-around;
      height: 200rpx;

      .btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 160rpx;
        justify-content: space-around;

        .text {
          font-size: 20rpx;
          text-align: center;
          width: 120rpx;
        }
        .icon {
          background-color: #d6d7bc;
          border-radius: 20rpx;
          width: 120rpx;
          height: 120rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
