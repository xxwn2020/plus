import { admin, Resource } from './http'

export default {
  /* 短信记录 */
  smsLogs: params => (
    admin.get('/sms', {
      params,
      validateStatus: s => (s === 200)
    })
  )
}
