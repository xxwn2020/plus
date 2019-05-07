import { admin } from './http'

// const fileSize = new Resource('/file-storage/file-size', admin)

export default {
  /* 上传文件大小控制 */
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
  /* 上传文件mime控制 */
  getMimes: () => (
    admin.get('/file-storage/file-mime-types', {
      validateStatus: s => (s === 200)
    })
  ),
  saveMimes: params => (
    admin.patch('/file-storage/file-mime-types', params, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 上传图片尺寸控制 */
  getImageDimension: () => (
    admin.get('/file-storage/image-dimension', {
      validateStatus: s => (s === 200)
    })
  ),
  saveImageDimension: params => (
    admin.patch('/file-storage/image-dimension', params, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 文件公开系统控制 */
  getPublicChannel: () => (
    admin.get('/file-storage/channels/public', {
      validateStatus: s => (s === 200)
    })
  ),
  savePublicChannel: params => (
    admin.patch('/file-storage/channels/public', params, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 默认文件系统控制 */
  getDefaultFileSystem: () => (
    admin.get('/file-storage/default-filesystem', {
      validateStatus: s => (s === 200)
    })
  ),
  saveDefaultFileSystem: params => (
    admin.patch('/file-storage/default-filesystem', params, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 本地存储设置 */
  getLocalFileSystem: () => (
    admin.get('/file-storage/filesystems/local', {
      validateStatus: s => (s === 200)
    })
  ),
  saveLocalFileSystem: params => (
    admin.patch('/file-storage/filesystems/local', 'params', {
      validateStatus: s => (s === 204)
    })
  ),
  /* Ali Oss 设置 */
  getAliOssConfiguration: () => (
    admin.get('/file-storage/filesystems/aliyun-oss', {
      validateStatus: s => (s === 200)
    })
  ),
  saveAliOssConfiguration: params => (
    admin.patch('/file-storage/filesystems/aliyun-oss', params, {
      validateStatus: s => (s === 204)
    })
  ),
  /* 旧版的cdn设置 */
  /* 选中的cdn系统 */
  getSelectedCdn: () => (
    admin.get('/cdn/selected', {
      validateStatus: s => (s === 200)
    })
  ),
  /* 保存cdn设置 */
  getCdnConfiguration: cdn => (
    admin.get(`/cdn/${cdn}`, {
      validateStatus: s => (s === 200)
    })
  ),
  saveCdnConfiguration: (params, cdn) => (
    admin.post(`/cdn/${cdn}`, params, {
      validateStatus: s => (s === 201)
    })
  ),
  getLocalConfiguration: () => (
    admin.get('/cdn/filesystem/disk', {
      validateStatus: s => (s === 200)
    })
  ),
  getLocalFileSystemConfiguration: filesystem => (
    admin.get(`/cdn/filesystems/${filesystem}`, {
      validateStatus: s => (s === 200)
    })
  ),
  saveLocalFileSystemConfiguration: (params, fileSystem) => (
    admin.post(`/cdn/filesystems/${fileSystem}`, params, {
      validateStatus: s => (s === 201)
    })
  )
}
