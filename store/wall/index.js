const state = {
    topicList:[],
    commentList:[],
    info:{
        nickName:"",
        content:"",
        avatar:"",
        updateTime:"",
        id:0,
        praiseCnt:0,
        commentCnt:0,
        imageArr:[],
    },
}
const mutations = {
    setTopicList(state , list){
        state.topicList = list.posts;
        console.log(state.topicList);
    },
    setCommentList(state , list){
        state.commentList = list.comments;
        console.log(state.commentList);
    },
    setInfo(state , val){
        state.info.nickName = val.nickName;
        state.info.content = val.content;
        state.info.updateTime = val.updateTime;
        state.info.id = val.id;
        state.info.praiseCnt = val.praiseCnt;
        state.info.commentCnt = val.commentCnt;
        state.info.imageArr = val.image
        state.info.avatar = val.avatar
    },
}
const actions = {
    getList({ commit }){
        wx.request({
            method:"GET",
            url: 'https://101.43.254.115:7115/post',
            data:{
                pageNum:1,
                pageSize:5,
                keyword:"",
            },
            success(res) {
                console.log("获取帖子列表成功：" + res.data.data);
                commit('setTopicList' , res.data.data)
            },
            fail(err){  
                console.log('获取帖子列表失败' + err)
            },
        })
    },
    getTopicDetail({ commit } , pid) {
        const url = `https://101.43.254.115:7115/post/${pid}`;
        wx.request({
            url: url,
            method: "GET",
            header: {
                Authorization: wx.getStorageSync('token')
            },
            success(res) {
                console.log("获取详细信息成功");
                console.log(res.data.data);
                commit('setInfo' , res.data.data)
            }
        });
    },
    getCommentList({ commit } , pid){
        const url = `https://101.43.254.115:7115/post/comment/${pid}`;
        wx.request({
            method:"GET",
            url: url,
            header:{
                Authorization: wx.getStorageSync('token')
            },
            success(res) {
                console.log("获取评论列表成功：" + res.data.data);
                commit('setCommentList' , res.data.data)
            },
            fail(err){  
                console.log('获取评论列表失败' + err)
            },
        })
    },
}
const getters = {

}
export default{
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}