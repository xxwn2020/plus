import request from '@/utils/request'
import { apiv2 } from './http'

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
