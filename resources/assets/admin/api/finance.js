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
  ),
  /* 提现审批 */
  getWalletCashes: params => (
    admin.get('/wallet/cashes', {
      params,
      validateStatus: s => (s === 200)
    })
  ),
  /**
   *
   * @param cashId
   * @param type [passed, refuse]
   * @param params
   * @returns {AxiosPromise<any>}
   */
  auditCash: ({ cashId, type, params }) => (
    admin.patch(`wallet/cashes/${cashId}/${type}`, params, {
      validateStatus: s => (s === 201)
    })
  )
}
