<template>
	<view class="search">
		<InformVc v-if="isShow" ></InformVc>
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
			<scroll-view  :scroll-y="true" @scrolltolower="upper" class="demo-scroll-block" v-if="has_history" >
				<view v-if="tagType=='悬赏'">
					<listCardReward v-for="item in rewardSearchInfo" :key="item.id" :rewardInfo="item"></listCardReward>
					<u-loadmore :status="status1" />
				</view>
				<view v-else-if="tagType=='闲置'">
					<listCardLeave v-for="item in leaveSearchInfo" :key="item.id" :leaveInfo="item"></listCardLeave>
					<u-loadmore :status="status2" />
				</view>
				<view v-else-if="tagType=='书籍'">
					<listCardBook v-for="item in bookSearchInfo" :key="item.id" :bookInfo="item"></listCardBook>
					<u-loadmore :status="status3" />
				</view>
			</scroll-view>
			<view  class="no-data" v-else>
				没有搜索到相关数据
			</view>
		</view>
	</view>
</template>

<script>
	import InformVc from "@/components/InformVc.vue";
	import {mapState } from "vuex";
	import listCardReward from '../components/listcardReward.vue';
	import listCardBook from '../components/listCardBook.vue';
	import listCardLeave from '../components/listcardLeave.vue';
	import url from '@/api/api.js'
	export default {
		components:{listCardReward,listCardBook,listCardLeave},
		onLoad (options) {
			this.tagType=options.tagName
			const rewardKeyword=JSON.parse(options.rewardkeyword)
			this.rewardkeyword=(rewardKeyword.length==0?'':rewardKeyword)
			this.historyList=(wx.getStorageSync('searchHistory')||[]).filter(item=>item.type==this.tagType)
			},
		data() {
			return {
				isShow:false,
				value:'',
				is_histroy: true,
				searchList: [],
				historyList:[],
				loading:false,
				tagType:'',
				rewardkeyword:'',
				rewardSearchInfo:[],
				leaveSearchInfo:[],
				bookSearchInfo:[],
				has_history:true,
				rewardPageNum:1,
				leavePageNum:1,
				bookPageNum:1,
				status1:'loading',
				status2:'loading',
				status3:'loading'
			}
		},
		methods: {
			// 点击搜索
			goSearch(){
				if(this.value.trim()!=''){
					// 添加历史记录
					this.setHistoryList({
						name:this.value.trim(),
						type:this.tagType
					})
					this.initializeData()
					if(this.tagType=='悬赏'){
						this.searchReward({keyword:this.value.trim(),pageNum:this.rewardPageNum,types:this.rewardkeyword})
					}else if(this.tagType=='闲置'){
						this.searchLeave({searchText:this.value.trim(),pageNum:this.leavePageNum})
					}else if(this.tagType=='书籍'){
						this.serachBook({searchText:this.value.trim(),pageNum:this.bookPageNum})
					}
				}
			},
			// 点击历史记录
			goHistoryList(item){
				this.value=item.name
				this.initializeData()
				// 重新添加历史记录
				this.setHistoryList({
					name:this.value.trim(),
					type:this.tagType
				})
				if(this.tagType=='悬赏'){
					this.searchReward({keyword:item.name,types:this.rewardkeyword})
				}else if(this.tagType=='闲置'){
					this.searchLeave({searchText:item.name})
				}else if(this.tagType=='书籍'){
					this.serachBook({searchText:item.name})
				}
			},
			//清除历史记录
			clearHistroy(){
				this.clearHistoryList()
			},
			// 设置历史记录
			setHistoryList(history){
				const searchHistory=wx.getStorageSync('searchHistory')||[]
				searchHistory.unshift(history)
				 // 添加后检查是否有重复项
				const newlist = [...new Set(searchHistory.map(JSON.stringify))].map(JSON.parse);
				wx.setStorageSync('searchHistory',newlist)
				this.historyList=(wx.getStorageSync('searchHistory')||[]).filter(item=>item.type==this.tagType)
			},
			// 清除历史记录
			clearHistoryList(){
				wx.removeStorageSync('searchHistory')
				this.historyList=(wx.getStorageSync('searchHistory')||[]).filter(item=>item.type==this.tagType)
			},
			// 搜索悬赏
			searchReward(options={}){
				const {pageSize=6,pageNum=1,keyword='',types=''}=options
				console.log('types',types);
				uni.request({
					method:'GET',
					url:url + '/rewards/search',
					data:{
						pageSize,
						pageNum,
						types,
						keyword
					},
					header:{
						'Authorization':uni.getStorageSync('token')
					},
					success:res=>{
						// console.log(res);
						// 如果成功返回数据
						if(res.statusCode==200&&res.data.code=='00000'&&res.data.data.total!=0){
							// 判断数据是否合并
							if(this.rewardSearchInfo.length==0){
								this.rewardSearchInfo=res.data.data.rewards
							}else{
								this.rewardSearchInfo=[...this.rewardSearchInfo,...res.data.data.rewards]
							}
							if(res.data.data.total<6){
								this.status1='nomore'
							}
							this.has_history=true
						}else if(res.statusCode==200&&res.data.code=='00000'&&res.data.data.total==0){
							// 如果第一次请求就没数据 即数据长度为0
							if(this.rewardSearchInfo.length==0){
								this.has_history=false
							}else{
								// 再发送请求，但返回的数据为0
								this.status1='nomore'
							}	
						}else{
							this.status1='loading'
						}
					},
					fail:res=>{
						this.status1='loading'
					}
				})
			},
			// 搜索闲置
			searchLeave(options={}){
				const {pageSize=6,pageNum=1,searchText=''}=options
				uni.request({
					method:'GET',
					url:url + '/item/search',
					data:{
						pageSize,
						pageNum,
						searchText,
					},
					header:{
						'Authorization':uni.getStorageSync('token')
					},
					success:res=>{
						// console.log(res);
						// 如果成功返回数据
						if(res.statusCode==200&&res.data.code=='00000'&&res.data.data.length!=0){
							// 判断数据是否合并
							if(this.leaveSearchInfo.length==0){
								this.leaveSearchInfo=res.data.data
							}else{
								this.leaveSearchInfo=[...this.leaveSearchInfo,...res.data.data]
							}
							if(res.data.data.length<6){
								this.status2='nomore'
							}
							this.has_history=true
						}else if(res.statusCode==200&&res.data.code=='00000'&&res.data.data.length==0){
							// 如果第一次请求就没数据 即数据长度为0
							if(this.leaveSearchInfo.length==0){
								this.has_history=false
							}else{
								// 再发送请求，但返回的数据为0
								this.status2='nomore'
							}	
						}else{
							this.status2='loading'
						}
					},
					fail:res=>{
						this.status2='loading'
					}
				})
			},
			// 搜索书籍
			serachBook(options={}){
				const {pageSize=6,pageNum=1,searchText=''}=options
				console.log(searchText);
				uni.request({
					method:'GET',
					url:url + '/user/book/search',
					data:{
						pageSize,
						pageNum,
						searchText,
					},
					header:{
						'Authorization':uni.getStorageSync('token')
					},
					success:res=>{
						console.log(res);
						// 如果成功返回数据
						if(res.statusCode==200&&res.data.code=='00000'&&res.data.data.length!=0){
							// 判断数据是否合并
							if(this.bookSearchInfo.length==0){
								this.bookSearchInfo=res.data.data
							}else{
								this.bookSearchInfo=[...this.bookSearchInfo,...res.data.data]
							}
							if(res.data.data.length<6){
								this.status3='nomore'
							}
							this.has_history=true
						}else if(res.statusCode==200&&res.data.code=='00000'&&res.data.data.length==0){
							// 如果第一次请求就没数据 即数据长度为0
							if(this.bookSearchInfo.length==0){
								this.has_history=false
							}else{
								// 再发送请求，但返回的数据为0
								this.status3='nomore'
							}	
						}else{
							this.status3='loading'
						}
					},
					fail:res=>{
						console.log(res);
						this.status3='loading'
					}
				})
			},
			// 下拉
			upper(){
				if(this.tagType=='悬赏'&&this.status1=='loading'){
					this.rewardPageNum++;
					this.searchReward({pageNum:this.rewardPageNum,keyword:this.value,types:this.rewardkeyword})
				}else if(this.tagType=='闲置'&&this.status2=='loading'){
					this.leavePageNum++;
					this.searchReward({pageNum:this.leavePageNum,searchText:this.value})
				}else if(this.tagType=='书籍'&&this.status3=='loading'){
					this.bookPageNum++
					this.serachBook({pageNum:this.bookPageNum,searchText:this.value})
				}
			},
			// 初始化数据
			initializeData(){
				this.is_histroy=false
				this.has_history=true
				this.rewardSearchInfo=[]
				this.leaveSearchInfo=[]
				this.bookSearchInfo=[]
				this.status1='loading'
				this.status2='loading'
				this.status3='loading'
				this.rewardPageNum=1
				this.leavePageNum=1
				this.bookPageNum=1
			}
		},
	computed:{
		...mapState("message", ["newChat"]),
		// historyList(){
		// 	console.log('computed');
		// 	// 将历史记录分块展示 仅当tagType和记录中的type相等时
		// 	return (wx.getStorageSync('searchHistory')||[]).filter(item=>item.type==this.tagType)
		// },
	},
	watch:{
		value(){
			if(this.value===''){
				this.is_histroy=true
				this.rewardSearchInfo=[]
				this.leaveSearchInfo=[]
				this.bookSearchInfo=[]
			}
		},
		newChat: {
		  deep:true,
		  handler() {
		    this.isShow = true;
		    setTimeout(() => {
		      this.isShow = false;
		    }, 2000);
		  },
		},
	},
}
</script>

<style lang="scss" scoped>
	page{
		height: 100vh;
		display: flex;
		
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
				margin: auto 0;
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
				background-color: #E4E0E0;
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