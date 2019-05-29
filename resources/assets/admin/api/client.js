import { admin, Resource } from './http'

const client = new Resource('/settings/web-clients', admin)

export default {
  ...client.map({
    list: 'list'
  }),
  saveClientSetting: params => (
      admin.patch('/settings/web-clients', params, {
        validateStatus: s => (s === 204)
      })
  )
}
