export default {
  path: '/templates',
  name: 'Templates',
  meta: { title: 'templates.root', icon: 'iconyemian' },
  component: () => import(/* webpackChunkName: 'template' */ '@/layout'),
  redirect: '/templates/about-us',
  children: [
    {
      path: 'about-us',
      name: 'Templates-About-Us',
      component: () => import(/* webpackChunkName: 'template' */ '@/views/tsplus/template/about-us/about-us'),
      meta: { title: 'templates.aboutUs', icon: 'iconguanyu' }
    }
    // todo
    // {
    //   path: 'menus',
    //   name: 'Templates-Pc-Menus',
    //   meta: { title: 'templates.menu' },
    //   component: () => import(/* webpackChunkName: 'template' */ '@/views/tsplus/template/menus/menus')
    // }
  ]
}

