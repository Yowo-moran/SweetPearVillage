<template>
	<view class="surface">
		<scroll-view scroll-y="true"  class="scroller">
			<view class="message">
				<h3>欢迎加入甜梨村的大家庭！！！</h3>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.surface{
		
		.scroller{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content:flex-start;
			background: #fcecd0;
			width: 100vw;
			height:100vh;
			padding-top: 20px;
			
			.message{
				margin: 0 auto;
				margin-bottom: 10px;
				padding: 10px;
				box-sizing: border-box;
				width: 90%;
				border-radius: 10px;
				background-color: #fff;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				word-break: break-all;
			}
		}
		
		
	}
</style>
