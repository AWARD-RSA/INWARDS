<template>
    <div>
      <StatusBar/>
      <div class="container" style="max-width: 95%;">
        <div class="v-space"></div>
        <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><h5 style="color:white;">User Metrics</h5></div>
        <hr>
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
        <br>
        <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><h5 style="color:white;">Support Tickets</h5></div>
        <hr>
        <div class="row">
          <div class="col-md-12" style="overflow: auto;">
            <SupportTickets ref="supportComponent"/>
          </div>
        </div>
        <br>
        <hr>
        <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><h5 style="color:white;">User Management</h5></div>
        <hr>
        <div class="row">
          <div class="col-md-12" style="overflow: auto;">
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
    import SupportTickets from './SupportTickets';
  
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
        SupportTickets,
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