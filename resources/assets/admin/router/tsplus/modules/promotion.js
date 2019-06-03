export default {
  path: '/promotion',
  component: () => import(/* webpackChunkName: 'promotion' */ '@/layout'),
  name: 'Promotion',
  meta: { title: 'promotion.root' },
  redirect: '/promotion/ad',
  children: [
    {
      path: 'ad',
      component: () => import(/* webpackChunkName: 'promotion' */ '@/views/tsplus/promotion/ad'),
      meta: { title: 'promotion.ad' },
      name: 'Promotion-Ad'
    },
    {
      path: 'addAd',
      component: () => import(/* webpackChunkName: 'promotion' */ '@/views/tsplus/promotion/addAd'),
      name: 'Promotion-AddAd',
      meta: {title: 'promotion.addAd',noCache: true},
      hidden: true,
    },
    {
      path: 'editAdd/:id',
      component: () => import(/* webpackChunkName: 'promotion' */ '@/views/tsplus/promotion/addAd'),
      name: 'Promotion-EditAd',
      meta: {title: 'promotion.editAd',  noCache: true},
      hidden: true,
    },
  ]
}
