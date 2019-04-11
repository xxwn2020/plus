import http, { normError } from './http'
const api = {
  normError,
  http
}

api.install = Vue => (Vue.prototype.$api = api)

export default api
