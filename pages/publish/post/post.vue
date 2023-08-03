<template>
	<view>
		<u-navbar leftText="帖子"
		:autoBack="true" 
		:bgColor="bgColor" 
		placeholder>
		 </u-navbar>
		 <u-form>
			 <u-form-item>
				<u--textarea v-model="content" 
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor:"#d6d7b9",
				content:'',
				fileList1: [],
			};
		},
		methods:{
			finish(){
							  // uni.request({
							  	
							  // })
							 uni.navigateBack()
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
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
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
