<template>
	<!-- 纵向卡片 书籍 -->	
	<view class="verListItem"  @click="jump" :style="{backgroundColor:(!bookInfo.states?'#D7D7D7':'#F2F2E5')}">
		<view class="bookPhoto">
			<image :src="bookInfo.image" alt="图片加载失败"></image>
		</view>
		<view class="listItemContent">
			<view class="price">￥ {{bookInfo.price}}</view>
			<view class="listItemTitle">{{bookInfo.bookName}} </view>
			<!-- 描述信息 -->
			<view class="litsItemDec">
				<view class="college"><view style="width: 30%">学院：</view><view style="width: 70%;">{{bookInfo.college}}</view></view>
				<view class="majority"><view  style="width: 30%;">专业：</view><view style="width: 70%;">{{bookInfo.major}}</view></view>
			</view>
			<image class="forbid" src='../../../static/售出.png' v-if="!bookInfo.states" alt="图片加载失败"></image>
		</view>
	
	</view>
</template>

<script>
	export default {
		props:{
			bookInfo:{
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
				if(this.bookInfo.states){
					// 若当前无token则跳转到我的
					if(wx.getStorageSync('token')){
						uni.navigateTo({
							url:`/pages/massage/chat/chat?openId=${this.bookInfo.userId}&title=${this.bookInfo.nickName}`
						})
					}else{
						uni.switchTab({
							url:`/pages/mine/mine`
						})
					}
				}
			},
		},
		watch:{
			
		}
	}
</script>

<style lang="scss" scoped>
.verListItem{
    display: inline-block;
    margin: 15rpx 18.75rpx;
    padding: 30rpx 5rpx;
    width: 45%;
    background-color: #F2F2E5;
	
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
		position: relative;
        margin-top: 40rpx;
        width: 100%;
        .price{
			width: 100%;
			// 自动换行
			word-wrap: break-word;
			word-break: break-all;
			white-space: pre-line;
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
		.forbid{
			position: absolute;
			right: 60rpx;
			top: 20rpx;
			width: 100rpx;
			height: 100rpx;
			background-color: #fff;
			border-radius: 50%;
			overflow: hidden;
			opacity: 0.7;
		}
    }
	
}
</style>
