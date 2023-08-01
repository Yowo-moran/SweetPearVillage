<template>
	<view>
		<view class="notice">
			<view class="left">
				<u-icon name="chat" size="64"></u-icon>
			</view>
			<view class="right">
				<view class="titles">通知</view>
				<view class="preview">欢迎大家加入天理村儿～！</view>
			</view>
		</view>
		<view class="inform">
			<scroll-view scroll-y="true" class="scroll">
				<view class="scrollItem">
					<view class="left">
						<image src="../../static/60155475_p0_master1200.jpg" mode="aspectFill" class="img"></image>
					</view>
					<view class="content">
						<view class="right"  @click="jump">
							<view class="titles">猪猪不爱吃珠珠</view>
							<view class="preview">欢迎大家加入天理村儿～！</view>
							<view class="time">
								今天 8:03
							</view>
						</view>
					</view>
				</view>
				<view class="scrollItem">
					<view class="left">
						<image src="../../static/60155475_p0_master1200.jpg" mode="aspectFill" class="img"></image>
					</view>
					<view class="content">
						<view class="right" @click="jump">
							<view class="titles">猪猪不爱吃珠珠</view>
							<view class="preview">欢迎大家加入天理村儿～！</view>
							<view class="time">
								今天 8:03
							</view>
							<span class="icon">
								<u-icon name="bell-fill" size="20" color="red" ></u-icon>
							</span>
						</view>
					</view>
				</view>
				<view class="scrollItem">
					<view class="left">
						<image src="../../static/60155475_p0_master1200.jpg" mode="aspectFill" class="img"></image>
					</view>
					<view class="content">
						<view class="right" @click="jump">
							<view class="titles">猪猪不爱吃珠珠</view>
							<view class="preview">欢迎大家加入天理村儿～！</view>
							<view class="time">
								今天 8:03
							</view>
						</view>
					</view>
				</view>
				
			</scroll-view>
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
			jump(){
				uni.navigateTo({
					url:'/pages/massage/chat/chat'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice{
		height: 10vh;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		border-bottom: 2px solid #d6d7bc;
		.left .right{
			height: 100%;
		}
		.left{
			width: 20vw;
			display: flex;
			justify-content: center;
		}
		.right{
			width: 79vw;
			display: flex;
			flex-direction: column;
			padding-top: 10px;
			.titles{
				font-size: 22px;
				color: #878865;
			}
			.preview{
				font-size: 12px;
				color: #c1c198;
			}
		}
	}
	.inform{
		height: 90vh;
		.scroll{
			height: 100%;
			.scrollItem{
				margin-top: 10px;
				display: flex;
				justify-content: space-between;
				height: 11vh;
				.left{
					width: 20vw;
					display: flex;
					justify-content: center;
					align-items: center;
					.img{
						width: 60px;
						height: 60px;
						border-radius: 50%;
					}
				}
				.content{
					width: 80vw;
					.right{
						position: relative;
						padding-left: 10px;
						width: 80%;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding-top: 10px;
						box-sizing: border-box;
						border-bottom: 1px solid #e5e5d4;
						.titles{
							font-size: 22px;
							color: #878865;
						}
						.preview{
							font-size: 12px;
							color: #c1c198;
						}
						.time{
							font-size: 10px;
							color: #ababab;
						}
						.icon{
							position: absolute;
							top:0;
							right: 0;
						}
					}
				}
				
			}
		}
	}
</style>
