<template>
	<view>
		<!-- 头部 -->
		<view class="header">
			<!-- 自定义导航栏 -->
			<navbar @changeTagNum="changeTagNum"></navbar>
			<search></search>
		</view>
		<view style="height: 80px;"></view>
		<!-- 滑动区 -->
		<listScroll></listScroll>
	</view>
</template>

<script>
	import navbar from './navbar/navbar.vue';
	import search from './search/search.vue';
	import listScroll from './listScroll/listScroll.vue'
	export default {
		components:{navbar,search,listScroll},
		data() {
			return {
				
			};
		},
		methods:{
			changeTagNum(obj){
				console.log(obj);
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFDAB9;
	}
	.header{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		background-color: #fff;
	}
</style>
