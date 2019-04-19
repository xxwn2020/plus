import { apiv2, Resource } from './http'

const storageApi = new Resource('/storage', apiv2)

export default {
  ...storageApi.map({
    save: 'save'
  })
}
