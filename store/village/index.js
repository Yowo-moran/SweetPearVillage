const state={
	// 历史记录
	historyList:[]
}
const mutations={
	SETHISTORYLIST(state,history){
		state.historyList=history;
	},
	CLEARHISTORYLIST(state){
		state.historyList=[]
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