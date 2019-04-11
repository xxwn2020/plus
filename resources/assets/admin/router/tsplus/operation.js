import Layout from '@/layout'

const OperationRouter = {
  path: '/operation',
  component: Layout,
  name: 'Opration',
  meta: { title: 'operation', icon: 'dashboard' },
  children: [
    {
      path: 'basic',
      name: 'Operation-Basic',
      meta: { title: 'operationBasic' },
      component: () => import('@/views/tsplus/operation/basic/index')
    },
    {
      path: 'sensitive-words',
      name: 'Operation-Sensitive-Words',
      meta: { title: 'operationSensitiveWords' },
      component: () => import('@/views/tsplus/operation/sensitive-words/index')
    },
    {
      path: 'areas',
      name: 'Operation-Areas',
      meta: { title: 'operationAreas' },
      component: () => import('@/views/tsplus/operation/areas/index')
    }
  ]
}

export default OperationRouter
