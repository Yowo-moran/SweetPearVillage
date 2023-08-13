<template>
  <view class="all">
    <u-navbar leftText="书籍" :autoBack="true" bgColor="#d6d7b9" placeholder>
    </u-navbar>
    <u-form
      :labelStyle="labelStyle"
      :model="editBookForm"
      ref="editBookForm"
      :rules="editRules"
    >
      <u-form-item label="书名:" prop="bookName">
        <input
          type="text"
          placeholder="请输入书名"
          v-model="editBookForm.bookName"
        />
      </u-form-item>

      <u-form-item label="价格:" prop="price">
        <input
          type="number"
          placeholder="请输入价钱" 
          v-model="editBookForm.price"
        />
      </u-form-item>

      <u-form-item label="学院:" @click="showCollege = true" prop="college">
        <view style="display: flex; justify-content: space-between">
          <u--input
            v-model="editBookForm.college"
            placeholder="请选择学院"
            border="none"
          ></u--input>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </u-form-item>

      <u-form-item label="专业" @click="showMajor = true" prop="major" style="display: flex; justify-content: space-between">
        <view style="display: flex; justify-content: space-between">
          <u--input
            v-model="editBookForm.major"
            placeholder="请选择专业"
            border="none"
          ></u--input>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </u-form-item>

      <u-form-item label="年级" @click="showGrade = true" prop="grade">
        <view style="display: flex; justify-content: space-between">
          <u--input
            v-model="editBookForm.grade"
            placeholder="请选择年级"
            border="none"
          ></u--input>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </u-form-item>
    </u-form>
    <u-action-sheet
      :show="showCollege"
      :actions="college"
      title="请选择学院"
      @close="showCollege = false"
      @select="collegeSelect"
    >
    </u-action-sheet>
    <u-action-sheet
      :show="showMajor"
      :actions="major"
      title="请选择专业"
      @close="showMajor = false"
      @select="majorSelect"
    >
    </u-action-sheet>
    <u-action-sheet
      :show="showGrade"
      :actions="grade"
      title="请选择年级"
      @close="showGrade = false"
      @select="gradeSelect"
    >
    </u-action-sheet>
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
    this.editBookForm = this.book;
    this.fileList1.push({ url: this.book.image });
  },
  data() {
    return {
      showCollege: false,
      showMajor: false,
      showGrade: false,
      editRules:{
        bookName: {
          type: "string",
          required: true,
          message: "请输入书籍名称",
          trigger: ["blur", "change"],
        },
        price: {
          type: "number",
          required: true,
          message: "请填价格",
          trigger: ["blur", "change"],
        },
        collage: {
          type: "string",
          required: true,
          message: "请选择学院",
          trigger: ["blur", "change"],
        },
        grade: {
          type: "string",
          required: true,
          message: "请选择年级",
          trigger: ["blur", "change"],
        },
        major: {
          type: "string",
          required: true,
          message: "请选择年级",
          trigger: ["blur", "change"],
        },
      },
      editBookForm: {
        id:'',
        bookName:'',
        price:'',
        college:'',
        grade:'',
        major:'',
        image:'',
      },
      college: [
        {
          name: "计算机技术与工程学院",
        },
        {
          name: "机械工程学院",
        },
      ],
      major: [
        {
          name: "计算机科学与技术",
        },
        {
          name: "大数据",
        },
      ],
      grade: [
        {
          name: "大一",
        },
        {
          name: "大二",
        },
        {
          name: "大三",
        },
        {
          name: "大四",
        },
      ],
      fileList1: [],
      labelStyle: {
        color: "#626341",
        fontSize: 17 + "px",
      },
    };
  },
  methods: {
    collegeSelect(e) {
      this.editBookForm.college = e.name;
    },
    majorSelect(e) {
      this.editBookForm.major = e.name;
    },
    gradeSelect(e) {
      this.editBookForm.grade = e.name;
    },
    finish() {
      this.$refs.editBookForm
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

    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: "https://101.43.254.115:7115/user/book/image", // 仅为示例，非真实的接口地址
          filePath: url,
          name: "image",
          header: {
            Authorization: wx.getStorageSync("token"),
          },
          success: (res) => {
            setTimeout(() => {
              resolve(JSON.parse(res.data).message);
              console.log(res);
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
        url: "https://101.43.254.115:7115/user/book",
        data: {
          id:that.editBookForm.id,
          bookName:that.editBookForm.bookName,
          price:that.editBookForm.price,
          college:that.editBookForm.college,
          grade:that.editBookForm.grade,
          image:result
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
    ...mapState("mine", ["book"]),
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
