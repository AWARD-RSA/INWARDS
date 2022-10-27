<template>
  <div style="height: 100%;">
    <StatusBar/>
    <div class="container-fluid" style="height: 100%;">
      <div class="row no-gutters" style="height: 100%;">
        <div class="col-md-4 no-float left-panel" style="background: #252526; padding-left: 8px;">
          <Station ref="stationComponent"/>
          <div>
          <div class="card rounded-0">
            <div class="card-body">
              <div class="row" style="margin-top: 2px">
                <div class="col-sm-6" style="padding-right: 5px;">
                  <div class="form-group" style="margin-right: 0.5rem;">
                    <input class="form-control rounded-0" id="dateStart" style="margin-left: 4px;" placeholder='Start Date' onfocus="(this.type='date')">
                    <small class="form-text text-muted" style="margin-left: 4px;">Select start date.</small>
                  </div>
                </div>
                <div class="col-sm-6" style="padding-left: 0px;">
                  <div class="form-group" style="margin-right: 0.2rem;">
                    <input class="form-control rounded-0" id="dateEnd" style="margin-right: 0px;" placeholder='End Date' onfocus="(this.type='date')">
                    <small class="form-text text-muted" style="margin-left: 4px;">Select end date.</small>
                  </div>
                </div>
              </div>
                <div class="row">
                <div class="col-md-12">
                <button class="btn inwards_button" @click="fetchUnverified()" type="button" style="width: 100%">
                  <i class="fa fa-line-chart"></i>Update Timeframe</button>
                </div>
              </div>
              </div>
              </div>
            </div>
          <MapDashboard ref="mapDashboard"/>

          </div>
       <div class="col-md-8 no-float right-panel" style="background: #1E1E1E; padding-bottom: 50px; padding-left: 10px; padding-right: 10px;">

          <div class="row no-gutters">
            <div class="col-md-6">
              <UnverifiedChart ref="damComponent" style="margin-top: 5px;"/>
            </div>
            <div class="col-md-6" style="padding-left: 2px;">
              <DamOutflow ref="outflowComponent" style="margin-top: 5px;"/>
            </div>
            <div class="col-md-6">
              <DamOutflowLeft ref="leftComponent" style="margin-top: 5px;"/>
            </div>
            <div class="col-md-6" style="padding-left: 2px; margin-top: 5px;">
                <DamOutflowRight ref="rightComponent"/>
            </div>
          </div>
        </div>
        <NavButtons/>
      </div>
      </div>
      </div>
</template>
<style>
  .v-space {
    height: 10px;
  }
  .jstree-container {
    max-height: 200px;
    height: 200px;
    overflow-y: auto;
  }
</style>
<script>
  import axios from 'axios';
  import Header from '@/components/Header';
  import NavButtons from '@/components/NavButtons';
  import MapDashboard from './MapDashboard';
  import UnverifiedChart from './UnverifiedChart';
  import DamOutflow from './DamOutflow';
  import DamOutflowRight from './DamOutflowRight';
  import DamOutflowLeft from './DamOutflowLeft';
  import Station from './Station';
  import $ from 'jquery';
  import stateStore from '../../store/state_handler';
  import StatusBar from '../StatusBar';
  import path from 'path';
  require('promise.prototype.finally').shim();
  const { dialog, app } = require('electron').remote;
  
  export default {
    data () {
      return {
        stationsApi: 'https://uwasp.award.org.za/app_json/dam_stations.php',
        stationsCoordinates: {}, // To stored all stations with their coordinates
        stationsFeatures: {}, // To stored station features
        stationsRequest: null,
        selectedStations: [],
        userCode: '',
        selectedWMAs: []
      };
    },
    mounted () {
      stateStore.getState(
        stateStore.keys.loginStatus, (status) => {
          this.userCode = status['uniqueCode'];
        }
      );
      document.getElementById('dateStart').setAttribute('value', '2022-10-01');
      var endDate = new Date();
      endDate.setDate(endDate.getDate() + 14);
      var dd = endDate.getDate();
      var mm = endDate.getMonth() + 1;
      var yyyy = endDate.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      endDate = yyyy + '-' + mm + '-' + dd;
      document.getElementById('dateEnd').setAttribute('value', endDate);
      let self = this;
      this.mapDashboardRef = this.$refs.mapDashboard;
      let map = this.$refs.mapDashboard.map;
      this.mapDashboardRef.connectedToTree = false;
      let startDate = new Date();
      startDate = '2022-10-01';
      let selectedWMAs = ['pongola_mtamvuna'];
      this.$refs.damComponent.displayChart('chartComponent-unverified-timeseries-W1R001FW', ['W1R001FW'], this.formatDate(startDate), this.formatDate(endDate), this.userCode);
      this.$refs.outflowComponent.displayChart('chartComponent-unverified-timeseries-W1H028FW', ['W1H028FW'], this.formatDate(startDate), this.formatDate(endDate), this.userCode);
      this.$refs.rightComponent.displayChart('chartComponent-unverified-timeseries-W1H030H3T', ['W1H030H3T'], this.formatDate(startDate), this.formatDate(endDate), this.userCode);
      this.$refs.leftComponent.displayChart('chartComponent-unverified-timeseries-W1H029FW', ['W1H029FW'], this.formatDate(startDate), this.formatDate(endDate), this.userCode);
      this.$refs.stationComponent.displayChart('W1R001FW', this.formatDate(dateStart), this.formatDate(dateEnd), this.userCode);
      self.mapDashboardRef.showSelectedWMA(selectedWMAs);
      self.fetchStations();


    },
    components: {
    Header,
    NavButtons,
    MapDashboard,
    UnverifiedChart,
    Station,
    StatusBar,
    DamOutflow,
    DamOutflowLeft,
    DamOutflowRight
},
    methods: {
      fetchStations () {
        let self = this;
        let wmaNames = ['pongola_mtamvuna'];
        let fs = require('fs');
        let dir = path.join(app.getPath('userData'), '/stations');
        // TODO : Create an util class for file storage
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        // Cancel previous request if any
        if (this.stationsRequest) {
          this.stationsRequest.cancel('Canceling stations request');
          this.stationsRequest = null;
        }
        // Wrap wma name with single quotes, for api purposes
        wmaNames = wmaNames.sort();
        for (let i = 0; i < wmaNames.length; i++) {
          wmaNames[i] = `'${wmaNames[i]}'`;
        }
        let url = `${self.stationsApi}?wma=${wmaNames.join()}`;
        let stationFile = `${dir}/${url.hashCode()}.json`;
        // Check if online
        if (navigator.onLine) {
          let cancelToken = null;
          if (self.stationsRequest) {
            cancelToken = self.stationsRequest.token;
          }
          axios.get(url, { cancelToken: cancelToken }).then(response => {
            self.mapDashboardRef.loadStationsToMap(response.data);
            self.createCatchmentTree(response.data);
          }).catch(error => {
            console.log(error);
          });
        } else {
          if (fs.existsSync(stationFile)) {
            let jsonData = fs.readFileSync(stationFile, 'utf-8');
            let stationsData = JSON.parse(jsonData);
            self.mapDashboardRef.loadStationsToMap(stationsData);
          }
        }
      }
    }
  };
</script>