export default {
  path: '/promotion',
  component: () => import(/* webpackChunkName: 'promotion' */ '@/layout'),
  name: 'Promotion',
  meta: { title: 'promotion.root' },
  redirect: '/promotion/ad',
  children: [

  ]
}
