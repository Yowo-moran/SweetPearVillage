<template>
	<view class="box"  @tap="jump">
		<view class="left">
			<image :src="message.avator" mode="aspectFill" class="img"></image>
		</view>
		<view class="content">
			<view class="right"  >
				<view class="titles">{{message.title}}</view>
				<view class="preview">{{message.message}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"information",
		data() {
			return {
				message:{
					avator:'https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg',
					title:'猪猪不爱吃珠珠',
					message:'放在宿舍楼下的桌子上就行，我一会儿就下来拿',
					sendTime:'2023-8-6 15:34:44'
				}
			};
		},
		methods:{
			jump(){
				uni.navigateTo({
					url:'/pages/massage/chat/chat'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	
.box{
	box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
	border-radius: 20rpx;
	width: 80%;
	z-index: 999;
	position: absolute;
	top: 1%;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	justify-content: space-around;
	height: 10vh;
	background-color: #ffffff;
	animation-name: aniamte;
	animation-duration: 1s;
	.left{
		width: 18%;
		padding-left: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.img{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
	}
	.content{
		width: 78%;
		.right{
			position: relative;
			margin-left: 20rpx;
			width: 90%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding-top: 10rpx;
			box-sizing: border-box;
			.titles{
				font-size: 34rpx;
				color: #878865;
			}
			.preview{
				font-size: 24rpx;
				color: #c1c198;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.time{
				font-size: 20rpx;
				color: #ababab;
			}
		}
	}
}
</style>