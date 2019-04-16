import http, { normError } from './http'
import systemInfo from './systemInfo'
import users from './user'
import roles from './roles'
import abilities from './ability'
const api = {
  normError,
  http,
  systemInfo,
  users,
  roles,
  abilities
}

api.install = Vue => (Vue.prototype.$api = api)

export default api
