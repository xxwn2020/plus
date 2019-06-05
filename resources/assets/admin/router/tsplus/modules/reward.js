export default {
  path: '/rewards',
  component: () => import(/* webpackChunkName: 'reward' */ '@/layout'),
  name: 'Rewards',
  meta: { title: 'rewards.root' },
  redirect: '/rewards/container',
  children: [
    {
      path: 'container',
      name: 'Rewards-Container',
      component: () => import(/* webpackChunkName: 'reward' */ '@/views/tsplus/reward/index'),
      hidden: true,
      redirect: '/rewards/container/statistics',
      children: [
        {
          path: 'statistics',
          name: 'Rewards-Statistics',
          component: () => import(/* webpackChunkName: '' */ '@/views/tsplus/reward/statistics'),
          meta: { title: 'rewards.statistics', tabs: true }
        },
        {
          path: 'turnover',
          name: 'Rewards-Turnover',
          component: () => import(/* webpackChunkName: '' */ '@/views/tsplus/reward/turnover'),
          meta: { title: 'rewards.turnover', tabs: true }
        }
      ]
    }
  ]
}
