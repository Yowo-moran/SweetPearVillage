<template>
	<view class="load-box">
		<u-loading-page :loading="true"></u-loading-page>
	</view>
</template>

<script>
	export default{
		name:'loading',
		
	}
</script>

<style lang="scss" scoped>
	.load-box{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 99;
	}
</style>