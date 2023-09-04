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
        <view
          style="display: flex; justify-content: space-between"
          @click="collegeShow = true"
        >
          <u--input
            v-model="editBookForm.college"
            placeholder="请选择学院"
            border="none"
          ></u--input>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </u-form-item>

      <u-form-item
        label="专业"
        @click="showMajor = true"
        prop="major"
        style="display: flex; justify-content: space-between"
      >
        <view
          style="display: flex; justify-content: space-between"
          @click="majorShow = true"
        >
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
    <u-picker
      :show="collegeShow"
      :columns="colleges"
      title="请选择学院"
      @cancel="collegeShow = false"
      @confirm="collegeSelect"
      :closeOnClickOverlay="true"
      @close="collegeShow = false"
    >
    </u-picker>
    <u-picker
      :show="majorShow"
      :columns="majors[majorIndex]"
      title="请选择专业"
      @cancel="majorShow = false"
      @confirm="majorSelect"
      :closeOnClickOverlay="true"
      @close="majorShow = false"
    >
    </u-picker>
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
import Url from "@/api/api.js";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  onLoad() {
    this.editBookForm = this.book;
    this.fileList1.push({ url: this.book.image });
  },
  data() {
    return {
      collegeShow: false,
      majorShow: false,
      majorIndex: 0,
      showGrade: false,
      editRules: {
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
        id: "",
        bookName: "",
        price: "",
        college: "",
        grade: "",
        major: "请先选择学院",
        image: "",
      },
      colleges: [
        [
          "机械工程学院",
          "材料科学与工程学院",
          "化学化工学院",
          "海运学院",
          "管理学院",
          "艺术学院",
          "环境科学与安全工程学院",
          "理学院",
          "聋人工学院",
          "华信软件学院",
          "计算机科学与工程学院",
          "社会发展学院",
          "语言文化学院",
          "集成电路科学与工程学院",
          "电气工程与自动化学院",
        ],
      ],
      majors: [
        [["请先选择学院"]],
        [
          [
            "机械工程及自动化",
            "过程装备与控制工程",
            "工业设计(造型设计)",
            "机械电子工程",
            "机械工程及自动化(卓越班)",
            "机械工程",
            "机械工程（卓越）",
            "过程装备与控制工程（国际教育）",
            "能源动力系统及自动化",
            "热能与动力工程",
            "能源与动力工程",
            "新能源科学与工程",
            "机械工程(国际教育)",
            "机器人工程",
            "智能制造工程",
            "机械类",
            "能源动力类",
          ],
        ],
        [
          [
            "材料科学与工程",
            "材料成型及控制工程",
            "材料物理",
            "材料化学",
            "功能材料",
            "材料成型及控制工程（卓越）",
            "材料科学与工程（卓越）",
            "新能源材料与器件",
            "功能材料（明理卓越创新班）",
            "材料科学类",
            "材料类",
          ],
        ],
        [
          [
            "应用化学(理)",
            "化学工程与工艺",
            "制药工程",
            "生物工程",
            "应用化学(工)",
            "药学",
            "应用化学（卓越）",
            "化学工程与工艺（卓越）",
            "化学工程与工艺（国际教育）",
            "制药工程（国际教育）",
            "化工与制药类",
          ],
        ],
        [
          [
            "航海技术",
            "轮机工程",
            "轮机工程",
            "船舶电子电气工程",
            "航海技术（卓越）",
            "轮机工程（卓越）",
            "轮机工程（国际教育）",
            "土木、水利与海洋工程",
            "交通运输",
          ],
        ],
        [
          [
            "信息管理与信息系统",
            "工业工程",
            "工商管理",
            "工程管理",
            "保险",
            "工程造价",
            "广告学",
            "物流管理",
            "财务管理",
            "市场营销",
            "保险学",
            "工商管理（国际教育2+2）",
            "财务管理（国际教育）",
            "工业工程（国际教育）",
            "物流管理（国际教育）",
            "工商管理（国际教育）",
            "工业工程（中外合作办学）",
            "工商管理（中外合作办学）",
            "工商管理（3+1）",
            "大数据管理与应用",
            "工商管理（高水平运动队）",
            "管理科学与工程类",
            "工商管理类",
            "工业工程类",
            "物流管理与工程类",
            "工商管理(国际教育学院)",
            "物流管理(国际教育学院)",
            "财务管理(国际教育学院)",
            "工商管理(国际教育学院)",
            "工程管理(国际教育学院)",
            "工商管理（辅修）",
          ],
        ],
        [
          [
            "艺术设计",
            "工业设计",
            "装饰艺术",
            "摄影",
            "动画",
            "动画(中加)",
            "视觉传达设计",
            "环境设计",
            "产品设计",
            "环境设计（国际教育）",
            "视觉传达设计（国际教育）",
          ],
        ],
        [
          [
            "环境工程",
            "安全工程",
            "环境科学",
            "资源环境与城乡规划管理",
            "自然地理与资源环境",
            "资源循环科学与工程",
            "环境工程（卓越）",
            "安全工程（卓越）",
            "应急技术与管理",
            "环境与安全类",
            "环境科学与工程类",
            "安全科学与工程类",
          ],
        ],
        [["应用物理学", "数学与应用数学"]],
        [
          [
            "计算机科学与技术(聋工)",
            "艺术设计",
            "艺术设计",
            "产品设计",
            "服装与服饰设计",
            "自动化(聋工全纳)",
            "电子信息工程(聋工全纳)",
            "工程造价(聋工全纳)",
            "财务管理(聋工全纳)",
            "网络工程（聋工）",
            "环境设计（聋工全纳）",
            "数据科学与大数据技术（聋工）",
            "计算机类",
            "设计学类",
          ],
        ],
        [["软件工程", "计算机科学与技术(专科起点)", "软件工程(专科起点)"]],
        [
          [
            "信息与计算科学",
            "计算机科学与技术",
            "信息安全",
            "网络工程",
            "物联网工程",
            "计算机科学与技术（中加）",
            "数据科学与大数据技术",
            "计算机科学与技术（国际教育）",
            "信息安全（国际教育）",
          ],
        ],
        [["社会工作", "社会学", "老年学"]],
        [
          [
            "英语",
            "日语",
            "汉语言文学",
            "汉语言文学（国际教育）",
            "预科",
            "英语（国际教育）",
          ],
        ],
        [
          [
            "通信工程",
            "电子科学与技术",
            "集成电路设计与集成系统",
            "微电子科学与工程",
            "光电信息科学与工程",
            "电波传播与天线",
            "电子信息工程",
            "通信工程（国际教育）",
            "电子信息工程（卓越）",
            "集成电路设计与集成系统（卓越）",
            "电子信息类",
          ],
        ],
        [
          [
            "自动化",
            "电气工程及其自动化",
            "测控技术与仪器",
            "人工智能",
            "电气工程及其自动化（国际教育）",
            "自动化卓越",
            "电气工程及其自动化（卓越）",
          ],
        ],
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
      this.editBookForm.college = e.value[0];
      this.majorIndex = e.indexs[0] + 1;
      this.editBookForm.major = "请选择专业";
      this.collegeShow = false;
    },
    majorSelect(e) {
      if (e.value[0] !== "请先选择学院") {
        this.editBookForm.major = e.value[0];
      }
      this.majorShow = false;
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
          url: Url + "/user/book/image", // 仅为示例，非真实的接口地址
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
        url: Url + "/user/book",
        data: {
          id: that.editBookForm.id,
          bookName: that.editBookForm.bookName,
          price: that.editBookForm.price,
          college: that.editBookForm.college,
          grade: that.editBookForm.grade,
          image: result,
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
