<template>
  <view class="allBook">
    <u-navbar leftText="我的书籍" :autoBack="true" placeholder> </u-navbar>
    <Waterfall v-model="bookList">
      <template v-slot:left="{ leftList }">
        <Book :list="leftList"></Book>
      </template>
      <template v-slot:right="{ rightList }">
        <Book :list="rightList"></Book>
      </template>
    </Waterfall>
  </view>
</template>

<script>
import Waterfall from "./components/Waterfall.vue";
import Book from "./components/Book.vue";
export default {
  components: {
    Waterfall,
    Book,
  },
  data() {
    return {
      flowList: [],
      bookList: [
        {
          image:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          title: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "120",
          college: "机械工程学院",
          major: "机械电子工程",
        },
        {
          image:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          title: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "120",
          college: "机械工程学院",
          major: "机械电子工程",
        },
        {
          image:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          title: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "120",
          college: "机械工程学院",
          major: "机械电子工程",
        },
        {
          image:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          title: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "120",
          college: "机械工程学院",
          major: "机械电子工程",
        },
        {
          image:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          title: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "120",
          college: "机械工程学院",
          major: "机械电子工程",
        },
        {
          image:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          title: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "120",
          college: "机械工程学院",
          major: "机械电子工程",
        },
        {
          image:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          title: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "120",
          college: "机械工程学院",
          major: "机械电子工程",
        },
        {
          image:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
          title: "啊啊啊！怎么会有人看错文档？我是呆逼！！",
          price: "120",
          college: "机械工程学院",
          major: "机械电子工程",
        },
      ],
    };
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
