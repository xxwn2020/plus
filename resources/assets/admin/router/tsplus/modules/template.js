export default {
  path: '/templates',
  name: 'Templates',
  meta: { title: 'templates.root' },
  component: () => import(/* webpackChunkName: 'template' */ '@/layout'),
  children: [
    {
      path: 'about-us',
      name: 'Templates-About-Us',
      component: () => import(/* webpackChunkName: 'template' */ '@/views/tsplus/template/about-us/about-us'),
      meta: { title: 'templates.aboutUs' }
    },
    {
      path: 'menus',
      name: 'Templates-Menus',
      meta: { title: 'templates.menu' }
    }
  ]
}

