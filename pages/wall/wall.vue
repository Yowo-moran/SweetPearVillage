<template>
	<view class="wall">
		<topic-list></topic-list>
	</view>
</template>

<script>
import topicList from './topicList.vue';
export default {
	components:{ topicList },
	data() {
		return {
			
		}
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
