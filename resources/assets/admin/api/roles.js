import { admin, Resource } from './http'

const roles = new Resource('/roles', admin)

export default {
  ...roles.map({
    list: 'list',
    save: 'save',
    del: 'del',
    get: 'get'
  })
}
