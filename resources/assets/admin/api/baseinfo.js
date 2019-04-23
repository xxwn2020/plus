import { admin, Resource } from './http'

const baseinfo = new Resource('/site/baseinfo', admin)

export default {
  ...baseinfo.map({
    list: 'list'
  }),
  save: params => (
    admin.patch('/site/baseinfo', params, {
      validateStatus: s => (s === 201)
    })
  )
}
