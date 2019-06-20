export default {
  path: '/packages',
  component: () => import(/* webpackChunkName: 'package' */ '@/layout'),
  redirect: '/packages/list',
  name: 'Package-Container',
  meta: { title: 'packages.root' },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: 'package' */ '@/views/tsplus/packages/index'),
      meta: { title: 'packages.list' },
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
