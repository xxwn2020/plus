import { admin } from './http'
export default {
  cleanDataCache: () => (
    admin.get('/auxiliary/clear', {
      validateStatus: s => (s === 200)
    })
  ),
  cleanConfigCache: () => (
    admin.get('/auxiliary/clearConfigCache', {
      validateStatus: s => (s === 200)
    })
  ),
  cleanRouteCache: () => (
    admin.get('/auxiliary/clearRouteCache', {
      validateStatus: s => (s === 200)
    })
  )
}
