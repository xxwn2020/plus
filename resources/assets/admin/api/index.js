import http, { normError } from './http'
import systemInfo from './systemInfo'
import users from './user'
import roles from './roles'
import abilities from './ability'
import storage from './storage'
import certifications from './certificate'
import tags from './tag'
import baseinfo from './baseinfo'

const api = {
  normError,
  http,
  systemInfo,
  users,
  roles,
  abilities,
  storage,
  certifications,
  tags,
  baseinfo
}

api.install = Vue => (Vue.prototype.$api = api)

export default api
