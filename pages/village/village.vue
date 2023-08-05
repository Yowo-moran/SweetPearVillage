<template>
	<view style="height: 100vh;">
		<!-- 头部 -->
		<view class="header">
			<!-- 自定义导航栏 -->
			<navbar @changeTagNum="changeTagNum" :tabIndex="tabIndex" u></navbar>
			<searchbox :tagName="tagName"></searchbox>
		</view>
		<!-- 将内容撑开 -->
		<view style="height: 160rpx;"></view>
		 <!-- 滑动区 -->
		<listScroll @skipChange="skipChange" :activeIndex="activeIndex" :tagName="tagName"></listScroll>
	</view>
</template>

<script>
	import navbar from './navbar/navbar.vue';
	import listScroll from './listScroll/listScroll.vue'
	import searchbox from './searchbox/searchbox.vue'
	export default {
		components:{navbar,listScroll,searchbox},
		data() {
			return {
				// 当前标签值
				tabIndex:0,
				// 改变的标签值
				activeIndex:0,
				// 当前标签名称
				tagName:'悬赏'
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
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.header{
		// 消除顶部空隙
		margin-top: -1rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		background-color: #fff;
	}
</style>
