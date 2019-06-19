import Layout from '@/layout'

const managementRouter = {
  path: '/management',
  component: Layout,
  name: 'management-index',
  meta: { title: 'management.root', icon: 'dashboard' },
  redirect: '/management/container',
  children: [
    {
      path: 'container',
      component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/components/Container'),
      name: 'Management-Container',
      meta: { title: 'operation.basic' },
      redirect: '/management/container/siteInfo',
      children: [
        {
          path: 'siteInfo',
          component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/basic/siteInfo'),
          meta: { title: 'operation.info.root', tabs: true },
          name: 'Operation-Basic-SiteInfo'
        }, {
          path: 'setting',
          component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/basic/setting'),
          meta: { title: 'operation.site.root', tabs: true },
          name: 'Operation-Basic-Setting'
        }, {
          path: 'cache',
          meta: { title: 'operation.cache.root', tabs: true },
          component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/basic/cache'),
          name: 'Operation-Basic-Cache'
        }
      ]
    },
    {
      path: 'sensitive-words',
      name: 'Operation-Sensitive-Words',
      meta: { title: 'operation.sensitiveWords' },
      component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/sensitive-words/index')
    },
    {
      path: 'client-configuration',
      name: 'Operation-Client-Configuration',
      meta: { title: 'operation.client' },
      component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/clients/clients.vue')
    },
    {
      path: 'areas',
      name: 'Operation-Areas',
      meta: { title: 'operation.areas' },
      component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/areas/index')
    }
  ]
}

export default managementRouter
