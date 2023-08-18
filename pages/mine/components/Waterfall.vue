<template>
  <view class="waterfall">
    <InformVc v-if="isShow"></InformVc>
    <view id="left-column" class="column"
      ><slot name="left" :leftList="leftList"></slot
    ></view>
    <view id="right-column" class="column"
      ><slot name="right" :rightList="rightList"></slot
    ></view>
  </view>
</template>
<script>
import InformVc from "@/components/InformVc.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  components: {
    InformVc
  },
  props: {
    value: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    addTime: {
      type: [Number, String],
      default: 0,
    },
    idKey: {
      type: String,
      default: "id",
    },
  },
  data() {
    return {
      leftList: [],
      rightList: [],
      tempList: [],
      isShow:false
    };
  },
  watch: {
    copyFlowList(nVal, oVal) {
      let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
      this.tempList = this.tempList.concat(
        this.cloneData(nVal.slice(startIndex))
      );
	  this.leftList = [];
	  this.rightList = [];
      this.splitData();
    },
    newChat: {
      deep: true,
      handler() {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 2000);
      },
    },
  },
  mounted() {
    this.tempList = this.cloneData(this.copyFlowList);
    this.splitData();
  },
  computed: {
    copyFlowList() {
      return this.cloneData(this.value);
    },
    ...mapState("message", ["newChat"]),
  },
  methods: {
    async splitData() {
      if (!this.tempList.length) return;
      let leftRect = await this.$uGetRect("#left-column");
      let rightRect = await this.$uGetRect("#right-column");
      let item = this.tempList[0];
      if (!item) return;
      if (leftRect.height < rightRect.height) {
        this.leftList.push(item);
      } else if (leftRect.height > rightRect.height) {
        this.rightList.push(item);
      } else {
        if (this.leftList.length <= this.rightList.length) {
          this.leftList.push(item);
        } else {
          this.rightList.push(item);
        }
      }
      this.tempList.splice(0, 1);
      if (this.tempList.length) {
        setTimeout(() => {
          this.splitData();
        }, this.addTime);
      }
    },
    cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    },
  },
};
</script>
 
<style lang="scss" scoped>
.waterfall {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.column {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: auto;
}

.image {
  width: 100%;
}
</style>