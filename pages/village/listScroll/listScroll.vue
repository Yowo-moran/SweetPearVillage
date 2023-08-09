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
						<listCardReward  v-for="item in rewardInfo" :key="item.id" :rewardInfo="item"></listCardReward>
						<u-loadmore :status="rewardstatus" />
					</view>
					<view v-else-if="tagName==='书籍'">
						<listCardBook v-for="item in bookInfo" :key="item.userId" :bookInfo="item"></listCardBook>
						<u-loadmore :status="bookstatus" />
					</view>
					<view  v-else-if="tagName==='闲置'">
						<listCardLeave v-for="item in leaveInfo" :key="item.id" :leaveInfo="item"></listCardLeave>
						<u-loadmore :status="leavestatus" />
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
	import {mapState} from 'vuex'
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
			},
			rewardKeywords:{
				type:Array,
				default:[]
			},
			leaveKeywords:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				rewardpage:1,
				bookpage:1,
				leavepage:1
			}
		},
		mounted(){
			this.$store.dispatch('village/getRewardInfo')
		},
		methods: {
			skipChange(e){
				const {current}=e.detail
				this.activeIndex=current
			},
			// 触发下拉
			upper(){
				if(this.tagName=='悬赏'&&this.rewardstatus=='loading'){
					this.rewardpage++;
					console.log(this.rewardpage);
					this.$store.dispatch('village/getRewardInfo',{pageNum:this.rewardpage,pageSize:6})
				}else if(this.tagName=='书籍'&&this.bookstatus=='loading'){
					this.bookpage++
					console.log(this.bookpage);
					this.$store.dispatch('village/getBookInfo',{page:this.bookpage,pageSize:6})
				}else if(this.tagName=='闲置'&&this.leavestatus=='loading'){
					this.leavepage++
					console.log(this.leavepage);
					this.$store.dispatch('village/getLeaveInfo',{pageNum:this.leavepage,pageSize:6})
				}
			},
		},
		computed:{
			...mapState({
				rewardInfo:state=>state.village.rewardInfo,
				rewardstatus:state=>state.village.rewardstatus,
				bookInfo:state=>state.village.bookInfo,
				bookstatus:state=>state.village.bookstatus,
				leaveInfo:state=>state.village.leaveInfo,
				leavestatus:state=>state.village.leavestatus
			})
		},
		watch:{
			// 点击tabbar 请求新数据
			tagName(){
				if(this.tagName=='悬赏'){
					// 判断数据是否为空，若不是则不会再自动请求
					if(this.rewardInfo.length==0){
						console.log(this.rewardInfo);
						this.rewardpage=1;
						this.$store.dispatch('village/getRewardInfo')
					}				
				}else if(this.tagName=='书籍'){
					if(this.bookInfo.length==0){
						console.log(this.bookInfo);
						this.bookpage=1
						this.$store.dispatch('village/getBookInfo')
					}
				}else if(this.tagName=='闲置'){
					if(this.leaveInfo.length==0){
						this.leavepage=1
						this.$store.dispatch('village/getLeaveInfo')
					}
					
				}
			},
			// 悬赏页标签改变时
			rewardKeywords(){
				if(this.rewardKeywords.length==0){
					this.rewardKeywords=''
				}
				this.$store.dispatch('village/getRewardInfo',{types:this.rewardKeywords,isSearch:true})
			},
			leaveKeywords(){
				const {college,major,grade}=this.leaveKeywords
				this.$store.dispatch('village/getBookInfo',{college,major,grade,isSearch:true})
			}
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
