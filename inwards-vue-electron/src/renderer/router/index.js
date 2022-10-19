import Vue from 'vue'
import Router from 'vue-router'
import MapLandingPage from '@/components/LandingPage/MapLandingPage.vue'
import Dashboard from '@/components/Dashboard/Dashboard.vue'
import UserDashboard from '@/components/UserDashboard/Dashboard.vue'
import UmhlathuzeDashboard from '@/components/UmhlathuzeDashboard/Dashboard.vue'
import DamDashboard from '@/components/DamDashboard/Dashboard.vue'
import AdminDashboard from '@/components/AdminDashboard/Dashboard.vue'
Vue.use(Router)

export default new Router({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'map-landing-page',
      component: MapLandingPage
    },
    {
      path: '/dashboard',
      name: 'dashboard-page',
      component: Dashboard
    },
    {
      path: '/user-dashboard',
      name: 'user-dashboard-page',
      component: UserDashboard
    },
    {
      path: '/umhlathuze-dashboard',
      name: 'umhlathuze-dashboard-page',
      component: UmhlathuzeDashboard
    },
    {
      path: '/dam-dashboard',
      name: 'dam-dashboard-page',
      component: DamDashboard
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard-page',
      component: AdminDashboard
    },   
    {
      path: '*',
      redirect: '/'
    }
  ]
});