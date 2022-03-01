import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'map-landing-page',
      component: require('@/components/LandingPage/MapLandingPage').default
    },
    {
      path: '/dashboard',
      name: 'dashboard-page',
      component: require('@/components/Dashboard/Dashboard').default
    },
    {
      path: '/user-dashboard',
      name: 'user-dashboard-page',
      component: require('@/components/UserDashboard/Dashboard').default
    },
    {
      path: '/knp-dashboard',
      name: 'knp-dashboard-page',
      component: require('@/components/KnpDashboard/Dashboard').default
    },
    {
      path: '/wq-dashboard',
      name: 'wq-dashboard-page',
      component: require('@/components/WaterQuality/Dashboard').default
    },
    {
      path: '/iucma-dashboard',
      name: 'iucma-dashboard-page',
      component: require('@/components/IucmaDashboard/Dashboard').default
    },
    {
      path: '/fish-dashboard',
      name: 'fish-dashboard-page',
      component: require('@/components/FishDashboard/Dashboard').default
    },
    {
      path: '/eba-dashboard',
      name: 'eba-dashboard-page',
      component: require('@/components/EbaDashboard/Dashboard').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
