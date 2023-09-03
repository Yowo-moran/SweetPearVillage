<template>
	<view class="searchBar">
		<view class="search" @click="jump">
			<image class="searchIcon" src="../../../static/搜索-黑.png"></image> 
			<view class="searchText">{{searchValue}}</view>
		</view>
		<view class="setting" @click="show = true" v-if="tagName=='悬赏'||tagName=='书籍'">
			<image class="settingIcon" src="../../../static/设置.png" ></image> 
		</view>
		<view class="upopup">
		<u-popup :show="show"  :safeAreaInsetBottom="false"   style="padding-bottom: 0;  " v-if="tagName=='悬赏'">
			<view class="chooseTag" >
				<view class="title">分类</view>
				<view class="contentOne">
					<view v-for="item,index in tags" :key="index" @click="chooseTag(index,item)" :style="{color:(currentTags.indexOf(index)!=-1 ? '#6F876F': '#fff')}">{{item}}</view>
				</view>
				<view @click="rewardprice" class="price">价格 
					<image src="../../../static/sort.png" v-if="priceSortReward==0"></image>
					<image src="../../../static/sort-up.png"  v-if="priceSortReward==1"></image>
					<image src="../../../static/sort-down.png"  v-if="priceSortReward==2"></image>
				</view>
				<button @click="submit">确定</button>
			</view>
		</u-popup>
		<u-popup :show="show" :safeAreaInsetBottom="false"   style="padding-bottom: 0; " v-else-if="tagName=='书籍'">
			<view class="chooseTag">
				<view class="title">分类</view>
				<view class="contentTwo">
					<view class="options">学院<view class="selector" @click="collegeShow=true">{{collegeValue}}</view></view>
					<view class="options">专业<view class="selector" @click="majorityShow=true">{{majorityValue}}</view></view>
					<view class="options">年级<view class="selector" @click="gradeShow=true">{{gradeValue}}</view></view>
				</view>
				<view @click="bookprice" class="price">价格
					<image src="../../../static/sort.png" v-if="priceSortBook==0"></image>
					<image src="../../../static/sort-up.png"  v-if="priceSortBook==1"></image>
					<image src="../../../static/sort-down.png"  v-if="priceSortBook==2"></image>
				</view>
				<button @click="bookSubmit">确定</button>
			</view>
		</u-popup>
		</view>
	   <u-picker
		  :show="collegeShow"
		  :columns="colleges"
		  title="请选择学院"
		  @cancel="collegeShow = false"
		  @confirm="collegeSelect"
		  :closeOnClickOverlay="true"
		  @close="collegeShow = false">
		</u-picker>
		<u-picker
		  :show="majorityShow"
		  :columns="majors[majorIndex]"
		  title="请选择专业"
		  @cancel="majorityShow = false"
		  @confirm="majorSelect"
		  :closeOnClickOverlay="true"
		  @close="majorityShow = false">
		</u-picker>
		<u-action-sheet
		  :show="gradeShow"
		  :actions="grades"
		  title="请选择年级"
		  @close="gradeShow = false"
		  @select="gradeSelect">
		</u-action-sheet>
	</view>
</template>

<script>
	export default {
		props:{
			tagName:{
				type:String,
				default:'悬赏'
			},
			clearTags:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				 show:false,
				 tags:['北区快递','南区快递','邮政快递','一食堂','二食堂','南区超市','南区小吃街',
				 '北区超市','北区水果店','南区水果店','南区打印店','北区打印店','蜜雪冰城','沪上阿姨','操场','体育馆'],
				 // 悬赏页关键字
				 rewardkeyword:[],
				 currentTags:[],
				 // 书籍页关键字
				 // collegekeyword:{},
				collegeShow: false,
				collegeValue:'',
				majorityShow: false,
				majorIndex: 0,
				majorityValue:'',
				gradeShow: false,
				gradeValue:'',
				colleges: [
				  [
					"默认",
					"机械工程学院",
					"材料科学与工程学院",
					"化学化工学院",
					"海运学院",
					"管理学院",
					"艺术学院",
					"环境科学与安全工程学院",
					"理学院",
					"聋人工学院",
					"华信软件学院",
					"计算机科学与工程学院",
					"社会发展学院",
					"语言文化学院",
					"集成电路科学与工程学院",
					"电气工程与自动化学院",
					
				  ],
				],
				majors: [
					[["请先选择学院"]],
					[["默认"]],
					[
					  [
					    "机械工程及自动化",
					    "过程装备与控制工程",
					    "工业设计(造型设计)",
					    "机械电子工程",
					    "机械工程及自动化(卓越班)",
					    "机械工程",
					    "机械工程（卓越）",
					    "过程装备与控制工程（国际教育）",
					    "能源动力系统及自动化",
					    "热能与动力工程",
					    "能源与动力工程",
					    "新能源科学与工程",
					    "机械工程(国际教育)",
					    "机器人工程",
					    "智能制造工程",
					    "机械类",
					    "能源动力类",
					  ],
					],
					[
					  [
					    "材料科学与工程",
					    "材料成型及控制工程",
					    "材料物理",
					    "材料化学",
					    "功能材料",
					    "材料成型及控制工程（卓越）",
					    "材料科学与工程（卓越）",
					    "新能源材料与器件",
					    "功能材料（明理卓越创新班）",
					    "材料科学类",
					    "材料类",
					  ],
					],
					[
					  [
					    "应用化学(理)",
					    "化学工程与工艺",
					    "制药工程",
					    "生物工程",
					    "应用化学(工)",
					    "药学",
					    "应用化学（卓越）",
					    "化学工程与工艺（卓越）",
					    "化学工程与工艺（国际教育）",
					    "制药工程（国际教育）",
					    "化工与制药类",
					  ],
					],
					[
					  [
					    "航海技术",
					    "轮机工程",
					    "轮机工程",
					    "船舶电子电气工程",
					    "航海技术（卓越）",
					    "轮机工程（卓越）",
					    "轮机工程（国际教育）",
					    "土木、水利与海洋工程",
					    "交通运输",
					  ],
					],
					[
					  [
					    "信息管理与信息系统",
					    "工业工程",
					    "工商管理",
					    "工程管理",
					    "保险",
					    "工程造价",
					    "广告学",
					    "物流管理",
					    "财务管理",
					    "市场营销",
					    "保险学",
					    "工商管理（国际教育2+2）",
					    "财务管理（国际教育）",
					    "工业工程（国际教育）",
					    "物流管理（国际教育）",
					    "工商管理（国际教育）",
					    "工业工程（中外合作办学）",
					    "工商管理（中外合作办学）",
					    "工商管理（3+1）",
					    "大数据管理与应用",
					    "工商管理（高水平运动队）",
					    "管理科学与工程类",
					    "工商管理类",
					    "工业工程类",
					    "物流管理与工程类",
					    "工商管理(国际教育学院)",
					    "物流管理(国际教育学院)",
					    "财务管理(国际教育学院)",
					    "工商管理(国际教育学院)",
					    "工程管理(国际教育学院)",
					    "工商管理（辅修）",
					  ],
					],
					[
					  [
					    "艺术设计",
					    "工业设计",
					    "装饰艺术",
					    "摄影",
					    "动画",
					    "动画(中加)",
					    "视觉传达设计",
					    "环境设计",
					    "产品设计",
					    "环境设计（国际教育）",
					    "视觉传达设计（国际教育）",
					  ],
					],
					[
					  [
					    "环境工程",
					    "安全工程",
					    "环境科学",
					    "资源环境与城乡规划管理",
					    "自然地理与资源环境",
					    "资源循环科学与工程",
					    "环境工程（卓越）",
					    "安全工程（卓越）",
					    "应急技术与管理",
					    "环境与安全类",
					    "环境科学与工程类",
					    "安全科学与工程类",
					  ],
					],
					[["应用物理学", "数学与应用数学"]],
					[
					  [
					    "计算机科学与技术(聋工)",
					    "艺术设计",
					    "艺术设计",
					    "产品设计",
					    "服装与服饰设计",
					    "自动化(聋工全纳)",
					    "电子信息工程(聋工全纳)",
					    "工程造价(聋工全纳)",
					    "财务管理(聋工全纳)",
					    "网络工程（聋工）",
					    "环境设计（聋工全纳）",
					    "数据科学与大数据技术（聋工）",
					    "计算机类",
					    "设计学类",
					  ],
					],
					[["软件工程", "计算机科学与技术(专科起点)", "软件工程(专科起点)"]],
					[
					  [
					    "信息与计算科学",
					    "计算机科学与技术",
					    "信息安全",
					    "网络工程",
					    "物联网工程",
					    "计算机科学与技术（中加）",
					    "数据科学与大数据技术",
					    "计算机科学与技术（国际教育）",
					    "信息安全（国际教育）",
					  ],
					],
					[["社会工作", "社会学", "老年学"]],
					[
					  [
					    "英语",
					    "日语",
					    "汉语言文学",
					    "汉语言文学（国际教育）",
					    "预科",
					    "英语（国际教育）",
					  ],
					],
					[
					  [
					    "通信工程",
					    "电子科学与技术",
					    "集成电路设计与集成系统",
					    "微电子科学与工程",
					    "光电信息科学与工程",
					    "电波传播与天线",
					    "电子信息工程",
					    "通信工程（国际教育）",
					    "电子信息工程（卓越）",
					    "集成电路设计与集成系统（卓越）",
					    "电子信息类",
					  ],
					],			
				  ],
				grades: [
				  {
					  name:"默认",
				  },
				  {
				    name: "大一",
				  },
				  {
				    name: "大二",
				  },
				  {
					name:'大三'
				  },
				  {
					name:'大四'
				  }
				],
				priceSortReward:0,
				priceSortBook:0,
				searchValue:'搜索食堂、快递外卖代收点'
			}
		},
		methods: {
			// 路由跳转
			jump(){
				uni.navigateTo({
					url: `/pages/village/search/search?tagName=${this.tagName}&rewardkeyword=${JSON.stringify(this.rewardkeyword)}`
				  });
			},
			chooseTag(index,item){
				// 判断选中还是取消
				const oldIndex=this.currentTags.indexOf(index)
				if(oldIndex==-1){
					this.currentTags.push(index)
					this.rewardkeyword.push(item)
				}else{
					this.currentTags.splice(oldIndex,1)
					this.rewardkeyword.splice(oldIndex,1)
				}
			},
			//关闭遮罩层
			closePopup(event) {
				this.show=false
			},
			// 选择框选择之后
			collegeSelect(e){
				this.collegeValue=e.value[0]
				this.majorIndex = e.indexs[0]+1;
				this.collegeShow=false
				this.majorityValue="默认"
			},
			majorSelect(e){
				if (e.value[0] !== "请先选择学院") {
				 	this.majorityValue=e.value[0]
				}
				this.majorityShow = false;
			},
			gradeSelect(e){
				this.gradeValue=e.name
			},
			// 点击确定
			submit(){
				console.log(this.rewardkeyword,this.priceSortReward);
				// 将数组深拷贝过去 并入价格排序参数
				this.$emit('rewardKeyword',JSON.parse(JSON.stringify([...this.rewardkeyword,this.priceSortReward])))
				// 将选中的标签传给父组件
				this.show=false
			},
			bookSubmit(){
				const{collegeValue,majorityValue,gradeValue}=this
				let collegekeyword={collegeValue,majorityValue,gradeValue,sortBys:this.priceSortBook}
				this.$emit('bookKeyword',JSON.parse(JSON.stringify(collegekeyword)))
				this.show=false
			},
			// 悬赏价格排序
			rewardprice(){	
				this.priceSortReward=(this.priceSortReward+1)%3
			},
			// 书籍价格排序
			bookprice(){
				this.priceSortBook=(this.priceSortBook+1)%3
			}
		},
		watch:{
			tagName(){
				if(this.tagName=='悬赏'){
					this.searchValue='搜索食堂、快递外卖代收点'
				}else if(this.tagName=='书籍'){
					this.searchValue='搜索书名、专业、学院'
				}else if(this.tagName=='闲置'){
					this.searchValue='搜索物品名称'
				}
			},
			clearTags(){
				this.currentTags=[]
				this.rewardkeyword=[]
				this.collegeValue=''
				this.majorityValue=''
				this.gradeValue='',
				this.majorIndex=0
				this.priceSortReward=0
				this.priceSortBook=0
				if(this.tagName=='悬赏'){
					this.$emit('rewardKeyword',JSON.parse(JSON.stringify([...this.rewardkeyword,this.priceSortReward])))
				 }
				else if(this.tagName=='书籍'){
					const{collegeValue,majorityValue,gradeValue}=this
					let collegekeyword={collegeValue,majorityValue,gradeValue,sortBys:this.priceSortBook}
					this.$emit('bookKeyword',JSON.parse(JSON.stringify(collegekeyword)))
				}
				
				// 由于仅仅在点击确定时才会传递标签关键字，所以刷新后关键字还保留原来的，这里要手动刷新一下
				// this.$emit('rewardKeyword',JSON.parse(JSON.stringify([...this.rewardkeyword,this.priceSortReward])))
				// this.$emit('bookKeyword',JSON.parse(JSON.stringify(this.collegekeyword)))
			}
		}
}
</script>

<style lang="scss" scoped>
	.searchBar{
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		padding: 0 10rpx;
		width: 100%;
		height: 91rpx;
		background-color: #fff;
		box-sizing: border-box;
		.search{
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			height: 60rpx;
			width: 85%;
			border-radius: 60rpx;
			background-color:#E3FBE3;
			.searchIcon{
				margin-right: 20rpx;
				width: 36rpx;
				height: 36rpx;
				// border:1px solid red;
			}
			.searchText{
				font-size: 32rpx;
				color: #999;
			}
		}
		.setting{
			width: 12%;
			height: 100%;
			padding: 20rpx;
			box-sizing: border-box;
			// background-color: green;
			image{
				width: 100%;
				height: 100%;
			}
		}
	.upopup{
		.chooseTag{
			width: 100%;
			padding-bottom: 80rpx ;
			 // height: 600rpx;
			background-color: #BFC0A2;
			.title{
				margin: 20rpx auto;
				width: 100rpx;
				height: 10%;
				font-size: 20px;
				color: #fff;
			}
			.contentOne{
				display: flex;
				align-content: space-around;
				justify-content: flex-start;
				flex-wrap: wrap;
				padding: 0 40rpx;
				margin-bottom: 25px;
				height: 80%;
				box-sizing: border-box;
				view{
					border-radius: 10px;
					color: #fff;
					margin: 8px 5px;
					height: 35px;
					padding: 0 12px;
					line-height: 35px;
					background-color: #AEAF73;
					box-sizing: border-box;
				}
			}
			.contentTwo{
				margin-bottom: 25px;
				.options{
					display: flex;
					// background-color: pink;
					height: 50rpx;
					margin-left: 50rpx;
					margin: 30rpx;
					line-height: 50rpx;
					color: black;
					.selector{
						position: relative;
						margin-left: 40rpx;
						padding: 10rpx 20rpx;
						width: 70%;
						height: 46rpx;
						line-height: 32rpx;
						border: 1px solid #6F876F;
						border-radius: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						/* 显示的行 */
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						box-sizing: border-box;
					}
					.selector::after{
					  content:'';
					  display: block;
					  width: 30rpx;
					  height: 30rpx;
					  // background-image无法引用本地资源，故需要用网络地址
					  background-image: url(../../../static/下拉框.png);
					  background-size: 100% 100%;
					  position: absolute;
					  bottom: 0;
					  right:10rpx;
					}
				}
			}
			.price{
				position: absolute;
				bottom: 10rpx;
				left: 20rpx; 
				height: 90rpx;
				width: 100rpx;
				padding: 0 28rpx;
				text-align: center;
				line-height: 90rpx;
				background-color: #BFC0A2;
				box-shadow: 0 2px 4px rgba(0, 0, 0, .32), 0 0 6px rgba(0, 0, 0, .20);
				image{
					margin-left: 5rpx;
					height: 30rpx;
					width: 30rpx;
				}
			
			}
			button{
				position: absolute;
				bottom: 10rpx;
				right: 10rpx;
				background-color: #BFC0A2;
				box-shadow: 0 2px 4px rgba(0, 0, 0, .32), 0 0 6px rgba(0, 0, 0, .20);
			}
		}
		.u-safe-area-inset-bottom {
			padding-bottom: 12px;
			// padding-bottom: constant(safe-area-inset-bottom);  
			// padding-bottom: env(safe-area-inset-bottom); 
		}
	}
		
	}
</style>
