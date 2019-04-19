import request from '@/utils/request'
import { apiv2, admin, Resource } from './http'

const users = new Resource('/users', admin)

export default {
  ...users.map({
    list: 'list',
    get: 'get',
    save: 'save',
    del: 'del'
  }),
  /* 取消用户禁用 */
  restoreUser: user => (
    admin.delete(`/trashed-users/${user}`, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 取消推荐用户 */
  unRecommend: user => (
    admin.delete(`/users/recommends/${user}`, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 推荐用户 */
  recommend: user => (
    admin.post('/users/recommends', { user }, {
      validateStatus: s => (s === 201)
    })
  ),
  /* 设置关注 */
  followedFamous: (user, type) => (
    admin.post('/users/famous', { user, type }, {
      validateStatus: s => (s === 201)
    })
  ),
  /* 取消设置关注 */
  unFamous: (user) => (
    admin.delete(`/users/famous/${user}`, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 获取用户设置 */
  userSetting: () => (
    admin.get('/user/setting', {
      validateStatus: s => (s === 200)
    })
  ),
  setUserSetting: role => (
    admin.patch('/user/setting', { role }, {
      validateStatus: s => (s === 201)
    })
  )
}

export function login (data) {
  return apiv2.post('auth/login', data, {
    validateStatus: s => (s === 200)
  })
}

export function getInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
