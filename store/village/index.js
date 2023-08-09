const state={
	// 历史记录
	historyList:[],
	// 悬赏的数据
	rewardInfo:[],
	// 书籍的数据
	bookInfo:[],
	// 闲置的数据
	leaveInfo:[],
	// 是否没有数据
	rewardstatus:'loading',
	bookstatus:'loading',
	leavestatus:'loading'
}
const mutations={
	// 设置历史记录
	SETHISTORYLIST(state,history){
		state.historyList=history;
	},
	// 清除历史记录
	CLEARHISTORYLIST(state){
		state.historyList=[]
	},
	// 悬赏主页面展示
	GETREWARDINFO(state,info){
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
		console.log(info);
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
		console.log(info);
		if(info.length<6){
			state.leavestatus='nomore'
		}
		if(state.leaveInfo.length==0){
			state.leaveInfo=info
		}else{
			const infos=[...state.leaveInfo,...info]
			state.leaveInfo=infos
		}
	}
}
const actions={
	 setHistoryList({commit,state},history){
		 let list=state.historyList
		 list.unshift(history)
		 commit('SETHISTORYLIST',list)
	 },
	 clearHistoryList({commit,state}){
		 commit('CLEARHISTORYLIST')
	 },
	 // 悬赏请求
	 getRewardInfo({commit,state},options={}){
		 const {pageNum=1,pageSize=6,types='',isSearch=false,sortBy='amount_asc'}=options
		 if(isSearch){
			 state.rewardInfo=[]
		 }
		 console.log(pageSize,pageNum,sortBy,types,'ah');
		 uni.request({
		 	method:'GET',
			url:'https://101.43.254.115:7115/rewards',
			data:{
				pageSize,
				pageNum,
				keyword:'',
				sortBy,
				types
			},
			header:{
				'Authorization':uni.getStorageSync('token')
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
				state.rewardstatus='nomore'
			}
		 })
	 },
	 // 闲置请求
	 getLeaveInfo({commit,state},options={}){
		 const{pageNum=1,pageSize=6,keyWord=''}=options
		 uni.request({
		 	method:"GET",
			url:'https://101.43.254.115:7115/item',
			data:{
				pageNum,
				pageSize,
				keyWord
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
				state.leavestatus='nomore'
			}
		 })
	 },
	 // 书籍请求
	 getBookInfo({commit,state},options={}){
		 const {college='',major='',grade='',page=1,pageSize=6,isSearch=false}=options
		 if(isSearch){
		 	 state.bookInfo=[]
		 }
		 console.log('page',page,'pageSize',pageSize,college,major,grade);
		 uni.request({
		 	method:'GET',
		 	url:'https://101.43.254.115:7115/user/book/page',
			data:{
				college,
				major,
				grade,
				sortBy:0,
				page,
				pageSize
			},
			header:{
				'Authorization':uni.getStorageSync('token')
			},
			success:res=>{

				if(res.statusCode==200&&res.data.data.total!=0){
					commit('GETBOOKINFO',res.data.data.records)
					state.rewardstatus='loading'
				}else{
					state.rewardstatus='nomore'
				}
			},
			fail:res=>{
				console.log(res);
				state.rewardstatus='nomore'
			}
		 })
	 }
}
const getters={}
export default{
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}