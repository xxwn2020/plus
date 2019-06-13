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
  /* 搜索用户 */
  users: params => (
    adminBase.get('/admin/users', {
      params,
      validateStatus: s => (s === 200)
    })
  ),
  /* 动态取消置顶 */
  unPinned: id => (
    admin.delete(`feeds/${id}/pinned`, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 设置动态置顶 */
  setPinned: (id, day, payload) => (
    admin.post(`${id}/pinned`, { ...payload, day }, {
      validateStatus: status => (status === 201)
    })
  ),

  /* 通过动态置顶的申请 */
  passPinned: pinnedId => (
    admin.patch(`pinned/${pinnedId}`, { action: 'accept' }, {
      validateStatus: status => (status === 201)
    })
  ),
  /* 拒绝动态置顶的申请 */
  rejectPinned: pinnedId => (
    admin.delete(`feeds/pinneds/${pinnedId}`, {
      validateStatus: status => status === 204
    })
  ),
  destroy: (id) => {
    return admin.delete(`feeds/${id}`, {
      validateStatus: status => status === 204
    })
  },

  restore: id => (
    admin.patch('feeds', {}, {
      params: {
        feed: id
      },
      validateStatus: status => status === 201
    })
  )
}

api.install = Vue => (Vue.prototype.$api = api)

export default api
