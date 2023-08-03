<template>
	<view>
		<u-navbar leftText="书籍"
		:autoBack="true" 
		:bgColor="bgColor" 
		placeholder> </u-navbar>
		<u-form :labelStyle="labelStyle" :model="model1">
			<u-form-item label="书名:" prop="userInfo.name">
				<input type="text" 
				placeholder="请输入书名" 
				v-model="model1.userInfo.name">
			</u-form-item>
			
			<u-form-item label="价格:" prop="userInfo.price">
				<input type="number" 
				placeholder="请输入价钱"
				v-model="model1.userInfo.price">
			</u-form-item>
			
			<u-form-item label="学院:"
			@click="showCollege = true"
			prop="userInfo.college"
			>
				<u--input
					v-model="model1.userInfo.college"
					placeholder="请选择学院"
					border="none"
				></u--input>
				<u-icon
					slot="right"
					name="arrow-right"
				></u-icon>
			</u-form-item>
			
			<u-form-item label="专业"
			@click="showMajor = true"
			prop="userInfo.major">
				<u--input
					v-model="model1.userInfo.major"
					placeholder="请选择专业"
					border="none"
				></u--input>
				<u-icon
					slot="right"
					name="arrow-right"
				></u-icon>
			</u-form-item>
			
			
			<u-form-item label="年级"
			@click="showGrade = true"
			prop="userInfo.grade">
				<u--input
					v-model="model1.userInfo.grade"
					placeholder="请选择年级"
					border="none"
				></u--input>
				<u-icon
					slot="right"
					name="arrow-right"
				></u-icon>
			</u-form-item>
		</u-form>
		<u-action-sheet
			:show="showCollege"
			:actions="college"
			title="请选择学院"		
			@close="showCollege = false"
			@select="collegeSelect"
				>
		</u-action-sheet>
		<u-action-sheet
			:show="showMajor"
			:actions="major"
			title="请选择专业"		
			@close="showMajor = false"
			@select="majorSelect">
		</u-action-sheet>
		<u-action-sheet
			:show="showGrade"
			:actions="grade"
			title="请选择年级"		
			@close="showGrade = false"
			@select="gradeSelect">
		</u-action-sheet>
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
				showCollege:false,
				showMajor:false,
				showGrade:false,
				labelStyle:{
					color:'#626341',
					fontSize:17+"px",
					
				},
				model1: {
					userInfo: {
						name:'',
						price:'',
						college: '',
						major:'',
						grade:'',
					},
				},
				college:[{
					name:"计算机技术与工程学院"
				},
				{
					name:"机械工程学院"
				}
				],
				major:[{
					name:"计算机科学与技术"
				},
				{
					name:"大数据"
				}
				],
				grade:[{
					name:"大一"
				},
				{
					name:"大二"
				},
				{
					name:"大三"
				},
				{
					name:"大四"
				}
				],
				fileList1: [],
			};
		},
		methods:{
			collegeSelect(e){
				this.model1.userInfo.college = e.name
			},
			majorSelect(e){
				this.model1.userInfo.major = e.name
			},
			gradeSelect(e){
				this.model1.userInfo.grade= e.name
			},
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
	padding:0px 10px;
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
