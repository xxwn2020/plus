import { admin } from './http'

/* 系统信息 */
export default {
  getSystemInfo: () => (
    admin.get('/site/systeminfo', {
      validateStatus: s => (s === 200)
    })
  )
}
