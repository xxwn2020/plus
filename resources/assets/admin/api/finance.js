import { admin } from './http'

export default {
  /* 钱包统计 */
  getStatistics: () => (
    admin.get('/new-wallet/statistics', {
      validateStatus: s => (s === 200)
    })
  ),
  /* 流水列表 */
  getFlow: params => (
    admin.get('/new-wallet/waters', {
      params,
      validateStatus: s => (s === 200)
    })
  )
}
