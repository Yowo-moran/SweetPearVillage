<template>
	<view @tap="showFooter = false">
		<view class="topBar" :style="{height:topBarHeight+'px'}">
		</view>
		<uni-nav-bar title="猪猪不爱吃珠珠" left-icon="left" @clickLeft="back">
		</uni-nav-bar>

		<view class="box" :style="{height:safeArea+'px'}">
			<scroll-view ref="scroll" class="message-container" scroll-y :scroll-into-view="messages[messages.length-1].id">
			    <view class="message" v-for="message in messages" :key="message.id" :class="message.sender === 'self' ? 'self' : 'other'">
			      <view class="avatar" ></view>
			      <view class="content">
			          <view v-if="message.type === 'text'">
			          	{{ message.content }}
			          </view>
			        
			          <image :src="message.content" mode="aspectFit" v-else-if="message.type === 'image'"></image>
			     
			      </view>
			    </view>
			  </scroll-view>
			
			<view class="input" :class="showFooter?'hHeight':''" >
				<view class="header" >
					<span style="margin:0 10px;"><u-icon :name="!isVoice?'mic':'edit-pen'" size="28" @tap="isVoice=!isVoice"></u-icon></span>
					<view class="textarea" >
						<u-textarea v-if="!isVoice" v-model="inform" placeholder="请输入内容" autoHeight style="background-color: antiquewhite;"></u-textarea>
						<button style="background-color: #e9eac9;color: #fff; height: 45px;" @tap="sendMessage">发送</button>
					</view>
					
					<span style="margin:0 10px;"><u-icon name="plus-circle" size="28" @tap.stop="changeShow" :color="showFooter?'skyblue':''"></u-icon></span>
				</view>
				<view class="footer" v-if="showFooter" @tap.stop="">
					<view class="btn">
						<view class="icon">
							<u-icon name="camera" size="40" color="#fff"></u-icon>
						</view>
						<view class="text">拍照</view>
					</view>
					<view class="btn" @tap="chooseImage">
						<view class="icon">
							<u-icon name="photo" size="40" color="#fff"></u-icon>
						</view>
						<view class="text" >相册</view>
					</view>
					<view class="btn">
						<view class="icon">
							<u-icon name="weixin-fill" size="40" color="#fff"></u-icon>
						</view>
						<view class="text">发送微信号</view>
					</view>
					<view class="btn">
						<view class="icon">
							<u-icon name="phone" size="40" color="#fff"></u-icon>
						</view>
						<view class="text">发送手机号</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				title:'',
				topBarHeight:0,
				safeArea:0,
				safeBottom:0,
				inform:'',
				showFooter:false,
				isVoice:false,
				messages: [
				        {
				          id: 'firs',
				          type: 'text',
				          content: 'Hello, how are you?',
				          sender: 'other',
				        },
				        {
				          id: 'second',
				          type: 'text',
				          content: 'I am fine, thank you. And you?',
				          sender: 'self',
				        },
				        {
				          id: 'third',
				          type: 'image',
				          content: '../../../static/60155475_p0_master1200.jpg',
				          sender: 'other',
				        },
				        {
				          id: 'forth',
				          type: 'text',
				          content: 'Nice picture!',
				          sender: 'self',
				        },
				      ],
			};
		},
		onLoad(options){
			let systemInfo = uni.getSystemInfoSync();
			console.log(systemInfo.windowHeight)
			this.topBarHeight = systemInfo.statusBarHeight||0;
			this.safeBottom = systemInfo.windowHeight - this.topBarHeight - systemInfo.safeArea.height
			this.safeArea = systemInfo.windowHeight - this.topBarHeight - 44 - this.safeBottom;
		},
		methods:{
			back(){
				uni.navigateBack();
			},
			changeShow(){
				this.showFooter = !this.showFooter
				return false
			},
			sendMessage(){
				if(this.inform){
					this.messages.push({
						id:Date.now(),
						type:'text',
						content:this.inform,
						sender:'self'
					});
					this.inform = ''
				}
			},
			chooseImage(){
				uni.chooseMedia({
					mediaType:['image'],
					sourceType:['album'],
					success:function(res){
						console.log(res.tempFiles);
						this.inform = res.tempFiles[0].tempFilePath;
						console.log(this.inform)
						this.messages.push({
							id:Date.now(),
							type:'image',
							content:this.inform,
							sender:'self'
						})
						this.inform = ''
						this.scroll()
						this.showFooter = false
					}.bind(this)
				})
			},
			scroll(){
					console.log(this.$refs)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		display: flex;
		flex-direction: column;
		.message-container{
			background-color: blanchedalmond;
			flex-grow: 1;
			overflow:hidden;
			.message {
			  display: flex;
			  align-items: center;
			  margin: 10px 0;
			  
			  .avatar {
			    width: 40px;
			    height: 40px;
			    border-radius: 50%;
			    background-color: #eee;
			    margin:0 10px;
			  }
			  .content {
			    padding: 10px;
				max-width: 320px;
			    border-radius: 10px;
			    background-color: #fff;
			    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				word-break: break-all;
			  }	
			}
			.self{
				flex-direction: row-reverse;
			}
			
		}
		.hHeight{
			height: 150px!important;
		}
		.input{
			height: 56px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.header{
				display: flex;
				align-items: center;
				.textarea{
					flex-grow: 1;
					display: flex;
				}
			}
		}
		.footer{
			position: relative;
			bottom: 0;
			margin: 15px 0;
			display: flex;
			justify-content: space-around;
			height: 70px;
			
			.btn{
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 70px;
				justify-content: space-around;
				.text{
					font-size: 10px;
					text-align: center;
					width: 60px;
				}
				.icon{
					background-color: #d6d7bc;
					width: 50px;
					height: 50px;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					font-weight: 400;
				}
			}
		}
	}

</style>
