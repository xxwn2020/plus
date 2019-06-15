import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'

const { token } = window.TS

NProgress.configure({ showSpinner: false }) // NProgress Configuration
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // determine whether the user has logged in
  if (token) {
    await store.dispatch('permission/generateRoutes')
    next()
  } else {
    window.location.href = '/admin'
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
