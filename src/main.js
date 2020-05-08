import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import echarts from 'echarts'
import qs from 'qs'


Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
