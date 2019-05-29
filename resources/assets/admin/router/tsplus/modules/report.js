export default {
  path: '/reports',
  component: () => import(/* webpackChunkName: 'report' */ '@/layout'),
  name: 'Reports',
  meta: { title: 'reports' },
  children: [
    {
      path: 'list',
      name: 'Reports-List',
      meta: { title: 'reports' },
      component: () => import(/* webpackChunkName: 'report' */ '@/views/tsplus/report/report')
    }
  ]
}
