const state={
	tagNum:0
}
const mutation={
	SETTAGNUM(state,num){
		this.state.tagNum=num
	}
}
const actions={
	setTageNum({commit,state},num){
		commit('SETTAGNUM',num)
	}
}
const getters={}
export default{
	state,
	mutation,
	actions,
	getters
}