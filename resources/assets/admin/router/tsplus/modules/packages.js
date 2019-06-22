export default {
  path: '/packages',
  component: () => import(/* webpackChunkName: 'package' */ '@/layout'),
  redirect: '/packages/list',
  name: 'Package-Container',
  meta: { title: 'packages.root', icon: 'iconyingyong' },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: 'package' */ '@/views/tsplus/packages/index'),
      meta: { title: 'packages.list', icon: 'iconapplication' },
      name: 'Package-List'
    },
    {
      path: 'iframe/:key',
      hidden: true,
      component: () => import(/* webpackChunkName: 'package' */ '@/views/tsplus/packages/iframe'),
      name: 'Package-Manage',
      meta: { title: 'packages.manage', noCache: true }
    }
  ]
}
