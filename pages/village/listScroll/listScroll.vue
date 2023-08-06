<template>
	<!-- 添加左右滑动区 一定要设置高度为100% -->
	<!-- 注册滑动事件 -->
	<swiper style="height:100%" @change="skipChange" :current="activeIndex" >
		<swiper-item  v-for="(item,indexone) in 3" :key="indexone" @touchmove.stop>
			<!-- listCard -->
			<view class="scroll">
				<!-- 添加上下滑动区 -->
				<scroll-view scroll-y="true" class="demo-scroll-block" @scrolltolower="upper">
					<!-- 先判断后循环 v-if和v-for一起使用会造成性能问题 -->
					<view v-if="tagName==='悬赏'">
						<listCardReward  v-for="(item,index) in 10" :key="index"></listCardReward>
						<u-loadmore :status="status" />
					</view>
					<view v-else-if="tagName==='书籍'">
						<listCardBook v-for="(item,index) in 10" :key="index" ></listCardBook>
					</view>
					<view  v-else-if="tagName==='闲置'">
						<listCardLeave v-for="(item,index) in 10" :key="index"></listCardLeave>
					</view>
				</scroll-view>
			</view>
		</swiper-item>
	</swiper>
	
	
</template>
<script>
	import listCardReward from '../components/listcardReward.vue';
	import listCardBook from '../components/listCardBook.vue';
	import listCardLeave from '../components/listcardLeave.vue';
	export default {
		components:{listCardReward,listCardBook,listCardLeave},
		props:{
			activeIndex:{
				type:Number,
				default:0
			},
			tagName:{
				type:String,
				default:'悬赏'
			}
		},
		data() {
			return {
				status:'loading'
			}
		},
		mounted(){
			console.log('mounted');
		},
		methods: {
			skipChange(e){
				const {current}=e.detail
				this.activeIndex=current
			},
			// 触发下拉
			upper(){
				console.log('下拉刷新');
			}
		},
		computed:{
			// 点击历史记录标签时 
			currenthistoryTag(){
				console.log(this.$store.state.village.currenthistoryTag);
				// this.currenthistoryTag=..
				return this.$store.state.village.currenthistoryTag||''
			},
			// 历史记录发生改变时 即点击搜索时 请求数据 注意当变为空数组时不需要发请求
			historyList(){
				console.log(this.$store.state.village.historyList[0]);
			},
			// 选中关键字
			keywordTag(){
				console.log(this.$store.state.village.keywordTag);
			}
		},
		watch:{
			// 点击tabbar 请求新数据
			tagName(newvalue){
				console.log(newvalue);
			},
		}
	}
</script>

<style scoped>
	.scroll{
		height: 100%;
		flex: 1;
		box-sizing: border-box;
	}
	.demo-scroll-block {
		width: 100%;
		height: 100%;
		display: flex;
	}
		

</style>
