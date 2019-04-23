import { admin, Resource } from './http'
const manageList = new Resource('/manages', admin)

export default {
  ...manageList.map({
    list: 'list'
  })
}
