const Layout = () => import(/* webpackChunkName: 'operation' */ '@/layout')

const OperationRouter = {
  path: '/operation',
  component: Layout,
  name: 'Operation',
  meta: { title: 'operation', icon: 'dashboard' },
  children: [
    {
      path: 'basic',
      name: 'Operation-Basic',
      meta: { title: 'operationBasic' },
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/operation/basic/index')
    },
    {
      path: 'sensitive-words',
      name: 'Operation-Sensitive-Words',
      meta: { title: 'operationSensitiveWords' },
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/operation/sensitive-words/index')
    },
    {
      path: 'areas',
      name: 'Operation-Areas',
      meta: { title: 'operationAreas' },
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/operation/areas/index')
    }
  ]
}

export default OperationRouter
