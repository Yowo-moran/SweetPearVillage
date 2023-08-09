<template>
	<!-- 横向卡片 闲置 -->
	<view class="rowlistItem"  @click="jump">
		<view class="listItemImage">
			<image :src="leaveInfo.avatar"></image>
		</view>
		<view class="listContent">
			<view class="listDes">{{leaveInfo.description}}</view>
			<view class="user">
				<image class="userAvatar" src="../../../static/bochi.png"></image>
				<view class="userName">{{leaveInfo.nickName}}</view>
				<view class="price">￥ {{leaveInfo.price}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			leaveInfo:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			jump(){
				uni.navigateTo({
					url:'/pages/massage/chat/chat'
				})
			}
		},
		watch:{
			
		}
	}
</script>

<style lang="scss" scoped>
.rowlistItem{
	display: flex;
	justify-content: space-around;
	margin: 20rpx;
	padding: 15rpx 30rpx;
	border-radius: 10rpx;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, .32), 0 0 6px rgba(0, 0, 0, .20);
	box-sizing: border-box;
	.listItemImage{
		margin-top: 15rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 40rpx;
		image{
			border-radius: 40rpx;
			width: 100%;
			height: 100%;
		}
	}
	.listContent{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 70%;
		font-size: 32rpx;
		.listDes{
			height:85rpx;
			width: 80%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			/* 显示的行 */
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.user{
			padding-top: 30rpx;
			padding-bottom: 5rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.userAvatar{
				height: 36rpx;
				width: 30rpx;
				border-radius: 10rpx;
				background-color: blueviolet;
			}
			.userName{
				display: inline-block;
				vertical-align:middle;
				margin:0 20rpx;
				margin-right: 80rpx;
				font-size: 30rpx;
				background-color: pink;
			}
			.price{
				display: inline-block;
				vertical-align:middle;
				margin-top: 3rpx;
				font-size: 32rpx;
				color: #b38f8f;
			}
		}
	}
}
.rowlistItem:first-child{
	margin-top: 15rpx;
}
</style>
