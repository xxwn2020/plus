const Layout = () => import(/* webpackChunkName: 'system' */ '@/layout')

const SystemRouter = {
  path: '/system',
  component: Layout,
  name: 'System',
  meta: { title: 'system.root', icon: 'tree' },
  redirect: '/system/info',
  children: [
    {
      path: 'info',
      component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/systemInfo'),
      name: 'System-Info',
      meta: { title: 'system.info', icon: 'example' }
    },
    {
      path: 'register',
      // component: RegisterSetting,
      name: 'System-Register-Setting',
      meta: { title: 'system.registerSetting', icon: 'user' }
    },
    {
      path: 'certification',
      name: 'System-Certification-Setting',
      meta: { title: 'system.certification', icon: 'people' }
    },
    {
      path: 'thirdparty',
      name: 'System-Thirdparty-Setting',
      meta: { title: 'system.thirdparty', icon: 'wechat' }
    },
    {
      path: 'sms',
      name: 'System-Sms-Setting',
      meta: { title: 'system.smsSetting', icon: 'message' }
    },
    {
      path: 'mail',
      name: 'System-Mail-Setting',
      meta: { title: 'system.mailSetting', icon: 'email' }
    },
    {
      path: 'payment',
      name: 'System-Payment-Setting',
      meta: { title: 'system.payment', icon: 'money' }
    }
  ]
}

export default SystemRouter
