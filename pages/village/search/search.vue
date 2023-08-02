<template>
	<view class="home">
		<view class="home-list">
			<view v-if="is_histroy" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" >清空</text>
				</view>
				<view v-if="1 > 0" class="label-content">
					<view class="label-content__item" v-for="(item,index) in  historyLists"  :key="index" ></view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
				<view  class="no-data">
					没有搜索到相关数据
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
				is_histroy: true,
				searchList: [],
				loading:false
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;

				.label-title {
					color: black;
				}

				.label-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content__item {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
				}
			}
		}
	}

	.no-data {
		height: 200px;
		line-height: 200px;
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: #666;
	}
</style>
