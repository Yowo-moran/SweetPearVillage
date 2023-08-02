<template>
	<view class="scroll">
		<!-- 添加上下滑动区 -->
		<scroll-view scroll-y="true"class="demo-scroll-block">
			<listItem v-for="item in 10" :tagName="tagName"></listItem>
		</scroll-view>
	</view>
</template>

<script>
	import listItem from './listItem/listItem.vue';
	export default {
	components:{listItem},
	props:{
		tagName:String,
		default:'悬赏'
	},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.scroll{
		height: 100%;
		flex: 1;
		box-sizing: border-box;
	}
	.demo-scroll-block {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
