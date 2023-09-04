<template>
  <view class="body">
    <u-navbar leftText="悬赏" :autoBack="true" bgColor="#d6d7b9" placeholder>
    </u-navbar>

    <u-form
      :labelStyle="labelStyle"
      :model="editRewardForm"
      labelWidth="100"
      ref="editRewardForm"
      :rules="editRules"
    >
      <u-form-item prop="rewardContent">
        <span>悬赏内容：</span>
        <u--textarea
          v-model="editRewardForm.rewardContent"
          placeholder="请输入悬赏内容"
          count
          border="none"
          ref="textarea"
          height="200rpx"
          style="font-size: 30rpx"
        ></u--textarea>
      </u-form-item>

      <u-form-item label="赏金:" prop="rewardAmount">
        <u--input
          placeholder="请输入金额"
          type="number"
          border="none"
          v-model="editRewardForm.rewardAmount"
        ></u--input>
      </u-form-item>

      <u-form-item label="地点:" @click="showPlace = true">
        <view style="display: flex">
          <u--input
            v-model="editRewardForm.senderAddress"
            placeholder="请输入地点,可选择"
            border="none"
          ></u--input>
          <u-icon name="arrow-down"></u-icon>
        </view>
      </u-form-item>
      <u-form-item label="收货地址:">
        <u--input
          placeholder="请输入收货地址"
          border="none"
          v-model="editRewardForm.deliveryAddress"
        >
        </u--input>
      </u-form-item>
    </u-form>
    <u-action-sheet
      :show="showPlace"
      :actions="place"
      title="请选择地址"
      @close="showPlace = false"
      @select="placeSelect"
    >
    </u-action-sheet>
    <view class="bottom">
      <button @click="finish">发布</button>
    </view>
  </view>
</template>

<script>
import url from "@/api/api.js";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  onLoad() {
    this.editRewardForm = this.reward;
    console.log(this.editRewardForm);
  },
  data() {
    return {
      editRules: {
        rewardContent: {
          type: "string",
          required: true,
          message: "请输入悬赏内容",
          trigger: ["blur", "change"],
        },
        rewardAmount: {
          type: "number",
          required: true,
          message: "请填价格",
          trigger: ["blur", "change"],
        },
      },
      showPlace: false,
      editRewardForm: {
        id: "",
        rewardContent: "请输入内容",
        rewardAmount: "",
        senderAddress: "",
        deliveryAddress: "",
        status: false,
      },
      place: [
        {
          name: "一食堂",
        },
        {
          name: "二食堂",
        },
        {
          name: "南区快递",
        },
        {
          name: "北区快递",
        },
      ],
      labelStyle: {
        color: "#626341",
        fontSize: 17 + "px",
      },
    };
  },
  methods: {
    placeSelect(e) {
      this.editRewardForm.senderAddress = e.name;
    },
    finish() {
      this.$refs.editRewardForm
        .validate()
        .then((res) => {
          this.edit();
          uni.$u.toast("校验通过");
        })
        .catch((errors) => {
          uni.$u.toast("校验失败");
        });
    },
    async edit() {
      const that = this;
      await wx.request({
        method: "PUT",
        url: url + "/users/me/rewards/" + that.editRewardForm.id,
        data: {
          rewardContent: that.editRewardForm.rewardContent,
          rewardAmount: that.editRewardForm.rewardAmount,
          senderAddress: that.editRewardForm.senderAddress,
          deliveryAddress: that.editRewardForm.deliveryAddress,
        },
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          if (res.data.code !== "00000") {
            console.log("修改失败！");
            return;
          }
          console.log(res);
          uni.navigateBack();
          console.log("修改成功");
        },
      });
    },
  },
  computed: {
    ...mapState("mine", ["reward"]),
  },
};
</script>

<style lang="scss">
.bottom {
  position: absolute;
  bottom: 10%;
  right: 7%;

  button {
    background-color: rgb(214, 215, 185);
    width: 150rpx;
    line-height: 80rpx;
    font-size: 40rpx;
    color: rgb(124, 125, 82);
  }
}
.u-form-item {
  padding: 5rpx 25rpx;
  span {
    color: #626341;
    font-size: 18px;
  }
}
</style>
