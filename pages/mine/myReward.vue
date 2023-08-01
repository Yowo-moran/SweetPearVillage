<template>
	<view class="allReward">
		<u-picker :show="show" :columns="columns"></u-picker>
		<u-button @click="show = true">打开</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				columns: [
					['中国', '美国', '日本'],
				],
			};
		}
	}
</script>

<style lang="scss">
.allReward{
	width: 100vw;
	
}
</style>