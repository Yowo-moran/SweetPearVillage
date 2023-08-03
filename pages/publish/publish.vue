<template>
	<view class="body">
		<view class="pic">
			<image src="../../static/发布页图片.png" mode="aspectFill"></image>
			
		</view>
		<view class="but">
			<view class="butt">
				<image class="left" src="../../static/icon/008_鲜花绿植.png"
				mode="aspectFit"
				@click="goReward"></image>
				<button shape="circle"  @click="goReward">悬赏派单</button>
				<image class="right"  src="../../static/icon/arrow-right.png" 
				mode="aspectFit"
				@click="goReward"></image>
			</view>
			<view class="butt">
				<image class="left" src="../../static/icon/008_面包吐司.png"
				mode="aspectFit"
				@click="goBook"></image>
				<button shape="circle" @click="goBook">闲置书籍</button>
				<image class="right" src="../../static/icon/arrow-right.png"
				mode="aspectFit"
				@click="goBook"></image>
			</view>
			<view class="butt">
				<image class="left"  src="../../static/icon/008_沙拉轻食.png"
				mode="aspectFit"
				@click="goGoods"></image>
				<button shape="circle" @click="goGoods">闲置物品</button>
				<image class="right" src="../../static/icon/arrow-right.png"
				mode="aspectFit"
				@click="goGoods"></image>
			</view>
			<view class="butt">
				<image class="left" src="../../static/icon/008_寿司饭团.png"
				mode="aspectFit"
				@click="goPost"></image>
				<button shape="circle" @click="goPost">发布帖子</button>
				<image class="right" src="../../static/icon/arrow-right.png"
				mode="aspectFit"
				@click="goPost"></image>
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
	.but{
		position: absolute;
		margin-top: 55%;
		width: 400rpx;
		
		.butt{
			// display: flex;
			// flex-direction: row;
			
			background-color:rgb(170,168,144);
			border-radius:50px;
			margin-top: 50rpx;
			height: 100rpx;
			position: relative;
			.right{
				width: 30px;
				height:30px;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 80%;
			}
			.left{
				width: 30px;
				height:30px;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 5%;
				
			}
			
			button{
				position: absolute;
				transform: translateX(30%);
				background-color:rgb(170,168,144);
				width: 250rpx;
				line-height: 100rpx;
				color: white;
				border-radius:50px;
				padding: 0;
				margin:0;
				font-size: 22px;
				font-style: italic;
				
			}
		}
	}
}


button:after {
    border: 0px ;
	
}
</style>
