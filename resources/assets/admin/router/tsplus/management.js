import Layout from '@/layout'

const managementRouter = {
  path: '/management',
  component: Layout,
  redrect: '/management/users/list',
  name: 'management-index',
  meta: { title: 'management', icon: 'dashboard' },
  children: [
    {
      path: 'users',
      component: () => import('@/views/tsplus/management/users/users'),
      name: 'management-users',
      meta: { title: 'users' },
      redrect: '/management/users/list',
      children: [
        {
          path: 'list',
          component: () => import('@/views/tsplus/management/users/list'),
          name: 'management-users-list',
          meta: { title: 'userList' }
        }
      ]
    },
    {
      path: 'tags',
      component: () => import('@/views/tsplus/management/tags/index'),
      name: 'management-tags',
      meta: { title: 'tags' },
    },
    {
      path: 'integral',
      component: () => import('@/views/tsplus/management/integral/index'),
      name: 'management-integral',
      meta: { title: 'integral' }
    }
  ]
}

export default managementRouter
