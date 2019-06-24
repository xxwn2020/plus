const FinanceRouter = {
  path: '/finance',
  component: () => import(/* webpackChunkName: 'finance' */ '@/layout'),
  name: 'Finance-Wrap',
  meta: { title: 'finance.root', icon: 'iconcaiwu' },
  redirect: '/finance/wallet/statistics',
  children: [
    {
      path: 'wallet',
      component: () => import(/* webpackChunkName: 'finance' */ '@/views/tsplus/finance/wallet/wallet'),
      name: 'Finance-Wallet',
      meta: {
        title: 'finance.wallet', icon: 'iconwallet_icon'
      },
      redirect: '/finance/wallet/statistics',
      children: [
        {
          path: 'statistics',
          component: () => import(/* webpackChunkName: 'finance' */ '@/views/tsplus/finance/wallet/statistics'),
          name: 'Finance-Wallet-Statistics',
          meta: { title: 'finance.statistics', tabs: true , icon: 'iconzhandianshujutongji'}
        },
        {
          path: 'setting',
          component: () => import(/* webpackChunkName: 'finance' */ '@/views/tsplus/finance/wallet/setting'),
          name: 'Finance-Wallet-Setting',
          meta: { title: 'finance.setting', tabs: true , icon: 'iconqianbaoqiandaiyue'}
        },
        {
          path: 'flow',
          component: () => import(/* webpackChunkName: 'finance' */ '@/views/tsplus/finance/wallet/flow'),
          name: 'Finance-Wallet-Flow',
          meta: { title: 'finance.flow', tabs: true , icon: 'iconzijinliushui'}
        },
        {
          path: 'cashes',
          component: () => import(/* webpackChunkName: 'finance' */ '@/views/tsplus/finance/wallet/cashes'),
          name: 'Finance-Wallet-Cashes',
          meta: { title: 'finance.cashes', tabs: true , icon: 'icontixian'}
        }
      ]
    }
  ]
}

export default FinanceRouter
