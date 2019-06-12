import http from 'axios'
import { isCanceled } from '@/utils/tools'

const { baseURL: adminBaseUrl } = window.FEED
// API公共请求参数.
http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// 创建一个新实例.
const createInstance = (options) => {
  if (typeof options === 'string') {
    options = { baseURL: options }
  } else {
    options = options || {}
  }

  options.headers = {
    ...options.headers || {}
  }

  const instance = http.create(options)

  instance.isCancel = http.isCancel.bind(http)
  instance.CancelToken = http.CancelToken.bind(http)

  return instance
}
// 创建并导出两个API实例
export const admin = createInstance(adminBaseUrl)
export const adminBase = createInstance(
  document.location.protocol + '//' + document.location.hostname)

// 创建并导出一个资源类
export class Resource {
  constructor (uri, api) {
    this.api = api
    this.uri = encodeURI(uri)
  }

  list (params = {}) {
    return this.api.get(`${this.uri}`, {
      params, validateStatus: s => s === 200
    })
  }

  get (id, params = {}) {
    id = id ? encodeURIComponent(id) : id

    return this.api.get(`${this.uri}/${id}`, {
      params, validateStatus: s => s === 200
    })
  }

  save (data, id = null) {
    id = id ? encodeURIComponent(id) : id
    const method = id ? 'patch' : 'post'
    const uri = this.uri + (id ? `/${id}` : '')

    return this.api[method](uri, data, {
      validateStatus: s => [200, 201, 204].includes(s)
    })
  }

  del (id) {
    id = id ? encodeURIComponent(id) : id

    return this.api.delete(`${this.uri}/${id}`, {
      validateStatus: s => s === 204 || s === 404
    })
  }

  map (mapper) {
    const map = {}

    if (typeof mapper === 'object') {
      const isArr = Array.isArray(mapper)

      for (const key in mapper) {
        const method = mapper[key]
        const alias = isArr ? method : key

        if (this[method] && method !== 'map') {
          map[alias] = this[method].bind(this)
        }
      }
    }

    return map
  }
}

/**
 * 标准化API错误.
 *
 * @param {*} error
 * @return {Object}
 */
export const normError = (error) => {
  let status, message, errors
  const canceled = isCanceled(error) ||
    http.isCancel(error)

  if (!canceled && error.response) {
    status = error.response.status
    const data = error.response.data

    if (typeof data === 'object') {
      errors = { ...(data.errors || data) }

      if (!data.errors) {
        const keys = [
          'message',
          'line',
          'file',
          'trace',
          'exception'
        ]
        keys.forEach((key) => {
          if (key in errors) {
            delete errors[key]
          }
        })
      }

      if (Object.keys(errors).length) {
        for (const key in errors) {
          message = errors[key]
          break
        }
      } else {
        message = data.message
      }

      if (Array.isArray(message)) {
        message = message.join('\n')
      }
    } else {
      message = `${data}`
    }
  } else {
    message = error.message || `${error}`
  }

  return { status, message, errors, canceled }
}

export default http
