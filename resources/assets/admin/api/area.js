import { admin, Resource } from './http'

const area = new Resource('/site/areas', admin)

export default {
  ...area.map({
    list: 'list',
    save: 'save',
    del: 'del'
  })
}
