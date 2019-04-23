/* 对应:  */
import http, { normError } from './http'
/* 对应:  */
import systemInfo from './systemInfo'
/* 对应:  */
import users from './user'
/* 对应:  */
import roles from './roles'
/* 对应:  */
import abilities from './ability'
/* 对应:  */
import storage from './storage'
/* 对应:  */
import certifications from './certificate'
/* 对应:  */
import tags from './tag'
/* 基本设置 对应: /operation/basic/baseinfo */
import baseinfo from './baseinfo'

/* 站点配置 对应 /operation/basic/setting */
import configures from './configure'

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
  baseinfo,
  configures
}

api.install = Vue => (Vue.prototype.$api = api)

export default api
