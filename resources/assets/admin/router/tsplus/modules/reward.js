export default {
  path: '/rewards',
  component: () => import(/* webpackChunkName: 'reward' */ '@/layout'),
  name: 'Rewards',
  meta: { title: 'rewards.root' },
  redirect: '/rewards/container',
  children: [

  ]
}
