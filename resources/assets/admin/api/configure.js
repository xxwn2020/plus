import { admin, Resource } from './http'

const configure = new Resource('/site/configures', admin)

export default {
  ...configure.map({
    list: 'list'
  }),
  save: params => (
    admin.put('/update/site/configure', params, {
      validateStatus: s => (s === 201)
    })
  )
}
