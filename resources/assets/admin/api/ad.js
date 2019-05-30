import { admin, Resource } from './http'

const ad = new Resource('/ads', admin)

export default {
  ...ad.map({
    list: 'list',
    get: 'get',
    save: 'save',
    del: 'del'
  }),
  /* 获取广告位 */
  getAdSpaces: () => (
    admin.get('/ads/spaces', {
      validateStatus: s => (s === 200)
    })
  )
}
