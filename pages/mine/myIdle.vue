<template>
	<view class="allIdle">
		<view v-for="(item,index) in lists" class="listItem">
			<view class="card">
				<img src="../../static/111.jpg" alt="">
				<view class="content">
					<text>{{item.article}}</text>
					<view class="user">
						<img src="../../static/111.jpg" alt="">
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="threeButton">
					<button>删除</button>
					<button>编辑</button>
					<button>已出</button>
					<text>￥{{item.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[
					{	
						img:'',
						article:'啊啊啊！怎么会有人看错文档？我是呆逼！！',
						price:'250',
						name:'moran',
					},
					{
						img:'',
						article:'啊啊啊！怎么会有人看错文档？我是呆逼！！',
						price:'250',
						name:'moran',
					},
				]
			};
		}
	}
</script>

<style lang="scss">
.allIdle{
	width: 100vw;
	height: 100vh;
	background-color: #D6D7B9;
	.listItem{
		height: 250rpx;
		padding:15rpx 20rpx;
		background-color: #D6D7B9;
		.card{
			height: 175rpx;
			padding: 25rpx;
			background-color: #fff;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .32), 0 0 6px rgba(0, 0, 0, .34);
			display: flex;
			img{
				width: 175rpx;
				height: 175rpx;
				border-radius: 30rpx;
			}
			.content{
				font-size: 24rpx;
				margin-left: 20rpx;
				width: 380rpx;
				height: 180rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.user{
					display: flex;
					align-items: center;
					font-size: 32rpx;
					text{
						margin-left: 10rpx;
					}
					img{
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
					}
				}
			}
			.threeButton{
				button{
					font-size: 28rpx;
					padding: 0;
					width: 80rpx;
					height: 40rpx;
					line-height: 40rpx;
					color: #7C7D54;
					margin-bottom: 10rpx;
					background-color: #C1C4A6;
				}
				text{
					font-size: 24rpx;
					font-weight: bold;
					color: #BE978F;
				}
			}
		}
	}
}
</style>
