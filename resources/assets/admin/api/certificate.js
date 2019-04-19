import { admin, Resource } from './http'
const certificate = new Resource('/certifications', admin)

export default {
  ...certificate.map({
    save: 'save',
    get: 'get',
    del: 'del',
    list: 'list'
  })
}
