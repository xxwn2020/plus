const Layout = () => import(/* webpackChunkName: 'operation' */ '@/layout')

const OperationRouter = {
  path: '/operation',
  component: Layout,
  name: 'Operation',
  redirect: '/operation/users',
  meta: { title: 'operation.root', icon: 'dashboard' },
  children: [
    /* 用户 */
    {
      path: 'users',
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/users/users'),
      name: 'management-users',
      meta: { title: 'management.users.root' },
      redirect: '/operation/users/list',
      children: [
        {
          path: 'list',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/users/list'),
          name: 'management-users-list',
          meta: { title: 'management.users.list', tabs: true }
        },
        {
          path: 'certifications',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/users/certifications'),
          name: 'management-users-certifications',
          meta: { title: 'management.users.certificated', tabs: true }
        },
        {
          path: 'certifications/add',
          hidden: true,
          name: 'management-users-certifications-add',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/users/addCertificated'),
          meta: {
            title: 'management.certifications.add',
            hidden: true,
            noCache: true
          }
        },
        {
          path: 'certifications/edit/:id',
          hidden: true,
          name: 'management-users-certifications-edit',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/users/editCertificated'),
          meta: {
            title: 'management.certifications.edit',
            hidden: true,
            noCache: true
          }
        },
        {
          path: 'roles',
          name: 'management-users-roles',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/users/roles'),
          meta: { title: 'management.users.roles', tabs: true }
        },
        {
          path: 'abilities',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/users/abilities'),
          name: 'management-users-abilities',
          meta: { title: 'management.users.abilities', tabs: true }
        },
        {
          path: 'edit/:uid',
          hidden: true,
          name: 'management-users-edit',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/users/edit'),
          meta: { title: 'management.users.edit', hidden: true, noCache: true }
        },
        {
          path: 'add',
          hidden: true,
          name: 'management-users-add',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/users/add'),
          meta: { title: 'management.users.edit', hidden: true, noCache: true }
        }
      ]
    },
    /* 标签 */
    {
      path: 'tags',
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/tags/index'),
      name: 'management-tags',
      meta: { title: 'management.tags.root' },
      redirect: '/management/tags/list',
      children: [
        {
          path: 'list',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/tags/list'),
          name: 'Management-Tags-List',
          meta: { title: 'management.tags.list', tabs: true }
        },
        {
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/management/tags/categories'),
          path: 'categories',
          name: 'Management-Tags-Categories',
          meta: { title: 'management.tags.categories', tabs: true }
        }
      ]
    },
    /* 积分 */
    {
      path: 'currency-container',
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/currency/index'),
      name: 'Currency-Container',
      redirect: '/operation/currency-container/turnover',
      hidden: true,
      children: [
        {
          path: 'statistics',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/currency/statistics'),
          name: 'Currency-Statistics',
          meta: { title: 'currency.statistics', tabs: true }
        },
        {
          path: 'turnover',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/currency/currency'),
          name: 'Currency-Turnover',
          meta: { title: 'currency.turnover', tabs: true }
        },
        {
          path: 'config',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/currency/config'),
          name: 'Currency-Config',
          meta: { title: 'currency.config', tabs: true }
        },
        {
          path: 'audit',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/currency/audit'),
          name: 'Currency-Audit',
          meta: { title: 'currency.audit', tabs: true }
        }
      ]
    },
    /* 打赏 */
    {
      path: 'rewards-container',
      name: 'Rewards-Container',
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/reward/index'),
      hidden: true,
      redirect: '/operation/rewards-container/statistics',
      children: [
        {
          path: 'statistics',
          name: 'Rewards-Statistics',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/reward/statistics'),
          meta: { title: 'rewards.statistics', tabs: true }
        },
        {
          path: 'turnover',
          name: 'Rewards-Turnover',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/reward/turnover'),
          meta: { title: 'rewards.turnover', tabs: true }
        }
      ]
    },
    /* 广告 */
    {
      path: 'ad',
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/promotion/ad'),
      meta: { title: 'promotion.ad' },
      name: 'Promotion-Ad'
    },
    {
      path: 'addAd',
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/promotion/addAd'),
      name: 'Promotion-AddAd',
      meta: { title: 'promotion.addAd', noCache: true },
      hidden: true
    },
    {
      path: 'editAdd/:id',
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/promotion/addAd'),
      name: 'Promotion-EditAd',
      meta: { title: 'promotion.editAd', noCache: true },
      hidden: true
    },
    /* 举报 */
    {
      path: 'list',
      name: 'Reports-List',
      meta: { title: 'reports' },
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/report/report')
    },
    /* 意见 */
    {
      path: 'feedback-container',
      name: 'Feedback-container',
      component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/feedback/index'),
      hidden: true,
      redirect: '/feedback/feedback-container/list',
      children: [
        {
          path: 'list',
          name: 'Feedback-List',
          component: () => import(/* webpackChunkName: 'operation' */ '@/views/tsplus/feedback/list'),
          meta: { title: 'feedback' }
        }
      ]
    }
  ]
}

export default OperationRouter
