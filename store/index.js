// vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import village from './village'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
       village
    }
})