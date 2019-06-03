export default {
  path: '/currency',
  component: () => import(/* webpackChunkName: 'currency' */ '@/layout'),
  name: 'Currency',
  meta: { title: 'currency.root' },
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
        }
      ]
    }
  ]
}
