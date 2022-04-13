import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

//elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//axios
import service from './api'
Vue.prototype.$axios = service

//user
import user from './untils/user/user'
Vue.prototype.$user = user

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
