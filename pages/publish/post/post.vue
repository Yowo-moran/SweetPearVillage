<template>
	<view>
		<InformVc v-show="mesShow"></InformVc>
		
		
		
		<u-navbar leftText="帖子"
		:autoBack="true" 
		:bgColor="bgColor" 
		placeholder>
		 </u-navbar>
		 
		 <u-form :model="model1">
			 <u-form-item prop="user.content">
				<u--textarea v-model="model1.user.content" 
				placeholder="说点什么......" 
				border="none">
				</u--textarea>
			 </u-form-item>
		 </u-form>
		 <u-upload
				:previewFullImage="true"
		 		:fileList="fileList1"
		 		@afterRead="afterRead"
		 		@delete="deletePic"
		 		name="1"
		 		multiple
		 		:maxCount="10"
		 	></u-upload>
		
		
		<view class="bottom">
			<button @click="finish">发布</button>
		</view>
		
		<u-modal :show="show" :content='message' width="550rpx" @confirm=" show=false;"></u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	
	import InformVc from '../../../components/InformVc.vue';
	import url from '@/api/api.js';
	import {mapState } from "vuex";
	export default {
		components:{InformVc},
		data() {
			return {
				mesShow:false,
				show:false,
				message:'请确认信息全部填写完毕',
				model1:{
					user:{
						content:"",
						
					},
				},
				bgColor:"#d6d7b9",
				content:'',
				fileList1: [],
				images:[],
				
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
				
					if(this.model1.user.content!==''||this.fileList1.length!=0){
						
						
						  uni.request({
						  	url:url+'/post',
						  		method:'post',
						  		data:{
									content:this.model1.user.content,
									images:this.images,
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
					console.log(result)
					var imagesObj={
						pos:"",
						image:"",
					}
					imagesObj.pos=i+1;
					imagesObj.image=result[0];
					// console.log(this.imagesObj.image)
					this.images[i]=imagesObj;
					
					
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					status: 'success',
					message: '',
					url: result
				}))
				fileListLen++
				}
				},
				
			uploadFilePromise(url1) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: url+'/post/image', 
						filePath: url1,
						name: 'image',
						header: {
						  Authorization: wx.getStorageSync("token"),
						},
						success: (res) => {
							setTimeout(() => {
								resolve(JSON.parse(res.data).data.names);
								
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
