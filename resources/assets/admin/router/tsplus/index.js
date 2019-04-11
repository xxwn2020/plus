import Layout from '@/layout'

const tsplusRouter = {
  path: '/management',
  component: Layout,
  redrect: '/management/users/list',
  name: 'management-index',
  meta: { title: '管理', icon: 'dashboard' },
  children: [
    {
      path: 'users',
      component: () => import('@/views/tsplus/management/users/users'),
      name: 'management-users',
      meta: { title: '用户管理' },
      redrect: '/management/users/list',
      children: [
        {
          path: 'list',
          component: () => import('@/views/tsplus/management/users/list'),
          name: 'management-users-list',
          meta: { title: '用户列表' }
        },
        {
          path: 'list1',
          component: () => import('@/views/tsplus/management/users/list'),
          name: 'management-users-list1',
          meta: { title: '用户列表1' }
        }
      ]
    },
    {
      path: 'tags',
      component: () => import('@/views/tsplus/management/tags/index'),
      name: 'management-tags',
      meta: { title: '标签管理' },
    },
    {
      path: 'integral',
      component: () => import('@/views/tsplus/management/integral/index'),
      name: 'management-integral',
      meta: { title: '积分管理' }
    }
  ]
}

export default tsplusRouter
