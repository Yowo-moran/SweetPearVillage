<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
    if (wx.getStorageSync("token")) {
      this.connectWebSocket();
    }
  },
  onHide: function () {
    console.log("App Hide");
    this.closeWeb();
  },
  methods: {
    ...mapActions("message", ["connectWebSocket", "closeWeb"]),
  },
  computed: {
    ...mapState("mine", ["logined"]),
	...mapState('message',['socket'])
  },
  watch: {
    logined: {
      handler() {
		  if(this.socket.readyState !== 1)
        this.connectWebSocket();
      },
    },
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
</style>
