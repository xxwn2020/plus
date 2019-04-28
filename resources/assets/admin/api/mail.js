import { admin } from './http'

export default {
  list: () => (
    admin.get('/site/mail', {
      validateStatus: s => (s === 200)
    })
  ),
  save: params => (
    admin.patch('/site/mail', params, {
      validateStatus: s => (s === 201)
    })
  ),
  test: params => (
    admin.post('/site/sendmail', params, {
      validateStatus: status => (status === 201)
    })
  )
}
