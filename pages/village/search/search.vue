<template>
	<view class="search">
		<view class="searchInput">
			<view class="searchIcon">
				<image src="../../../static/搜索-黑.png"></image>
			</view>
			<input  placeholder="请输入搜索内容" v-model="value" @input="inputChange" />
			<view class="searchButton" @click="goSearch">搜索</view>
		</view>
	
		<view class="search-list">
			<view v-if="is_histroy" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clearHistroy">清空</text>
				</view>
				<!-- 历史标签 -->
				<view v-if="historyList.length>0" class="label-content">
					<view class="label-content__item" v-for="(item,index) in  historyList"  :key="index" @click="goHistoryList">
						{{item.name}}
					</view>
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
	// import {mapState} from 'vuex'
	export default {
		onLoad (options) {
			this.tagType=options.tagName
			},
		data() {
			return {
				value:'',
				is_histroy: true,
				searchList: [],
				loading:false,
				tagType:'',
			}
		},
		
		methods: {
			// 输入框改变时
			inputChange(e){
				// console.log(e.detail.value);
			},
			// 点击搜索
			goSearch(){
				this.$store.dispatch('village/setHistoryList',{
					name:this.value,
					type:this.tagType
				})
				this.value=''
				uni.navigateBack({
					delta: 1
				});
			},
			// 点击历史记录
			goHistoryList(){
				uni.navigateBack({
					delta: 1
				});
			},
			//清除历史记录
			clearHistroy(){
				this.$store.dispatch('village/clearHistoryList')
			}
		},
		computed:{
			historyList(){
				// 将历史记录分块展示 仅当tagType和记录中的type相等时
				return this.$store.state.village.historyList.filter(item=>item.type==this.tagType)
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.search {
		display: flex;
		flex-direction: column;
		flex: 1;
		.searchInput{
			display: flex;
			width: 100%;
			margin-left: 30rpx;
			height: 60rpx;
			padding: 10rpx;
			.searchIcon{
				border-top-left-radius: 20rpx;
				border-bottom-left-radius: 20rpx;
				width: 60rpx;
				height: 60rpx;
				padding-left: 10rpx;
				background-color: #E4E0E0;
				image{
					width: 100%;
					height: 100%;
				}
			}
			input{
				border-top-right-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
				font-size: 30rpx;
				font-weight: 350;
				padding-left: 8rpx;
				background-color: #E4E0E0;
				width: 70%;
				height: 100%;
				margin-right: 20rpx;
			}
			.searchButton{
				color: #000;
				font-size: 30rpx;
				height: 40rpx;
				width: 70rpx;
				box-sizing: border-box;
			}
		}
		.search-list {
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
					font-weight: bold;
				}

				.label-clear {
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
