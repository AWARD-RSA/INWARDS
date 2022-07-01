<template>
  <div>
    <button id="home" class="btn inwards_button" style="width: 100%; display:none;" @click="goHome()" type="button">Home<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
    <button id="unverified" class="btn inwards_button" style="width: 100%; display:none;" @click="saveSelection()" type="button">Unverified Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
    <button id="userDash" class="btn inwards_button" style="width: 100%; display:none;" @click="goToUserDefinedDashboard()" type="button">User Defined Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
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
      goHome () {
        router.push({ path: '/' });
      }
    }
  };
</script>