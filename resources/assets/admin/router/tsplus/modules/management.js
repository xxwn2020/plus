import Layout from '@/layout'

const managementRouter = {
  path: '/management',
  component: Layout,
  name: 'management-index',
  meta: { title: 'management.root', icon: 'iconxitongguanli-' },
  redirect: '/management/container',
  children: [
    {
      path: 'container',
      component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/components/Container'),
      name: 'Management-Container',
      meta: { title: 'operation.basic', icon: 'iconpeizhi' },
      redirect: '/management/container/siteInfo',
      children: [
        {
          path: 'siteInfo',
          component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/basic/siteInfo'),
          meta: { title: 'operation.info.root', tabs: true, icon: 'iconzhandian' },
          name: 'Operation-Basic-SiteInfo'
        }, {
          path: 'setting',
          component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/basic/setting'),
          meta: { title: 'operation.site.root', tabs: true },
          name: 'Operation-Basic-Setting'
        }, {
          path: 'cache',
          meta: { title: 'operation.cache.root', tabs: true, icon: 'iconqinglihuancun' },
          component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/basic/cache'),
          name: 'Operation-Basic-Cache'
        }
      ]
    },
    {
      path: 'sensitive-words',
      name: 'Operation-Sensitive-Words',
      meta: { title: 'operation.sensitiveWords', icon: 'iconminganciku' },
      component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/sensitive-words/index')
    },
    {
      path: 'client-configuration',
      name: 'Operation-Client-Configuration',
      meta: { title: 'operation.client', icon: 'iconkehuduan' },
      component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/clients/clients.vue')
    },
    {
      path: 'areas',
      name: 'Operation-Areas',
      meta: { title: 'operation.areas', icon: 'icondiqu' },
      component: () => import(/* webpackChunkName: 'management' */ '@/views/tsplus/operation/areas/index')
    }
  ]
}

export default managementRouter
