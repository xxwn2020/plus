const Layout = () => import(/* webpackChunkName: 'operation' */ '@/layout')

const OperationRouter = {
  path: '/operation',
  component: Layout,
  name: 'Operation',
  redirect: '/operation/basic/siteInfo',
  meta: { title: 'operation.root', icon: 'dashboard' },
  children: [
    {
      path: 'basic',
      name: 'Operation-Basic',
      meta: { title: 'operation.basic' },

      redirect: '/operation/basic/siteInfo',
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/operation/basic/index'),
      children: [
        {
          path: 'siteInfo',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/operation/basic/siteInfo'),
          meta: { title: 'operation.info.root', tabs: true },
          name: 'Operation-Basic-SiteInfo'
        }, {
          path: 'setting',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/operation/basic/setting'),
          meta: { title: 'operation.site.root', tabs: true },
          name: 'Operation-Basic-Setting'
        }, {
          path: 'cache',
          meta: { title: 'operation.cache.root', tabs: true },
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/operation/basic/cache'),
          name: 'Operation-Basic-Cache'
        }
      ]
    },
    {
      path: 'sensitive-words',
      name: 'Operation-Sensitive-Words',
      meta: { title: 'operation.sensitiveWords' },
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/operation/sensitive-words/index')
    },
    {
      path: 'client-configuration',
      name: 'Operation-Client-Configuration',
      meta: { title: 'operation.client' },
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/operation/clients/clients.vue')
    },
    {
      path: 'areas',
      name: 'Operation-Areas',
      meta: { title: 'operation.areas' },
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/operation/areas/index')
    }
  ]
}

export default OperationRouter
