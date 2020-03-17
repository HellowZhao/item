import Vue from 'vue'
import App from './App'

// elementUi
import elementUi from 'element-ui'
Vue.use(elementUi)
import '../node_modules/element-ui/lib/theme-chalk/index.css'

// router
import router from './router/index'

// vuex
import vuex from './vuex'

// axios
import axios from 'axios'
Vue.prototype.$axios = axios
import qs from 'qs'
Vue.prototype.$qs = qs

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  vuex,
  components: { App },
  template: '<App/>'
})
