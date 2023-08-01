<template>
	<view class="navbar">
		<view class="tab">
			<view  v-for="item,index in tabItems" :key="index" @click="clickTab(item,index)" :class="{active:activeIndex===index}">
			{{item}}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabItems:['悬赏','书籍','闲置'],
				activeIndex:0
			}
		},
		methods: {
			// 点击标签时，动态添加类，突出显示
			// 且通知展示区，即使切换
			clickTab(item,index){
				this.activeIndex=index
				this.$emit('changeTagNum',{
					tagData:item,
					index:index
				})
			}
		}
	}
</script>

<style lang="scss">
	.navbar{
		width:100%;
		height: 80rpx;
		// background-color: pink;
		.tab{
			display: flex;
			justify-content: space-around;
			align-items: center;
			// background-color: green;
			font-size: large;
			height: 100%;
			width: 100%;
			.active{
				border-bottom: 10rpx solid #8FBC8F;
			}
		}
	}

</style>
