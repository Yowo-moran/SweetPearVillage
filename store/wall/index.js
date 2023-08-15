const state = {
    topicList:[],
    commentList:[],
    status:'loadmore',
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
        state.status = 'loading'
    },
    setCommentList(state , list){
        state.commentList = list.comments;
        console.log(state.commentList);
    },
    setMoreTopicList(state , list){
        console.log("下拉的数据");
        console.log(list.posts);
        let arr = list.posts
        for(var i = 0 ; i < arr.length ; i++){
            state.topicList.push(arr[i])
        }
        console.log("总数据");
        console.log(state.topicList);
    },
    setInfo(state , val){
        state.info = val;
    },
    addComment(state , val){
        console.log(val);
        let ret = {
            nickName:val.nickName,
            comment:val.comment,
        }
        state.commentList.unshift(ret)
    }
}
const actions = {
    getList({ commit } , num){
        wx.request({
            method:"GET",
            url: 'https://101.43.254.115:7115/post',
            data:{
                pageNum:1 + num,
                pageSize:5,
                keyword:"",
            },
            success(res) {
                if(num != 0){
                    console.log("获取下拉数据");
                    console.log(res.data.data);
                    commit('setMoreTopicList' , res.data.data)
                }
                else {
                    console.log("获取初始帖子列表成功：" + res.data.data);
                    commit('setTopicList' , res.data.data)
                }
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
    addComment({ commit } , val){
        wx.request({
            method:"POST",
            url: 'https://101.43.254.115:7115/post/comment',
            data:val,
            header:{
                Authorization: wx.getStorageSync('token')
            },
            success(res) {
                console.log("评论成功！");
                console.log(res.data);
                commit('addComment' , val)
            },
            fail(err){  
                console.log('评论失败！' + err)
            },
        })
    }
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