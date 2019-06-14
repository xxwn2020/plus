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
  /* 移除回收站 */
  restore: id => (
    admin.patch('feeds', {}, {
      params: {
        feed: id
      },
      validateStatus: status => status === 201
    })
  ),
  /* 话题列表 */
  fetchTopics: params => (
    admin.get('/topics', {
      params,
      validateStatus: s => (s === 200)
    })
  ),
  /* 创建话题 */
  createTopic: params => (
    admin.post('/topics', params, {
      validateStatus: s => (s === 201)
    })
  ),
  /* 更新话题 */
  updateTopic: (params, id) => (
    admin.put(`/topics/${id}`, params, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 删除话题 */
  destroyTopic: id => (
    admin.delete(`/topics/${id}`, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 获取话题配置 */
  topicConfiguration: () => (
    admin.get('/topic-review-switch-toggle', {
      validateStatus: s => (s === 200)
    })
  ),
  /* 保存话题配置 */
  saveTopicConfiguration: params => (
    admin.put('/topic-review-switch-toggle', params, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 设置为热门动态 */
  topicHotToggle: id => (
    admin.put(`/topics/${id}/hot-toggle`, {}, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 审核话题 */
  topicAuditToggle: (id, status) => (
    admin.put(`topics/${id}/review`, { status }, {
      validateStatus: s => (204)
    })
  )
}

api.install = Vue => (Vue.prototype.$api = api)

export default api
