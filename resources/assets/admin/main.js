import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './permission' // permission control
import './utils/errorLog'
import Api from './api'
import mixins from './mixins'

import * as filters from './filters' // error log
import NavBarInPage from '@/views/tsplus/components/NavBarInPage'

Vue.use(Api)
Vue.mixin(mixins)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.component('nav-bar-in-page', NavBarInPage)

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

export default app
