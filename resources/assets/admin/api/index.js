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
/* 缓存信息管理, 对应 /operation/basic/cache */
import caches from './cache'
/* 敏感词管理, 对应 /operation/sensitive-words */
import sensitiveWords from './sensitive-word'

import sms from './sms'
import mail from './mail'
/* 跨域设置，对应 /system/cors */
import cors from './cors'
/* 对应存储配置 */
import storageConfig from './storageConfig'
/* 对应财务管理 */
import finance from './finance'
/* 对应系统设置 -> 用户设置 */
import userConfig from './user-config'
/* 对应系统设置 -> 地区设置 */
import area from './area'
/* 对应运营管理 -> 客户端设置 */
import client from './client'
/* 对应网页模版 */
import template from './template'

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
  configures,
  caches,
  sensitiveWords,
  sms,
  mail,
  cors,
  storageConfig,
  finance,
  userConfig,
  area,
  client,
  template
}

api.install = Vue => (Vue.prototype.$api = api)

export default api
