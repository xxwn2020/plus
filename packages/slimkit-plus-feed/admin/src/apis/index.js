import http, { admin, normError } from '@/apis/http'

const api = {
  saveConfig: params => (
    admin.patch('/paycontrol', params, {
      validateStatus: s => (s === 201)
    })
  ),
  payControl: () => (
    admin.get('/paycontrol', {
      validateStatus: s => (s === 200)
    })
  ),
  http,
  normError
}

api.install = Vue => (Vue.prototype.$api = api)

export default api
