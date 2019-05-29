import { admin, Resource } from './http'

const area = new Resource('/site/areas', admin)

export default {
  ...area.map({
    list: 'list',
    save: 'save',
    del: 'del'
  }),
  getPopularCities: () => (
      admin.get('/site/areas/hots', {
        validateStatus: s => (s === 200)
      })
  ),
  savePopularCity: params => (
      admin.post('/site/areas/hots', params, {
        validateStatus: s => (s === 201)
      })
  )
}
