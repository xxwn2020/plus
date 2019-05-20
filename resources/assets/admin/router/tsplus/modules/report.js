export default [
  {
    path: '/reports',
    component: () => import(/* webpackChunkName: 'operation' */ '@/layout'),
    name: 'Reports',
    meta: { title: 'reports' },
    children: [
      {
        path: 'list',
        name: 'Reports-List',
        meta: { title: 'admin.reports.root' }
      }
    ]
  }
]
