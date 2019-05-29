import { admin } from './http'

export default {
  /* 获取关于我们 */
  getAboutUs: () => (
    admin.get('/about-us', {
      validateStatus: s => (s === 200)
    })
  ),
  /* 保存关于我们 */
  saveAboutUs: params => (
    admin.patch('/about-us', params, {
      validateStatus: s => (s === 204)
    })
  )
}
