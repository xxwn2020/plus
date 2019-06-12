import http, { admin, adminBase, normError } from '@/apis/http'

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
  normError,
  getStatistics: (params) => (
    admin.get('/statistics', {
      params,
      validateStatus: s => (s === 200)
    })
  ),
  fetchFeeds: params => (
    admin.get('/feeds', {
      params,
      validateStatus: s => (s === 200)
    })
  ),
  users: params => (
    adminBase.get('/admin/users', {
      params,
      validateStatus: s => (s === 200)
    })
  )
}

api.install = Vue => (Vue.prototype.$api = api)

export default api
