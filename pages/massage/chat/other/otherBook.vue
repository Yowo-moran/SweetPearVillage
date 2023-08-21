<template>
  <view class="allBook">
    <u-navbar leftText="我的书籍" :autoBack="true" placeholder> </u-navbar>
    <Waterfall v-model="bookList">
      <template v-slot:left="{ leftList }">
        <Book :list="leftList" @getBookList="getBookList"></Book>
      </template>
      <template v-slot:right="{ rightList }">
        <Book :list="rightList" @getBookList="getBookList"></Book>
      </template>
    </Waterfall>
  </view>
</template>

<script>
import Waterfall from "./components/Waterfall.vue";
import Book from "./components/Book.vue";
import {mapActions} from 'vuex'
export default {
  components: {
    Waterfall,
    Book,
  },
  onLoad(option) {
    console.log(option);
    this.openId = option.openId;
  },
  onShow() {
    this.getBookList();
  },
  data() {
    return {
      flowList: [],
      bookList: [],
      openId: "",
    };
  },
  methods: {
    async getBookList() {
      const that = this;
      this.bookList = [];
      await wx.request({
        url: "https://101.43.254.115:7115/user/book/others",
        data: {
          page: 1,
          pageSize: 200,
          openId: that.openId,
        },
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
			if (res.data.code === "D0400") {
			  that.getToken(); //刷新token
			  that.getBookList(); //重新执行用户操作
			}
          if (res.data.code !== "00000") {
            console.log(res.data.message);
            return;
          }
          console.log(res);
          that.bookList = res.data.data.records;
        },
      });
    },
	...mapActions("mine", ["getToken"]),
  },
};
</script>

<style lang="scss">
.allBook {
  width: 100vw;
  min-height: 100vh;
  background-color: #d6d7b9;
}
</style>
