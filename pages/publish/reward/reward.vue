<template>
	<view class="body">
		
		<u-navbar leftText="悬赏" 
		:autoBack="true" 
		:bgColor="bgColor" 
		placeholder> </u-navbar>
		
		<u-form :labelStyle="labelStyle" :model="model1" labelWidth="100">
			<u-form-item prop="userInfo.content">
				<span >悬赏内容：</span>
				<u--textarea v-model="model1.userInfo.content" 
				placeholder="请输入悬赏内容" 
				count 
				border="none"
				></u--textarea>
			</u-form-item>
			
			
			<u-form-item label="赏金:" prop="userInfo.price">
				<u--input placeholder="请输入金额" 
				type="number"
				border="none"
				v-model="model1.userInfo.price"></u--input>
			</u-form-item>
			
			<u-form-item label="地点:"
			@click="showPlace = true"
			prop="userInfo.place"
			
			>
				<u--input
					v-model="model1.userInfo.place"
					placeholder="请选择地点"
					border="none"
				></u--input>
				<u-icon
					slot="right"
					name="arrow-down"
				></u-icon>
			</u-form-item>
			
			<u-form-item label="收货地址:" prop="userInfo.getPlace">
				<u--input placeholder="请输入收货地址"
				border="none"
				v-model="model1.userInfo.getPlace">
				</u--input>
			</u-form-item> 
		</u-form>
		
		<!-- <u-form>
			<u-form-item>
				<span >悬赏内容：</span>
				<u--textarea 
				placeholder="请输入悬赏内容" 
				count height="100px"
				></u--textarea>
			</u-form-item>
			<u-form-item>
				<span>赏金:</span>
				<u--input placeholder="请输入金额" type="number"></u--input>
			</u-form-item>
			<u-form-item>
				<span>地点:</span>
				<u--input type="text" placeholder="请输入地点,可选择" ></u--input>
				
			</u-form-item>
			<u-form-item>
				<span>收货地址:</span>
				<u--input placeholder="请输入收货地址"></u--input>
			</u-form-item>
		</u-form> -->	
			
			
			
		
		
		<view class="bottom">
			<button>发布</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor:"#d6d7b9",
				showPlace:false,
				labelStyle:{
					color:'#626341',
					
				},
				model1: {
					userInfo: {
						content:'',
						price:'',
						place: '',
						getPlace:'',
						
					},
				},
			};
		},
		 methods:{
		      
		    }
	}
</script>

<style lang="scss">
.bottom{
	display: flex;
	
	// flex-direction: row-reverse;
	// justify-content: flex-end;
	padding-left: 500rpx;
	
}
.u-form-item{
	padding:0px 10px;
	span{
		color: #626341;
		font-size: 15px;
	}
}
button{
	
	background-color:rgb(214,215,185);
	width: 150rpx;
	line-height: 80rpx;
	fontsize:10px;
	color: rgb(124,125,82);
		
	}
// .u-form{
	
// }
</style>
