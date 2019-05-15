import { admin } from './http'

export default {
  /* 保存注册设置 */
  saveUserConfig: params => (
    admin.post('/users/register-setting', params, {
      validateStatus: s => (s === 201)
    })
  ),
  /* 获取注册设置 */
  getUserConfig: () => (
    admin.get('/users/register-setting', {
      validateStatus: s => (s === 200)
    })
  ),
  /* 获取默认用户组 */
  getUserRole: () => (
    admin.get('/user/setting', {
      validateStatus: s => (s === 200)
    })
  ),
  /* 保存默认用户组 */
  saveUserRole: params => (
    admin.patch('/user/setting', params, {
      validateStatus: s => (s === 201)
    })
  ),
  /* 获取im-helper设置 */
  getImHelper: () => (
    admin.get('/im/helper-user', {
      validateStatus: s => (s === 200)
    })
  ),
  /* 保存im-helper设置 */
  saveImHelper: params => (
    admin.put('/im/helper-user', params, {
      validateStatus: s => (s === 204)
    })
  )
}
