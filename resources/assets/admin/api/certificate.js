import { admin, Resource } from './http'

const certificate = new Resource('/certifications', admin)

export default {
  ...certificate.map({
    save: 'save',
    get: 'get',
    del: 'del',
    list: 'list'
  }),
  /* 获取认证列表 */
  getCates: () => (
    admin.get('/certification/categories', {
      validateStatus: s => (s === 200)
    })
  ),
  /* 更新认证类型 */
  saveCate: ({ name, params }) => (
    admin.put(`certification/categories/${name}`, params, {
      validateStatus: s => (s === 201)
    })
  ),
  updateIcon: ({ name, params }) => (
    admin.post(`/certification/categories/${name}/icon/upload`, params, {
      validateStatus: s => (s === 201)
    })
  )
}
