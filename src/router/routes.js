import { checkAuth, checkNoAuth } from 'src/utils/helpers'

const routes = [
  {
    path: '/login',
    exact: true,
    beforeEnter: checkNoAuth,
    component: () => import('layouts/Default.vue'),
    children: [
      {
        name: 'login',
        path: '',
        component: () => import('pages/Login.vue')
      }
    ]
  },
  {
    path: '/',
    beforeEnter: checkAuth,
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') },
      { path: 'customers', component: () => import('pages/Customers') },
      { path: 'bookings', component: () => import('pages/Bookings') },
      { path: 'calendar', component: () => import('pages/Calendar.vue') },
      { path: 'refunds', component: () => import('pages/Refunds.vue') },
      { path: 'documents', component: () => import('pages/Documents.vue') },
      { path: 'finances', component: () => import('pages/Finances.vue') },
      {
        path: 'settings',
        component: () => import('pages/Settings.vue'),
        children: [
          { path: '', component: () => import('components/Settings/Discounts/index.vue') },
          // { path: 'room', component: () => import('components/Settings/Room/index.vue') },
          // { path: 'location', component: () => import('components/Settings/Location/index.vue') },
          // { path: 'extras', component: () => import('components/Settings/Extras/index.vue') },
          { path: 'discounts', component: () => import('components/Settings/Discounts/index.vue') },
          // { path: 'promo', component: () => import('components/Settings/Promocodes/index.vue') },
          // { path: 'rules', component: () => import('components/Settings/Rules/index.vue') },
          // { path: 'organization', component: () => import('components/Settings/OrganizationData/index.vue') },
          // { path: 'jswidget', component: () => import('components/Settings/JSWidget/index.vue') },
          // { path: 'notifications', component: () => import('components/Settings/Notifications/index.vue') },
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
