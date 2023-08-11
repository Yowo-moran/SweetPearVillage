<template>
  <view class="all">
    <u-navbar leftText="闲置编辑" :autoBack="true" placeholder> </u-navbar>

    <u--form
      :labelStyle="labelStyle"
      ref="editfrom"
      :model="editIdle"
      :rules="editRules"
    >
      <u-form-item prop="description">
        <u--textarea
          v-model="editIdle.description"
          placeholder="描述一下宝贝~"
          border="none"
          ref="textarea"
          height="200rpx"
        >
        </u--textarea>
      </u-form-item>
      <u-form-item prop="price">
        <view
          style="
            display: flex;
            width: 400rpx;
            height: 60rpx;
            line-height: 60rpx;
            margin-left: 20rpx;
          "
          ><text>价钱 ： </text>
          <u-input
            placeholder="请输入价钱"
            type="number"
            border="none"
            v-model="editIdle.price"
          >
          </u-input
        ></view>
      </u-form-item>
    </u--form>
    <u-upload
      maxCount="1"
      :previewFullImage="true"
      :fileList="fileList1"
      @afterRead="afterRead"
      @delete="deletePic"
      name="1"
      :capture="capture"
      width="230rpx"
      height="230rpx"
    ></u-upload>

    <view class="bottom">
      <button @click="finish">发布</button>
    </view>
  </view>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  onLoad() {
    this.getIdle(this.idleId);
  },
  data() {
    return {
      editRules: {
        description: {
          type: "string",
          required: true,
          message: "请填内容",
          trigger: ["blur", "change"],
        },
        price: {
          type: "number",
          required: true,
          message: "请填价格",
          trigger: ["blur", "change"],
        },
      },
      editIdle: {
        id: "",
        description: "",
        price: "",
        image: "",
      },
      fileList1: [],
      labelStyle: {
        color: "#626341",
        fontSize: 17 + "px",
      },
      capture: ["album", "camera"],
    };
  },
  methods: {
    finish() {
      this.$refs.editfrom
        .validate()
        .then((res) => {
          this.edit();
          uni.$u.toast("校验通过");
        })
        .catch((errors) => {
          uni.$u.toast("校验失败");
        });
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
        });
      });
    },
    async getIdle(id) {
      const that = this;
      const token = wx.getStorageSync("token");
      await wx.request({
        method: "GET",
        url: "https://101.43.254.115:7115/item/" + id,
        header: {
          Authorization: token,
        },
        success(res) {
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          // that.$emit("getIdleList");
          console.log(res);
          that.editIdle = res.data.data;
          that.fileList1.push({ url: res.data.data.image });
        },
      });
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: "https://101.43.254.115:7115/item/image",
          filePath: url,
          name: "image",
          header: {
            Authorization: wx.getStorageSync("token"),
          },
          success: (res) => {
            setTimeout(() => {
              // console.log(data.message);
              resolve(JSON.parse(res.data).message);
            }, 1000);
          },
        });
      });
    },
    async edit() {
      const that = this;
      const result = await this.uploadFilePromise(that.fileList1[0].url);
      await wx.request({
        method: "PUT",
        url: "https://101.43.254.115:7115/item",
        data: {
          id: that.editIdle.id,
          description: that.editIdle.description,
          image: result,
          price: that.editIdle.price,
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
    ...mapState("mine", ["idleId"]),
  },
};
</script>

<style lang="scss">
.all {
  min-height: 100vh;
}
.u-form-item {
  padding: 20rpx;
}
.u-upload {
  padding-left: 40rpx;
  padding-top: 20rpx;
}
.bottom {
  position: absolute;
  bottom: 10%;
  right: 7%;
  button {
    background-color: rgb(214, 215, 185);
    width: 150rpx;
    line-height: 80rpx;
    font-size: 36rpx;
    color: rgb(124, 125, 82);
  }
}
</style>
