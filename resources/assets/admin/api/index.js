import http, { normError } from './http'
import systemInfo from './systemInfo'
const api = {
  normError,
  http,
  systemInfo
}

api.install = Vue => (Vue.prototype.$api = api)

export default api
