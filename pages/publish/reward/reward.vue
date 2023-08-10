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
				border="none"
				v-model="model1.userInfo.price"></u--input>
			</u-form-item>
			
			<u-form-item label="地点:"
			@click="showPlace = true"
			prop="userInfo.place"
			
			>
				<u--input
					v-model="model1.userInfo.place"
					placeholder="请输入地点,可选择"
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
		<u-action-sheet
			:show="showPlace"
			:actions="place"
			title="请选择地址"		
			@close="showPlace = false"
			@select="placeSelect"
				>
		</u-action-sheet>
		<view class="bottom">
			<button @click="finish">发布</button>
		</view>
		<!-- 信息提示 -->
		<u-modal :show="show"  :content='content' width="550rpx" @confirm=" show=false;"></u-modal>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				content:'请确认信息全部填写完毕',
				bgColor:"#d6d7b9",
				showPlace:false,
				labelStyle:{
					color:'#626341',
					fontSize:17+"px",
					
				},
				model1: {
					userInfo: {
						content:'',
						price:'',
						place: '',
						getPlace:'',
						
					},
				},
				place:[
					{
						name:"一食堂",
					},
					{
						name:"二食堂",
					},
					{
						name:"南区快递",
					},
					{
						name:"北区快递",
					}
				]
			};
		},
		 methods:{
			 
		      placeSelect(e){
				  this.model1.userInfo.place=e.name
			  },
			  finish(){
				  if(this.model1.userInfo.content!==''&&this.model1.userInfo.price!==''){
					  uni.request({
					  	url:'http://127.0.0.1:4523/m1/3091110-0-default/rewards',
					  		method:'post',
					  		data:{
								rewardContent:this.model1.userInfo.content,
								rewardAmount:this.model1.userInfo.price,
								senderAddress:this.model1.userInfo.place,
								deliveryAddress:this.model1.userInfo.getPlace,
					  		},
					  		header: {
					  			'Authorization': '',
					  		},
					  		success:(res)=>{
					  			console.log(res);
					  			console.log("发送成功");
								
					  			uni.navigateBack();
					  		},
					  		fail:(res)=>{
					  			console.log(res);
					  			console.log("发送失败");
					  		}
					  })
				  }else{
					  this.show=true;
				  }
				  
				 
			  }
		    }
	}
</script>

<style lang="scss">
.bottom{
	
	position: absolute;
	bottom: 10%;
	right: 7%;
	
	button{
		background-color:rgb(214,215,185);
		width: 150rpx;
		line-height: 80rpx;
		fontsize:10px;
		color: rgb(124,125,82);
			
		}
}
.u-form-item{
	padding:5rpx 10px;
	span{
		color: #626341;
		font-size: 17px;
		
	}
}
</style>
