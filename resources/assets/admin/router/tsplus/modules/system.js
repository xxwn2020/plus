const SystemRouter = {
  path: '/system',
  component: () => import(/* webpackChunkName: 'system' */ '@/layout'),
  name: 'System',
  meta: { title: 'system.root', icon: 'iconpeizhi' },
  redirect: '/system/info',
  children: [
    {
      path: 'info',
      component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/systemInfo'),
      name: 'System-Info',
      meta: { title: 'system.info', icon: 'example' }
    },
    {
      path: 'user',
      name: 'System-User-Setting',
      component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/user'),
      meta: { title: 'system.user.root', icon: 'people' },
      redirect: '/system/user/configure',
      children: [
        {
          path: 'configure',
          name: 'System-User-Setting-Configure',
          component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/user/config'),
          meta: { title: 'system.user.config', icon: 'people', tabs: true }
        },
        {
          path: 'authentication',
          name: 'System-User-Setting-Certification',
          component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/user/certificate/certificate'),
          meta: {
            title: 'system.user.certification',
            icon: 'people',
            tabs: true
          }
        },
        {
          path: 'thirdParts',
          name: 'System-User-Setting-ThirdParts',
          component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/user/thirdParts'),
          meta: {
            title: 'system.user.thirdParts.root',
            icon: 'people',
            tabs: true
          }
        }
      ]
    },
    {
      path: 'payment-setting',
      name: 'System-Payment-Setting',
      component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/payment'),
      meta: { title: 'system.payment.root', icon: 'money' },
      redirect: '/system/payment-setting/basic',
      children: [
        {
          path: 'basic',
          name: 'System-Payment-Setting-Basic',
          component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/payment/basic'),
          meta: { title: 'system.payment.secretRequired', tabs: true }
        },
        {
          path: 'native',
          component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/payment/native'),
          name: 'System-Payment-Setting-Native',
          meta: { title: 'system.payment.native', tabs: true }
        },
        {
          path: 'applePay',
          name: 'System-Payment-Setting-ApplePay',
          component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/payment/applePay'),
          meta: { title: 'system.payment.applePay', tabs: true }
        },
        {
          path: 'paymentOptions',
          component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/payment/payType'),
          name: 'System-Payment-Setting-PaymentOptions',
          meta: { title: 'system.payment.paymentOption', tabs: true }
        }
      ]
    },
    {
      path: 'sms',
      name: 'System-Sms-Setting',
      component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/sms/index'),
      meta: { title: 'system.sms.root', icon: 'message' },
      redirect: '/system/sms/logs',
      children: [
        {
          path: 'logs',
          component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/sms/logs/index'),
          name: 'System-Sms-Log',
          meta: { tabs: true, title: 'system.sms.list' }
        },
        {
          path: 'configure',
          component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/sms/configure/index'),
          name: 'System-Sms-Config',
          meta: { tabs: true, title: 'system.sms.config' }
        }
      ]
    },
    {
      path: 'mail',
      name: 'System-Mail-Setting',
      meta: { title: 'system.mailSetting', icon: 'email' },
      component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/mail/configure')
    },
    {
      path: 'cors',
      name: 'System-Cors',
      component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/cors/cors'),
      meta: { title: 'system.cors.root', icon: 'lock' }
    },
    {
      path: 'storage',
      name: 'System-Storage',
      meta: { title: 'system.storage.root', icon: 'lock' },
      component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/storage/firstWrap'),
      redirect: '/system/storage/basic',
      children: [
        {
          path: 'cdn',
          component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/storage/oldCdn'),
          name: 'System-Storage-Cdn',
          meta: { title: 'system.cdn.root' }
        },
        {
          path: 'new-store',
          name: 'System-Storage-Storage',
          meta: { title: 'system.storage.new' },
          component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/storage/newStorage'),
          redirect: '/system/storage/new-store/basic',
          children: [
            {
              path: 'basic',
              name: 'System-Storage-Basic',
              component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/storage/basic'),
              meta: { title: 'system.storage.basic', tabs: true }
            },
            {
              path: 'filesystems',
              name: 'System-Storage-FileSystems',
              component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/storage/filesystems'),
              meta: { title: 'system.storage.filesystems', tabs: true }
            },
            {
              path: 'channels',
              name: 'System-Storage-Channels',
              component: () => import(/* webpackChunkName: 'system' */ '@/views/tsplus/system/storage/channels'),
              meta: { title: 'system.storage.channels', tabs: true }
            }
          ]
        }
      ]
    }
  ]
}

export default SystemRouter
