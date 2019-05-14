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
  ),
  /* 钱包设置 */
  // 钱包相关的开关
  getWalletSwitch: () => (
    admin.get('/wallet/switch', {
      validateStatus: s => (s === 200)
    })
  ),
  // 保存钱包开关
  saveWalletSwitch: params => (
    admin.patch('/wallet/switch', params, {
      validateStatus: s => (s === 201)
    })
  ),
  // 获取钱包充值选项
  getWalletPayOption: () => (
    admin.get('/wallet/labels', {
      validateStatus: s => (s === 200)
    })
  ),
  // 保存钱包充值选项
  saveWalletPayOption: params => (
    admin.post('/wallet/labels', params, {
      validateStatus: s => (s === 201)
    })
  ),
  // 删除钱包充值选项
  deleteWalletPayOption: option => (
    admin.delete(`/wallet/labels/${option}`, {
      validateStatus: s => (s === 204)
    })
  ),
  // 获取钱包使用规则
  getWalletRule: () => (
    admin.get('/wallet/rule', {
      validateStatus: s => (s === 200)
    })
  ),
  // 保存钱包使用规则
  saveWalletRule: params => (
    admin.patch('/wallet/rule', params, {
      validateStatus: s => (s === 201)
    })
  ),
  // 获取钱包充值比例
  getWalletRatio: () => (
    admin.get('/wallet/ratio', {
      validateStatus: s => (s === 200)
    })
  ),
  // 保存钱包充值比例
  saveWalletRatio: params => (
    admin.patch('/wallet/ratio', params, {
      validateStatus: s => (s === 201)
    })
  ),
  // 支付密码开关
  getPayValidatePassword: () => (
    admin.get('/setting/security/pay-validate-password', {
      validateStatus: s => (s === 200)
    })
  ),
  savePayValidatePassword: params => (
    admin.put('/setting/security/pay-validate-password', params, {
      validateStatus: s => (s === 204)
    })
  ),
  // 获取原生支付设置
  getNativePaymentSetting: () => (
    admin.get('/wallet/newPaySetting', {
      validateStatus: s => (s === 200)
    })
  ),
  // 保存原生支付配置
  saveNativePaymentSetting: params => (
    admin.post('/wallet/newPaySetting', params, {
      validateStatus: s => (s === 201)
    })
  ),
  // 获取IAP配置内容
  getAppleIapSetting: () => (
    admin.get('/currency/apple/config', {
      validateStatus: s => (s === 200)
    })
  ),
  // 获取iap产品列表
  getIapItems: () => (
    admin.get('/currency/apple/products', {
      validateStatus: s => (s === 200)
    })
  ),
  // 保存IAP配置内容
  saveAppleIapSetting: params => (
    admin.patch('/currency/apple/config', params, {
      validateStatus: s => (s === 201)
    })
  ),
  // 新增iap产品
  saveIapItem: params => (
    admin.post('/currency/apple/products', params, {
      validateStatus: s => (s === 201)
    })
  ),
  // 删除iap产品
  deleteIapItem: id => (
    admin.delete(`/currency/apple/products?product_id=${id}`, {
      validateStatus: s => (s === 204)
    })
  ),
  // 获取充值类型
  getRechargeTypes: () => (
    admin.get('/wallet/recharge/types', {
      validateStatus: s => (s === 200)
    })
  ),
  // 保存充值类型
  saveRechargeTypes: params => (
    admin.patch('/wallet/recharge/types', params, {
      validateStatus: s => (s === 201)
    })
  )
}
