<template>
	<view class="body">
		<view class="pic">
			<image src="../../static/发布页图片.png" mode="aspectFill"></image>
			
		</view>
		<view class="but">
			<view class="butt">
				
				<button shape="circle"  @click="goReward">悬赏派单</button>
			</view>
			<view class="butt">
				<button shape="circle" @click="goBook">闲置书籍</button>
			</view>
			<view class="butt">
				<button shape="circle" @click="goGoods">闲置物品</button>
			</view>
			<view class="butt">
				<button shape="circle" @click="goPost">发布帖子</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goReward(){
				uni.navigateTo({
					url:'/pages/publish/reward/reward',
				})
			},
			goBook(){
				uni.navigateTo({
					url:'/pages/publish/book/book',
				})
			},
			goGoods(){
				uni.navigateTo({
					url:'/pages/publish/goods/goods',
				})
			},
			goPost(){
				uni.navigateTo({
					url:'/pages/publish/post/post',
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: rgb(214,215,185);
	height: 100%;	
	}
.body{
	
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	.pic{
		
		image{
			width: 750rpx;
			height: 400rpx;
		}
	}
}

button{
	background-color:rgb(170,168,144);
	width: 450rpx;
	line-height: 100rpx;
	color: white;
	border-radius:50px;
}
.but{
	width: 500rpx;
}
.butt{
	text-align: center;
	background-color:rgb(170,168,144);
	font-size: 22px;
	border-radius:50px;
	margin-top: 50rpx;
}
button:after {
    border: 0px ;
	
}
</style>
