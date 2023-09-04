<template>
	<view>
		<InformVc v-show="mesShow"></InformVc>
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
		
		<u-picker
			closeOnClickOverlay
			:show="showCollege"
			:columns="college"
			@cancel="showCollege = false"
			@confirm="collegeSelect"
			title="请选择学院"		
			@close="showCollege = false"
			
				>
		</u-picker>
		<u-picker
			closeOnClickOverlay
			:show="showMajor"
			:columns="major[majorIndex]"
			@cancel="showMajor = false"
			@confirm="majorSelect"
			title="请选择专业"		
			@close="showMajor = false"
			>
		</u-picker>
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
		accept="image"
		@afterRead="afterRead"
		@delete="deletePic"
		name="1"
		multiple
		:maxCount="1"
		
		></u-upload>
		<view class="bottom">
			<button @click="finish">发布</button>
		</view>
		
		<!-- 信息提示 -->
		<u-modal :show="show"  :content='content' width="550rpx" @confirm=" show=false;"></u-modal>
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
				grade:[
					{name:'大一'},
					{name:'大二'},
					{name:'大三'},
					{name:'大四'},
				],
				
				
				mesShow:false,
				show:false,
				content:"请确认信息全部填写完毕",
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
				images:'',
				college:[
        ["非专业书籍",
          "机械工程学院",
          "材料科学与工程学院",
          "化学化工学院",
          "海运学院",
          "管理学院",
          "艺术学院",
          "环境科学与安全工程学院",
          "理学院",
          "聋人工学院",
          "华信软件学院",
          "计算机科学与工程学院",
          "社会发展学院",
          "语言文化学院",
          "集成电路科学与工程学院",
          "电气工程与自动化学院",
		  
        ],
      ],
		major:
		[ [["非专业书籍"]],
			[["请先选择学院"]],
        [
          [
            "机械工程及自动化",
            "过程装备与控制工程",
            "工业设计(造型设计)",
            "机械电子工程",
            "机械工程及自动化(卓越班)",
            "机械工程",
            "机械工程（卓越）",
            "过程装备与控制工程（国际教育）",
            "能源动力系统及自动化",
            "热能与动力工程",
            "能源与动力工程",
            "新能源科学与工程",
            "机械工程(国际教育)",
            "机器人工程",
            "智能制造工程",
            "机械类",
            "能源动力类",
			
			
          ],
        ],
        [
          [
            "材料科学与工程",
            "材料成型及控制工程",
            "材料物理",
            "材料化学",
            "功能材料",
            "材料成型及控制工程（卓越）",
            "材料科学与工程（卓越）",
            "新能源材料与器件",
            "功能材料（明理卓越创新班）",
            "材料科学类",
            "材料类",
          ],
        ],
        [
          [
            "应用化学(理)",
            "化学工程与工艺",
            "制药工程",
            "生物工程",
            "应用化学(工)",
            "药学",
            "应用化学（卓越）",
            "化学工程与工艺（卓越）",
            "化学工程与工艺（国际教育）",
            "制药工程（国际教育）",
            "化工与制药类",
          ],
        ],
        [
          [
            "航海技术",
            "轮机工程",
            "轮机工程",
            "船舶电子电气工程",
            "航海技术（卓越）",
            "轮机工程（卓越）",
            "轮机工程（国际教育）",
            "土木、水利与海洋工程",
            "交通运输",
          ],
        ],
        [
          [
            "信息管理与信息系统",
            "工业工程",
            "工商管理",
            "工程管理",
            "保险",
            "工程造价",
            "广告学",
            "物流管理",
            "财务管理",
            "市场营销",
            "保险学",
            "工商管理（国际教育2+2）",
            "财务管理（国际教育）",
            "工业工程（国际教育）",
            "物流管理（国际教育）",
            "工商管理（国际教育）",
            "工业工程（中外合作办学）",
            "工商管理（中外合作办学）",
            "工商管理（3+1）",
            "大数据管理与应用",
            "工商管理（高水平运动队）",
            "管理科学与工程类",
            "工商管理类",
            "工业工程类",
            "物流管理与工程类",
            "工商管理(国际教育学院)",
            "物流管理(国际教育学院)",
            "财务管理(国际教育学院)",
            "工商管理(国际教育学院)",
            "工程管理(国际教育学院)",
            "工商管理（辅修）",
          ],
        ],
        [
          [
            "艺术设计",
            "工业设计",
            "装饰艺术",
            "摄影",
            "动画",
            "动画(中加)",
            "视觉传达设计",
            "环境设计",
            "产品设计",
            "环境设计（国际教育）",
            "视觉传达设计（国际教育）",
          ],
        ],
        [
          [
            "环境工程",
            "安全工程",
            "环境科学",
            "资源环境与城乡规划管理",
            "自然地理与资源环境",
            "资源循环科学与工程",
            "环境工程（卓越）",
            "安全工程（卓越）",
            "应急技术与管理",
            "环境与安全类",
            "环境科学与工程类",
            "安全科学与工程类",
          ],
        ],
        [["应用物理学", "数学与应用数学"]],
        [
          [
            "计算机科学与技术(聋工)",
            "艺术设计",
            "艺术设计",
            "产品设计",
            "服装与服饰设计",
            "自动化(聋工全纳)",
            "电子信息工程(聋工全纳)",
            "工程造价(聋工全纳)",
            "财务管理(聋工全纳)",
            "网络工程（聋工）",
            "环境设计（聋工全纳）",
            "数据科学与大数据技术（聋工）",
            "计算机类",
            "设计学类",
          ],
        ],
        [["软件工程", "计算机科学与技术(专科起点)", "软件工程(专科起点)"]],
        [
          [
            "信息与计算科学",
            "计算机科学与技术",
            "信息安全",
            "网络工程",
            "物联网工程",
            "计算机科学与技术（中加）",
            "数据科学与大数据技术",
            "计算机科学与技术（国际教育）",
            "信息安全（国际教育）",
          ],
        ],
        [["社会工作", "社会学", "老年学"]],
        [
          [
            "英语",
            "日语",
            "汉语言文学",
            "汉语言文学（国际教育）",
            "预科",
            "英语（国际教育）",
          ],
        ],
        [
          [
            "通信工程",
            "电子科学与技术",
            "集成电路设计与集成系统",
            "微电子科学与工程",
            "光电信息科学与工程",
            "电波传播与天线",
            "电子信息工程",
            "通信工程（国际教育）",
            "电子信息工程（卓越）",
            "集成电路设计与集成系统（卓越）",
            "电子信息类",
          ],
        ],
        [
          [
            "自动化",
            "电气工程及其自动化",
            "测控技术与仪器",
            "人工智能",
            "电气工程及其自动化（国际教育）",
            "自动化卓越",
            "电气工程及其自动化（卓越）",
          ],
        ],
      ],
				fileList1: [],
				majorIndex:1,
				
				sample:'',
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
			
			collegeSelect(e){
				
				this.model1.userInfo.college = e.value[0];
				this.majorIndex=e.indexs[0]+1;
				
				// this.model1.userInfo.major = "请选择专业";
				if (this.model1.userInfo.college=== "非专业书籍") {
				  this.model1.userInfo.major = "非专业书籍"
				  this.majorIndex=0;
				}
				this.showCollege=false;
			},
			majorSelect(e){
				console.log(e)
				
				if (e.value[0] !== "请选择专业") {
				  this.model1.userInfo.major = e.value
				}
				this.showMajor=false;
			},
			gradeSelect(e){
				console.log(e)
				this.model1.userInfo.grade= e.name
			},
			
			
			
			finish(){
					
				if(this.model1.userInfo.name!==''&&this.model1.userInfo.price!==''&&this.model1.userInfo.college!==''&&this.model1.userInfo.major!==''&&this.model1.userInfo.grade!==''&&this.fileList1.length!==0){
						  uni.request({
							url:url+'/user/book',
							method:'post',
					  		data:{
								name:this.model1.userInfo.name,
								price:this.model1.userInfo.price,
								college:this.model1.userInfo.college,
								grade:this.model1.userInfo.grade,
								major:this.model1.userInfo.major,
								iamge:this.images,
							},
							header: {
					  			Authorization: wx.getStorageSync("token"),
					  		},
					 		success:(res)=>{
						  // 		console.log(res);
								
								console.log("发送成功");				
								uni.navigateBack();
					  		},
							fail:(res)=>{
								// console.log(res);
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
			
			uploadFilePromise(url1) {
				return new Promise((resolve, reject) => {
					let a=uni.uploadFile({
						url: url+'/user/book/image', 
						filePath: url1,
						name: 'image',
						header: {
						  Authorization: wx.getStorageSync("token"),
						},
						
						success: (res) => {
							setTimeout(() => {
								console.log(JSON.parse(res.data).message)
								// resolve(res.data)
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
