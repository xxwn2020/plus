import { admin, Resource } from './http'

const sensitiveWords = new Resource('/sensitives', admin)

export default {
  ...sensitiveWords.map({
    save: 'save',
    list: 'list',
    del: 'del'
  })
}
