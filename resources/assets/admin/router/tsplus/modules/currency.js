export default {
  path: '/currency',
  component: () => import(/* webpackChunkName: 'currency' */ '@/layout'),
  name: 'Currency',
  meta: { title: 'currency.root', icon: 'iconjifen', alwaysShow: true },
  redirect: '/currency/container',
  children: [
    {
      path: 'container',
      component: () => import(/* webpackChunkName: 'currency' */ '@/views/tsplus/currency/index'),
      name: 'Currency-Container',
      redirect: '/currency/container/turnover',
      hidden: true,
      children: [
        {
          path: 'statistics',
          component: () => import(/* webpackChunkName: 'currency' */ '@/views/tsplus/currency/statistics'),
          name: 'Currency-Statistics',
          meta: { title: 'currency.statistics', tabs: true }
        },
        {
          path: 'turnover',
          component: () => import(/* webpackChunkName: 'currency' */ '@/views/tsplus/currency/currency'),
          name: 'Currency-Turnover',
          meta: { title: 'currency.turnover', tabs: true }
        },
        {
          path: 'config',
          component: () => import(/* webpackChunkName: 'currency' */ '@/views/tsplus/currency/config'),
          name: 'Currency-Config',
          meta: { title: 'currency.config', tabs: true }
        },
        {
          path: 'audit',
          component: () => import(/* webpackChunkName: 'currency' */ '@/views/tsplus/currency/audit'),
          name: 'Currency-Audit',
          meta: { title: 'currency.audit', tabs: true }
        }
      ]
    }
  ]
}
