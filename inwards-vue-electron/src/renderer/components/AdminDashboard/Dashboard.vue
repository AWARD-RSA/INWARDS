<template>
    <div>
      <StatusBar/>
      <div class="container-fluid">
        <div class="v-space"></div>
        <div class="row no-gutters">
          <div class="col-md-2">
              <div class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <Users ref="usersComponent"/>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <Sectors ref="sectorComponent"/>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <DataRequests ref="datarequestsComponent"/>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <StationsOnline ref="stationsComponent"/>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <RealTime ref="realtimeComponent"/>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <Verified ref="verifiedComponent"/>
                </div>
              </div>
            </div>
        </div>
        <hr>
        <div class="row no-gutters">
          <div class="col-md-12" style="background: #fff; padding-bottom: 50px; padding-left: 10px; padding-right: 10px; overflow: auto;">
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
    import DataRequests from './DataRequests';
    import RealTime from './RealTime';
    import Sectors from './Sectors';
    import Verified from './Verified';
    import StationsOnline from './StationsOnline';
    import Users from './Users';
  
    export default {
    components: {
        NavButtons,
        router,
        UserData,
        StatusBar,
        DataRequests,
        RealTime,
        Sectors,
        Verified,
        StationsOnline,
        Users
    },
      data () {
        return {
          selectedWMA: [],
          selectedFeatures: {}
        };
      },
      mounted () {
        this.$refs.datarequestsComponent.displayChart('data-requests');
        this.$refs.usersComponent.displayChart('registered-users');
        this.$refs.realtimeComponent.displayChart('realtime-data');
        this.$refs.stationsComponent.displayChart('stations-online');
        this.$refs.verifiedComponent.displayChart('verified-data');
        this.$refs.sectorComponent.displayChart('sector-represented');
      },
      methods: {
      }
    };
  </script>