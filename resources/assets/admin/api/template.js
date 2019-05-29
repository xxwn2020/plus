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
  ),
  /* 获取pc端的导航内容 */
  getPcNavs: id => (
    admin.get(`/nav/list/${id}`, {
      validateStatus: s => (s === 200)
    })
  ),
  savePcNav: params => (
    admin.post('/nav/manage', params, {
      validateStatus: s => (s === 201)
    })
  ),
  delPcNav: id => (
    admin.delete(`/nav/del${id}`, {
      validateStatus: s => (s === 204)
    })
  )
}
