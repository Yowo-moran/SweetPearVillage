<script>
import { mapActions, mapMutations } from "vuex";
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
    this.connectWebSocket();
  },
  onHide: function () {
    console.log("App Hide");
    this.closeWeb();
  },
  methods: {
    ...mapActions("message", ["connectWebSocket", "closeWeb"]),
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
</style>
