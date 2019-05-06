import { admin } from './http'

// const fileSize = new Resource('/file-storage/file-size', admin)

export default {
  fileSize: () => (
    admin.get('/file-storage/file-size', {
      validateStatus: s => (s === 200)
    })
  ),
  saveFileSize: params => (
    admin.patch('/file-storage/file-size', params, {
      validateStatus: s => (s === 204)
    })
  ),
  getMimes: () => (
    admin.get('/file-storage/file-mime-types', {
      validateStatus: s => (s === 200)
    })
  ),
  saveMimes: params => (
    admin.patch('/file-storage/file-mime-types', params, {
      validateStatus: s => (s === 204)
    })
  )
}
