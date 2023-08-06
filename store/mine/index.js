const state = {
    logined:false,
    personalDetails: {
        id:'',
        avatar:
            "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
        nickName: "点击登录",
        sex: "请选择性别",
        college: "请选择学院",
        major: "请选择专业",
        wechatNumber: "",
    }
}
const mutations = {
    setLogined(state,value){
        state.logined = value;
    },
    setPersonalDetails(state, value) {
        state.personalDetails = Object.assign(state.personalDetails,value);
    }
}
const actions = {

}
const getters = {
    getSex(state){
        if(state.personalDetails.sex === 0){
            return '男';
        }else if(state.personalDetails.sex === 1){
            return '女';
        }
        else{
            return '请选择性别';
        }
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}