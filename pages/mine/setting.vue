<template>
  <view class="allSetting">
    <view class="setOption">
      <view class="options"
        ><text>昵称：</text
        ><input
          v-model="personalDetails.name"
          style="border-bottom: 4rpx solid #7c7d52"
          placeholder="请输入昵称"
        />
      </view>
      <view class="options">
        <text>性别：</text>
        <view
          @click="genderShow = true"
          style="border-bottom: 4rpx solid #7c7d52; width: 70vw; height: 65rpx"
        >
          {{ personalDetails.gender }}
        </view>
      </view>
      <view class="options">
        <text>学院：</text>
        <view
          @click="collegeShow = true"
          style="border-bottom: 4rpx solid #7c7d52; width: 70vw; height: 65rpx"
        >
          {{ personalDetails.college }}
        </view>
      </view>
      <view class="options">
        <text>专业：</text>
        <view
          @click="majorShow = true"
          style="border-bottom: 4rpx solid #7c7d52; width: 70vw; height: 65rpx"
        >
          {{ personalDetails.major }}
        </view>
      </view>
      <view class="options"
        ><text>手机号：</text
        ><input
          v-model="personalDetails.phoneNumber"
          style="border-bottom: 4rpx solid #7c7d52"
          placeholder="请输入手机号"
        />
      </view>
      <view class="options"
        ><text>微信号：</text
        ><input
          v-model="personalDetails.wechatId"
          style="border-bottom: 4rpx solid #7c7d52"
          placeholder="请输入微信号"
        />
      </view>
    </view>
    <u-action-sheet
      :show="genderShow"
      :actions="genders"
      title="请选择性别"
      @close="genderShow = false"
      @select="genderSelect"
    >
    </u-action-sheet>
    <u-action-sheet
      :show="collegeShow"
      :actions="colleges"
      title="请选择性别"
      @close="collegeShow = false"
      @select="collegeSelect"
    >
    </u-action-sheet>
    <u-action-sheet
      :show="majorShow"
      :actions="majors"
      title="请选择性别"
      @close="majorShow = false"
      @select="majorSelect"
    >
    </u-action-sheet>
    <view class="editButton"><button style="">确定修改</button></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      personalDetails: {
        name: "",
        gender: "请选择性别",
        college: "请选择学院",
        major: "请选择专业",
        phoneNumber: "",
        wechatId: "",
      },
      value: "",
      majorShow: false,
      collegeShow: false,
      genderShow: false,
      genders: [
        {
          name: "男",
        },
        {
          name: "女",
        },
      ],
      colleges: [
        {
          name: "计算机学院",
        },
        {
          name: "机械工程学院",
        },
      ],
      majors: [
        {
          name: "信息安全",
        },
        {
          name: "物联网",
        },
      ],
    };
  },
  methods: {
    genderSelect(e) {
      this.personalDetails.gender = e.name;
      this.genderShow = false;
    },
    collegeSelect(e) {
      this.personalDetails.college = e.name;
      this.collegeShow = false;
    },
    majorSelect(e) {
      this.personalDetails.major = e.name;
      this.majorShow = false;
    },
  },
};
</script>

<style lang="scss">
.allSetting {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  .options {
    font-size: 40rpx;
    color: #7c7d52;
    height: 75rpx;
    display: flex;
    align-items: flex-end;
    margin-top: 20rpx;
    margin-right: 40rpx;

    text {
      width: 160rpx;
      display: flex;
      flex-direction: row-reverse;
    }

    input {
      width: 70vw;
      height: 65rpx;
    }
  }

  .editButton {
    width: 260rpx;
    display: flex;
    flex-direction: row-reverse;
    margin: 0 20rpx 40rpx 0;

    button {
      background-color: #c9caac;
      font-size: 30rpx;
      font-weight: bold;
      color: #7d7e53;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
  }
}
</style>