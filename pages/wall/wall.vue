<template>
	<view class="wall">
		<topic-list></topic-list>
		<u-loadmore :status="status"></u-loadmore>
	</view>
</template>

<script>
import topicList from './topicList.vue';
import { mapActions } from "vuex";
export default {
	components:{ topicList },
	data() {
		return {
			count:1,
			status:this.$store.state.wall.status
		}
	},
	computed:{

	},
	methods:{
		...mapActions("wall" , ['getList']),
		reLoad(){
			this.$store.state.wall.topicList = [];
			this.count = 1;
		}
	},
	onShow(){
		this.status = 'loading';
		if(wx.getStorageSync('token')){
			this.getList(0);
		}
	},
	onHide(){
		this.reLoad();
	},
	onReachBottom(){
		this.count ++;
		this.status = 'loading';
        this.getList(this.count);
    }
}
</script>

<style lang="scss" scoped>

	.wall {
		margin: 0 auto;
		// border: 2px solid red;
		width: 740rpx;
		display: flex;
		flex-direction: column;
		padding-top: 10rpx;
		justify-content: center;
		align-items: center;
		// height: 1310rpx;
	}
</style>
