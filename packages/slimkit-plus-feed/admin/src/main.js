import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/'
import './styles.scss'
import i18n from './i18n'
import mixins from './mixins'
import Api from './apis'
import NavBarInPage from '@/components/NavBarInPage'
import './plugins/element.js'

Vue.component('nav-bar-in-page', NavBarInPage)
Vue.mixin(mixins)
Vue.use(Api)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
