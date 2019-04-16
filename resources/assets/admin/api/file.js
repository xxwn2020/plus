import md5 from 'js-md5'
import { Base64 } from 'js-base64'
import queryString from 'query-string'
import { apiv2 } from './http'
import {
  readBlobAs,
  createCancel,
  createCancellablePromise
} from '@/utils/tools'

const { baseURL } = window.TS

export default {

  /**
     * 获取文件下载链接
     * @param {*} id
     * @param {*} params
     */
  url (node, params = {}) {
    let query = { rule: '' }
    let rule = ''
    if (Object.keys(params).length) {
      for (let i in params) {
        rule += `${i}_${params[i]},`
      }
      query.rule = rule
      query = queryString.stringify(query)
    }
    node = node.split(':')
    const url = `${baseURL}/storage/${node[0]}:${Base64.encode(node[1])}`

    return rule ? `${url}?${query}` : url
  },

  /**
   * 检查文件是否已上传过
   * @param {*} file
   */
  uploaded (file) {
    return createCancellablePromise(
      async (resolve, reject, setCancel) => {
        try {
          let hash = null

          if (file instanceof window.Blob) {
            const readPromise = readBlobAs(
              file, 'ArrayBuffer'
            )

            setCancel(readPromise.cancel)
            hash = md5(await readPromise)
          } else {
            hash = `${file}`
          }

          const { data: { id } = {} } = await apiv2.get(
            `/files/uploaded/${hash}`, {
              validateStatus: s => s === 200 || s === 404,
              cancelToken: new apiv2.CancelToken(setCancel)
            }
          )

          resolve(id)
        } catch (e) {
          reject(apiv2.isCancel(e) ? createCancel() : e)
        }
      }
    )
  },

  /**
   * 上传一个文件
   * @param {*} file
   * @param {*} onProgress
   * @param {*} checkUploaded
   */
  upload (file, onProgress = null, checkUploaded = true) {
    return createCancellablePromise(
      async (resolve, reject, setCancel) => {
        try {
          if (checkUploaded) {
            const checkPromise = this.uploaded(file)

            setCancel(checkPromise.cancel)
            const id = await checkPromise

            if (id) {
              resolve(id)
              return
            }
          }

          const fd = new window.FormData()
          fd.append('file', file)

          const { data: { id } = {} } = await apiInstance.post(
            `/files`, fd, {
              validateStatus: s => s === 200 || s === 201,
              onUploadProgress: onProgress || (() => { }),
              cancelToken: new apiInstance.CancelToken(setCancel)
            }
          )

          resolve(id)
        } catch (e) {
          reject(apiInstance.isCancel(e) ? createCancel() : e)
        }
      }
    )
  }
}
