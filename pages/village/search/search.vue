<template>
	<view class="search">
		<!-- 搜索框 -->
		<view class="searchInput">
			<view class="searchIcon">
				<image src="../../../static/搜索-黑.png"></image>
			</view>
			<input class="input" placeholder="请输入搜索内容" v-model="value"></input>
			<view class="searchButton" @click="goSearch">搜索</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-list" v-if="is_histroy">
			<view  class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clearHistroy">清空</text>
				</view>
				<!-- 历史标签 -->
				<view v-if="historyList.length>0" class="label-content">
					<view class="label-content__item" v-for="(item,index) in  historyList"  :key="index" @click="goHistoryList(item)">
						{{item.name}}
					</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>	
		</view>
		<!-- 搜索结果 -->
		<view class="scroll" v-else>
			<scroll-view  :scroll-y="true" @scrolltolower="upper" class="demo-scroll-block" v-if="has_history">
				<view v-if="tagType=='悬赏'">
					<listCardReward v-for="item,index in rewardSearchInfo" :key="index" :rewardInfo="item"></listCardReward>
					<u-loadmore :status="status1" />
				</view>
				<view v-else-if="tagType=='闲置'">
					<listCardLeave></listCardLeave>
				</view>
				<view v-else-if="tagType=='书籍'">
					<listCardBook></listCardBook>
				</view>
			</scroll-view>
			<view  class="no-data" v-else>
				没有搜索到相关数据
			</view>
		</view>
	</view>
</template>

<script>
	import listCardReward from '../components/listcardReward.vue';
	import listCardBook from '../components/listCardBook.vue';
	import listCardLeave from '../components/listcardLeave.vue';
	import { callWithErrorHandling } from "vue";
	export default {
		components:{listCardReward,listCardBook,listCardLeave},
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
				rewardSearchInfo:[],
				has_history:true,
				rewardPageNum:1,
				status1:'loading'
			}
		},
		methods: {
			// 输入框改变时
			inputChange(e){
				// console.log(e.detail.value);
			},
			// 点击搜索
			goSearch(){
				if(this.tagType=='悬赏'){
					if(this.value.trim()!=''){
						this.$store.dispatch('village/setHistoryList',{
							name:this.value.trim(),
							type:this.tagType
						})
						this.is_histroy=false
						this.rewardSearchInfo=[]
						this.searchReward({keyword:this.value.trim(),pageNum:this.rewardPageNum})
					}
				}
			},
			// 点击历史记录
			goHistoryList(item){
				this.value=item.name
				this.is_histroy=false
				this.rewardSearchInfo=[]
				if(this.tagType=='悬赏'){
					this.status1='loading'
					this.searchReward({keyword:item.name})
				}
			},
			//清除历史记录
			clearHistroy(){
				this.$store.dispatch('village/clearHistoryList')
			},
			// 搜索悬赏
			searchReward(options={}){
				const {pageSize=6,pageNum=1,keyword='',sortBy='amount_desc'}=options
				console.log(keyword);
				uni.request({
					method:'GET',
					url:'https://101.43.254.115:7115/rewards',
					data:{
						pageSize,
						pageNum,
						keyword,
						sortBy,
						types:''
					},
					header:{
						'Authorization':uni.getStorageSync('token')
					},
					success:res=>{
						console.log(res);
						// 如果成功返回数据
						if(res.statusCode==200&&res.data.data.total!=0){
							// 判断数据是否合并
							if(this.rewardSearchInfo.length==0){
								this.rewardSearchInfo=res.data.data.rewards
							}else{
								this.rewardSearchInfo=[...res.data.data.rewards,...this.rewardSearchInfo]
							}
							if(res.data.data.total<6){
								this.status1='nomore'
							}
							this.has_history=true
						}else if(res.statusCode==200&&res.data.data.total==0){
							// 如果第一次请求就没数据 即数据长度为0
							if(this.rewardSearchInfo.length==0){
								this.has_history=false
							}else{
								// 再发送请求，但返回的数据为0
								this.status1='nomore'
							}	
						}else{
							this.has_history=false
						}
					},
					fail:res=>{
						this.has_history=false
					}
				})
			},
			// 下拉
			upper(){
				if(this.tagType=='悬赏'&&this.status1=='loading'){
					this.rewardPageNum++;
					this.searchReward({pageNum:this.rewardPageNum,keyword:this.value})
				}
			}
		},
	computed:{
		historyList(){
			// 将历史记录分块展示 仅当tagType和记录中的type相等时
			return this.$store.state.village.historyList.filter(item=>item.type==this.tagType)
		},
	},
	watch:{
		value(){
			if(this.value===''){
				this.is_histroy=true
				this.rewardSearchInfo=[]
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	page{
		height: 100vh;
		display: flex;
		background-color: #f5f5f5;
	}
	.search {
		height: 100%;
		display: flex;
		flex-direction: column;
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
			.input{
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
		.scroll{
			flex:1;
			.demo-scroll-block{
				width: 100%;
				height: 90vh;
				display: flex;
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
	}
</style>