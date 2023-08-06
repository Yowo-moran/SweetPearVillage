<template>
	<!-- 横向卡片 闲置 -->
	<view class="rowlistItem"  @click="jump">
		<view class="listItemImage">
			<image src="../../../static/111.jpg"></image>
		</view>
		<view class="listContent">
			<view class="listDes">珠珠就爱就爱就爱吃猪猪珠珠就爱吃猪猪珠珠就爱吃猪猪</view>
			<view class="user">
				<image class="userAvatar" src="../../../static/bochi.png"></image>
				<text class="userName">珠珠就爱吃猪猪</text>
				<text class="price">￥ 20</text>
			</view>
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
	height: 180rpx;
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
		height: 100%;
		font-size: 32rpx;
		.listDes{
			height:55%;
			width: 80%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			/* 显示的行 */
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.user{
			height: 20%;
			margin-bottom: 10rpx;
			.userAvatar{
				height: 100%;
				width: 30rpx;
				border-radius: 10rpx;
				background-color: blueviolet;
			}
			.userName{
				margin:0 20rpx;
				font-size: 30rpx;
			}
			.price{
				margin-left: 60rpx;
				font-size: 40rpx;
				color: #b38f8f;
			}
		}
	}
}
.rowlistItem:first-child{
	margin-top: 15rpx;
}
</style>
