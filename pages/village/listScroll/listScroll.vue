<template>
	<!-- 添加左右滑动区 一定要设置高度为100% -->
	<!-- 注册滑动事件 -->
	<swiper style="height:100%" @change="skipChange" :current="activeIndex" >
		<swiper-item  v-for="(item,indexone) in 3" :key="indexone" @touchmove.stop>
			<!-- listCard -->
			<view class="scroll">
				<!-- 添加上下滑动区 -->
				<scroll-view scroll-y="true" class="demo-scroll-block" @scrolltolower="lower"
				refresher-enabled="true" :refresher-threshold="45" :refresher-triggered="triggered" refresher-background="#fff" 
			 @refresherrefresh="onRefresh">
					<!-- 先判断后循环 v-if和v-for一起使用会造成性能问题 -->
					<view v-if="tagName==='悬赏'">
						<u-loadmore status="loading" v-if="isLoading"/>
						<listCardReward  v-for="item in rewardInfo" :key="item.id" :rewardInfo="item"></listCardReward>
						<u-loadmore :status="rewardstatus" />
					</view>
					<view v-else-if="tagName==='书籍'">
						<listCardBook v-for="item in bookInfo" :key="item.id" :bookInfo="item"></listCardBook>
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
			bookkeywords:{
				type:Object,
				default:{}
			},
		},
		data() {
			return {
				rewardpage:1,
				bookpage:1,
				leavepage:1,
				// 书籍页关键字
				college:'',
				major:'',
				grade:'',
				BooksortBy:'',
				triggered:false,
				curRewardKeyword:[],
				isFirstReward:true,
				isFirstBook:true,
				isFirstLeave:true
			}
		},
		mounted(){
			this.$store.dispatch('village/getRewardInfo')
			this.isFirstReward=false
		},
		methods: {
			skipChange(e){
				const {current}=e.detail
				this.activeIndex=current
			},
			onRefresh(){
				this.triggered= true;
				if(this.tagName=='悬赏'){
					// 区分是未选择任何标签和价格排序就刷新还是选择标签和价格排序的情况下的刷新
					if(this.curRewardKeyword.length==0){
						this.$store.dispatch('village/getRewardInfo',{isClear:true})
					}else{
						this.$emit('clearTag',this.tagName)
						this.rewardpage=1;
						this.curRewardKeyword=[]
					}
				}else if(this.tagName=='书籍'){
					const {college,major,grade,BooksortBy}=this
					if(college==''&&major==''&&grade==''&&BooksortBy==''){
						this.$store.dispatch('village/getBookInfo',{isClear:true})
					}else{
						this.$emit('clearTag',this.tagName)
						this.college=''
						this.major=''
						this.grade=''
						this.BooksortBy=''
						this.bookpage=1
					}
				}else if(this.tagName=='闲置'){
					this.leavepage=1
					this.$store.dispatch('village/getLeaveInfo',{isClear:true})
				}
				setTimeout(() => {
					this.triggered = false;
				}, 300)
			},
			// 触发下拉
			lower(){
				if(this.tagName=='悬赏'&&this.rewardstatus=='loading'){
					this.rewardpage++;
					// 这里不能改变原数组的值，否则一直执行这个函数
					let priceSort=[...this.curRewardKeyword].pop()||0
					let rewardKeywordTag=[...this.curRewardKeyword].slice(0,-1)
					// let sortBy=(priceSort==0||priceSort==1)?'amount_asc':'amount_desc'
					let sortBy=(priceSort==0?'':priceSort==1?'amount_asc':'amount_desc')
					// console.log(this.curRewardKeyword,priceSort,sortBy);
					this.$store.dispatch('village/getRewardInfo',{pageNum:this.rewardpage,pageSize:6,types:this.rewardKeywordTag,sortBy})
				}else if(this.tagName=='书籍'&&this.bookstatus=='loading'){
					this.bookpage++
					const {college,major,grade,BooksortBy}=this
					// console.log(college,major,grade,BooksortBy);
					this.$store.dispatch('village/getBookInfo',{page:this.bookpage,pageSize:6,college,major,grade,sortBy:BooksortBy})
				}else if(this.tagName=='闲置'&&this.leavestatus=='loading'){
					this.leavepage++
					// console.log(this.leavepage);
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
				if(this.tagName=='悬赏'&&this.isFirstReward){
					// 判断数据是否为空，若不是则不会再自动请求
						this.isFirstReward=false
						console.log('qingqiu',this.isFirstReward);
						console.log(this.rewardInfo);
						this.rewardpage=1;
						this.$store.dispatch('village/getRewardInfo')	
				}else if(this.tagName=='书籍'&&this.isFirstBook){
						this.isFirstBook=false
						console.log(this.bookInfo);
						this.bookpage=1
						this.$store.dispatch('village/getBookInfo')
				}else if(this.tagName=='闲置'&&this.isFirstLeave){
						this.isFirstLeave=false
						this.leavepage=1
						this.$store.dispatch('village/getLeaveInfo')
					
				}
			},
			// 悬赏页标签改变时
			rewardKeywords:{
				deep:true,
				handler:function(){
					console.log('changed');
					this.rewardpage=1;
					// 这里不能改变原数组的值，否则一直执行这个函数
					// 在当前组件保存一下值
					this.curRewardKeyword=this.rewardKeywords
					let priceSort=[...this.curRewardKeyword].pop()||0
					let rewardKeywordTag=[...this.curRewardKeyword].slice(0,-1)||[]
					// 若为空数组则传递空字符串
					if(rewardKeywordTag.length==0) rewardKeywordTag=''
					let sortBy=(priceSort==0?'':priceSort==1?'amount_asc':'amount_desc')
					this.$store.dispatch('village/getRewardInfo',{types:rewardKeywordTag,isClear:true,sortBy})
				}
		
			},
			bookkeywords:{
				deep:true,
				handler:function(){
					this.bookpage=1
					let newbookkeyword=JSON.parse(JSON.stringify(this.bookkeywords))
					// 若为默认，则变为空字符串
					for (let key in newbookkeyword) {
					   if (newbookkeyword.hasOwnProperty(key)) {
					     if (newbookkeyword[key] === '默认') {
					       newbookkeyword[key] = '';
					     }
					   }
					 }
					const {collegeValue,gradeValue,majorityValue,sortBys}=newbookkeyword
					this.BooksortBy=(sortBys==1?1:sortBys==2?0:'')
					this.major=majorityValue
					this.college=collegeValue
					this.grade=gradeValue
					this.$store.dispatch('village/getBookInfo',{college:collegeValue,major:majorityValue,grade:gradeValue,isClear:true,sortBy:this.BooksortBy})
				}
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
