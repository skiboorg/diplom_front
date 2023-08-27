
const routes = [
  {
    path: '/',
    component: () => import('layouts/Front.vue'),
    children: [
      { path: '', component: () => import('pages/front/index.vue') }
    ]
  },
  {
    path: '/lk',
    component: () => import('layouts/Front.vue'),
    children: [
      { path: '', component: () => import('pages/front/lk/index.vue') }
    ]
  },
  {
    path: '/category/:name_slug',
    component: () => import('layouts/Front.vue'),
    children: [
      { path: '', component: () => import('pages/front/category.vue') }
    ]
  },
  {
    path: '/country/:name_slug',
    component: () => import('layouts/Front.vue'),
    children: [
      { path: '', component: () => import('pages/front/country.vue') }
    ]
  },
  {
    path: '/service/:name_slug',
    component: () => import('layouts/Front.vue'),
    children: [
      { path: '', component: () => import('pages/front/service.vue') }
    ]
  },
  {
    path: '/crm/auth',
    component: () => import('layouts/CrmAuth.vue'),
    children: [
      { path: '', component: () => import('pages/crm/Login.vue') }
    ]
  },
  {
    path: '/crm',
    component: () => import('layouts/CrmLayout.vue'),
    children: [
      { path: '', component: () => import('pages/crm/IndexPage.vue') }
    ]
  },
  {
    path: '/crm/forms',
    component: () => import('layouts/CrmLayout.vue'),
    children: [
      { path: '', component: () => import('pages/crm/forms.vue') }
    ]
  },
  {
    path: '/crm/order/add',
    component: () => import('layouts/CrmLayout.vue'),
    children: [
      { path: '', component: () => import('pages/crm/order/AddOrder.vue') }
    ]
  },
  {
    path: '/crm/order/:uuid',
    component: () => import('layouts/CrmLayout.vue'),
    children: [
      { path: '', component: () => import('pages/crm/order/OrderInfo.vue') }
    ]
  },
  {
    path: '/crm/order/edit/:uuid',
    component: () => import('layouts/CrmLayout.vue'),
    children: [
      { path: '', component: () => import('pages/crm/order/EditOrder.vue') }
    ]
  },
  {
    path: '/crm/users/:uuid',
    component: () => import('layouts/CrmLayout.vue'),
    children: [
      { path: '', component: () => import('pages/crm/user/UserInfo.vue') }
    ]
  },
  {
    path: '/crm/users/edit/:uuid',
    component: () => import('layouts/CrmLayout.vue'),
    children: [
      { path: '', component: () => import('pages/crm/user/Edit.vue') }
    ]
  },
  {
    path: '/crm/users',
    component: () => import('layouts/CrmLayout.vue'),
    children: [
      { path: '', component: () => import('pages/crm/user/All.vue') }
    ]
  },
  {
    path: '/crm/users/add',
    component: () => import('layouts/CrmLayout.vue'),
    children: [
      { path: '', component: () => import('pages/crm/user/Add.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
