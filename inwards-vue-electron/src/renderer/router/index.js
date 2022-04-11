import Vue from 'vue'
import Router from 'vue-router'
import MapLandingPage from '@/components/LandingPage/MapLandingPage.vue'
import Dashboard from '@/components/Dashboard/Dashboard.vue'
import UserDashboard from '@/components/UserDashboard/Dashboard.vue'
import KnpDashboard from '@/components/KnpDashboard/Dashboard.vue'
import WaterQuality from '@/components/WaterQuality/Dashboard.vue'
import IucmaDashboard from '@/components/IucmaDashboard/Dashboard.vue'
import FishDashboard from '@/components/FishDashboard/Dashboard.vue'
import InvertDashboard from '@/components/InvertDashboard/Dashboard.vue'
import EbaDashboard from '@/components/EbaDashboard/Dashboard.vue'
import IucmaWqDashboard from '@/components/IucmaWaterQuality/Dashboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/knp-dashboard',
      name: 'knp-dashboard-page',
      component: KnpDashboard
    },
    {
      path: '/wq-dashboard',
      name: 'wq-dashboard-page',
      component: WaterQuality
    },
    {
      path: '/iucma-dashboard',
      name: 'iucma-dashboard-page',
      component: IucmaDashboard
    },
    {
      path: '/fish-dashboard',
      name: 'fish-dashboard-page',
      component: FishDashboard
    },
    {
      path: '/invert-dashboard',
      name: 'invert-dashboard-page',
      component: InvertDashboard
    },
    {
      path: '/eba-dashboard',
      name: 'eba-dashboard-page',
      component: EbaDashboard
    },
    {
      path: '/iucma-wq-dashboard',
      name: 'iucma-wq-dashboard-page',
      component: IucmaWqDashboard
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});