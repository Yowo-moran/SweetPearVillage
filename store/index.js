// vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import village from './village'
export default new Vuex.Store({
    modules: {
       village
    }
})