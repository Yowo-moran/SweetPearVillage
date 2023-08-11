<template>
	<view class="wall">
		<topic-list></topic-list>
	</view>
</template>

<script>
import topicList from './topicList.vue';
import { mapActions } from "vuex";
export default {
	components:{ topicList },
	data() {
		return {
			
		}
	},
	computed:{

	},
	methods:{
		...mapActions("wall" , ['getList']),
	},
	onLoad(){
		this.getList();
	},
}
</script>

<style lang="scss" scoped>

	.wall {
		margin: 0 auto;
		// border: 2px solid red;
		width: 740rpx;
		display: flex;
		padding-top: 10rpx;
		justify-content: center;
		align-items: center;
		// height: 1310rpx;
	}
</style>
