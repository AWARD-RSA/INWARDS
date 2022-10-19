<template>
    <div style="height: 100vh;">
      <StatusBar/>
      <div class="container-fluid" style="height: 100vh;;">
        <div class="row no-gutters" style="height: 100vh;">
          <div class="col-md-12" style="background: #fff; padding-bottom: 50px; padding-left: 10px; padding-right: 10px; overflow: hidden;">
            <UserData ref="userdataComponent"/>
          </div>
        </div>
        <NavButtons/>
      </div>
    </div>
  </template>
  <script>
    import $ from 'jquery';
    import stateStore from '../../store/state_handler';
    import router from '@/router/index';
    import UserData from './UserData';
    import NavButtons from '../../components/NavButtons';
    import StatusBar from '../StatusBar';
  
    export default {
    components: {
        NavButtons,
        router,
        UserData,
        StatusBar
    },
      data () {
        return {
          selectedWMA: [],
          selectedFeatures: {}
        };
      },
      mounted () {
      },
      methods: {
      }
    };
  </script>