<template>
  <view class="allSetting">
    <u-navbar leftText="设置" :autoBack="true" bgColor="#d6d7b9" placeholder> </u-navbar>
    <u--form
      class="setOption"
      :model="editDetails"
      :rules="editDetailsRules"
      ref="personalfrom"
    >
      <u-form-item prop="nickName">
        <view class="options"
          ><text>昵称：</text
          ><input
            v-model="editDetails.nickName"
            style="border-bottom: 4rpx solid #7c7d52"
            placeholder="请输入昵称"
            :maxlength="20"
          />
        </view>
      </u-form-item>
      <u-form-item prop="sex">
        <view class="options">
          <text>性别：</text>
          <view
            @click="genderShow = true"
            style="
              border-bottom: 4rpx solid #7c7d52;
              width: 70vw;
              height: 65rpx;
            "
          >
            {{
              editDetails.sex === "请选择性别"
                ? "请选择性别"
                : editDetails.sex === 0
                ? "男"
                : "女"
            }}
          </view>
        </view>
      </u-form-item>
      <u-form-item prop="college">
        <view class="options">
          <text>学院：</text>
          <view
            @click="collegeShow = true"
            style="
              border-bottom: 4rpx solid #7c7d52;
              width: 70vw;
              height: 65rpx;
            "
          >
            {{ editDetails.college }}
          </view>
        </view>
      </u-form-item>
      <u-form-item prop="major">
        <view class="options">
          <text>专业：</text>
          <view
            @click="majorShow = true"
            style="
              border-bottom: 4rpx solid #7c7d52;
              width: 70vw;
              height: 65rpx;
            "
          >
            {{ editDetails.major }}
          </view>
        </view>
      </u-form-item>
      <u-form-item prop="wechatNumber">
        <view class="options"
          ><text>微信号：</text
          ><input
            v-model="editDetails.wechatNumber"
            style="border-bottom: 4rpx solid #7c7d52"
            placeholder="请输入微信号"
            :maxlength="20"
          />
        </view>
      </u-form-item>
    </u--form>
    <u-action-sheet
      :show="genderShow"
      :actions="genders"
      title="请选择性别"
      @close="genderShow = false"
      @select="genderSelect"
    >
    </u-action-sheet>
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
    <view class="editButton"><button @click="submit">确定修改</button></view>
  </view>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  onReady() {
    this.$refs.personalfrom.setRules(this.editDetailsRules);
  },
  onShow() {
    this.editDetails = this.personalDetails;
  },
  data() {
    return {
      editDetailsRules: {
        nickName: {
          type: "string",
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"],
        },
        sex: {
          type: "number",
          max: 1,
          required: true,
          message: "请选择男或女",
          trigger: ["blur", "change"],
        },
        college: {
          validator: (rule, value, callback) => {
            if (value === "请选择学院") {
              return false;
            }
            return true;
          },
          message: "请选择学院",
          trigger: ["change", "blur"],
        },
        major: {
          validator: (rule, value, callback) => {
            if (value === "请选择专业") {
              return false;
            }
            return true;
          },
          message: "请选择专业",
          trigger: ["change", "blur"],
        },
        wechatNumber: {
          type: "string",
          required: true,
          min: 6,
          message: "请填写微信号",
          trigger: ["blur", "change"],
        },
      },
      editDetails: {
        nickName: "",
        sex: "请选择性别",
        college: "请选择学院",
        major: "请选择专业",
        wechatNumber: "",
      },
      majorIndex: 0,
      majorShow: false,
      collegeShow: false,
      genderShow: false,
      genders: [
        {
          name: "男",
          value: 0,
        },
        {
          name: "女",
          value: 1,
        },
      ],
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
    };
  },
  methods: {
    genderSelect(e) {
      // console.log(e);
      this.editDetails.sex = e.value;
      this.genderShow = false;
    },
    collegeSelect(e) {
      // console.log(e);
      this.editDetails.college = e.value[0];
      this.majorIndex = e.indexs[0] + 1;
      this.editDetails.major = "请选择专业";
      this.collegeShow = false;
    },
    majorSelect(e) {
      // console.log(e);
      if (e.value[0] !== "请先选择学院") {
        this.editDetails.major = e.value[0];
      }
      this.majorShow = false;
    },
    async edit() {
      const that = this;
      const token = wx.getStorageSync("token");
      // const token = uni.getStorage({
      //   key: "storage_key",
      // });
      await wx.request({
        method: "POST",
        url: "https://101.43.254.115:7115/information",
        data: {
          newNickname: that.editDetails.nickName,
          newSex: that.editDetails.sex,
          newCollege: that.editDetails.college,
          newMajor: that.editDetails.major,
          newWechatNumber: that.editDetails.wechatNumber,
        },
        header: {
          Authorization: token,
        },
        success(res) {
          if (res.data.code === "D0400") {
            that.getToken(); //刷新token
            that.edit(); //重新执行用户操作
          }
          if (res.data.code !== "00000") {
            console.log("修改失败！");
            return;
          }
          // console.log(res.data.message);
          that.setPersonalDetails(that.editDetails);
          uni.setStorage({
            key: "details",
            data: that.editDetails,
          });
        },
      });
    },
    submit() {
      this.$refs.personalfrom
        .validate()
        .then((res) => {
          uni.$u.toast("校验通过");
          this.edit();
        })
        .catch((errors) => {
          uni.$u.toast("校验失败");
        });
    },
    ...mapActions("mine", ["getToken"]),
    ...mapMutations("mine", ["setLogined", "setPersonalDetails"]),
  },
  computed: {
    ...mapState("mine", ["logined", "personalDetails"]),
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
    margin-top: 10rpx;
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