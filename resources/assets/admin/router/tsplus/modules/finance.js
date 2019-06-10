const FinanceRouter = {
  path: '/finance',
  // component: () => import(/* webpackChunkName: 'finance' */ '@/views/tsplus/finance/index'),
  component: () => import(/* webpackChunkName: 'system' */ '@/layout'),
  name: 'Finance-Wrap',
  meta: { title: 'finance.root', icon: 'tree' },
  redirect: '/finance/wallet/statistics',
  children: [
    {
      path: 'wallet',
      component: () => import(/* webpackChunkName: 'finance' */ '@/views/tsplus/finance/wallet/wallet'),
      name: 'Finance-Wallet',
      meta: {
        title: 'finance.wallet'
      },
      redirect: '/finance/wallet/statistics',
      children: [
        {
          path: 'statistics',
          component: () => import(/* webpackChunkName: 'finance' */ '@/views/tsplus/finance/wallet/statistics'),
          name: 'Finance-Wallet-Statistics',
          meta: { title: 'finance.statistics', tabs: true }
        },
        {
          path: 'setting',
          component: () => import(/* webpackChunkName: 'finance' */ '@/views/tsplus/finance/wallet/setting'),
          name: 'Finance-Wallet-Setting',
          meta: { title: 'finance.setting', tabs: true }
        },
        {
          path: 'flow',
          component: () => import(/* webpackChunkName: 'finance' */ '@/views/tsplus/finance/wallet/flow'),
          name: 'Finance-Wallet-Flow',
          meta: { title: 'finance.flow', tabs: true }
        },
        {
          path: 'cashes',
          component: () => import(/* webpackChunkName: 'finance' */ '@/views/tsplus/finance/wallet/cashes'),
          name: 'Finance-Wallet-Cashes',
          meta: { title: 'finance.cashes', tabs: true }
        }
      ]
    }
  ]
}

export default FinanceRouter
