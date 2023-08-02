import App from './App'
import store from './store'
// #ifndef VUE3
import Vue from 'vue'

import uView from "uview-ui";
Vue.use(uView);

import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif