<template>
	<view @tap="showFooter = false">
		<view class="topBar" :style="{height:topBarHeight+'px'}">
		</view>
		<uni-nav-bar title="猪猪不爱吃珠珠" left-icon="left" @clickLeft="back">
		</uni-nav-bar>

		<view class="box" :style="{height:safeArea+'px'}">
			<scroll-view :scroll-top="scrollTop" class="message-container" scroll-y :scroll-into-view="messages[messages.length-1].id">
			    <view class="message" v-for="message in messages" :key="message.id" :class="message.sender === 'self' ? 'self' : 'other'">
			      <view class="avatar" ></view>
			      <view class="content" >
			          <view v-if="message.type === 'text'">
			          	{{ message.content }}
			          </view>
			        
			          <image :src="message.content" mode="aspectFit" v-else-if="message.type === 'image'" @tap="preview(message.content)"></image>
						
						<view v-if="message.type === 'voice'" class="voice-content" @tap="play(message.content)">
							{{message.length}}
							<image src="../../../static/icon/wave.png" mode="scaleToFill" class="voice-img" :style="{width:message.length+20+'px'}"></image>
						</view>
			      </view>
			    </view>
			  </scroll-view>
			
			<view class="input" :class="showFooter?'hHeight':''" >
				<view class="header" >
					<span style="margin:0 10px;" @tap="showFooter = false" ><u-icon :name="!isVoice?'mic':'edit-pen'" size="28" @tap="isVoice=!isVoice" ></u-icon></span>
					<view class="textarea"  v-if="!isVoice">
						<u-textarea  v-model="inform" placeholder="请输入内容" autoHeight class="area" ></u-textarea>
						<button style="background-color: #e9eac9;color: #fff; height: 45px;" @tap="sendMessage">发送</button>
					</view>
					<view class="voice" v-else @touchstart="handleTouchStart" @touchend="handleTouchEnd">
						<view class="button">
							{{!needCancel?'按住说话':''}}
						</view>
					</view>
					<span style="margin:0 10px;"><u-icon name="plus-circle" size="28" @tap.stop="changeShow" :color="showFooter?'skyblue':''"></u-icon></span>
				</view>
				<view class="footer" v-if="showFooter" @tap.stop="">
					<view class="btn" @tap="useCamera">
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
			<view class="cancel" v-if="needCancel">
				<span>还可以录制{{60-length}}秒</span>
				<span>松开停止录音</span>
			</view>
		</view>
		
	</view>
</template>


<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				query:null,
				title:'',
				topBarHeight:0,
				safeArea:0,
				safeBottom:0,
				inform:'',
				showFooter:false,
				isVoice:false,
				scrollTop:0,
				needCancel:false,
				timer:null,
				length:0,
				recorder:null,
				innerAudioContext:null,
				isPlay:false,
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
			this.toBottom()
			uni.getSetting({
				success: (res) => {
					console.log(res.authSetting['scope.record']);
					if(!res.authSetting['scope.record']){
						uni.authorize({
							scope:'scope.record'
						})
					}
				}
				
			})
			this.innerAudioContext = uni.createInnerAudioContext()
			console.log(this.innerAudioContext)
		},
		methods:{
			back(){
				uni.navigateBack();
			},
			changeShow(){
				this.showFooter = !this.showFooter
				this.isVoice = false
				return false
			},
			sendMessage(){
				if(this.inform){
					this.messages.push({
						id:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
						type:'text',
						content:this.inform.trim(),
						sender:'self'
					});
					this.inform = ''
					this.toBottom()
				}
			},
			sendImage(){
				this.messages.push({
					id:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
					type:'image',
					content:this.inform,
					sender:'self'
				})
				this.inform = ''
				this.showFooter = false
			},
			chooseImage(){
				uni.chooseMedia({
					mediaType:['image'],
					sourceType:['album'],
					success:function(res){
						console.log(res.tempFiles);
						this.inform = res.tempFiles[0].tempFilePath
						this.sendImage();
						this.toBottom();
					}.bind(this)
				})
			},
			useCamera(){
				uni.chooseMedia({
					mediaType:['image'],
					sourceType:['camera'],
					camera:'back',
					success:function(res){
						console.log(res.tempFiles);
						this.inform = res.tempFiles[0].tempFilePath
						this.sendImage();
						this.toBottom();
					}.bind(this)
				})
			},
			
			toBottom(){
				this.$nextTick(()=>{
					this.query = uni.createSelectorQuery().in(this);
							this.query.selectAll('.message').boundingClientRect(data=>{
								const elements = Array.from(data);
								let index = elements.length-1;
								this.scrollTop = elements[index].bottom-elements[0].bottom
							}).exec();
					this.query = null
				})
			},
			preview(url){
				uni.previewImage({
					urls:[url],
				})
			},
			handleTouchStart(){
				
				this.needCancel = true
				this.recorder = uni.getRecorderManager()
				this.recorder.start();
				this.timer = setInterval(()=>{
					this.length+=1;
					if(this.length>=60){
						this.handleTouchEnd();
					}
				},1000)
			},
			handleTouchEnd(){
				clearInterval(this.timer);
				this.recorder.stop();
				if(this.length<1){
					this.needCancel = false
					return;
				}
				this.recorder.onStop((res)=>{
					const message = {
						id:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
						type:'voice',
						content:res.tempFilePath,
						length:this.length,
						sender:'self'
					}
					console.log(message)
					this.messages.push(message)
					this.needCancel = false
					this.length = 0;
					this.toBottom();
				})
				
			},
			play(url){
				console.log(url)
				console.log(this.innerAudioContext)
				this.innerAudioContext.src = url;
				this.isPlay = !this.isPlay;
				this.isPlay?this.innerAudioContext.play():this.innerAudioContext.stop();
				this.innerAudioContext.onEnded(()=>{
					this.isPlay = false;
				})
				this.innerAudioContext.onStop(()=>{
					this.isPlay = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		display: flex;
		flex-direction: column;
		position: relative;
		.message-container{
			background-color: blanchedalmond;
			flex-grow: 1;
			box-sizing: border-box;
			overflow: hidden;
			.message {
			  display: flex;
			  align-items: center;
			  padding: 10px 0;
			  
			  .avatar {
			    width: 40px;
			    height: 40px;
			    border-radius: 50%;
			    background-color: #eee;
			    margin:0 10px;
			  }
			  .content {
				box-sizing:border-box;
				max-width: 280px;
				padding: 10px;
			    border-radius: 10px;
			    background-color: #fff;
			    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				word-break: break-all;
				display: flex;
				justify-content: center;
				.voice-content{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					font-size: 12px;
					font-weight: 200;
					.voice-img{
						margin-left: 5px;
						height: 22px;
					}
				}
				
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
			height: 60px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.header{
				height: 60px;
				display: flex;
				align-items: center;
				.textarea{
					flex-grow: 1;
					display: flex;
					
				}
				.textarea /deep/ .u-textarea{
					max-height:40px;
					overflow: auto;
				}
				.voice{
					flex-grow: 1;
					.button{
						width: 100%;
						height: 36px;
						background-color: #eee;
						text-align: center;
						line-height: 36px;
						border-radius: 5px;
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
		.cancel{
			position: absolute;
			bottom: 50%;
			width: 40vw;
			height: 7vh;
			background: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			left: 50%;
			transform: translateX(-50%);
			border-radius: 10px;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}
	}
	
</style>
