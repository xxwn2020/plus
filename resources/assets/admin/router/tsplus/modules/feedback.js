export default {
  path: '/feedback',
  component: () => import(/* webpackChunkName: 'feedback' */ '@/layout'),
  redirect: '/feedback/container',
  meta: { title: 'feedback' },
  children: [
    {
      path: 'container',
      name: 'Feedback-container',
      component: () => import(/* webpackChunkName: 'feedback' */ '@/views/tsplus/feedback/index'),
      hidden: true,
      redirect: '/feedback/container/list',
      children: [
        {
          path: 'list',
          name: 'Feedback-List',
          component: () => import(/* webpackChunkName: 'feedback' */ '@/views/tsplus/feedback/list'),
          meta: { title: 'feedback' }
        }
      ]
    }
  ]
}
