import { admin, Resource } from './http'

export default {
  getSystemInfo: () => (
    admin.get('/site/systeminfo', {
      validateStatus: s => (s === 200)
    })
  )
}
