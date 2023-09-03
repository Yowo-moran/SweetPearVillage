import url from '@/api/api.js'
const state={
	// 悬赏的数据
	rewardInfo:[],
	// 书籍的数据
	bookInfo:[],
	// 闲置的数据
	leaveInfo:[],
	// 是否没有数据
	rewardstatus:'loading',
	bookstatus:'loading',
	leavestatus:'loading',
}
const mutations={
	// 悬赏主页面展示
	GETREWARDINFO(state,info){
		// console.log('悬赏',info);
		if(info.length<6){
			state.rewardstatus='nomore'
		}
		// 合并数据
		if(state.rewardInfo.length==0){
			state.rewardInfo=info
		}else{
			const infos=[...state.rewardInfo,...info]
			state.rewardInfo=infos
		}	
	},
	// 书籍主页面展示
	GETBOOKINFO(state,info){
		// console.log('书籍',info);
		if(info.length<6){
			state.bookstatus='nomore'
		}
		// 合并数据
		if(state.bookInfo.length==0){
			state.bookInfo=info
		}else{
			const infos=[...state.bookInfo,...info]
			state.bookInfo=infos
		}
	},
	// 闲置主页面展示
	GETLEAVEINFO(state,info){
		// console.log('闲置',info);
		if(info.length<6){
			state.leavestatus='nomore'
		}
		if(state.leaveInfo.length==0){
			state.leaveInfo=info
		}else{
			const infos=[...state.leaveInfo,...info]
			state.leaveInfo=infos
		}
	},
}
const actions={
	 // 悬赏请求
	 getRewardInfo({commit,state},options={}){
		 const {pageNum=1,pageSize=6,types='',isClear=false,sortBy=''}=options
		 // console.log('请求');
		 // console.log('sortBy',sortBy,pageNum);
		 if(types==''){
			var bookdata={pageSize,pageNum,sortBy} 
		 }else{
			var bookdata={pageSize,pageNum,types,sortBy}
		 }
		 console.log(bookdata);
		 if(isClear){

			 state.rewardInfo=[],
			 state.rewardstatus='loading'
		 }
		 // console.log(bookdata);
		 uni.request({
		 	method:'GET',
			url:url+'/rewards',
			data:bookdata,
			header:{
				'Authorization':wx.getStorageSync('token')
			},
			success:res=>{
				if(res.statusCode==200&&res.data.data.total!=0){
					commit('GETREWARDINFO',res.data.data.rewards)
					state.rewardstatus='loading'
				}else{
					state.rewardstatus='nomore'
				}
			
			},
			fail:res=>{
				console.log(res);
				state.rewardstatus='loading'
			}
		 })
	 },
	 // 闲置请求
	 getLeaveInfo({commit,state},options={}){
		 const{pageNum=1,pageSize=6,keyWord='',isClear=false}=options
		 if(isClear){
			 
		 	state.leaveInfo=[]
			state.leavestatus='loading'
		 }
		 uni.request({
		 	method:"GET",
			url:url+'/item',
			data:{
				pageNum,
				pageSize,
			},
			header:{
				'Authorization':wx.getStorageSync('token')
			},
			success:res=>{
				if(res.statusCode==200&&res.data.data.total!=0){
					commit('GETLEAVEINFO',res.data.data.items)
					state.leavestatus='loading'
				}else{
					state.leavestatus='nomore'
				}
			},
			fail:res=>{
				console.log(res);
				state.leavestatus='loading'
			}
		 })
	 },
	 // 书籍请求
	 getBookInfo({commit,state},options={}){
		 const {college='',major='',grade='',page=1,pageSize=6,isClear=false,sortBy=''}=options
		 if(isClear){
			
		 	state.bookInfo=[]
			state.bookstatus='loading'
		 }
		 // console.log(college,major,grade,'参数');
		 console.log('page',page,'pageSize',pageSize,'college',college,'major',major,'grade',grade);
		 // console.log(major);
		 uni.request({
		 	method:'GET',
		 	url:url+'/user/book/page',
			data:{
				college,
				major,
				grade,
				sortBy,
				page,
				pageSize
			},
			header:{
				'Authorization':wx.getStorageSync('token')
			},
			success:res=>{
			console.log(res);
				if(res.statusCode==200&&res.data.data.total!=0){
					state.bookstatus='loading'
					commit('GETBOOKINFO',res.data.data.records)
				}else{
					state.bookstatus='nomore'
				}
			},
			fail:res=>{
				console.log(res);
				state.bookstatus='loading'
			}
		 })
	 },
}
const getters={}
export default{
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}