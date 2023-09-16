<template>
  <div>
    <button id="home" class="btn inwards_button" style="width: 100%; display:none;" @click="goHome()" type="button">Home<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
    <button id="unverified" class="btn inwards_button" style="width: 100%; display:none;" @click="saveSelection()" type="button">Unverified Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
    <button id="wqDash" class="btn inwards_button" style="width: 100%; display:none;" @click="goToWqDashboard()" type="button">WQ Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
    <button id="knpDash" class="btn inwards_button" style="width: 100%; display:none;" @click="goToKnpDashboard()" type="button">TPC Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
    <button id="iucmaDash" class="btn inwards_button" style="width: 100%; display:none;" @click="goToIUCMADashboard()" type="button">IUCMA Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
    <button id="loadDash" class="btn inwards_button" style="width: 100%; display:none;" @click="goToLoadDashboard()" type="button">Load Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
    <button id="userDash" class="btn inwards_button" style="width: 100%; display:none;" @click="goToUserDefinedDashboard()" type="button">User Defined Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
    <button id="verifiedDash" class="btn inwards_button" style="width: 100%; display:none;" type="button">Verified Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
    <button id="fishDash" class="btn inwards_button" style="width: 100%; display:none;" @click="goToFishDashboard()" type="button">Fish Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
    <button id="adminDash" class="btn inwards_button" style="width: 100%; display:none;" @click="goToadminDashboard()" type="button"><i class="fa fa-bar-chart" aria-hidden="true"></i>UWASP Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
  </div>
</template>
<script>
  // import $ from 'jquery';
  import router from '../router/index';
  export default {
    name: 'Nav',
    data () {
      return {
        selectedWMA: [],
        selectedFeatures: {}
      };
    },
    methods: {
      saveSelection () {
        router.push({ path: 'dashboard' });
      },
      goToUserDefinedDashboard () {
        router.push({ path: 'user-dashboard' });
      },
      goToKnpDashboard () {
        router.push({ path: 'knp-dashboard' });
      },
      goToIUCMADashboard () {
        router.push({ path: 'iucma-dashboard' });
      },
      goToLoadDashboard () {
        router.push({ path: 'load-dashboard' });
      },
      goToWqDashboard () {
        router.push({ path: 'wq-dashboard' });
      },
      goToFishDashboard () {
        router.push({ path: 'fish-dashboard' });
      },
      goToadminDashboard () {
        router.push({ path: 'admin-dashboard' });
      },     
      goHome () {
        router.push({ path: '/' });
      }
    }
  };
</script>