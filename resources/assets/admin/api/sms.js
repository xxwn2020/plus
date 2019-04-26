import { admin, Resource } from './http'

const configures = new Resource('/sms/configures', admin)

export default {
  /* 短信记录 */
  smsLogs: params => (
    admin.get('/sms', {
      params,
      validateStatus: s => (s === 200)
    })
  ),
  ...configures.map({
    list: 'list'
  }),
  saveSmsConfigure: params => (
    admin.patch('/sms/configures', params, {
      validateStatus: s => (s === 201)
    })
  )
}
