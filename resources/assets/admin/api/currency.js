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
  ),
  statistics: () => (
    admin.get('/currency/overview', {
      validateStatus: s => (s === 200)
    })
  ),
  /* 设置用户的积分 */
  setUserCurrency: params => (
    admin.post('/currency/add', params, {
      validateStatus: s => (s === 200)
    })
  ),
  fetchCash: params => (
    admin.get('/currency/cash', {
      params,
      validateStatus: s => (s === 200)
    })
  ),
  /* 审核积分提现申请 */
  handleAudit: ({ id, state, mark }) => (
    admin.patch(`currency/cash/${id}/audit`, { state, mark }, {
      validateStatus: s => (s === 201)
    })
  )
}
