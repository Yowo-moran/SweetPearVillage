<template>
	<view class="searchBar">
		<navigator class="search" url='/pages/village/search/search'>
			<image class="searchIcon" src="../../../static/搜索.png"></image> 
			<view class="searchText">uniapp\vue</view>	
		</navigator>
		<view class="setting">
			<image class="settingIcon" src="../../../static/设置.png"></image> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	// .search{
	// 	display: flex;
	// 	align-items: center;
	// 	width: 100%;
	// 	height: 40rpx;
	// 	padding: 0 20rpx;
	// 	background-color: pink;
	// 	.searchIcon{
	// 		width: 20rpx;
	// 		height: 20rpx;
	// 		border: 1px solid red;
	// 	}
	// 	.searchText{
	// 		font-size: 12px;
	// 		background-color: white;
	// 	}
	// }
	.searchBar{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10rpx;
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		box-sizing: border-box;
		.search{
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			height: 60rpx;
			width: 85%;
			border-radius: 60rpx;
			background-color:#8FBC8F;
			.searchIcon{
				margin-right: 20rpx;
				width: 36rpx;
				height: 36rpx;
				// border:1px solid red;
			}
			.searchText{
				font-size: 32rpx;
				color: #999;
			}
		}
		.setting{
			width: 15%;
			height: 100%;
			padding: 20rpx;
			box-sizing: border-box;
			// background-color: green;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
	}
</style>
