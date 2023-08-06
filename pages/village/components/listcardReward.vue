<template>
	<!-- 横向卡片 悬赏-->
	<view class=listItem  @click="jump"> 
		<view class="listItemContent">猪猪不爱吃猪猪，猪猪不爱吃猪猪，猪猪不爱吃猪猪猪猪不爱吃猪猪猪猪不爱吃猪猪猪猪不爱吃猪猪，猪猪不爱吃猪猪，猪猪不爱吃猪猪</view>
		<view class="userInfo">
			<!-- 用户头像 -->
			<image class="userAvatar" src="../../../static/bochi.png"></image>
			<!-- 用户名称 -->
			<view class="userName">猪猪不爱吃珠珠猪猪不爱吃</view>
			<!-- 价格 -->
			<view class="price">￥ 20</view>
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
            width: 70%;
            overflow: hidden;
            /* 溢出用省略号隐藏 */
            text-overflow: ellipsis;
            display: -webkit-box;
            /* 显示的行 */
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        .price{
            margin-right: 10rpx;
			font-size: 40rpx;
			color: #b38f8f;
        }
    }
}
.listItem:first-child{
	margin-top: 15rpx;
}
</style>
