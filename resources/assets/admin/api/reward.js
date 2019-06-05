import { admin } from './http'

export default {
  getRewardStatistics: params => (
    admin.get('/rewards/statistics', {
      params,
      validateStatus: s => (s === 200)
    })
  ),
  rewards: params => (
    admin.get('/rewards', {
      params,
      validateStatus: s => (s === 200)
    })
  )
}
