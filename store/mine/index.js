const state = {
    logined: false,
    personalDetails: {
        id: '',
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
    setLogined(state, value) {
        state.logined = value;
    },
    setPersonalDetails(state, value) {
        state.personalDetails = Object.assign(state.personalDetails, value);
    }
}
const actions = {
    async login({ commit }) {
        await wx.login({
            success(res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: "http://101.43.254.115:7115/user/" + res.code,
                        success(res) {
                            if (res.data.code !== "00000") {
                                console.log("登录失败！");
                                return;
                            }
                            uni.setStorage({
                                key: "token",
                                data: res.data.data.token,
                                success: function () {
                                    console.log("success");
                                    commit('setLogined', true);
                                    // that.setLogined(true);
                                },
                            });
                            const {
                                id,
                                avatar,
                                nickName,
                                sex,
                                college,
                                major,
                                phoneNumber,
                                wechatNumber,
                            } = res.data.data;
                            const details = {
                                id,
                                avatar,
                                nickName,
                                sex,
                                college,
                                major,
                                phoneNumber,
                                wechatNumber,
                            };
                            commit('setPersonalDetails', details)
                            // that.setPersonalDetails(details);
                        },
                    });
                } else {
                    console.log("登录失败！" + res.errMsg);
                }
            },
        });
    },
}
const getters = {
    getSex(state) {
        if (state.personalDetails.sex === 0) {
            return '男';
        } else if (state.personalDetails.sex === 1) {
            return '女';
        }
        else {
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