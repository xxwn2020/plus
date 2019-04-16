import { admin, Resource } from './http'
const abilities = new Resource('/abilities', admin)

export default {
  ...abilities.map({
    get: 'get',
    save: 'save',
    del: 'del',
    list: 'list'
  })
}
