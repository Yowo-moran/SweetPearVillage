<template>
	<!-- 纵向卡片 书籍 -->	
	<view class="verListItem"  @click="jump">
		<view class="bookPhoto">
			<image src="../../../static/111.jpg"></image>
		</view>
		<view class="listItemContent">
			<view class="price">￥ 20</view>
			<view class="listItemTitle">高等数学 第七版 上册 高等数学 </view>
			<!-- 描述信息 -->
			<view class="litsItemDec">
				<view class="college"><view style="width: 30%">学院：</view><view style="width: 70%;">集成电路与工程学院</view></view>
				<view class="majority"><view  style="width: 30%;">专业：</view><view style="width: 70%;">电子信息工程</view></view>
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

<style lang="scss">
.verListItem{
    display: inline-block;
    margin: 15rpx 18.75rpx;
    padding: 30rpx 5rpx;
    width: 45%;
    background-color: #F3F3EA;
    box-sizing: border-box;
    .bookPhoto{ 
        width: 75%;
        margin: 0 auto;
        height: 230rpx;
        overflow: hidden;
        image{
			width: 100%;
            height: 100%;
        }
    }
    .listItemContent{
        margin-top: 40rpx;
        width: 100%;
        .price{
            text-align: center;
           font-size: 40rpx;
           color: #b38f8f;
        }
        .listItemTitle{
			font-size: 32rpx;
			font-weight: bold;
            width: 90%;
            margin: 0 auto;
            box-sizing: border-box;
        }
        .litsItemDec{
			font-size: 26rpx;
            width: 90%;
            margin: 40rpx auto 0;
			.college{
				display: flex;
				margin-bottom: 20rpx;
			}
			.majority{
				display: flex;
			}
        }
    }
}
</style>
