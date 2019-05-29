import { admin, Resource } from './http'

const reports = new Resource('/reports', admin)
export default {
  ...reports.map({
    list: 'list'
  }),
  /* 处理举报 */
  dealReport: ({ id, params, type }) => (
    admin.patch(`reports/${id}/${type}`, params, {
      validateStatus: s => (s === 201)
    })
  )
}
