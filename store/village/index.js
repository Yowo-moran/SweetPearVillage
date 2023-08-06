const state={
	// 历史记录
	historyList:[],
	// 当前选中的历史
	currenthistoryTag:'',
	// 选中的标签
	keywordTag:[]
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
	// 当前点击的历史记录
	SETCURRENTHISTORY(state,item){
		state.currenthistoryTag=item
	},
	// 选择标签
	SETKEYWORDTAG(state,item){
		state.keywordTag=item
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
	 setCurrentHistory({commit,state},item){
		 commit('SETCURRENTHISTORY',item)
	 },
	 setKetWordTag({commit,state},item){
		 commit('SETKEYWORDTAG',item)
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