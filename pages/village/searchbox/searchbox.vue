<template>
	<view class="searchBar">
		<navigator class="search" :url="'/pages/village/search/search?tagName='+tagName">
			<image class="searchIcon" src="../../../static/搜索-黑.png"></image> 
			<view class="searchText">uniapp\vue</view>
		</navigator>
		<view class="setting" @click="show = true" v-if="tagName=='悬赏'||tagName=='书籍'">
			<image class="settingIcon" src="../../../static/设置.png" ></image> 
		</view>
		<view class="upopup">
		<u-popup :show="show"  :safeAreaInsetBottom="false" @click.native="closePopup"  style="padding-bottom: 0;  " v-if="tagName=='悬赏'">
			<view class="chooseTag" >
				<view class="title">分类</view>
				<view class="contentOne">
					<view v-for="item,index in tags" @click="chooseTag(index)" :style="{color:(currentTags.indexOf(index)!=-1 ? '#6F876F': '#fff')}">{{item}}</view>
				</view>
				<button @click="show=false">确定</button>
			</view>
		</u-popup>
		<u-popup :show="show" :safeAreaInsetBottom="false" @click.native="closePopup"  style="padding-bottom: 0; " v-else-if="tagName=='书籍'">
			<view class="chooseTag">
				<view class="title">分类</view>
				<view class="contentTwo">
					<view class="options">学院<view class="selector" @click="collegeShow=true">{{collegeValue}}</view></view>
					<view class="options">专业<view class="selector" @click="majorityShow=true">{{majorityValue}}</view></view>
					<view class="options">年级<view class="selector" @click="gradeShow=true">{{gradeValue}}</view></view>
				</view>
				<button @click="show=false">确定</button>
			</view>
		</u-popup>
		</view>
		<u-action-sheet
		  :show="collegeShow"
		  :actions="colleges"
		  title="请选择学院"
		  @close="collegeShow = false"
		  @select="collegeSelect">
		</u-action-sheet>
		<u-action-sheet
		  :show="majorityShow"
		  :actions="majoritys"
		  title="请选择学院"
		  @close="majorityShow = false"
		  @select="majorityelect">
		</u-action-sheet>
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
			}
		},
		data() {
			return {
				 show:false,
				 tags:['北区快递','南区快递','邮政快递','一食堂','二食堂','南区超市','南区小吃街',
				 '北区超市','北区水果店','南区水果店','南区打印店','北区打印店','蜜雪冰城'
				 ],
				 currentTags:[],
				collegeShow: false,
				collegeValue:'请选择学院',
				majorityShow: false,
				majorityValue:'请选择专业',
				gradeShow: false,
				gradeValue:'请选择年级',
				colleges: [
				  {
				    name: "计算机科学与工程学院",
				  },
				  {
				    name: "社会发展学院",
				  },
				  {
					name:'默认'
				  }
				],
				majoritys: [
				  {
				    name: "计算机科学与技术",
				  },
				  {
				    name: "数据科学与大数据技术",
				  },
				  {
					name:'默认'
				  }
				],
				grades: [
				  {
				    name: "大一",
				  },
				  {
				    name: "大二",
				  },
				  {
					name:'大三'
				  }
				],
			}
		},
		methods: {
			chooseTag(index){
				console.log(index);
				const oldIndex=this.currentTags.indexOf(index)
				if(oldIndex==-1){
					this.currentTags.push(index)
				}else{
					this.currentTags.splice(oldIndex,1)
				}
			},
			//关闭遮罩层
			closePopup(event) {
				this.show=false
			},
			// 选择框选择之后
			collegeSelect(e){
				this.collegeValue=e.name
			},
			majorityelect(e){
				this.majorityValue=e.name
			},
			gradeSelect(e){
				this.gradeValue=e.name
			}
		}
		}
</script>

<style lang="scss">
	
	.searchBar{
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		padding: 0 10rpx;
		width: 100%;
		height: 90rpx;
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
				margin-bottom: 20px;
				height: 80%;
				box-sizing: border-box;
				view{
					border-radius: 10px;
					color: #fff;
					margin: 8px 5px;
					height: 35px;
					padding: 8px 12px;
					background-color: #AEAF73;
					box-sizing: border-box;
				}
			}
			.contentTwo{
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
						height: 50rpx;
						line-height: 30rpx;
						border: 1px solid #6F876F;
						border-radius: 10rpx;
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
