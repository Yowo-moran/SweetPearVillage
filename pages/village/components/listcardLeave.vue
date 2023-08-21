<template>
	<!-- 横向卡片 闲置 -->
	<view class="rowlistItem"  @click="jump" :style="{backgroundColor:(leaveInfo.sold?'#D7D7D7':'#fff')}">
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
		<image class="forbid" src='../../../static/售出.png' v-if="leaveInfo.sold"></image>
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
				if(!this.leaveInfo.sold){
					// 若当前无token则跳转到我的
					if(wx.getStorageSync('token')){
						uni.navigateTo({
							url:`/pages/massage/chat/chat?openId=${this.leaveInfo.userId}&title=${this.leaveInfo.nickName}`
						})
					}else{
						uni.switchTab({
							url:`/pages/mine/mine`
						})
					}
				}
			}
		},
		watch:{
			
		}
	}
</script>

<style lang="scss" scoped>
.rowlistItem{
	display: flex;
	position: relative;
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
			}
			.price{
				display: inline-block;
				vertical-align:middle;
				margin-top: 3rpx;
				font-size: 32rpx;		
				// 自动换行
				word-wrap: break-word;
				word-break: break-all;
				white-space: pre-line;
				color: #b38f8f;
			}
		}
	}
	.forbid{
		position: absolute;
		right: 50rpx;
		top: 40rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: #fff;
		border-radius: 50%;
		overflow: hidden;
		opacity: 0.7;
	}
}
.rowlistItem:first-child{
	margin-top: 15rpx;
}
</style>
