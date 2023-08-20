<template>
	<view>
		<InformVc v-show="mesShow"></InformVc>
		<u-navbar leftText="闲置" 
		:autoBack="true" 
		:bgColor="bgColor" 
		placeholder> </u-navbar>
		<u-form :labelStyle="labelStyle" :model="model1">
			 <u-form-item prop="user.describe">
				<u--textarea v-model="model1.user.describe" 
				placeholder="描述一下宝贝~" 
				border="none">
				</u--textarea>
			</u-form-item>
			<u-form-item label="价格:" prop="user.price">
				<u-input placeholder="请输入价钱" 
				type="number"
				border="none"
				v-model="model1.user.price">
				</u-input>
			</u-form-item>
		</u-form>
			<u-upload
					:previewFullImage="true"
			 		:fileList="fileList1"
			 		@afterRead="afterRead"
			 		@delete="deletePic"
			 		name="1"
			 		multiple
					:capture="capture"
					:maxCount="1"
			 	></u-upload> 
	
		
		<view class="bottom">
			<button @click="finish">发布</button>
		</view>
		
		<!-- 信息提示 -->
		<u-modal :show="show"  :content="content" width="550rpx" @confirm=" show=false;"></u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import InformVc from '../../../components/InformVc.vue';
	import {mapState } from "vuex";
	export default {
		components:{InformVc},
		data() {
			return {
				mesShow:false,
				show:false,
				content:"请确认信息全部填写完毕",
				model1:{
					user:{
						describe:"",
						price:"",
						
					}
				},
				bgColor:"#d6d7b9",
				fileList1: [],
				labelStyle:{
					color:'#626341',
					fontSize:17+"px",
					
				},
				
				capture:['album', 'camera'],
				images:'',
			};
		},
		computed:{
			...mapState("message", ["newChat"]),
		},
		watch:{
			newChat(){
					this.mesShow=true;
					setTimeout(()=>{
						this.mesShow=false;
					},2000)
				
			},
		},
		methods:{
			finish(){
				
				// var index=this.fileList1.length
				// var i;
				// for( i=0;i<index;i++){
				// 	this.images[i]=this.fileList1[i].thumb;
				// }
				  if(this.model1.user.describe!==''&&this.model1.user.price!==''&&this.fileList1.length!=0){
				  	  uni.request({
				  		url:"https://101.43.254.115:7115/item",
				  		method:'post',
				    	data:{
				  			description:this.model1.user.describe,
							image:this.images,
				  			price:this.model1.user.price,
				  			
				  		},
						

				  		header: {
				    		Authorization: wx.getStorageSync("token"),
								
				    	},
				   		success:(res)=>{
				  	  		console.log(res);
				  			console.log("发送成功");				
				  			uni.navigateBack();
				    	},
				  		fail:(res)=>{
				  			console.log(res);
				  			console.log("发送失败");
							this.$refs.uToast.show({
								title:'发布失败',
								message:'发布失败',
							})
				    	}
				  	 })
				   }else{
				  	 this.show=true;
				    }
				  				
				  				 
			},
			
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				
				for (let i = 0; i < lists.length; i++) {
					
					const result = await this.uploadFilePromise(lists[i].url)
					this.images=result;
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					status: 'success',
					message: '',
					url: result
				}))
				fileListLen++
				}
				},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url:"https://101.43.254.115:7115/item/image", 
						filePath: url,
						name: 'image',
						header: {
						  Authorization: wx.getStorageSync("token"),
						},
						success: (res) => {
							setTimeout(() => {
								resolve(JSON.parse(res.data).message);
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss">
.u-form-item{
	padding: 10px ;
}
.u-upload{
	padding-left: 20px;
	padding-top: 10px;
}
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
</style>
