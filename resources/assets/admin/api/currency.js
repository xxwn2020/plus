import { admin } from './http'

export default {
  list: query => (
    admin.get('/currency/list', {
      params: query,
      validateStatus: s => (s === 200)
    })
  ),
  /* 获取服务端配置 */
  fetchConfig: () => (
    admin.get('/currency/config', {
      validateStatus: s => (s === 200)
    })
  ),
  /* 保存配置 */
  saveBasicConfig: params => (
    admin.patch('/currency/config?type=basic', params, {
      validateStatus: s => (s === 201)
    })
  ),
  saveOptionalConfig: params => (
    admin.patch('/currency/config?type=detail', params, {
      validateStatus: s => (s === 201)
    })
  )
}
