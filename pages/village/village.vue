<template>
	<view style="height: 100vh; display: flex; flex-direction: column;">
		<!-- 头部 -->
		<InformVc v-if="isShow" ></InformVc>
		<view class="header">
			<!-- 自定义导航栏 -->
			<navbar @changeTagNum="changeTagNum" :tabIndex="tabIndex" u></navbar>
			<searchbox :tagName="tagName" :clearTags="clearTags"@rewardKeyword="rewardKeyword" @bookKeyword="bookKeyword"></searchbox>
		</view>
		<!-- 将内容撑开 -->
		<view style="height: 160rpx;"></view>
		 <!-- 滑动区 -->
		<listScroll @skipChange="skipChange" @clearTag="clearTag":activeIndex="activeIndex" :tagName="tagName" :rewardKeywords="rewardKeywords" :bookkeywords="bookkeywords"  style="flex-grow: 1;"></listScroll>
<!-- 		<listScroll @skipChange="skipChange" :activeIndex="activeIndex" :tagName="tagName" ></listScroll> -->
	</view>
</template>

<script>
	import InformVc from "@/components/InformVc.vue";
	import {mapState } from "vuex";
	import navbar from './navbar/navbar.vue';
	import listScroll from './listScroll/listScroll.vue'
	import searchbox from './searchbox/searchbox.vue'
	export default {
		components:{navbar,listScroll,searchbox,InformVc},
		mounted(){
			console.log(uni.getStorageSync('token'));
		},
		data() {
			return {
				// 当前标签值
				tabIndex:0,
				// 改变的标签值
				activeIndex:0,
				// 当前标签名称
				tagName:'悬赏',
				rewardKeywords:[],
				bookkeywords:{},
				clearTags:true,
				isShow:false
			};
		},
		methods:{
			changeTagNum(obj){
				const {tagData,index}=obj
				this.tagName=tagData
				this.activeIndex=index
			},
			skipChange(cur){
				this.tabIndex=cur
			},
			// 子传父 组件传值 悬赏页标签
			rewardKeyword(item){
				 this.rewardKeywords=item
			},
			bookKeyword(obj){
				this.bookkeywords=obj
			},
			clearTag(){
				this.clearTags=!this.clearTags
			}
		},
		computed:{
			...mapState("message", ["newChat"]),
		},
		watch:{
			newChat(){
				this.isShow=true
				setTimeout(()=>{
					this.isShow=false
				},2000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.header{
		// 消除顶部空隙
		margin-top: -1rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		background-color: #fff;
	}
</style>
