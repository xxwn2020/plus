import { admin, Resource } from './http'

const cors = new Resource('/settings/cors', admin)

export default {
  ...cors.map({
    list: 'list'
  }),
  /* 保存cors配置 */
  save: params => (
    admin.put('/settings/cors', params, {
      validateStatus: s => (s === 204)
    })
  )
}
