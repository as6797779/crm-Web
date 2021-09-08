import Vue from 'vue'
import router from './router'
import App from './App.vue'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import Axios from 'axios'
import Qs from 'qs'


Vue.config.productionTip = false
Axios.defaults.baseURL = 'http://127.0.0.1:8080/'
Axios.defaults.headers.common['token'] = sessionStorage.getItem("token"); // 设置请求头为 Authorization
Vue.prototype.$axios = Axios
Vue.prototype.$qs = Qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
