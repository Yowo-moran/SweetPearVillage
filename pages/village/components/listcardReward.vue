<template>
	<!-- 横向卡片 悬赏-->
	<view class=listItem  @click="jump"> 
		<view class="listItemContent">
			<view>{{rewardInfo.deliveryAddress}}代取，送至{{rewardInfo.senderAddress}}</view>
			<view>{{rewardInfo.rewardContent}}</view>
		</view>
		<view class="userInfo">
			<!-- 用户头像 -->
			<image class="userAvatar" :src="rewardInfo.avatar"></image>
			<!-- 用户名称 -->
			<view class="userName">{{rewardInfo.nickName}}</view>
			<!-- 价格 -->
			<view class="price">￥ {{rewardInfo.rewardAmount}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			rewardInfo:{
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
.listItem{
    display: flex;
    flex-direction: column;
    height: 200rpx;
    // width: 100%;
	background-color: #F3F3EA;
    margin: 30rpx 10rpx;
    border-radius: 15rpx;
    padding: 20rpx 40rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    .listItemContent{
        height: 45%;
        width: 65%;
        overflow: hidden;
        /* 溢出用省略号隐藏 */
        text-overflow: ellipsis;
        display: -webkit-box;
        /* 显示的行 */
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .userInfo{
        display: flex;
        align-items: center;
        padding: 40rpx 20rpx 0 0;
        height: 50%;
        width: 100%;
        // background-color: green;
        box-sizing: border-box;
        image{
            width: 40rpx;
            height: 40rpx;
        }
        .userName{
            margin-left: 20rpx;
            width: 60%;
            overflow: hidden;
            /* 溢出用省略号隐藏 */
            text-overflow: ellipsis;
            display: -webkit-box;
            /* 显示的行 */
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        .price{
			// width: 250rpx;
            // margin-right: 10rpx;
			font-size: 40rpx;
			color: #b38f8f;
        }
    }
}
.listItem:first-child{
	margin-top: 15rpx;
}
</style>
